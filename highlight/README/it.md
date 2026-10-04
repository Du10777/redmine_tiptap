# Evidenziazione della sintassi: lingue

**Read this in other languages:**
[English](en.md) ·
[Русский](ru.md) ·
[Shqip](sq.md) ·
[Azeri](az.md) ·
[Bosanski](bs.md) ·
[Български](bg.md) ·
[Català](ca.md) ·
[简体中文](zh.md) ·
[繁體中文](zh-TW.md) ·
[Hrvatski](hr.md) ·
[Čeština](cs.md) ·
[Dansk](da.md) ·
[Nederlands](nl.md) ·
[Eesti](et.md) ·
[Suomi](fi.md) ·
[Français](fr.md) ·
[Galego](gl.md) ·
[Deutsch](de.md) ·
[Ελληνικά](el.md) ·
[Magyar](hu.md) ·
[Bahasa Indonesia](id.md) ·
[Italiano](it.md) ·
[日本語](ja.md) ·
[한국어](ko.md) ·
[Latviešu](lv.md) ·
[lietuvių](lt.md) ·
[Монгол](mn.md) ·
[Norsk bokmål](no.md) ·
[Polski](pl.md) ·
[Português](pt.md) ·
[Português/Brasil](pt-BR.md) ·
[Română](ro.md) ·
[Srpski](sr-YU.md) ·
[Српски](sr.md) ·
[Slovenčina](sk.md) ·
[Slovenščina](sl.md) ·
[Español](es.md) ·
[Svenska](sv.md) ·
[ไทย](th.md) ·
[Türkçe](tr.md) ·
[Українська](uk.md) ·
[Tiếng Việt](vi.md)

> *Questa traduzione è stata realizzata con l'aiuto di un modello di IA e non è stata rivista da un madrelingua. Se si trova un errore, si prega di [aprire una issue o una pull request](https://github.com/Du10777/redmine_tiptap).*

I blocchi di codice vengono evidenziati sia nell'editor che nelle pagine salvate (segnalazioni, note, wiki) e hanno lo stesso aspetto in entrambi. Il linguaggio di un blocco si sceglie dal badge nell'angolo in alto a destra. L'elenco dei linguaggi è definito dai file nella cartella `highlight/`: un file è un linguaggio.

