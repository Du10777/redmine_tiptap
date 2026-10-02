module RedmineTiptap
  class Hooks < Redmine::Hook::ViewListener
    # Скрипты и стили отдаются через конвейер ассетов Redmine (Propshaft). В адресе
    # файла — отпечаток содержимого, поэтому после обновления плагина браузер
    # сразу берёт новую версию, а не держит старую из кэша. В public/ Redmine
    # при этом ничего не пишется, и права на запись туда не нужны.
    #
    # defer: скрипты выполняются после разбора страницы, когда скрипты Redmine
    # (jQuery, application-legacy с функциями вложений) уже загружены, и строго
    # в порядке подключения. Поэтому языки подсветки (tiptap_highlight, собирается
    # из папки highlight/) идут раньше редактора: он забирает их при старте.
    def view_layouts_base_html_head(context = {})
      javascript_include_tag('tiptap_highlight', plugin: 'redmine_tiptap', defer: true) +
        javascript_include_tag('tiptap_bundle', plugin: 'redmine_tiptap', defer: true) +
        stylesheet_link_tag('tiptap_editor', plugin: 'redmine_tiptap')
    end
  end
end
