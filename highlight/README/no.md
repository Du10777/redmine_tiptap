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

> *Denne oversettelsen ble gjort med hjelp fra en AI-modell og har ikke blitt gjennomgått av en morsmålstaler. Hvis du finner en feil, vennligst [åpne et issue eller en pull request](https://github.com/Du10777/redmine_tiptap).*

Kodeblokkjer fremheves både i editoren og på lagrede sider (sager, notater, wiki), og de ser like ut på begge. Språket i en blokk velges fra badgene i det øverste høyre hjørnet. Listen over språk er definert av filene i mappen `highlight/`: en fil er ett språk.

Programtillegget leveres med 52 språk. Du kan legge til mer: konverter en ferdig highlight.js-grammatikk med et skript (se [Adding a language from highlight.js](#adding-a-language-from-highlightjs)) eller skriv ditt eget.

## How it works

- Fremheving gjøres av [highlight.js](https://highlightjs.org) (gjennom [lowlight](https://github.com/wooorm/lowlight)). Editoren og de lagrede sidene bruker samme motor, så fargene stemmer overens.
- `_compile.sh` samler alle sprakfiler til en fil, `assets/javascripts/tiptap_highlight.js`. Denne filen er allerede bygget i arkivet, så installasjon av programtillegget krever ikke bygg. Du trenger bare å bygge det når du endrer settet av språk.
- Redmine laster `tiptap_highlight.js` på hver side, før editoren (`tiptap_bundle.js`). Ved lasting registrerer editoren alle språk fra den filen.
- I editoren tegnes en blokk på nytt 50 ms etter at du pauser skrivingen, og bare blokken som endret seg. På lagrede sider tegnes en blokk når den ruller inn i synsfeltet. En blokk innenfor en kollapsbar seksjon tegnes når seksjonen åpnes.
- Språket lagres i den lagrede HTML: `<pre><code class="language-<id>">`. Det er grunnen til at språkets `id` aldri må endres: blokker lagret med den gamle `id` ville bli til vanlig tekst.
- Det er ingen sproggjengjennelse: en blokk uten språk vises som vanlig tekst. Det gjør også en blokk hvis språk ikke er i `highlight/` (for eksempel ble sprogets fil slettet); badgene fortsetter å vise `id`'et. Hvis sprogets fil kommer tilbake, gjør fargene det også.
- Farger. highlight.js markerer tekst med klasser som `hljs-keyword`, `hljs-string`, `hljs-comment`. Fargene er satt i `assets/stylesheets/src/06_code.css`, ved hjelp av paletten av Redmines egen syntaksmarkering.

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

| Felt | Påkrevd | Hva det er |
|---|---|---|
| `id` | ja | Sproganavn i den lagrede HTML (`class="language-<id>"`). Tillatte tegn: `a-z`, `0-9`, `-`, `_`. **Endre det aldri** når en gang blokkjer med dette språket er lagret. |
| `label` | nei | Navn i språklisten og på blokk-badgeen. Som standard `id`. |
| `hint` | nei | Grå notat ved siden av navn på listen. |
| `keywords` | nei | Ekstra ord for listesoket, mellomromskilt. |
| `grammar` | ja | En highlight.js-grammatikk: en funksjon `(hljs) => language definition`. |

`label`, `hint` og `keywords` er på engelsk. For å vise et språk under et annet navn i brukerens grensesnittspråk, eller for å gjøre det søkbar med ord på det språket, legger du til en oppføring i oversettelsesnøkkelen for det språket, `config/locales/<code>.yml`, under `code_languages:`. Ordene der legges til `keywords`; `label` og `hint` erstatning av dem fra sprogets fil. `config/locales/ru.yml` har eksempler, reglene er i [config/locales/README.md](../../config/locales/README.md).

Typer filer i mappen:

- **Kort.** En referanse til en grammatikk fra highlight.js npm-pakken, som i eksemplet ovenfor; de fleste språk er sånn. Grammatikken kommer fra highlight.js-versjonen registrert i programtilleggets `package-lock.json`.
- **Full kopi.** Grammatikkoden er i filen selv og kan redigeres. Disse filene opprettes av konverteringsskriptet (se nedenfor).
- **Egen grammatikk.** `log.js`, `journalctl.js`, `cisco-ios.js`; delte deler av disse er i `_common.js`.
- **Omslag.** En ferdig grammatikk under et annet navn: `cmd.js` er `dos` fra highlight.js, `docker-compose.js` er `yaml`.

Filer og mapper hvis navn starter med `_` er ikke språk:

- `_compile.sh` bygger språkene;
- `_check.mjs` kontrollerer språkene under bygningen;
- `_common.js` inneholder delte deler av programtilleggets egne grammatikker;
- `_convert_grammar.py` er skriptet som konverterer highlight.js-grammatikker (se nedenfor);
- `_vendor/` inneholder filer importert av konverterte grammatikker (opprettet av konverteringsskriptet).

Mappen `README/` inneholder denne dokumentasjonen.

## Adding a language from highlight.js

Ferdig grammatikker (mer enn 190) er her: https://github.com/highlightjs/highlight.js/tree/main/src/languages. Navnene og aliasene deres er oppført i [SUPPORTED_LANGUAGES.md](https://github.com/highlightjs/highlight.js/blob/main/SUPPORTED_LANGUAGES.md), sammen med omkring hundre tredjepartsgrammatikker som oppbevares i separate arkiver. Skriptet `_convert_grammar.py` i denne mappen konverterer noen av dem til programtilleggets format.

Skriptet trenger Python 3.6+ (ingen ekstra pakker) og tilgang til github.com. Kjør det fra programtillegsmappen:

```sh
cd /path/to/redmine/plugins/redmine_tiptap
python3 highlight/_convert_grammar.py erlang
sh highlight/_compile.sh
```

Argumentet `erlang` er filnavnet i `src/languages` uten `.js`. Den andre kommandoen bygger språket og kontrollerer det. Start deretter Redmine på nytt (se [Building and applying](#building-and-applying)). I Windows bruker du `py` eller `python` i stedet for `python3`.

Eksempler:

```sh
# liste over highlight.js-språk (* = allerede i highlight/), eventuelt filtrert etter ord
python3 highlight/_convert_grammar.py --list
python3 highlight/_convert_grammar.py --list sql

# flere språk på en gang
python3 highlight/_convert_grammar.py erlang nix fsharp

# eget navn, hint og søkeord (ett språk av gangen)
python3 highlight/_convert_grammar.py erlang --label "Erlang/OTP" --hint BEAM --keywords "erl otp"

# Erstat en kort fil levert med programtillegget med en redigerbar full kopi
python3 highlight/_convert_grammar.py routeros --force --label RouterOS --hint MikroTik --keywords mikrotik

# et språk ennå ikke i en utgitt highlight.js-versjon, fra utviklingsgrenen
python3 highlight/_convert_grammar.py odin --ref main

# en lenke til en grammatikfil, rett fra nettleserens adresselinje
python3 highlight/_convert_grammar.py https://github.com/highlightjs/highlight.js/blob/main/src/languages/odin.js

# en tredjeparts grammatikk: en lenke til arkivet, skriptet finner grammatikfilen
python3 highlight/_convert_grammar.py https://github.com/highlightjs/highlightjs-terraform

# en lokal grammatikfil
python3 highlight/_convert_grammar.py ~/grammars/mylang.js --id mylang

# en kort fil som refererer til npm-pakken i stedet for en kopi av koden
python3 highlight/_convert_grammar.py erlang --npm

# vis hva som ville bli gjort uten å endre noe
python3 highlight/_convert_grammar.py erlang --dry-run
```

### What the script does

1. Laster ned `src/languages/<name>.js` av highlight.js-versjonen programtillegget kjører. Versjonen leses fra `package-lock.json` (for øyeblikket 11.12.0), fordi grammatikker skrives for motorversjonen. `--ref` velger en annen versjon, gren eller commit.
2. Tar sproganavn fra `Language:`-linjen i grammatiks header og søkeord fra aliaser (`aliases`). `id`'et er filnavnet på grammatikken.
3. Setter grammatikkoden inn `highlight/<id>.js` uendret bortsett fra eksporten: `export default function(hljs)` blir `function grammar(hljs)`, og sprogobjektet `export default { id, label, keywords, grammar }` legges til slutten av filen. Hvis grammatikken er en CommonJS-modul (`module.exports = ...`), legges en linje som erklærer `module` og `exports` til toppen av filen.
4. Hvis grammatikken importerer andre filer, laster det ned dem til `highlight/_vendor/<source>-<version>/` under de samme stiene som i arkivet og peker importen der. For eksempel importerer `typescript` `javascript.js` og `lib/ecmascript.js`. Disse filene deles av alle språk fra samme kilde og versjon; det er ingen grunn til å redigere dem.
5. Kontrollerer linjen `Requires:`, som oppgir språkene som brukes for innebygd kode (for eksempel skal `php-template` `xml` og `php`). Hvis de ikke er i `highlight/`, skriver ut kommandoen som legger dem til. Uten dem forblir den innebygde koden ganske enkelt ufärget; dette er ikke en feil.
6. Overskriver ikke eksisterende filer uten `--force` og tar ikke en `id` som allerede brukes av en annen fil.

Etter konvertering kan språket redigeres rett i filen.

### Options

| Alternativ | Hva det gjør |
|---|---|
| `LANGUAGE ...` | Et highlight.js-sproganavn, en lenke til en grammatikfil eller en tredjeparts grammatikk arkiv på GitHub, eller en bane til en lokal `.js`-fil. |
| `--ref REF` | highlight.js-versjon (tag), gren eller commit. Som standard til versjonen i `package-lock.json`. For lenker tas versjonen fra lenken. |
| `--id ID` | Sprogets `id`. Som standard til filnavnet på grammatikken. |
| `--label TEXT` | Navn på listen og badgeen. Som standard til `Language:` fra grammatikken. |
| `--hint TEXT` | Grå notat på listen. |
| `--keywords TEXT` | Mellomromskilt søkeord. Som standard: grammatikkens aliaser. |
| `--npm` | I stedet for en kopi av koden, skriv en kort fil som refererer til highlight.js npm-pakken. Bare for highlight.js-språk. |
| `--force` | Erstat eksisterende filer. |
| `--dry-run` | Vis hva som ville bli gjort uten å endre noe. |
| `--list [WORD]` | Liste highlight.js-språk og tredjepartsgrammatikker, eventuelt filtrert etter ord. |
| `--prune` | Slett filer i `_vendor/` som intet språk importerer lenger. |


**Kopier eller `--npm`?** En kopi viser reglene rett i filen: du kan redigere dem, ta en grammatikk nyere enn den installert pakken, eller en tredjeparts. En kopi endres ikke når programtillegget oppgraderes highlight.js; for å oppdatere det, konverter språket igjen med `--force`. En fil laget med `--npm` er noen få linjer lang, og grammatikken oppgraderes sammen med programtillegget.

## Building and applying

```sh
sh highlight/_compile.sh
```

- Det trenger Docker (bygningen kjører i en `node:20-alpine`-beholder) eller, hvis det er ingen Docker, Node.js 18+ på samme maskin. På første kjøring installerer skriptet npm-pakker i programtilleggets `node_modules/`-mappe.
- Først kontrollerer skriptet hvert språk: bygger det separat, laster det, registrerer det i samme motor som kjører i nettleseren, og fremhever en eksempel-tekst. Hvis et språk er ødelagt (en feil i koden, et ugyldigt regulært uttrykk, en `id` som allerede er tatt), nevner skriptet filen og grunnen og stopper; den tidligere `tiptap_highlight.js` forblir på plass.
- Deretter samler skriptet alle språk til `assets/javascripts/tiptap_highlight.js`.

Etter bygningen start Redmine på nytt: det publiserer programtilleggsfiler ved oppstart (se "Updating" i [hoved-README](../../docs/README.no.md#updating) for kommandoene). Nettlesere får den nye filen umiddelbart, fordi URL-adressen inneholder et fingeravtrykk av innholdet.

Hvis Redmine-serveren hverken har Docker eller Node.js, bygger du på en maskin som har det (en kopi av programtillegsmappen er nok) og setter den resulterende `assets/javascripts/tiptap_highlight.js` på serveren.

## Removing a language

Slett sprogets fil fra `highlight/`, bygg, og start Redmine på nytt. Lagrede blokkjer på dette språket forblir som de er og vises som vanlig tekst. Filer i `_vendor/` som ikke lenger er nødvendige fjernes med:

```sh
python3 highlight/_convert_grammar.py --prune
```

## Own grammars and editing rules

- En grammatikk er en funksjon som mottar objektet `hljs` og returnerer en sproges definisjon: hvilke deler av teksten som skal markeres og hvordan. Veiledning: https://highlightjs.readthedocs.io/en/latest/language-guide.html, referanse: https://highlightjs.readthedocs.io/en/latest/mode-reference.html. Eksempler: `log.js`, `journalctl.js`, `cisco-ios.js`.
- highlight.js slår sammen de regulære uttrykkene til alle regler på et språk i en og ignorerer egne flagg. Så stor og liten bokstav-uavhengig matching må stavskavet (eller `[Ee]rror`) eller aktiveres til hele språket med `case_insensitive: true`.
- Foretrekk standard token-klassene (`keyword`, `string`, `number`, `comment`, `title`, `attr`, `variable`, `built_in`, `literal`, `meta`, `symbol`, `type` og så videre): de har allerede farger. En klasse av din egen (for eksempel produserer `scope: 'log-error'` klassen `hljs-log-error`) trenger en regel i `assets/stylesheets/src/06_code.css` og et CSS-bygg (`assets/stylesheets/src/_build.sh`).
- For å tilby en ferdig grammatikk under et annet navn gjør du som `cmd.js` gjør: kall den opprinnelige grammatikken og endre `name` og `aliases` i resultatet. Hvis aliasene ikke erstattes tar det nye språket dem fra det opprinnelige.

## Updating the plugin when you have added languages

git lar filene dine i `highlight/` alene. Men `assets/javascripts/tiptap_highlight.js` i den nye programtilleggversjonen er bygget uten dine språk, og bygget ditt av denne filen kommer i veien for `git pull`. Så:

```sh
cd /path/to/redmine/plugins/redmine_tiptap
git checkout -- assets/javascripts/tiptap_highlight.js
git pull
sh highlight/_compile.sh
```

Den første kommandoen kaster bygget ditt bort, den siste bygger språkene på nytt, inkludert dine. Start deretter Redmine på nytt. Hvis du har redigert sprogets filer levert med programtillegget, kan git spørre deg om å løse konflikter i dem.

Hvis programtillegget ble installert fra et arkiv, lagrer du sprogets filer og mappen `_vendor/` før du erstatter programtillegsmappen, setter dem tilbake etterpå, og bygger språkene.

## Size

Alle språk er samlet til en fil; nettleseren laster det ned en gang og tar det deretter fra hurtigminnet. For øyeblikket er det 226 KB for 52 språk. De fleste språk tar 1–10 KB, det største er 1C (55 KB).
