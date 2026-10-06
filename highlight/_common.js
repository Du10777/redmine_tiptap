// Shared parts of the plugin's own grammars (log, journalctl, cisco-ios).
// Files whose names start with "_" are not languages: _compile.sh does not register them.
//
// Note: highlight.js joins the regexes of all rules of a language into one and
// ignores their own flags, so case-insensitivity in the rules is spelled out
// explicitly ([Ee]rror and the like).

// Joins regexes (and strings) into one, so that the parts are not duplicated.
export function concat() {
  return new RegExp(Array.prototype.map.call(arguments, function(part) {
    return typeof part === 'string' ? part : part.source;
  }).join(''));
}

var MONTH = /(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/;

export var TS_ISO = /\b\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}:\d{2}(?:[.,]\d+)?(?:Z|[+-]\d{2}:?\d{2})?/;  // 2026-10-02T03:00:01.123+0200
export var TS_SYSLOG = concat(/\b/, MONTH, /\s+\d{1,2}\s+\d{2}:\d{2}:\d{2}(?:\.\d+)?/);           // Oct  2 03:00:01
export var TS_WEEKDAY = /\b(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun)\s+\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2}(?:\s+[A-Z]{2,5})?/; // Thu 2026-10-02 03:00:01 CEST
export var TS_HTTPD = /\[\d{2}\/[A-Z][a-z]{2}\/\d{4}:\d{2}:\d{2}:\d{2} [+-]\d{4}\]/;              // [02/Oct/2026:03:00:01 +0200]
export var TS_SLASH = /\b\d{4}[\/.]\d{2}[\/.]\d{2}(?:[ T]\d{2}:\d{2}:\d{2}(?:[.,]\d+)?)?/;          // 2026/10/02 03:00:01
export var TS_MONOTONIC = /\[\s*\d+\.\d+\]/;                                                         // [   12.345678]
var TIME = /\b\d{2}:\d{2}:\d{2}(?:[.,]\d+)?\b/;

var MAC = /\b[0-9A-Fa-f]{2}(?:[:-][0-9A-Fa-f]{2}){5}\b/;
export var IPV4 = /\b(?:25[0-5]|2[0-4]\d|1?\d?\d)(?:\.(?:25[0-5]|2[0-4]\d|1?\d?\d)){3}(?:\/\d{1,2})?(?::\d{1,5})?\b/;
// IPv6 only if there is "::" or a hex letter, otherwise the pattern would
// also match a time like 03:00:01.
var IPV6 = /\b(?=[0-9A-Fa-f:]*(?:::|[A-Fa-f]))[0-9A-Fa-f]{1,4}(?::[0-9A-Fa-f]{0,4}){2,7}\b/;

export var QUOTE_STRING = { scope: 'string', match: /"(?:[^"\\\n]|\\.)*"/ };

// Rules for the text of log messages, shared by log and journalctl.
export function logMessageRules() {
  return [
    // dim stack trace lines: Java/JS 'at ...' and Python 'File "...", line N'
    { scope: 'comment', match: /^\s+at\s+\S.*$/ },
    { scope: 'comment', match: /^\s+File ".*", line \d+.*$/ },

    { scope: 'link', match: /\b(?:https?|ftp|wss?):\/\/[^\s"'<>]+/ },

    // timestamps
    { scope: 'meta', match: TS_HTTPD },
    { scope: 'meta', match: TS_WEEKDAY },
    { scope: 'meta', match: TS_ISO },
    { scope: 'meta', match: TS_SLASH },
    { scope: 'meta', match: TS_SYSLOG },
    { scope: 'meta', match: TS_MONOTONIC },
    { scope: 'meta', match: TIME },

    // network addresses (MAC before IPv6: it is also made of hex groups)
    { scope: 'number', match: MAC },
    { scope: 'number', match: IPV4 },
    { scope: 'number', match: IPV6 },

    // levels and outcomes, each in its own color (colors in assets/stylesheets/src/06_code.css)
    { scope: 'log-error', match: /\b(?:EMERG(?:ENCY)?|ALERT|CRIT(?:ICAL)?|[Cc]ritical|FATAL|[Ff]atal|ERROR|[Ee]rror|ERR|[Ee]rr|SEVERE|PANIC|[Pp]anic|FAIL(?:ED|URE)?|[Ff]ail(?:ed|ure)?|DENIED|[Dd]enied|Traceback|[\w.]*Exception)\b/ },
    { scope: 'log-warn', match: /\b(?:WARN(?:ING)?|[Ww]arn(?:ing)?|NOTICE|[Nn]otice|DEPRECATED|[Dd]eprecated|[Tt]imeout|[Tt]imed out)\b/ },
    { scope: 'log-ok', match: /\b(?:OK|SUCCESS(?:FUL(?:LY)?)?|[Ss]uccess(?:ful(?:ly)?)?|PASSED|[Aa]ccepted|Started|Finished|Reached target|Listening on|Deactivated successfully)\b/ },
    { scope: 'log-info', match: /\b(?:INFO|Info)\b|\[info\]/ },
    { scope: 'comment', match: /\b(?:DEBUG|Debug|TRACE|Trace|VERBOSE)\b|\[debug\]/ },

    // process with a PID before a colon: sshd[1234]:
    { scope: 'title', match: /\b[\w.@-]+\[\d+\](?=:)/ },
    // key=value: user=admin rhost=10.0.0.1
    { scope: 'attr', match: /\b[A-Za-z_][\w.-]*(?==)/ },

    QUOTE_STRING,
    // paths: /var/log/syslog
    { scope: 'symbol', match: /(?<![\w:\/.])\/(?:[\w.@+-]+\/)*[\w.@+-]+\/?/ },
    { scope: 'number', match: /\b\d+(?:\.\d+)?(?:ms|us|ns|s|sec|min|h|[KMGT]i?B|B|%)?(?![\w.])/ },
  ];
}
