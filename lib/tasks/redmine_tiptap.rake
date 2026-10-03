require_relative '../redmine_tiptap/locale_check'

namespace :redmine_tiptap do
  desc 'Check the interface translations of the editor (config/locales); ' \
       'LOCALE=de lists the strings not yet translated in that language'
  task :locales do
    # The language codes Redmine has: the file names of its own translations.
    redmine_codes = Dir[File.join(Rails.root, 'config', 'locales', '*.yml')].map { |path| File.basename(path, '.yml') }
    errors = RedmineTiptap::LocaleCheck.new(ENV['LOCALE'], redmine_codes).run
    exit 1 if errors > 0
  end
end
