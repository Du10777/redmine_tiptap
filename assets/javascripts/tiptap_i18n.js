// Interface strings of the editor.
//
// The plugin's head hook puts the dictionary for the language of the current user
// on the page before the scripts run (window.TiptapI18n). The dictionary is built
// from config/locales/<language>.yml, so the texts live in those files and not in
// the code. A key is the dotted path of the YAML key under "redmine_tiptap", for
// example t('toolbar.bold').

var reported = {};

// The text for a key, or undefined when the dictionary has none.
export function tOptional(key) {
  var dictionary = window.TiptapI18n;
  var value = dictionary && dictionary[key];
  return typeof value === 'string' ? value : undefined;
}

// The text for a key. A key the dictionary lacks (a typo, or the dictionary was not
// put on the page) is shown as it is and reported once in the console.
export function t(key) {
  var value = tOptional(key);
  if (value !== undefined) return value;
  if (!reported[key]) {
    reported[key] = true;
    if (window.console) console.warn('redmine_tiptap: no text for the key "' + key + '"');
  }
  return key;
}
