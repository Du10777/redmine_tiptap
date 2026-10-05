**Read this in other languages:**
[English](../README.md) ·
[Русский](README.ru.md) ·
[Shqip](README.sq.md) ·
[Azeri](README.az.md) ·
[Bosanski](README.bs.md) ·
[Български](README.bg.md) ·
[Català](README.ca.md) ·
[简体中文](README.zh.md) ·
[繁體中文](README.zh-TW.md) ·
[Hrvatski](README.hr.md) ·
[Čeština](README.cs.md) ·
[Dansk](README.da.md) ·
[Nederlands](README.nl.md) ·
[Eesti](README.et.md) ·
[Suomi](README.fi.md) ·
[Français](README.fr.md) ·
[Galego](README.gl.md) ·
[Deutsch](README.de.md) ·
[Ελληνικά](README.el.md) ·
[Magyar](README.hu.md) ·
[Bahasa Indonesia](README.id.md) ·
[Italiano](README.it.md) ·
[日本語](README.ja.md) ·
[한국어](README.ko.md) ·
[Latviešu](README.lv.md) ·
[lietuvių](README.lt.md) ·
[Монгол](README.mn.md) ·
[Norsk bokmål](README.no.md) ·
[Polski](README.pl.md) ·
[Português](README.pt.md) ·
[Português/Brasil](README.pt-BR.md) ·
[Română](README.ro.md) ·
[Srpski](README.sr-YU.md) ·
[Српски](README.sr.md) ·
[Slovenčina](README.sk.md) ·
[Slovenščina](README.sl.md) ·
[Español](README.es.md) ·
[Svenska](README.sv.md) ·
[ไทย](README.th.md) ·
[Türkçe](README.tr.md) ·
[Українська](README.uk.md) ·
[Tiếng Việt](README.vi.md)

