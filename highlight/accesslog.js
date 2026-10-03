// accesslog: built-in highlight.js grammar.
import grammar from 'highlight.js/lib/languages/accesslog';

export default {
  id: 'accesslog',
  label: 'access log',
  hint: 'nginx, apache',
  keywords: 'nginx apache access logs',
  grammar: grammar,
};
