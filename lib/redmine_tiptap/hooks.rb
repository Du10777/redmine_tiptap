module RedmineTiptap
  class Hooks < Redmine::Hook::ViewListener
    def view_layouts_base_html_head(context = {})
      src = File.join(File.dirname(__FILE__), '..', '..', 'assets', 'javascripts', 'tiptap_bundle.js')
      dst = File.join(Rails.root, 'public', 'tiptap_bundle.js')
      FileUtils.cp(src, dst) if !File.exist?(dst) || File.size(src) != File.size(dst)

      map_src = src + '.map'
      map_dst = dst + '.map'
      if File.exist?(map_src)
        FileUtils.cp(map_src, map_dst) if !File.exist?(map_dst) || File.size(map_src) != File.size(map_dst)
      end

      javascript_include_tag('tiptap_editor', plugin: 'redmine_tiptap') +
      stylesheet_link_tag('tiptap_editor', plugin: 'redmine_tiptap')
    end
  end
end
