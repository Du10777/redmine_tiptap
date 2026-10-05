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

> *Ez a fordítás egy AI-modell segítségével készült, és nem lett natív beszélővel leellenőrizve. Amennyiben hibát talál, kérjük [nyisson meg egy feladatot vagy pull requestet](https://github.com/Du10777/redmine_tiptap).*

Ez egy szövegszerkesztő a Redmine-hez, amely a TipTap alapján készült https://github.com/ueberdosis/tiptap

Támogatott Redmine verziók: **6.\*** (fejlesztve és tesztelve a 6.1.4-en).

Szerkesztőmotor: **TipTap 3.31.4**. Minden `@tiptap/*` csomag a `package.json` és `package-lock.json` fájlban pontosan erre a verzióra van rögzítve, és mindig ugyanazon verzióra kell frissíteni.

## Funkciók

**Szöveg formázás**
- Félkövér, dőlt, aláhúzott, áthúzott, alsó és felső index (Ctrl+, és Ctrl+.), soron belüli kód.
- Szövegszín és háttérszín: 64 szín palettája vagy tetszőleges hex érték.
- Betűtípus családja (13 betűtípus) és betűméret (8–72 px közötti előbeállítások vagy tetszőleges érték).
- Bekezdésstílusok: 1–6-os fejlécek és normál szöveg.
- Igazítás (balra, közepre, jobbra, sorkizárt) és behúzás (akár 8 szint) bekezdésekhez és fejlécekhez.
- Hivatkozások: beszúrás, szerkesztés, eltávolítás.
- Vízszintes vonal, visszavonás és ismétlés.

**Listák**
- Felsorolásos listák: korong, kör vagy négyzet jelöléssel.
- Számozott listák: 1, 01, a, A, i, I, α.
- Feladatlisták jelölőnégyzetekkel; az elvégzett feladatok áthúzottak.
- Beágyazott listák (Tab / Shift+Tab).

**Táblázatok**
- Tetszőleges méretű táblázat beszúrása fejlécsort tartalmazva vagy anélkül.
- Jobb kattintásos menü egy cellában: sorok és oszlopok hozzáadása és törlése, cellák összevonása és felosztása, fejlécsor és fejlécoszlop, táblázat törlése.
- Oszlopszélességek megváltoztathatók a cellaszegélyek húzásával.
- Az Excelből való beillesztés megőrzi az oszlopszélességeket, az igazítást és a betűméreteket; a Redmine-ből másolt táblázat szegélyekkel illeszthető be az Excelbe.

**Képek és csatolmányok**
- Kép beillesztése a vágólapról: feltöltésre kerül csatolmányként és megjelenik a szövegben.
- A Redmine fájl mezővel csatolt képek vagy rá dobott képek szintén beillesztésre kerülnek a szövegbe.
- Kép beszúrása a csatolmányokból (egy miniatűr választó) vagy bármely csatolmányra mutató hivatkozás.
- Kép átméretezése a sarkainak húzásával.

**Kód**
- Kódblokkok szintaxiskiemelésével a szerkesztőben és a mentett oldalakon: 52 nyelv, és hozzáadhat többet (lásd [Szintaxiskiemelés](#szintaxiskiemelés)).
- Egy blokk nyelvét a jobb felső sarkában lévő jelvényben választhatja ki, keresésből, nemrég és gyakran használt nyelvekből.
- A Tab és Shift+Tab behúzza és kihagy sorokat egy kódblokkon belül; a félkövér, a hivatkozások és a szövegek színei a kódban megmaradnak.

**Blokkok**
- Összecsukható blokk: cím rejtett tartalommal (`<details>`). A mentett oldalakon összecsukott, a szerkesztőben kibontva.
- Idézet blokk szerzővel és dátum sorral.

**Szerkesztés**
- `<HTML>` mód a HTML forrás megtekintéséhez és szerkesztéséhez: a beágyazott blokkok be vannak húzva, a több sorból álló blokkokat üres sor választja el egymástól, a szintaxist ugyanazok a szabályok színezik, mint egy HTML kódblokkban, és az Enter megtartja a sor behúzását.
- Markdown stílusú gépelés: `#` fejlécekhez, `-` és `1.` listákhoz, `[ ]` feladatokhoz, ```` ```python ```` kódblokk (tetszőleges nyelvnév vagy semmi), `**bold**` félkövetéshez, `---` vízszintes vonalhoz. Szabványos billentyűparancsok: Ctrl+B, Ctrl+I, Ctrl+U, Ctrl+Z és mások.
- A szerkesztő soha nem nő meg nagyobbá, mint az ablak: az eszköztár és a formgombok láthatók maradnak, és a szöveg belül görget. A magasság követi az ablak méretét és az oldal nagyítását.
- A jobb alsó sarokban egy átméretezési fogantyú kézzel állítja a magasságot. A magasság megjegyzésre kerül; kettős kattintás az automatikus magasságra való visszatéréshez.

**Redmine integráció**
- Minden formázott Redmine szövegmezőben működik: feladat leírások és feljegyzések, wiki oldalak, hírek, fórum üzenetek, dokumentumok, projekt leírások, hosszú szövegű egyéni mezők, beleértve az oldalakon később megjelenő mezőket.
- A szöveg HTML formátumban van tárolva. A szerkesztő használatához válassza a *TipTap HTML* szövegformázást a Redmine beállításaiban.
- Az interfész (tippek, menük, párbeszédablakok) a felhasználó Redmine profiljában beállított nyelvhez igazodik. A Redmine 50 nyelvéből 47 szerepel a bővítményben: az angol és az orosz teljes, a további 45 az AI-modellel készült vázlatok, amelyeket a beszélők szívesen javíthatnak. A három jobbról balra írt nyelv (arab, héber, perzsa) szándékosan nem támogatott (lásd [Interfész nyelve](#interfész-nyelve)).
- Gyors marad nagy szövegeken: a rejtett űrlapok szerkesztői csak az űrlap megnyitásakor jönnek létre, és a hosszú kódblokkok akkor kerülnek kiemelésre, amikor a nézetbe gördülnek.
- A CKEditor-ban írt szövegek (a redmine_ckeditor bővítmény) a képernyőn megjelennek, és a szerkesztőben nyílnak meg a formázásukkal: nincs konverzió, lásd [Migrálás a CKEditor-ból](#migrálás-a-ckeditor-ból).
- A mentett szövegek nem biztonságos HTML nélkül jelennek meg: az oldalak megjelenítésekor a parancsfájlokat, az eseménykészültségeket és a `javascript:` hivatkozásokat eltávolítják, csak a szerkesztő által előállított tartalom marad. Ez a REST API-n vagy a `<HTML>` módón keresztül érkező szövegeket is lefedi.

## Szintaxiskiemelés

A kódblokkok a szerkesztőben és a mentett oldalakon egyaránt kiemelkednek. Egy blokk nyelvét a jobb felső sarkában lévő jelvényből választjuk ki; a listában van egy keresőmező, és megjegyzi a nemrég és gyakran használt nyelveket.

52 nyelv van a bővítményben, köztük a HTML, az 1C, Cisco IOS, MikroTik RouterOS, Windows cmd, docker compose, Linux szolgáltatásnaplók és journalctl kimenet.

Saját nyelveket adhat hozzá. Minden nyelv egy fájl a `highlight/` mappában. A 190+ highlight.js nyelvtanból vagy egy harmadik féltől származóból tetszőleges egy paranccsal konvertálható ilyen fájllá:

```sh
python3 highlight/_convert_grammar.py erlang
sh highlight/_compile.sh
```

Részletek: [highlight/README/hu.md](../highlight/README/hu.md).

## Interfész nyelve

A szerkesztő a felhasználó Redmine profiljában beállított nyelvén beszél (Fiókom adatai → Nyelv). A Redmine 6 50 nyelvéből 47 fájl van a bővítményben, a `config/locales/` mappában. Az angol a forrás, az orosz a szerző saját; a maradék 45 az AI-modellel készült vázlat, és még nincs áttekintve natív beszélőkkel, ezért várhatsz furcsa mondatokat. A fájlból hiányzó szöveg angol nyelven jelenik meg.

A fordítás korrigálásához módosítsa az értékeket a `config/locales/<code>.yml` fájlban (`de`, `fr`, `pt-BR`, ...) és indítsa újra a Redmine-t. `bundle exec rake redmine_tiptap:locales` ellenőrzi a fájlokat. A javításokkal végzett pull requestek üdvözlendők.

**A jobbról balra írt nyelvek (arab, héber, perzsa) szándékosan nem támogatottak.** Támogatásuk sok változást igényel az alapkódban, nem csak fordítást, és úgy döntöttünk, hogy nem vállaljuk fel. Ezekhez a nyelvekhez a szerkesztő angol nyelven jelenik meg, és az elrendezése nem kerül beállításra. Ha szüksége van az egyik verzióra, készítsen egy forkat: a fordítási mechanizmus kész, és az egyéb szükséges módosítások a [config/locales/README.md](../config/locales/README.md#right-to-left-languages) fájlban vannak felsorolva.

Részletek és a Redmine nyelvek listája: [config/locales/README.md](../config/locales/README.md).

## Telepítés

1. Helyezze a bővítményt a Redmine `plugins` mappájába. A mappa neve `redmine_tiptap` kell hogy legyen. A legegyszerűbb módja a git, amely az frissítéseket egyetlen paranccsal végzi:
   ```sh
   cd /path/to/redmine
   git clone https://github.com/Du10777/redmine_tiptap.git plugins/redmine_tiptap
   ```
2. Indítsa újra a Redmine-t.
3. A Redmine beállításaiban (redmine.selfhosted/_settings_) válassza a Szöveg formázás: *TipTap HTML*.

## Frissítés

A bővítménynek nincsenek adatbázis migrációi, és az elkészített JavaScript csomag és stílusprofil az adattárban vannak. A frissítéshez nem szükséges npm vagy szerveroldali fordítás: cserélje ki a bővítményfájlokat, és indítsa újra a Redmine-t.

A frissítés előtt ellenőrizze, hogy az új verzió támogatja-e a Redmine verzióját (lásd fent a "Támogatott Redmine verziók" részt).

### Git-tel telepítve (ajánlott)

```sh
cd /path/to/redmine/plugins/redmine_tiptap
git pull
```

Ezután indítsa újra a Redmine-t, például:

```sh
sudo systemctl restart redmine          # Redmine running as a systemd service
touch /path/to/redmine/tmp/restart.txt  # Passenger
docker compose restart redmine          # Docker
```

Ahhoz, hogy az utolsó commit helyett egy adott verziót tartson meg: `git fetch && git checkout <tag-or-commit>`.

### Archívumból telepítve

1. Törölje az összeomló `plugins/redmine_tiptap` mappát, és csomagolja ki az új verziót a helyére. Az előzetes törlés biztosítja, hogy az új verzióban eltávolított fájlok nem maradnak vissza.
2. Töröljék a `public/assets/.manifest.json` fájlt a Redmine mappában.
3. Indítsa újra a Redmine-t.

A 2. lépés fontos. Indításkor a Redmine csak akkor teszi újra közzé a bővítményes eszközöket, ha az ezek fájljai újabbak, mint az adott manifest. Az archívumból kicsomagolt fájlok megtartják eredeti időbélyeget, így a 2. lépés nélkül a Redmine továbbra is a régi szerkesztőt szolgáltathatja. A manifest indításkor automatikusan újra létre lesz hozva. `git pull` esetén ez a lépés nem szükséges: a git az aktuális idő módosított fájlokat.

### Frissítés után

- A szerkesztő scriptje és stílusa az URL-ben egy tartalommarkírózással kiszolgálnak, így a böngészők az újraindítás után azonnal az új verziót betöltik. A felhasználóknak nem kell üríteniük a böngésző gyorsítótárát.
- Ha a *Formázott szöveg gyorsítótárazása* engedélyezve van a Redmine beállításaiban (Adminisztráció → Beállítások → Általános), a Redmine gyorsítótárát egyszer ürítse a frissítés után egy olyan verzióra, amely megváltoztatja a szövegek megjelenítésének módját (HTML tisztítás, CKEditor szövegek támogatása): `bundle exec rake tmp:cache:clear RAILS_ENV=production` a Redmine mappában. Ellenkező esetben az előtte renderelt oldalak lehet, hogy a gyorsítótárból maradjanak, a frissítés előtt, amíg a szövegük meg nem változik.
- A bővítmény korábbi verziói a parancsfájlt a `public/tiptap_bundle.js` helyre másolták. Ezek a fájlok már nem használatosak, és törölhetők:
  ```sh
  rm -f /path/to/redmine/public/tiptap_bundle.js /path/to/redmine/public/tiptap_bundle.js.map
  ```

## Migrálás a CKEditor-ból

Ha a Redmine a [redmine_ckeditor](https://github.com/a-ono/redmine_ckeditor) használatban volt, erre a bővítményre válthat és megtarthat minden szöveget: feladatok, feljegyzések, wiki oldalak, hírek, üzenetek, dokumentumok. Semmi sem konvertálódik, és az adatbázis nem érinti. A CKEditor HTML formátumban tárolja a szövegeket, és ez a bővítmény is, ezért a tárolt szöveg egyszerűen megjelenik az új formázóban.

1. Telepítse a bővítményt (lásd fent), és válassza a Szöveg formázás: *TipTap HTML*.
2. Tartsa meg a Redmine `public/system/rich/` mappáját. Ha a CKEditor képböngészőjével képeket és fájlokat szúrtak be, azok ott vannak tárolva, nem az adatbázisban és nem a csatolmányok között, a szövegek pedig a címük alapján hivatkoznak rájuk (`/system/rich/...`). **Ha a Redmine-t másik szerverre költözteti vagy újratelepíti, ezt a mappát is vigye át**, az adatbázissal és a `files/` mappával együtt: egyik sem tartalmazza ezeket a fájlokat, és a mappa nélkül a régi szövegek képei 404-es hibát adnak. A feladatok, wiki oldalak és így tovább csatolmányai a korábbiak szerint tárolódnak, és nincs velük semmi teendő. Az ebben a szerkesztőben beszúrt képek közönséges csatolmányok. A mappára a redmine_ckeditor eltávolítása után is szükség van.
3. Távolítsa el a redmine_ckeditor-t, ha már nincs rá szüksége.

Egy régi szöveg a módszer szerint jelenik meg, ahogy a CKEditor mutatta: betűtípusok, méretek, színek és igazítás, behúzások, listák, táblázatok (szegélyek, szélesség, képletek, egyesített cellák), képek (méret, úszó, szegély, kép egy hivatkozásban), hivatkozások, kódblokkok a nyelvükkel (kiemelve), Redmine makrók (`{{toc}}`, `{{collapse(Title) ... }}`, `{{thumbnail(...)}}` és így tovább), wiki és feladat hivatkozások, egyszerű webes címek, amelyek kattinthatóvá válnak, és beágyazott `<iframe>` (videó). A CKEditor-ban írt szöveg a jelölésével felismerhető, és megtartja a bekezdések közötti szóközt, amely nagyobb volt, mint ebben a szerkesztőben.

Szándékos különbségek:
- Egy `<iframe>` csak akkor jelenik meg, ha egy másik helyre http(s) szempontjából mutat, és homokozóba kerül: az oldal futtathat saját parancsfájlokat, de nem érheti el a Redmine oldalt, nyithatja meg a felső ablakot, vagy elküldheti az űrlapokat. Az összes többi `<iframe>` eltávolítódik.
- A hivatkozások ugyanabban az ablakban nyílnak meg: egy hivatkozás `target` attribútuma (CKEditor-nak "New Window (_blank)") nem marad meg.
- Bizonyos formázás, amelyet a CKEditor kínált, de az oldalai nem tartottak, itt jelenik meg: például a "Marker" stílusok háttérszínei és a `<q>` által idézőjele.
- A CKEditor „Special Container” stílusa (szürke keretű blokk) kiemelés nélküli kódblokként jelenik meg, és a szerkesztőben is kódblokk.

Egy régi szöveg megőrzi a formázását, amikor megnyitják a szerkesztőben, majd újra elmentik: Redmine makrók (a makró egyetlen szürke elem a szerkesztőben; szerkessze a `<HTML>` módban, mint a CKEditor Forrás módjában), `<iframe>`, `<div>` és `<address>` blokkok a stílusukkal (egy weboldalról beillesztett `<div>` továbbra is bekezdéssé alakul), alsó és felső index, a CKEditor soron belüli stílusai (big, small, keyboard, sample stb.), a fejlécek, táblázatok és táblázatcellák stílusa, a képek mérete, úsztatása, szegélye és hivatkozása, a kódblokkok nyelve. Ami nem éli túl a szerkesztést: a táblázat felirata egy fölötte lévő, középre igazított bekezdés lesz, a táblázat fejléc- és láblécszakaszai szokásos sorokká válnak (a lábléc alul marad), a `<del>` `<s>` lesz (ugyanaz a megjelenés), és a kép magassága törlődik, ha be van állítva a szélessége (az arányok megmaradnak). Az ebből a szerkesztőből mentett szöveg ennek a szerkesztőnek a kompakt bekezdésközét kapja.
