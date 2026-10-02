// docker compose — встроенная грамматика YAML под своим именем, чтобы её можно
// было выбрать и подписать как docker compose. Псевдонимы переопределены,
// чтобы не перехватить у yaml его собственные (yml).
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
