// xml: built-in highlight.js grammar. It is the grammar of HTML as well: tags, attributes
// and strings, and what is inside <script> and <style> by the rules of JavaScript and CSS.
// The id stays xml (it is in the saved texts as class="language-xml", ```html in the editor
// and class="html" of CKEditor's code blocks end up here too), the label says what people look for.
import grammar from 'highlight.js/lib/languages/xml';

export default {
  id: 'xml',
  label: 'HTML / XML',
  hint: 'XHTML, SVG, RSS',
  keywords: 'html xhtml svg rss atom xsd xsl xslt plist web page',
  grammar: grammar,
};
