Redmine::Plugin.register :redmine_tiptap do
  name 'Redmine TipTap Editor'
  author 'du10'
  description 'Replaces default textarea with TipTap WYSIWYG editor. Supports Redmine 6.*'
  version '0.1.0'
  # Deliberately a range, not version_or_higher: that one also let Redmine 7
  # through, where the plugin is not supported.
  requires_redmine version: '6.0'..'6.99'
end

require_relative 'lib/redmine/wiki_formatting/tiptap/formatter'

Redmine::WikiFormatting.register(:tiptap,
  Redmine::WikiFormatting::Tiptap::Formatter,
  Redmine::WikiFormatting::Tiptap::Helper,
  label: 'TipTap HTML'
) unless Redmine::WikiFormatting.format_names.include?('tiptap')

Rails.application.config.to_prepare do
  require_dependency 'redmine_tiptap/hooks'
end
