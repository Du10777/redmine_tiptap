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

> *Această traducere a fost realizată cu ajutorul unui model AI și nu a fost revizuită de un vorbitor nativ. Dacă găsiți o greșeală, vă rugăm [deschideți o problemă sau un pull request](https://github.com/Du10777/redmine_tiptap).*

Acesta este un editor de text pentru Redmine, bazat pe TipTap https://github.com/ueberdosis/tiptap

Versiuni Redmine acceptate: **6.\*** (dezvoltat și testat pe 6.1.4).

Motor editor: **TipTap 3.31.4**. Toate pachetele `@tiptap/*` sunt fixate la această versiune exactă în `package.json` și `package-lock.json` și trebuie întotdeauna actualizate împreună, la aceeași versiune.

## Funcționalități

**Formatare text**
- Îngroșat, cursiv, subliniat, tăiat, cod inline.
- Culoarea textului și culoarea de fundal: o paletă de 64 de culori sau orice valoare hex.
- Familie de fonturi (13 fonturi) și dimensiune de font (presetări de la 8 la 72 px, sau orice valoare).
- Stiluri de paragrafe: titluri 1–6 și text normal.
- Aliniere (stânga, centru, dreapta, justificat) și indentare (până la 8 niveluri) a paragrafelor și titlurilor.
- Linkuri: inserare, editare, ștergere.
- Linie orizontală, anulare și refacere.

**Liste**
- Liste cu puncte marcate cu disc, cerc sau pătrat.
- Liste numerotate: 1, 01, a, A, i, I, α.
- Liste de sarcini cu casete de selectare; sarcinile completate sunt tăiate.
- Liste imbricate (Tab / Shift+Tab).

**Tabele**
- Inserare a unui tabel de orice dimensiune, cu sau fără o rând de antet.
- Meniu cu clic dreapta într-o celulă: adăugare și ștergere de rânduri și coloane, fuzionare și separare de celule, rând și coloană de antet, ștergere a tabelului.
- Lățimile coloanelor sunt modificate prin tragerea marginilor celulelor.
- Lipirea din Excel păstrează lățimile coloanelor, aliniere și dimensiuni de font; un tabel copiat din Redmine se lipește în Excel cu margini.

**Imagini și fișiere atașate**
- Lipire o imagine din clipboard: este încărcată ca fișier atașat și apare în text.
- Imagini atașate cu câmpul de fișiere al Redmine, sau plasate peste el, sunt, de asemenea, inserate în text.
- Inserare o imagine din fișierele atașate (un selector de miniaturi) sau un link la orice fișier atașat.
- Redimensionare o imagine prin tragerea colțurilor acesteia.

**Cod**
- Blocuri de cod cu evidențiere de sintaxă în editor și pe paginile salvate: 52 de limbi, și puteți adăuga mai multe (consultați [Evidențiere de sintaxă](#evidențiere-de-sintaxă)).
- Limba unui bloc este aleasă dintr-o insignă în colțul său din dreapta sus, cu căutare, limbi recente și frecvente.
- Tab și Shift+Tab indentează și dezindentează liniile din interiorul unui bloc de cod; textul îngroșat, link-urile și culorile din interiorul codului sunt păstrate.

**Blocuri**
- Bloc pliabil: un titlu cu conținut ascuns (`<details>`). Pliabil pe paginile salvate, desfășurat în editor.
- Bloc de citat cu o linie de autor și dată.

**Editare**
- Modul `<HTML>` pentru vizualizare și editare a sursei HTML.
- Tastare în stil Markdown: `#` pentru titluri, `-` și `1.` pentru liste, `[ ]` pentru sarcini, ```` ```python ```` pentru un bloc de cod (orice nume de limbă sau niciunul), `**bold**`, `---` pentru o linie orizontală. Scurtături de tastatură standard: Ctrl+B, Ctrl+I, Ctrl+U, Ctrl+Z și altele.
- Editorul nu crește niciodată mai înalt decât fereastra: bara de instrumente și butoanele formularului rămân în vedere, iar textul se derulează în interior. Înălțimea urmează dimensiunea ferestrei și zoom-ul paginii.
- O apucătură de redimensionare în colțul din dreapta jos stabilește înălțimea manual. Înălțimea este reținută; dublu-clic revine la înălțime automată.

**Integrare Redmine**
- Funcționează în toate câmpurile de text Redmine cu formatare: descrieri și note de tichete, pagini wiki, știri, mesaje forum, documente, descrieri de proiecte, câmpuri personalizate de text lung, inclusiv câmpuri care apar pe pagină mai târziu.
- Textul este stocat ca HTML. Pentru a folosi editorul, alegeți *TipTap HTML* ca formatare text în setările Redmine.
- Interfața (tooltip-uri, meniuri, dialoguri) urmărește limba din profilul Redmine al utilizatorului. 47 din cele 50 de limbi ale Redmine sunt incluse în plugin: engleza și rusa sunt complete, celelalte 45 sunt schițe realizate cu un model AI care vorbitorii nativi sunt bineveniți să corecteze. Cele trei limbi scrise de la dreapta la stânga (arabă, ebraică, persană) nu sunt intenționat acceptate (consultați [Limba interfeței](#limba-interfeței)).
- Rămâne rapid pe texte mari: editorii din formulare ascunse sunt creați doar atunci când formularul este deschis, iar blocurile de cod lungi sunt evidențiate atunci când se derulează în vedere.
- Textele scrise în CKEditor (plugin-ul redmine_ckeditor) sunt afișate cum au fost și se deschid în editor cu formatarea lor: fără conversie, consultați [Migrare de la CKEditor](#migrare-de-la-ckeditor).
- Textele salvate sunt afișate fără HTML nesigur: scripturile, manipulatorii de evenimente și link-urile `javascript:` sunt eliminate atunci când o pagină este afișată, doar ceea ce produce editorul însuși este păstrat. Aceasta acoperă și textele care provin prin REST API sau modul `<HTML>`.

## Evidențiere de sintaxă

Blocurile de cod sunt evidențiate atât în editor, cât și pe paginile salvate. Limba unui bloc este preluată din insigna din colțul din dreapta sus; lista are o casetă de căutare și reține limbile utilizate recent și frecvent.

52 de limbi sunt incluse în plugin, inclusiv 1C, Cisco IOS, MikroTik RouterOS, Windows cmd, docker compose, jurnale de servicii Linux și ieșire journalctl.

Puteți adăuga propriile dvs. limbi. Fiecare limbă este un fișier în dosarul `highlight/`. Orice dintre cele 190+ gramatici highlight.js, sau una terță, este convertită într-un astfel de fișier cu o singură comandă:

```sh
python3 highlight/_convert_grammar.py erlang
sh highlight/_compile.sh
```

Detalii: [highlight/README/ro.md](../highlight/README/ro.md).

## Limba interfeței

Editorul vorbește limba aleasă în profilul Redmine al utilizatorului (Contul meu → Limba). Fișierele pentru 47 din cele 50 de limbi ale Redmine 6 sunt incluse în plugin, în `config/locales/`. Engleza este sursa și rusa este a autorului; celelalte 45 sunt schițe realizate cu ajutorul unui model AI și nu au fost încă revizuite de vorbitorii nativi, deci așteptați o frază ciudată aici și acolo. Un text lipsă dintr-un fișier este afișat în engleză.

Pentru a corecta o traducere, modificați valorile sale în `config/locales/<code>.yml` (`de`, `fr`, `pt-BR`, ...) și reporniți Redmine. `bundle exec rake redmine_tiptap:locales` verifică fișierele. Pull request-urile cu corecții sunt binevenite.

**Limbile scrise de la dreapta la stânga (arabă, ebraică, persană) nu sunt intenționat acceptate.** Sprijinul pentru acestea necesită multe schimbări în baza de cod, nu doar o traducere, și am ales să nu ne implicăm. Pentru aceste limbi editorul este afișat în engleză și aspectul acestuia nu este ajustat. Dacă aveți nevoie de una dintre ele, faceți un fork: mecanismul de traducere este gata, iar ceea ce altceva trebuie schimbat este listat în [config/locales/README.md](../config/locales/README.md#right-to-left-languages).

Detalii și lista limbilor Redmine: [config/locales/README.md](../config/locales/README.md).

## Instalare

1. Plasați plugin-ul în dosarul `plugins` al Redmine. Dosarul trebuie numit `redmine_tiptap`. Cel mai ușor mod este git, care face și actualizările o singură comandă:
   ```sh
   cd /path/to/redmine
   git clone https://github.com/Du10777/redmine_tiptap.git plugins/redmine_tiptap
   ```
2. Reporniți Redmine.
3. În setările Redmine (redmine.selfhosted/_settings_) alegeți Formatare text: *TipTap HTML*.

## Actualizare

Plugin-ul nu are migrări de baze de date, iar pachetul JavaScript construit și foaia de stil sunt parte din depozit. Actualizarea nu necesită npm sau o compilare pe server: înlocuiți fișierele plugin-ului și reporniți Redmine.

Înainte de actualizare, verificați că versiunea nouă acceptă versiunea dvs. Redmine (consultați "Versiuni Redmine acceptate" mai sus).

### Instalat cu git (recomandat)

```sh
cd /path/to/redmine/plugins/redmine_tiptap
git pull
```

Apoi reporniți Redmine, de exemplu:

```sh
sudo systemctl restart redmine          # Redmine running as a systemd service
touch /path/to/redmine/tmp/restart.txt  # Passenger
docker compose restart redmine          # Docker
```

Pentru a rămâne la o anumită versiune în loc de cea mai recentă commit: `git fetch && git checkout <tag-or-commit>`.

### Instalat dintr-o arhivă

1. Ștergeți dosarul vechi `plugins/redmine_tiptap` și despachetați versiunea nouă în locul acestuia. Ștergerea mai întâi se asigură că fișierele eliminate în versiunea nouă nu rămân.
2. Ștergeți `public/assets/.manifest.json` în dosarul Redmine.
3. Reporniți Redmine.

Pasul 2 este important. La pornire Redmine republică resursele plugin-ului doar dacă fișierele acestora sunt mai noi decât acest manifest. Fișierele despachetate dintr-o arhivă păstrează marcajele de timp originale, deci fără pasul 2 Redmine ar putea continua să servească editorul vechi. Manifestul este recreat automat la pornire. Cu `git pull` acest pas nu este necesar: git oferă fișierele modificate ora curentă.

### După actualizare

- Scriptul și foaia de stil ale editorului sunt servite cu o amprentă de conținut în adresele URL, deci browserele încarcă versiunea nouă imediat după repornire. Utilizatorii nu trebuie să-și șteargă memoria cache a browserului.
- Dacă *Cache formatted text* este activat în setările Redmine (Administrare → Setări → General), ștergeți memoria cache Redmine o dată după actualizare la o versiune care schimbă modul în care textele sunt afișate (curățare HTML, suport pentru texte CKEditor): `bundle exec rake tmp:cache:clear RAILS_ENV=production` în dosarul Redmine. În caz contrar, paginile redate înainte de actualizare pot fi afișate din cache, necurate, până când textul lor se schimbă.
- Versiunile mai vechi ale plugin-ului au copiat scriptul la `public/tiptap_bundle.js`. Aceste fișiere nu mai sunt utilizate și pot fi șterse:
  ```sh
  rm -f /path/to/redmine/public/tiptap_bundle.js /path/to/redmine/public/tiptap_bundle.js.map
  ```

## Migrare de la CKEditor

Dacă Redmine dvs. a folosit [redmine_ckeditor](https://github.com/a-ono/redmine_ckeditor), puteți comuta la acest plugin și păstrați orice text care a fost scris: tichete, note, pagini wiki, știri, mesaje, documente. Nimic nu este convertit și baza de date nu este atinsă. CKEditor stochează textele sale ca HTML și la fel și acest plugin, deci un text stocat este pur și simplu afișat de formatorului nou.

1. Instalați plugin-ul (consultați mai sus) și alegeți Formatare text: *TipTap HTML*.
2. Păstrați dosarul `public/system/rich/` al Redmine dvs. Pozele și fișierele pe care le-au inserat oamenii cu browserul de imagini al CKEditor sunt stocate acolo și nu în baza de date, iar textele le referă prin adresă (`/system/rich/...`). Fișierele atașate de tichete, pagini wiki și așa mai departe sunt stocate ca înainte și nu au nevoie de nimic.
3. Eliminați redmine_ckeditor când nu mai aveți nevoie de el.

Un text vechi este afișat cum l-a afișat CKEditor: fonturi, dimensiuni, culori și aliniere, indentări, liste, tabele (margini, lățimi, texte descriptive, celule fuzionate), poze (dimensiune, plutire, margine, o poză în interiorul unui link), linkuri, blocuri de cod cu limba lor (evidențiate), macrocomenzi Redmine (`{{toc}}`, `{{collapse(Title) ... }}`, `{{thumbnail(...)}}` și așa mai departe), linkuri wiki și de tichete, adrese web simple făcute clicabile, și `<iframe>` încorporate (video). Un text scris în CKEditor este recunoscut prin marcajul său și păstrează distanța dintre paragrafe pe care a avut-o acolo, care este mai largă decât în acest editor.

Diferențe cu intenție:
- Un `<iframe>` este afișat doar când se referă la un alt site prin http(s), și este în sandbox: pagina din interior poate rula propriile scripturi, dar nu poate accesa pagina Redmine, deschide fereastra de sus sau trimite formulare. Toate celelalte `<iframe>` sunt eliminate.
- Link-urile se deschid în aceeași fereastră: atributul `target` al unui link (opțiunea CKEditor "New Window (_blank)") nu este păstrat.
- O parte din formatare pe care CKEditor a oferit-o, dar paginile sale au eliminat în tăcere, este afișată aici: de exemplu culorile de fundal ale stilurilor sale "Marker" și ghilimele din `<q>`.

Un text vechi și-păstrează formatarea atunci când este deschis în editor și salvat din nou: macrocomenzi Redmine (o macrocomandă este un element gri în editor; editați-o în modul `<HTML>`, ca în modul Source al CKEditor), `<iframe>`, indice și exponent, stiluri inline CKEditor (big, small, keyboard, sample și așa mai departe), stilul titlurilor, tabelelor și celulelor tabelelor, dimensiunea, plutirea, marginea și linkul pozelor, limba blocurilor de cod. Ce nu supraviețuiește editării: blocurile `<address>` și `<div>` devin paragrafe, textul descriptiv al unui tabel devine o paragrafă centrată deasupra acestuia, secțiunile de antet și footer ale unui tabel devin rânduri obișnuite (footer-ul rămâne la bază), `<del>` devine `<s>` (același aspect), și înălțimea unei poze este omisă atunci când lățimea sa este stabilită (proporțiile sunt păstrate). Un text salvat din acest editor primește spațierea compactă a paragrafelor acestui editor.
