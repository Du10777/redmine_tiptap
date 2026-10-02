// Собственные грамматики highlight.js — для того, чего нет ни в самом
// highlight.js, ни в сторонних пакетах npm: общие логи сервисов Linux,
// вывод journalctl и конфигурация Cisco IOS. Плюс обёртки над встроенными
// грамматиками, чтобы они появились в списке под привычными именами.
//
// Грамматика — это функция (hljs) => описание языка. Регистрирует их
// tiptap_codeblock.js; в редактор и в просмотр они попадают вместе с
// бандлом, отдельных файлов с сервера никто не подгружает.

import dos from 'highlight.js/lib/languages/dos';
import yaml from 'highlight.js/lib/languages/yaml';

// Склеивает регулярки (и строки) в одну — чтобы не дублировать куски.
function concat() {
  return new RegExp(Array.prototype.map.call(arguments, function(part) {
    return typeof part === 'string' ? part : part.source;
  }).join(''));
}

// --- Строительные блоки для логов --------------------------------------------
// Внимание: highlight.js склеивает регулярки всех правил в одну и игнорирует
// их собственные флаги, поэтому регистронезависимость тут расписана явно.

var MONTH = /(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/;

var TS_ISO = /\b\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}:\d{2}(?:[.,]\d+)?(?:Z|[+-]\d{2}:?\d{2})?/;  // 2026-10-02T03:00:01.123+0200
var TS_SYSLOG = concat(/\b/, MONTH, /\s+\d{1,2}\s+\d{2}:\d{2}:\d{2}(?:\.\d+)?/);           // Oct  2 03:00:01
var TS_WEEKDAY = /\b(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun)\s+\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2}(?:\s+[A-Z]{2,5})?/; // Thu 2026-10-02 03:00:01 CEST
var TS_HTTPD = /\[\d{2}\/[A-Z][a-z]{2}\/\d{4}:\d{2}:\d{2}:\d{2} [+-]\d{4}\]/;              // [02/Oct/2026:03:00:01 +0200]
var TS_SLASH = /\b\d{4}[\/.]\d{2}[\/.]\d{2}(?:[ T]\d{2}:\d{2}:\d{2}(?:[.,]\d+)?)?/;          // 2026/10/02 03:00:01
var TS_MONOTONIC = /\[\s*\d+\.\d+\]/;                                                         // [   12.345678]
var TIME = /\b\d{2}:\d{2}:\d{2}(?:[.,]\d+)?\b/;

var MAC = /\b[0-9A-Fa-f]{2}(?:[:-][0-9A-Fa-f]{2}){5}\b/;
var IPV4 = /\b(?:25[0-5]|2[0-4]\d|1?\d?\d)(?:\.(?:25[0-5]|2[0-4]\d|1?\d?\d)){3}(?:\/\d{1,2})?(?::\d{1,5})?\b/;
// IPv6 — только если есть «::» или шестнадцатеричная буква, иначе под шаблон
// попадало бы время вида 03:00:01.
var IPV6 = /\b(?=[0-9A-Fa-f:]*(?:::|[A-Fa-f]))[0-9A-Fa-f]{1,4}(?::[0-9A-Fa-f]{0,4}){2,7}\b/;

