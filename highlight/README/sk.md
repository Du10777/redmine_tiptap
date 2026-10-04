# Zvýrazňovanie syntaxe: jazyky

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

> *Tento preklad bol vytvorený s pomocou modelu AI a nebol skontrolovaný rodným hovorcou. Ak nájdete chybu, prosím [otvorte problém alebo pull request](https://github.com/Du10777/redmine_tiptap).*

Bloky kódu sú zvýrazňované tak v editore, ako aj na uložených stránkach (úlohy, poznámky, wiki) a vyzerajú rovnako v oboch. Jazyk bloku sa vybiera z odznaču v pravom hornom rohu. Zoznam jazykov je definovaný súbormi v zložke `highlight/`: jeden súbor je jeden jazyk.

Plugin sa dodáva s 52 jazykmi. Môžete pridať ďalšie: preveďte hotovú gramatiku highlight.js skriptom (pozri [Pridanie jazyka z highlight.js](#pridanie-jazyka-z-highlightjs)) alebo napíšte svoju vlastnú.

## Ako to funguje

- Zvýrazňovanie vykonáva [highlight.js](https://highlightjs.org) (prostredníctvom [lowlight](https://github.com/wooorm/lowlight)). Editor a uložené stránky používajú rovnaký engine, takže sa farby zhodujú.
- `_compile.sh` zbalí všetky súbory jazyka do jedného súboru, `assets/javascripts/tiptap_highlight.js`. Tento súbor je už zabudovaný v úložisku, takže inštalácia pluginu nevyžaduje žiadne zostavenie. Potrebujete ho vytvoriť iba v prípade, že zmeníte sadu jazykov.
- Redmine načítava `tiptap_highlight.js` na každej stránke pred editorom (`tiptap_bundle.js`). Pri načítaní si editor zaregistruje všetky jazyky z tohto súboru.
- V editore sa blok znovu zvýrazní 50 ms po tom, ako prestanete písať, a iba blok, ktorý sa zmenil. Na uložených stránkach sa blok zvýrazní pri posune do zobrazenia. Blok vnútri zbalené sekcie sa zvýrazní pri otvorení sekcie.
- Jazyk je uložený v uloženej HTML: `<pre><code class="language-<id>">`. Preto sa `id` jazyka nikdy nesmie zmeniť: bloky uložené so starým `id` by sa zmenili na čistý text.
- Neexistuje automatické rozpoznávanie jazyka: blok bez jazyka sa zobrazuje ako čistý text. Rovnako tak blok, ktorého jazyk nie je v `highlight/` (napríklad bol odstránený súbor jazyka); jeho odznaču stále zobrazuje `id`. Ak sa súbor jazyka vráti, vrátia sa aj farby.
- Farby. highlight.js označuje text triedami, ako sú `hljs-keyword`, `hljs-string`, `hljs-comment`. Ich farby sú nastavené v `assets/stylesheets/src/06_code.css` pomocou palety vlastného zvýrazňovania syntaxe Redmine.

## Súbor jazyka

Napríklad `routeros.js`:

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

| Pole | Povinné | Čo to je |
|---|---|---|
| `id` | áno | Názov jazyka v uloženej HTML (`class="language-<id>"`). Povolené znaky: `a-z`, `0-9`, `-`, `_`. **Nikdy ho po uložení blokov s týmto jazykom neměňte.** |
| `label` | nie | Názov v zozname jazykov a na odznaču bloku. Predvolené nastavenie je `id`. |
| `hint` | nie | Šedá poznámka vedľa názvu v zozname. |
| `keywords` | nie | Ďalšie slová pre vyhľadávanie v zozname, oddelené medzerami. |
| `grammar` | áno | Gramatika highlight.js: funkcia `(hljs) => language definition`. |

`label`, `hint` a `keywords` sú v angličtine. Ak chcete jazyk zobraziť v rozhraní pod iným názvom v jazyku používateľa, alebo aby bol vyhľadateľný slovami daného jazyka, pridajte záznam do súboru prekladu daného jazyka, `config/locales/<code>.yml`, pod `code_languages:`. Slová tam sú pridané do `keywords`; `label` a `hint` nahrádzajú tie zo súboru jazyka. `config/locales/ru.yml` má príklady, pravidlá sú v [config/locales/README.md](../../config/locales/README.md).

Druhy súborov v zložke:

- **Krátky.** Odkaz na gramatiku z balíčka npm highlight.js, ako je v príklade vyššie; väčšina jazykov je takto. Gramatika pochádza z verzie highlight.js zaznamenanej v `package-lock.json` pluginu.
- **Úplná kópia.** Kód gramatiky je v samotnom súbore a môže sa upravovať. Tieto súbory sú vytvorené skriptom konverzie (pozri nižšie).
- **Vlastná gramatika.** `log.js`, `journalctl.js`, `cisco-ios.js`; ich zdieľané časti sú v `_common.js`.
- **Obal.** Hotová gramatika pod iným názvom: `cmd.js` je `dos` z highlight.js, `docker-compose.js` je `yaml`.

Súbory a zložky, ktorých názvy sa začínajú na `_`, nie sú jazyky:

- `_compile.sh` staví jazyky;
- `_check.mjs` kontroluje jazyky počas stavby;
- `_common.js` obsahuje zdieľané časti vlastných gramatík pluginu;
- `_convert_grammar.py` je skript, ktorý konvertuje gramatiky highlight.js (pozri nižšie);
- `_vendor/` obsahuje súbory importované konvertovanými gramatikami (vytvorené skriptom konverzie).

Zložka `README/` obsahuje túto dokumentáciu.

## Pridanie jazyka z highlight.js

Hotové gramatiky (viac ako 190) sú tu: https://github.com/highlightjs/highlight.js/tree/main/src/languages. Ich názvy a aliasy sú uvedené v [SUPPORTED_LANGUAGES.md](https://github.com/highlightjs/highlight.js/blob/main/SUPPORTED_LANGUAGES.md), spolu so viac ako sto gramatikami tretích strán v samostatných úložiskách. Skript `_convert_grammar.py` v tejto zložke konvertuje ktorýkôľvek z nich do formátu pluginu.

Skript potrebuje Python 3.6+ (bez ďalších balíčkov) a prístup na github.com. Spusťte ho zo zložky pluginu:

```sh
cd /path/to/redmine/plugins/redmine_tiptap
python3 highlight/_convert_grammar.py erlang
sh highlight/_compile.sh
```

Argument `erlang` je názov súboru v `src/languages` bez `.js`. Druhý príkaz staví jazyky a kontroluje ich. Potom restartujte Redmine (pozri [Stavba a aplikácia](#stavba-a-aplikácia)). Na Windows použite `py` alebo `python` namiesto `python3`.

Príklady:

```sh
# zoznam jazykov highlight.js (* = už v highlight/), voliteľne filtrovaný slovom
python3 highlight/_convert_grammar.py --list
python3 highlight/_convert_grammar.py --list sql

# niekoľko jazykov naraz
python3 highlight/_convert_grammar.py erlang nix fsharp

# vlastný názov, nápovedu a hľadané slová (jeden jazyk naraz)
python3 highlight/_convert_grammar.py erlang --label "Erlang/OTP" --hint BEAM --keywords "erl otp"

# nahraďte krátky súbor dodaný s pluginom upraviteľnou úplnou kópiou
python3 highlight/_convert_grammar.py routeros --force --label RouterOS --hint MikroTik --keywords mikrotik

# jazyk, ktorý zatiaľ nie je v vydanej verzii highlight.js, z vývojovej vetvy
python3 highlight/_convert_grammar.py odin --ref main

# odkaz na súbor gramatiky priamo z panela adries prehliadača
python3 highlight/_convert_grammar.py https://github.com/highlightjs/highlight.js/blob/main/src/languages/odin.js

# gramatika tretej strany: odkaz na jej úložisko, skript nájde súbor gramatiky
python3 highlight/_convert_grammar.py https://github.com/highlightjs/highlightjs-terraform

# miestny súbor gramatiky
python3 highlight/_convert_grammar.py ~/grammars/mylang.js --id mylang

# krátky súbor odkazujúci na balíček npm namiesto kópie kódu
python3 highlight/_convert_grammar.py erlang --npm

# show what would be done without changing anything
python3 highlight/_convert_grammar.py erlang --dry-run
```

### Čo skript robí

1. Stáhne `src/languages/<name>.js` verzie highlight.js, na ktorej plugin beží. Verzia sa číta z `package-lock.json` (aktuálne 11.12.0), pretože gramatiky sú napísané pre engine ich vlastnej verzie. `--ref` vyberie inú verziu, vetvu alebo commit.
2. Vezme názov jazyka z riadku `Language:` záhlavia gramatiky a hľadané slová z jej aliasov (`aliases`). `id` je meno súboru gramatiky.
3. Vloží kód gramatiky do `highlight/<id>.js` bez zmeny okrem exportu: `export default function(hljs)` sa stane `function grammar(hljs)`, a objektu jazyka `export default { id, label, keywords, grammar }` sa pripojí na konci súboru. Ak je gramatika modulom CommonJS (`module.exports = ...`), riadok deklarujúci `module` a `exports` sa pridá na začiatok.
4. Ak gramatika importuje ďalšie súbory, stáhne ich do `highlight/_vendor/<source>-<version>/` pod rovnakými cestami ako v úložisku a nasmeruje importy tam. Napríklad `typescript` importuje `javascript.js` a `lib/ecmascript.js`. Tieto súbory sú zdieľané všetkými jazykmi z rovnakého zdroja a verzie; nie je potrebné ich upravovať.
5. Kontroluje riadok `Requires:`, ktorý obsahuje zoznam jazykov použitých pre vložený kód (napríklad `php-template` potrebuje `xml` a `php`). Ak nie sú v `highlight/`, vytlačí príkaz, ktorý ich pridá. Bez nich vložený kód jednoducho zostane bez farieb; nie je to chyba.
6. Neprepíše existujúce súbory bez `--force` a neberie `id` už používaný iným súborom.

Po konverzii je možné jazyk upravovať priamo v jeho súbore.

### Možnosti

| Možnosť | Čo to robí |
|---|---|
| `LANGUAGE ...` | Názov jazyka highlight.js, odkaz na súbor gramatiky alebo na úložisko gramatiky tretej strany na GitHube, alebo cesta k miestnemu súboru `.js`. |
| `--ref REF` | Verzia highlight.js (tag), vetva alebo commit. Predvolené nastavenie je verzia v `package-lock.json`. Pre odkazy je verzia prevzatá z odkazu. |
| `--id ID` | Jazyk `id`. Predvolené nastavenie je meno súboru gramatiky. |
| `--label TEXT` | Názov v zozname a na odznaču. Predvolené nastavenie je `Language:` z gramatiky. |
| `--hint TEXT` | Šedá poznámka v zozname. |
| `--keywords TEXT` | Hľadané slová oddelené medzerami. Predvolené nastavenie: aliasy gramatiky. |
| `--npm` | Namiesto kópie kódu napíšte krátky súbor odkazujúci na balíček npm highlight.js. Iba pre jazyky samotného highlight.js. |
| `--force` | Nahraďte existujúce súbory. |
| `--dry-run` | Ukážte, čo by sa urobilo bez zmeny čohokoľvek. |
| `--list [WORD]` | Zoznam jazykov highlight.js a gramatík tretích strán, voliteľne filtrovaný slovom. |
| `--prune` | Odstraňte súbory v `_vendor/`, ktoré už žiadny jazyk neimportuje. |


**Kópia alebo `--npm`?** Kópia zobrazuje pravidlá priamo v súbore: môžete ich upravovať, vziať si gramatiku novšiu ako inštalovaný balíček, alebo gramatiku tretej strany. Kópia sa nezmení, keď plugin aktualizuje highlight.js; aby ste ju obnovili, konvertujte jazyk znovu s `--force`. Súbor vytvorený s `--npm` má niekoľko riadkov a jeho gramatika sa aktualizuje spolu s pluginom.

## Stavba a aplikácia

```sh
sh highlight/_compile.sh
```

- Potrebuje Docker (stavba beží v kontejneri `node:20-alpine`) alebo, ak tam nie je Docker, Node.js 18+ na rovnakom stroji. Pri prvom spustení skript nainštaluje balíčky npm do zložky `node_modules/` pluginu.
- Najskôr skript kontroluje každý jazyk: staví ho zvlášť, načítava ho, zaregistruje ho v rovnakom enginu, ktorý beží v prehliadači, a zvýrazní vzorový text. Ak je jazyk poškodený (chyba v kóde, neplatný regulárny výraz, `id` už obsadený), skript pomenuje súbor a dôvod a zastaví sa; predchádzajúci `tiptap_highlight.js` zostane na mieste.
- Potom skript zbalí všetky jazyky do `assets/javascripts/tiptap_highlight.js`.

Po stavbe restartujte Redmine: publikuje súbory pluginu pri spustení (pozri "Aktualizácia" v [hlavnom README](../../docs/README.sk.md#aktualizácia) pre príkazy). Prehliadače dostávajú nový súbor hneď, pretože jeho URL obsahuje otisk obsahu.

Ak server Redmine nemá ani Docker, ani Node.js, staňte ho na ľubovoľnom stroji, ktorý jeden z nich má (kópia zložky pluginu je dostačujúca), a umiestnite výsledný `assets/javascripts/tiptap_highlight.js` na server.

## Odstránenie jazyka

Odstráňte súbor jazyka z `highlight/`, staňte a restartujte Redmine. Uložené bloky v tomto jazyku zostávajú tak, ako sú, a zobrazujú sa ako čistý text. Súbory v `_vendor/`, ktoré už nie sú potrebné, sa odstraňujú pomocou:

```sh
python3 highlight/_convert_grammar.py --prune
```

## Vlastné gramatiky a pravidlá úprav

- Gramatika je funkcia, ktorá prijíma objekt `hljs` a vracia definíciu jazyka: ktoré kusy textu označiť a ako. Sprievodca: https://highlightjs.readthedocs.io/en/latest/language-guide.html, referencia: https://highlightjs.readthedocs.io/en/latest/mode-reference.html. Príklady: `log.js`, `journalctl.js`, `cisco-ios.js`.
- highlight.js spája regulárne výrazy všetkých pravidiel jazyka do jedného a ignoruje ich vlastné príznaky. Takže párovanie bez ohľadu na veľkosť písmen musí byť napísané (`[Ee]rror`) alebo povolené pre celý jazyk s `case_insensitive: true`.
- Uprednostňujte štandardné triedy tokenov (`keyword`, `string`, `number`, `comment`, `title`, `attr`, `variable`, `built_in`, `literal`, `meta`, `symbol`, `type` atd.): už majú farby. Vlastná trieda (napríklad `scope: 'log-error'` vytváriaca triedu `hljs-log-error`) potrebuje pravidlo v `assets/stylesheets/src/06_code.css` a prestavbu CSS (`assets/stylesheets/src/_build.sh`).
- Ak chcete ponúknuť hotovú gramatiku pod iným názvom, postupujte, ako `cmd.js`: volejte pôvodnú gramatiku a zmeňte `name` a `aliases` v jej výsledku. Ak aliasy nie sú nahradené, nový jazyk si ich vezme z originálu.

## Aktualizácia pluginu, keď ste pridali jazyky

git nechá súbory v `highlight/` na pokoji. Ale `assets/javascripts/tiptap_highlight.js` v novej verzii pluginu je postavený bez vašich jazykov a vaša stavba tohto súboru bráni `git pull`. Takže:

```sh
cd /path/to/redmine/plugins/redmine_tiptap
git checkout -- assets/javascripts/tiptap_highlight.js
git pull
sh highlight/_compile.sh
```

Prvý príkaz zahodí vašu stavbu, posledný staví jazyky znovu, vrátane vašich. Potom restartujte Redmine. Ak ste upravili súbory jazykov dodaného pluginu, git vás môže požiadať o vyriešenie konfliktov v nich.

Ak bol plugin nainštalovaný z archívu, uložte súbory vášho jazyka a zložku `_vendor/` pred nahradením zložky pluginu, vložte ich späť potom a staňte jazyky.

## Veľkosť

Všetky jazyky sú zbalené do jedného súboru; prehliadač ho stáhne raz a potom si ho vezme z vyrovnávacej pamäte. Aktuálne je to 226 KB pre 52 jazykov. Väčšina jazykov zaberá 1–10 KB, najväčší je 1C (55 KB).
