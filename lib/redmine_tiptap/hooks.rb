module RedmineTiptap
  class Hooks < Redmine::Hook::ViewListener
    # Scripts and styles are served through the Redmine asset pipeline (Propshaft). The file
    # URL contains a fingerprint of the content, so after a plugin update the browser picks
    # up the new version right away instead of keeping the old one from cache. Nothing is
    # written to Redmine's public/ in the process, and no write access there is needed.
    #
    # defer: the scripts run after the page is parsed, when the Redmine scripts (jQuery,
    # application-legacy with the attachment functions) are already loaded, and strictly in
    # the order they are included. That is why the highlight languages (tiptap_highlight,
    # built from the highlight/ folder) come before the editor: it picks them up on startup.
    def view_layouts_base_html_head(context = {})
      javascript_include_tag('tiptap_highlight', plugin: 'redmine_tiptap', defer: true) +
        javascript_include_tag('tiptap_bundle', plugin: 'redmine_tiptap', defer: true) +
        stylesheet_link_tag('tiptap_editor', plugin: 'redmine_tiptap')
    end
  end
end
