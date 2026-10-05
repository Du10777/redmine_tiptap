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

> *Ta prevod je nastal s pomočjo modela umetne inteligence in ga naravni govorec ni pregledal. Če najdete napako, [odprite issue ali pull request](https://github.com/Du10777/redmine_tiptap).*

To je urejevalnik besedil za Redmine, ki temelji na TipTap https://github.com/ueberdosis/tiptap

Podprte različice Redmineja: **6.\*** (razvito in testirano na 6.1.4).

Motor urejevalnika: **TipTap 3.31.4**. Vsi paketi `@tiptap/*` so v `package.json` in `package-lock.json` pripeti na to natančno različico in se morajo vedno nadgraditi skupaj na isto različico.

## Zmožnosti

**Oblikovanje besedila**
- Krepko, ležeče, podčrtano, prečrtano, spodnji in zgornji indeks (Ctrl+, in Ctrl+.), vgrajeni kod.
- Barva besedila in barva ozadja: 64-barvna paleta ali poljubna heksadecimalna vrednost.
- Pisava (13 pisav) in velikost pisave (prednastavke od 8 do 72 px ali poljubno vrednost).
- Slogi odstavkov: naslovi 1–6 in običajno besedilo.
- Poravnava (levo, na sredino, desno, obojestransko) in odmiki (do 8 stopenj) odstavkov in naslovov.
- Povezave: vstavi, uredi, odstrani.
- Vodoravna črta, razveljavi in ponovi.

**Seznami**
- Seznami z oznakami s pikami, krogi ali kvadrati.
- Oštevilčeni seznami: 1, 01, a, A, i, I, α.
- Seznam nalog s potrditvenimi polji; zaključeni nalogi so prečrtani.
- Ugnezdeni seznami (Tab / Shift+Tab).

**Tabele**
- Vstavite tabelo poljubne velikosti, z ali brez vrstice glave.
- Desna gumba v celici: dodaj in izbriši vrstice in stolpce, združi in razdeli celice, vrsta in stolpec glave, izbriši tabelo.
- Širine stolpcev se spreminjajo z vlečenjem robov celic.
- Lepljenje iz Excela ohrani širine stolpcev, poravnavo in velikosti pisav; tabela, kopirana iz Redmineja, se v Excelov liplji s področji.

**Slike in priložene datoteke**
- Prilepite sliko iz odložiča: naložena je kot priložena datoteka in se pojavi v besedilu.
- Slike, priložene z poljem datoteke Redmineja ali spuščene nanj, se prav tako vstavijo v besedilo.
- Vstavite sliko iz priloženih datotek (pregledovalnik sličic) ali povezavo do poljubne priložene datoteke.
- Spremenite velikost slike z vlečenjem vogalov.

**Kod**
- Bloki kode s poudarjanjem skladnje v urejevalniku in na shranjenih straneh: 52 jezikov, in lahko dodate več (glejte [Poudarjanje skladnje](#poudarjanje-skladnje)).
- Jezik bloka je izbran iz značke v njegovem vogalu, z iskanjem, nedavnimi in pogostimi jeziki.
- Tab in Shift+Tab zamakneta in razveljavi vrstice znotraj bloka kode; krepko, povezave in barve znotraj kode so ohranjene.

**Bloki**
- Skrčni blok: naslov s skritim vsebino (`<details>`). Skrčen na shranjenih straneh, razširjen v urejevalniku.
- Blok navedka z avtorsko in datumsko vrstico.

**Urejanje**
- Način `<HTML>` za prikaz in urejanje vira HTML: ugnezdeni bloki so zamaknjeni, prazna vrstica ločuje bloke, ki zavzemajo več vrstic, skladnja je obarvana po istih pravilih kot v bloku kode HTML, Enter pa ohranja zamik vrstice.
- Tipkanje v slogu Markdown: `#` za naslove, `-` in `1.` za sezname, `[ ]` za naloge, ```` ```python ```` za blok kode (katero koli ime jezika ali ne), `**bold**`, `---` za vodoravno črto. Standardni tipkovni bližnjici: Ctrl+B, Ctrl+I, Ctrl+U, Ctrl+Z in drugi.
- Urejevalnik nikoli ne postane višji od okna: orodna vrstica in gumbi obrazca ostanejo na vidiku, besedilo pa se pomika znotraj. Višina sledi velikosti okna in povečavi strani.
- Ročica za spreminjanje velikosti v spodnjem desnem kotu nastavi višino ročno. Višina se zapomni; dvojni klik se vrne na samodejno višino.

**Integracija Redmineja**
- Deluje v vseh poljih besedila Redmineja z oblikovanjem: opis zahtevka in zabeležka, predstavitvene strani, novice, sporočila foruma, dokumenti, opisi projektov, polja po meri z dolgim besedilom, vključno s polji, ki se na strani pojavijo kasneje.
- Besedilo je shranjeno kot HTML. Če želite uporabiti urejevalnik, v nastavitvah Redmineja izberite *TipTap HTML* kot oblikovanje besedila.
- Vmesnik (nasveti, meniji, pogovorna okna) sledi jeziku v profilu uporabnika Redmineja. Plaginom je priloženo 47 od 50 jezikov Redmineja: angleščina in ruščina sta popolni, ostalih 45 so osnutki, narejeni z modelom umetne inteligence, ki jih bodo naravni govorci z veseljem popravili. Tri jeziki, napisani od desne proti levi (arabščina, hebrejščina, perzijščina), namerno niso podprti (glejte [Jezik vmesnika](#jezik-vmesnika)).
- Ostaja hiter na velikih besedilih: urejevalniki v skritih obrazcih se ustvarijo samo, ko se obrazec odpre, in dolgi bloki kode se osvetlijo, ko se pojavijo v vidnu.
- Besedila, napisana v urejevalniku CKEditor (plagi redmine_ckeditor), so prikazana tako, kot so bila, in se v urejevalniku odpro z njihovim oblikovanjem: brez pretvorke, glejte [Migracija iz urejevalnika CKEditor](#migracija-iz-urejevalnika-ckeditor).
- Shranjena besedila so prikazana brez nevarnega HTML: skripte, obdelovalniki dogodkov in povezave `javascript:` se odstranijo, ko je stran prikazana, obdrži se samo tisto, kar proizvede sam urejevalnik. To velja tudi za besedila, ki prihajajo prek REST API ali način `<HTML>`.

## Poudarjanje skladnje

Bloki kode so osvetljeni v urejevalniku in na shranjenih straneh. Jezik bloka je izbran iz značke v njegovem zgornjem desnem kotu; seznam ima iskalno polje in se zapomni nedavne in pogosto uporabljane jezike.

Plaginom je priloženo 52 jezikov, med njimi HTML, 1C, Cisco IOS, MikroTik RouterOS, Windows cmd, docker compose, dnevniki Linux storitve in izhod journalctl.

Dodati lahko lastne jezike. Vsak jezik je ena datoteka v mapi `highlight/`. Katero koli od več kot 190 slovnic highlight.js ali tretje osebe se pretvori v tako datoteko z enim ukazom:

```sh
python3 highlight/_convert_grammar.py erlang
sh highlight/_compile.sh
```

Podrobnosti: [highlight/README/sl.md](../highlight/README/sl.md).

## Jezik vmesnika

Urejevalnik govori jezik, izbran v profilu uporabnika Redmineja (Moj račun → Jezik). Plaginom je priloženo 47 od 50 jezikov Redmineja 6 v `config/locales/`. Angleščina je vir in ruščina je avtorjeva lastna; ostalih 45 so osnutki, narejeni s pomočjo modela umetne inteligence in jih naravni govorci še niso pregledali, zato pričakuj čudno frazo tukaj in tam. Besedilo, ki manjka v datoteki, je prikazano v angleščini.

Če želite popraviti prevod, spremenite njegove vrednosti v `config/locales/<code>.yml` (`de`, `fr`, `pt-BR`, ...) in ponovno zaženete Redmine. `bundle exec rake redmine_tiptap:locales` preverja datoteke. Zahtevki za spremembe s popravkami so dobrodošli.

**Jeziki, napisani od desne proti levi (arabščina, hebrejščina, perzijščina), namerno niso podprti.** Njihova podpora zahteva mnogo sprememb v kodno bazo, ne samo prevod, in se odločili smo, da tega ne prevzamemo. Za te jezike je urejevalnik prikazan v angleščini in njegov razpored ni prilagodljiv. Če potrebuješ enega od njih, naredi razvejaino vedenje: mehanizem prevajanja je pripravljen, in kaj drugega je treba spremeniti, je navedeno v [config/locales/README.md](../config/locales/README.md#right-to-left-languages).

Podrobnosti in seznam jezikov Redmineja: [config/locales/README.md](../config/locales/README.md).

## Namestitev

1. Postavite plagi v mapo `plugins` Redmineja. Mapa mora biti poimenovana `redmine_tiptap`. Najlažji način je git, ki tudi omogoča posodobitve z enim ukazom:
   ```sh
   cd /path/to/redmine
   git clone https://github.com/Du10777/redmine_tiptap.git plugins/redmine_tiptap
   ```
2. Ponovno zaženite Redmine.
3. V nastavitvah Redmineja (redmine.selfhosted/_settings_) izberite Oblikovanje besedila: *TipTap HTML*.

## Posodabljanje

Plagi nimajo migracije baze podatkov, vgrajeni paket JavaScript in slog so del skladišča. Posodabljanje ne potrebuje niti npm niti gradnje na strežniku: zamenjajte datoteke plaga in ponovno zaženite Redmine.

Pred posodabljanjem preverite, da nova različica podpira vašo različico Redmineja (glejte "Podprte različice Redmineja" zgoraj).

### Nameščeno z git (priporočeno)

```sh
cd /path/to/redmine/plugins/redmine_tiptap
git pull
```

Nato ponovno zaženite Redmine, na primer:

```sh
sudo systemctl restart redmine          # Redmine teče kot storitev systemd
touch /path/to/redmine/tmp/restart.txt  # Potnik
docker compose restart redmine          # Docker
```

Če želite ostati pri določeni različici namesto najnovejšega zavezka: `git fetch && git checkout <tag-or-commit>`.

### Nameščeno iz arhiva

1. Izbrišite staro mapo `plugins/redmine_tiptap` in razpakirajte novo različico na svoje mesto. Brisanje najprej zagotavlja, da se datoteke, odstranjene v novi različici, ne zadržijo.
2. Izbrišite `public/assets/.manifest.json` v mapi Redmineja.
3. Ponovno zaženite Redmine.

Korak 2 je važen. Pri zagonu Redmine ponovno objavi sredstva plaga samo, če so njihove datoteke novejše od tega manifesta. Datoteke razpakirana iz arhiva obdržijo svoje izvirne časovne žige, zato brez koraka 2 Redmine lahko še naprej služi starim urejevalnikom. Manifest se samodejno ustvari ob zagonu. S `git pull` ta korak ni potreben: git starim datotekam da trenutni čas.

### Po posodobitvi

- Skript in slog urejevalnika se servira s prstom vsebine v njihovih URL-jih, zato brskalniki naložijo novo različico takoj po zagonu. Uporabniki ne morajo počistiti predpomnilnika brskalnika.
- Če je *Predpomni oblikovano besedilo* omogočeno v nastavitvah Redmineja (Upravljanje → Nastavitve → Splošno), počistite Redminejev predpomnilnik enkrat po posodobitvi na različico, ki spremeni način prikaza besedil (čiščenje HTML, podpora za besedila CKEditor): `bundle exec rake tmp:cache:clear RAILS_ENV=production` v mapi Redmineja. V nasprotnem primeru je mogoče, da se strani, prikazane pred posodobitvijo, prikazujejo iz predpomnilnika, nečiščene, dokler se njihovo besedilo ne spremeni.
- Starejše različice plaga so prepisale skript v `public/tiptap_bundle.js`. Te datoteke se ne uporabljajo več in jih je mogoče izbrisati:
  ```sh
  rm -f /path/to/redmine/public/tiptap_bundle.js /path/to/redmine/public/tiptap_bundle.js.map
  ```

## Migracija iz urejevalnika CKEditor

Če je vaš Redmine uporabil [redmine_ckeditor](https://github.com/a-ono/redmine_ckeditor), se lahko preklopite na ta plagi in obdržite vse besedilo, ki je bilo napisano: zahtevki, zabeležke, predstavitvene strani, novice, sporočila, dokumenti. Ničesar se ne pretvori in baza podatkov se ne dotakne. CKEditor shranjuje svoje besedile kot HTML in prav tako ta plagi, zato je shranjeno besedilo preprosto prikazano s novo formatrico.

1. Namestite plagi (glejte zgoraj) in izberite Oblikovanje besedila: *TipTap HTML*.
2. Obdržite mapo `public/system/rich/` vašega Redmineja. Če so ljudje vstavili slike in datoteke s preglednikom slik urejevalnika CKEditor, so shranjene tam, ne v bazi podatkov in ne med priloženimi datotekami, besedila pa se nanje sklicujejo po naslovu (`/system/rich/...`). **Če Redmine prestavite na drug strežnik ali ga namestite na novo, prenesite tudi to mapo**, skupaj z bazo podatkov in mapo `files/`: nobena od njiju teh datotek ne vsebuje, brez te mape pa slike v starih besedilih vrnejo napako 404. Priložene datoteke zahtevkov, predstavitvenih strani in tako naprej so shranjene kot prej in ne potrebujejo ničesar. Slike, vstavljene v tem urejevalniku, so navadne priložene datoteke. Mapa ostane potrebna tudi po odstranitvi redmine_ckeditor.
3. Odstranite redmine_ckeditor, ko ga ne potrebujete več.

Staro besedilo je prikazano tako, kot ga je prikazal urejevalnik CKEditor: pisave, velikosti, barve in poravnava, zamiki, seznami, tabele (področja, širine, podpisi, združene celice), slike (velikost, plavajoče, področje, slika znotraj povezave), povezave, bloki kode s svojim jezikom (osvetljeni), makroji Redmineja (`{{toc}}`, `{{collapse(Title) ... }}`, `{{thumbnail(...)}}` in tako naprej), wiki in povezave na zahtevke, navadni spletni naslovi, ki jih je mogoče klikniti, in vgrajena `<iframe>` (video). Besedilo, napisano v urejevalniku CKEditor, je prepoznano po njegovi kodi in obdrži razmik med odstavki, ki ga je imelo tam, kar je večje kot v tem urejevalniku.

Razlike namenoma:
- `<iframe>` se prikaže le, če kaže na drugo spletno mesto preko http(s), in je v peskovniku: stran znotraj lahko zažene svoje skripte, vendar ne more dostoči do strani Redmineja, odpre vrhnje okno ali predloži obrazce. Vse drugo `<iframe>` so odstranjeni.
- Povezave se odpro v istem oknu: atribut `target` povezave (»Novo okno (_blank)« urejevalnika CKEditor) se ne obdrži.
- Nekatera oblikovanja, ki ga je urejevalnik CKEditor ponudil, vendar njegove strani tiho ni izgubile, je prikazano tu: na primer barve ozadja njegovih slogov "Marker" in narekovaji `<q>`.
- Slog »Special Container« urejevalnika CKEditor (blok s sivim okvirjem) je prikazan kot blok kode brez poudarjanja, v urejevalniku pa je prav tako blok kode.

Staro besedilo obdrži svojo oblikovanje, ko se odpre v urejevalniku in ponovno shrani: makroji Redmineja (makro je ena siva prvina v urejevalniku; uredite ga v načinu `<HTML>`, kot v načinu Source urejevalnika CKEditor), `<iframe>`, bloki `<div>` in `<address>` s svojim slogom (`<div>`, prilepljen s spletne strani, še vedno postane odstavek), spodnji in zgornji indeks, vgrajeni slogi urejevalnika CKEditor (veliki, majhni, tipkovnica, vzorec in tako naprej), slog naslovov, tabel in celic tabele, velikost (širina in višina), lebdeči, področje in povezava slik, jezik blokov kode. Kaj ne preživi urejanja: naslov tabele postane osrednji odstavek zgoraj, glava in noga tabel postanejo navadne vrstice (noga ostane na dnu) in `<del>` postane `<s>` (enaka videz). Besedilo, shranjeno iz tega urejevalnika, dobi kompakten razmik odstavkov tega urejevalnika.
