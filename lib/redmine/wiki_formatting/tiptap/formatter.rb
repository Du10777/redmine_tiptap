module Redmine
  module WikiFormatting
    module Tiptap
      class Formatter
        def initialize(text)
          @text = text
        end

        def to_html(*args)
          @text.to_s
        end
      end

      module Helper
        def wikitoolbar_for(field_id, preview_url = preview_text_path)
          heads_for_wiki_formatter
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
        end

        def initial_page_content(page)
          page.pretty_title.to_s
        end
      end
    end
  end
end
