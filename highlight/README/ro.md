# Evidențiere de sintaxă: limbi

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

> *Această traducere a fost realizată cu ajutorul unui model AI și nu a fost revizuită de un vorbitor nativ. Dacă găsiți o greșeală, vă rugăm [deschideți o problemă sau un pull request](https://github.com/Du10777/redmine_tiptap).*

Blocurile de cod sunt evidențiate atât în editor, cât și pe paginile salvate (tichete, note, wiki), și arată la fel în ambele. Limba unui bloc este aleasă din insigna din colțul din dreapta sus. Lista limbilor este definită de fișierele din dosarul `highlight/`: un fișier este o limbă.

Plugin-ul se află cu 52 de limbi. Puteți adăuga mai multe: convertiți o gramatică gata de highlight.js cu un script (consultați [Adăugare a unei limbi din highlight.js](#adăugare-a-unei-limbi-din-highlightjs)) sau scrieți a dvs.

## Cum funcționează

- Evidențierea este realizată de [highlight.js](https://highlightjs.org) (prin [lowlight](https://github.com/wooorm/lowlight)). Editorul și paginile salvate folosesc același motor, deci culorile se potrivesc.
- `_compile.sh` reunește toate fișierele de limbă într-un singur fișier, `assets/javascripts/tiptap_highlight.js`. Acest fișier este deja construit și comis în depozit, deci instalarea plugin-ului nu necesită construire. Trebuie doar să-l construiți atunci când schimbați setul de limbi.
- Redmine încarcă `tiptap_highlight.js` pe fiecare pagină, înainte de editor (`tiptap_bundle.js`). La încărcare editorul înregistrează toate limbile din acel fișier.
- În editor un bloc este re-evidențiat 50 ms după ce vă opriți din a tasta, și doar blocul care s-a schimbat. Pe paginile salvate un bloc este evidențiat atunci când se derulează în vedere. Un bloc din interiorul unei secțiuni pliabile este evidențiat atunci când secțiunea este deschisă.
- Limba este stocată în HTML-ul salvat: `<pre><code class="language-<id>">`. De aceea `id`-ul unei limbi nu trebuie să se schimbe niciodată: blocurile salvate cu vechi `id` ar deveni text simplu.
- Nu există detectare automată a limbii: un bloc fără limbă este afișat ca text simplu. La fel este și un bloc a cărui limbă nu se află în `highlight/` (de exemplu, fișierul limbii a fost șters); insigna acestuia continuă să arate `id`-ul. Dacă fișierul limbii se întoarce, la fel și culorile.
- Culori. highlight.js marchează textul cu clase precum `hljs-keyword`, `hljs-string`, `hljs-comment`. Culorile acestora sunt stabilite în `assets/stylesheets/src/06_code.css`, folosind paleta evidențierii de sintaxă proprie Redmine.

## Fișier de limbă

De exemplu, `routeros.js`:

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

| Câmp | Obligatoriu | Ce este |
|---|---|---|
| `id` | da | Numele limbii în HTML-ul salvat (`class="language-<id>"`). Caractere permise: `a-z`, `0-9`, `-`, `_`. **Nu o schimbați niciodată** odată ce blocuri cu această limbă au fost salvate. |
| `label` | nu | Nume în lista limbilor și pe insigna blocului. Implicit pe `id`. |
| `hint` | nu | Notă gri lângă nume în listă. |
| `keywords` | nu | Cuvinte suplimentare pentru căutarea în listă, separate prin spații. |
| `grammar` | da | O gramatică highlight.js: o funcție `(hljs) => language definition`. |

`label`, `hint` și `keywords` sunt în engleză. Pentru a arăta o limbă sub alt nume în limba de interfață a unui utilizator, sau pentru a o face găsibilă prin cuvinte din acea limbă, adăugați o intrare la fișierul de traducere al acelei limbi, `config/locales/<code>.yml`, sub `code_languages:`. Cuvintele de acolo sunt adăugate la `keywords`; `label` și `hint` înlocuiesc pe cele din fișierul limbii. `config/locales/ru.yml` are exemple, regulile sunt în [config/locales/README.md](../../config/locales/README.md).

Tipuri de fișiere în dosar:

- **Scurt.** O referință la o gramatică din pachetul npm highlight.js, ca în exemplul de mai sus; cele mai multe limbi sunt de genul acesta. Gramatica provine din versiunea highlight.js înregistrată în `package-lock.json` al plugin-ului.
- **Copie completă.** Codul gramaticii se află în fișier și poate fi editat. Aceste fișiere sunt create de scriptul de conversie (consultați mai jos).
- **Gramatică proprie.** `log.js`, `journalctl.js`, `cisco-ios.js`; părțile lor comune sunt în `_common.js`.
- **Wrapper.** O gramatică gata sub alt nume: `cmd.js` este `dos` din highlight.js, `docker-compose.js` este `yaml`.

Fișierele și dosarele ale căror nume încep cu `_` nu sunt limbi:

- `_compile.sh` construiește limbile;
- `_check.mjs` verifică limbile în timpul construirii;
- `_common.js` ține părțile comune ale propriilor gramatici ale plugin-ului;
- `_convert_grammar.py` este scriptul care convertește gramaticile highlight.js (consultați mai jos);
- `_vendor/` ține fișierele importate de gramaticile convertite (create de scriptul de conversie).

Dosarul `README/` ține această documentație.

## Adăugare a unei limbi din highlight.js

Gramaticile gata (mai mult de 190) sunt aici: https://github.com/highlightjs/highlight.js/tree/main/src/languages. Numele și pseudonimurile acestora sunt listate în [SUPPORTED_LANGUAGES.md](https://github.com/highlightjs/highlight.js/blob/main/SUPPORTED_LANGUAGES.md), împreună cu aproximativ o sută de gramatici terță păstrute în depozite separate. Scriptul `_convert_grammar.py` din acest dosar convertește oricare dintre ele în formatul plugin-ului.

Scriptul necesită Python 3.6+ (fără pachete suplimentare) și acces la github.com. Rulați-l din dosarul plugin-ului:

```sh
cd /path/to/redmine/plugins/redmine_tiptap
python3 highlight/_convert_grammar.py erlang
sh highlight/_compile.sh
```

Argumentul `erlang` este numele fișierului în `src/languages` fără `.js`. A doua comandă construiește limbile și le verifică. Apoi reporniți Redmine (consultați [Construire și aplicare](#construire-și-aplicare)). Sub Windows folosiți `py` sau `python` în loc de `python3`.

Exemple:

```sh
# listă de limbi highlight.js (* = deja în highlight/), opțional filtrată după cuvânt
python3 highlight/_convert_grammar.py --list
python3 highlight/_convert_grammar.py --list sql

# mai multe limbi odată
python3 highlight/_convert_grammar.py erlang nix fsharp

# nume propriu, indiciu și cuvinte de căutare (o limbă odată)
python3 highlight/_convert_grammar.py erlang --label "Erlang/OTP" --hint BEAM --keywords "erl otp"

# înlocuire un fișier scurt livrat cu plugin-ul cu o copie completă editabilă
python3 highlight/_convert_grammar.py routeros --force --label RouterOS --hint MikroTik --keywords mikrotik

# o limbă nu încă într-o versiune highlight.js lansată, din ramura de dezvoltare
python3 highlight/_convert_grammar.py odin --ref main

# un link la un fișier gramaticii, direct din bara de adresă a browserului
python3 highlight/_convert_grammar.py https://github.com/highlightjs/highlight.js/blob/main/src/languages/odin.js

# o gramatică terță: un link la depozitul său, scriptul găsește fișierul gramaticii
python3 highlight/_convert_grammar.py https://github.com/highlightjs/highlightjs-terraform

# un fișier gramaticii local
python3 highlight/_convert_grammar.py ~/grammars/mylang.js --id mylang

# un fișier scurt referențiind pachetul npm în loc de o copie a codului
python3 highlight/_convert_grammar.py erlang --npm

# arată ce ar fi făcut fără schimbare de nimic
python3 highlight/_convert_grammar.py erlang --dry-run
```

### Ce face scriptul

1. Descarcă `src/languages/<name>.js` versiunii highlight.js pe care plugin-ul o rulează. Versiunea este citită din `package-lock.json` (actualmente 11.12.0), deoarece gramaticile sunt scrise pentru motorul versiunii lor. `--ref` selectează altă versiune, ramură sau commit.
2. Ia numele limbii din linia `Language:` din antetul gramaticii și cuvintele de căutare din pseudonimurile sale (`aliases`). `id`-ul este numele fișierului gramaticii.
3. Pune codul gramaticii în `highlight/<id>.js` neschimbat cu excepția exportării: `export default function(hljs)` devine `function grammar(hljs)`, și obiectul limbii `export default { id, label, keywords, grammar }` este anexat la sfârșitul fișierului. Dacă gramatica este un modul CommonJS (`module.exports = ...`), o linie declarând `module` și `exports` este adăugată la începutul fișierului.
4. Dacă gramatica importă alte fișiere, le descarcă în `highlight/_vendor/<source>-<version>/` sub aceleași căi ca în depozit și direcționează importurile acolo. De exemplu, `typescript` importă `javascript.js` și `lib/ecmascript.js`. Aceste fișiere sunt partajate de toate limbile din aceeași sursă și versiune; nu este nevoie să le editați.
5. Verifică linia `Requires:`, care listează limbile folosite pentru cod încorporat (de exemplu, `php-template` necesită `xml` și `php`). Dacă nu se află în `highlight/`, tipărește comanda care le adaugă. Fără ele codul încorporat pur și simplu rămâne colorat; aceasta nu este o eroare.
6. Nu suprascrieți fișierele existente fără `--force` și nu lua un `id` deja folosit de alt fișier.

După conversie limba poate fi editată direct în fișierul său.

### Opțiuni

| Opțiune | Ce face |
|---|---|
| `LANGUAGE ...` | Un nume limbă highlight.js, un link la un fișier gramaticii sau la un depozit de gramatică terță pe GitHub, sau o cale la un fișier local `.js`. |
| `--ref REF` | Versiune highlight.js (etichetă), ramură sau commit. Implicit versiunea în `package-lock.json`. Pentru link-uri versiunea este luată din link. |
| `--id ID` | `id`-ul limbii. Implicit numele fișierului gramaticii. |
| `--label TEXT` | Nume în listă și pe insignă. Implicit `Language:` din gramatică. |
| `--hint TEXT` | Notă gri în listă. |
| `--keywords TEXT` | Cuvinte de căutare separate prin spații. Implicit: pseudonimurile gramaticii. |
| `--npm` | În loc de o copie a codului, scrieți un fișier scurt referențiind pachetul npm highlight.js. Doar pentru limbile highlight.js însuși. |
| `--force` | Suprascrieți fișierele existente. |
| `--dry-run` | Arată ce ar fi făcut fără schimbare de nimic. |
| `--list [WORD]` | Listează limbile highlight.js și gramaticile terță, opțional filtrate după cuvânt. |
| `--prune` | Ștergeți fișierele din `_vendor/` pe care nicio limbă nu le importă mai mult. |


**Copie sau `--npm`?** O copie arată regulile chiar în fișier: puteți le edita, luați o gramatică mai nouă decât pachetul instalat, sau una terță. O copie nu se schimbă când plugin-ul actualizează highlight.js; pentru a o reîmprospăta, convertiți limba din nou cu `--force`. Un fișier făcut cu `--npm` este câteva linii lung, și gramatica sa este actualizată împreună cu plugin-ul.

## Construire și aplicare

```sh
sh highlight/_compile.sh
```

- Necesită Docker (construirea se execută în container `node:20-alpine`) sau, dacă nu există Docker, Node.js 18+ pe aceeași mașină. La prima rulare scriptul instalează pachete npm în dosarul `node_modules/` al plugin-ului.
- În primul rând scriptul verifică fiecare limbă: o construiește separat, o încarcă, o înregistrează în același motor care rulează în browser, și evidențiază un text exemplu. Dacă o limbă este ruptă (o eroare în cod, o expresie regulară nevalidă, o `id` deja luată), scriptul numește fișierul și rațiunea și se oprește; `tiptap_highlight.js` anterior rămâne pe loc.
- Apoi scriptul reunește toate limbile în `assets/javascripts/tiptap_highlight.js`.

După construire, reporniți Redmine: publică fișierele plugin-ului la pornire (consultați "Actualizare" în [README-ul principal](../../docs/README.ro.md#actualizare) pentru comenzi). Browserele obțin fișierul nou imediat, deoarece adresa URL conține o amprentă a conținutului.

Dacă serverul Redmine nu are Docker sau Node.js, construiți pe orice mașină care are una dintre ele (o copie a dosarului plugin-ului este suficientă) și puneți `assets/javascripts/tiptap_highlight.js` rezultat pe server.

## Ștergere a unei limbi

Ștergeți fișierul limbii din `highlight/`, construiți, și reporniți Redmine. Blocurile salvate în această limbă rămân cum sunt și sunt afișate ca text simplu. Fișierele din `_vendor/` care nu mai sunt necesare sunt eliminate cu:

```sh
python3 highlight/_convert_grammar.py --prune
```

## Gramatici proprii și reguli de editare

- O gramatică este o funcție care primește obiectul `hljs` și întoarce o definiție de limbă: ce piese de text să marcheze și cum. Ghid: https://highlightjs.readthedocs.io/en/latest/language-guide.html, referință: https://highlightjs.readthedocs.io/en/latest/mode-reference.html. Exemple: `log.js`, `journalctl.js`, `cisco-ios.js`.
- highlight.js alătură expresiile regulate ale tuturor regulilor unei limbi în una și ignoră propriile lor semnale. Deci potrivirea insensibilă la caz trebuie spelled out (`[Ee]rror`) sau activată pentru întreaga limbă cu `case_insensitive: true`.
- Preferați clasele de token standard (`keyword`, `string`, `number`, `comment`, `title`, `attr`, `variable`, `built_in`, `literal`, `meta`, `symbol`, `type` și așa mai departe): ele au deja culori. O clasă a dvs. (de exemplu, `scope: 'log-error'` produce clasa `hljs-log-error`) necesită o regulă în `assets/stylesheets/src/06_code.css` și o reconstruire CSS (`assets/stylesheets/src/_build.sh`).
- Pentru a oferi o gramatică gata sub alt nume, faceți cum face `cmd.js`: apelați gramatica originală și schimbați `name` și `aliases` în rezultatul acesteia. Dacă pseudonimurile nu sunt înlocuite, limba nouă le preiau pe cele originale.

## Actualizare a plugin-ului atunci când ați adăugat limbi

git vă lasă fișierele din `highlight/` singure. Dar `assets/javascripts/tiptap_highlight.js` în versiunea nouă a plugin-ului este construit fără limbile dvs., și construirea dvs. a acestui fișier se pune în cale `git pull`. Deci:

```sh
cd /path/to/redmine/plugins/redmine_tiptap
git checkout -- assets/javascripts/tiptap_highlight.js
git pull
sh highlight/_compile.sh
```

Prima comandă descartă construirea dvs., ultima o construiește limbile din nou, inclusiv pe ale dvs. Apoi reporniți Redmine. Dacă ați editat fișierele de limbă livrate cu plugin-ul, git vă poate cere să rezolvați conflictele din ele.

Dacă plugin-ul a fost instalat dintr-o arhivă, salvați fișierele de limbă și dosarul `_vendor/` înainte de a înlocui dosarul plugin-ului, puneți-le înapoi după, și construiți limbile.

## Dimensiune

Toate limbile sunt reunite în un singur fișier; browserul-l descarcă o dată și apoi-l ia din cache. Actualmente este 226 KB pentru 52 de limbi. Cele mai multe limbi ocupă 1–10 KB, cea mai mare este 1C (55 KB).
