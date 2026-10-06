/*
 * The demo of redmine_tiptap: the editor of the plugin (plugin/tiptap_bundle.js, the very file that comes
 * with the plugin) on a page made like the "New issue" form of Redmine. What Redmine gives the editor on a
 * real page is provided here:
 *   - window.TiptapI18n, the texts of the editor in the chosen language (i18n/<code>.js, made by
 *     build_demo.py from config/locales/*.yml of the plugin, with the same fallbacks: pt-BR -> pt -> en);
 *   - the functions of Redmine the editor calls when a picture is pasted or dropped (attachments.js): here
 *     the picture stays in the browser, there is no server to upload it to;
 *   - the texts of the page (field names, the tabs) from Redmine's own translations, and the texts of the demo
 *     itself (the note on top, the examples) from page_texts.json, as window.DemoPage.
 * The "Preview" tab is in preview.js. The text and the example are kept in localStorage. The language is the one
 * in the address (?lang=fr, the links of the README give it), English when there is none.
 */
(function () {
  'use strict';

  var STORE = 'redmineTiptapDemo.';
  var LANGUAGES = window.DEMO_LANGUAGES;          // languages.js: [[code, name], ...]
  var SAMPLES = window.DEMO_SAMPLES;              // samples.js: [{id, title, html}, ...]
  var ATTACHMENTS = window.DEMO_ATTACHMENTS;      // samples.js: the pictures "attached" to the demo issue
  var ICONS = 'redmine/images/icons.svg';

  var textarea = document.getElementById('issue_description');
  var form = document.getElementById('issue-form');

  function load(key) {
    try { return window.localStorage.getItem(STORE + key); } catch (e) { return null; }
  }
  function store(key, value) {
    try {
      if (value === null) window.localStorage.removeItem(STORE + key);
      else window.localStorage.setItem(STORE + key, value);
    } catch (e) { /* private mode: nothing is remembered */ }
  }

  // --- language ----------------------------------------------------------------------------------

  var codes = LANGUAGES.map(function (l) { return l[0]; });

  // Only the address chooses the language, not the browser or an earlier visit: a link opens the page in the
  // language it names, and a link without one in English, the language everyone can be expected to read.
  function pickLanguage() {
    var asked = String(new URLSearchParams(window.location.search).get('lang') || '').toLowerCase();
    var exact = codes.filter(function (c) { return c.toLowerCase() === asked; })[0];
    var base = codes.filter(function (c) { return c.toLowerCase() === asked.split('-')[0]; })[0];
    return exact || base || 'en';
  }

  var lang = pickLanguage();
  document.documentElement.lang = lang;

  // --- what Redmine's attachments.js gives the editor ---------------------------------------------

  window.wikiImageMimeTypes = ['image/png', 'image/jpeg', 'image/gif', 'image/webp', 'image/bmp', 'image/svg+xml', 'image/avif'];
  window.$ = window.$ || function (element) { return element; };
  window.handleFileDropEvent = window.handleFileDropEvent || function () {};
  // Redmine uploads the file and then puts its name into the text. The plugin replaces the second part
  // (it inserts the picture into the editor itself), so this is all the demo needs.
  window.addInlineAttachmentMarkup = function () {};
  window.addFile = function (inputEl, file) { window.addInlineAttachmentMarkup(file); };

  function isImage(file) {
    return window.wikiImageMimeTypes.indexOf(file.type) >= 0;
  }

  // --- the text -----------------------------------------------------------------------------------

  function sample(id) {
    return SAMPLES.filter(function (s) { return s.id === id; })[0] || SAMPLES[0];
  }

  var sampleId = sample(load('sample')).id;
  var saved = load('text');
  var keepText = true;              // false when the page is reloaded for another example
  textarea.value = saved !== null ? saved : sample(sampleId).html;

  // --- texts of the page from Redmine's own translations ------------------------------------------

  function r(key, fallback) {
    var texts = window.DemoRedmine || {};
    return texts[key] || fallback;
  }

  // the texts of the demo itself (page_texts.json, with the same fallbacks)
  function p(key, fallback) {
    var texts = window.DemoPage || {};
    return texts[key] || fallback;
  }

  function setText(id, text) {
    var el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  // A translated text with %{link} in it: the link is made as an element, the rest stays text.
  function setTextWithLink(el, text, href, label) {
    el.textContent = '';
    text.split('%{link}').forEach(function (part, i) {
      if (i > 0) {
        var a = document.createElement('a');
        a.href = href;
        a.textContent = label;
        el.appendChild(a);
      }
      el.appendChild(document.createTextNode(part));
    });
  }

  function applyTexts() {
    setText('demo-title', r('label_issue_new', 'New issue'));
    setText('demo-subject-label', r('field_subject', 'Subject'));
    setText('demo-description-label', r('field_description', 'Description'));
    setText('demo-files-label', r('label_attachment_plural', 'Files'));
    setText('demo-language-label', r('field_language', 'Language'));
    setText('demo-sample-label', r('label_example', 'Example'));
    setText('demo-reset', r('button_reset', 'Reset'));
    setText('demo-tab-edit', r('button_edit', 'Edit'));
    setText('demo-tab-preview', r('label_preview', 'Preview'));
    document.getElementById('demo-create').value = r('button_create', 'Create');

    var readme = p('readme', 'https://github.com/Du10777/redmine_tiptap');   // the README in this language
    document.title = p('title', document.title);
    var github = document.getElementById('demo-github');
    github.textContent = p('github', github.textContent);
    github.href = readme;
    var menu = document.getElementById('demo-menu');
    menu.textContent = p('demo', menu.textContent);
    menu.href = '?lang=' + encodeURIComponent(lang);
    if (p('about')) setTextWithLink(document.getElementById('demo-about'), p('about'), readme, 'redmine_tiptap');
    var subject = document.getElementById('issue_subject');
    subject.value = p('subject', subject.value);
    Array.prototype.forEach.call(document.getElementById('demo-sample').options, function (option) {
      option.textContent = p('sample.' + option.value, option.textContent);
    });
    setText('demo-footer-editor', p('footer.editor', 'Editor:'));
    var look = document.getElementById('demo-footer-look');
    look.textContent = p('footer.look', look.textContent).replace('%{redmine}', look.getAttribute('data-redmine'));
  }

  // --- the tabs above the editor and the preview under it ----------------------------------------------
  // Made here, not in index.html: they are blocks, and the field of the form is a <p>, as in Redmine.

  function buildTabs() {
    var tabs = document.createElement('div');
    tabs.className = 'jstTabs tabs demo-tabs';
    tabs.innerHTML =
      '<ul>' +
        '<li><a href="#" id="demo-tab-edit" class="tab-edit selected">Edit</a></li>' +
        '<li><a href="#" id="demo-tab-preview" class="tab-preview">Preview</a></li>' +
      '</ul>' +
      '<span class="demo-sample-chooser">' +
        '<label id="demo-sample-label" for="demo-sample">Example</label> ' +
        '<select id="demo-sample"></select> ' +
        '<button type="button" id="demo-reset">Reset</button>' +
      '</span>';
    textarea.parentNode.insertBefore(tabs, textarea);
    var preview = document.createElement('div');
    preview.id = 'demo-preview';
    preview.className = 'wiki wiki-preview';
    preview.style.display = 'none';
    textarea.parentNode.insertBefore(preview, textarea.nextSibling);
  }

  // --- choosing the language and the example --------------------------------------------------------

  function setupChoosers() {
    var languageSelect = document.getElementById('demo-language');
    LANGUAGES.forEach(function (l) {
      var option = document.createElement('option');
      option.value = l[0];
      option.textContent = l[1];
      languageSelect.appendChild(option);
    });
    languageSelect.value = lang;
    languageSelect.addEventListener('change', function () {
      store('text', textarea.value);
      var url = new URL(window.location.href);
      url.searchParams.set('lang', languageSelect.value);
      window.location.href = url.toString();
    });

    var sampleSelect = document.getElementById('demo-sample');
    SAMPLES.forEach(function (s) {
      var option = document.createElement('option');
      option.value = s.id;
      option.textContent = s.title;
      sampleSelect.appendChild(option);
    });
    sampleSelect.value = sampleId;

    function useSample(id) {
      var current = sample(sampleId).html;
      if (textarea.value !== current && textarea.value.trim() !== '' && !window.confirm(r('text_are_you_sure', 'Are you sure?'))) {
        sampleSelect.value = sampleId;
        return;
      }
      keepText = false;
      store('sample', id);
      store('text', null);
      window.location.reload();
    }
    sampleSelect.addEventListener('change', function () { useSample(sampleSelect.value); });
    document.getElementById('demo-reset').addEventListener('click', function () { useSample(sampleId); });
  }

  // --- the "Edit" and "Preview" tabs ---------------------------------------------------------------

  function setupTabs() {
    var editTab = document.getElementById('demo-tab-edit');
    var previewTab = document.getElementById('demo-tab-preview');
    var preview = document.getElementById('demo-preview');

    function show(which) {
      var wrapper = document.querySelector('.tiptap-wrapper');
      editTab.classList.toggle('selected', which === 'edit');
      previewTab.classList.toggle('selected', which === 'preview');
      if (wrapper) wrapper.style.display = which === 'edit' ? '' : 'none';
      preview.style.display = which === 'preview' ? '' : 'none';
      if (which === 'preview') {
        window.DemoPreview.render(preview, textarea.value, {
          urlMap: textarea._tiptapUrlMap || {},
          copyTitle: r('button_copy', 'Copy'),
          emptyText: r('label_nothing_to_preview', 'Nothing to preview'),
          icons: ICONS
        });
      }
    }
    editTab.addEventListener('click', function (e) { e.preventDefault(); show('edit'); });
    previewTab.addEventListener('click', function (e) { e.preventDefault(); show('preview'); });
  }

  // --- pictures: pasted (the plugin handles the paste itself), chosen in "Files" or dropped -------------

  function setupFiles() {
    var input = document.getElementById('demo-files');
    input.addEventListener('change', function () {
      Array.prototype.forEach.call(input.files, function (file) {
        if (isImage(file)) window.addInlineAttachmentMarkup(file);
      });
      input.value = '';
    });
    var box = form.querySelector('.filedroplistner');
    box.addEventListener('dragover', function (e) {
      if (e.dataTransfer && Array.prototype.indexOf.call(e.dataTransfer.types, 'Files') >= 0) e.preventDefault();
    });
    box.addEventListener('drop', function (e) {
      if (!e.dataTransfer || !e.dataTransfer.files.length) return;
      e.preventDefault();
      window._tiptapActiveTextarea = textarea;
      Array.prototype.forEach.call(e.dataTransfer.files, function (file) {
        if (isImage(file)) window.addInlineAttachmentMarkup(file);
      });
    });
  }

  // --- after the editor is made ------------------------------------------------------------------------

  // The bundle makes the editor when the page is ready, which may come a moment after it is loaded.
  function whenEditorReady() {
    return new Promise(function (resolve) {
      var started = Date.now();
      (function check() {
        if (textarea._tiptapUrlMap || Date.now() - started > 15000) resolve();
        else window.setTimeout(check, 50);
      })();
    });
  }

  function afterEditor() {
    // the pictures of the demo issue: the picture button of the toolbar offers them
    var map = textarea._tiptapUrlMap;
    if (map) ATTACHMENTS.forEach(function (name) { map[name] = { url: name, id: null }; });
    // what is typed is kept
    var last = textarea.value;
    window.setInterval(function () {
      if (keepText && textarea.value !== last) { last = textarea.value; store('text', last); }
    }, 1000);
    window.addEventListener('pagehide', function () { if (keepText) store('text', textarea.value); });
    document.body.classList.add('demo-ready');
  }

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var script = document.createElement('script');
      script.src = src;
      script.async = false;                    // run in the order they are added
      script.onload = resolve;
      script.onerror = function () { reject(new Error('cannot load ' + src)); };
      document.body.appendChild(script);
    });
  }

  form.addEventListener('submit', function (e) { e.preventDefault(); });
  buildTabs();
  setupChoosers();
  setupTabs();
  setupFiles();

  // The texts of the editor have to be there before the editor starts, and the languages of the code
  // blocks before the editor (the plugin includes them in the same order).
  loadScript('i18n/' + lang + '.js')
    .then(function () {
      applyTexts();
      return Promise.all([loadScript('plugin/tiptap_highlight.js'), loadScript('plugin/tiptap_bundle.js')]);
    })
    .then(whenEditorReady)
    .then(afterEditor)
    .catch(function (error) {
      document.getElementById('demo-error').textContent = String(error);
      document.getElementById('demo-error').style.display = '';
    });
})();
