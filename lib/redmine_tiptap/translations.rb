module RedmineTiptap
  # Interface strings of the editor for the JavaScript side.
  #
  # The strings live in config/locales/<language>.yml under the "redmine_tiptap"
  # key. Redmine loads these files together with its own translations, and for each
  # request it has already chosen the language from the user's profile (or, for an
  # anonymous visitor, from the browser and the default language setting), so
  # I18n.locale is the language to show.
  module Translations
    NAMESPACE = :redmine_tiptap

    # The strings of the language as a flat dictionary, {"toolbar.bold" => "Bold"}.
    # Whatever the language lacks comes from the languages it falls back to
    # (pt-BR -> pt -> en), so a partly translated file is fine.
    def self.dictionary(locale = ::I18n.locale)
      chain(locale).reverse.each_with_object({}) do |code, dictionary|
        tree = ::I18n.t(NAMESPACE, locale: code, default: {})
        flatten(tree, dictionary) if tree.is_a?(Hash)
      end
    end

    # The language and the languages to take missing strings from, the closest first.
    def self.chain(locale)
      codes = ::I18n.respond_to?(:fallbacks) ? ::I18n.fallbacks[locale] : [locale, ::I18n.default_locale]
      # Only languages Redmine knows can be asked for.
      codes.select { |code| ::I18n.available_locales.include?(code.to_sym) }
    end

    # Joins the nested keys with dots. Empty strings do not count as translations:
    # a translator can leave a string empty to get the English one.
    def self.flatten(tree, dictionary, prefix = nil)
      tree.each do |key, value|
        path = [prefix, key].compact.join('.')
        if value.is_a?(Hash)
          flatten(value, dictionary, path)
        elsif value.is_a?(String) && !value.strip.empty?
          dictionary[path] = value
        end
      end
      dictionary
    end
  end
end
