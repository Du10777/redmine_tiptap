// Linux service logs: the plugin's own grammar.
// Not tied to a specific service: catches what shows up in the logs of almost
// every daemon - time, level, addresses, processes, paths, key=value.
import { logMessageRules } from './_common.js';

export default {
  id: 'log',
  label: 'log',
  hint: 'логи сервисов Linux',
  keywords: 'logs syslog логи журнал linux',
  grammar: function() {
    return {
      name: 'log',
      aliases: ['logs', 'syslog'],
      contains: logMessageRules(),
    };
  },
};
