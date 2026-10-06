// docker compose: built-in YAML grammar under its own name, so that it can be
// picked and labeled as docker compose. The aliases are overridden so as not
// to take over the aliases of yaml itself (yml).
import yaml from 'highlight.js/lib/languages/yaml';

export default {
  id: 'docker-compose',
  label: 'docker compose',
  hint: 'YAML',
  keywords: 'compose yaml yml docker',
  grammar: function(hljs) {
    var def = yaml(hljs);
    def.name = 'docker compose';
    def.aliases = ['compose'];
    return def;
  },
};
