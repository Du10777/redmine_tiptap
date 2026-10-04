# Syntaxhervorhebung: Sprachen

**Read this in other languages:**
[English](en.md) ·
[Русский](ru.md) ·
[Deutsch](de.md) ·
[日本語](ja.md) ·
[ไทย](th.md)

> *Diese Übersetzung wurde mithilfe eines KI-Modells erstellt und noch nicht von einem Muttersprachler überprüft. Wenn Sie einen Fehler finden, [eröffnen Sie bitte ein Issue oder einen Pull Request](https://github.com/Du10777/redmine_tiptap).*

Codeblöcke werden sowohl im Editor als auch auf gespeicherten Seiten (Tickets, Kommentare, Wiki) hervorgehoben, und sie sehen in beiden gleich aus. Die Sprache eines Blocks wird über das Badge in seiner oberen rechten Ecke gewählt. Die Liste der Sprachen wird durch die Dateien im Ordner `highlight/` festgelegt: Eine Datei entspricht einer Sprache.

Das Plugin wird mit 52 Sprachen ausgeliefert. Sie können weitere hinzufügen: Konvertieren Sie eine fertige highlight.js-Grammatik mit einem Skript (siehe [Sprache aus highlight.js hinzufügen](#sprache-aus-highlightjs-hinzufügen)) oder schreiben Sie eine eigene.

## Funktionsweise

- Die Hervorhebung übernimmt [highlight.js](https://highlightjs.org) (über [lowlight](https://github.com/wooorm/lowlight)). Der Editor und die gespeicherten Seiten verwenden dieselbe Engine, daher stimmen die Farben überein.
- `_compile.sh` bündelt alle Sprachdateien in einer Datei, `assets/javascripts/tiptap_highlight.js`. Diese Datei ist bereits fertig erstellt im Repository eingecheckt, daher ist für die Installation des Plugins kein Build nötig. Sie müssen sie nur dann neu erstellen, wenn Sie die Auswahl der Sprachen ändern.
- Redmine lädt `tiptap_highlight.js` auf jeder Seite, vor dem Editor (`tiptap_bundle.js`). Beim Laden registriert der Editor alle Sprachen aus dieser Datei.
- Im Editor wird ein Block 50 ms nach einer Eingabepause erneut hervorgehoben, und zwar nur der Block, der sich geändert hat. Auf gespeicherten Seiten wird ein Block hervorgehoben, sobald er in den sichtbaren Bereich scrollt. Ein Block in einem zugeklappten Abschnitt wird hervorgehoben, wenn der Abschnitt geöffnet wird.
- Die Sprache wird im gespeicherten HTML abgelegt: `<pre><code class="language-<id>">`. Deshalb darf sich die `id` einer Sprache nie ändern: Blöcke, die mit der alten `id` gespeichert wurden, würden als reiner Text angezeigt.
- Eine automatische Spracherkennung gibt es nicht: Ein Block ohne Sprache wird als reiner Text angezeigt. Das Gleiche gilt für einen Block, dessen Sprache nicht in `highlight/` vorhanden ist (zum Beispiel, weil die Sprachdatei gelöscht wurde); sein Badge zeigt weiterhin die `id` an. Kehrt die Sprachdatei zurück, kehren auch die Farben zurück.
- Farben. highlight.js markiert Text mit Klassen wie `hljs-keyword`, `hljs-string`, `hljs-comment`. Ihre Farben sind in `assets/stylesheets/src/06_code.css` festgelegt und verwenden die Palette der Syntaxhervorhebung von Redmine selbst.

## Sprachdatei

Zum Beispiel `routeros.js`:

```js
import grammar from 'highlight.js/lib/languages/routeros';

export default {
  id: 'routeros',
  label: 'RouterOS',
  hint: 'MikroTik',
  keywords: 'mikrotik',
  grammar: grammar,
};
```

| Feld | Pflicht | Bedeutung |
|---|---|---|
| `id` | ja | Name der Sprache im gespeicherten HTML (`class="language-<id>"`). Zulässige Zeichen: `a-z`, `0-9`, `-`, `_`. **Niemals ändern**, sobald Blöcke mit dieser Sprache gespeichert wurden. |
| `label` | nein | Name in der Sprachliste und auf dem Badge des Blocks. Standard: `id`. |
| `hint` | nein | Grauer Hinweis neben dem Namen in der Liste. |
| `keywords` | nein | Zusätzliche Wörter für die Suche in der Liste, durch Leerzeichen getrennt. |
| `grammar` | ja | Eine highlight.js-Grammatik: eine Funktion `(hljs) => language definition`. |

`label`, `hint` und `keywords` sind auf Englisch. Um eine Sprache in der Oberflächensprache eines Benutzers unter einem anderen Namen anzuzeigen oder sie über Wörter dieser Sprache auffindbar zu machen, fügen Sie der Übersetzungsdatei dieser Sprache, `config/locales/<code>.yml`, unter `code_languages:` einen Eintrag hinzu. Die dortigen Wörter werden zu `keywords` hinzugefügt; `label` und `hint` ersetzen die Werte aus der Sprachdatei. Beispiele enthält `config/locales/ru.yml`, die Regeln stehen in [config/locales/README.md](../../config/locales/README.md).

Arten von Dateien im Ordner:

- **Kurzdatei.** Ein Verweis auf eine Grammatik aus dem npm-Paket highlight.js, wie im Beispiel oben; die meisten Sprachen sind so aufgebaut. Die Grammatik stammt aus der highlight.js-Version, die in der `package-lock.json` des Plugins festgehalten ist.
- **Vollständige Kopie.** Der Code der Grammatik steht in der Datei selbst und kann bearbeitet werden. Diese Dateien werden vom Konvertierungsskript erzeugt (siehe unten).
- **Eigene Grammatik.** `log.js`, `journalctl.js`, `cisco-ios.js`; ihre gemeinsamen Teile stehen in `_common.js`.
- **Wrapper.** Eine fertige Grammatik unter anderem Namen: `cmd.js` ist `dos` aus highlight.js, `docker-compose.js` ist `yaml`.

Dateien und Ordner, deren Name mit `_` beginnt, sind keine Sprachen:

- `_compile.sh` erstellt die Sprachen;
- `_check.mjs` prüft die Sprachen während des Builds;
- `_common.js` enthält gemeinsame Teile der eigenen Grammatiken des Plugins;
- `_convert_grammar.py` ist das Skript, das highlight.js-Grammatiken konvertiert (siehe unten);
- `_vendor/` enthält Dateien, die von konvertierten Grammatiken importiert werden (vom Konvertierungsskript angelegt).

Der Ordner `README/` enthält diese Dokumentation.

## Sprache aus highlight.js hinzufügen

Fertige Grammatiken (mehr als 190) finden Sie hier: https://github.com/highlightjs/highlight.js/tree/main/src/languages. Ihre Namen und Aliase sind in [SUPPORTED_LANGUAGES.md](https://github.com/highlightjs/highlight.js/blob/main/SUPPORTED_LANGUAGES.md) aufgeführt, zusammen mit etwa hundert Grammatiken von Drittanbietern, die in separaten Repositories liegen. Das Skript `_convert_grammar.py` in diesem Ordner konvertiert jede davon in das Format des Plugins.

Das Skript benötigt Python 3.6+ (keine zusätzlichen Pakete) und Zugriff auf github.com. Führen Sie es im Plugin-Ordner aus:

```sh
cd /path/to/redmine/plugins/redmine_tiptap
python3 highlight/_convert_grammar.py erlang
sh highlight/_compile.sh
```

Das Argument `erlang` ist der Dateiname in `src/languages` ohne `.js`. Der zweite Befehl erstellt die Sprachen und prüft sie. Starten Sie danach Redmine neu (siehe [Erstellen und Anwenden](#erstellen-und-anwenden)). Unter Windows verwenden Sie `py` oder `python` statt `python3`.

Beispiele:

```sh
# Liste der highlight.js-Sprachen (* = bereits in highlight/), optional nach einem Wort gefiltert
python3 highlight/_convert_grammar.py --list
python3 highlight/_convert_grammar.py --list sql

# mehrere Sprachen auf einmal
python3 highlight/_convert_grammar.py erlang nix fsharp

# eigener Name, Hinweis und Suchwörter (jeweils nur eine Sprache)
python3 highlight/_convert_grammar.py erlang --label "Erlang/OTP" --hint BEAM --keywords "erl otp"

# eine mit dem Plugin gelieferte Kurzdatei durch eine bearbeitbare vollständige Kopie ersetzen
python3 highlight/_convert_grammar.py routeros --force --label RouterOS --hint MikroTik --keywords mikrotik

# eine Sprache, die noch nicht in einer veröffentlichten highlight.js-Version enthalten ist, aus dem Entwicklungszweig
python3 highlight/_convert_grammar.py odin --ref main

# ein Link auf eine Grammatikdatei, direkt aus der Adressleiste des Browsers
python3 highlight/_convert_grammar.py https://github.com/highlightjs/highlight.js/blob/main/src/languages/odin.js

# eine Grammatik von Drittanbietern: ein Link auf ihr Repository, das Skript findet die Grammatikdatei
python3 highlight/_convert_grammar.py https://github.com/highlightjs/highlightjs-terraform

# eine lokale Grammatikdatei
python3 highlight/_convert_grammar.py ~/grammars/mylang.js --id mylang

# eine Kurzdatei, die auf das npm-Paket verweist, statt einer Kopie des Codes
python3 highlight/_convert_grammar.py erlang --npm

# anzeigen, was getan würde, ohne etwas zu ändern
python3 highlight/_convert_grammar.py erlang --dry-run
```

### Was das Skript tut

1. Lädt `src/languages/<name>.js` in der vom Plugin verwendeten highlight.js-Version herunter. Die Version wird aus `package-lock.json` gelesen (derzeit 11.12.0), weil Grammatiken für die Engine ihrer eigenen Version geschrieben sind. `--ref` wählt eine andere Version, einen anderen Branch oder Commit aus.
2. Liest den Namen der Sprache aus der Zeile `Language:` im Kopf der Grammatik und die Suchwörter aus ihren Aliasen (`aliases`). Die `id` ist der Dateiname der Grammatik.
3. Legt den Code der Grammatik unverändert in `highlight/<id>.js` ab, abgesehen vom Export: `export default function(hljs)` wird zu `function grammar(hljs)`, und das Sprachobjekt `export default { id, label, keywords, grammar }` wird am Ende der Datei angehängt. Ist die Grammatik ein CommonJS-Modul (`module.exports = ...`), wird oben eine Zeile eingefügt, die `module` und `exports` deklariert.
4. Importiert die Grammatik andere Dateien, werden diese unter denselben Pfaden wie im Repository nach `highlight/_vendor/<source>-<version>/` heruntergeladen, und die Importe werden auf diese Dateien umgestellt. Zum Beispiel importiert `typescript` die Dateien `javascript.js` und `lib/ecmascript.js`. Diese Dateien werden von allen Sprachen aus derselben Quelle und Version gemeinsam genutzt; sie müssen nicht bearbeitet werden.
5. Prüft die Zeile `Requires:`, die die Sprachen für eingebetteten Code auflistet (zum Beispiel benötigt `php-template` die Sprachen `xml` und `php`). Sind sie nicht in `highlight/` vorhanden, wird der Befehl ausgegeben, der sie hinzufügt. Ohne sie bleibt der eingebettete Code einfach ohne Farben; das ist kein Fehler.
6. Überschreibt vorhandene Dateien nicht ohne `--force` und übernimmt keine `id`, die bereits von einer anderen Datei verwendet wird.

Nach der Konvertierung kann die Sprache direkt in ihrer Datei bearbeitet werden.

### Optionen

| Option | Wirkung |
|---|---|
| `LANGUAGE ...` | Der Name einer highlight.js-Sprache, ein Link auf eine Grammatikdatei oder auf das GitHub-Repository einer Grammatik von Drittanbietern, oder der Pfad zu einer lokalen `.js`-Datei. |
| `--ref REF` | highlight.js-Version (Tag), Branch oder Commit. Standard: die Version aus `package-lock.json`. Bei Links wird die Version dem Link entnommen. |
| `--id ID` | `id` der Sprache. Standard: der Dateiname der Grammatik. |
| `--label TEXT` | Name in der Liste und auf dem Badge. Standard: `Language:` aus der Grammatik. |
| `--hint TEXT` | Grauer Hinweis in der Liste. |
| `--keywords TEXT` | Durch Leerzeichen getrennte Suchwörter. Standard: die Aliase der Grammatik. |
| `--npm` | Schreibt statt einer Kopie des Codes eine Kurzdatei, die auf das npm-Paket highlight.js verweist. Nur für Sprachen von highlight.js selbst. |
| `--force` | Ersetzt vorhandene Dateien. |
| `--dry-run` | Zeigt an, was getan würde, ohne etwas zu ändern. |
| `--list [WORD]` | Listet die highlight.js-Sprachen und die Grammatiken von Drittanbietern auf, optional nach einem Wort gefiltert. |
| `--prune` | Löscht Dateien in `_vendor/`, die keine Sprache mehr importiert. |


**Kopie oder `--npm`?** Eine Kopie zeigt die Regeln direkt in der Datei: Sie können sie bearbeiten, eine Grammatik verwenden, die neuer ist als das installierte Paket, oder eine von Drittanbietern. Eine Kopie bleibt unverändert, wenn das Plugin highlight.js aktualisiert; um sie zu aktualisieren, konvertieren Sie die Sprache erneut mit `--force`. Eine mit `--npm` erstellte Datei ist nur wenige Zeilen lang, und ihre Grammatik wird zusammen mit dem Plugin aktualisiert.

## Erstellen und Anwenden

```sh
sh highlight/_compile.sh
```

- Erforderlich ist Docker (der Build läuft in einem `node:20-alpine`-Container) oder, falls kein Docker vorhanden ist, Node.js 18+ auf demselben Rechner. Beim ersten Start installiert das Skript npm-Pakete in den Ordner `node_modules/` des Plugins.
- Zuerst prüft das Skript jede Sprache: Es erstellt sie einzeln, lädt sie, registriert sie in derselben Engine, die auch im Browser läuft, und hebt einen Beispieltext hervor. Ist eine Sprache fehlerhaft (ein Fehler im Code, ein ungültiger regulärer Ausdruck, eine bereits vergebene `id`), nennt das Skript die Datei und den Grund und bricht ab; die bisherige `tiptap_highlight.js` bleibt erhalten.
- Anschließend bündelt das Skript alle Sprachen in `assets/javascripts/tiptap_highlight.js`.

Starten Sie Redmine nach dem Build neu: Es veröffentlicht die Plugin-Dateien beim Start (die Befehle finden Sie unter „Aktualisierung“ im [Haupt-README](../../docs/README.de.md#aktualisierung)). Browser erhalten die neue Datei sofort, weil ihre URL einen Fingerprint des Inhalts enthält.

Wenn auf dem Redmine-Server weder Docker noch Node.js vorhanden ist, erstellen Sie den Build auf einem beliebigen Rechner, der eines von beiden hat (eine Kopie des Plugin-Ordners genügt), und legen Sie die entstandene Datei `assets/javascripts/tiptap_highlight.js` auf dem Server ab.

## Sprache entfernen

Löschen Sie die Sprachdatei aus `highlight/`, erstellen Sie den Build und starten Sie Redmine neu. Gespeicherte Blöcke in dieser Sprache bleiben unverändert und werden als reiner Text angezeigt. Nicht mehr benötigte Dateien in `_vendor/` entfernen Sie mit:

```sh
python3 highlight/_convert_grammar.py --prune
```

## Eigene Grammatiken und Regeln für die Bearbeitung

- Eine Grammatik ist eine Funktion, die das Objekt `hljs` erhält und eine Sprachdefinition zurückgibt: welche Textstellen wie markiert werden. Anleitung: https://highlightjs.readthedocs.io/en/latest/language-guide.html, Referenz: https://highlightjs.readthedocs.io/en/latest/mode-reference.html. Beispiele: `log.js`, `journalctl.js`, `cisco-ios.js`.
- highlight.js fügt die regulären Ausdrücke aller Regeln einer Sprache zu einem einzigen zusammen und ignoriert deren eigene Flags. Daher muss ein Abgleich ohne Beachtung der Groß- und Kleinschreibung ausdrücklich ausgeschrieben (`[Ee]rror`) oder für die gesamte Sprache mit `case_insensitive: true` aktiviert werden.
- Bevorzugen Sie die Standardklassen für Token (`keyword`, `string`, `number`, `comment`, `title`, `attr`, `variable`, `built_in`, `literal`, `meta`, `symbol`, `type` und so weiter): Sie haben bereits Farben. Eine eigene Klasse (zum Beispiel erzeugt `scope: 'log-error'` die Klasse `hljs-log-error`) benötigt eine Regel in `assets/stylesheets/src/06_code.css` und ein erneutes Erstellen des CSS (`assets/stylesheets/src/_build.sh`).
- Um eine fertige Grammatik unter einem anderen Namen anzubieten, gehen Sie wie `cmd.js` vor: Rufen Sie die ursprüngliche Grammatik auf und ändern Sie `name` und `aliases` in ihrem Ergebnis. Werden die Aliase nicht ersetzt, übernimmt die neue Sprache sie vom Original.

## Plugin aktualisieren, wenn Sie Sprachen hinzugefügt haben

git lässt Ihre Dateien in `highlight/` unangetastet. Aber `assets/javascripts/tiptap_highlight.js` in der neuen Plugin-Version ist ohne Ihre Sprachen erstellt, und Ihr Build dieser Datei kommt `git pull` in die Quere. Gehen Sie daher so vor:

```sh
cd /path/to/redmine/plugins/redmine_tiptap
git checkout -- assets/javascripts/tiptap_highlight.js
git pull
sh highlight/_compile.sh
```

Der erste Befehl verwirft Ihren Build, der letzte erstellt die Sprachen erneut, einschließlich Ihrer eigenen. Starten Sie danach Redmine neu. Wenn Sie mit dem Plugin gelieferte Sprachdateien bearbeitet haben, fordert git Sie möglicherweise auf, Konflikte darin aufzulösen.

Wurde das Plugin aus einem Archiv installiert, sichern Sie Ihre Sprachdateien und den Ordner `_vendor/`, bevor Sie den Plugin-Ordner ersetzen, legen Sie sie anschließend wieder zurück und erstellen Sie die Sprachen.

## Größe

Alle Sprachen sind in einer Datei gebündelt; der Browser lädt sie einmal herunter und bezieht sie danach aus dem Cache. Derzeit sind es 226 KB für 52 Sprachen. Die meisten Sprachen benötigen 1–10 KB, die größte ist 1C (55 KB).
