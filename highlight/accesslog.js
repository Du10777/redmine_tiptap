// accesslog — встроенная грамматика highlight.js.
import grammar from 'highlight.js/lib/languages/accesslog';

export default {
  id: 'accesslog',
  label: 'access log',
  hint: 'nginx, apache',
  keywords: 'nginx apache access логи',
  grammar: grammar,
};
