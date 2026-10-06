**Read this in other languages:**
[English](../README.md) ·
[Русский](README.ru.md) ·
[Shqip](README.sq.md) ·
[Azeri](README.az.md) ·
[Bosanski](README.bs.md) ·
[Български](README.bg.md) ·
[Català](README.ca.md) ·
[简体中文](README.zh.md) ·
[繁體中文](README.zh-TW.md) ·
[Hrvatski](README.hr.md) ·
[Čeština](README.cs.md) ·
[Dansk](README.da.md) ·
[Nederlands](README.nl.md) ·
[Eesti](README.et.md) ·
[Suomi](README.fi.md) ·
[Français](README.fr.md) ·
[Galego](README.gl.md) ·
[Deutsch](README.de.md) ·
[Ελληνικά](README.el.md) ·
[Magyar](README.hu.md) ·
[Bahasa Indonesia](README.id.md) ·
[Italiano](README.it.md) ·
[日本語](README.ja.md) ·
[한국어](README.ko.md) ·
[Latviešu](README.lv.md) ·
[lietuvių](README.lt.md) ·
[Монгол](README.mn.md) ·
[Norsk bokmål](README.no.md) ·
[Polski](README.pl.md) ·
[Português](README.pt.md) ·
[Português/Brasil](README.pt-BR.md) ·
[Română](README.ro.md) ·
[Srpski](README.sr-YU.md) ·
[Српски](README.sr.md) ·
[Slovenčina](README.sk.md) ·
[Slovenščina](README.sl.md) ·
[Español](README.es.md) ·
[Svenska](README.sv.md) ·
[ไทย](README.th.md) ·
[Türkçe](README.tr.md) ·
[Українська](README.uk.md) ·
[Tiếng Việt](README.vi.md)

