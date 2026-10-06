Redmine::Plugin.register :redmine_tiptap do
  name 'Redmine TipTap Editor'
  author 'du10'
  description 'Replaces default textarea with TipTap WYSIWYG editor. Supports Redmine 6.* and 7.*'
  version '0.1.0'
  # Deliberately a range, not version_or_higher: that one would also let through a
  # Redmine 8 the plugin has never been tried on. compare_versions cuts the version
  # of Redmine to the length of the requirement, so '7.99' covers every 7.x.
  requires_redmine version: '6.0'..'7.99'
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
