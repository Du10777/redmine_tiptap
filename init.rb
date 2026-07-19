Redmine::Plugin.register :redmine_tiptap do
  name 'Redmine TipTap Editor'
  author 'du10'
  description 'Replaces default textarea with TipTap WYSIWYG editor'
  version '0.1.0'
  requires_redmine version_or_higher: '6.0'
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
