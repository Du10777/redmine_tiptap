# Szintaxiskiemelés: nyelvek

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

> *Ez a fordítás egy AI-modell segítségével készült, és nem lett natív beszélővel leellenőrizve. Amennyiben hibát talál, kérjük [nyisson meg egy feladatot vagy pull requestet](https://github.com/Du10777/redmine_tiptap).*

A kódblokkok a szerkesztőben és a mentett oldalakon (feladatok, feljegyzések, wiki) egyaránt kiemelkednek, és mindkettőben azonos módon néznek ki. Egy blokk nyelvét a jobb felső sarkában lévő jelvényből választjuk ki. A nyelvek listáját a `highlight/` mappa fájljai határozzák meg: egy fájl egy nyelv.

A bővítmény 52 nyelvvel rendelkezik. Hozzáadhat többet: egy kész highlight.js nyelvtant konvertálhat egy scripttel (lásd [Nyelv hozzáadása a highlight.js-ből](#nyelv-hozzáadása-a-highlightjs-ből)) vagy írjon a sajátját.

## Hogyan működik

- A kiemelést a [highlight.js](https://highlightjs.org) végzi (a [lowlight](https://github.com/wooorm/lowlight) keresztül). A szerkesztő és a mentett oldalak ugyanazt a motort használják, így az színek egyeznek.
- `_compile.sh` összes nyelvfájlt egy fájlba egyesíti, `assets/javascripts/tiptap_highlight.js`. Ez a fájl már az adattárba beépítve van, ezért a bővítmény telepítéséhez nincs szükség fordításra. Csak akkor kell fordítani, ha megváltoztatja a nyelvek készletét.
- A Redmine minden oldalon betölti a `tiptap_highlight.js` fájlt, még a szerkesztő előtt (`tiptap_bundle.js`). A betöltéskor a szerkesztő az erre a fájlra az összes nyelvet regisztrálja.
- A szerkesztőben egy blokk az írás leállítása után 50 ms-mal újra ki lesz emelve, és csak a megváltozott blokk. A mentett oldalakon egy blokk akkor kerül kiemelésre, amikor a nézetbe görög. Az összecsukott szakaszon belüli blokk akkor kerül kiemelésre, amikor a szakasz megnyílik.
- A nyelv a mentett HTML-ben tárolódik: `<pre><code class="language-<id>">`. Ezért egy nyelv `id` alaptalan soha nem változhat: az összeomló régi `id` a sima szöveggé válnának.
- Nincs nyelvfelismerés: egy blokk nyelv nélkül egyszerű szövegként jelenik meg. Ugyanez igaz egy olyan blokkra, amelynek nyelve nem a `highlight/` (például a nyelvfájl törölve lett); a jelvénye továbbra is az `id`-t mutatja. Ha a nyelvfájl visszatér, a szín is.
- Színek. A highlight.js szöveget az olyan osztályokkal jelöli, mint `hljs-keyword`, `hljs-string`, `hljs-comment`. Ezek színei a `assets/stylesheets/src/06_code.css`-ben vannak beállítva, a Redmine saját szintaxiskiemelésének palettáját felhasználva.

## Nyelvfájl

Például `routeros.js`:

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

| Mező | Kötelező | Mi ez |
|---|---|---|
| `id` | igen | A mentett HTML-ben a nyelv neve (`class="language-<id>"`). Engedélyezett karakterek: `a-z`, `0-9`, `-`, `_`. **Soha ne módosítsa** miután e nyelvű blokkok mentésre kerültek. |
| `label` | nem | Név a nyelvlistában és a blokk jelvényén. Alapértelmezés `id`. |
| `hint` | nem | Szürke megjegyzés a lista mellett. |
| `keywords` | nem | Extra szavak a lista kereséshez, szóközzel elválasztva. |
| `grammar` | igen | A highlight.js nyelvtan: egy `(hljs) => language definition` funkció. |

`label`, `hint` és `keywords` angol. Ahhoz, hogy egy nyelvet a felhasználó kezelőfelületi nyelve alatt mutasson, vagy a nyelv szavaival kereshetővé tegyük, adjunk hozzá egy bejegyzést az adott nyelv fordítási fájljához, `config/locales/<code>.yml`, a `code_languages:` alatt. Az ott szereplő szavak a `keywords`-hez kerülnek; `label` és `hint` helyettesítik a nyelvfájl értékeit. `config/locales/ru.yml` van példák, a szabályok a [config/locales/README.md](../../config/locales/README.md)-ben vannak.

Fájltípusok a mappában:

- **Rövid.** A highlight.js npm csomag nyelvtanára mutató hivatkozás, mint a fenti példában; legtöbb nyelv ilyen. A nyelvtan a bővítmény `package-lock.json` -ből jön.
- **Teljes másolat.** A nyelvtan kódja a fájlban van és szerkeszthető. Az ezek az átalakító parancsfájl hozza létre (lásd lent).
- **Saját nyelvtan.** `log.js`, `journalctl.js`, `cisco-ios.js`; közös részeik a `_common.js`-ben vannak.
- **Wrapper.** Egy másik név alatt kész nyelvtan: `cmd.js` a highlight.js-ből `dos`, `docker-compose.js` a `yaml`.

Azok a fájlok és mappák, amelyeknek a neve `_`-tel kezdődik, nem nyelvek:

- `_compile.sh` felépíti a nyelveket;
- `_check.mjs` az építés során ellenőrzi a nyelveket;
- `_common.js` a bővítmény saját nyelvtanának közös részeit tartalmazza;
- `_convert_grammar.py` az a parancsfájl, amely konvertálja a highlight.js nyelvtanokat (lásd lent);
- `_vendor/` az átalakított nyelvek által importált fájlokat tartalmazza (az átalakító parancsfájl hozza létre).

A `README/` mappa ezt az dokumentációt tartalmazza.

## Nyelv hozzáadása a highlight.js-ből

Késznyelvtanok (több mint 190) itt vannak: https://github.com/highlightjs/highlight.js/tree/main/src/languages. A nevek és aliasai a [SUPPORTED_LANGUAGES.md](https://github.com/highlightjs/highlight.js/blob/main/SUPPORTED_LANGUAGES.md) fájlban soroltak fel, és körülbelül száz harmadik féltől származó nyelvtan külön adattárban tartható. A `_convert_grammar.py` parancsfájl ebből a mappából ezt a bővítmény formátumára konvertálja.

A parancsfájl a Python 3.6+-t igényli (nem szükséges extra csomagok) és a github.com eléréséhez. A bővítmény mappájából futtassa:

```sh
cd /path/to/redmine/plugins/redmine_tiptap
python3 highlight/_convert_grammar.py erlang
sh highlight/_compile.sh
```

Az `erlang` argumentum a `src/languages` -ban a fájlnév `.js` nélkül. A második parancs felépíti a nyelveket és ellenőrzi őket. Majd indítsa újra a Redmine-t (lásd [Felépítés és alkalmazás](#felépítés-és-alkalmazás)). A Windows-on használja a `py` vagy `python` helyett a `python3` helyett.

Példák:

```sh
# a highlight.js nyelvek listája (* = már highlight/), opcionálisan szóval szűrve
python3 highlight/_convert_grammar.py --list
python3 highlight/_convert_grammar.py --list sql

# több nyelv egyszerre
python3 highlight/_convert_grammar.py erlang nix fsharp

# saját nevet, tippet és keresőszavakat (egyszerre egy nyelv)
python3 highlight/_convert_grammar.py erlang --label "Erlang/OTP" --hint BEAM --keywords "erl otp"

# a bővítménnyel szállított rövid fájl helyettesítse szerkeszthető teljes másolattal
python3 highlight/_convert_grammar.py routeros --force --label RouterOS --hint MikroTik --keywords mikrotik

# egy még nem a kiadott highlight.js verzióban szereplő nyelv, a fejlesztési ágról
python3 highlight/_convert_grammar.py odin --ref main

# egy nyelvfájl linkje, közvetlenül a böngésző címsávjából
python3 highlight/_convert_grammar.py https://github.com/highlightjs/highlight.js/blob/main/src/languages/odin.js

# egy harmadik féltől származó nyelvtan: egy linki az adattárához, a parancsfájl megtalálja a nyelvfájlt
python3 highlight/_convert_grammar.py https://github.com/highlightjs/highlightjs-terraform

# egy helyi nyelvfájl
python3 highlight/_convert_grammar.py ~/grammars/mylang.js --id mylang

# egy rövid fájl, amely az npm csomagra hivatkozik a kód másolása helyett
python3 highlight/_convert_grammar.py erlang --npm

# mutasd, mi volna megtéve módosítás nélkül
python3 highlight/_convert_grammar.py erlang --dry-run
```

### Mit csinál a parancsfájl

1. Letölti a `src/languages/<name>.js` fájlt abból a highlight.js verzióból, amelyet a bővítmény futtat. A verziót a `package-lock.json`-ből olvassa (jelenleg 11.12.0), mivel a nyelvek a verziójuk motorához vannak írva. `--ref` kiválaszt egy másik verziót, ágat vagy véglegesítést.
2. A nyelvtan fejlécéből a `Language:` sorból és a nyomok (`aliases`) -ből veszi a keresőszavakat. Az `id` a nyelvfájl neve.
3. A nyelvtan kódot a `highlight/<id>.js` fájlba helyezi változatlanul, kivéve az exportálást: `export default function(hljs)` lesz `function grammar(hljs)`, és a `export default { id, label, keywords, grammar }` objektum a fájl végére függeszthető. Ha a nyelvtan egy CommonJS modul (`module.exports = ...`), a fájl tetejére `module` és `exports` nyilatkozat kerül.
4. Ha a nyelvtan más fájlokat importál, letölti őket a `highlight/_vendor/<source>-<version>/` -be az adattár alatt ugyanazon az útvonalon, és az importokat oda irányítja. Például a `typescript` az `javascript.js` és a `lib/ecmascript.js` fájlt importálja. Ezek a fájlok ugyanarról a forrásról és verzióról származó összes nyelvben megosztottak; nem kell szerkesztenie őket.
5. A `Requires:` sort ellenőrzi, amely felsorolja a beágyazott kódhoz használt nyelveket (például a `php-template` szüksége van az `xml` és a `php`-re). Ha nem találhatók a `highlight/` -ben, kiírja a parancsot, amely hozzáadja őket. Nélküle a beágyazott kód egyszerűen színezetlen marad; ez nem hiba.
6. Az `--force` nélkül nem írja felül a meglévő fájlokat, és nem vesz olyan `id`-t, amelyet már egy másik fájl használ.

Az átalakítás után a nyelv közvetlenül a fájlban szerkeszthető.

### Lehetőségek

| Lehetőség | Mit csinál |
|---|---|
| `LANGUAGE ...` | Egy highlight.js nyelvnév, egy link egy nyelvfájlhoz vagy egy harmadik féltől származó nyelvtan adattárhoz a GitHub-on, vagy egy helyi `.js` fájlhoz vezető útvonal. |
| `--ref REF` | A highlight.js verzió (cimke), ág vagy végleges. Alapértelmezése a verzió a `package-lock.json` -ben. A linkek az a verzió a linkből. |
| `--id ID` | A nyelv `id`. Alapértelmezése a nyelvfájl neve. |
| `--label TEXT` | Név a listában és a jelvényen. Alapértelmezése a `Language:` a nyelvtanból. |
| `--hint TEXT` | Szürke megjegyzés a listában. |
| `--keywords TEXT` | Szóközzel elválasztott keresőszavak. Alapértelmezése: a nyelvtan aliasai. |
| `--npm` | A kód másolata helyett írjon egy rövid fájlt, amely a highlight.js npm csomagra hivatkozik. Csak a highlight.js saját nyelvei számára. |
| `--force` | A meglévő fájlok felülírása. |
| `--dry-run` | Mutasd, mi volna megtéve módosítás nélkül. |
| `--list [WORD]` | Listázza a highlight.js nyelvek és harmadik féltől származó nyelvtanok, opcionálisan szóval szűrve. |
| `--prune` | Törölje a `_vendor/` -ben azokat a fájlokat, amelyeket már nem importál semmilyen nyelv. |


**Másolat vagy `--npm`?** A másolat megmutatja a szabályokat közvetlenül a fájlban: szerkesztheti őket, vesz egy újabb nyelvtant, mint a telepített csomag, vagy egy harmadik féltől. A másolat nem változik, amikor a bővítmény a highlight.js-t frissíti; hogy frissítse, konvertálja újra a nyelvet a `--force` segítségével. A `--npm` -vel készült fájl néhány sor hosszú, és a nyelvtana a bővítménnyel frissül.

## Felépítés és alkalmazás

```sh
sh highlight/_compile.sh
```

- A Docker-t igényli (az építés egy `node:20-alpine` konténerben fut) vagy, ha nincs Docker, a Node.js 18+ ugyanazon a gépen. Az első futáson a parancsfájl az npm csomagokat a bővítmény `node_modules/` mappájára telepíti.
- Először a parancsfájl ellenőrzi az egyes nyelveket: felépíti azokat külön-külön, betölti, ugyanabba a motorba regisztrálja, amely a böngészőben fut, és egy mintaszöveget emel ki. Ha egy nyelv megtörött (a kódban hiba van, egy érvénytelen reguláris kifejezés, már egy `id` ), a parancsfájl név a fájl és az ok és leáll; az előző `tiptap_highlight.js` már nyomtalanul marad.
- Akkor a parancsfájl összes nyelveket `assets/javascripts/tiptap_highlight.js` -ba egyesíti.

Az építés után indítsa újra a Redmine-t: az indításkor tehát a bővítményfájlokat (lásd az "Frissítés" részt az [fő README](../../docs/README.hu.md#frissítés) -ben a parancsok). A böngészők azonnal az új fájlt kapják meg, mert az URL-je a tartalom ujjlenyomatát tartalmazza.

Ha a Redmine szerver sem Docker sem Node.js, építse meg bármely olyan gépen, amelyik az egyikkel rendelkezik (a bővítménymappa másolata elegendő), és helyezze az `assets/javascripts/tiptap_highlight.js` eredményt a szerverre.

## A nyelvek eltávolítása

Töröljék a nyelvfájlt a `highlight/` -ből, építsen, és indítsa újra a Redmine-t. A mentett blokkok ebben a nyelvben maradnak és egyszerű szöveggé válnak. Az már többé nem szükséges fájlokat `_vendor/` -ben eltávolítják a:

```sh
python3 highlight/_convert_grammar.py --prune
```

## Saját nyelvtanok és szerkesztési szabályok

- A nyelvtan egy olyan funkció, amely egy `hljs` objektumot fogad és egy nyelvdefiníciót ad vissza: mely szövegrészeket kell kiemelni és hogyan. Útmutató: https://highlightjs.readthedocs.io/en/latest/language-guide.html, referencia: https://highlightjs.readthedocs.io/en/latest/mode-reference.html. Példák: `log.js`, `journalctl.js`, `cisco-ios.js`.
- A highlight.js egy nyelvének az összes reguláris kifejezéseit összekapcsolja, és figyelmen kívül hagyja a saját jelöléseit. Tehát a nagybetű-kisbetű nélküli kereséseknek fel kell sorolni (`[Ee]rror`) vagy az egész nyelvhez engedélyezni kell a `case_insensitive: true`-val.
- Az szabványos token osztályok (`keyword`, `string`, `number`, `comment`, `title`, `attr`, `variable`, `built_in`, `literal`, `meta`, `symbol`, `type` és így tovább): már vannak színei. A saját osztálya (például `scope: 'log-error'` az `hljs-log-error` osztályt állít elő) szükség egy szabályra a `assets/stylesheets/src/06_code.css`-ben és egy CSS újraépítésre (`assets/stylesheets/src/_build.sh`).
- Ahhoz, hogy egy kész nyelvtant másik nevet alatt kínáljunk, tegyük, ahogy a `cmd.js` csinálja: az eredeti nyelvtant hívjuk, és megváltoztatjuk az eredmény `name` és `aliases`. Ha az aliasok nem helyettesítik az új nyelv az eredetit veszi az eredeti.

## A bővítmény frissítése, ha nyelveket adott hozzá

A git a `highlight/` mappájában a fájlokat magára hagyja. De az `assets/javascripts/tiptap_highlight.js` az új bővítmény verzióban a nyelvek nélkül épül, és az építés a `git pull` útban van. Szóval:

```sh
cd /path/to/redmine/plugins/redmine_tiptap
git checkout -- assets/javascripts/tiptap_highlight.js
git pull
sh highlight/_compile.sh
```

Az első parancs eldobja az építést, az utolsó építi fel a nyelveket újra, beleértve az Önét is. Majd indítsa újra a Redmine-t. Ha szerkesztette a bővítménnyel szállított nyelvfájlokat, a git felkérheti az ütközések feloldásra.

Ha a bővítmény egy archívumból települt, mentse meg a nyelvfájlokat és a `_vendor/` mappát a bővítménymappa helyettesítése előtt, helyezze vissza később, és építse fel a nyelveket.

## Méret

Minden nyelv egy fájlba van egyesítve; a böngésző egyszer letölti, majd a gyorsítótárból veszi. Jelenleg 226 KB 52 nyelvhez. Legtöbb nyelvek 1–10 KB-ot foglalnak, a legnagyobb az 1C (55 KB).
