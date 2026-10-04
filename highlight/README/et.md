# Süntaksvärvitus: keeled

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

> *See tõlge on tehtud tehisintellekti mudeli abiga ja emakeelne kõneleja pole seda üle vaadanud. Kui leiate vea, [avage issue või pull request](https://github.com/Du10777/redmine_tiptap).*

Koodiblokid on esiletõstetud nii redaktoris kui salvestatud lehtedel (teemad, märkused, viki) ja nad näevad välja sama. Ploki keel valitakse selle parempoolsest ülaosast olevaast märgist. Keelte loend määratakse failidega `highlight/` kaustas: üks fail on üks keel.

Pistik käivitub 52 keelega. Te võite lisada rohkem: teisendada valmis highlight.js grammatika skriptiga (vt [Keele lisamine highlight.js-ist](#keele-lisamine-highlightjs-ist)) või kirjutada oma.

## Kuidas see töötab

- Esiletõstmine tehakse [highlight.js](https://highlightjs.org) (läbi [lowlight](https://github.com/wooorm/lowlight)). Redaktor ja salvestatud lehed kasutavad sama mootori, seega värvid sobivad.
- `_compile.sh` kogub kõik keele failid üheks failiks, `assets/javascripts/tiptap_highlight.js`. See fail on juba koostatud hoidlas, seega pistiku paigaldamine ei vaja koostamist. Te peate seda koostama ainult siis, kui muudate keelte komplekti.
- Redmine laadib `tiptap_highlight.js` igal lehel enne redaktorit (`tiptap_bundle.js`). Laadimisele registreerib redaktor kõik keeled sellest failist.
- Redaktoris on plokk uuesti esiletõstetud 50 ms pärast sisestamist, ja ainult blokk, mis muutus. Salvestatud lehtedel on plokk esiletõstetud kui see skrollitakse vaatesse. Plokk voltitava sektsiooni sees on esiletõstetud, kui sektsioon avatakse.
- Keel salvestatakse salvestatud HTML-i: `<pre><code class="language-<id>">`. Seetõttu ei tohi keele `id` kunagi muutuda: plokid, mis on salvestatud vana `id`-ga, muutuks tavalisteks tekstideks.
- Keele autodetektsiooni ei ole: plokk ilma keeleta kuvatakse tavaline teksti. Samuti plokk, kelle keel ei ole `highlight/` kaustas (näiteks keelefail kustutati); selle märk näitab jätkuvalt `id`-d. Kui keelefail tuleb tagasi, nii teevad värvid.
- Värvid. highlight.js märgib teksti klassidega nagu `hljs-keyword`, `hljs-string`, `hljs-comment`. Nende värvused on määratud `assets/stylesheets/src/06_code.css`, kasutades Redmine'i enda süntaksi esiletõstmise paletit.

## Keelefail

Näiteks `routeros.js`:

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

| Väli | Nõutav | Mis see on |
|---|---|---|
| `id` | jah | Keele nimi salvestatud HTML-is (`class="language-<id>"`). Lubatud märgid: `a-z`, `0-9`, `-`, `_`. **Kunagi ära muuda** kui plokid selle keelega on salvestatud. |
| `label` | ei | Nimi keele loendis ja ploki märgil. Vaikimisi `id`. |
| `hint` | ei | Hall märkus nime kõrval loendis. |
| `keywords` | ei | Lisasõnad otsingule loendis, tühikuga eraldatud. |
| `grammar` | jah | highlight.js grammatika: funktsioon `(hljs) => language definition`. |

`label`, `hint` ja `keywords` on inglise keeles. Et näidata keelt kasutaja liidese keele all muul nimega või seda otsitavaks teha selle keele sõnadega, lisage sissekanne tõlkefaili `config/locales/<code>.yml` jaotisse `code_languages:`. Seal olevad sõnad lisatakse `keywords` alla; `label` ja `hint` asendavad keelefaili omad. `config/locales/ru.yml` sisaldab näiteid, reeglid on [config/locales/README.md](../../config/locales/README.md).

Failide liigid kaustas:

- **Lühike.** Viide highlight.js npm-paketi grammatikale, nagu ülaltoodud näites; enamik keeli on nii. Grammatika pärineb pistiku `package-lock.json` salvestatud highlight.js versioonist.
- **Täis koopia.** Grammatika kood on failis ja saab olla muudetud. Neid faile loovad teisenduse skript (vt allpool).
- **Oma grammatika.** `log.js`, `journalctl.js`, `cisco-ios.js`; nende ühised osad on `_common.js`.
- **Ümbris.** Valmis grammatika teise nime all: `cmd.js` on `dos` highlight.js-ist, `docker-compose.js` on `yaml`.

Failid ja kaustad, kelle nimed algavad `_`, ei ole keeled:

- `_compile.sh` koostab keeled;
- `_check.mjs` kontrollib keeli koostamise ajal;
- `_common.js` sisaldab pistiku omade grammatika ühise osa;
- `_convert_grammar.py` on skript, mis teisendab highlight.js grammatikad (vt allpool);
- `_vendor/` sisaldab faile, mille impordivad teisendatud grammatikad (loodud teisenduse skriptiga).

`README/` kaust sisaldab seda dokumentatsiooni.

## Keele lisamine highlight.js-ist

Valmis grammatikad (rohkem kui 190) on siin: https://github.com/highlightjs/highlight.js/tree/main/src/languages. Nende nimed ja pseudonüümid on loetletud [SUPPORTED_LANGUAGES.md](https://github.com/highlightjs/highlight.js/blob/main/SUPPORTED_LANGUAGES.md), koos umbes saja kolmanda osapoolele kuuluva grammatikaga, mida peetakse eraldi hoidlates. Skript `_convert_grammar.py` selles kaustas teisendab neist ükskõik millise pistiku vormingusse.

Skript vajab Pythoni 3.6+ (lisapaketeid) ja juurdepääsu github.com-le. Käivitage see pistiku kaustas:

```sh
cd /path/to/redmine/plugins/redmine_tiptap
python3 highlight/_convert_grammar.py erlang
sh highlight/_compile.sh
```

Argument `erlang` on failnimi `src/languages` ilma `.js`. Teine käsk koostab keeled ja kontrollib neid. Seejärel taaskäivitage Redmine (vt [Koostamine ja rakendamine](#koostamine-ja-rakendamine)). Windowsis kasutage `py` või `python` asemel `python3`.

Näited:

```sh
# highlight.js keelte loend (* = juba highlight/), soovi korral filtreerituna sõnaga
python3 highlight/_convert_grammar.py --list
python3 highlight/_convert_grammar.py --list sql

# mitut keelt korraga
python3 highlight/_convert_grammar.py erlang nix fsharp

# oma nimi, vihje ja otsingu sõnad (üks keel korraga)
python3 highlight/_convert_grammar.py erlang --label "Erlang/OTP" --hint BEAM --keywords "erl otp"

# asenda lühike fail, mille pistik saadab, muudetava täis koopia
python3 highlight/_convert_grammar.py routeros --force --label RouterOS --hint MikroTik --keywords mikrotik

# keel, mis ei ole veel väljastatud highlight.js versioonis, arendusharu
python3 highlight/_convert_grammar.py odin --ref main

# link grammatika failile, otse brauseri aadressiribalt
python3 highlight/_convert_grammar.py https://github.com/highlightjs/highlight.js/blob/main/src/languages/odin.js

# kolmandale osapoolele kuuluv grammatika: link selle hoidlale, skript leiab grammatika faili
python3 highlight/_convert_grammar.py https://github.com/highlightjs/highlightjs-terraform

# kohalik grammatika fail
python3 highlight/_convert_grammar.py ~/grammars/mylang.js --id mylang

# lühike fail, mis viitab npm-pakettele koopia asemel
python3 highlight/_convert_grammar.py erlang --npm

# kuva mis tehakse ilma midagi muutmata
python3 highlight/_convert_grammar.py erlang --dry-run
```

### Mida skript teeb

1. Laadib `src/languages/<name>.js` highlight.js versioonist, mille pistik käivitub. Versioon loetakse `package-lock.json`-st (praegu 11.12.0), sest grammatikad on kirjutatud nende enda versiooni mootorile. `--ref` valib teise versiooni, haru või kujundu.
2. Võtab keele nime grammatika päise `Language:` reast ja otsingu sõnad selle pseudonüümidest (`aliases`). `id` on grammatika faili nimi.
3. Paneb grammatika koodi `highlight/<id>.js` muutumatuks, välja arvatud eksport: `export default function(hljs)` muutub `function grammar(hljs)`, ja keele objekt `export default { id, label, keywords, grammar }` lisatakse faili lõppu. Kui grammatika on CommonJS moodul (`module.exports = ...`), deklaratsioon `module` ja `exports` lisatakse ülaossa.
4. Kui grammatika impordib teisi faile, laadib nad `highlight/_vendor/<source>-<version>/` hoidlale samadel teedel ja suunab impordid sinna. Näiteks `typescript` impordib `javascript.js` ja `lib/ecmascript.js`. Need failid jagavad kõik keeled samast allikast ja versioonist; pole vaja neid muuta.
5. Kontrollib `Requires:` rida, mis loetleb keeled, mida kasutatakse manustatud koodile (näiteks `php-template` vajab `xml` ja `php`). Kui neid ei ole `highlight/` kaustas, prindib käsku, mis lisab need. Ilma nendeta jääb manustatud kood lihtsalt värvitamata; see ei ole viga.
6. Ei kirjuta üle olemasolevaid faile ilma `--force` ja ei võta `id` juba kasutusel teise faili poolt.

Pärast teisendust saab keelt muuta otse selle failist.

### Valikud

| Valik | Mida see teeb |
|---|---|
| `LANGUAGE ...` | highlight.js keele nimi, link grammatika failile või kolmandale osapoolele kuuluva grammatika hoidlale GitHubis, või tee kohalikule `.js` failile. |
| `--ref REF` | highlight.js versioon (silt), haru või kujund. Vaikimisi pistiku `package-lock.json` versioon. Linkidele võetakse versioon linkist. |
| `--id ID` | Keele `id`. Vaikimisi grammatika failnimi. |
| `--label TEXT` | Nimi loendis ja märgil. Vaikimisi `Language:` grammatikast. |
| `--hint TEXT` | Hall märkus loendis. |
| `--keywords TEXT` | Tühikuga eraldatud otsingu sõnad. Vaikimisi grammatika pseudonüümid. |
| `--npm` | Asemel koopia koodist, kirjuta lühike fail, mis viitab highlight.js npm-pakettele. Ainult highlight.js omad keeled. |
| `--force` | Asenda olemasolevad failid. |
| `--dry-run` | Kuva mis tehakse ilma midagi muutmata. |
| `--list [WORD]` | Loetla highlight.js keeled ja kolmandale osapoolele kuuluvad grammatikad, soovi korral filtreerituna sõnaga. |
| `--prune` | Kustuta failid `_vendor/` kaustas, mida ükski keel enam ei import. |


**Koopia või `--npm`?** Koopia näitab reegleid otse failist: saate neid muuta, võtta grammatika uuemat kui paigaldatud pakett, või kolmandale osapoolele kuuluvat. Koopia ei muutu, kui pistik täiendab highlight.js; värskendamiseks teisendage keel uuesti `--force`-ga. `--npm`-ga tehtud fail on paari rida pikk ja selle grammatika täiendatakse koos pistikuga.

## Koostamine ja rakendamine

```sh
sh highlight/_compile.sh
```

- See vajab Dockerit (ehitus käib `node:20-alpine` ümbrises) või kui Docker ei ole olemas, Node.js 18+ sama masinas. Esimesel käitamisel paigaldab skript npm-paketid pistiku `node_modules/` kausta.
- Esimesena kontrollib skript iga keelt: koostab selle eraldi, laadib selle, registreerib selle samas mootoris, mis käib brauseris, ja esiletõstab näidisteksti. Kui keel on katki (viga koodi, vigane regulaaravaldis, `id` juba kastusel), nimetab skript faili ja põhjuse ja peatub; eelmine `tiptap_highlight.js` jääb kohale.
- Seejärel kogub skript kõik keeled `assets/javascripts/tiptap_highlight.js` failisse.

Pärast koostamist taaskäivitage Redmine: see avaldab pistiku failid käivitamisel (vt "Värskendamine" peamises [README](../../docs/README.et.md#värskendamine) käskude jaoks). Brauserid saavad uue faili kohe, sest selle URL sisaldab sisu sõrmejälge.

Kui Redmine'i server ei oma Docker-i ega Node.js-i, ehitage mis tahes masinas, millel on neist üks (pistiku kaust piisab) ja pange tulemuslik `assets/javascripts/tiptap_highlight.js` serverisse.

## Keele eemaldamine

Kustutage keele fail `highlight/` kaustas, ehitage ja taaskäivitage Redmine. Salvestatud plokid selle keele peal jäävad nagu olid ja kuvatakse tavaline teksti. Failid `_vendor/` kaustas, mida enam pole vaja, eemaldatakse:

```sh
python3 highlight/_convert_grammar.py --prune
```

## Omad grammatikad ja redigeerimise reeglid

- Grammatika on funktsioon, mis saab `hljs` objekti ja tagastab keele määratluse: millised teksti osad märkida ja kuidas. Juhend: https://highlightjs.readthedocs.io/en/latest/language-guide.html, viide: https://highlightjs.readthedocs.io/en/latest/mode-reference.html. Näited: `log.js`, `journalctl.js`, `cisco-ios.js`.
- highlight.js liidab kõik keele reeglite regulaaravaldised üheks ja eirab nende endi lippe. Seega tuleb tõsiduseta sobitamine kirja panna (`[Ee]rror`) või lubada kogu keele jaoks `case_insensitive: true`.
- Eelistada standardseid märgiklasse (`keyword`, `string`, `number`, `comment`, `title`, `attr`, `variable`, `built_in`, `literal`, `meta`, `symbol`, `type` jne): neil on juba värvid. Oma klass (näiteks `scope: 'log-error'` toodab klassi `hljs-log-error`) vajab reeglit `assets/stylesheets/src/06_code.css` ja CSS-i uuesti ehitust (`assets/stylesheets/src/_build.sh`).
- Et pakkuda valmis grammatika teise nime all, tee nagu `cmd.js`: kutsu algupärane grammatika ja muuda `name` ja `aliases` selle tulemuses. Kui pseudonüümid ei ole asendatud, võtab uus keel need üle originaalist.

## Pistiku värskendamine kui olete keeli lisanud

git jätab oma failid `highlight/` kausta rahule. Kuid `assets/javascripts/tiptap_highlight.js` uues pistiku versioonis on ehitatud ilma teie keelteta ja teie ehitus sellest failist takistab `git pull`. Nii et:

```sh
cd /path/to/redmine/plugins/redmine_tiptap
git checkout -- assets/javascripts/tiptap_highlight.js
git pull
sh highlight/_compile.sh
```

Esimene käsk kustutab teie ehituse, viimane ehitab keeled uuesti, sealhulgas teie omad. Seejärel taaskäivitage Redmine. Kui olete redigeerinud keele faile, mille pistik koos tarnib, võib git paluda teil lahendada konfliktid neis.

Kui pistik oli paigaldatud arhiivist, salvestage oma keele failid ja `_vendor/` kaust enne pistiku kausta asendamist, pange need pärast tagasi ja ehitage keeled.

## Suurus

Kõik keeled on kogutud ühte faili; brauser laadib selle üks kord ja siis võtab selle vahemälust. Praegu on see 226 KB 52 keele jaoks. Enamik keeli võtavad 1–10 KB, suurim on 1C (55 KB).