Il plugin viene fornito con 52 lingue. È possibile aggiungerne altre: convertire una grammatica highlight.js pronta con uno script (vedere [Aggiungere un linguaggio da highlight.js](#aggiungere-un-linguaggio-da-highlightjs)) oppure scrivere la propria.

## Come funziona

- L'evidenziazione è gestita da [highlight.js](https://highlightjs.org) (tramite [lowlight](https://github.com/wooorm/lowlight)). L'editor e le pagine salvate usano lo stesso motore, quindi i colori corrispondono.
- `_compile.sh` raggruppa tutti i file dei linguaggi in un unico file, `assets/javascripts/tiptap_highlight.js`. Questo file è già compilato nel repository, quindi l'installazione del plugin non richiede una compilazione. È necessario compilarlo solo quando si modifica l'insieme dei linguaggi.
- Redmine carica `tiptap_highlight.js` su ogni pagina, prima dell'editor (`tiptap_bundle.js`). Al caricamento, l'editor registra tutti i linguaggi da quel file.
- Nell'editor un blocco viene rievidenziato 50 ms dopo che si smette di digitare, e solo il blocco che è stato modificato. Nelle pagine salvate un blocco viene evidenziato quando scorre nella visualizzazione. Un blocco all'interno di una sezione compressa viene evidenziato quando la sezione viene aperta.
- Il linguaggio viene archiviato nell'HTML salvato: `<pre><code class="language-<id>">`. Per questo motivo l'`id` di un linguaggio non deve mai cambiare: i blocchi salvati con il vecchio `id` diventerebbero testo semplice.
- Non c'è autodetection dei linguaggi: un blocco senza linguaggio viene mostrato come testo semplice. Così pure un blocco il cui linguaggio non è in `highlight/` (ad esempio, il file del linguaggio è stato eliminato); il suo badge continua a mostrare l'`id`. Se il file del linguaggio ritorna, così faranno anche i colori.
- Colori. highlight.js contrassegna il testo con classi come `hljs-keyword`, `hljs-string`, `hljs-comment`. I loro colori sono impostati in `assets/stylesheets/src/06_code.css`, usando la tavolozza dell'evidenziazione della sintassi di Redmine.

## File del linguaggio

Ad esempio, `routeros.js`:

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

| Campo | Obbligatorio | Che cos'è |
|---|---|---|
| `id` | sì | Nome del linguaggio nell'HTML salvato (`class="language-<id>"`). Caratteri consentiti: `a-z`, `0-9`, `-`, `_`. **Non modificarlo mai** una volta che i blocchi con questo linguaggio sono stati salvati. |
| `label` | no | Nome nell'elenco dei linguaggi e sul badge del blocco. Valore predefinito: `id`. |
| `hint` | no | Nota grigia accanto al nome nell'elenco. |
| `keywords` | no | Parole aggiuntive per la ricerca nell'elenco, separate da spazi. |
| `grammar` | sì | Una grammatica highlight.js: una funzione `(hljs) => language definition`. |

`label`, `hint` e `keywords` sono in inglese. Per mostrare un linguaggio con un altro nome nell'interfaccia nella lingua dell'utente, o per renderlo ricercabile con parole di quella lingua, aggiungere una voce al file di traduzione di quella lingua, `config/locales/<code>.yml`, sotto `code_languages:`. Le parole lì vengono aggiunte a `keywords`; `label` e `hint` sostituiscono quelli dal file del linguaggio. `config/locales/ru.yml` ha degli esempi, le regole sono in [config/locales/README.md](../../config/locales/README.md).

Tipi di file nella cartella:

- **Breve.** Un riferimento a una grammatica dal pacchetto npm highlight.js, come nell'esempio sopra; la maggior parte dei linguaggi è così. La grammatica viene dalla versione di highlight.js registrata in `package-lock.json` del plugin.
- **Copia completa.** Il codice della grammatica è nel file stesso e può essere modificato. Questi file sono creati dallo script di conversione (vedere sotto).
- **Grammatica propria.** `log.js`, `journalctl.js`, `cisco-ios.js`; le loro parti condivise sono in `_common.js`.
- **Wrapper.** Una grammatica pronta con un altro nome: `cmd.js` è `dos` da highlight.js, `docker-compose.js` è `yaml`.

I file e le cartelle i cui nomi iniziano con `_` non sono linguaggi:

- `_compile.sh` compila i linguaggi;
- `_check.mjs` controlla i linguaggi durante la compilazione;
- `_common.js` contiene parti condivise delle grammatiche proprie del plugin;
- `_convert_grammar.py` è lo script che converte le grammatiche highlight.js (vedere sotto);
- `_vendor/` contiene file importati dalle grammatiche convertite (creato dallo script di conversione).

La cartella `README/` contiene questa documentazione.

## Aggiungere un linguaggio da highlight.js

Le grammatiche pronte (più di 190) si trovano qui: https://github.com/highlightjs/highlight.js/tree/main/src/languages. I loro nomi e alias sono elencati in [SUPPORTED_LANGUAGES.md](https://github.com/highlightjs/highlight.js/blob/main/SUPPORTED_LANGUAGES.md), insieme a circa cento grammatiche di terze parti conservate in repository separati. Lo script `_convert_grammar.py` in questa cartella converte una qualsiasi di esse nel formato del plugin.

Lo script richiede Python 3.6+ (nessun pacchetto aggiuntivo) e accesso a github.com. Eseguirlo dalla cartella del plugin:

```sh
cd /path/to/redmine/plugins/redmine_tiptap
python3 highlight/_convert_grammar.py erlang
sh highlight/_compile.sh
```

L'argomento `erlang` è il nome del file in `src/languages` senza `.js`. Il secondo comando compila i linguaggi e li controlla. Quindi riavviare Redmine (vedere [Compilazione e applicazione](#compilazione-e-applicazione)). Su Windows usare `py` o `python` al posto di `python3`.

Esempi:

```sh
# elenco dei linguaggi highlight.js (* = già in highlight/), filtrati opzionalmente per una parola
python3 highlight/_convert_grammar.py --list
python3 highlight/_convert_grammar.py --list sql

# diversi linguaggi contemporaneamente
python3 highlight/_convert_grammar.py erlang nix fsharp

# nome, hint e parole di ricerca personalizzati (un linguaggio alla volta)
python3 highlight/_convert_grammar.py erlang --label "Erlang/OTP" --hint BEAM --keywords "erl otp"

# sostituire un file breve fornito con il plugin con una copia completa modificabile
python3 highlight/_convert_grammar.py routeros --force --label RouterOS --hint MikroTik --keywords mikrotik

# un linguaggio non ancora in una versione rilasciata di highlight.js, dal ramo di sviluppo
python3 highlight/_convert_grammar.py odin --ref main

# un collegamento a un file di grammatica, direttamente dalla barra degli indirizzi del browser
python3 highlight/_convert_grammar.py https://github.com/highlightjs/highlight.js/blob/main/src/languages/odin.js

# una grammatica di terze parti: un collegamento al suo repository, lo script trova il file della grammatica
python3 highlight/_convert_grammar.py https://github.com/highlightjs/highlightjs-terraform

# un file di grammatica locale
python3 highlight/_convert_grammar.py ~/grammars/mylang.js --id mylang

# un file breve che fa riferimento al pacchetto npm invece di una copia del codice
python3 highlight/_convert_grammar.py erlang --npm

# mostrare cosa verrebbe fatto senza apportare modifiche
python3 highlight/_convert_grammar.py erlang --dry-run
```

### Cosa fa lo script

1. Scarica `src/languages/<name>.js` della versione highlight.js su cui il plugin viene eseguito. La versione viene letta da `package-lock.json` (attualmente 11.12.0), perché le grammatiche sono scritte per il motore della loro versione. `--ref` seleziona un'altra versione, ramo o commit.
2. Prende il nome del linguaggio dalla riga `Language:` dell'intestazione della grammatica e le parole di ricerca dai suoi alias (`aliases`). L'`id` è il nome del file della grammatica.
3. Mette il codice della grammatica in `highlight/<id>.js` invariato ad eccezione dell'export: `export default function(hljs)` diventa `function grammar(hljs)`, e l'oggetto del linguaggio `export default { id, label, keywords, grammar }` viene aggiunto alla fine del file. Se la grammatica è un modulo CommonJS (`module.exports = ...`), una riga che dichiara `module` e `exports` viene aggiunta in cima.
4. Se la grammatica importa altri file, li scarica in `highlight/_vendor/<source>-<version>/` sotto gli stessi percorsi del repository e orienta gli import lì. Ad esempio, `typescript` importa `javascript.js` e `lib/ecmascript.js`. Questi file sono condivisi da tutti i linguaggi della stessa fonte e versione; non c'è bisogno di modificarli.
5. Controlla la riga `Requires:`, che elenca i linguaggi usati per il codice incorporato (ad esempio, `php-template` richiede `xml` e `php`). Se non sono in `highlight/`, stampa il comando che li aggiunge. Senza di loro il codice incorporato semplicemente rimane non colorato; questo non è un errore.
6. Non sovrascrive i file esistenti senza `--force` e non prende un `id` già usato da un altro file.

Dopo la conversione il linguaggio può essere modificato direttamente nel suo file.

### Opzioni

| Opzione | Cosa fa |
|---|---|
| `LANGUAGE ...` | Un nome di linguaggio highlight.js, un collegamento a un file di grammatica o a un repository di grammatica di terze parti su GitHub, o un percorso a un file `.js` locale. |
| `--ref REF` | Versione highlight.js (tag), ramo o commit. Valore predefinito: la versione in `package-lock.json`. Per i collegamenti la versione viene presa dal collegamento. |
| `--id ID` | `id` del linguaggio. Valore predefinito: il nome del file della grammatica. |
| `--label TEXT` | Nome nell'elenco e sul badge. Valore predefinito: `Language:` dalla grammatica. |
| `--hint TEXT` | Nota grigia nell'elenco. |
| `--keywords TEXT` | Parole di ricerca separate da spazi. Valore predefinito: gli alias della grammatica. |
| `--npm` | Invece di una copia del codice, scrivi un file breve che fa riferimento al pacchetto npm highlight.js. Solo per linguaggi di highlight.js stesso. |
| `--force` | Sovrascrivere i file esistenti. |
| `--dry-run` | Mostrare cosa verrebbe fatto senza apportare modifiche. |
| `--list [WORD]` | Elencare i linguaggi highlight.js e le grammatiche di terze parti, filtrati opzionalmente per una parola. |
| `--prune` | Eliminare i file in `_vendor/` che nessun linguaggio importa più. |


**Copia o `--npm`?** Una copia mostra le regole direttamente nel file: puoi modificarle, prendere una grammatica più nuova del pacchetto installato, o una di terze parti. Una copia non cambia quando il plugin aggiorna highlight.js; per aggiornarla, converti di nuovo il linguaggio con `--force`. Un file creato con `--npm` ha poche righe, e la sua grammatica viene aggiornata insieme al plugin.

## Compilazione e applicazione

```sh
sh highlight/_compile.sh
```

- Richiede Docker (la compilazione viene eseguita in un contenitore `node:20-alpine`) o, se non c'è Docker, Node.js 18+ sulla stessa macchina. Alla prima esecuzione lo script installa i pacchetti npm nella cartella `node_modules/` del plugin.
- Per prima cosa lo script controlla ogni linguaggio: lo compila separatamente, lo carica, lo registra nello stesso motore che viene eseguito nel browser, ed evidenzia un testo di esempio. Se un linguaggio è corrotto (un errore nel codice, un'espressione regolare non valida, un `id` già usato), lo script nomina il file e il motivo e si ferma; il precedente `tiptap_highlight.js` rimane al suo posto.
- Quindi lo script raggruppa tutti i linguaggi in `assets/javascripts/tiptap_highlight.js`.

Dopo la compilazione, riavviare Redmine: pubblica i file del plugin all'avvio (vedere "Aggiornamento" nel [README principale](../../docs/README.it.md#aggiornamento) per i comandi). I browser ricevono il nuovo file subito, perché il suo URL contiene un'impronta del contenuto.

Se il server Redmine non ha né Docker né Node.js, compila su qualsiasi macchina che abbia uno di essi (una copia della cartella del plugin è sufficiente) e metti il risultato `assets/javascripts/tiptap_highlight.js` sul server.

## Rimozione di un linguaggio

Eliminare il file del linguaggio da `highlight/`, compilare e riavviare Redmine. I blocchi salvati in questo linguaggio rimangono come sono e vengono mostrati come testo semplice. I file in `_vendor/` che non sono più necessari vengono rimossi con:

```sh
python3 highlight/_convert_grammar.py --prune
```

## Grammatiche proprie e regole di modifica

- Una grammatica è una funzione che riceve l'oggetto `hljs` e restituisce una definizione di linguaggio: quali parti di testo contrassegnare e come. Guida: https://highlightjs.readthedocs.io/en/latest/language-guide.html, riferimento: https://highlightjs.readthedocs.io/en/latest/mode-reference.html. Esempi: `log.js`, `journalctl.js`, `cisco-ios.js`.
- highlight.js unisce le espressioni regolari di tutte le regole di un linguaggio in una e ignora i loro stessi flag. Quindi l'abbinamento senza distinzione maiuscole-minuscole deve essere scritto esplicitamente (`[Ee]rror`) o abilitato per l'intero linguaggio con `case_insensitive: true`.
- Preferi le classi di token standard (`keyword`, `string`, `number`, `comment`, `title`, `attr`, `variable`, `built_in`, `literal`, `meta`, `symbol`, `type` e così via): hanno già i colori. Una classe propria (ad esempio, `scope: 'log-error'` produce la classe `hljs-log-error`) richiede una regola in `assets/stylesheets/src/06_code.css` e una ricostruzione CSS (`assets/stylesheets/src/_build.sh`).
- Per offrire una grammatica pronta con un altro nome, fai come `cmd.js`: chiama la grammatica originale e modifica `name` e `aliases` nel suo risultato. Se gli alias non vengono sostituiti, il nuovo linguaggio li assume dall'originale.

## Aggiornamento del plugin quando hai aggiunto linguaggi

git lascia i tuoi file in `highlight/` intatti. Ma `assets/javascripts/tiptap_highlight.js` nella nuova versione del plugin viene compilato senza i tuoi linguaggi, e la tua compilazione di questo file si frappone a `git pull`. Quindi:

```sh
cd /path/to/redmine/plugins/redmine_tiptap
git checkout -- assets/javascripts/tiptap_highlight.js
git pull
sh highlight/_compile.sh
```

Il primo comando scarta la tua compilazione, l'ultimo compila di nuovo i linguaggi, inclusi i tuoi. Quindi riavviare Redmine. Se hai modificato i file dei linguaggi forniti con il plugin, git potrebbe chiederti di risolvere i conflitti in essi.

Se il plugin è stato installato da un archivio, salva i tuoi file dei linguaggi e la cartella `_vendor/` prima di sostituire la cartella del plugin, rimettili dopo, e compila i linguaggi.

## Dimensione

Tutti i linguaggi vengono raggruppati in un unico file; il browser lo scarica una volta e poi lo prende dalla cache. Attualmente è 226 KB per 52 linguaggi. La maggior parte dei linguaggi richiede 1–10 KB, il più grande è 1C (55 KB).
