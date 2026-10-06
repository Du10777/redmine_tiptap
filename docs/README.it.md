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

> *Questa traduzione è stata realizzata con l’aiuto di un modello di IA e non è stata rivista da un madrelingua. Se si trova un errore, si prega di [aprire una issue o una pull request](https://github.com/Du10777/redmine_tiptap).*

Questo è un editor di testo per Redmine, basato su TipTap https://github.com/ueberdosis/tiptap

**[Prova l’editor online](https://du10777.github.io/redmine_tiptap/)**: la pagina dimostrativa fa funzionare l’editor di questo plugin direttamente nel browser, su una pagina fatta come un modulo di Redmine. Scrivi e formatta il testo, incolla un’immagine, apri la scheda «Anteprima» per vedere come apparirà il testo una volta salvato, cambia la lingua dell’interfaccia o scegli un testo di esempio. Non c’è niente da installare e niente viene inviato da nessuna parte.

[![L’editor nella pagina dimostrativa](../docs/images/demo.png)](https://du10777.github.io/redmine_tiptap/)

Motore dell’editor: **TipTap 3.31.4**. Tutti i pacchetti `@tiptap/*` sono fissati a questa versione esatta in `package.json` e `package-lock.json` e devono essere sempre aggiornati insieme, alla stessa identica versione.

**Indice**

- [Versioni di Redmine supportate](#versioni-di-redmine-supportate)
- [Funzionalità](#funzionalità)
  - [Formattazione testo](#formattazione-testo)
  - [Elenchi](#elenchi)
  - [Tabelle](#tabelle)
  - [Immagini e allegati](#immagini-e-allegati)
  - [Codice](#codice)
  - [Blocchi](#blocchi)
  - [Modifica](#modifica)
  - [Integrazione con Redmine](#integrazione-con-redmine)
- [Evidenziazione della sintassi](#evidenziazione-della-sintassi)
- [Lingua dell’interfaccia](#lingua-dellinterfaccia)
- [Installazione](#installazione)
- [Aggiornamento](#aggiornamento)
  - [Installato con git (consigliato)](#installato-con-git-consigliato)
  - [Installato da un archivio](#installato-da-un-archivio)
  - [Dopo l’aggiornamento](#dopo-laggiornamento)
- [Migrazione da CKEditor](#migrazione-da-ckeditor)

## Versioni di Redmine supportate

| Redmine | Supportata | Testato su |
|---|---|---|
| 7.x | sì | 7.0.2 |
| 6.x | sì | 6.1.4, 6.1.5 |
| 5.x e precedenti | no | — |

Una nuova versione principale (8.x e successive) diventa supportata solo dopo che il plugin è stato testato su di essa. Fino ad allora Redmine di quella versione non si avvia con il plugin installato: si ferma con un errore che indica le versioni supportate.

## Funzionalità

### Formattazione testo
- Grassetto, corsivo, sottolineato, barrato, pedice e apice (Ctrl+, e Ctrl+.), codice inline.
- Colore del testo e colore di sfondo: una tavolozza di 64 colori o qualsiasi valore esadecimale.
- Carattere (13 tipi) e dimensione del carattere (valori predefiniti da 8 a 72 px, oppure qualsiasi valore).
- Stili di paragrafo: titoli da 1 a 6 e testo normale.
- Allineamento (a sinistra, al centro, a destra, giustificato) e rientro (fino a 8 livelli) di paragrafi e titoli.
- Collegamenti: inserimento, modifica, rimozione.
- Linea orizzontale, annulla e ripeti.

### Elenchi
- Elenchi puntati con punti elenco a forma di disco, cerchio o quadrato.
- Elenchi numerati: 1, 01, a, A, i, I, α.
- Elenchi di attività con caselle di controllo; le attività completate sono barrate.
- Elenchi annidati (Tab / Shift+Tab).

### Tabelle
- Inserire una tabella di qualsiasi dimensione, con o senza riga di intestazione.
- Menu del clic destro in una cella: aggiungere ed eliminare righe e colonne, unire e dividere le celle, riga di intestazione e colonna di intestazione, eliminare la tabella.
- La larghezza delle colonne si modifica trascinando i bordi delle celle.
- Incollando da Excel si mantengono la larghezza delle colonne, l’allineamento e le dimensioni dei caratteri; una tabella copiata da Redmine viene incollata in Excel con i bordi.

### Immagini e allegati
- Incollare un’immagine dagli appunti: viene caricata come allegato e compare nel testo.
- Anche le immagini allegate con il campo «File» di Redmine, o trascinate su di esso, vengono inserite nel testo.
- Inserire un’immagine dagli allegati (selezione tramite miniature) oppure un collegamento a un qualsiasi allegato.
- Ridimensionare un’immagine trascinandone gli angoli.

### Codice
- Blocchi di codice con evidenziazione della sintassi nell’editor e nelle pagine salvate: 52 linguaggi, e se ne possono aggiungere altri (vedere [Evidenziazione della sintassi](#evidenziazione-della-sintassi)).
- Il linguaggio di un blocco si sceglie da un badge posto nel suo angolo, con ricerca, linguaggi recenti e frequenti.
- Tab e Shift+Tab aumentano e riducono il rientro delle righe all’interno di un blocco di codice; grassetto, collegamenti e colori nel codice vengono mantenuti.

### Blocchi
- Blocco comprimibile: un titolo con contenuto nascosto (`<details>`). Compresso nelle pagine salvate, espanso nell’editor.
- Blocco di citazione con una riga per autore e data.

### Modifica
- Modalità `<HTML>` per visualizzare e modificare il sorgente HTML: i blocchi annidati hanno un rientro, una riga vuota separa i blocchi che occupano più righe, la sintassi viene colorata con le stesse regole di un blocco di codice HTML e Enter mantiene il rientro della riga.
- Digitazione in stile Markdown: `#` per i titoli, `-` e `1.` per gli elenchi, `[ ]` per le attività, ```` ```python ```` per un blocco di codice (qualsiasi nome di linguaggio oppure nessuno), `**bold**`, `---` per una linea orizzontale. Scorciatoie da tastiera standard: Ctrl+B, Ctrl+I, Ctrl+U, Ctrl+Z e altre.
- L’editor non diventa mai più alto della finestra: la barra degli strumenti e i pulsanti del modulo restano visibili e il testo scorre al suo interno. L’altezza segue le dimensioni della finestra e lo zoom della pagina.
- Una maniglia di ridimensionamento nell’angolo in basso a destra permette di impostare l’altezza manualmente. L’altezza viene memorizzata; con un doppio clic si torna all’altezza automatica.

### Integrazione con Redmine
- Funziona in tutti i campi di testo di Redmine che supportano la formattazione: descrizioni e note delle segnalazioni, pagine wiki, notizie, messaggi dei forum, documenti, descrizioni dei progetti, campi personalizzati di tipo testo lungo, compresi i campi che compaiono nella pagina in un secondo momento.
- Il testo viene memorizzato come HTML. Per usare l’editor, scegliere *TipTap HTML* come formattazione testo nelle impostazioni di Redmine.
- L’interfaccia (descrizioni comandi, menu, finestre di dialogo) segue la lingua indicata nel profilo Redmine dell’utente. Con il plugin sono fornite 47 delle 50 lingue di Redmine: inglese e russo sono complete, le altre 45 sono bozze realizzate con un modello di IA, che i madrelingua sono invitati a correggere. Le tre lingue scritte da destra a sinistra (arabo, ebraico, persiano) non sono volutamente supportate (vedere [Lingua dell’interfaccia](#lingua-dellinterfaccia)).
- Resta veloce anche con testi di grandi dimensioni: gli editor nei moduli nascosti vengono creati solo quando il modulo viene aperto, e i blocchi di codice lunghi vengono evidenziati quando compaiono nell’area visibile durante lo scorrimento.
- I testi scritti in CKEditor (il plugin redmine_ckeditor) vengono mostrati come erano e si aprono nell’editor con la loro formattazione: nessuna conversione, vedere [Migrazione da CKEditor](#migrazione-da-ckeditor).
- I testi salvati vengono mostrati senza HTML non sicuro: script, gestori di eventi e collegamenti `javascript:` vengono rimossi quando si visualizza una pagina; viene mantenuto solo ciò che l’editor stesso produce. Questo vale anche per i testi che arrivano tramite la REST API o la modalità `<HTML>`.

## Evidenziazione della sintassi

I blocchi di codice vengono evidenziati sia nell’editor sia nelle pagine salvate. Il linguaggio di un blocco si sceglie dal badge nell’angolo in alto a destra; l’elenco dispone di un campo di ricerca e ricorda i linguaggi usati di recente e quelli usati più spesso.

Con il plugin sono forniti 52 linguaggi, tra cui HTML, 1C, Cisco IOS, MikroTik RouterOS, Windows cmd, docker compose, i log dei servizi Linux e l’output di journalctl.

È possibile aggiungere linguaggi propri. Ogni linguaggio è un file nella cartella `highlight/`. Una qualsiasi delle oltre 190 grammatiche di highlight.js, o una grammatica di terze parti, viene convertita in un file di questo tipo con un solo comando:

```sh
python3 highlight/_convert_grammar.py erlang
sh highlight/_compile.sh
```

Dettagli: [highlight/README/it.md](../highlight/README/it.md).

## Lingua dell’interfaccia

L’editor si presenta nella lingua scelta nel profilo Redmine dell’utente (Il mio utente → Lingua). I file per 47 delle 50 lingue di Redmine sono forniti con il plugin, in `config/locales/`. L’inglese è la lingua di partenza e il russo è opera dell’autore stesso; le altre 45 sono bozze realizzate con l’aiuto di un modello di IA e non ancora riviste da madrelingua, quindi è possibile imbattersi qua e là in qualche espressione strana. Un testo mancante in un file viene mostrato in inglese.

Per correggere una traduzione, modificarne i valori in `config/locales/<code>.yml` (`de`, `fr`, `pt-BR`, ...) e riavviare Redmine. Il comando `bundle exec rake redmine_tiptap:locales` controlla i file. Le pull request con correzioni sono ben accette.

**Le lingue scritte da destra a sinistra (arabo, ebraico, persiano) non sono volutamente supportate.** Supportarle richiede molte modifiche al codice, non solo una traduzione, e si è scelto di non assumersi questo impegno. Per queste lingue l’editor viene mostrato in inglese e il suo layout non viene adattato. Se serve una di esse, creare un fork: il meccanismo di traduzione è pronto, e le altre modifiche necessarie sono elencate in [config/locales/README.md](../config/locales/README.md#right-to-left-languages).

Dettagli ed elenco delle lingue di Redmine: [config/locales/README.md](../config/locales/README.md).

## Installazione

1. Copiare il plugin nella cartella `plugins` di Redmine. La cartella deve chiamarsi `redmine_tiptap`. Il modo più semplice è usare git, che riduce anche gli aggiornamenti a un solo comando:
   ```sh
   cd /path/to/redmine
   git clone --branch release --single-branch --depth 1 https://github.com/Du10777/redmine_tiptap.git plugins/redmine_tiptap
   ```
   Il ramo `release` contiene solo i file che servono al plugin per funzionare, senza questa documentazione, e `--depth 1` non scarica la cronologia del repository.
2. Riavviare Redmine.
3. Nelle impostazioni di Redmine (redmine.selfhosted/_settings_) scegliere Formattazione testo: *TipTap HTML*.

## Aggiornamento

Il plugin non ha migrazioni del database, e il bundle JavaScript compilato e il foglio di stile fanno parte del repository. L’aggiornamento non richiede né npm né una compilazione sul server: sostituire i file del plugin e riavviare Redmine.

Prima di aggiornare, verificare che la nuova versione supporti la versione di Redmine in uso (vedere «Versioni di Redmine supportate» più sopra).

### Installato con git (consigliato)

```sh
cd /path/to/redmine/plugins/redmine_tiptap
git pull
```

Quindi riavviare Redmine, ad esempio:

```sh
sudo systemctl restart redmine          # Redmine eseguito come servizio systemd
touch /path/to/redmine/tmp/restart.txt  # Passenger
docker compose restart redmine          # Docker
```

Per restare su una versione specifica invece che sulla più recente, scaricare un commit del ramo `release` e passare a quel commit: `git fetch --depth 1 origin <commit> && git checkout <commit>`.

Se il plugin è stato installato con un semplice `git clone` (il ramo `main`, con la documentazione e tutta la cronologia), passare una volta al ramo `release`: eliminare la cartella `plugins/redmine_tiptap` e reinstallare il plugin come descritto in [Installazione](#installazione). Il plugin non conserva nulla di proprio nella sua cartella, quindi non si perde nulla; solo i linguaggi di evidenziazione del codice aggiunti da voi vanno prima copiati fuori da `highlight/`.

### Installato da un archivio

1. Scaricare l’archivio del ramo `release`: https://github.com/Du10777/redmine_tiptap/archive/refs/heads/release.zip. Eliminare la vecchia cartella `plugins/redmine_tiptap` e decomprimere l’archivio al suo posto; la cartella nell’archivio si chiama `redmine_tiptap-release`, rinominarla in `redmine_tiptap`. Eliminando prima la cartella ci si assicura che i file rimossi nella nuova versione non restino.
2. Eliminare `public/assets/.manifest.json` nella cartella di Redmine.
3. Riavviare Redmine.

Il passaggio 2 è importante. All’avvio Redmine ripubblica gli asset dei plugin solo se i loro file sono più recenti di questo manifest. I file decompressi da un archivio mantengono i timestamp originali, quindi senza il passaggio 2 Redmine potrebbe continuare a servire il vecchio editor. Il manifest viene ricreato automaticamente all’avvio. Con `git pull` questo passaggio non è necessario: git assegna ai file modificati l’ora corrente.

### Dopo l’aggiornamento

- Lo script e il foglio di stile dell’editor vengono serviti con un’impronta del contenuto nei rispettivi URL, quindi i browser caricano la nuova versione subito dopo il riavvio. Gli utenti non devono svuotare la cache del browser.
- Se l’opzione *Cache testo formattato* è attivata nelle impostazioni di Redmine (Amministrazione → Impostazioni → Generale), dopo l’aggiornamento a una versione che cambia il modo in cui i testi vengono mostrati (pulizia dell’HTML, supporto dei testi di CKEditor) svuotare una volta la cache di Redmine: `bundle exec rake tmp:cache:clear RAILS_ENV=production` nella cartella di Redmine. In caso contrario, le pagine generate prima dell’aggiornamento possono essere mostrate dalla cache, non ripulite, finché il loro testo non cambia.
- Le versioni precedenti del plugin copiavano lo script in `public/tiptap_bundle.js`. Questi file non sono più utilizzati e possono essere eliminati:
  ```sh
  rm -f /path/to/redmine/public/tiptap_bundle.js /path/to/redmine/public/tiptap_bundle.js.map
  ```

## Migrazione da CKEditor

Se Redmine ha utilizzato [redmine_ckeditor](https://github.com/a-ono/redmine_ckeditor), è possibile passare a questo plugin e conservare ogni testo che è stato scritto: segnalazioni, note, pagine wiki, notizie, messaggi, documenti. Nulla viene convertito e il database non viene toccato. CKEditor memorizza i suoi testi come HTML e così fa anche questo plugin, quindi un testo memorizzato viene semplicemente mostrato dal nuovo formattatore.

1. Installare il plugin (vedere sopra) e scegliere Formattazione testo: *TipTap HTML*.
2. Conservare la cartella `public/system/rich/` di Redmine. Le immagini e i file eventualmente inseriti con il browser immagini di CKEditor sono archiviati lì, non nel database e non tra gli allegati, e i testi vi si riferiscono per indirizzo (`/system/rich/...`). **Se Redmine viene spostato su un altro server o installato di nuovo, spostare anche questa cartella**, insieme al database e alla cartella `files/`: nessuno dei due contiene questi file, e senza la cartella le immagini nei vecchi testi restituiscono un errore 404. Gli allegati di segnalazioni, pagine wiki e così via vengono archiviati come prima e non richiedono nulla. Le immagini inserite in questo editor sono normali allegati. La cartella resta necessaria anche dopo la rimozione di redmine_ckeditor.
3. Rimuovere redmine_ckeditor quando non lo si usa più.

Un testo precedente viene mostrato nel modo in cui CKEditor lo ha mostrato: caratteri, dimensioni, colori e allineamento, rientri, elenchi, tabelle (bordi, larghezze, didascalie, celle unite), immagini (dimensioni, float, bordo, un'immagine all'interno di un collegamento), collegamenti, blocchi di codice con il loro linguaggio (evidenziati), macro di Redmine (`{{toc}}`, `{{collapse(Title) ... }}`, `{{thumbnail(...)}}` e così via), collegamenti wiki e segnalazione, indirizzi web normali resi cliccabili e `<iframe>` incorporati (video). Un testo scritto in CKEditor viene riconosciuto dal suo markup e conserva la spaziatura tra i paragrafi che aveva lì, che è maggiore rispetto a questo editor.

Differenze intenzionali:
- Un `<iframe>` viene mostrato solo quando punta a un altro sito su http(s) e viene sottoposto a sandbox: la pagina al suo interno può eseguire i propri script, ma non può raggiungere la pagina di Redmine, aprire la finestra principale o inviare moduli. Tutti gli altri `<iframe>` vengono rimossi.
- I collegamenti si aprono nella stessa finestra: l'attributo `target` di un collegamento (opzione "Nuova finestra (_blank)" di CKEditor) non viene conservato.
- Alcuni formattamenti che CKEditor offriva ma le cui pagine hanno silenziosamente eliminato vengono mostrati qui: ad esempio i colori di sfondo degli stili "Marker" di CKEditor e le virgolette di `<q>`.
- Lo stile «Special Container» di CKEditor (un blocco con una cornice grigia) viene mostrato come blocco di codice senza evidenziazione, e anche nell'editor è un blocco di codice.

Un testo precedente mantiene la sua formattazione quando viene aperto nell'editor e salvato di nuovo: macro di Redmine (una macro è un elemento grigio nell'editor; modificarla nella modalità `<HTML>`, come nella modalità Sorgente di CKEditor), `<iframe>`, i blocchi `<div>` e `<address>` con il loro stile (un `<div>` incollato da una pagina web viene comunque trasformato in un paragrafo), apice e pedice, stili inline di CKEditor (big, small, keyboard, sample e così via), lo stile di titoli, tabelle e celle di tabella, la dimensione (larghezza e altezza), il float, il bordo e il collegamento delle immagini, il linguaggio dei blocchi di codice. Ciò che non sopravvive alla modifica: la didascalia di una tabella diventa un paragrafo centrato sopra di essa, le sezioni intestazione e piè di pagina di una tabella diventano righe ordinarie (il piè di pagina rimane in fondo) e `<del>` diventa `<s>` (lo stesso aspetto). Un testo salvato da questo editor ottiene lo spazio compatto tra i paragrafi di questo editor.