function logMessageRules() {
  return [
    // строки стектрейсов приглушаем: Java/JS «at ...» и Python «File "...", line N»
    { scope: 'comment', match: /^\s+at\s+\S.*$/ },
    { scope: 'comment', match: /^\s+File ".*", line \d+.*$/ },

    { scope: 'link', match: /\b(?:https?|ftp|wss?):\/\/[^\s"'<>]+/ },

    // отметки времени
    { scope: 'meta', match: TS_HTTPD },
    { scope: 'meta', match: TS_WEEKDAY },
    { scope: 'meta', match: TS_ISO },
    { scope: 'meta', match: TS_SLASH },
    { scope: 'meta', match: TS_SYSLOG },
    { scope: 'meta', match: TS_MONOTONIC },
    { scope: 'meta', match: TIME },

    // сетевые адреса (MAC раньше IPv6 — он тоже из шестнадцатеричных групп)
    { scope: 'number', match: MAC },
    { scope: 'number', match: IPV4 },
    { scope: 'number', match: IPV6 },

    // уровни и исходы — каждому свой цвет
    { scope: 'log-error', match: /\b(?:EMERG(?:ENCY)?|ALERT|CRIT(?:ICAL)?|[Cc]ritical|FATAL|[Ff]atal|ERROR|[Ee]rror|ERR|[Ee]rr|SEVERE|PANIC|[Pp]anic|FAIL(?:ED|URE)?|[Ff]ail(?:ed|ure)?|DENIED|[Dd]enied|Traceback|[\w.]*Exception)\b/ },
    { scope: 'log-warn', match: /\b(?:WARN(?:ING)?|[Ww]arn(?:ing)?|NOTICE|[Nn]otice|DEPRECATED|[Dd]eprecated|[Tt]imeout|[Tt]imed out)\b/ },
    { scope: 'log-ok', match: /\b(?:OK|SUCCESS(?:FUL(?:LY)?)?|[Ss]uccess(?:ful(?:ly)?)?|PASSED|[Aa]ccepted|Started|Finished|Reached target|Listening on|Deactivated successfully)\b/ },
    { scope: 'log-info', match: /\b(?:INFO|Info)\b|\[info\]/ },
    { scope: 'comment', match: /\b(?:DEBUG|Debug|TRACE|Trace|VERBOSE)\b|\[debug\]/ },

    // процесс с PID перед двоеточием: sshd[1234]:
    { scope: 'title', match: /\b[\w.@-]+\[\d+\](?=:)/ },
    // ключ=значение: user=admin rhost=10.0.0.1
    { scope: 'attr', match: /\b[A-Za-z_][\w.-]*(?==)/ },

    { scope: 'string', match: /"(?:[^"\\\n]|\\.)*"/ },
    // пути: /var/log/syslog
    { scope: 'symbol', match: /(?<![\w:\/.])\/(?:[\w.@+-]+\/)*[\w.@+-]+\/?/ },
    { scope: 'number', match: /\b\d+(?:\.\d+)?(?:ms|us|ns|s|sec|min|h|[KMGT]i?B|B|%)?(?![\w.])/ },
  ];
}

// --- Общий формат логов -----------------------------------------------------
// Не привязан к конкретному сервису: ловит то, что встречается в логах почти
// всех демонов Linux — время, уровень, адреса, процессы, пути, ключ=значение.
export function log() {
  return {
    name: 'log',
    aliases: ['logs', 'syslog'],
    contains: logMessageRules(),
  };
}

// --- journalctl -------------------------------------------------------------
// Строка: <время> <хост> <процесс[pid]>: <сообщение>. Время — в любом из
// форматов вывода: short, short-iso, short-precise, short-full, short-monotonic.
export function journalctl() {
  var timestamp = concat('(?:', TS_WEEKDAY, '|', TS_ISO, '|', TS_SYSLOG, '|', TS_MONOTONIC, ')');
  return {
    name: 'journalctl',
    aliases: ['journal'],
    contains: [
      // служебные строки: -- Boot 3f2a… --, -- Logs begin at … --, -- No entries --
      { scope: 'comment', match: /^-- .* --$/ },
      {
        begin: [concat('^', timestamp), /\s+/, /[\w.-]+/, /\s+/, /[^\s\[:]+(?:\[\d+\])?:/],
        beginScope: { 1: 'meta', 3: 'variable', 5: 'title' },
      },
    ].concat(logMessageRules()),
  };
}

// --- Cisco IOS / IOS-XE -----------------------------------------------------
// Конфигурация (show running-config) и команды с приглашением CLI.
export function ciscoIos() {
  var IFACE = /\b(?:GigabitEthernet|FastEthernet|TenGigabitEthernet|TwentyFiveGigE|FortyGigabitEthernet|HundredGigE|Ethernet|Serial|Loopback|Vlan|Port-channel|Tunnel|Management|Dialer|BVI|Null|mgmt|Gi|Fa|Te|Twe|Fo|Hu|Eth|Et|Se|Lo|Po|Tu|Vl)\d+(?:\/\d+)*(?:\.\d+)?(?![\w])/;
  var TOP = /^(?:interface|router|line|vlan|hostname|ip|ipv6|access-list|ntp|snmp-server|logging|aaa|username|enable|service|spanning-tree|crypto|class-map|policy-map|route-map|object-group|version|boot|end|vrf|track|archive|clock|vtp|radius|tacacs|control-plane|redundancy|banner|key|errdisable|lldp|cdp|mac|monitor|license|exit|do)\b/;
  var SUB = /\b(?:ip|ipv6|vlan|interface|vrf|switchport|shutdown|mode|access|trunk|allowed|native|encapsulation|dot1q|address|network|area|neighbor|remote-as|redistribute|passive-interface|default-information|originate|transport|input|output|login|local|password|secret|privilege|speed|duplex|auto|full|half|channel-group|active|passive|desirable|standby|vrrp|priority|preempt|helper-address|nat|inside|outside|overload|pool|source|destination|static|route|any|host|eq|neq|gt|lt|range|established|log|tcp|udp|icmp|ospf|eigrp|bgp|rip|portfast|bpduguard|exec-timeout|synchronous|ssh|telnet|domain-name|name-server|server|group|match|set|class|police|bandwidth|mtu|show|running-config|startup-config|configure|terminal|write|memory|copy|ping|traceroute|debug|reload|brief|summary|detail)\b/;

  return {
    name: 'Cisco IOS',
    aliases: ['ios', 'cisco'],
    case_insensitive: true,
    contains: [
      { scope: 'comment', match: /^\s*!.*$/ },
      // приглашение CLI: SW1#, R1(config-if)#, R1>
      { scope: 'meta', match: /^[\w.-]+(?:\([\w-]+\))?[#>]/ },
      // свободный текст описаний и примечаний к ACL
      { begin: [/^\s*(?:description|remark)/, /\s+/, /[^\n]+/], beginScope: { 1: 'keyword', 3: 'string' } },
      { begin: [/^hostname/, /\s+/, /\S+/], beginScope: { 1: 'keyword', 3: 'title' } },
      // разрешения в ACL: зелёным и красным, чтобы сразу было видно
      { scope: 'addition', match: /\bpermit\b/ },
      { scope: 'deletion', match: /\bdeny\b/ },
      { scope: 'literal', match: /^\s*no\b/ },
      { scope: 'title', match: IFACE },
      { scope: 'number', match: IPV4 },
      { scope: 'number', match: /\b[0-9a-f]{4}\.[0-9a-f]{4}\.[0-9a-f]{4}\b/ },   // MAC в нотации Cisco
      { scope: 'keyword', match: TOP },
      { scope: 'keyword', match: SUB },
      hljsQuoteString(),
      { scope: 'number', match: /\b\d+\b/ },
    ],
  };
}

function hljsQuoteString() {
  return { scope: 'string', match: /"(?:[^"\\\n]|\\.)*"/ };
}

// --- Обёртки над встроенными грамматиками -----------------------------------
// Регистрируем под привычными именами. Псевдонимы переопределены, чтобы не
// перехватить у исходных грамматик их собственные (yml, cmd).

export function cmd(hljs) {
  var def = dos(hljs);
  def.name = 'cmd';
  def.aliases = ['bat', 'batch', 'dos'];
  return def;
}

export function dockerCompose(hljs) {
  var def = yaml(hljs);
  def.name = 'docker compose';
  def.aliases = ['compose'];
  return def;
}
