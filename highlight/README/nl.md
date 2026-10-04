# Syntaxmarkering: talen

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

> *Deze vertaling is gemaakt met hulp van een AI-model en is nog niet door een moedertaalspreker gecontroleerd. Als u een fout vindt, [opent u alstublieft een issue of een pull request](https://github.com/Du10777/redmine_tiptap).*

Codeblokken worden in de editor en op opgeslagen pagina's (issues, notities, wiki) op dezelfde manier gemarkeerd, en ze zien er in beide hetzelfde uit. De taal van een blok wordt gekozen via de badge in de rechterbovenhoek. De lijst met talen wordt gedefinieerd door de bestanden in de map `highlight/`: één bestand is één taal.

De plugin wordt geleverd met 52 talen. U kunt meer toevoegen: zet een kant-en-klare highlight.js-grammatica om met een script (zie [Een taal toevoegen vanuit highlight.js](#een-taal-toevoegen-vanuit-highlightjs)) of schrijf uw eigen taal.

## Hoe het werkt

- Markering wordt gedaan door [highlight.js](https://highlightjs.org) (via [lowlight](https://github.com/wooorm/lowlight)). De editor en de opgeslagen pagina's gebruiken dezelfde engine, dus de kleuren komen overeen.
- `_compile.sh` bundelt alle taalbesten in één bestand, `assets/javascripts/tiptap_highlight.js`. Dit bestand is al ingebouwd in de repository, dus voor de installatie van de plugin is geen build nodig. U hoeft het alleen opnieuw in te bouwen als u de reeks talen wijzigt.
- Redmine laadt `tiptap_highlight.js` op elke pagina, vóór de editor (`tiptap_bundle.js`). Bij het laden registreert de editor alle talen van dat bestand.
- In de editor wordt een blok 50 ms na een typerpauze opnieuw gemarkeerd, alleen het blok dat is gewijzigd. Op opgeslagen pagina's wordt een blok gemarkeerd wanneer dit in het zicht schuift. Een blok in een ingevouwen afdeling wordt gemarkeerd wanneer de afdeling wordt geopend.
- De taal wordt opgeslagen in de opgeslagen HTML: `<pre><code class="language-<id>">`. Daarom mag de `id` van een taal nooit veranderen: blokken opgeslagen met de oude `id` zouden als platte tekst worden weergegeven.
- Er is geen automatische taaldetectie: een blok zonder taal wordt als platte tekst weergegeven. Hetzelfde geldt voor een blok waarvan de taal niet in `highlight/` staat (bijvoorbeeld omdat het taalbestand is verwijderd); zijn badge geeft nog steeds de `id` weer. Als het taalbestand terugkomt, doen de kleuren dat ook.
- Kleuren. highlight.js markeert tekst met klassen zoals `hljs-keyword`, `hljs-string`, `hljs-comment`. Hun kleuren worden ingesteld in `assets/stylesheets/src/06_code.css`, met behulp van het palet van Redmine's eigen syntaxmarkering.

## Taalbestand

Bijvoorbeeld `routeros.js`:

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

| Veld | Verplicht | Wat is het |
|---|---|---|
| `id` | ja | Taalnaam in opgeslagen HTML (`class="language-<id>"`). Toegestane tekens: `a-z`, `0-9`, `-`, `_`. **Wijzig dit nooit** zodra blokken met deze taal zijn opgeslagen. |
| `label` | nee | Naam in de talenlijst en op het taalblok-badge. Standaardwaarde: `id`. |
| `hint` | nee | Grijs notitieboek naast de naam in de lijst. |
| `keywords` | nee | Extra woorden voor zoeking in de lijst, gescheiden door spaties. |
| `grammar` | ja | Een highlight.js-grammatica: een functie `(hljs) => language definition`. |

`label`, `hint` en `keywords` zijn in het Engels. Voeg een invoer toe aan het vertaalbestand van die taal, `config/locales/<code>.yml`, onder `code_languages:` om een taal onder een andere naam in de interfacetaal van een gebruiker weer te geven of door woorden van die taal vindbaar te maken. De woorden daar worden toegevoegd aan `keywords`; `label` en `hint` vervangen die van het taalbestand. `config/locales/ru.yml` heeft voorbeelden, de regels staan in [config/locales/README.md](../../config/locales/README.md).

Soorten bestanden in de map:

- **Korte.** Een verwijzing naar een grammatica uit het highlight.js npm-pakket, zoals in het voorbeeld hierboven; de meeste talen zijn als dit. De grammatica komt uit de highlight.js-versie die in de `package-lock.json` van de plugin is opgenomen.
- **Volledige kopie.** De grammaticacode bevindt zich in het bestand zelf en kan worden bewerkt. Deze bestanden worden gemaakt door het conversie-script (zie hieronder).
- **Eigen grammatica.** `log.js`, `journalctl.js`, `cisco-ios.js`; hun gedeelde onderdelen staan in `_common.js`.
- **Wrapper.** Een kant-en-klare grammatica onder een andere naam: `cmd.js` is `dos` uit highlight.js, `docker-compose.js` is `yaml`.

Bestanden en mappen waarvan de namen beginnen met `_` zijn geen talen:

- `_compile.sh` bouwt de talen;
- `_check.mjs` controleert de talen tijdens de build;
- `_common.js` bevat gedeelde onderdelen van de eigen grammatica's van de plugin;
- `_convert_grammar.py` is het script dat highlight.js-grammatica's omzet (zie hieronder);
- `_vendor/` bevat bestanden die door omgezette grammatica's worden geïmporteerd (gemaakt door het conversie-script).

De map `README/` bevat deze documentatie.

## Een taal toevoegen vanuit highlight.js

Kant-en-klare grammatica's (meer dan 190) staan hier: https://github.com/highlightjs/highlight.js/tree/main/src/languages. Hun namen en aliassen staan in [SUPPORTED_LANGUAGES.md](https://github.com/highlightjs/highlight.js/blob/main/SUPPORTED_LANGUAGES.md), samen met ongeveer honderd grammatica's van derden die in aparte opslagplaatsen worden bewaard. Het script `_convert_grammar.py` in deze map zet elk van hen in het formaat van de plugin om.

Het script vereist Python 3.6+ (geen extra pakketten) en toegang tot github.com. Voer het uit vanuit de plugin-map:

```sh
cd /path/to/redmine/plugins/redmine_tiptap
python3 highlight/_convert_grammar.py erlang
sh highlight/_compile.sh
```

Het argument `erlang` is de bestandsnaam in `src/languages` zonder `.js`. Het tweede commando bouwt de talen in en controleert ze. Start Redmine vervolgens opnieuw op (zie [Inbouwen en toepassen](#inbouwen-en-toepassen) voor de commando's). Gebruik op Windows `py` of `python` in plaats van `python3`.

Voorbeelden:

```sh
# lijst met highlight.js-talen (* = al in highlight/), optioneel gefilterd op een woord
python3 highlight/_convert_grammar.py --list
python3 highlight/_convert_grammar.py --list sql

# verschillende talen tegelijk
python3 highlight/_convert_grammar.py erlang nix fsharp

# eigen naam, hint en zoekwoorden (één taal per keer)
python3 highlight/_convert_grammar.py erlang --label "Erlang/OTP" --hint BEAM --keywords "erl otp"

# vervang een kort bestand dat met de plugin wordt geleverd door een bewerkbare volledige kopie
python3 highlight/_convert_grammar.py routeros --force --label RouterOS --hint MikroTik --keywords mikrotik

# een taal nog niet in een uitgebrachte highlight.js-versie, van de ontwikkelingstak
python3 highlight/_convert_grammar.py odin --ref main

# een koppeling naar een grammaticabestand, rechtstreeks vanuit de browseradresbalk
python3 highlight/_convert_grammar.py https://github.com/highlightjs/highlight.js/blob/main/src/languages/odin.js

# een grammatica van derden: een koppeling naar de opslagplaats, het script vindt het grammaticabestand
python3 highlight/_convert_grammar.py https://github.com/highlightjs/highlightjs-terraform

# een lokaal grammaticabestand
python3 highlight/_convert_grammar.py ~/grammars/mylang.js --id mylang

# een kort bestand dat naar het npm-pakket verwijst in plaats van een kopie van de code
python3 highlight/_convert_grammar.py erlang --npm

# toon wat zou worden gedaan zonder iets te wijzigen
python3 highlight/_convert_grammar.py erlang --dry-run
```

### Wat het script doet

1. Download `src/languages/<name>.js` van de highlight.js-versie waarop de plugin draait. De versie wordt gelezen uit `package-lock.json` (momenteel 11.12.0), omdat grammatica's zijn geschreven voor de motor van hun eigen versie. `--ref` selecteert een ander versie, tak of commit.
2. Neemt de taalnaam van de `Language:`-regel van de grammaticakop en de zoekwoorden uit de aliassen (`aliases`). De `id` is de bestandsnaam van de grammatica.
3. Zet de grammaticacode in `highlight/<id>.js` ongewijzigd behalve voor de export: `export default function(hljs)` wordt `function grammar(hljs)`, en het taalbest `export default { id, label, keywords, grammar }` wordt aan het einde van het bestand toegevoegd. Als de grammatica een CommonJS-module is (`module.exports = ...`), wordt aan het begin van het bestand een regel toegevoegd die `module` en `exports` declareert.
4. Als de grammatica andere bestanden importeert, download deze in `highlight/_vendor/<source>-<version>/` onder dezelfde paden als in de opslagplaats en wijst de invoer ernaar. Bijvoorbeeld, `typescript` importeert `javascript.js` en `lib/ecmascript.js`. Deze bestanden worden gedeeld door alle talen uit dezelfde bron en versie; er is geen reden om ze te bewerken.
5. Controleert de `Requires:`-regel, die de talen opsomt die voor ingebedde code worden gebruikt (bijvoorbeeld `php-template` hebt `xml` en `php` nodig). Als zij niet in `highlight/` staan, drukt het script het commando af dat ze toevoegt. Zonder hen blijft de ingebedde code eenvoudig ongemarkeerd; dit is geen fout.
6. Overschrijft bestaande bestanden niet zonder `--force` en neemt geen `id` aan die al door een ander bestand wordt gebruikt.

Na conversie kan de taal rechtstreeks in het bestand worden bewerkt.

### Opties

| Optie | Wat doet het |
|---|---|
| `LANGUAGE ...` | Een highlight.js-taalnaam, een koppeling naar een grammaticabestand of naar een grammatica van derden op GitHub, of een pad naar een lokaal `.js`-bestand. |
| `--ref REF` | highlight.js-versie (tag), tak of commit. Standaardwaarde is de versie in `package-lock.json`. Voor koppelingen wordt de versie uit de koppeling genomen. |
| `--id ID` | Taal `id`. Standaardwaarde is de bestandsnaam van de grammatica. |
| `--label TEXT` | Naam in de lijst en op het badge. Standaardwaarde is `Language:` uit de grammatica. |
| `--hint TEXT` | Grijs notitieboek in de lijst. |
| `--keywords TEXT` | Spaced-gescheiden zoekwoorden. Standaardwaarde: de grammatica-aliassen. |
| `--npm` | In plaats van een kopie van de code schrijft u een kort bestand dat naar het highlight.js npm-pakket verwijst. Alleen voor talen van highlight.js zelf. |
| `--force` | Vervang bestaande bestanden. |
| `--dry-run` | Toon wat zou worden gedaan zonder iets te wijzigen. |
| `--list [WORD]` | Voer highlight.js-talen en grammatica's van derden in, optioneel gefilterd op een woord. |
| `--prune` | Verwijder bestanden in `_vendor/` die geen taal meer importeert. |


**Kopie of `--npm`?** Een kopie toont de regels direct in het bestand: u kunt ze bewerken, een grammatica nemen die nieuwer is dan het geïnstalleerde pakket, of één van derden. Een kopie verandert niet wanneer de plugin highlight.js bijwerkt; voer de taal opnieuw om met `--force` om deze te vernieuwen. Een bestand gemaakt met `--npm` is een paar regels lang, en de grammatica wordt samen met de plugin bijgewerkt.

## Inbouwen en toepassen

```sh
sh highlight/_compile.sh
```

- Het vereist Docker (de build draait in een `node:20-alpine`-container) of, als er geen Docker is, Node.js 18+ op dezelfde machine. Bij de eerste run installeert het script npm-pakketten in de map `node_modules/` van de plugin.
- Eerst controleert het script elke taal: bouwt ze afzonderlijk in, laadt ze, registreert ze in dezelfde engine die in de browser draait, en markeert een voorbeeldtekst. Als een taal verbroken is (een fout in de code, een ongeldig reguliere expressie, een `id` al in gebruik), noemt het script het bestand en de reden en stopt; de vorige `tiptap_highlight.js` blijft op zijn plaats.
- Vervolgens bundelt het script alle talen in `assets/javascripts/tiptap_highlight.js`.

Na de build start u Redmine opnieuw op: deze publiceert plugin-bestanden bij het opstarten (zie "Bijwerken" in de [principale README](../../docs/README.nl.md#bijwerken) voor de commando's). Browsers krijgen het nieuwe bestand meteen, omdat de URL een vingerafdruk van de inhoud bevat.

Als de Redmine-server geen Docker of Node.js heeft, bouwt op een machine die er een van beiden heeft (een kopie van de plugin-map volstaat) en zet het resultaat `assets/javascripts/tiptap_highlight.js` op de server.

## Een taal verwijderen

Verwijder het taalbestand uit `highlight/`, bouwt in, en start Redmine opnieuw op. Opgeslagen blokken in deze taal blijven zoals ze zijn en worden als platte tekst weergegeven. Bestanden in `_vendor/` die niet meer nodig zijn, worden verwijderd met:

```sh
python3 highlight/_convert_grammar.py --prune
```

## Eigen grammatica's en bewerkingsregels

- Een grammatica is een functie die het `hljs`-object ontvangt en een taaldefinitie retourneert: welke tekststukken u moet markeren en hoe. Gids: https://highlightjs.readthedocs.io/en/latest/language-guide.html, referentie: https://highlightjs.readthedocs.io/en/latest/mode-reference.html. Voorbeelden: `log.js`, `journalctl.js`, `cisco-ios.js`.
- highlight.js voegt de reguliere expressies van alle regels van een taal samen en negeert hun eigen vlaggen. Dus hoofdlettergevoelige matching moet worden uitgesproken (`[Ee]rror`) of voor de hele taal worden ingeschakeld met `case_insensitive: true`.
- Voorkeuren de standaard token-klassen (`keyword`, `string`, `number`, `comment`, `title`, `attr`, `variable`, `built_in`, `literal`, `meta`, `symbol`, `type` enzovoort): ze hebben al kleuren. Een klasse van uw eigen (bijvoorbeeld, `scope: 'log-error'` produceert de klasse `hljs-log-error`) heeft een regel in `assets/stylesheets/src/06_code.css` en een CSS-rebuild (`assets/stylesheets/src/_build.sh`) nodig.
- Voer voor het aanbieden van een kant-en-klare grammatica onder een andere naam uit wat `cmd.js` doet: roep de oorspronkelijke grammatica aan en wijzig `name` en `aliases` in het resultaat. Laten de aliassen ongewijzigd, de nieuwe taal neemt ze over van het origineel.

## De plugin bijwerken als u talen hebt toegevoegd

git laat uw bestanden in `highlight/` met rust. Maar `assets/javascripts/tiptap_highlight.js` in de nieuwe plugin-versie wordt zonder uw talen ingebouwd, en uw build van dit bestand belemmert `git pull`. Dus:

```sh
cd /path/to/redmine/plugins/redmine_tiptap
git checkout -- assets/javascripts/tiptap_highlight.js
git pull
sh highlight/_compile.sh
```

Het eerste commando verwerpt uw build, het laatste bouwt de talen opnieuw in, inclusief die van u. Start Redmine vervolgens opnieuw op. Hebt u taalbestanden die met de plugin worden geleverd bewerkt, git kan u vragen conflicten in hen op te lossen.

Als de plugin vanuit een archief is geïnstalleerd, slaat u uw taalbestanden en de map `_vendor/` op vóór het vervangen van de plugin-map, zet ze daarna terug en bouwt de talen in.

## Grootte

Alle talen worden in één bestand gebundeld; de browser downloadt het eenmaal en neemt het dan uit de cache. Momenteel is het 226 KB voor 52 talen. De meeste talen nemen 1–10 KB in beslag, de grootste is 1C (55 KB).
