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

# The quotes of the Quote links (see lib/redmine_tiptap/quote_reply_patch.rb), in the two
# controllers that build them. Applied right here, not in a to_prepare block: Redmine runs
# the init.rb of a plugin within to_prepare itself (Redmine::PluginLoader), and a block
# added from there was not run any more in production. Redmine has had the builder since
# 6.0; without it nothing is changed.
if defined?(Redmine::QuoteReply::Builder)
  [JournalsController, MessagesController].each do |controller|
    controller.prepend(RedmineTiptap::QuoteReplyPatch) unless controller < RedmineTiptap::QuoteReplyPatch
  end
end
