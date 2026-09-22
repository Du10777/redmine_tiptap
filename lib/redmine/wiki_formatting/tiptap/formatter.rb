module Redmine
  module WikiFormatting
    module Tiptap
      class Formatter
        # Redmine 7 вызывает форматтер как new(text, options),
        # Redmine 6 — как new(text). Второй аргумент опционален.
        def initialize(text, options = {})
          @text = text
          @options = options
        end

        def to_html(*args)
          @text.to_s
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
          # Оба хелпера вызываются из вьюх как <%= ... %>, поэтому возвращаем nil,
          # иначе в разметку попадает результат последнего выражения ("true").
          nil
        end

        def initial_page_content(page)
          page.pretty_title.to_s
        end
      end
    end
  end
end
