require 'sanitize'

module Redmine
  module WikiFormatting
    module Tiptap
      # Cleans stored HTML before it is shown.
      #
      # Texts in this format are HTML. Without cleaning, Redmine would print them
      # on the page as they are: anybody who can write an issue description, a
      # note or a wiki page could store a <script>, an onerror= handler or a
      # javascript: link, and it would run in the browser of everyone who opens
      # the page. The editor alone cannot prevent that, because a text can also
      # come through the REST API, the editor's <HTML> mode or an older version.
      # So the HTML is cleaned when it is shown, which also covers texts saved
      # before, with an allowlist of what the editor produces.
      module Sanitizer
        # Redmine's URL checks, looked up when first needed rather than when the
        # plugin is loaded.
        def self.urls
          @urls ||= Object.new.extend(Redmine::Helpers::URL)
        end

        ELEMENTS = %w[
          p br hr h1 h2 h3 h4 h5 h6 div span blockquote pre code
          strong b em i u s strike del ins sub sup small mark abbr cite q kbd samp var
          a img
          ul ol li dl dt dd label input
          table caption colgroup col thead tbody tfoot tr th td
          details summary
        ].freeze

        ATTRIBUTES = {
          :all => %w[style class title dir lang align],
          'a' => %w[href name],
          'img' => %w[src alt width height],
          'ul' => %w[data-type],
          'ol' => %w[start type reversed],
          'li' => %w[value data-type data-checked],
          'div' => %w[data-type],
          'input' => %w[type checked disabled],
          'details' => %w[open],
          'table' => %w[border cellpadding cellspacing width],
          'colgroup' => %w[span],
          'col' => %w[span width],
          'td' => %w[colspan rowspan colwidth valign width],
          'th' => %w[colspan rowspan colwidth valign width scope],
        }.freeze

        # What the toolbar sets: text and background color, font, size,
        # alignment, indent (margin-left), image and column widths, list markers,
        # and what table cells keep.
        CSS_PROPERTIES = %w[
          color background-color
          font-family font-size font-weight font-style
          text-align text-decoration vertical-align white-space
          margin-left
          width min-width max-width height
          list-style-type
        ].freeze

        # Classes the editor writes: the language of a code block, and its own
        # blocks (tiptap-quote and the like).
        ALLOWED_CLASS = /\A(?:language-[\w+#-]+|tiptap-[\w-]+)\z/

        FILTER_CLASSES = lambda do |env|
          node = env[:node]
          return unless node.element? && node.has_attribute?('class')

          classes = node['class'].split.grep(ALLOWED_CLASS)
          if classes.empty?
            node.remove_attribute('class')
          else
            node['class'] = classes.join(' ')
          end
        end

        # <input> exists only as the checkbox of a task list item.
        FILTER_INPUTS = lambda do |env|
          node = env[:node]
          return unless env[:node_name] == 'input'

          node.unlink unless node['type'].to_s.downcase == 'checkbox'
        end

        # Links and images: the same rules as Redmine uses for its own formats.
        # javascript:, data: and vbscript: links are dropped (also when the
        # scheme is disguised with entities), images load only over http(s) or
        # from a relative address (attachments).
        FILTER_URLS = lambda do |env|
          node = env[:node]
          case env[:node_name]
          when 'a'
            attribute, safe = 'href', ->(url) { Sanitizer.urls.uri_with_link_safe_scheme?(url) }
          when 'img'
            attribute, safe = 'src', ->(url) { Sanitizer.urls.uri_with_safe_scheme?(url, ['http', 'https', nil]) }
          else
            return
          end
          return unless node.has_attribute?(attribute)

          url = node[attribute].strip
          if url.empty? || !safe.call(url)
            node.remove_attribute(attribute)
          else
            node[attribute] = url
          end
        end

        CONFIG = Sanitize::Config.freeze_config(
          Sanitize::Config.merge(
            Sanitize::Config::DEFAULT,
            elements: ELEMENTS,
            attributes: ATTRIBUTES,
            # URLs are checked by FILTER_URLS
            protocols: {},
            css: { properties: CSS_PROPERTIES, protocols: [] },
            transformers: [FILTER_CLASSES, FILTER_INPUTS, FILTER_URLS]
          )
        )

        def self.call(html)
          Sanitize.fragment(html, CONFIG)
        end
      end
    end
  end
end
