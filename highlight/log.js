// Логи сервисов Linux — своя грамматика.
// Не привязана к конкретному сервису: ловит то, что встречается в логах почти
// всех демонов — время, уровень, адреса, процессы, пути, ключ=значение.
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