> *Diese Übersetzung wurde mithilfe eines KI-Modells erstellt und noch nicht von einem Muttersprachler überprüft. Wenn Sie einen Fehler finden, [eröffnen Sie bitte ein Issue oder einen Pull Request](https://github.com/Du10777/redmine_tiptap).*

Dies ist ein Texteditor für Redmine auf Basis von TipTap https://github.com/ueberdosis/tiptap

Unterstützte Redmine-Versionen: **6.\*** (entwickelt und getestet mit 6.1.4).

Editor-Engine: **TipTap 3.31.4**. Alle `@tiptap/*`-Pakete sind in `package.json` und `package-lock.json` auf genau diese Version festgelegt und müssen immer gemeinsam auf ein und dieselbe Version aktualisiert werden.

## Funktionen

**Textformatierung**
- Fett, kursiv, unterstrichen, durchgestrichen, tiefgestellt und hochgestellt (Ctrl+, und Ctrl+.), Inline-Code.
- Textfarbe und Hintergrundfarbe: eine Palette mit 64 Farben oder ein beliebiger Hex-Wert.
- Schriftart (13 Schriften) und Schriftgröße (Voreinstellungen von 8 bis 72 px oder ein beliebiger Wert).
- Absatzformate: Überschriften 1–6 und normaler Text.
- Ausrichtung (linksbündig, zentriert, rechtsbündig, Blocksatz) und Einzug (bis zu 8 Ebenen) von Absätzen und Überschriften.
- Links: einfügen, bearbeiten, entfernen.
- Horizontale Linie, Rückgängig machen und Wiederholen.

**Listen**
- Aufzählungslisten mit Punkten, Kreisen oder Quadraten als Aufzählungszeichen.
- Nummerierte Listen: 1, 01, a, A, i, I, α.
- Aufgabenlisten mit Kontrollkästchen; erledigte Aufgaben werden durchgestrichen.
- Verschachtelte Listen (Tab / Shift+Tab).

**Tabellen**
- Eine Tabelle beliebiger Größe einfügen, mit oder ohne Kopfzeile.
- Kontextmenü per Rechtsklick in einer Zelle: Zeilen und Spalten hinzufügen und löschen, Zellen verbinden und teilen, Kopfzeile und Kopfspalte, Tabelle löschen.
- Die Spaltenbreite wird durch Ziehen der Zellränder geändert.
- Beim Einfügen aus Excel bleiben Spaltenbreiten, Ausrichtung und Schriftgrößen erhalten; eine aus Redmine kopierte Tabelle wird mit Rahmen in Excel eingefügt.

**Bilder und Anhänge**
- Ein Bild aus der Zwischenablage einfügen: Es wird als Anhang hochgeladen und erscheint im Text.
- Bilder, die über das Feld „Dateien“ von Redmine angehängt oder auf dieses Feld gezogen werden, werden ebenfalls in den Text eingefügt.
- Ein Bild aus den Anhängen einfügen (Auswahl über Miniaturansichten) oder einen Link auf einen beliebigen Anhang.
- Die Größe eines Bildes durch Ziehen an den Ecken ändern.

**Code**
- Codeblöcke mit Syntaxhervorhebung im Editor und auf gespeicherten Seiten: 52 Sprachen, weitere können Sie hinzufügen (siehe [Syntaxhervorhebung](#syntaxhervorhebung)).
- Die Sprache eines Blocks wird über ein Badge in seiner Ecke gewählt, mit Suchfunktion sowie den zuletzt und den häufig verwendeten Sprachen.
- Mit Tab und Shift+Tab wird der Einzug von Zeilen in einem Codeblock vergrößert bzw. verkleinert; Fettschrift, Links und Farben im Code bleiben erhalten.

**Blöcke**
- Aufklappbarer Block: ein Titel mit verborgenem Inhalt (`<details>`). Auf gespeicherten Seiten ist er zugeklappt, im Editor aufgeklappt.
- Zitatblock mit einer Zeile für Autor und Datum.

**Bearbeitung**
- Modus `<HTML>` zum Anzeigen und Bearbeiten des HTML-Quellcodes: Verschachtelte Blöcke werden eingerückt, eine Leerzeile trennt Blöcke, die sich über mehrere Zeilen erstrecken, die Syntax wird nach denselben Regeln eingefärbt wie in einem HTML-Codeblock, und mit Enter bleibt der Einzug der Zeile erhalten.
- Eingabe im Markdown-Stil: `#` für Überschriften, `-` und `1.` für Listen, `[ ]` für Aufgaben, ```` ```python ```` für einen Codeblock (beliebiger Sprachname oder keiner), `**bold**`, `---` für eine horizontale Linie. Gängige Tastenkombinationen: Ctrl+B, Ctrl+I, Ctrl+U, Ctrl+Z und weitere.
- Der Editor wird nie höher als das Fenster: Die Symbolleiste und die Schaltflächen des Formulars bleiben sichtbar, und der Text wird innerhalb des Editors gescrollt. Die Höhe folgt der Fenstergröße und dem Seitenzoom.
- Mit dem Ziehpunkt in der unteren rechten Ecke lässt sich die Höhe von Hand einstellen. Die Höhe wird gespeichert; ein Doppelklick stellt die automatische Höhe wieder her.

**Redmine-Integration**
- Funktioniert in allen Textfeldern von Redmine mit Formatierung: Beschreibungen und Kommentare von Tickets, Wiki-Seiten, News, Forenbeiträge, Dokumente, Projektbeschreibungen, benutzerdefinierte Felder mit langem Text – auch Felder, die erst später auf der Seite erscheinen.
- Der Text wird als HTML gespeichert. Um den Editor zu verwenden, wählen Sie in der Redmine-Konfiguration *TipTap HTML* als Textformatierung.
- Die Oberfläche (Tooltips, Menüs, Dialoge) richtet sich nach der Sprache im Redmine-Profil des Benutzers. 47 der 50 Sprachen von Redmine werden mit dem Plugin ausgeliefert: Englisch und Russisch sind vollständig, die übrigen 45 sind mit einem KI-Modell erstellte Entwürfe; Korrekturen durch Muttersprachler sind willkommen. Die drei Sprachen mit Schreibrichtung von rechts nach links (Arabisch, Hebräisch, Persisch) werden bewusst nicht unterstützt (siehe [Oberflächensprache](#oberflächensprache)).
- Bleibt auch bei großen Texten schnell: Editoren in verborgenen Formularen werden erst erstellt, wenn das Formular geöffnet wird, und lange Codeblöcke werden hervorgehoben, sobald sie beim Scrollen in den sichtbaren Bereich gelangen.
- Texte, die in CKEditor (das Plugin redmine_ckeditor) geschrieben wurden, werden so angezeigt wie dort und öffnen sich im Editor mit ihrer Formatierung: keine Konvertierung erforderlich, siehe [Migrieren von CKEditor](#migrieren-von-ckeditor).
- Gespeicherte Texte werden ohne unsicheres HTML angezeigt: Skripte, Event-Handler und `javascript:`-Links werden beim Anzeigen einer Seite entfernt, es bleibt nur erhalten, was der Editor selbst erzeugt. Das gilt auch für Texte, die über die REST API oder den Modus `<HTML>` eingehen.

## Syntaxhervorhebung

Codeblöcke werden im Editor und auf gespeicherten Seiten gleichermaßen hervorgehoben. Die Sprache eines Blocks wird über das Badge in seiner oberen rechten Ecke ausgewählt; die Liste hat ein Suchfeld und merkt sich die zuletzt und die häufig verwendeten Sprachen.

Das Plugin enthält 52 Sprachen, darunter HTML, 1C, Cisco IOS, MikroTik RouterOS, Windows cmd, docker compose, Protokolle von Linux-Diensten und die Ausgabe von journalctl.

Sie können eigene Sprachen hinzufügen. Jede Sprache ist eine Datei im Ordner `highlight/`. Jede der mehr als 190 Grammatiken von highlight.js oder eine Grammatik von Drittanbietern lässt sich mit einem einzigen Befehl in eine solche Datei konvertieren:

```sh
python3 highlight/_convert_grammar.py erlang
sh highlight/_compile.sh
```

Details: [highlight/README/de.md](../highlight/README/de.md).

## Oberflächensprache

Der Editor erscheint in der Sprache, die im Redmine-Profil des Benutzers gewählt ist (Mein Konto → Sprache). Dateien für 47 der 50 Sprachen von Redmine 6 werden mit dem Plugin im Ordner `config/locales/` ausgeliefert. Englisch ist die Ausgangssprache, Russisch stammt vom Autor selbst; die übrigen 45 sind mithilfe eines KI-Modells erstellte Entwürfe, die noch nicht von Muttersprachlern überprüft wurden – rechnen Sie daher hier und da mit einer ungewöhnlichen Formulierung. Fehlt ein Text in einer Datei, wird er auf Englisch angezeigt.

Um eine Übersetzung zu korrigieren, ändern Sie ihre Werte in `config/locales/<code>.yml` (`de`, `fr`, `pt-BR`, ...) und starten Sie Redmine neu. `bundle exec rake redmine_tiptap:locales` prüft die Dateien. Pull Requests mit Korrekturen sind willkommen.

**Sprachen mit Schreibrichtung von rechts nach links (Arabisch, Hebräisch, Persisch) werden bewusst nicht unterstützt.** Ihre Unterstützung erfordert viele Änderungen an der Codebasis, nicht nur eine Übersetzung, und wir haben uns entschieden, diesen Aufwand nicht zu übernehmen. Für diese Sprachen wird der Editor auf Englisch angezeigt, und sein Layout wird nicht angepasst. Wenn Sie eine davon benötigen, erstellen Sie einen Fork: Der Übersetzungsmechanismus ist fertig, und was sonst noch geändert werden muss, steht in [config/locales/README.md](../config/locales/README.md#right-to-left-languages).

Details und die Liste der Redmine-Sprachen: [config/locales/README.md](../config/locales/README.md).

## Installation

1. Legen Sie das Plugin in den Ordner `plugins` von Redmine. Der Ordner muss `redmine_tiptap` heißen. Am einfachsten geht das mit git; damit wird auch jede Aktualisierung zu einem einzigen Befehl:
   ```sh
   cd /path/to/redmine
   git clone https://github.com/Du10777/redmine_tiptap.git plugins/redmine_tiptap
   ```
2. Starten Sie Redmine neu.
3. Wählen Sie in der Redmine-Konfiguration (redmine.selfhosted/_settings_) bei Textformatierung die Option *TipTap HTML*.

## Aktualisierung

Das Plugin hat keine Datenbankmigrationen, und das fertig erstellte JavaScript-Bundle sowie das Stylesheet sind Bestandteil des Repositorys. Für die Aktualisierung sind auf dem Server weder npm noch ein Build nötig: Ersetzen Sie die Plugin-Dateien und starten Sie Redmine neu.

Prüfen Sie vor der Aktualisierung, ob die neue Version Ihre Redmine-Version unterstützt (siehe oben „Unterstützte Redmine-Versionen“).

### Mit git installiert (empfohlen)

```sh
cd /path/to/redmine/plugins/redmine_tiptap
git pull
```

Starten Sie anschließend Redmine neu, zum Beispiel:

```sh
sudo systemctl restart redmine          # Redmine läuft als systemd-Dienst
touch /path/to/redmine/tmp/restart.txt  # Passenger
docker compose restart redmine          # Docker
```

Um bei einer bestimmten Version zu bleiben und nicht auf den neuesten Commit zu wechseln: `git fetch && git checkout <tag-or-commit>`.

### Aus einem Archiv installiert

1. Löschen Sie den alten Ordner `plugins/redmine_tiptap` und entpacken Sie die neue Version an seiner Stelle. Durch das vorherige Löschen ist sichergestellt, dass in der neuen Version entfernte Dateien nicht zurückbleiben.
2. Löschen Sie `public/assets/.manifest.json` im Redmine-Ordner.
3. Starten Sie Redmine neu.

Schritt 2 ist wichtig. Beim Start veröffentlicht Redmine die Assets der Plugins nur dann erneut, wenn deren Dateien neuer sind als diese Manifest-Datei. Aus einem Archiv entpackte Dateien behalten ihre ursprünglichen Zeitstempel, sodass Redmine ohne Schritt 2 möglicherweise weiterhin den alten Editor ausliefert. Die Manifest-Datei wird beim Start automatisch neu erstellt. Bei `git pull` ist dieser Schritt nicht nötig: git setzt bei geänderten Dateien den aktuellen Zeitstempel.

### Nach der Aktualisierung

- Skript und Stylesheet des Editors werden mit einem Fingerprint des Inhalts in ihren URLs ausgeliefert, sodass die Browser die neue Version direkt nach dem Neustart laden. Die Benutzer müssen ihren Browser-Cache nicht leeren.
- Ist in der Redmine-Konfiguration *Formatierten Text im Cache speichern* aktiviert (Administration → Konfiguration → Allgemein), leeren Sie nach der Aktualisierung auf eine Version, die ändert, wie Texte angezeigt werden (HTML-Bereinigung, Unterstützung für CKEditor-Texte), einmalig den Cache von Redmine: `bundle exec rake tmp:cache:clear RAILS_ENV=production` im Redmine-Ordner. Andernfalls können Seiten, die vor dem Update gerendert wurden, unbereinigt aus dem Cache angezeigt werden, bis sich ihr Text ändert.
- Frühere Versionen des Plugins haben das Skript nach `public/tiptap_bundle.js` kopiert. Diese Dateien werden nicht mehr verwendet und können gelöscht werden:
  ```sh
  rm -f /path/to/redmine/public/tiptap_bundle.js /path/to/redmine/public/tiptap_bundle.js.map
  ```

## Migrieren von CKEditor

Wenn Ihre Redmine [redmine_ckeditor](https://github.com/a-ono/redmine_ckeditor) nutzte, können Sie zu diesem Plugin wechseln und jeden geschriebenen Text behalten: Tickets, Kommentare, Wiki-Seiten, News, Forenbeiträge, Dokumente. Es findet keine Konvertierung statt und die Datenbank wird nicht berührt. CKEditor speichert seine Texte als HTML, genauso wie dieses Plugin, daher wird ein gespeicherter Text vom neuen Formatter einfach so angezeigt.

1. Installieren Sie das Plugin (siehe oben) und wählen Sie Textformatierung: *TipTap HTML*.
2. Bewahren Sie den Ordner `public/system/rich/` Ihrer Redmine auf. Wenn Benutzer mit dem Bilderbrowser von CKEditor Bilder und Dateien eingefügt haben, werden diese dort und nicht in der Datenbank oder unter den Anhängen gespeichert, und die Texte verweisen auf sie über ihre Adresse (`/system/rich/...`). **Wird Redmine auf einen anderen Server umgezogen oder neu eingerichtet, übertragen Sie auch diesen Ordner**, zusammen mit der Datenbank und dem Ordner `files/`: Keines von beiden enthält diese Dateien, und ohne diesen Ordner liefern die Bilder in alten Texten einen 404-Fehler. Anhänge von Tickets, Wiki-Seiten usw. werden wie zuvor gespeichert und benötigen keine zusätzlichen Maßnahmen. Bilder, die in diesem Editor eingefügt werden, sind gewöhnliche Anhänge. Der Ordner wird auch nach dem Entfernen von redmine_ckeditor weiterhin benötigt.
3. Entfernen Sie redmine_ckeditor, wenn Sie es nicht mehr benötigen.

Ein alter Text wird so angezeigt, wie CKEditor ihn zeigte: Schriftarten, Größen, Farben und Ausrichtung, Einzüge, Listen, Tabellen (Rahmen, Breiten, Beschriftungen, zusammengefügte Zellen), Bilder (Größe, Float, Rahmen, ein Bild innerhalb eines Links), Links, Codeblöcke mit ihrer Sprache (hervorgehoben), Redmine-Makros (`{{toc}}`, `{{collapse(Title) ... }}`, `{{thumbnail(...)}}` usw.), Wiki- und Ticket-Links, einfache Web-Adressen in Hyperlinks umgewandelt und eingebettete `<iframe>` (Video). Ein in CKEditor geschriebener Text wird an seinen Markups erkannt und behält die Abstände zwischen den Absätzen, die er dort hatte – diese sind größer als in diesem Editor.

Bewusste Unterschiede:
- Ein `<iframe>` wird nur angezeigt, wenn es auf eine andere Website über http(s) verweist, und es ist in einer Sandbox: Die Seite darin kann ihre eigenen Skripte ausführen, kann aber nicht auf die Redmine-Seite zugreifen, das obere Fenster öffnen oder Formulare absenden. Alle anderen `<iframe>` werden entfernt.
- Links öffnen im gleichen Fenster: Das `target`-Attribut eines Links (CKEditors „In neuem Fenster (_blank)") wird nicht beibehalten.
- Einige Formatierungen, die CKEditor bot, aber seine Seiten stillschweigend verwarf, werden hier angezeigt: zum Beispiel die Hintergrundfarben seiner „Marker"-Stile und die Anführungszeichen von `<q>`.
- Der Stil „Special Container“ von CKEditor (ein Block mit grauem Rahmen) wird als Codeblock ohne Hervorhebung angezeigt und ist auch im Editor ein Codeblock.

Ein alter Text behält seine Formatierung, wenn er im Editor geöffnet und erneut gespeichert wird: Redmine-Makros (ein Makro ist ein graues Element im Editor; bearbeiten Sie es im Modus `<HTML>`, wie im Quellcode-Modus von CKEditor), `<iframe>`, `<div>`- und `<address>`-Blöcke mit ihrem Stil (ein `<div>`, das aus einer Webseite eingefügt wird, wird weiterhin zu einem Absatz), tiefgestellte und hochgestellte Zeichen, Inline-Stile von CKEditor (big, small, keyboard, sample usw.), der Stil von Überschriften, Tabellen und Tabellenzellen, Größe (Breite und Höhe), Float, Rahmen und Link von Bildern, die Sprache von Codeblöcken. Was beim Bearbeiten nicht erhalten bleibt: Die Beschriftung einer Tabelle wird zu einem zentrierten Absatz darüber, die Header- und Footer-Abschnitte einer Tabelle werden zu normalen Zeilen (die Fußzeile bleibt unten) und `<del>` wird zu `<s>` (gleiches Erscheinungsbild). Ein aus diesem Editor gespeicherter Text erhält den kompakten Absatzabstand dieses Editors.
