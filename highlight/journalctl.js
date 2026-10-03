// journalctl output: the plugin's own grammar.
// Line: <time> <host> <process[pid]>: <message>. The time can be in any of the
// output formats: short, short-iso, short-precise, short-full, short-monotonic.
import { concat, logMessageRules, TS_WEEKDAY, TS_ISO, TS_SYSLOG, TS_MONOTONIC } from './_common.js';

export default {
  id: 'journalctl',
  label: 'journalctl',
  hint: 'systemd',
  keywords: 'journal systemd logs',
  grammar: function() {
    var timestamp = concat('(?:', TS_WEEKDAY, '|', TS_ISO, '|', TS_SYSLOG, '|', TS_MONOTONIC, ')');
    return {
      name: 'journalctl',
      aliases: ['journal'],
      contains: [
        // marker lines: -- Boot 3f2a... --, -- Logs begin at ... --, -- No entries --
        { scope: 'comment', match: /^-- .* --$/ },
        {
          begin: [concat('^', timestamp), /\s+/, /[\w.-]+/, /\s+/, /[^\s\[:]+(?:\[\d+\])?:/],
          beginScope: { 1: 'meta', 3: 'variable', 5: 'title' },
        },
      ].concat(logMessageRules()),
    };
  },
};
