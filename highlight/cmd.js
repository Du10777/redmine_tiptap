// cmd / .bat — встроенная грамматика highlight.js (dos) под привычным именем.
// Псевдонимы переопределены, чтобы не перехватить у исходной её собственные.
import dos from 'highlight.js/lib/languages/dos';

export default {
  id: 'cmd',
  label: 'cmd',
  hint: 'Windows, .bat',
  keywords: 'bat batch dos windows',
  grammar: function(hljs) {
    var def = dos(hljs);
    def.name = 'cmd';
    def.aliases = ['bat', 'batch', 'dos'];
    return def;
  },
};
