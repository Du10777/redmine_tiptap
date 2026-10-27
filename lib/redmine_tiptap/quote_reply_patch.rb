module RedmineTiptap
  # The Quote link of a note, of an issue and of a forum message, in this format.
  #
  # Redmine writes a quote in the syntax of Textile and Markdown: the "wrote" line, then
  # "> " before every line of the quoted text (Redmine::QuoteReply::Builder#build_quote).
  # A text of this format is HTML, so that was no quote: the stored HTML of the note with
  # "> " through it, which the editor showed as a line of text and loose paragraphs. Here
  # the quote is the editor's own quote block instead - the "wrote" line as its header,
  # the note (or the part of it selected on the page) as its body - with an empty line
  # after it, where the reply is written.
  module QuoteReplyPatch
    private

    def build_quote(quote_header, text, partial_quote = nil)
      return super unless Setting.text_formatting == 'tiptap'

      # the header holds text itself, no paragraph (tiptap_quote.js: content 'inline*')
      header = ERB::Util.html_escape(quote_header.to_s.sub(/\n> \z/, ''))
      body = partial_quote.present? ? quoted_lines(partial_quote) : quoted_html(text)
      %(<blockquote class="tiptap-quote"><div class="tiptap-quote-header">#{header}</div>) +
        %(<div class="tiptap-quote-body">#{body}</div></blockquote><p></p>)
    end

    # The part selected on the page: Redmine's script sends it as plain text, one line of
    # it a paragraph here.
    def quoted_lines(text)
      lines = text.to_s.split(/\r\n|\r|\n/).reject(&:blank?)
      lines.map { |line| "<p>#{ERB::Util.html_escape(line)}</p>" }.join.presence || '<p></p>'
    end

    # The whole note: its HTML as it is stored. A code block becomes "[...]", as Redmine
    # does in every format (a quote is not to carry a log along).
    def quoted_html(text)
      text.to_s.strip.gsub(%r{<pre\b.*?</pre>}m, '<p>[...]</p>').presence || '<p></p>'
    end
  end
end
