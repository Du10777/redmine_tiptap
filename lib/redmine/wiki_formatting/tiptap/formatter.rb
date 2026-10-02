module Redmine
  module WikiFormatting
    module Tiptap
      class Formatter
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
        def to_html(*args)
          html = @text.to_s
                      .gsub(%r{(<pre><code[^>]*>)\n}, '\1')
                      .gsub(%r{\n(</code></pre>)}, '\1')
          html = unwrap_quotes(html) if html.include?('tiptap-quote')
          html
        end

        private

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
