# Theksimi i sintaksës: gjuhët

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

> *Ky përkthim është bërë me ndihmën e një modeli të inteligjencës artificiale dhe nuk është rishikuar nga një folës amtar. Nëse gjeni ndonjë gabim, ju lutemi [hapni një issue ose një pull request](https://github.com/Du10777/redmine_tiptap).*

Blloqet e kodit theksohen si në përpunues, ashtu edhe në faqet e ruajtura (çështje, shënime, wiki), dhe duken njëlloj në të dyja. Gjuha e një blloku zgjidhet nga etiketa në cepin e tij lart djathtas. Lista e gjuhëve përcaktohet nga kartelat në dosjen `highlight/`: një kartelë është një gjuhë.

Shtojca vjen me 52 gjuhë. Mund të shtoni të tjera: konvertoni një gramatikë të gatshme të highlight.js me një skript (shihni [Shtimi i një gjuhe nga highlight.js](#shtimi-i-një-gjuhe-nga-highlightjs)) ose shkruani një të tuajën.

## Si funksionon

- Theksimin e bën [highlight.js](https://highlightjs.org) (përmes [lowlight](https://github.com/wooorm/lowlight)). Përpunuesi dhe faqet e ruajtura përdorin të njëjtin motor, prandaj ngjyrat përputhen.
- `_compile.sh` i paketon të gjitha kartelat e gjuhëve në një kartelë të vetme, `assets/javascripts/tiptap_highlight.js`. Kjo kartelë është e përfshirë në depozitë tashmë e ndërtuar, prandaj instalimi i shtojcës nuk kërkon ndërtim. Ju duhet ta ndërtoni vetëm kur ndryshoni grupin e gjuhëve.
- Redmine e ngarkon `tiptap_highlight.js` në çdo faqe, para përpunuesit (`tiptap_bundle.js`). Gjatë ngarkimit përpunuesi i regjistron të gjitha gjuhët nga ajo kartelë.
- Në përpunues një bllok theksohet sërish 50 ms pasi të ndaloni së shkruari, dhe vetëm blloku që ka ndryshuar. Në faqet e ruajtura një bllok theksohet kur vjen në pamje gjatë rrëshqitjes. Një bllok brenda një seksioni të palosur theksohet kur seksioni hapet.
- Gjuha ruhet në kodin HTML të ruajtur: `<pre><code class="language-<id>">`. Prandaj fusha `id` e një gjuhe nuk duhet të ndryshojë kurrë: blloqet e ruajtura me `id` të vjetër do të kthehen në tekst të thjeshtë.
- Nuk ka zbulim automatik të gjuhës: një bllok pa gjuhë shfaqet si tekst i thjeshtë. Njëlloj shfaqet edhe një bllok, gjuha e të cilit nuk është te `highlight/` (për shembull, kartela e gjuhës është fshirë); etiketa e tij vazhdon të shfaqë vlerën `id`. Nëse kartela e gjuhës kthehet, kthehen edhe ngjyrat.
- Ngjyrat. highlight.js e shënon tekstin me klasa si `hljs-keyword`, `hljs-string`, `hljs-comment`. Ngjyrat e tyre caktohen në `assets/stylesheets/src/06_code.css`, duke përdorur paletën e theksimit të sintaksës së vetë Redmine-it.

## Kartela e gjuhës

Për shembull, `routeros.js`:

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

| Fusha | E detyrueshme | Çfarë është |
|---|---|---|
| `id` | po | Emri i gjuhës në kodin HTML të ruajtur (`class="language-<id>"`). Karakteret e lejuara: `a-z`, `0-9`, `-`, `_`. **Mos e ndryshoni kurrë** pasi të jenë ruajtur blloqe me këtë gjuhë. |
| `label` | jo | Emri në listën e gjuhëve dhe në etiketën e bllokut. Si parazgjedhje merret `id`. |
| `hint` | jo | Shënim gri pranë emrit në listë. |
| `keywords` | jo | Fjalë shtesë për kërkimin në listë, të ndara me hapësirë. |
| `grammar` | po | Një gramatikë e highlight.js: një funksion `(hljs) => language definition`. |

`label`, `hint` dhe `keywords` janë në anglisht. Për ta shfaqur një gjuhë me një emër tjetër në gjuhën e ndërfaqes së një përdoruesi, ose për ta bërë të gjendet me fjalë të asaj gjuhe, shtoni një hyrje në kartelën e përkthimit të asaj gjuhe, `config/locales/<code>.yml`, nën `code_languages:`. Fjalët e shtuara aty i shtohen fushës `keywords`; `label` dhe `hint` zëvendësojnë ato të kartelës së gjuhës. `config/locales/ru.yml` ka shembuj, rregullat janë në [config/locales/README.md](../../config/locales/README.md).

Llojet e kartelave në dosje:

- **E shkurtër.** Një referencë për një gramatikë nga paketa npm e highlight.js, si në shembullin më sipër; shumica e gjuhëve janë të tilla. Gramatika vjen nga versioni i highlight.js i regjistruar në `package-lock.json` të shtojcës.
- **Kopje e plotë.** Kodi i gramatikës është në vetë kartelën dhe mund të përpunohet. Këto kartela krijohen nga skripti i konvertimit (shihni më poshtë).
- **Gramatikë vetjake.** `log.js`, `journalctl.js`, `cisco-ios.js`; pjesët e tyre të përbashkëta janë në `_common.js`.
- **Mbështjellës.** Një gramatikë e gatshme nën një emër tjetër: `cmd.js` është `dos` nga highlight.js, `docker-compose.js` është `yaml`.

Kartelat dhe dosjet, emrat e të cilave fillojnë me `_`, nuk janë gjuhë:

- `_compile.sh` i ndërton gjuhët;
- `_check.mjs` i kontrollon gjuhët gjatë ndërtimit;
- `_common.js` përmban pjesët e përbashkëta të gramatikave vetjake të shtojcës;
- `_convert_grammar.py` është skripti që konverton gramatikat e highlight.js (shihni më poshtë);
- `_vendor/` përmban kartelat që importohen nga gramatikat e konvertuara (krijohet nga skripti i konvertimit).

Dosja `README/` përmban këtë dokumentacion.

## Shtimi i një gjuhe nga highlight.js

Gramatikat e gatshme (më shumë se 190) ndodhen këtu: https://github.com/highlightjs/highlight.js/tree/main/src/languages. Emrat dhe pseudonimet e tyre janë renditur në [SUPPORTED_LANGUAGES.md](https://github.com/highlightjs/highlight.js/blob/main/SUPPORTED_LANGUAGES.md), së bashku me rreth njëqind gramatika të palëve të treta që mbahen në depozita të veçanta. Skripti `_convert_grammar.py` në këtë dosje konverton cilëndo prej tyre në formatin e shtojcës.

Skripti kërkon Python 3.6+ (pa paketa shtesë) dhe qasje te github.com. Ekzekutojeni nga dosja e shtojcës:

```sh
cd /path/to/redmine/plugins/redmine_tiptap
python3 highlight/_convert_grammar.py erlang
sh highlight/_compile.sh
```

Argumenti `erlang` është emri i kartelës në `src/languages` pa `.js`. Komanda e dytë i ndërton gjuhët dhe i kontrollon. Pastaj rinisni Redmine-in (shihni [Ndërtimi dhe vënia në përdorim](#ndërtimi-dhe-vënia-në-përdorim)). Në Windows përdorni `py` ose `python` në vend të `python3`.

Shembuj:

```sh
# lista e gjuhëve të highlight.js (* = tashmë në highlight/), e filtruar opsionalisht me një fjalë
python3 highlight/_convert_grammar.py --list
python3 highlight/_convert_grammar.py --list sql

# disa gjuhë njëherësh
python3 highlight/_convert_grammar.py erlang nix fsharp

# emër, shënim dhe fjalë kërkimi të veta (një gjuhë çdo herë)
python3 highlight/_convert_grammar.py erlang --label "Erlang/OTP" --hint BEAM --keywords "erl otp"

# zëvendësoni një kartelë të shkurtër që vjen me shtojcën me një kopje të plotë që mund të përpunohet
python3 highlight/_convert_grammar.py routeros --force --label RouterOS --hint MikroTik --keywords mikrotik

# një gjuhë që nuk është ende në një version të botuar të highlight.js, nga dega e zhvillimit
python3 highlight/_convert_grammar.py odin --ref main

# një lidhje me një kartelë gramatike, drejt nga shiriti i adresës së shfletuesit
python3 highlight/_convert_grammar.py https://github.com/highlightjs/highlight.js/blob/main/src/languages/odin.js

# një gramatikë e palës së tretë: një lidhje me depozitën e saj, skripti e gjen vetë kartelën e gramatikës
python3 highlight/_convert_grammar.py https://github.com/highlightjs/highlightjs-terraform

# një kartelë gramatike lokale
python3 highlight/_convert_grammar.py ~/grammars/mylang.js --id mylang

# një kartelë e shkurtër që referon paketën npm në vend të një kopjeje të kodit
python3 highlight/_convert_grammar.py erlang --npm

# tregon çfarë do të bëhej, pa ndryshuar asgjë
python3 highlight/_convert_grammar.py erlang --dry-run
```

### Çfarë bën skripti

1. Shkarkon `src/languages/<name>.js` të versionit të highlight.js mbi të cilin punon shtojca. Versioni lexohet nga `package-lock.json` (aktualisht 11.12.0), sepse gramatikat shkruhen për motorin e versionit të tyre. `--ref` zgjedh një version, degë ose commit tjetër.
2. Merr emrin e gjuhës nga rreshti `Language:` në kreun e gramatikës dhe fjalët e kërkimit nga pseudonimet e saj (`aliases`). Vlera `id` është emri i kartelës së gramatikës.
3. Vendos kodin e gramatikës në `highlight/<id>.js` të pandryshuar, përveç eksportit: `export default function(hljs)` bëhet `function grammar(hljs)`, dhe objekti i gjuhës `export default { id, label, keywords, grammar }` shtohet në fund të kartelës. Nëse gramatika është modul CommonJS (`module.exports = ...`), në krye shtohet një rresht që deklaron `module` dhe `exports`.
4. Nëse gramatika importon kartela të tjera, i shkarkon ato në `highlight/_vendor/<source>-<version>/` me të njëjtat shtigje si në depozitë dhe i drejton importet atje. Për shembull, `typescript` importon `javascript.js` dhe `lib/ecmascript.js`. Këto kartela ndahen nga të gjitha gjuhët e të njëjtit burim dhe version; nuk ka nevojë t'i përpunoni.
5. Kontrollon rreshtin `Requires:`, që rendit gjuhët e përdorura për kodin e ngulitur (për shembull, `php-template` ka nevojë për `xml` dhe `php`). Nëse ato nuk janë në `highlight/`, shfaq komandën që i shton. Pa to kodi i ngulitur thjesht mbetet pa ngjyra; kjo nuk është gabim.
6. Nuk i mbishkruan kartelat ekzistuese pa `--force` dhe nuk pranon një `id` që e përdor tashmë një kartelë tjetër.

Pas konvertimit gjuha mund të përpunohet drejtpërdrejt në kartelën e saj.

### Opsionet

| Opsioni | Çfarë bën |
|---|---|
| `LANGUAGE ...` | Emri i një gjuhe të highlight.js, një lidhje me një kartelë gramatike ose me një depozitë gramatike të palës së tretë në GitHub, ose shtegu i një kartele lokale `.js`. |
| `--ref REF` | Versioni (tag) i highlight.js, dega ose commit-i. Si parazgjedhje është versioni në `package-lock.json`. Për lidhjet versioni merret nga lidhja. |
| `--id ID` | Identifikuesi `id` i gjuhës. Si parazgjedhje është emri i kartelës së gramatikës. |
| `--label TEXT` | Emri në listë dhe në etiketë. Si parazgjedhje është `Language:` nga gramatika. |
| `--hint TEXT` | Shënim gri në listë. |
| `--keywords TEXT` | Fjalë kërkimi të ndara me hapësirë. Si parazgjedhje: pseudonimet e gramatikës. |
| `--npm` | Në vend të një kopjeje të kodit, shkruan një kartelë të shkurtër që referon paketën npm highlight.js. Vetëm për gjuhët e vetë highlight.js. |
| `--force` | Zëvendëson kartelat ekzistuese. |
| `--dry-run` | Tregon çfarë do të bëhej, pa ndryshuar asgjë. |
| `--list [WORD]` | Liston gjuhët e highlight.js dhe gramatikat e palëve të treta, të filtruara opsionalisht me një fjalë. |
| `--prune` | Fshin kartelat në `_vendor/` që nuk i importon më asnjë gjuhë. |


**Kopje apo `--npm`?** Një kopje i tregon rregullat drejtpërdrejt në vetë kartelën: mund t'i përpunoni, mund të merrni një gramatikë më të re se paketa e instaluar, ose një gramatikë të palës së tretë. Një kopje nuk ndryshon kur shtojca përditëson highlight.js; për ta rifreskuar, konvertoni gjuhën sërish me `--force`. Një kartelë e krijuar me `--npm` është disa rreshta e gjatë, dhe gramatika e saj përditësohet bashkë me shtojcën.

## Ndërtimi dhe vënia në përdorim

```sh
sh highlight/_compile.sh
```

- Ka nevojë për Docker (ndërtimi ekzekutohet në një kontejner `node:20-alpine`) ose, nëse nuk ka Docker, për Node.js 18+ në të njëjtën makinë. Në ekzekutimin e parë skripti instalon paketat npm në dosjen `node_modules/` të shtojcës.
- Fillimisht skripti kontrollon çdo gjuhë: e ndërton veçmas, e ngarkon, e regjistron në të njëjtin motor që punon në shfletues dhe thekson një tekst shembull. Nëse një gjuhë është e prishur (gabim në kod, shprehje e rregullt e pavlefshme, një `id` tashmë i zënë), skripti tregon kartelën dhe shkakun dhe ndalon; kartela e mëparshme `tiptap_highlight.js` mbetet në vend.
- Pastaj skripti i paketon të gjitha gjuhët në `assets/javascripts/tiptap_highlight.js`.

Pas ndërtimit, rinisni Redmine-in: ai i publikon kartelat e shtojcës gjatë nisjes (shihni «Përditësimi» te [README kryesor](../../docs/README.sq.md#përditësimi) për komandat). Shfletuesit e marrin kartelën e re menjëherë, sepse URL-ja e saj përmban një gjurmë gishti të përmbajtjes.

Nëse serveri i Redmine-it nuk ka as Docker, as Node.js, ndërtoni në çdo makinë që ka njërin prej tyre (mjafton një kopje e dosjes së shtojcës) dhe vendosni në server kartelën e përftuar `assets/javascripts/tiptap_highlight.js`.

## Heqja e një gjuhe

Fshini kartelën e gjuhës nga `highlight/`, ndërtoni dhe rinisni Redmine-in. Blloqet e ruajtura në këtë gjuhë mbeten siç janë dhe shfaqen si tekst i thjeshtë. Kartelat në `_vendor/` që nuk nevojiten më hiqen me:

```sh
python3 highlight/_convert_grammar.py --prune
```

## Gramatikat vetjake dhe rregullat e përpunimit

- Një gramatikë është një funksion që merr objektin `hljs` dhe kthen një përkufizim gjuhe: cilat pjesë teksti të shënohen dhe si. Udhëzues: https://highlightjs.readthedocs.io/en/latest/language-guide.html, referencë: https://highlightjs.readthedocs.io/en/latest/mode-reference.html. Shembuj: `log.js`, `journalctl.js`, `cisco-ios.js`.
- highlight.js i bashkon shprehjet e rregullta të të gjitha rregullave të një gjuhe në një të vetme dhe i injoron flamujt e tyre. Prandaj përputhja pa dallim shkronjash të mëdha e të vogla duhet shkruar shprehimisht (`[Ee]rror`) ose të aktivizohet për gjithë gjuhën me `case_insensitive: true`.
- Preferoni klasat standarde të tokenëve (`keyword`, `string`, `number`, `comment`, `title`, `attr`, `variable`, `built_in`, `literal`, `meta`, `symbol`, `type` e kështu me radhë): ato kanë tashmë ngjyra. Një klasë e juaj (për shembull, `scope: 'log-error'` prodhon klasën `hljs-log-error`) ka nevojë për një rregull në `assets/stylesheets/src/06_code.css` dhe për një rindërtim të CSS (`assets/stylesheets/src/_build.sh`).
- Për ta ofruar një gramatikë të gatshme nën një emër tjetër, bëni si `cmd.js`: thirrni gramatikën origjinale dhe ndryshoni `name` dhe `aliases` në rezultatin e saj. Nëse pseudonimet nuk zëvendësohen, gjuha e re i merr ato nga origjinali.

## Përditësimi i shtojcës kur keni shtuar gjuhë

git nuk i prek kartelat tuaja në `highlight/`. Por `assets/javascripts/tiptap_highlight.js` në versionin e ri të shtojcës është ndërtuar pa gjuhët tuaja, dhe ndërtimi juaj i kësaj kartele i vë pengesë `git pull`. Prandaj:

```sh
cd /path/to/redmine/plugins/redmine_tiptap
git checkout -- assets/javascripts/tiptap_highlight.js
git pull
sh highlight/_compile.sh
```

Komanda e parë e hedh tej ndërtimin tuaj, e fundit i ndërton gjuhët sërish, përfshirë gjuhët tuaja. Pastaj rinisni Redmine-in. Nëse keni përpunuar kartela gjuhësh që vijnë me shtojcën, git mund t'ju kërkojë të zgjidhni konflikte në to.

Nëse shtojca është instaluar nga një arkiv, ruani kartelat tuaja të gjuhëve dhe dosjen `_vendor/` para se të zëvendësoni dosjen e shtojcës, vendosini përsëri pas kësaj dhe ndërtoni gjuhët.

## Madhësia

Të gjitha gjuhët paketohen në një kartelë të vetme; shfletuesi e shkarkon një herë dhe pastaj e merr nga fshehtina. Aktualisht ajo është 226 KB për 52 gjuhë. Shumica e gjuhëve zënë 1–10 KB, më e madhja është 1C (55 KB).