> *Tento překlad byl vytvořen s pomocí modelu AI a nebyl přezkoumán rodilým mluvčím. Pokud najdete chybu, prosím [otevřete problém nebo pull request](https://github.com/Du10777/redmine_tiptap).*

Toto je textový editor pro Redmine založený na TipTap https://github.com/ueberdosis/tiptap

Editor: **TipTap 3.31.4**. Všechny balíčky `@tiptap/*` jsou v `package.json` a `package-lock.json` připnuty na tuto přesnou verzi a musí být vždy aktualizovány společně na stejnou verzi.

**Obsah**

- [Podporované verze Redmine](#podporované-verze-redmine)
- [Funkce](#funkce)
  - [Formátování textu](#formátování-textu)
  - [Seznamy](#seznamy)
  - [Tabulky](#tabulky)
  - [Obrázky a přílohy](#obrázky-a-přílohy)
  - [Kód](#kód)
  - [Bloky](#bloky)
  - [Úpravy](#úpravy)
  - [Integrace s Redmine](#integrace-s-redmine)
- [Zvýrazňování syntaxe](#zvýrazňování-syntaxe)
- [Jazyk rozhraní](#jazyk-rozhraní)
- [Instalace](#instalace)
- [Aktualizace](#aktualizace)
  - [Nainstalováno pomocí git (doporučeno)](#nainstalováno-pomocí-git-doporučeno)
  - [Nainstalováno z archivu](#nainstalováno-z-archivu)
  - [Po aktualizaci](#po-aktualizaci)
- [Migrace z CKEditoru](#migrace-z-ckeditoru)

## Podporované verze Redmine

| Redmine | Podpora | Testováno na |
|---|---|---|
| 7.x | ano | 7.0.2 |
| 6.x | ano | 6.1.4, 6.1.5 |
| 5.x a starší | ne | — |

Nová hlavní verze (8.x a novější) je podporována až poté, co je na ní plugin otestován. Do té doby se Redmine této verze s nainstalovaným pluginem nespustí: zastaví se s chybou, která uvádí podporované verze.

## Funkce

### Formátování textu
- Tučný, kurzíva, podtržení, přeškrtnutí, dolní a horní index (Ctrl+, a Ctrl+.), vložený kód.
- Barva textu a barva pozadí: paleta 64 barev nebo libovolná hex hodnota.
- Rodina písma (13 písem) a velikost písma (přednastavení od 8 do 72 px, nebo libovolná hodnota).
- Styly odstavce: nadpisy 1–6 a normální text.
- Zarovnání (vlevo, ve středu, vpravo, zarovnáno do bloku) a odsazení (až 8 úrovní) odstavců a nadpisů.
- Odkazy: vložení, úpravy, odstranění.
- Vodorovná čára, vrácení zpět a opakování.

### Seznamy
- Seznamy s odrážkami s libovolnými, kruhovými nebo čtvercovými značkami.
- Číslované seznamy: 1, 01, a, A, i, I, α.
- Seznamy úkolů se zaškrtávacími poli; dokončené úkoly jsou přeškrtnuty.
- Vnořené seznamy (Tab / Shift+Tab).

### Tabulky
- Vložení tabulky libovolné velikosti, s hlavičkovým řádkem nebo bez něj.
- Kontextová nabídka v buňce: přidání a odstranění řádků a sloupců, sloučení a rozdělení buněk, hlavičkový řádek a sloupec, odstranění tabulky.
- Šířky sloupců se mění přetažením hranic buněk.
- Vkládání z Excelu zachovává šířky sloupců, zarovnání a velikosti písem; tabulka zkopírovaná z Redmine se vloží do Excelu s okraji.

### Obrázky a přílohy
- Vložení obrázku ze schránky: je nahrán jako příloha a v textu se zobrazuje.
- Obrázky připojené prostřednictvím pole souboru Redmine nebo přetažené do něj se v textu také vloží.
- Vložení obrázku z příloh (výběr miniatur) nebo odkaz na jakoukoli přílohu.
- Změna velikosti obrázku přetažením jeho rohů.

### Kód
- Bloky kódu se zvýrazněním syntaxe v editoru a na uložených stránkách: 52 jazyků a můžete přidat další (viz [Zvýrazňování syntaxe](#zvýrazňování-syntaxe)).
- Jazyk bloku se vybírá z odznáčku v jeho rohu, s vyhledáváním, nedávnými a častými jazyky.
- Tab a Shift+Tab odsazují a oddálují řádky v bloku kódu; tučný text, odkazy a barvy v kódu se zachovávají.

### Bloky
- Sbalitelný blok: název se skrytým obsahem (`<details>`). Sbalený na uložených stránkách, rozbalený v editoru.
- Citační blok s řádkem autora a data.

### Úpravy
- Režim `<HTML>` pro prohlížení a úpravy zdrojového kódu HTML: vnořené bloky jsou odsazeny, prázdný řádek odděluje bloky, které zabírají více řádků, syntaxe se barevně zvýrazňuje podle stejných pravidel jako v bloku kódu HTML a Enter zachovává odsazení řádku.
- Psaní ve stylu Markdown: `#` pro nadpisy, `-` a `1.` pro seznamy, `[ ]` pro úkoly, ```` ```python ```` pro blok kódu (jakýkoli název jazyka nebo žádný), `**bold**`, `---` pro vodorovnou čáru. Standardní klávesové zkratky: Ctrl+B, Ctrl+I, Ctrl+U, Ctrl+Z a další.
- Editor nikdy není vyšší než okno: panel nástrojů a tlačítka formuláře zůstávají v zobrazení a text se posunuje uvnitř. Výška se přizpůsobuje velikosti okna a přiblížení stránky.
- Úchytka pro změnu velikosti v pravém dolním rohu nastavuje výšku ručně. Výška se pamatuje; dvojklik se vrací k automatické výšce.

### Integrace s Redmine
- Funguje ve všech Redmine textových polích s formátováním: popisy úkolů a poznámky, wiki stránky, novinky, příspěvky na fóru, dokumenty, popisy projektů, vlastní pole dlouhého textu, včetně polí, která se na stránce objevují později.
- Text se ukládá jako HTML. Chcete-li editor používat, vyberte *TipTap HTML* jako formátování textu v nastavení Redmine.
- Rozhraní (tipů, nabídek, dialogy) se řídí jazykem v profilu uživatele Redmine. 47 z 50 jazyků Redmine přichází s pluginem: angličtina a ruština jsou kompletní, ostatních 45 jsou návrhy vytvořené s modelem AI, které rád opraví rodilý mluvčí. Tři jazyky psané zprava doleva (arabština, hebrejština, perština) nejsou záměrně podporovány (viz [Jazyk rozhraní](#jazyk-rozhraní)).
- Zůstává rychlý na velkých textech: editory ve skrytých formulářích se vytvoří pouze při otevření formuláře a dlouhé bloky kódu se zvýrazňují při posunu do zobrazení.
- Texty napsané v CKEditoru (plugin redmine_ckeditor) se zobrazují tak, jak byly, a otevírají se v editoru s jejich formátováním: žádná konverze, viz [Migrace z CKEditoru](#migrace-z-ckeditoru).
- Uložené texty se zobrazují bez nebezpečného HTML: skripty, obslužné programy událostí a odkazy `javascript:` se odstraňují při zobrazení stránky, zachovává se pouze to, co vytváří editor. Toto pokrývá texty, které procházejí REST API nebo režimem `<HTML>`.

## Zvýrazňování syntaxe

Bloky kódu se zvýrazňují v editoru i na uložených stránkách. Jazyk bloku se vybírá z odznáčku v pravém horním rohu; seznam má vyhledávací pole a pamatuje si nedávno a často používané jazyky.

52 jazyků přichází s pluginem, mezi nimi HTML, 1C, Cisco IOS, MikroTik RouterOS, Windows cmd, docker compose, protokoly linuxových služeb a výstup journalctl.

Můžete přidat své vlastní jazyky. Každý jazyk je jeden soubor ve složce `highlight/`. Libovolná ze 190+ gramatik highlight.js nebo třetí straně se převede na takový soubor jedním příkazem:

```sh
python3 highlight/_convert_grammar.py erlang
sh highlight/_compile.sh
```

Podrobnosti: [highlight/README/cs.md](../highlight/README/cs.md).

## Jazyk rozhraní

Editor mluví jazykem zvoleným v profilu uživatele Redmine (Můj účet → Jazyk). Soubory pro 47 z 50 jazyků Redmine přicházejí s pluginem v `config/locales/`. Angličtina je zdroj a ruština je od autora; ostatních 45 jsou návrhy vytvořené s pomocí modelu AI a zatím nejsou přezkoumány rodilými mluvčími, proto se očekávají podivné fráze. Text chybějící v souboru se zobrazuje v angličtině.

Chcete-li opravit překlad, změňte jeho hodnoty v `config/locales/<code>.yml` (`de`, `fr`, `pt-BR`, ...) a restartujte Redmine. `bundle exec rake redmine_tiptap:locales` kontroluje soubory. Pull requesty s opravami jsou vítány.

**Jazyky psané zprava doleva (arabština, hebrejština, perština) nejsou záměrně podporovány.** Jejich podpora vyžaduje mnoho změn v základu kódu, nejen překlad, a rozhodli jsme se, aby jsme to neprováděli. Pro tyto jazyky se editor zobrazuje v angličtině a jeho rozložení není upraveno. Pokud potřebujete jeden z nich, udělejte fork: mechanismus překladu je připraven a co dalšího se musí změnit, je uvedeno v [config/locales/README.md](../config/locales/README.md#right-to-left-languages).

Podrobnosti a seznam jazyků Redmine: [config/locales/README.md](../config/locales/README.md).

## Instalace

1. Umístěte plugin do složky `plugins` Redmine. Složka musí být pojmenována `redmine_tiptap`. Nejjednodušší je git, který také umožňuje aktualizace jedním příkazem:
   ```sh
   cd /path/to/redmine
   git clone --branch release --single-branch --depth 1 https://github.com/Du10777/redmine_tiptap.git plugins/redmine_tiptap
   ```
   Větev `release` obsahuje jen soubory, které plugin potřebuje ke svému běhu, bez této dokumentace, a `--depth 1` nestahuje historii repozitáře.
2. Restartujte Redmine.
3. V nastavení Redmine (redmine.selfhosted/_settings_) zvolte Formátování textu: *TipTap HTML*.

## Aktualizace

Plugin nemá migraci databáze a zabudovaný svazek JavaScript a list stylů jsou součástí úložiště. Aktualizace nepotřebuje npm ani sestavení na serveru: nahraďte soubory pluginu a restartujte Redmine.

Před aktualizací zkontrolujte, že nová verze podporuje vaši verzi Redmine (viz výše "Podporované verze Redmine").

### Nainstalováno pomocí git (doporučeno)

```sh
cd /path/to/redmine/plugins/redmine_tiptap
git pull
```

Poté restartujte Redmine, například:

```sh
sudo systemctl restart redmine          # Redmine běžící jako služba systemd
touch /path/to/redmine/tmp/restart.txt  # Passenger
docker compose restart redmine          # Docker
```

Chcete-li zůstat na konkrétní verzi místo nejnovější, stáhněte commit větve `release` a přepněte se na něj: `git fetch --depth 1 origin <commit> && git checkout <commit>`.

Pokud byl plugin nainstalován obyčejným `git clone` (větev `main`, s dokumentací a celou historií), přejděte jednou na větev `release`: smažte složku `plugins/redmine_tiptap` a nainstalujte plugin znovu podle oddílu [Instalace](#instalace). Plugin ve své složce neuchovává nic vlastního, takže se nic neztratí; jen jazyky zvýrazňování kódu, které jste přidali sami, nejprve zkopírujte z `highlight/`.

### Nainstalováno z archivu

1. Stáhněte archiv větve `release`: https://github.com/Du10777/redmine_tiptap/archive/refs/heads/release.zip. Smažte starou složku `plugins/redmine_tiptap` a rozbalte archiv na její místo; složka v archivu se jmenuje `redmine_tiptap-release`, přejmenujte ji na `redmine_tiptap`. Smazání předem zajistí, že nezůstanou soubory, které nová verze už nemá.
2. Odstraňte `public/assets/.manifest.json` v složce Redmine.
3. Restartujte Redmine.

Krok 2 je důležitý. Při spuštění Redmine znovu publikuje prostředky pluginu pouze v případě, že jejich soubory jsou novější než tento manifest. Soubory rozbalené z archivu si zachovávají původní časové značky, takže bez kroku 2 může Redmine dále sloužit starý editor. Manifest se automaticky znovu vytvoří při spuštění. S `git pull` není tento krok potřebný: git dává změněným souborům aktuální čas.

### Po aktualizaci

- Skript a list stylů editoru se poskytují s otiskem obsahu v jejich URL, takže prohlížeče po restartování načtou novou verzi. Uživatelé si nemusí vymazávat mezipaměť prohlížeče.
- Pokud je v nastavení Redmine (Administrace → Nastavení → Obecné) povoleno *Ukládat formátovaný text do vyrovnávací paměti*, po aktualizaci na verzi, která mění způsob zobrazení textů (čištění HTML, podpora textů CKEditoru), vymažte mezipaměť Redmine jednou: `bundle exec rake tmp:cache:clear RAILS_ENV=production` v složce Redmine. Jinak se stránky vykreslené před aktualizací mohou zobrazovat z mezipaměti, nečištěné, dokud se jejich text nezmění.
- Starší verze pluginu zkopírovaly skript do `public/tiptap_bundle.js`. Tyto soubory se již nepoužívají a lze je odstranit:
  ```sh
  rm -f /path/to/redmine/public/tiptap_bundle.js /path/to/redmine/public/tiptap_bundle.js.map
  ```

## Migrace z CKEditoru

Pokud váš Redmine používal [redmine_ckeditor](https://github.com/a-ono/redmine_ckeditor), můžete přepnout na tento plugin a zachovat všechny texty, které byly napsány: úkoly, poznámky, wiki stránky, novinky, příspěvky, dokumenty. Nic se nepřevádí a databáze se nedotýká. CKEditor ukládá své texty jako HTML a stejně tak tento plugin, takže uložený text je jednoduše zobrazen novým formátovačem.

1. Nainstalujte plugin (viz výše) a zvolte Formátování textu: *TipTap HTML*.
2. Ponechte složku `public/system/rich/` vašeho Redmine. Pokud lidé vložili obrázky a soubory pomocí prohlížeče obrázků CKEditoru, jsou uloženy tam, nikoli v databázi ani mezi přílohami, a texty na ně odkazují adresou (`/system/rich/...`). **Při přesunu Redmine na jiný server nebo při jeho nové instalaci přesuňte i tuto složku** spolu s databází a složkou `files/`: ani jedna z nich tyto soubory neobsahuje a bez této složky budou obrázky ve starých textech končit chybou 404. Přílohy úkolů, wiki stránek atd. se ukládají jako dříve a nepotřebují nic. Obrázky vložené v tomto editoru jsou běžné přílohy. Složka zůstává potřebná i po odstranění redmine_ckeditor.
3. Odstraňte redmine_ckeditor, když jej již nebudete potřebovat.

Starý text se zobrazuje tak, jak jej zobrazoval CKEditor: písma, velikosti, barvy a zarovnání, odsazení, seznamy, tabulky (okraje, šířky, popisky, sloučené buňky), obrázky (velikost, plovoucí, okraj, obrázek v odkazu), odkazy, bloky kódu s jejich jazykem (zvýrazněné), makra Redmine (`{{toc}}`, `{{collapse(Title) ... }}`, `{{thumbnail(...)}}` atd.), wiki a linkuje na úkoly, prosté webové adresy, které jsou kliknutelné, a vložené `<iframe>` (video). Text napsaný v CKEditoru se rozpozná podle jeho značky a zachovává si odstup mezi odstavci, které tam měl, což je větší než v tomto editoru.

Rozdíly záměrně:
- `<iframe>` se zobrazuje pouze v případě, že ukazuje na jinou lokalitu přes http(s), a je v sandbox: stránka uvnitř může spouštět své vlastní skripty, ale nemůže dosáhnout stránky Redmine, otevřít horní okno nebo odeslat formuláře. Všechny ostatní `<iframe>` jsou odstraněny.
- Odkazy se otevírají ve stejném okně: atribut `target` odkazu (CKEditor "Nové okno (_blank)") se nezachováva.
- Část formátování, kterou CKEditor nabízel, ale jeho stránky tiše opustila, se zde zobrazuje: například barvy pozadí jeho stylů "Značka" a uvozovky `<q>`.
- Styl „Special Container“ z CKEditoru (blok se šedým rámečkem) se zobrazuje jako blok kódu bez zvýraznění a v editoru je to také blok kódu.

Starý text si zachovává formátování, když se otevře v editoru a uloží znovu: makra Redmine (makro je jeden šedý prvek v editoru; upravte jej v režimu `<HTML>`, jako v režimu Source v CKEditoru), `<iframe>`, bloky `<div>` a `<address>` s jejich stylem (`<div>` vložený z webové stránky se i nadále mění na odstavec), dolní a horní index, inline styly CKEditoru (velký, malý, klávesnice, vzorek atd.), styl nadpisů, tabulek a buněk tabulky, velikost (šířka a výška), plovoucí, okraj a odkaz obrázků, jazyk bloků kódu. Co se při úpravách nezachová: popisek tabulky se změní na odstavec zarovnaný na střed nad tabulkou, sekce záhlaví a zápatí tabulky se změní na běžné řádky (zápatí zůstane dole) a `<del>` se změní na `<s>` (stejný vzhled). Text uložený z tohoto editoru získá kompaktní odstup mezi odstavci, jaký má tento editor.
