**Read this in other languages:**
[English](../README.md) ·
[Русский](README.ru.md) ·
[Deutsch](README.de.md) ·
[日本語](README.ja.md) ·
[ไทย](README.th.md)

> *Diese Übersetzung wurde mithilfe eines KI-Modells erstellt und noch nicht von einem Muttersprachler überprüft. Wenn Sie einen Fehler finden, [eröffnen Sie bitte ein Issue oder einen Pull Request](https://github.com/Du10777/redmine_tiptap).*

Dies ist ein Texteditor für Redmine auf Basis von TipTap https://github.com/ueberdosis/tiptap

Unterstützte Redmine-Versionen: **6.\*** (entwickelt und getestet mit 6.1.4).

Editor-Engine: **TipTap 3.31.4**. Alle `@tiptap/*`-Pakete sind in `package.json` und `package-lock.json` auf genau diese Version festgelegt und müssen immer gemeinsam auf ein und dieselbe Version aktualisiert werden.

## Funktionen

**Textformatierung**
- Fett, kursiv, unterstrichen, durchgestrichen, Inline-Code.
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
- Modus `<HTML>` zum Anzeigen und Bearbeiten des HTML-Quellcodes.
- Eingabe im Markdown-Stil: `#` für Überschriften, `-` und `1.` für Listen, `[ ]` für Aufgaben, ```` ```python ```` für einen Codeblock (beliebiger Sprachname oder keiner), `**bold**`, `---` für eine horizontale Linie. Gängige Tastenkombinationen: Ctrl+B, Ctrl+I, Ctrl+U, Ctrl+Z und weitere.
- Der Editor wird nie höher als das Fenster: Die Symbolleiste und die Schaltflächen des Formulars bleiben sichtbar, und der Text wird innerhalb des Editors gescrollt. Die Höhe folgt der Fenstergröße und dem Seitenzoom.
- Mit dem Ziehpunkt in der unteren rechten Ecke lässt sich die Höhe von Hand einstellen. Die Höhe wird gespeichert; ein Doppelklick stellt die automatische Höhe wieder her.

**Redmine-Integration**
- Funktioniert in allen Textfeldern von Redmine mit Formatierung: Beschreibungen und Kommentare von Tickets, Wiki-Seiten, News, Forenbeiträge, Dokumente, Projektbeschreibungen, benutzerdefinierte Felder mit langem Text – auch Felder, die erst später auf der Seite erscheinen.
- Der Text wird als HTML gespeichert. Um den Editor zu verwenden, wählen Sie in der Redmine-Konfiguration *TipTap HTML* als Textformatierung.
- Die Oberfläche (Tooltips, Menüs, Dialoge) richtet sich nach der Sprache im Redmine-Profil des Benutzers. 47 der 50 Sprachen von Redmine werden mit dem Plugin ausgeliefert: Englisch und Russisch sind vollständig, die übrigen 45 sind mit einem KI-Modell erstellte Entwürfe; Korrekturen durch Muttersprachler sind willkommen. Die drei Sprachen mit Schreibrichtung von rechts nach links (Arabisch, Hebräisch, Persisch) werden bewusst nicht unterstützt (siehe [Oberflächensprache](#oberflächensprache)).
- Bleibt auch bei großen Texten schnell: Editoren in verborgenen Formularen werden erst erstellt, wenn das Formular geöffnet wird, und lange Codeblöcke werden hervorgehoben, sobald sie beim Scrollen in den sichtbaren Bereich gelangen.
- Gespeicherte Texte werden ohne unsicheres HTML angezeigt: Skripte, Event-Handler und `javascript:`-Links werden beim Anzeigen einer Seite entfernt, es bleibt nur erhalten, was der Editor selbst erzeugt. Das gilt auch für Texte, die über die REST API oder den Modus `<HTML>` eingehen.

## Syntaxhervorhebung

Codeblöcke werden im Editor und auf gespeicherten Seiten gleichermaßen hervorgehoben. Die Sprache eines Blocks wird über das Badge in seiner oberen rechten Ecke ausgewählt; die Liste hat ein Suchfeld und merkt sich die zuletzt und die häufig verwendeten Sprachen.

Das Plugin enthält 52 Sprachen, darunter 1C, Cisco IOS, MikroTik RouterOS, Windows cmd, docker compose, Protokolle von Linux-Diensten und die Ausgabe von journalctl.

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
- Ist in der Redmine-Konfiguration *Formatierten Text im Cache speichern* aktiviert (Administration → Konfiguration → Allgemein), leeren Sie nach der Aktualisierung auf eine Version mit HTML-Bereinigung einmalig den Cache von Redmine: `bundle exec rake tmp:cache:clear RAILS_ENV=production` im Redmine-Ordner. Andernfalls können Seiten, die vor dem Update gerendert wurden, unbereinigt aus dem Cache angezeigt werden, bis sich ihr Text ändert.
- Frühere Versionen des Plugins haben das Skript nach `public/tiptap_bundle.js` kopiert. Diese Dateien werden nicht mehr verwendet und können gelöscht werden:
  ```sh
  rm -f /path/to/redmine/public/tiptap_bundle.js /path/to/redmine/public/tiptap_bundle.js.map
  ```
