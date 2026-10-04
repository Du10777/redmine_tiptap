require_relative 'sanitizer'

module Redmine
  module WikiFormatting
    module Tiptap
      class Formatter
        # Redmine's own helper that makes links of plain addresses (auto_link!).
        include Redmine::WikiFormatting::LinksHelper

        # How a text of CKEditor can be told from a text of this editor: CKEditor
        # writes void tags in the XHTML way (<br />, <hr />, <img ... />) and
        # separates blocks with a blank line (and indents list items with a tab);
        # the editor of this plugin writes <br>, <hr>, <img ...> and no space
        # between blocks.
        CKEDITOR_SIGNS = Regexp.union(
          %r{<br />}, %r{<hr />}, %r{<img\b[^>]*/>},
          %r{</(?:p|h[1-6]|ul|ol|table|blockquote|pre|div)>[ \t]*\r?\n[ \t]*\r?\n[ \t]*<},
          %r{<(?:ul|ol)>\r?\n\t<li>}
        ).freeze

        # The language names that CodeRay (Redmine's own highlighter, which
        # CKEditor's formatter used) has and that are called differently here.
        CODE_LANGUAGE_ALIASES = {
          'java_script' => 'javascript', 'html' => 'xml', 'sass' => 'scss',
          'text' => 'plaintext', 'debug' => 'plaintext', 'raydebug' => 'plaintext', 'scanner' => 'plaintext'
        }.freeze

        # Redmine 7 calls the formatter as new(text, options),
        # Redmine 6 as new(text). The second argument is optional.
        def initialize(text, options = {})
          @text = text
          @options = options
        end

        # The editor does not treat line breaks right after <code> and before
        # </code> as part of the code and strips them on load. Entries saved by
        # earlier versions of the plugin still have them in the text, and in view
        # mode they produced an empty line above and below the block - strip them
        # here as well, so that view mode matches the editor.
        #
        # Texts written in CKEditor (the redmine_ckeditor plugin) are shown the way
        # CKEditor's own formatter showed them: its code blocks keep their language
        # (<code class="ruby">), plain addresses become links, and such a text is
        # wrapped in div.tiptap-legacy, whose styles give the paragraphs the spacing
        # that CKEditor texts have (the paragraphs of this plugin's editor are
        # closer together).
        def to_html(*args)
          html = @text.to_s
                      .gsub(%r{(<pre><code[^>]*>)\n}, '\1')
                      .gsub(%r{\n(</code></pre>)}, '\1')
          html = unwrap_quotes(html) if html.include?('tiptap-quote')
          legacy = ckeditor_text?(html)
          html = name_code_languages(html)
          html = auto_link_addresses(Sanitizer.call(html))
          legacy ? %(<div class="tiptap-legacy">#{html}</div>) : html
        end

        private

        def ckeditor_text?(html)
          html.match?(CKEDITOR_SIGNS)
        end

        # <pre><code class="ruby"> (CKEditor) becomes <pre><code class="language-ruby">,
        # the way this plugin saves the language of a code block.
        def name_code_languages(html)
          html.gsub(%r{(<pre\b[^>]*>\s*<code\s+class=")([^"]*)(")}i) do
            whole, head, classes, tail = Regexp.last_match(0), Regexp.last_match(1), Regexp.last_match(2), Regexp.last_match(3)
            names = classes.split
            next whole if names.empty? || names.any? { |name| name.start_with?('language-') }

            language = names.find { |name| name.match?(/\A[\w+#.-]+\z/) && !%w[syntaxhl hljs].include?(name) }
            next whole unless language

            language = language.downcase
            "#{head}language-#{CODE_LANGUAGE_ALIASES.fetch(language, language)}#{tail}"
          end
        end

        # Plain http(s) and www. addresses become links, as in every format of
        # Redmine. Code and what is already a link stay as they are.
        def auto_link_addresses(html)
          return html unless html.include?('http') || html.include?('www.')

          parts = html.split(%r{(<pre\b.*?</pre>|<code\b.*?</code>|<a\b.*?</a>)}im)
          parts.each_with_index.map do |part, index|
            next part if index.odd?

            text = part.dup
            auto_link!(text)
            text
          end.join
        end

        # Earlier versions of the editor wrapped a quote block in one more plain
        # <blockquote> every time a saved text was opened (see tiptap_quote.js),
        # so texts saved with them show the quote nested several levels deep.
        # Drop such wrappers: a plain blockquote with nothing but a quote block
        # (or another wrapper) inside.
        def unwrap_quotes(html)
          fragment = Nokogiri::HTML::DocumentFragment.parse(html)
          changed = false
          while (wrapper = fragment.css('blockquote').find { |el| wraps_only_quote?(el) })
            wrapper.replace(wrapper.element_children.first)
            changed = true
          end
          changed ? fragment.to_html : html
        end

        def wraps_only_quote?(el)
          return false if quote_block?(el)
          return false if el.children.any? { |node| node.text? && node.text.strip != '' }

          children = el.element_children
          return false unless children.size == 1 && children.first.name == 'blockquote'

          quote_block?(children.first) || wraps_only_quote?(children.first)
        end

        def quote_block?(el)
          el['class'].to_s.split.include?('tiptap-quote')
        end
      end

      module Helper
        def wikitoolbar_for(field_id, preview_url = preview_text_path)
          heads_for_wiki_formatter
          nil
        end

        def heads_for_wiki_formatter
          unless @heads_for_wiki_formatter_included
            content_for :header_tags do
              javascript_tag(
                "var wikiImageMimeTypes = #{Redmine::MimeType.by_type('image').to_json};"
              )
            end
            @heads_for_wiki_formatter_included = true
          end
          # Both helpers are called from views as <%= ... %>, so return nil,
          # otherwise the result of the last expression ("true") ends up in the markup.
          nil
        end

        def initial_page_content(page)
          page.pretty_title.to_s
        end
      end
    end
  end
end
