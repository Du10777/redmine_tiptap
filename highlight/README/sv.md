# Syntaxmarkering: språk

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

> *Den här översättningen gjordes med hjälp av en AI-modell och har inte granskats av en modersmålstalare. Om du hittar ett misstag, öppna gärna ett [ärende eller en pull-begäran](https://github.com/Du10777/redmine_tiptap).*

Kodblock är markerade både i redigeraren och på sparade sidor (ärenden, anteckningar, wiki), och de ser likadana ut på båda. Språket i ett block väljs från märkena i dess övre högra hörn. Listan över språk definieras av filerna i mappen `highlight/`: en fil är ett språk.

Plugin-modulen levereras med 52 språk. Du kan lägga till fler: konvertera en färdig highlight.js-grammatik med ett skript (se [Lägga till ett språk från highlight.js](#lägga-till-ett-språk-från-highlightjs)) eller skriva din egen.

## Hur det fungerar

- Markering görs av [highlight.js](https://highlightjs.org) (genom [lowlight](https://github.com/wooorm/lowlight)). Redigeraren och de sparade sidorna använder samma motor, så färgerna matchar.
- `_compile.sh` buntade alla språkfiler till en fil, `assets/javascripts/tiptap_highlight.js`. Denna fil är redan incheckad till arkivet som skapats, så installation av plugin-modulen kräver inget bygge. Du behöver endast bygga den när du ändrar uppsättningen av språk.
- Redmine laddar `tiptap_highlight.js` på varje sida, före redigeraren (`tiptap_bundle.js`). Vid inläsning registrerar redigeraren alla språk från den filen.
- I redigeraren återmarkeras ett block 50 ms efter du pausar typningen, och endast det block som ändrades. På sparade sidor markeras ett block när det rullas in i vy. Ett block inuti ett sammanfallt avsnitt är markerat när avsnittet öppnas.
- Språket lagras i den sparade HTML:n: `<pre><code class="language-<id>">`. Det är därför `id` för ett språk aldrig får ändras: block sparade med det gamla `id` skulle bli vanlig text.
- Det finns ingen automatisk språkidentifiering: ett block utan ett språk visas som vanlig text. Samma gäller för ett block vars språk inte finns i `highlight/` (till exempel språkfilen togs bort); dess märke fortsätter att visa `id`. Om språkfilen kommer tillbaka, så gör färgerna det.
- Färger. highlight.js markerar text med klasser som `hljs-keyword`, `hljs-string`, `hljs-comment`. Deras färger ställs in i `assets/stylesheets/src/06_code.css`, med Redmines eget syntaxmarkeringpalett.

## Språkfil

Till exempel, `routeros.js`:

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

| Fält | Obligatorisk | Vad det är |
|---|---|---|
| `id` | ja | Språknamn i den sparade HTML:n (`class="language-<id>"`). Tillåtna tecken: `a-z`, `0-9`, `-`, `_`. **Ändra det aldrig** när block med detta språk har sparats. |
| `label` | nej | Namn i språklistan och på blocksmärket. Standard är `id`. |
| `hint` | nej | Grå anteckning bredvid namnet i listan. |
| `keywords` | nej | Extra ord för listsökningen, avgränsade med mellanslag. |
| `grammar` | ja | En highlight.js-grammatik: en funktion `(hljs) => language definition`. |

`label`, `hint` och `keywords` är på engelska. För att visa ett språk under ett annat namn i gränssnittet för en användare, eller för att göra det sökbart med ord av det språket, lägg till en post i översättningsfilen för det språket, `config/locales/<code>.yml`, under `code_languages:`. Orden där läggs till `keywords`; `label` och `hint` ersätter de från språkfilen. `config/locales/ru.yml` har exempel, reglerna finns i [config/locales/README.md](../../config/locales/README.md).

Slags filer i mappen:

- **Kort.** En referens till en grammatik från highlight.js npm-paketet, som i exemplet ovan; de flesta språk är så här. Grammatiken kommer från highlight.js-versionen registrerad i plugin-modulens `package-lock.json`.
- **Full kopia.** Grammatikkoden finns i själva filen och kan redigeras. Dessa filer skapas av konverteringsskriptet (se nedan).
- **Egen grammatik.** `log.js`, `journalctl.js`, `cisco-ios.js`; deras delade delar är i `_common.js`.
- **Omslutning.** En färdig grammatik under ett annat namn: `cmd.js` är `dos` från highlight.js, `docker-compose.js` är `yaml`.

Filer och mappar vars namn börjar med `_` är inte språk:

- `_compile.sh` bygger språken;
- `_check.mjs` kontrollerar språken under bygget;
- `_common.js` innehåller delade delar av plugin-modulens egna grammatiker;
- `_convert_grammar.py` är skriptet som konverterar highlight.js-grammatiker (se nedan);
- `_vendor/` innehåller filer importerade av konverterade grammatiker (skapad av konverteringsskriptet).

Mappen `README/` innehåller denna dokumentation.

## Lägga till ett språk från highlight.js

Färdiga grammatiker (mer än 190) finns här: https://github.com/highlightjs/highlight.js/tree/main/src/languages. Deras namn och alias listas i [SUPPORTED_LANGUAGES.md](https://github.com/highlightjs/highlight.js/blob/main/SUPPORTED_LANGUAGES.md), tillsammans med ungefär ett hundra grammatiker från tredje part som lagras i separata arkiv. Skriptet `_convert_grammar.py` i denna mapp konverterar vilken som helst av dem till plugin-modulens format.

Skriptet behöver Python 3.6+ (inga extra paket) och åtkomst till github.com. Kör det från plugin-mappen:

```sh
cd /path/to/redmine/plugins/redmine_tiptap
python3 highlight/_convert_grammar.py erlang
sh highlight/_compile.sh
```

Argumentet `erlang` är filnamnet i `src/languages` utan `.js`. Det andra kommandot bygger språken och kontrollerar dem. Starta sedan om Redmine (se [Bygga och applicera](#bygga-och-applicera)). På Windows använder du `py` eller `python` istället för `python3`.

Exempel:

```sh
# lista över highlight.js-språk (* = redan i highlight/), valfritt filtrerad efter ett ord
python3 highlight/_convert_grammar.py --list
python3 highlight/_convert_grammar.py --list sql

# flera språk på en gång
python3 highlight/_convert_grammar.py erlang nix fsharp

# eget namn, anmärkning och sökord (ett språk i taget)
python3 highlight/_convert_grammar.py erlang --label "Erlang/OTP" --hint BEAM --keywords "erl otp"

# ersätt en kort fil som levereras med plugin-modulen med en redigerbar full kopia
python3 highlight/_convert_grammar.py routeros --force --label RouterOS --hint MikroTik --keywords mikrotik

# ett språk ännu inte i en släppt highlight.js-version, från utvecklingsgrenen
python3 highlight/_convert_grammar.py odin --ref main

# en länk till en grammatikfil, rätt från webbläsarens adressfält
python3 highlight/_convert_grammar.py https://github.com/highlightjs/highlight.js/blob/main/src/languages/odin.js

# en tredje parts grammatik: en länk till dess arkiv, skriptet hittar grammatikfilen
python3 highlight/_convert_grammar.py https://github.com/highlightjs/highlightjs-terraform

# en lokal grammatikfil
python3 highlight/_convert_grammar.py ~/grammars/mylang.js --id mylang

# en kort fil som refererar till npm-paketet istället för en kopia av koden
python3 highlight/_convert_grammar.py erlang --npm

# visa vad som skulle göras utan att ändra något
python3 highlight/_convert_grammar.py erlang --dry-run
```

### Vad skriptet gör

1. Laddar ner `src/languages/<name>.js` av highlight.js-versionen som plugin-modulen körs på. Versionen läses från `package-lock.json` (för närvarande 11.12.0), för grammatiker är skrivna för motorn för deras egen version. `--ref` väljer en annan version, gren eller skicka.
2. Tar språknamnet från `Language:`-raden i grammatikens huvud och sökorden från dess alias (`aliases`). `id` är grammatikfilnamnet.
3. Lägger grammatikkoden in i `highlight/<id>.js` oförändrad förutom exporten: `export default function(hljs)` blir `function grammar(hljs)`, och språkobjektet `export default { id, label, keywords, grammar }` läggs till i slutet av filen. Om grammatiken är en CommonJS-modul (`module.exports = ...`), läggs en rad som förklarar `module` och `exports` till i toppen.
4. Om grammatiken importerar andra filer, laddar ner dem till `highlight/_vendor/<source>-<version>/` under samma vägar som i arkivet och pekar importen dit. Till exempel importerar `typescript` `javascript.js` och `lib/ecmascript.js`. Dessa filer delas av alla språk från samma källa och version; det finns inget behov av att redigera dem.
5. Kontrollerar `Requires:`-raden, som listar språken som används för inbäddad kod (till exempel behöver `php-template` `xml` och `php`). Om de inte finns i `highlight/`, skriver ut kommandot som lägger till dem. Utan dem förblir den inbäddade koden helt enkelt ofärgad; detta är inte ett fel.
6. Skriver inte över befintliga filer utan `--force` och tar inte ett `id` redan använt av en annan fil.

Efter konvertering kan språket redigeras helt enkelt i sin fil.

### Alternativ

| Alternativ | Vad det gör |
|---|---|
| `LANGUAGE ...` | Ett highlight.js-språknamn, en länk till en grammatikfil eller till ett tredje parts-grammatik-arkiv på GitHub, eller en väg till en lokal `.js`-fil. |
| `--ref REF` | highlight.js-version (märke), gren eller skicka. Standard till versionen i `package-lock.json`. För länkar tas versionen från länken. |
| `--id ID` | Språkets `id`. Standard till grammatikfilnamnet. |
| `--label TEXT` | Namn i listan och på märket. Standard till `Language:` från grammatiken. |
| `--hint TEXT` | Grå anteckning i listan. |
| `--keywords TEXT` | Sökord avgränsade med mellanslag. Standard: grammatikens alias. |
| `--npm` | Istället för en kopia av koden, skriva en kort fil som refererar till highlight.js npm-paketet. Endast för språk från highlight.js självt. |
| `--force` | Ersätt befintliga filer. |
| `--dry-run` | Visa vad som skulle göras utan att ändra något. |
| `--list [WORD]` | Lista highlight.js-språk och tredje parts grammatiker, valfritt filtrerad efter ett ord. |
| `--prune` | Ta bort filer i `_vendor/` som inget språk längre importerar. |


**Kopia eller `--npm`?** En kopia visar reglerna rätt i filen: du kan redigera dem, ta en grammatik nyare än det installerade paketet, eller en från tredje part. En kopia ändras inte när plugin-modulen uppgraderar highlight.js; för att uppdatera den, konvertera språket igen med `--force`. En fil gjord med `--npm` är bara ett par rader långt, och dess grammatik uppgraderas tillsammans med plugin-modulen.

## Bygga och applicera

```sh
sh highlight/_compile.sh
```

- Det behöver Docker (bygget körs i en `node:20-alpine`-behållare) eller, om det inte finns Docker, Node.js 18+ på samma maskin. Vid första körning installerar skriptet npm-paket till plugin-modulens `node_modules/`-mapp.
- Först kontrollerar skriptet varje språk: bygger det separat, laddar det, registrerar det i samma motor som körs i webbläsaren, och markerar en exempeltext. Om ett språk är bruten (ett fel i koden, ett ogiltigt regelbundet uttryck, ett `id` redan taget), namnger skriptet filen och orsaken och stoppar; den tidigare `tiptap_highlight.js` förblir på plats.
- Sedan buntar skriptet alla språk till `assets/javascripts/tiptap_highlight.js`.

Efter bygget startar du om Redmine: det publicerar plugin-filer vid uppstart (se "Uppdatering" i [huvudläsmappen](../../docs/README.sv.md#uppdatering) för kommandona). Webbläsare får den nya filen direkt, för dess URL innehåller ett fingeravtryck av innehållet.

Om Redmine-servern varken har Docker eller Node.js, bygge på vilken maskin som helst som har en av dem (en kopia av plugin-mappen räcker) och lägg den resulterande `assets/javascripts/tiptap_highlight.js` på servern.

## Ta bort ett språk

Ta bort språkfilen från `highlight/`, bygge, och starta om Redmine. Sparade block på detta språk förblir som de är och visas som vanlig text. Filer i `_vendor/` som inte längre behövs tas bort med:

```sh
python3 highlight/_convert_grammar.py --prune
```

## Egna grammatiker och redigeringsregler

- En grammatik är en funktion som tar emot `hljs`-objektet och returnerar en språkdefinition: vilka textdelar att markera och hur. Guide: https://highlightjs.readthedocs.io/en/latest/language-guide.html, referens: https://highlightjs.readthedocs.io/en/latest/mode-reference.html. Exempel: `log.js`, `journalctl.js`, `cisco-ios.js`.
- highlight.js förenar reguljära uttryck för alla regler för ett språk till en och ignorerar deras egna flaggor. Så skiftlägesoberoende matchning måste stavas ut (`[Ee]rror`) eller aktiveras för hela språket med `case_insensitive: true`.
- Föredra standardteckenklasserna (`keyword`, `string`, `number`, `comment`, `title`, `attr`, `variable`, `built_in`, `literal`, `meta`, `symbol`, `type` och så vidare): de har redan färger. En egen klass (till exempel, `scope: 'log-error'` producerar klassen `hljs-log-error`) behöver en regel i `assets/stylesheets/src/06_code.css` och en CSS-ombyggnad (`assets/stylesheets/src/_build.sh`).
- För att erbjuda en färdig grammatik under ett annat namn, gör som `cmd.js` gör: anropa den ursprungliga grammatiken och ändra `name` och `aliases` i dess resultat. Om aliasen inte ersätts, tar det nya språket dem från originalet.

## Uppdatera plugin-modulen när du har lagt till språk

git lämnar dina filer i `highlight/` ensamma. Men `assets/javascripts/tiptap_highlight.js` i den nya plugin-versionen är byggd utan dina språk, och din byggnad av denna fil är i vägen för `git pull`. Så:

```sh
cd /path/to/redmine/plugins/redmine_tiptap
git checkout -- assets/javascripts/tiptap_highlight.js
git pull
sh highlight/_compile.sh
```

Det första kommandot förkastar din byggnad, det sista bygger språken igen, inklusive dina. Starta sedan om Redmine. Om du har redigerat språkfiler som levereras med plugin-modulen, kan git be dig att lösa konflikter i dem.

Om plugin-modulen installerades från ett arkiv, spara dina språkfiler och `_vendor/`-mappen före ersättning av plugin-mappen, lägg tillbaka dem efteråt, och bygge språken.

## Storlek

Alla språk är bundtade till en fil; webbläsaren laddar ner den en gång och tar sedan den från cacheminnet. För närvarande är den 226 KB för 52 språk. De flesta språk tar 1–10 KB, det största är 1C (55 KB).
