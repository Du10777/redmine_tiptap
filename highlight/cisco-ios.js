// Cisco IOS / IOS-XE: the plugin's own grammar (npm has no ready-made one for highlight.js).
// Configuration (show running-config) and commands with the CLI prompt.
import { IPV4, QUOTE_STRING } from './_common.js';

var IFACE = /\b(?:GigabitEthernet|FastEthernet|TenGigabitEthernet|TwentyFiveGigE|FortyGigabitEthernet|HundredGigE|Ethernet|Serial|Loopback|Vlan|Port-channel|Tunnel|Management|Dialer|BVI|Null|mgmt|Gi|Fa|Te|Twe|Fo|Hu|Eth|Et|Se|Lo|Po|Tu|Vl)\d+(?:\/\d+)*(?:\.\d+)?(?![\w])/;
// top-level configuration commands (not indented)
var TOP = /^(?:interface|router|line|vlan|hostname|ip|ipv6|access-list|ntp|snmp-server|logging|aaa|username|enable|service|spanning-tree|crypto|class-map|policy-map|route-map|object-group|version|boot|end|vrf|track|archive|clock|vtp|radius|tacacs|control-plane|redundancy|banner|key|errdisable|lldp|cdp|mac|monitor|license|exit|do)\b/;
// subcommands and arguments, found anywhere in a line
var SUB = /\b(?:ip|ipv6|vlan|interface|vrf|switchport|shutdown|mode|access|trunk|allowed|native|encapsulation|dot1q|address|network|area|neighbor|remote-as|redistribute|passive-interface|default-information|originate|transport|input|output|login|local|password|secret|privilege|speed|duplex|auto|full|half|channel-group|active|passive|desirable|standby|vrrp|priority|preempt|helper-address|nat|inside|outside|overload|pool|source|destination|static|route|any|host|eq|neq|gt|lt|range|established|log|tcp|udp|icmp|ospf|eigrp|bgp|rip|portfast|bpduguard|exec-timeout|synchronous|ssh|telnet|domain-name|name-server|server|group|match|set|class|police|bandwidth|mtu|show|running-config|startup-config|configure|terminal|write|memory|copy|ping|traceroute|debug|reload|brief|summary|detail)\b/;

export default {
  id: 'cisco-ios',
  label: 'Cisco IOS',
  hint: 'IOS / IOS-XE',
  keywords: 'cisco ios ios-xe',
  grammar: function() {
    return {
      name: 'Cisco IOS',
      aliases: ['ios', 'cisco'],
      case_insensitive: true,
      contains: [
        { scope: 'comment', match: /^\s*!.*$/ },
        // CLI prompt: SW1#, R1(config-if)#, R1>
        { scope: 'meta', match: /^[\w.-]+(?:\([\w-]+\))?[#>]/ },
        // free text of descriptions and ACL remarks
        { begin: [/^\s*(?:description|remark)/, /\s+/, /[^\n]+/], beginScope: { 1: 'keyword', 3: 'string' } },
        { begin: [/^hostname/, /\s+/, /\S+/], beginScope: { 1: 'keyword', 3: 'title' } },
        // ACL permit and deny: green and red, so they are visible at a glance
        { scope: 'addition', match: /\bpermit\b/ },
        { scope: 'deletion', match: /\bdeny\b/ },
        { scope: 'literal', match: /^\s*no\b/ },
        { scope: 'title', match: IFACE },
        { scope: 'number', match: IPV4 },
        { scope: 'number', match: /\b[0-9a-f]{4}\.[0-9a-f]{4}\.[0-9a-f]{4}\b/ },   // MAC in Cisco notation
        { scope: 'keyword', match: TOP },
        { scope: 'keyword', match: SUB },
        QUOTE_STRING,
        { scope: 'number', match: /\b\d+\b/ },
      ],
    };
  },
};
