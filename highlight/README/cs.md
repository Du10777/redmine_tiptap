# Zvýrazňování syntaxe: jazyky

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

> *Tento překlad byl vytvořen s pomocí modelu AI a nebyl přezkoumán rodilým mluvčím. Pokud najdete chybu, prosím [otevřete problém nebo pull request](https://github.com/Du10777/redmine_tiptap).*

Bloky kódu jsou zvýrazněny jak v editoru, tak na uložených stránkách (úkoly, poznámky, wiki) a vypadají stejně v obou. Jazyk bloku se vybírá z odznáčku v pravém horním rohu. Seznam jazyků je definován soubory ve složce `highlight/`: jeden soubor je jeden jazyk.

Plugin se dodává s 52 jazyky. Můžete přidat další: převeďte hotovou gramatiku highlight.js skriptem (viz [Přidání jazyka z highlight.js](#přidání-jazyka-z-highlightjs)) nebo napsejte svůj vlastní.

## Jak to funguje

- Zvýrazňování provádí [highlight.js](https://highlightjs.org) (prostřednictvím [lowlight](https://github.com/wooorm/lowlight)). Editor a uložené stránky používají stejný engine, takže se barvy shodují.
- `_compile.sh` sbalí všechny soubory jazyka do jednoho souboru, `assets/javascripts/tiptap_highlight.js`. Tento soubor je již zabudován v úložišti, takže instalace pluginu nevyžaduje žádné sestavení. Potřebujete jej postavit pouze v případě, že změníte sadu jazyků.
- Redmine načítá `tiptap_highlight.js` na každé stránce před editorem (`tiptap_bundle.js`). Při načtení si editor zaregistruje všechny jazyky z tohoto souboru.
- V editoru se blok znovu zvýrazní 50 ms poté, co byste přestali psát, a pouze blok, který se změnil. Na uložených stránkách se blok zvýrazní při posunu do zobrazení. Blok uvnitř sbalené sekce se zvýrazní při otevření sekce.
- Jazyk je uložen v uloženém HTML: `<pre><code class="language-<id>">`. Proto se `id` jazyka nesmí nikdy změnit: bloky uložené se starým `id` by se změnily na prostý text.
- Neexistuje automatické rozpoznávání jazyka: blok bez jazyka se zobrazuje jako prostý text. Stejně tak blok, jehož jazyk není v `highlight/` (například byl odstraněn soubor jazyka); jeho odznáček stále zobrazuje `id`. Pokud se soubor jazyka vrátí, vrátí se i barvy.
- Barvy. highlight.js označuje text třídami, jako jsou `hljs-keyword`, `hljs-string`, `hljs-comment`. Jejich barvy jsou nastaveny v `assets/stylesheets/src/06_code.css` pomocí palety vlastního zvýrazňování syntaxe Redmine.

## Soubor jazyka

Například `routeros.js`:

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

| Pole | Povinné | Co to je |
|---|---|---|
| `id` | ano | Název jazyka v uloženém HTML (`class="language-<id>"`). Povolené znaky: `a-z`, `0-9`, `-`, `_`. **Nikdy jej po uložení bloků s tímto jazykem neměňte.** |
| `label` | ne | Název v seznamu jazyků a na odznáčku bloku. Výchozí nastavení je `id`. |
| `hint` | ne | Šedá poznámka vedle názvu v seznamu. |
| `keywords` | ne | Další slova pro vyhledávání v seznamu, oddělena mezerami. |
| `grammar` | ano | Gramatika highlight.js: funkce `(hljs) => language definition`. |

`label`, `hint` a `keywords` jsou v angličtině. Chcete-li jazyk zobrazit v rozhraní pod jiným názvem v jazyce uživatele, nebo aby byl vyhledatelný slovy daného jazyka, přidejte záznam do souboru překladu daného jazyka, `config/locales/<code>.yml`, pod `code_languages:`. Slova tam jsou přidána do `keywords`; `label` a `hint` nahrazují ty ze souboru jazyka. `config/locales/ru.yml` má příklady, pravidla jsou v [config/locales/README.md](../../config/locales/README.md).

Druhy souborů ve složce:

- **Krátký.** Odkaz na gramatiku z balíčku npm highlight.js, jak je v příkladu výše; většina jazyků je takto. Gramatika pochází z verze highlight.js zaznamenaného v `package-lock.json` pluginu.
- **Úplná kopie.** Kód gramatiky je v souboru samotném a lze jej editovat. Tyto soubory jsou vytvořeny skriptem konverze (viz níže).
- **Vlastní gramatika.** `log.js`, `journalctl.js`, `cisco-ios.js`; jejich sdílené části jsou v `_common.js`.
- **Obal.** Hotová gramatika pod jiným názvem: `cmd.js` je `dos` z highlight.js, `docker-compose.js` je `yaml`.

Soubory a složky, jejichž názvy začínají na `_`, nejsou jazyky:

- `_compile.sh` staví jazyky;
- `_check.mjs` kontroluje jazyky během stavby;
- `_common.js` obsahuje sdílené části vlastních gramatik pluginu;
- `_convert_grammar.py` je skript, který konvertuje gramatiky highlight.js (viz níže);
- `_vendor/` obsahuje soubory importované konvertovanými gramatikami (vytvořeny skriptem konverze).

Složka `README/` obsahuje tuto dokumentaci.

## Přidání jazyka z highlight.js

Hotové gramatiky (více než 190) jsou zde: https://github.com/highlightjs/highlight.js/tree/main/src/languages. Jejich názvy a aliasy jsou uvedeny v [SUPPORTED_LANGUAGES.md](https://github.com/highlightjs/highlight.js/blob/main/SUPPORTED_LANGUAGES.md), spolu se více než sto gramatikami třetích stran v samostatných úložištích. Skript `_convert_grammar.py` v této složce konvertuje kterýkoli z nich do formátu pluginu.

Skript potřebuje Python 3.6+ (bez dalších balíčků) a přístup ke github.com. Spusťte jej z složky pluginu:

```sh
cd /path/to/redmine/plugins/redmine_tiptap
python3 highlight/_convert_grammar.py erlang
sh highlight/_compile.sh
```

Argument `erlang` je název souboru v `src/languages` bez `.js`. Druhý příkaz staví jazyky a kontroluje je. Poté restartujte Redmine (viz [Stavba a aplikace](#stavba-a-aplikace)). Na Windows použijte `py` nebo `python` místo `python3`.

Příklady:

```sh
# seznam jazyků highlight.js (* = již v highlight/), volitelně filtrovaný slovem
python3 highlight/_convert_grammar.py --list
python3 highlight/_convert_grammar.py --list sql

# několik jazyků najednou
python3 highlight/_convert_grammar.py erlang nix fsharp

# vlastní název, nápověda a hledaná slova (jeden jazyk najednou)
python3 highlight/_convert_grammar.py erlang --label "Erlang/OTP" --hint BEAM --keywords "erl otp"

# nahraďte krátký soubor dodaný s pluginem upravitelnou úplnou kopií
python3 highlight/_convert_grammar.py routeros --force --label RouterOS --hint MikroTik --keywords mikrotik

# jazyk, který ještě není v vydané verzi highlight.js, z větve vývoje
python3 highlight/_convert_grammar.py odin --ref main

# odkaz na soubor gramatiky přímo z panelu adres prohlížeče
python3 highlight/_convert_grammar.py https://github.com/highlightjs/highlight.js/blob/main/src/languages/odin.js

# gramatika třetí strany: odkaz na její úložiště, skript najde soubor gramatiky
python3 highlight/_convert_grammar.py https://github.com/highlightjs/highlightjs-terraform

# místní soubor gramatiky
python3 highlight/_convert_grammar.py ~/grammars/mylang.js --id mylang

# krátký soubor odkazující na balíček npm místo kopie kódu
python3 highlight/_convert_grammar.py erlang --npm

# show what would be done without changing anything
python3 highlight/_convert_grammar.py erlang --dry-run
```

### Co skript dělá

1. Stáhne `src/languages/<name>.js` verze highlight.js, na které plugin běží. Verze se čte z `package-lock.json` (aktuálně 11.12.0), protože gramatiky jsou psány pro engine jejich vlastní verze. `--ref` vybírá jinou verzi, větev nebo commit.
2. Vezme název jazyka z řádku `Language:` záhlaví gramatiky a hledaná slova z jejích aliasů (`aliases`). `id` je jméno souboru gramatiky.
3. Vloží kód gramatiky do `highlight/<id>.js` beze změny s výjimkou exportu: `export default function(hljs)` se stane `function grammar(hljs)`, a objekt jazyka `export default { id, label, keywords, grammar }` se připojí na konci souboru. Pokud je gramatika modulem CommonJS (`module.exports = ...`), řádek deklarující `module` a `exports` se přidá na začátek.
4. Pokud gramatika importuje další soubory, stáhne je do `highlight/_vendor/<source>-<version>/` pod stejnými cestami jako v úložišti a nasměruje importy tam. Například `typescript` importuje `javascript.js` a `lib/ecmascript.js`. Tyto soubory jsou sdíleny všemi jazyky ze stejného zdroje a verze; není potřeba je editovat.
5. Kontroluje řádek `Requires:`, který obsahuje seznam jazyků použitých pro vložený kód (například `php-template` potřebuje `xml` a `php`). Pokud nejsou v `highlight/`, vytiskne příkaz, který je přidá. Bez nich vložený kód jednoduše zůstane bez barev; není to chyba.
6. Nepřepíše existující soubory bez `--force` a nebere `id` již používaný jiným souborem.

Po konverzi lze jazyk editovat přímo v jeho souboru.

### Možnosti

| Možnost | Co to dělá |
|---|---|
| `LANGUAGE ...` | Název jazyka highlight.js, odkaz na soubor gramatiky nebo na úložiště gramatiky třetí strany na GitHubu, nebo cesta k místnímu souboru `.js`. |
| `--ref REF` | Verze highlight.js (tag), větev nebo commit. Výchozí nastavení je verze v `package-lock.json`. Pro odkazy je verze převzata z odkazu. |
| `--id ID` | Jazyk `id`. Výchozí nastavení je jméno souboru gramatiky. |
| `--label TEXT` | Název v seznamu a na odznáčku. Výchozí nastavení je `Language:` z gramatiky. |
| `--hint TEXT` | Šedá poznámka v seznamu. |
| `--keywords TEXT` | Hledaná slova oddělená mezerami. Výchozí nastavení: aliasy gramatiky. |
| `--npm` | Místo kopie kódu napište krátký soubor odkazující na balíček npm highlight.js. Pouze pro jazyky samotného highlight.js. |
| `--force` | Nahraďte existující soubory. |
| `--dry-run` | Ukažte, co by bylo provedeno, aniž byste cokoliv měnili. |
| `--list [WORD]` | Seznam jazyků highlight.js a gramatik třetích stran, volitelně filtrovaný slovem. |
| `--prune` | Odstraňte soubory v `_vendor/`, které již žádný jazyk neimportuje. |


**Kopie nebo `--npm`?** Kopie zobrazuje pravidla přímo v souboru: můžete je editovat, vzít gramatiku novější než instalovaný balíček, nebo gramatiku třetí strany. Kopie se nezmění, když plugin aktualizuje highlight.js; abyste ji obnovili, konvertujte jazyk znovu s `--force`. Soubor vytvořený s `--npm` má několik řádků a jeho gramatika se aktualizuje spolu s pluginem.

## Stavba a aplikace

```sh
sh highlight/_compile.sh
```

- Potřebuje Docker (stavba běží v kontejneru `node:20-alpine`) nebo, pokud tam není Docker, Node.js 18+ na stejném stroji. Při prvním spuštění skript nainstaluje balíčky npm do složky `node_modules/` pluginu.
- Nejprve skript kontroluje každý jazyk: staví jej zvlášť, načítá jej, zaregistruje jej ve stejném enginu, který běží v prohlížeči, a zvýrazní vzorový text. Pokud je jazyk poškozen (chyba v kódu, neplatný regulární výraz, `id` již obsazený), skript pojmenuje soubor a důvod a zastaví se; předchozí `tiptap_highlight.js` zůstane na místě.
- Poté skript sbalí všechny jazyky do `assets/javascripts/tiptap_highlight.js`.

Po stavbě restartujte Redmine: publikuje soubory pluginu při spuštění (viz "Aktualizace" v [hlavním README](../../docs/README.cs.md#aktualizace) pro příkazy). Prohlížeče dostávají nový soubor hned, protože jeho URL obsahuje otisk obsahu.

Pokud server Redmine nemá ani Docker, ani Node.js, staňte na libovolném stroji, který jeden z nich má (kopie složky pluginu je dostačující), a umístěte výsledný `assets/javascripts/tiptap_highlight.js` na server.

## Odebrání jazyka

Odstraňte soubor jazyka z `highlight/`, staňte a restartujte Redmine. Uložené bloky v tomto jazyce zůstávají tak, jak jsou, a zobrazují se jako prostý text. Soubory v `_vendor/`, které již nejsou potřebné, se odstraňují pomocí:

```sh
python3 highlight/_convert_grammar.py --prune
```

## Vlastní gramatiky a editační pravidla

- Gramatika je funkce, která přijímá objekt `hljs` a vrací definici jazyka: které kusy textu označit a jak. Průvodce: https://highlightjs.readthedocs.io/en/latest/language-guide.html, odkaz: https://highlightjs.readthedocs.io/en/latest/mode-reference.html. Příklady: `log.js`, `journalctl.js`, `cisco-ios.js`.
- highlight.js spojuje regulární výrazy všech pravidel jazyka do jednoho a ignoruje jejich vlastní příznaky. Takže párování bez ohledu na velikost písmen musí být zapsáno (`[Ee]rror`) nebo povoleno pro celý jazyk s `case_insensitive: true`.
- Preferujte standardní třídy tokenů (`keyword`, `string`, `number`, `comment`, `title`, `attr`, `variable`, `built_in`, `literal`, `meta`, `symbol`, `type` atd.): již mají barvy. Vlastní třída (například `scope: 'log-error'` vytváří třídu `hljs-log-error`) potřebuje pravidlo v `assets/stylesheets/src/06_code.css` a přestavbu CSS (`assets/stylesheets/src/_build.sh`).
- Chcete-li nabídnout hotovou gramatiku pod jiným názvem, postupujte, jak `cmd.js`: volejte původní gramatiku a změňte `name` a `aliases` v jejím výsledku. Pokud aliasy nejsou nahrazeny, nový jazyk si je vezme z originálu.

## Aktualizace pluginu, když jste přidali jazyky

git nechá soubory v `highlight/` na pokoji. Ale `assets/javascripts/tiptap_highlight.js` v nové verzi pluginu je postaven bez vašich jazyků a vaše stavba tohoto souboru brání `git pull`. Takže:

```sh
cd /path/to/redmine/plugins/redmine_tiptap
git checkout -- assets/javascripts/tiptap_highlight.js
git pull
sh highlight/_compile.sh
```

První příkaz zahodí vaši stavbu, poslední staví jazyky znovu, včetně vašich. Poté restartujte Redmine. Pokud jste editovali soubory jazyků dodaného pluginu, git vás může požádat o vyřešení konfliktů v nich.

Pokud byl plugin nainstalován z archivu, uložte soubory vašeho jazyka a složku `_vendor/` před nahrazením složky pluginu, vložte je zpět poté a staňte jazyky.

## Velikost

Všechny jazyky jsou sbaleny do jednoho souboru; prohlížeč jej stáhne jednou a poté jej vezme z mezipaměti. Aktuálně je to 226 KB pro 52 jazyků. Většina jazyků zabírá 1–10 KB, největší je 1C (55 KB).
