Redmine::Plugin.register :redmine_tiptap do
  name 'Redmine TipTap Editor'
  author 'du10'
  description 'Replaces default textarea with TipTap WYSIWYG editor. Supports Redmine 6.*'
  version '0.1.0'
  # Именно диапазон, а не version_or_higher: тот пропускал и Redmine 7,
  # где плагин не поддерживается.
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
