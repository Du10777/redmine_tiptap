// A document without a window, for HTML that is only taken apart and put together
// again (the text being saved, the text being loaded into the editor, the source
// mode). What is put into its elements is parsed, but nothing is loaded. An element
// of the page itself starts loading every picture of the HTML at once, and in a
// stored text a picture of an attachment is given by its bare file name
// (src="picture.png"): the browser asked the server for that name relative to the
// page and got a 404, once for every such picture.
var inert = null;

export function inertElement(tag) {
  if (!inert) inert = document.implementation.createHTMLDocument('');
  return inert.createElement(tag || 'div');
}
