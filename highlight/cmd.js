// cmd / .bat: built-in highlight.js grammar (dos) under a familiar name.
// The aliases are overridden so as not to take over the original grammar's own aliases.
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
