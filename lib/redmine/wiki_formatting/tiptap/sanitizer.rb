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

        # Whether the address is on the host this Redmine is set up for.
        def self.own_host?(url)
          host = URI.parse(url).host.to_s.downcase
          own = Setting.host_name.to_s.split(':').first.to_s.downcase
          host.empty? || host == own
        rescue URI::InvalidURIError
          true
        end

        ELEMENTS = %w[
          p br hr h1 h2 h3 h4 h5 h6 div span blockquote pre code
          strong b em i u s strike del ins sub sup small mark abbr cite q kbd samp var
          a img
          ul ol li dl dt dd label input
          table caption colgroup col thead tbody tfoot tr th td
          details summary
          acronym address big dfn tt iframe
        ].freeze

        ATTRIBUTES = {
          :all => %w[style class title dir lang xml:lang align],
          'a' => %w[href name],
          'img' => %w[src alt width height border],
          'ul' => %w[data-type],
          'ol' => %w[start type reversed],
          'li' => %w[value data-type data-checked],
          'div' => %w[data-type],
          'input' => %w[type checked disabled],
          'details' => %w[open],
          'blockquote' => %w[cite],
          'q' => %w[cite],
          'del' => %w[cite datetime],
          'ins' => %w[cite datetime],
          'table' => %w[border cellpadding cellspacing width height],
          'colgroup' => %w[span],
          'col' => %w[span width],
          'tr' => %w[valign],
          'td' => %w[colspan rowspan colwidth valign width height nowrap abbr],
          'th' => %w[colspan rowspan colwidth valign width height nowrap abbr scope],
          'iframe' => %w[src width height frameborder allowfullscreen scrolling sandbox allow loading referrerpolicy],
        }.freeze

        # What the toolbar sets: text and background color, font, size,
        # alignment, indent (margin-left), image and column widths, list markers,
        # and what table cells keep. Then what CKEditor writes and what its
        # formatter (Rails' sanitizer) let through, so that texts saved with it look
        # the same: floating pictures, borders, margins and paddings, line height.
        CSS_PROPERTIES = %w[
          color background-color background
          font-family font-size font-weight font-style font-variant
          text-align text-decoration text-indent vertical-align white-space
          letter-spacing line-height direction unicode-bidi
          margin margin-top margin-right margin-bottom margin-left
          padding padding-top padding-right padding-bottom padding-left
          border border-top border-right border-bottom border-left
          border-color border-style border-width border-collapse border-spacing
          border-top-color border-right-color border-bottom-color border-left-color
          border-top-style border-right-style border-bottom-style border-left-style
          border-top-width border-right-width border-bottom-width border-left-width
          float clear
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

        # <iframe> exists for the video and the like that CKEditor lets people embed
        # (its sanitizer allows it). Only an http(s) address of another site stays,
        # and the frame is sandboxed: its page may run its own scripts, but cannot
        # open the top window or submit forms. A page of this very site is not let
        # in: with allow-same-origin it would be the same origin as the page that
        # shows it, and the sandbox would not keep it away from the page.
        FILTER_IFRAMES = lambda do |env|
          node = env[:node]
          return unless env[:node_name] == 'iframe'

          src = node['src'].to_s.strip
          src = "https:#{src}" if src.start_with?('//')
          if src.empty? || !Sanitizer.urls.uri_with_safe_scheme?(src, ['http', 'https']) || Sanitizer.own_host?(src)
            node.unlink
            return
          end
          node['src'] = node['src'].strip
          node['sandbox'] = 'allow-scripts allow-same-origin allow-popups allow-presentation'
          node['allow'] = 'fullscreen; picture-in-picture'
          node['loading'] = 'lazy'
          node['referrerpolicy'] = 'strict-origin-when-cross-origin'
        end

        CONFIG = Sanitize::Config.freeze_config(
          Sanitize::Config.merge(
            Sanitize::Config::DEFAULT,
            elements: ELEMENTS,
            attributes: ATTRIBUTES,
            # URLs are checked by FILTER_URLS
            protocols: {},
            css: { properties: CSS_PROPERTIES, protocols: [] },
            transformers: [FILTER_CLASSES, FILTER_INPUTS, FILTER_URLS, FILTER_IFRAMES]
          )
        )

        def self.call(html)
          Sanitize.fragment(html, CONFIG)
        end
      end
    end
  end
end
