/*
 * The "Preview" tab of the demo: how a saved text looks on a page of Redmine.
 *
 * In Redmine the text is turned into the page on the server, by the formatter of the plugin
 * (lib/redmine/wiki_formatting/tiptap/formatter.rb) and its cleaner (sanitizer.rb). There is no
 * server here, so the same steps are repeated in the browser, in the same order:
 *   1. line breaks right after <pre><code> and before </code></pre> are dropped;
 *   2. quotes wrapped in plain <blockquote> by early versions of the editor are unwrapped;
 *   3. a text of CKEditor is recognized by its markup (it is wrapped in div.tiptap-legacy at the end);
 *   4. CKEditor's "Special Container" becomes a code block, its code languages get the names of this plugin;
 *   5. the HTML is cleaned with the allowlist of sanitizer.rb (the lists come from that file, see
 *      build_demo.py, which also checks that the ported parts of the Ruby code have not changed);
 *   6. plain web addresses become links (Redmine's auto_link!).
 * Then what Redmine itself does on the page: pictures given by the file name of an attachment get its
 * address, and every code block gets the "Copy" button (the plugin puts the language badge next to it).
 * Redmine links (#123, [[Wiki]]) and macros need Redmine and stay plain text.
 */
(function () {
  'use strict';

  var C = window.DEMO_SANITIZER;
  var ELEMENTS = new Set(C.elements);
  var CSS_PROPERTIES = new Set(C.cssProperties);
  var ALLOWED_CLASS = new RegExp(C.allowedClass);
  // What Sanitize removes together with its content when it is not allowed (Sanitize::Config::DEFAULT).
  var REMOVE_CONTENTS = new Set(['iframe', 'math', 'noembed', 'noframes', 'noscript', 'plaintext', 'script',
                                 'style', 'svg', 'xmp', 'template']);

  // --- formatter.rb ------------------------------------------------------------------------------

  var CKEDITOR_SIGNS = new RegExp([
    '<br />', '<hr />', '<img\\b[^>]*/>',
    '</(?:p|h[1-6])>[ \\t]*\\r?\\n[ \\t]*\\r?\\n[ \\t]*<(?:p|h[1-6])\\b',
    '<(?:ul|ol|table|thead|tbody|tfoot|tr|blockquote|div)\\b[^>]*>[ \\t]*\\r?\\n\\t+<'
  ].join('|'));

  var SPECIAL_CONTAINER_RE = /<div\s+style\s*=\s*(["'])([\s\S]*?)\1\s*>((?:(?!<\/?div\b)[\s\S])*)<\/div>/gi;

  function cssValue(value) {
    value = value.toLowerCase().replace(/\s*!important\s*$/, '').replace(/\s+/g, ' ').trim();
    value = value.replace(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/g, function (m, r, g, b) {
      return '#' + [r, g, b].map(function (n) { return ('0' + parseInt(n, 10).toString(16)).slice(-2); }).join('');
    });
    return value.replace(/#([0-9a-f])([0-9a-f])([0-9a-f])(?![0-9a-f])/g, function (m, r, g, b) {
      return '#' + r + r + g + g + b + b;
    });
  }

  function specialContainerStyle(style) {
    var declarations = [];
    style.split(';').forEach(function (declaration) {
      var i = declaration.indexOf(':');
      if (i < 0) return;
      declarations.push(declaration.slice(0, i).trim().toLowerCase() + ':' + cssValue(declaration.slice(i + 1)));
    });
    return declarations.sort().join('|') === C.specialContainerStyle.slice().sort().join('|');
  }

  function containerCode(html) {
    return html.replace(/[ \t\r\n\f]+/g, ' ')
      .replace(/ ?<br\b[^>]*> ?/gi, '\n')
      .replace(/ ?<\/(?:p|div|h[1-6]|li|blockquote|address|pre)> ?/gi, '\n')
      .replace(/ ?<\/?(?:p|div|h[1-6]|ul|ol|li|blockquote|address|pre)\b[^>]*> ?/gi, '')
      .replace(/^[ \n]+|[ \n]+$/g, '');
  }

  function convertSpecialContainers(html) {
    if (!/<div\b/i.test(html)) return html;
    return html.replace(SPECIAL_CONTAINER_RE, function (whole, quote, style, inner) {
      // In Redmine the macros of the text are already taken out at this point ({{macro_1}}).
      if (/\{\{/.test(inner) || !specialContainerStyle(style)) return whole;
      return '<pre><code class="language-plaintext">' + containerCode(inner) + '</code></pre>';
    });
  }

  function nameCodeLanguages(html) {
    return html.replace(/(<pre\b[^>]*>\s*<code\s+class=")([^"]*)(")/gi, function (whole, head, classes, tail) {
      var names = classes.split(/\s+/).filter(Boolean);
      if (!names.length || names.some(function (n) { return n.indexOf('language-') === 0; })) return whole;
      var language = names.filter(function (n) {
        return /^[\w+#.-]+$/.test(n) && n !== 'syntaxhl' && n !== 'hljs';
      })[0];
      if (!language) return whole;
      language = language.toLowerCase();
      return head + 'language-' + (C.codeLanguageAliases[language] || language) + tail;
    });
  }

  function quoteBlock(el) {
    return (el.getAttribute('class') || '').split(/\s+/).indexOf('tiptap-quote') >= 0;
  }

  function wrapsOnlyQuote(el) {
    if (quoteBlock(el)) return false;
    for (var node = el.firstChild; node; node = node.nextSibling) {
      if (node.nodeType === 3 && node.textContent.trim() !== '') return false;
    }
    var children = el.children;
    if (children.length !== 1 || children[0].nodeName !== 'BLOCKQUOTE') return false;
    return quoteBlock(children[0]) || wrapsOnlyQuote(children[0]);
  }

  function unwrapQuotes(html) {
    var box = document.createElement('template');
    box.innerHTML = html;
    var changed = false;
    for (;;) {
      var wrapper = Array.prototype.filter.call(box.content.querySelectorAll('blockquote'), wrapsOnlyQuote)[0];
      if (!wrapper) break;
      wrapper.replaceWith(wrapper.children[0]);
      changed = true;
    }
    return changed ? box.innerHTML : html;
  }

  // --- sanitizer.rb ------------------------------------------------------------------------------

  // Redmine::Helpers::URL
  function uriWithSafeScheme(uri, schemes) {
    if (uri.indexOf(':') < 0) return true;
    if (/[\s<>"{}|\\^`]/.test(uri)) return false;          // URI.parse would fail
    var m = /^([a-z][a-z0-9+.\-]*):/i.exec(uri);
    return schemes.indexOf(m ? m[1].toLowerCase() : null) >= 0;
  }

  function uriWithLinkSafeScheme(uri) {
    var m = /^\s*([^\/#]*?)(?::|&#0*58|&#x0*3a)/i.exec(uri);
    if (!m) return true;
    var scheme = m[1].toLowerCase();
    if (!/^[a-z][a-z0-9+.\-]*$/.test(scheme)) return false;
    return ['javascript', 'vbscript', 'data'].indexOf(scheme) < 0;
  }

  function ownHost(url) {
    var m = /^[a-z][a-z0-9+.\-]*:\/\/([^\/?#:]*)/i.exec(url);
    var host = m ? m[1].toLowerCase() : '';
    return host === '' || host === window.location.hostname.toLowerCase();
  }

  function splitDeclarations(css) {
    var out = [], depth = 0, quote = null, start = 0;
    for (var i = 0; i < css.length; i++) {
      var ch = css[i];
      if (quote) { if (ch === quote) quote = null; continue; }
      if (ch === '"' || ch === "'") quote = ch;
      else if (ch === '(') depth++;
      else if (ch === ')') depth = Math.max(0, depth - 1);
      else if (ch === ';' && depth === 0) { out.push(css.slice(start, i)); start = i + 1; }
    }
    out.push(css.slice(start));
    return out;
  }

  // Sanitize::CSS with the allowed properties and no allowed URL protocols.
  function cleanStyle(css) {
    var kept = [];
    splitDeclarations(css).forEach(function (declaration) {
      var i = declaration.indexOf(':');
      if (i < 0) return;
      var property = declaration.slice(0, i).trim().toLowerCase();
      var value = declaration.slice(i + 1).trim();
      if (!value || !CSS_PROPERTIES.has(property)) return;
      if (/url\s*\(|expression\s*\(|javascript\s*:|-moz-binding|behavior\s*:/i.test(value)) return;
      kept.push(property + ': ' + value);
    });
    return kept.length ? kept.join('; ') + ';' : '';
  }

  function allowedAttribute(element, name) {
    var all = C.attributes[':all'] || [];
    var own = C.attributes[element] || [];
    return all.indexOf(name) >= 0 || own.indexOf(name) >= 0;
  }

  // Returns false when the element has to go away (FILTER_INPUTS, FILTER_IFRAMES).
  function cleanElement(el, name) {
    Array.prototype.slice.call(el.attributes).forEach(function (attribute) {
      var attr = attribute.name.toLowerCase();
      if (!allowedAttribute(name, attr)) { el.removeAttribute(attribute.name); return; }
      if (attr === 'class') {                                 // FILTER_CLASSES
        var classes = attribute.value.split(/\s+/).filter(function (c) { return ALLOWED_CLASS.test(c); });
        if (classes.length) el.setAttribute('class', classes.join(' ')); else el.removeAttribute('class');
      } else if (attr === 'style') {
        var style = cleanStyle(attribute.value);
        if (style) el.setAttribute('style', style); else el.removeAttribute('style');
      }
    });
    if (name === 'input') return (el.getAttribute('type') || '').toLowerCase() === 'checkbox';
    if (name === 'a' || name === 'img') {                    // FILTER_URLS
      var key = name === 'a' ? 'href' : 'src';
      if (el.hasAttribute(key)) {
        var url = el.getAttribute(key).trim();
        var safe = name === 'a' ? uriWithLinkSafeScheme(url) : uriWithSafeScheme(url, ['http', 'https', null]);
        if (!url || !safe) el.removeAttribute(key); else el.setAttribute(key, url);
      }
    }
    if (name === 'iframe') {                                  // FILTER_IFRAMES
      var src = (el.getAttribute('src') || '').trim();
      if (src.indexOf('//') === 0) src = 'https:' + src;
      if (!src || !uriWithSafeScheme(src, ['http', 'https']) || ownHost(src)) return false;
      el.setAttribute('src', el.getAttribute('src').trim());
      el.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-popups allow-presentation');
      el.setAttribute('allow', 'fullscreen; picture-in-picture');
      el.setAttribute('loading', 'lazy');
      el.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
    }
    return true;
  }

  function cleanChildren(parent) {
    var node = parent.firstChild;
    while (node) {
      var next = node.nextSibling;
      if (node.nodeType === 1) {
        var name = node.nodeName.toLowerCase();
        if (!ELEMENTS.has(name)) {
          if (REMOVE_CONTENTS.has(name)) {
            node.remove();
          } else {                                            // not allowed: the element goes, its content stays
            cleanChildren(node);
            while (node.firstChild) parent.insertBefore(node.firstChild, node);
            node.remove();
          }
        } else if (!cleanElement(node, name)) {
          node.remove();
        } else {
          cleanChildren(node);
        }
      } else if (node.nodeType !== 3) {
        node.remove();                                        // comments and the like
      }
      node = next;
    }
  }

  function sanitize(html) {
    var doc = new DOMParser().parseFromString('<!DOCTYPE html><html><body>' + html, 'text/html');
    cleanChildren(doc.body);
    return doc.body.innerHTML;
  }

  // --- Redmine's auto_link! (lib/redmine/wiki_formatting/links_helper.rb) --------------------------

  var AUTO_LINK_RE = /(<\w+[^>]*?>|[\s([,;]|^)((?:https?:\/\/)|(?:s?ftps?:\/\/)|(?:www\.))(([^<]\S*?)(\/)?)((?:&gt;)?|[^\p{L}\p{N}_=\/;()\-]*?)(?=<|\s|$)/gmu;

  function escapeHTML(text) {
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
               .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function autoLink(text) {
    return text.replace(AUTO_LINK_RE, function (all, leading, proto, url, u1, u2, post) {
      if (/<a\s/i.test(leading) || /![<>=]?/.test(leading)) return all;
      if (url.slice(-1) === ')' && (url.split('(').length - url.split(')').length) < 0) {
        url = url.slice(0, -1);
        post = ')' + post;
      }
      var href = (proto === 'www.' ? 'http://www.' : proto) + url;
      return leading + '<a class="external" href="' + escapeHTML(href) + '">' + escapeHTML(proto + url) + '</a>' + post;
    });
  }

  function autoLinkAddresses(html) {
    if (html.indexOf('http') < 0 && html.indexOf('www.') < 0) return html;
    return html.split(/(<pre\b[\s\S]*?<\/pre>|<code\b[\s\S]*?<\/code>|<a\b[\s\S]*?<\/a>)/i).map(function (part, i) {
      return i % 2 ? part : autoLink(part);
    }).join('');
  }

  // --- the formatter as a whole ----------------------------------------------------------------------

  function format(text) {
    var html = String(text || '').replace(/(<pre><code[^>]*>)\n/g, '$1').replace(/\n(<\/code><\/pre>)/g, '$1');
    if (html.indexOf('tiptap-quote') >= 0) html = unwrapQuotes(html);
    var legacy = CKEDITOR_SIGNS.test(html);
    html = convertSpecialContainers(html);
    html = nameCodeLanguages(html);
    html = autoLinkAddresses(sanitize(html));
    return legacy ? '<div class="tiptap-legacy">' + html + '</div>' : html;
  }

  // --- what Redmine does on the page --------------------------------------------------------------

  var IMAGE_NAME = /^[^\/"]+\.(?:avif|bmp|gif|jpg|jpeg|jpe|png|webp)$/i;

  function findAttachment(urlMap, name) {
    var key = Object.keys(urlMap).filter(function (k) { return k.toLowerCase() === name.toLowerCase(); })[0];
    return key ? urlMap[key] : null;
  }

  // Pictures and attachment:"name" links that refer to an attachment by its file name.
  function resolveAttachments(root, urlMap) {
    root.querySelectorAll('img[src]').forEach(function (img) {
      var src = img.getAttribute('src');
      if (!IMAGE_NAME.test(src)) return;
      var found = findAttachment(urlMap, decodeURIComponent(src));
      if (found) img.setAttribute('src', found.url);
      img.setAttribute('loading', 'lazy');
    });
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    var texts = [];
    while (walker.nextNode()) texts.push(walker.currentNode);
    texts.forEach(function (node) {
      var parent = node.parentNode;
      if ((parent.closest && parent.closest('pre, code, a')) || !/attachment:"[^"]+"/.test(node.data)) return;
      var box = document.createElement('span');
      box.innerHTML = escapeHTML(node.data).replace(/attachment:&quot;([^&]+?)&quot;/g, function (all, name) {
        var found = findAttachment(urlMap, name.replace(/&amp;/g, '&'));
        return found ? '<a class="attachment" href="' + escapeHTML(found.url) + '">' + name + '</a>' : all;
      });
      while (box.firstChild) node.parentNode.insertBefore(box.firstChild, node);
      node.remove();
    });
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    var area = document.createElement('textarea');
    area.value = text;
    area.style.position = 'fixed';
    area.style.left = '-9999px';
    document.body.appendChild(area);
    area.select();
    document.execCommand('copy');
    area.remove();
    return Promise.resolve();
  }

  // Redmine's "Copy" button of a code block (setupCopyButtonsToPreElements of Redmine 6).
  function addCopyButtons(root, title, icons) {
    root.querySelectorAll('pre').forEach(function (pre) {
      if (pre.parentNode.classList.contains('pre-wrapper')) return;
      var wrapper = document.createElement('div');
      wrapper.className = 'pre-wrapper';
      var link = document.createElement('a');
      link.className = 'copy-pre-content-link icon-only';
      link.title = title;
      link.href = '#';
      link.innerHTML = '<svg class="s18 icon-svg" aria-hidden="true"><use href="' + icons + '#icon--copy-pre-content"></use></svg>';
      link.addEventListener('click', function (event) {
        event.preventDefault();
        var text = (pre.querySelector('code') || pre).textContent.replace(/\n$/, '');
        copyText(text).then(function () {
          link.querySelector('use').setAttribute('href', icons + '#icon--checked');
          setTimeout(function () { link.querySelector('use').setAttribute('href', icons + '#icon--copy-pre-content'); }, 2000);
        });
      });
      pre.parentNode.insertBefore(wrapper, pre);
      wrapper.appendChild(link);
      wrapper.appendChild(pre);
    });
  }

  window.DemoPreview = {
    format: format,
    sanitize: sanitize,
    // Puts the text into root (an element with class "wiki") as Redmine would show it.
    render: function (root, text, options) {
      // Put together outside the page first: a picture given by a file name must get its address before the
      // browser starts loading it.
      var box = document.createElement('template');
      box.innerHTML = format(text);
      resolveAttachments(box.content, options.urlMap || {});
      root.replaceChildren(box.content);
      addCopyButtons(root, options.copyTitle || 'Copy', options.icons);
      if (!root.textContent.trim() && !root.querySelector('img, table, hr, iframe')) {
        root.innerHTML = '<p class="empty-preview"></p>';
        root.firstChild.textContent = options.emptyText || 'Nothing to preview';
      }
    }
  };
})();
