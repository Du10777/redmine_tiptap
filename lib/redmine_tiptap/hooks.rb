require_relative 'translations'

module RedmineTiptap
  class Hooks < Redmine::Hook::ViewListener
    # The objects of a page whose attachments its texts may show by their file names.
    CONTAINERS = %i[@issue @page @news @message @topic @document].freeze

    # Scripts and styles are served through the Redmine asset pipeline (Propshaft). The file
    # URL contains a fingerprint of the content, so after a plugin update the browser picks
    # up the new version right away instead of keeping the old one from cache. Nothing is
    # written to Redmine's public/ in the process, and no write access there is needed.
    #
    # defer: the scripts run after the page is parsed, when the Redmine scripts (jQuery,
    # application-legacy with the attachment functions) are already loaded, and strictly in
    # the order they are included. That is why the highlight languages (tiptap_highlight,
    # built from the highlight/ folder) come before the editor: it picks them up on startup.
    #
    # The interface strings go before them as an inline script: it runs while the page is
    # parsed, so the dictionary is there when the deferred scripts start. It is built for
    # the language of this request, which Redmine has taken from the user's profile. The
    # attachments of what the page shows come in the same script (attachments_json).
    def view_layouts_base_html_head(context = {})
      javascript_tag("window.TiptapI18n = #{dictionary_json};\n" \
                     "window.TiptapAttachments = #{attachments_json(context[:controller])};") +
        javascript_include_tag('tiptap_highlight', plugin: 'redmine_tiptap', defer: true) +
        javascript_include_tag('tiptap_bundle', plugin: 'redmine_tiptap', defer: true) +
        stylesheet_link_tag('tiptap_editor', plugin: 'redmine_tiptap')
    end

    private

    # json_escape makes the JSON safe inside <script> (no "</script>" or "<!--" in it).
    def dictionary_json
      ERB::Util.json_escape(Translations.dictionary.to_json)
    end

    # The attachments of what the page shows (the issue, the wiki page, the news...), by
    # file name. A text keeps a picture as <img src="name.png">, and the editor needs its
    # address to show it. The form of an issue lists the attachments too, but only to
    # those who may delete them, and the form that edits a note lists none. As on the
    # saved page, the newest attachment of a name wins. Never in the way of the page:
    # if anything goes wrong, the list is empty.
    def attachments_json(controller)
      map = {}
      containers(controller).each do |container|
        container.attachments.sort_by { |a| [a.created_on || Time.now, a.id || 0] }.reverse_each do |attachment|
          next if !attachment.persisted? || map.key?(attachment.filename)

          map[attachment.filename] = {
            url: download_named_attachment_path(attachment, attachment.filename),
            thumbnail: thumbnail_path(attachment, size: 200),
            id: attachment.id
          }
        end
      end
      ERB::Util.json_escape(map.to_json)
    rescue StandardError => e
      Rails.logger.warn("redmine_tiptap: no attachment list for the editor (#{e.class}: #{e.message})")
      '{}'
    end

    # The issue of a note being edited counts too; only what the user may see is given.
    def containers(controller)
      return [] unless controller

      list = CONTAINERS.map { |name| controller.instance_variable_get(name) }
      journal = controller.instance_variable_get(:@journal)
      list << journal.journalized if journal.respond_to?(:journalized)
      list.compact.uniq.select do |container|
        container.respond_to?(:attachments) && container.respond_to?(:attachments_visible?) &&
          container.attachments_visible?(User.current)
      end
    end
  end
end
