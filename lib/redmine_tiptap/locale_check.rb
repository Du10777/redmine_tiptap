require 'set'
require 'yaml'
require_relative 'translations'

module RedmineTiptap
  # Checks the translation files in config/locales against each other and against the
  # code that uses the strings. Run by `rake redmine_tiptap:locales`.
  #
  # - every key the JavaScript asks for (t('toolbar.bold')) must be in en.yml, and
  #   every string of en.yml must be used;
  # - a language file may only have keys that en.yml has, its top-level key must be
  #   the language code of the file name, and the code must be a language of Redmine;
  # - how much of en.yml each language has translated.
  class LocaleCheck
    PLUGIN_DIR = File.expand_path('../..', __dir__)
    LOCALES_DIR = File.join(PLUGIN_DIR, 'config', 'locales')
    HIGHLIGHT_DIR = File.join(PLUGIN_DIR, 'highlight')
    SCRIPTS = Dir[File.join(PLUGIN_DIR, 'assets', 'javascripts', 'tiptap_*.js')] \
              .reject { |path| %w[tiptap_bundle.js tiptap_highlight.js].include?(File.basename(path)) }

    # How the code asks for a string: t('toolbar.bold'), or a key kept in a table
    # and passed to t() later: labelKey: 'paragraph_styles.heading1'.
    KEY_USES = [/\bt\(\s*'([a-z0-9_.]+)'\s*\)/, /\blabelKey:\s*'([a-z0-9_.]+)'/].freeze

    # The strings of the syntax highlighting languages are not in the JavaScript, and
    # each language file may have them for any language of highlight/.
    LANGUAGE_KEY = /\Acode_languages\.([^.]+)\.(label|hint|keywords)\z/

    # locale: a language code to list the untranslated strings of.
    # redmine_codes: the language codes Redmine has, or nil if not known.
    def initialize(locale = nil, redmine_codes = nil, out = $stdout)
      @locale = locale.to_s.empty? ? nil : locale.to_s
      @redmine_codes = redmine_codes
      @out = out
      @errors = []
    end

    # Prints the report and returns the number of errors.
    def run
      files = Dir[File.join(LOCALES_DIR, '*.yml')].sort
      strings = {}
      files.each do |path|
        code = File.basename(path, '.yml')
        strings[code] = load_strings(path, code)
      end

      english = strings['en']
      if english.nil?
        error('config/locales/en.yml is missing: it is the source of all translations')
        return finish
      end

      check_usage(english)
      @out.puts
      @out.puts "Strings in en.yml: #{plain_keys(english).size}"
      strings.each do |code, translated|
        next if code == 'en'
        check_language(code, translated, english)
      end
      list_untranslated(strings[@locale], english) if @locale && @locale != 'en'
      @out.puts("No translation file for #{@locale}: copy en.yml to #{@locale}.yml") if @locale && !strings.key?(@locale)
      finish
    end

    private

    def error(message)
      @errors << message
    end

    def finish
      @out.puts
      if @errors.empty?
        @out.puts 'OK'
      else
        @out.puts "#{@errors.size} error(s):"
        @errors.each { |message| @out.puts "  #{message}" }
      end
      @errors.size
    end

    def load_strings(path, code)
      data = YAML.safe_load(File.read(path, encoding: 'UTF-8'), aliases: false)
      unless data.is_a?(Hash) && data.keys == [code]
        hint = code == 'no' ? ' (write "no": in quotes, YAML reads a bare no: as false)' : ''
        error("#{code}.yml: the only top-level key must be #{code}:#{hint}")
        return {}
      end
      tree = data[code].is_a?(Hash) ? data[code]['redmine_tiptap'] : nil
      unless tree.is_a?(Hash)
        error("#{code}.yml: there is no redmine_tiptap: key under #{code}:")
        return {}
      end
      if @redmine_codes && !@redmine_codes.include?(code)
        error("#{code}.yml: #{code} is not a language of this Redmine, so the file would never be used " \
              '(use a code from the list in config/locales/README.md)')
      end
      Translations.flatten(tree, {})
    rescue Psych::Exception => e
      error("#{code}.yml: not valid YAML: #{e.message}")
      {}
    end

    # The keys that are strings of the interface (not the highlight language texts).
    def plain_keys(strings)
      strings.keys.reject { |key| key.start_with?('code_languages.') }
    end

    def check_usage(english)
      used = Set.new
      SCRIPTS.each do |path|
        source = File.read(path, encoding: 'UTF-8')
        KEY_USES.each { |pattern| source.scan(pattern) { |match| used << match.first } }
      end
      (used - english.keys).sort.each { |key| error("#{key}: used in the JavaScript but missing from en.yml") }
      (plain_keys(english).to_set - used).sort.each { |key| error("#{key}: in en.yml but not used anywhere") }
      @out.puts "Keys used in the JavaScript: #{used.size}"
    end

    def check_language(code, translated, english)
      known = english.keys.to_set
      extra = translated.keys.reject { |key| known.include?(key) || language_text?(key) }
      extra.sort.each { |key| error("#{code}.yml: #{key} is not in en.yml (a typo, or a string that was removed)") }
      translated.keys.grep(LANGUAGE_KEY).sort.each do |key|
        language = key[LANGUAGE_KEY, 1]
        next if File.exist?(File.join(HIGHLIGHT_DIR, "#{language}.js"))
        error("#{code}.yml: #{key}: there is no language #{language} in the highlight/ folder")
      end

      total = plain_keys(english).size
      done = (plain_keys(translated).to_set & known).size
      suffix = done < total ? " (#{total - done} missing, shown in English; list them with LOCALE=#{code})" : ''
      @out.puts "#{code}: #{done} of #{total} translated#{suffix}"
    end

    def language_text?(key)
      key.match?(LANGUAGE_KEY)
    end

    def list_untranslated(translated, english)
      return unless translated
      missing = plain_keys(english).reject { |key| translated.key?(key) }
      @out.puts
      if missing.empty?
        @out.puts "#{@locale}: everything is translated"
      else
        @out.puts "Not translated in #{@locale}.yml (English shown):"
        missing.each { |key| @out.puts "  #{key}: #{english[key].inspect}" }
      end
    end
  end
end
