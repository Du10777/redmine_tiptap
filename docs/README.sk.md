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

> *Tento preklad bol vytvorený s pomocou modelu AI a nebol skontrolovaný rodným hovorcou. Ak nájdete chybu, prosím [otvorte problém alebo pull request](https://github.com/Du10777/redmine_tiptap).*

Toto je textový editor pre Redmine založený na TipTap https://github.com/ueberdosis/tiptap

Podporované verzie Redmine: **6.\*** a **7.\*** (testované na 6.1.4, 6.1.5 a 7.0.2).

Editor: **TipTap 3.31.4**. Všetky balíčky `@tiptap/*` sú v `package.json` a `package-lock.json` pripnuté na túto presnú verziu a musia byť vždy aktualizované spolu na rovnakú verziu.

## Funkcie

**Formátovanie textu**
- Tučný, kurzíva, podčiarknutie, prečiarknutie, dolný index a horný index (Ctrl+, a Ctrl+.), vložený kód.
- Farba textu a farba pozadia: paleta 64 farieb alebo ľubovoľná hex hodnota.
- Rodina písma (13 písem) a veľkosť písma (prednastavenia od 8 do 72 px, alebo ľubovoľná hodnota).
- Štýly odseku: nadpisy 1–6 a normálny text.
- Zarovnanie (doľava, v strede, doprava, zarovnané do bloku) a odsadenie (až 8 úrovní) odsekov a nadpisov.
- Odkazy: vloženie, úpravy, odstránenie.
- Vodorovná čiara, vrátenie späť a opakovanie.

**Zoznamy**
- Zoznamy s odrážkami s guľaťatými, kruhovými alebo štvorcovými značkami.
- Číslované zoznamy: 1, 01, a, A, i, I, α.
- Zoznamy úloh so zaškrtávacími poľami; dokončené úlohy sú prečiarknuté.
- Vnorené zoznamy (Tab / Shift+Tab).

**Tabuľky**
- Vloženie tabuľky ľubovoľnej veľkosti, s riadkom hlavičky alebo bez nej.
- Kontextová ponuka v bunke: pridanie a odstránenie riadkov a stĺpcov, zlúčenie a rozdelenie buniek, riadok a stĺpec hlavičky, odstránenie tabuľky.
- Šírky stĺpcov sa menia ťahaním hraníc buniek.
- Vloženie z Excelu zachováva šírky stĺpcov, zarovnanie a veľkosti písem; tabuľka skopírovaná z Redmine sa vloží do Excelu s okrajmi.

**Obrázky a prílohy**
- Vloženie obrázka zo schránky: je nahraný ako príloha a v texte sa zobrazuje.
- Obrázky pripojené cez pole súboru Redmine alebo pretiahnuté na neho sa v texte tiež vloží.
- Vloženie obrázka z príloh (výber miniatúr) alebo odkaz na ľubovolnú prílohu.
- Zmena veľkosti obrázka ťahaním jeho rohov.

**Kód**
- Bloky kódu so zvýrazňovaním syntaxe v editore a na uložených stránkach: 52 jazykov a môžete pridať ďalšie (pozri [Zvýrazňovanie syntaxe](#zvýrazňovanie-syntaxe)).
- Jazyk bloku sa vybiera z odznaču v jeho rohu, s vyhľadávaním, nedávnymi a často používanými jazykmi.
- Tab a Shift+Tab odsadzujú a oddialujú riadky v bloku kódu; tučný text, odkazy a farby v kóde sa zachovávajú.

**Bloky**
- Zbaliteľný blok: nadpis so skrytým obsahom (`<details>`). Zbalený na uložených stránkach, rozbalený v editore.
- Citačný blok s riadkom autora a dátumu.

**Úpravy**
- Režim `<HTML>` pre zobrazenie a úpravy zdrojového kódu HTML: vnorené bloky sú odsadené, prázdny riadok oddeľuje bloky, ktoré zaberajú viac riadkov, syntax sa farebne zvýrazňuje podľa rovnakých pravidiel ako v bloku kódu HTML a Enter zachováva odsadenie riadka.
- Psaní v štýle Markdown: `#` pre nadpisy, `-` a `1.` pre zoznamy, `[ ]` pre úlohy, ```` ```python ```` pre blok kódu (ľubovoľný názov jazyka alebo žiadny), `**bold**`, `---` pre vodorovnú čiaru. Štandardné klávesové skratky: Ctrl+B, Ctrl+I, Ctrl+U, Ctrl+Z a ďalšie.
- Editor nikdy nie je vyšší ako okno: panel nástrojov a tlačítka formulára zostávajú v zobrazení a text sa posúva vnútri. Výška sa prispôsobuje veľkosti okna a priblíženiu stránky.
- Úchytka na zmenu veľkosti v pravom dolnom rohu nastavuje výšku ručne. Výška sa zapamätá; dvojklik sa vracia k automatickej výške.

**Integrácia s Redmine**
- Funguje vo všetkých Redmine textových poliach s formátovaním: popisy úloh a poznámky, wiki stránky, novinky, príspevky na fóre, dokumenty, popisy projektov, vlastné polia dlhého textu, vrátane polí, ktoré sa na stránke objavujú neskôr.
- Text sa ukladá ako HTML. Ak chcete editor používať, vyberte *TipTap HTML* ako formátovanie textu v nastavení Redmine.
- Rozhranie (tipy nástrojov, ponuky, dialógové okná) sa riadi jazykom v profile používateľa Redmine. 47 z 50 jazykov Redmine prichádza s pluginom: angličtina a ruština sú úplné, ostatných 45 sú návrhy vytvorené s modelom AI, ktoré rád opraví rodný hovorca. Tri jazyky písané sprava doľava (arabčina, hebrejčina, perzština) sú zámerne nepodporované (pozri [Jazyk rozhrania](#jazyk-rozhrania)).
- Zostáva rýchly na veľkých textoch: editory vo skrytých formulároch sa vytvoria iba pri otvorení formulára a dlhé bloky kódu sa zvýrazňujú pri posune do zobrazenia.
- Texty napísané v CKEditore (plugin redmine_ckeditor) sa zobrazujú tak, ako boli, a otvára sa v editore s ich formátovaním: žiadna konverzia, pozri [Migrácia z CKEditoru](#migrácia-z-ckeditoru).
- Uložené texty sa zobrazujú bez nebezpečného HTML: skripty, obslužné programy udalostí a odkazy `javascript:` sa odstránia pri zobrazení stránky, zachováva sa iba to, čo vytváriame editor. Toto pokrýva texty, ktoré prichádzajú cez REST API alebo režim `<HTML>`.

## Zvýrazňovanie syntaxe

Bloky kódu sa zvýrazňujú v editore aj na uložených stránkach. Jazyk bloku sa vybiera z odznaču v pravom hornom rohu; zoznam má vyhľadávacie pole a zapamätá si nedávno a často používané jazyky.

52 jazykov prichádza s pluginom, medzi nimi HTML, 1C, Cisco IOS, MikroTik RouterOS, Windows cmd, docker compose, protokoly linuxových služieb a výstup journalctl.

Môžete pridať svoje vlastné jazyky. Každý jazyk je jeden súbor v zložke `highlight/`. Ľubovoľná z 190+ gramatík highlight.js alebo tretej strany sa previesť na takýto súbor jedným príkazom:

```sh
python3 highlight/_convert_grammar.py erlang
sh highlight/_compile.sh
```

Podrobnosti: [highlight/README/sk.md](../highlight/README/sk.md).

## Jazyk rozhrania

Editor hovorí jazykom zvoleným v profile používateľa Redmine (Môj účet → Jazyk). Súbory pre 47 z 50 jazykov Redmine prichádzajú s pluginom v `config/locales/`. Angličtina je zdrojom a ruština je od autora; ostatných 45 sú návrhy vytvorené s pomocou modelu AI a zatiaľ nie sú skontrolované rodným hovorom, preto sa očakávajú podivné frázy. Text chýbajúci v súbore sa zobrazuje v angličtine.

Ak chcete opraviť preklad, zmeňte jeho hodnoty v `config/locales/<code>.yml` (`de`, `fr`, `pt-BR`, ...) a restartujte Redmine. `bundle exec rake redmine_tiptap:locales` kontroluje súbory. Pull requesty s opravami sú vítané.

**Jazyky písané sprava doľava (arabčina, hebrejčina, perzština) sú zámerne nepodporované.** Ich podpora vyžaduje veľa zmien v základe kódu, nie len preklad, a rozhodli sme sa, že to neurobíme. Pre tieto jazyky sa editor zobrazuje v angličtine a jeho rozloženie nie je upravené. Ak potrebujete jeden z nich, vytvorte fork: mechanizmus prekladu je pripravený a čo ďalšie sa musí zmeniť, je uvedené v [config/locales/README.md](../config/locales/README.md#right-to-left-languages).

Podrobnosti a zoznam jazykov Redmine: [config/locales/README.md](../config/locales/README.md).

## Inštalácia

1. Umiestnite plugin do zložky `plugins` Redmine. Zložka musí byť pomenovaná `redmine_tiptap`. Najjednoduchší je git, ktorý tiež umožňuje aktualizácie jedným príkazom:
   ```sh
   cd /path/to/redmine
   git clone https://github.com/Du10777/redmine_tiptap.git plugins/redmine_tiptap
   ```
2. Restartujte Redmine.
3. V nastavení Redmine (redmine.selfhosted/_settings_) vyberte Formátovanie textu: *TipTap HTML*.

## Aktualizácia

Plugin nemá migráciu databázy a zabudovaný zväzok JavaScript a list štýlov sú súčasťou úložiska. Aktualizácia nepotrebuje npm ani zostavenie na serveri: nahraďte súbory pluginu a restartujte Redmine.

Pred aktualizáciou skontrolujte, že nová verzia podporuje vašu verziu Redmine (pozri vyššie "Podporované verzie Redmine").

### Nainštalované pomocou git (odporúčané)

```sh
cd /path/to/redmine/plugins/redmine_tiptap
git pull
```

Potom restartujte Redmine, napríklad:

```sh
sudo systemctl restart redmine          # Redmine bežiaci ako služba systemd
touch /path/to/redmine/tmp/restart.txt  # Passenger
docker compose restart redmine          # Docker
```

Ak chcete zostať na konkrétnej verzii namiesto najnovšieho commitu: `git fetch && git checkout <tag-or-commit>`.

### Nainštalované z archívu

1. Odstráňte starou zložku `plugins/redmine_tiptap` a rozbalte novú verziu na jej miesto. Odstránenie najskôr zaistí, že súbory odstránené v novej verzii nebudú pretrvávať.
2. Odstráňte `public/assets/.manifest.json` v zložke Redmine.
3. Restartujte Redmine.

Krok 2 je dôležitý. Pri spustení Redmine znovu publikuje prostředky pluginu iba v prípade, že ich súbory sú novšie ako tento manifest. Súbory rozbalené z archívu si zachovávajú pôvodné časové značky, takže bez kroku 2 môže Redmine naďalej slúžiť starý editor. Manifest sa automaticky znovu vytvorí pri spustení. S `git pull` nie je tento krok potrebný: git dáva zmeneným súborom aktuálny čas.

### Po aktualizácii

- Skript a list štýlov editora sa poskytujú s otiskom obsahu v ich URL, takže prehliadače po reštarte načítajú novú verziu. Používatelia si nemusia vyčistiť vyrovnávaciu pamäť prehliadača.
- Ak je v nastavení Redmine (Administrácia → Nastavenia → Všeobecné) povolené *Uložiť formátovaný text do vyrovnávacej pamäte*, po aktualizácii na verziu, ktorá mení spôsob zobrazenia textov (čistenie HTML, podpora textov CKEditoru), vymažte vyrovnávaciu pamäť Redmine raz: `bundle exec rake tmp:cache:clear RAILS_ENV=production` v zložke Redmine. V opačnom prípade sa stránky vykreslené pred aktualizáciou môžu zobrazovať z vyrovnávacej pamäte, nečistené, až kým sa ich text nezmení.
- Staršie verzie pluginu skopírovali skript do `public/tiptap_bundle.js`. Tieto súbory sa už nepoužívajú a možno ich odstrániť:
  ```sh
  rm -f /path/to/redmine/public/tiptap_bundle.js /path/to/redmine/public/tiptap_bundle.js.map
  ```

## Migrácia z CKEditoru

Ak váš Redmine používal [redmine_ckeditor](https://github.com/a-ono/redmine_ckeditor), môžete prepnúť na tento plugin a zachovať všetky texty, ktoré boli napísané: úlohy, poznámky, wiki stránky, novinky, príspevky, dokumenty. Nič sa neprevádza a databáza sa nedotýka. CKEditor ukladá svoje texty ako HTML a rovnako aj tento plugin, takže uložený text sa jednoducho zobrazuje novým formátovačom.

1. Nainštalujte plugin (pozri vyššie) a vyberte Formátovanie textu: *TipTap HTML*.
2. Ponechajte zložku `public/system/rich/` vášho Redmine. Ak ľudia vložili obrázky a súbory pomocou prehliadača obrázkov CKEditoru, sú uložené tam, nie v databáze ani medzi prílohami, a texty sa na ne odkazujú adresou (`/system/rich/...`). **Ak Redmine presúvate na iný server alebo ho inštalujete odznova, presuňte aj túto zložku**, spolu s databázou a zložkou `files/`: ani jedna z nich tieto súbory neobsahuje a bez tejto zložky obrázky v starých textoch skončia chybou 404. Prílohy úloh, wiki stránok atd. sa ukladajú ako predtým a nepotrebujú nič. Obrázky vložené v tomto editore sú bežné prílohy. Zložka zostáva potrebná aj po odstránení redmine_ckeditor.
3. Odstráňte redmine_ckeditor, keď ho už nebudete potrebovať.

Starý text sa zobrazuje tak, ako ho zobrazoval CKEditor: písma, veľkosti, farby a zarovnanie, odsadenie, zoznamy, tabuľky (okraje, šírky, popisky, zlúčené bunky), obrázky (veľkosť, plavúci, okraj, obrázok v odkaze), odkazy, bloky kódu s ich jazykom (zvýrazňované), makrá Redmine (`{{toc}}`, `{{collapse(Title) ... }}`, `{{thumbnail(...)}}` atd.), wiki a odkazy na úlohy, prosté webové adresy, ktoré sú kliknuteľné, a vložené `<iframe>` (video). Text napísaný v CKEditore sa rozpozná podľa jeho značky a zachováva si odstup medzi odsekmi, ktoré tam mal, čo je väčší ako v tomto editore.

Rozdiely zámerne:
- `<iframe>` sa zobrazuje iba v prípade, že ukazuje na iné miesto cez http(s), a je v sandbox: stránka vnútri môže spúšťať vlastné skripty, ale nemôže dosiahnuť stránku Redmine, otvoriť horné okno alebo odoslať formuláre. Všetky ostatné `<iframe>` sú odstránené.
- Odkazy sa otvárajú v rovnakom okne: atribút `target` odkazu (CKEditor "Nové okno (_blank)") sa nezachováva.
- Niektoré formátovanie, ktoré CKEditor ponúkal, ale jeho stránky ticho pustili, sa tu zobrazuje: napríklad farby pozadia jeho štýlov "Značka" a úvodzovky `<q>`.
- Štýl „Special Container“ v CKEditore (blok so šedým rámčekom) sa zobrazuje ako blok kódu bez zvýrazňovania a v editore je to tiež blok kódu.

Starý text si zachováva formátovanie, keď sa otvorí v editore a uloží znovu: makrá Redmine (makro je jeden šedý prvok v editore; upravte ho v režime `<HTML>`, ako v CKEditor Source mode), `<iframe>`, bloky `<div>` a `<address>` so svojím štýlom (`<div>` vložený z webovej stránky sa aj tak stane odsekom), horný index a dolný index, inline štýly CKEditoru (veľký, malý, klávesnica, vzorka atd.), štýl nadpisov, tabuliek a buniek tabuľky, veľkosť (šírka a výška), plavúci, okraj a odkaz obrázkov, jazyk blokov kódu. Čo neprežije úpravy: titulok tabuľky sa stane stredne zarovnaným odsekom vyššie, záhlavie a zápatie tabuľky sa stanú bežnými riadkami (zápatie zostane na dne) a `<del>` sa stane `<s>` (rovnaký vzhľad). Text uložený z tohto editora získa kompaktný rozostup odseku tohto editora.
