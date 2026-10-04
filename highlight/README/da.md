# Syntax highlighting: languages

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

> *Denne oversættelse blev lavet med hjælp fra en AI-model og er ikke blevet gennemset af en modersmålstaler. Hvis du finder en fejl, bedes du [åbne et issue eller en pull request](https://github.com/Du10777/redmine_tiptap).*

Kodeblokke markeres både i editoren og på gemte sider (sager, noter, wiki), og de ser ens ud på begge. Sproget i en blok vælges fra badgene i dens øverste højre hjørne. Listen over sprog defineres af filerne i mappen `highlight/`: en fil er et sprog.

Plugin'et leveres med 52 sprog. Du kan tilføje mere: konverter en klar highlight.js-grammatik med et script (se [Tilføjelse af et sprog fra highlight.js](#adding-a-language-from-highlightjs)) eller skriv dit eget.

## How it works

- Markering udføres af [highlight.js](https://highlightjs.org) (gennem [lowlight](https://github.com/wooorm/lowlight)). Editoren og de gemte sider bruger samme motor, så farverne matcher.
- `_compile.sh` samler alle sprogfiler i en fil, `assets/javascripts/tiptap_highlight.js`. Denne fil er allerede bygget i arkivet, så installation af plugin'et kræver ikke build. Du skal kun bygge det, når du ændrer sættet af sprog.
- Redmine indlæser `tiptap_highlight.js` på hver side, før editoren (`tiptap_bundle.js`). Ved indlæsning registrerer editoren alle sprog fra den fil.
- I editoren gentegnes en blok 50 ms efter du holdt op med at skrive, og kun blokken der ændrede sig. På gemte sider tegnes en blok, når den ruller ind i synsfeltet. En blok inden for en kollapsibel sektion gentegnes, når sektionen åbnes.
- Sproget gemmes i den gemte HTML: `<pre><code class="language-<id>">`. Det er derfor, sprogets `id` aldrig må ændres: blokke gemt med den gamle `id` ville blive almindelig tekst.
- Der er ingen sproggenkendelse: en blok uden et sprog vises som almindelig tekst. Det gør også en blok, hvis sprog ikke er i `highlight/` (for eksempel blev sprogets fil slettet); dets badge holder på at vise `id`'et. Hvis sprogets fil kommer tilbage, det gør farverne også.
- Farver. highlight.js markerer tekst med klasser som `hljs-keyword`, `hljs-string`, `hljs-comment`. Deres farver indstilles i `assets/stylesheets/src/06_code.css`, ved brug af paletten af Redmines egen syntaksmarkering.

## Language file

For eksempel `routeros.js`:

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

| Felt | Påkrævet | Hvad det er |
|---|---|---|
| `id` | ja | Sproganavn i den gemte HTML (`class="language-<id>"`). Tilladte tegn: `a-z`, `0-9`, `-`, `_`. **Ændr det aldrig** en gang blokke med dette sprog er gemt. |
| `label` | nej | Navn i sproget liste og på blokbadge. Som standard til `id`. |
| `hint` | nej | Grå note ved siden af navnet på listen. |
| `keywords` | nej | Ekstra ord til listesøgning, mellemrum adskilt. |
| `grammar` | ja | En highlight.js-grammatik: en funktion `(hljs) => language definition`. |

`label`, `hint` og `keywords` er på engelsk. For at vise et sprog under et andet navn i brugerens grænsefladesprog, eller for at gøre det søgeligt med ord på det sprog, skal du tilføje en post til oversættelsesfilen for det sprog, `config/locales/<code>.yml`, under `code_languages:`. Ordene der tilføjes til `keywords`; `label` og `hint` erstatter dem fra sprogets fil. `config/locales/ru.yml` har eksempler, reglerne er i [config/locales/README.md](../../config/locales/README.md).

Slags af filer i mappen:

- **Kort.** En reference til en grammatik fra highlight.js npm-pakken, som i eksemplet ovenfor; de fleste sprog er sådan noget. Grammatikken kommer fra highlight.js-versionen registreret i plugin'ets `package-lock.json`.
- **Fuld kopi.** Grammatikkoden er i selve filen og kan redigeres. Disse filer oprettes af konverteringsskriptet (se nedenfor).
- **Egen grammatik.** `log.js`, `journalctl.js`, `cisco-ios.js`; deres fælles dele er i `_common.js`.
- **Indpakning.** En klar grammatik under et andet navn: `cmd.js` er `dos` fra highlight.js, `docker-compose.js` er `yaml`.

Filer og mapper hvis navne begynder med `_` er ikke sprog:

- `_compile.sh` bygger sproget;
- `_check.mjs` kontrollerer sproget under bygningen;
- `_common.js` holder delte dele af plugin'ets egne grammatikker;
- `_convert_grammar.py` er det script, der konverterer highlight.js-grammatikker (se nedenfor);
- `_vendor/` holder filer importeret af konverterede grammatikker (oprettet af konverteringsskriptet).

Mappen `README/` indeholder denne dokumentation.

## Adding a language from highlight.js

Klar grammatikker (mere end 190) er her: https://github.com/highlightjs/highlight.js/tree/main/src/languages. Deres navne og aliaser er angivet i [SUPPORTED_LANGUAGES.md](https://github.com/highlightjs/highlight.js/blob/main/SUPPORTED_LANGUAGES.md), sammen med omkring hundrede tredjepartsgrammatikker gemt i separate arkiver. Scriptet `_convert_grammar.py` i denne mappe konverterer enhver af dem til plugin'ets format.

Scriptet har brug for Python 3.6+ (ingen ekstra pakker) og adgang til github.com. Kør det fra plugin-mappen:

```sh
cd /path/to/redmine/plugins/redmine_tiptap
python3 highlight/_convert_grammar.py erlang
sh highlight/_compile.sh
```

Argumentet `erlang` er filnavnet i `src/languages` uden `.js`. Den anden kommando bygger sproget og kontrollerer det. Genstart derefter Redmine (se [Building and applying](#building-and-applying)). I Windows, brug `py` eller `python` i stedet for `python3`.

Eksempler:

```sh
# liste over highlight.js-sprog (* = allerede i highlight/), eventuelt filtreret efter et ord
python3 highlight/_convert_grammar.py --list
python3 highlight/_convert_grammar.py --list sql

# flere sprog på én gang
python3 highlight/_convert_grammar.py erlang nix fsharp

# eget navn, hint og søgeord (et sprog ad gangen)
python3 highlight/_convert_grammar.py erlang --label "Erlang/OTP" --hint BEAM --keywords "erl otp"

# Erstat en kort fil leveret med plugin'et med en redigerbar fuld kopi
python3 highlight/_convert_grammar.py routeros --force --label RouterOS --hint MikroTik --keywords mikrotik

# et sprog, der endnu ikke er i en frigivet highlight.js-version, fra udviklingsbranchen
python3 highlight/_convert_grammar.py odin --ref main

# et link til en grammatikfil, direkte fra browserens adresselinje
python3 highlight/_convert_grammar.py https://github.com/highlightjs/highlight.js/blob/main/src/languages/odin.js

# en tredjepartsgrammatik: et link til dens arkiv, scriptet finder grammatikfilen
python3 highlight/_convert_grammar.py https://github.com/highlightjs/highlightjs-terraform

# en lokal grammatikfil
python3 highlight/_convert_grammar.py ~/grammars/mylang.js --id mylang

# en kort fil der refererer til npm-pakken i stedet for en kopi af koden
python3 highlight/_convert_grammar.py erlang --npm

# vis hvad der ville blive gjort uden at ændre noget
python3 highlight/_convert_grammar.py erlang --dry-run
```

### What the script does

1. Downloader `src/languages/<name>.js` af highlight.js-versionen plugin'et kører på. Versionen læses fra `package-lock.json` (pt. 11.12.0), fordi grammatikker skrives til motorens version. `--ref` vælger en anden version, branch eller commit.
2. Tager sproganavn fra `Language:`-linjen i grammatiks header og søgeord fra dets aliaser (`aliases`). `id`'et er grammatiks filnavn.
3. Putter grammatikkoden i `highlight/<id>.js` uændret undtagen for eksporten: `export default function(hljs)` bliver `function grammar(hljs)`, og sprogets objekt `export default { id, label, keywords, grammar }` tilføjes i slutningen af filen. Hvis grammatikken er et CommonJS-modul (`module.exports = ...`), tilføjes en linje erklæring `module` og `exports` øverst i filen.
4. Hvis grammatikken importerer andre filer, downloader dem til `highlight/_vendor/<source>-<version>/` under de samme stier som i arkivet og peger importerne dertil. For eksempel importerer `typescript` `javascript.js` og `lib/ecmascript.js`. Disse filer deles af alle sprog fra samme kilde og version; der er ingen grund til at redigere dem.
5. Kontrollerer linjen `Requires:`, som lister de sprog, der bruges til indlejret kode (for eksempel skal `php-template` `xml` og `php`). Hvis de ikke er i `highlight/`, udskrives kommandoen, der tilføjer dem. Uden dem forbliver den indlejrede kode simpelthen ufarvet; dette er ikke en fejl.
6. Overskriver ikke eksisterende filer uden `--force` og tager ikke en `id`, der allerede bruges af en anden fil.

Efter konvertering kan sproget redigeres direkte i sin fil.

### Options

| Mulighed | Hvad det gør |
|---|---|
| `LANGUAGE ...` | Et highlight.js-sproganavn, et link til en grammatikfil eller en tredjepartsgrammatik arkiv på GitHub, eller en sti til en lokal `.js`-fil. |
| `--ref REF` | highlight.js-version (tag), branch eller commit. Som standard til versionen i `package-lock.json`. For links tages versionen fra linket. |
| `--id ID` | Sprogets `id`. Som standard til grammatiks filnavn. |
| `--label TEXT` | Navn på listen og badget. Som standard til `Language:` fra grammatikken. |
| `--hint TEXT` | Grå note på listen. |
| `--keywords TEXT` | Mellemrum-adskilt søgeord. Som standard: grammatikks aliaser. |
| `--npm` | I stedet for en kopi af koden, skriv en kort fil der refererer til highlight.js npm-pakken. Kun for highlight.js sprogs. |
| `--force` | Erstat eksisterende filer. |
| `--dry-run` | Vis hvad der ville blive gjort uden at ændre noget. |
| `--list [WORD]` | Liste highlight.js-sprog og tredjepartsgrammatikker, eventuelt filtreret efter et ord. |
| `--prune` | Slet filer i `_vendor/` som intet sprog importerer længere. |


**Kopier eller `--npm`?** En kopi viser reglerne direkte i filen: du kan redigere dem, tage en grammatik nyere end den installeret pakke, eller en tredjepartsgrammatik. En kopi ændrer sig ikke, når plugin'et opgraderes highlight.js; for at opdatere det skal du konvertere sproget igen med `--force`. En fil lavet med `--npm` er nogle få linjer lang, og dens grammatik opgraderes sammen med plugin'et.

## Building and applying

```sh
sh highlight/_compile.sh
```

- Det skal Docker (bygningen kører i en `node:20-alpine`-beholder) eller, hvis der er intet Docker, Node.js 18+ på samme maskine. På første kørslen installerer scriptet npm-pakker i plugin'ets `node_modules/`-mappe.
- Først kontrollerer scriptet hvert sprog: bygger det adskilt, indlæser det, registrerer det i samme motor, der kører i browseren, og fremhæver en eksempel-tekst. Hvis et sprog er ødelagt (en fejl i koden, et ugyldigt regulært udtryk, en `id`, der allerede er optaget), navngiver scriptet filen og årsagen og stopper; den tidligere `tiptap_highlight.js` forbliver på plads.
- Derefter samler scriptet alle sprog i `assets/javascripts/tiptap_highlight.js`.

Efter bygningen skal du genstarte Redmine: det publicerer plugin-filer ved opstart (se "Opdatering" i [hovedREADME](../../docs/README.da.md#updating) for kommandoerne). Browsere får den nye fil med det samme, fordi dens URL indeholder et fingeraftryk af indholdet.

Hvis Redmine-serveren hverken har Docker eller Node.js, skal du bygge på en maskine, der har det (en kopi af plugin-mappen er nok) og sætte den resulterende `assets/javascripts/tiptap_highlight.js` på serveren.

## Removing a language

Slet sprogets fil fra `highlight/`, bygge og genstart Redmine. Gemte blokke på dette sprog forbliver som de er og vises som almindelig tekst. Filer i `_vendor/`, der ikke længere er nødvendige, fjernes med:

```sh
python3 highlight/_convert_grammar.py --prune
```

## Own grammars and editing rules

- En grammatik er en funktion, der modtager objektet `hljs` og returnerer en sproges definition: hvilke stykker tekst der skal markeres og hvordan. Vejledning: https://highlightjs.readthedocs.io/en/latest/language-guide.html, reference: https://highlightjs.readthedocs.io/en/latest/mode-reference.html. Eksempler: `log.js`, `journalctl.js`, `cisco-ios.js`.
- highlight.js forbinder de regulære udtryk af alle regler på et sprog i en og ignorerer deres egne flag. Så store og små bogstaver-uafhængig matching skal staves (eller `[Ee]rror`) eller aktiveres til hele sproget med `case_insensitive: true`.
- Foretrække de standard-token-klasser (`keyword`, `string`, `number`, `comment`, `title`, `attr`, `variable`, `built_in`, `literal`, `meta`, `symbol`, `type` og så videre): de har allerede farver. En klasse af dine egne (for eksempel producerer `scope: 'log-error'` klassen `hljs-log-error`) kræver en regel i `assets/stylesheets/src/06_code.css` og et CSS-genbygg (`assets/stylesheets/src/_build.sh`).
- For at tilbyde en klar grammatik under et andet navn, skal du gøre som `cmd.js` gør: kald den oprindelige grammatik og ændre `name` og `aliases` i resultatet. Hvis aliaserne ikke erstattes, overtager det nye sprog dem fra originalen.

## Updating the plugin when you have added languages

git lader dine filer i `highlight/` alene. Men `assets/javascripts/tiptap_highlight.js` i den nye plugin-version er bygget uden dine sprog, og dit byg af denne fil kommer i vejen for `git pull`. Så:

```sh
cd /path/to/redmine/plugins/redmine_tiptap
git checkout -- assets/javascripts/tiptap_highlight.js
git pull
sh highlight/_compile.sh
```

Den første kommando kaster dit byg bort, den sidste bygger sproget igen, herunder dine. Genstart derefter Redmine. Hvis du har redigeret sprogets filer leveret med plugin'et, kan git spørge dig til at løse konflikter i dem.

Hvis plugin'et blev installeret fra et arkiv, skal du gemme dine sprogets filer og mappen `_vendor/` før du erstatter plugin-mappen, sætte dem tilbage bagefter og bygger sproget.

## Size

Alle sprog er samlet i en fil; browseren downloader den en gang og tager den derefter fra cachen. I øjeblikket er det 226 KB for 52 sprog. De fleste sprog tager 1–10 KB, det største er 1C (55 KB).
