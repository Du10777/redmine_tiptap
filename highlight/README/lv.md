# Sintakses izcelšana: valodas

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

> *Šis tulkojums ir izveidots ar mākslīgā intelekta modeļa palīdzību, un to nav pārbaudījis dzimtās valodas runātājs. Ja atrodat kļūdu, lūdzu, [atveriet issue vai pull request](https://github.com/Du10777/redmine_tiptap).*

Koda bloki tiek izcelti gan redaktorā, gan saglabātajās lapās (uzdevumos, piezīmēs, viki), un abās vietās tie izskatās vienādi. Bloka valodu izvēlas no nozīmītes tā augšējā labajā stūrī. Valodu sarakstu nosaka faili mapē `highlight/`: viens fails ir viena valoda.

Spraudnis tiek piegādāts ar 52 valodām. Varat pievienot vēl: pārveidojiet gatavu highlight.js gramatiku ar skriptu (skatiet [Valodas pievienošana no highlight.js](#valodas-pievienošana-no-highlightjs)) vai uzrakstiet savu.

## Kā tas darbojas

- Izcelšanu veic [highlight.js](https://highlightjs.org) (caur [lowlight](https://github.com/wooorm/lowlight)). Redaktors un saglabātās lapas izmanto vienu un to pašu dzinēju, tāpēc krāsas sakrīt.
- `_compile.sh` apvieno visus valodu failus vienā failā `assets/javascripts/tiptap_highlight.js`. Šis fails repozitorijā ir ievietots jau uzbūvētā veidā, tāpēc spraudņa instalēšanai būvēšana nav vajadzīga. Tas jāuzbūvē tikai tad, ja mainiet valodu kopu.
- Redmine ielādē `tiptap_highlight.js` katrā lapā pirms redaktora (`tiptap_bundle.js`). Ielādes brīdī redaktors reģistrē visas valodas no šī faila.
- Redaktorā bloks tiek izcelts atkārtoti 50 ms pēc tam, kad pārtraucat rakstīt, turklāt tikai tas bloks, kas mainījies. Saglabātajās lapās bloks tiek izcelts, kad ritināšanas laikā nonāk redzamajā apgabalā. Bloks sakļautā sadaļā tiek izcelts, kad sadaļa tiek atvērta.
- Valoda tiek glabāta saglabātajā HTML: `<pre><code class="language-<id>">`. Tāpēc valodas `id` nekad nedrīkst mainīt: ar veco `id` saglabātie bloki pārvērstos par vienkāršu tekstu.
- Automātiskas valodas noteikšanas nav: bloks bez valodas tiek rādīts kā vienkāršs teksts. Tāpat tiek rādīts bloks, kura valodas nav mapē `highlight/` (piemēram, valodas fails tika izdzēsts); tā nozīmīte turpina rādīt `id`. Ja valodas fails atgriežas, atgriežas arī krāsas.
- Krāsas. highlight.js iezīmē tekstu ar klasēm, piemēram, `hljs-keyword`, `hljs-string`, `hljs-comment`. To krāsas ir iestatītas failā `assets/stylesheets/src/06_code.css`, izmantojot paša Redmine sintakses izcelšanas paleti.

## Valodas fails

Piemēram, `routeros.js`:

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

| Lauks | Obligāts | Kas tas ir |
|---|---|---|
| `id` | jā | Valodas nosaukums saglabātajā HTML (`class="language-<id>"`). Atļautās rakstzīmes: `a-z`, `0-9`, `-`, `_`. **Nekad to nemainiet** pēc tam, kad bloki ar šo valodu ir saglabāti. |
| `label` | nē | Nosaukums valodu sarakstā un bloka nozīmītē. Pēc noklusējuma — `id`. |
| `hint` | nē | Pelēka norāde blakus nosaukumam sarakstā. |
| `keywords` | nē | Papildu vārdi saraksta meklēšanai, atdalīti ar atstarpēm. |
| `grammar` | jā | highlight.js gramatika: funkcija `(hljs) => language definition`. |

`label`, `hint` un `keywords` ir angļu valodā. Lai valodu lietotāja saskarnes valodā parādītu ar citu nosaukumu vai lai to varētu atrast pēc vārdiem šajā saskarnes valodā, pievienojiet ierakstu saskarnes valodas tulkojuma failam `config/locales/<code>.yml` sadaļā `code_languages:`. Tur norādītie vārdi tiek pievienoti `keywords`; `label` un `hint` aizstāj tos, kas ir valodas failā. Piemēri ir failā `config/locales/ru.yml`, noteikumi — [config/locales/README.md](../../config/locales/README.md).

Failu veidi mapē:

- **Īsais.** Atsauce uz gramatiku no highlight.js npm pakotnes, kā iepriekš minētajā piemērā; tādas ir lielākā daļa valodu. Gramatika tiek ņemta no highlight.js versijas, kas ierakstīta spraudņa `package-lock.json`.
- **Pilna kopija.** Gramatikas kods atrodas pašā failā, un to var rediģēt. Šādus failus izveido pārveidošanas skripts (skatiet tālāk).
- **Sava gramatika.** `log.js`, `journalctl.js`, `cisco-ios.js`; to kopīgās daļas atrodas `_common.js`.
- **Apvalks.** Gatava gramatika ar citu nosaukumu: `cmd.js` ir highlight.js `dos`, `docker-compose.js` ir `yaml`.

Faili un mapes, kuru nosaukumi sākas ar `_`, nav valodas:

- `_compile.sh` būvē valodas;
- `_check.mjs` būvēšanas laikā pārbauda valodas;
- `_common.js` satur spraudņa paša gramatiku kopīgās daļas;
- `_convert_grammar.py` ir skripts, kas pārveido highlight.js gramatikas (skatiet tālāk);
- `_vendor/` satur failus, ko importē pārveidotās gramatikas (izveido pārveidošanas skripts).

Mapē `README/` atrodas šī dokumentācija.

## Valodas pievienošana no highlight.js

Gatavās gramatikas (vairāk nekā 190) atrodas šeit: https://github.com/highlightjs/highlight.js/tree/main/src/languages. To nosaukumi un aizstājvārdi ir uzskaitīti failā [SUPPORTED_LANGUAGES.md](https://github.com/highlightjs/highlight.js/blob/main/SUPPORTED_LANGUAGES.md), kopā ar apmēram simts trešo pušu gramatikām, kas glabājas atsevišķos repozitorijos. Skripts `_convert_grammar.py` šajā mapē pārveido jebkuru no tām spraudņa formātā.

Skriptam ir vajadzīgs Python 3.6+ (bez papildu pakotnēm) un piekļuve github.com. Palaidiet to no spraudņa mapes:

```sh
cd /path/to/redmine/plugins/redmine_tiptap
python3 highlight/_convert_grammar.py erlang
sh highlight/_compile.sh
```

Arguments `erlang` ir faila nosaukums mapē `src/languages` bez `.js`. Otrā komanda uzbūvē valodas un pārbauda tās. Pēc tam pārstartējiet Redmine (skatiet [Būvēšana un piemērošana](#būvēšana-un-piemērošana)). Windows vidē `python3` vietā izmantojiet `py` vai `python`.

Piemēri:

```sh
# highlight.js valodu saraksts (* = jau ir mapē highlight/), pēc izvēles filtrēts pēc vārda
python3 highlight/_convert_grammar.py --list
python3 highlight/_convert_grammar.py --list sql

# vairākas valodas uzreiz
python3 highlight/_convert_grammar.py erlang nix fsharp

# savs nosaukums, norāde un meklēšanas vārdi (vienlaikus tikai vienai valodai)
python3 highlight/_convert_grammar.py erlang --label "Erlang/OTP" --hint BEAM --keywords "erl otp"

# aizstāt kopā ar spraudni piegādāto īso failu ar rediģējamu pilno kopiju
python3 highlight/_convert_grammar.py routeros --force --label RouterOS --hint MikroTik --keywords mikrotik

# valoda, kuras vēl nav izlaistajā highlight.js versijā, no izstrādes zara
python3 highlight/_convert_grammar.py odin --ref main

# saite uz gramatikas failu, tieši no pārlūkprogrammas adreses joslas
python3 highlight/_convert_grammar.py https://github.com/highlightjs/highlight.js/blob/main/src/languages/odin.js

# trešās puses gramatika: saite uz tās repozitoriju, gramatikas failu skripts atrod pats
python3 highlight/_convert_grammar.py https://github.com/highlightjs/highlightjs-terraform

# lokāls gramatikas fails
python3 highlight/_convert_grammar.py ~/grammars/mylang.js --id mylang

# īss fails, kas atsaucas uz npm pakotni, nevis koda kopija
python3 highlight/_convert_grammar.py erlang --npm

# parādīt, kas tiktu darīts, neko nemainot
python3 highlight/_convert_grammar.py erlang --dry-run
```

### Ko dara skripts

1. Lejupielādē `src/languages/<name>.js` no tās highlight.js versijas, ar kuru darbojas spraudnis. Versija tiek nolasīta no `package-lock.json` (pašlaik 11.12.0), jo gramatikas tiek rakstītas savas versijas dzinējam. `--ref` izvēlas citu versiju, zaru vai commit.
2. Valodas nosaukumu ņem no gramatikas galvenes rindas `Language:`, bet meklēšanas vārdus — no tās aizstājvārdiem (`aliases`). `id` ir gramatikas faila nosaukums.
3. Ievieto gramatikas kodu failā `highlight/<id>.js` nemainītu, izņemot eksportu: `export default function(hljs)` kļūst par `function grammar(hljs)`, un faila beigās tiek pievienots valodas objekts `export default { id, label, keywords, grammar }`. Ja gramatika ir CommonJS modulis (`module.exports = ...`), faila sākumā tiek pievienota rinda, kas deklarē `module` un `exports`.
4. Ja gramatika importē citus failus, lejupielādē tos mapē `highlight/_vendor/<source>-<version>/` ar tādiem pašiem ceļiem kā repozitorijā un novirza importus uz turieni. Piemēram, `typescript` importē `javascript.js` un `lib/ecmascript.js`. Šos failus kopīgi izmanto visas valodas no tā paša avota un tās pašas versijas; tos nav jārediģē.
5. Pārbauda rindu `Requires:`, kurā uzskaitītas valodas, ko izmanto iegultajam kodam (piemēram, `php-template` ir vajadzīgas `xml` un `php`). Ja to nav mapē `highlight/`, izdrukā komandu, ar kuru tās var pievienot. Bez tām iegultais kods vienkārši paliek bez krāsām; tā nav kļūda.
6. Bez `--force` nepārraksta esošos failus un neizmanto `id`, ko jau lieto cits fails.

Pēc pārveidošanas valodu var rediģēt tieši tās failā.

### Opcijas

| Opcija | Ko tā dara |
|---|---|
| `LANGUAGE ...` | highlight.js valodas nosaukums, saite uz gramatikas failu vai uz trešās puses gramatikas repozitoriju vietnē GitHub, vai ceļš uz lokālu `.js` failu. |
| `--ref REF` | highlight.js versija (tags), zars vai commit. Pēc noklusējuma — versija no `package-lock.json`. Saitēm versija tiek ņemta no pašas saites. |
| `--id ID` | Valodas `id`. Pēc noklusējuma — gramatikas faila nosaukums. |
| `--label TEXT` | Nosaukums sarakstā un nozīmītē. Pēc noklusējuma — `Language:` no gramatikas. |
| `--hint TEXT` | Pelēka norāde sarakstā. |
| `--keywords TEXT` | Ar atstarpēm atdalīti meklēšanas vārdi. Pēc noklusējuma — gramatikas aizstājvārdi. |
| `--npm` | Koda kopijas vietā ieraksta īsu failu ar atsauci uz highlight.js npm pakotni. Tikai pašas highlight.js valodām. |
| `--force` | Aizstāj esošos failus. |
| `--dry-run` | Parāda, kas tiktu darīts, neko nemainot. |
| `--list [WORD]` | Parāda highlight.js valodu un trešo pušu gramatiku sarakstu, pēc izvēles filtrētu pēc vārda. |
| `--prune` | Dzēš failus mapē `_vendor/`, ko vairs neimportē neviena valoda. |


**Kopija vai `--npm`?** Kopija rāda noteikumus tieši failā: tos var rediģēt, var ņemt gramatiku, kas jaunāka par instalēto pakotni, vai trešās puses gramatiku. Kopija nemainās, kad spraudnis jaunina highlight.js; lai to atsvaidzinātu, pārveidojiet valodu vēlreiz ar `--force`. Fails, kas izveidots ar `--npm`, ir dažu rindu garš, un tā gramatika tiek jaunināta kopā ar spraudni.

## Būvēšana un piemērošana

```sh
sh highlight/_compile.sh
```

- Tam ir vajadzīgs Docker (būvēšana notiek `node:20-alpine` konteinerā) vai, ja Docker nav, Node.js 18+ tajā pašā datorā. Pirmajā palaišanas reizē skripts instalē npm pakotnes spraudņa mapē `node_modules/`.
- Vispirms skripts pārbauda katru valodu: uzbūvē to atsevišķi, ielādē, reģistrē tajā pašā dzinējā, kas darbojas pārlūkprogrammā, un izceļ parauga tekstu. Ja valoda ir bojāta (kļūda kodā, nederīga regulārā izteiksme, jau aizņemts `id`), skripts nosauc failu un iemeslu un apstājas; iepriekšējais `tiptap_highlight.js` paliek savā vietā.
- Pēc tam skripts apvieno visas valodas failā `assets/javascripts/tiptap_highlight.js`.

Pēc būvēšanas pārstartējiet Redmine: tas spraudņu failus publicē startēšanas laikā (komandas skatiet sadaļā „Atjaunināšana“ [galvenajā README](../../docs/README.lv.md#atjaunināšana)). Pārlūkprogrammas jauno failu saņem uzreiz, jo tā URL satur satura pirkstu nospiedumu.

Ja Redmine serverī nav ne Docker, ne Node.js, būvējiet jebkurā datorā, kur ir viens no tiem (pietiek ar spraudņa mapes kopiju), un iegūto `assets/javascripts/tiptap_highlight.js` ievietojiet serverī.

## Valodas noņemšana

Izdzēsiet valodas failu no `highlight/`, uzbūvējiet un pārstartējiet Redmine. Saglabātie bloki šajā valodā paliek tādi, kādi tie ir, un tiek rādīti kā vienkāršs teksts. Faili mapē `_vendor/`, kas vairs nav vajadzīgi, tiek noņemti ar:

```sh
python3 highlight/_convert_grammar.py --prune
```

## Savas gramatikas un noteikumu rediģēšana

- Gramatika ir funkcija, kas saņem objektu `hljs` un atgriež valodas definīciju: kurus teksta gabalus iezīmēt un kā. Ceļvedis: https://highlightjs.readthedocs.io/en/latest/language-guide.html, uzziņa: https://highlightjs.readthedocs.io/en/latest/mode-reference.html. Piemēri: `log.js`, `journalctl.js`, `cisco-ios.js`.
- highlight.js apvieno visu valodas noteikumu regulārās izteiksmes vienā un ignorē to pašu karodziņus. Tāpēc atbilstība neatkarīgi no reģistra ir jāieraksta skaidri (`[Ee]rror`) vai jāieslēdz visai valodai ar `case_insensitive: true`.
- Dodiet priekšroku standarta marķieru klasēm (`keyword`, `string`, `number`, `comment`, `title`, `attr`, `variable`, `built_in`, `literal`, `meta`, `symbol`, `type` un tā tālāk): tām jau ir krāsas. Savai klasei (piemēram, `scope: 'log-error'` rada klasi `hljs-log-error`) ir vajadzīgs noteikums failā `assets/stylesheets/src/06_code.css` un CSS pārbūvēšana (`assets/stylesheets/src/_build.sh`).
- Lai piedāvātu gatavu gramatiku ar citu nosaukumu, rīkojieties tāpat kā `cmd.js`: izsauciet oriģinālo gramatiku un nomainiet `name` un `aliases` tās rezultātā. Ja aizstājvārdi netiek nomainīti, jaunā valoda pārņem tos no oriģināla.

## Spraudņa atjaunināšana, ja esat pievienojuši valodas

git neskar jūsu failus mapē `highlight/`. Taču `assets/javascripts/tiptap_highlight.js` jaunajā spraudņa versijā ir uzbūvēts bez jūsu valodām, un jūsu šī faila būvējums traucē `git pull`. Tāpēc:

```sh
cd /path/to/redmine/plugins/redmine_tiptap
git checkout -- assets/javascripts/tiptap_highlight.js
git pull
sh highlight/_compile.sh
```

Pirmā komanda atmet jūsu būvējumu, pēdējā uzbūvē valodas vēlreiz, ieskaitot jūsu valodas. Pēc tam pārstartējiet Redmine. Ja esat rediģējuši kopā ar spraudni piegādātos valodu failus, git var lūgt atrisināt konfliktus tajos.

Ja spraudnis tika instalēts no arhīva, pirms spraudņa mapes nomaiņas saglabājiet savus valodu failus un mapi `_vendor/`, pēc tam ievietojiet tos atpakaļ un uzbūvējiet valodas.

## Izmērs

Visas valodas tiek apvienotas vienā failā; pārlūkprogramma to lejupielādē vienreiz un pēc tam ņem no kešatmiņas. Pašlaik tas ir 226 KB 52 valodām. Lielākā daļa valodu aizņem 1–10 KB, lielākā ir 1C (55 KB).
