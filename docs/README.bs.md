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

> *Ovaj prijevod je napravljen uz pomoć AI modela i nije provjeren od strane izvornog govornika. Ako nađete grešku, molim vas [otvorite pitanje ili pull request](https://github.com/Du10777/redmine_tiptap).*

Ovo je tekstualni editor za Redmine, baziran na TipTap https://github.com/ueberdosis/tiptap

**[Isprobajte editor online](https://du10777.github.io/redmine_tiptap/)**: na demo stranici editor ovog plugina radi direktno u vašem pregledniku, na stranici napravljenoj kao obrazac Redminea. Kucajte i formatirajte tekst, zalijepite sliku, otvorite karticu „Pregled“ da vidite kako će tekst izgledati nakon spremanja, promijenite jezik interfejsa ili odaberite primjer teksta. Ništa ne treba instalirati i ništa se nikamo ne šalje.

[![Editor na demo stranici](../docs/images/demo.png)](https://du10777.github.io/redmine_tiptap/)

Engine editora: **TipTap 3.31.4**. Svi `@tiptap/*` paketi su fiksirani na ovu tačnu verziju u `package.json` i `package-lock.json` i moraju se uvijek ažurirati zajedno, na istu verziju.

**Sadržaj**

- [Podržane verzije Redminea](#podržane-verzije-redminea)
- [Karakteristike](#karakteristike)
  - [Formatiranje teksta](#formatiranje-teksta)
  - [Liste](#liste)
  - [Tabele](#tabele)
  - [Slike i prilozi](#slike-i-prilozi)
  - [Kod](#kod)
  - [Blokovi](#blokovi)
  - [Uređivanje](#uređivanje)
  - [Integrisanje u Redmine](#integrisanje-u-redmine)
- [Isticanje sintakse](#isticanje-sintakse)
- [Jezik interfejsa](#jezik-interfejsa)
- [Instalacija](#instalacija)
- [Ažuriranje](#ažuriranje)
  - [Instaliran sa git-om (preporučeno)](#instaliran-sa-git-om-preporučeno)
  - [Instaliran iz arhive](#instaliran-iz-arhive)
  - [Nakon ažuriranja](#nakon-ažuriranja)
- [Migracija iz CKEditora](#migracija-iz-ckeditora)

## Podržane verzije Redminea

| Redmine | Podrška | Testirano na |
|---|---|---|
| 7.x | da | 7.0.2 |
| 6.x | da | 6.1.4, 6.1.5 |
| 5.x i starije | ne | — |

Nova glavna verzija (8.x i kasnije) postaje podržana tek nakon što se plugin testira na njoj. Do tada se Redmine te verzije ne pokreće s instaliranim pluginom: zaustavlja se s greškom u kojoj su navedene podržane verzije.

## Karakteristike

### Formatiranje teksta
- Podebljan, kurziv, podcrtan, precrtan tekst, donji i gornji indeks (Ctrl+, i Ctrl+.), inline kod.
- Boja teksta i boja pozadine: paleta od 64 boje ili bilo koja hex vrijednost.
- Tip fonta (13 fontova) i veličina fonta (unaprijed postavljene vrijednosti od 8 do 72 px, ili bilo koja vrijednost).
- Stilovi paragrafa: naslovi 1–6 i normalan tekst.
- Poravnanje (lijevo, centar, desno, rasprostiranje) i uvlaka (do 8 nivoa) paragrafa i naslova.
- Linkovi: umetni, uredi, ukloni.
- Horizontalna linija, poništi i ponovi.

### Liste
- Nabrojane liste sa pokazivačima diska, kruga ili kvadrata.
- Numerisane liste: 1, 01, a, A, i, I, α.
- Liste zadataka sa checkboxima; završeni zadaci su precrtani.
- Ugniježđene liste (Tab / Shift+Tab).

### Tabele
- Umetni tabelu bilo koje veličine, sa ili bez reda zaglavlja.
- Meni desnog klika u ćeliji: dodaj i obriši redove i kolone, spoji i razdvoji ćelije, red zaglavlja i kolona zaglavlja, obriši tabelu.
- Širine kolona se mijenjaju povlačenjem granica ćelija.
- Lijepljenje iz Excela čuva širine kolona, poravnanje i veličine fontova; tabela kopirana iz Redminea se lijepi u Excel sa granicama.

### Slike i prilozi
- Lijepi sliku iz međuspremnika: učitava se kao prilog i pojavljuje se u tekstu.
- Slike priložene Redminea poljem fajla, ili ispuštene na njega, se takođe umeću u tekst.
- Umetni sliku iz priloga (birač sličica) ili link ka bilo kom prilogu.
- Promijeni veličinu slike povlačenjem njenih uglova.

### Kod
- Blokovi koda sa isticanjem sintakse u editoru i na spremljenim stranicama: 52 jezika, i možete dodati više (vidite [Isticanje sintakse](#isticanje-sintakse)).
- Jezik bloka se bira iz znaka u njegovom uglu, sa pretraživanjem, nedavnim i često korišćenim jezicima.
- Tab i Shift+Tab uvlače i izvlače linije unutar bloka koda; podebljan, linkovi i boje unutar koda se čuvaju.

### Blokovi
- Skupljivi blok: naslov sa skrivenim sadržajem (`<details>`). Skupljen na spremljenim stranicama, otvoren u editoru.
- Blok navoda sa linijom autora i datuma.

### Uređivanje
- `<HTML>` mod za pregled i uređivanje HTML izvora: ugniježđeni blokovi su uvučeni, prazna linija odvaja blokove koji zauzimaju više linija, sintaksa je obojena po istim pravilima kao u HTML bloku koda, a Enter zadržava uvlaku linije.
- Pisanje u stilu Markdown: `#` za naslove, `-` i `1.` za liste, `[ ]` za zadatke, ```` ```python ```` za blok koda (bilo koji naziv jezika ili ništa), `**bold**`, `---` za horizontalnu liniju. Standardne prečice tastature: Ctrl+B, Ctrl+I, Ctrl+U, Ctrl+Z i ostale.
- Editor nikada ne postaje veći od prozora: alatna traka i dugmići formi ostaju vidljivi, i tekst se klizi unutar. Visina slijedi veličinu prozora i zumiranje stranice.
- Ručica za promjenu veličine u donjem desnom uglu postavlja visinu ručno. Visina se pamti; dupli klik vraća automatsku visinu.

### Integrisanje u Redmine
- Radi u svim poljima Redminea za formatiranje teksta: opisi tiketa i komentari, wiki stranice, novosti, poruke foruma, dokumenti, opisi projekata, polja sa dugačkim tekstom po korisničkoj želji, uključujući polja koja se pojavljuju na stranici kasnije.
- Tekst se pohranjuje kao HTML. Da koristite editor, odaberite *TipTap HTML* kao formatiranje teksta u postavkama Redminea.
- Interfejs (savjeti, meniji, dijalozi) prati jezik u Redmine profilu korisnika. 47 od 50 jezika Redminea dolazi sa pluginom: Engleski i Ruski su kompletan, ostalih 45 su nacrti napravljeni sa AI modelom koje su izvorni govorknici dobrodošli da ispravljaju. Tri jezika napisana desno nalijevo (Arapski, Hebrejski, Perzijski) su namjerno nepodržani (vidite [Jezik interfejsa](#jezik-interfejsa)).
- Ostaje brz na velikim tekstima: editori u skrivenim formama se kreiraju samo kada se forma otvori, a dugi blokovi koda se isticanjem obrađuju kada se pojave u vidnom polju.
- Tekstovi pisani u CKEditors-u (plugin redmine_ckeditor) se prikazuju onako kako su i otvaraju se u editoru sa svojom formatiranjem: bez konverzije, vidite [Migracija iz CKEditora](#migracija-iz-ckeditora).
- Spremljeni tekstovi se prikazuju bez nesigurnog HTML-a: skripte, rukovaoce događaja i `javascript:` linkovi se uklanjaju kada se stranica prikaze, samo ono što sam editor proizvodi se čuva. Ovo pokriva tekstove koji dolaze kroz REST API ili `<HTML>` mod takođe.

## Isticanje sintakse

Blokovi koda se isticanjem obrađuju u editoru i na spremljenim stranicama jednako. Jezik bloka se bira iz znaka u njegovom gornjem desnom uglu; lista ima polje za pretraživanje i pamti nedavno i često korišćene jezike.

52 jezika dolaze sa pluginom, među njima HTML, 1C, Cisco IOS, MikroTik RouterOS, Windows cmd, docker compose, Linux service logovi i journalctl izlaz.

Možete dodati svoje jezike. Svaki jezik je jedna datoteka u `highlight/` fascikli. Bilo koju od 190+ highlight.js gramatika, ili gramatiku treće strane, pretvorite u takvu datoteku sa jednom naredbom:

```sh
python3 highlight/_convert_grammar.py erlang
sh highlight/_compile.sh
```

Detalji: [highlight/README/bs.md](../highlight/README/bs.md).

## Jezik interfejsa

Editor govori na jeziku odabranom u Redmine profilu korisnika (Moj račun → Jezik). Datoteke za 47 od 50 jezika Redminea dolaze sa pluginom, u `config/locales/`. Engleski je izvor i Ruski je od autora; ostalih 45 su nacrti napravljeni uz pomoć AI modela i još nisu pregledani od izvornih govornika, zato očekujte nečudnu frazu tu i tamo. Tekst koji nedostaje u datoteci se prikazuje na engleskom.

Da ispravite prijevod, promijenite njegove vrijednosti u `config/locales/<code>.yml` (`de`, `fr`, `pt-BR`, ...) i restartujte Redmine. `bundle exec rake redmine_tiptap:locales` provjerava datoteke. Pull requestovi sa ispravkama su dobrodošli.

**Jezici napisani desno nalijevo (Arapski, Hebrejski, Perzijski) su namjerno nepodržani.** Njihova podrška zahtijeva mnoge promjene u bazi koda, ne samo prijevod, i odabrali smo da to ne učinimo. Za te jezike editor se prikazuje na engleskom i njegov raspored se ne prilagođava. Ako trebate jedan od njih, napravite fork: mehanizam prijevoda je spreman, i šta drugoga trebate da se promijeni je navedeno u [config/locales/README.md](../config/locales/README.md#right-to-left-languages).

Detalji i lista jezika Redminea: [config/locales/README.md](../config/locales/README.md).

## Instalacija

1. Stavite plugin u `plugins` fasciklu Redminea. Fascikla mora biti nazvana `redmine_tiptap`. Najjednostavniji način je git, što takođe čini ažuriranja jednom naredbom:
   ```sh
   cd /path/to/redmine
   git clone --branch release --single-branch --depth 1 https://github.com/Du10777/redmine_tiptap.git plugins/redmine_tiptap
   ```
   Grana `release` sadrži samo datoteke koje su pluginu potrebne za rad, bez ove dokumentacije, a `--depth 1` ne preuzima historiju repozitorija.
2. Restartujte Redmine.
3. U postavkama Redminea (redmine.selfhosted/_settings_) odaberite Formatiranje teksta: *TipTap HTML*.

## Ažuriranje

Plugin nema migracijskih baza podataka, i građeni JavaScript bundel i stylesheet su dio repozitorijuma. Ažuriranje ne trebava npm ili gradnji na serveru: zamijenite datoteke plugina i restartujte Redmine.

Prije ažuriranja, provjerite da nova verzija podržava vašu verziju Redminea (vidite "Podržane verzije Redminea" gore).

### Instaliran sa git-om (preporučeno)

```sh
cd /path/to/redmine/plugins/redmine_tiptap
git pull
```

Zatim restartujte Redmine, na primjer:

```sh
sudo systemctl restart redmine          # Redmine pokrenut kao systemd servis
touch /path/to/redmine/tmp/restart.txt  # Passenger
docker compose restart redmine          # Docker
```

Da ostanete na određenoj verziji umjesto najnovije, preuzmite commit grane `release` i prebacite se na njega: `git fetch --depth 1 origin <commit> && git checkout <commit>`.

Ako je plugin instaliran običnim `git clone` (grana `main`, s dokumentacijom i cijelom historijom), jednom pređite na granu `release`: obrišite folder `plugins/redmine_tiptap` i ponovo instalirajte plugin kako je opisano u odjeljku [Instalacija](#instalacija). Plugin u svom folderu ne čuva ništa svoje, pa se ništa ne gubi; samo jezike isticanja koda koje ste sami dodali prvo kopirajte iz `highlight/`.

### Instaliran iz arhive

1. Preuzmite `redmine_tiptap.zip` iz posljednjeg izdanja: https://github.com/Du10777/redmine_tiptap/releases/latest/download/redmine_tiptap.zip. U njemu su iste datoteke kao u grani `release` (plugin bez ove dokumentacije). Obrišite stari folder `plugins/redmine_tiptap` i raspakujte arhivu na njegovo mjesto; folder unutra već se zove `redmine_tiptap`. Brisanje najprije osigurava da datoteke uklonjene u novoj verziji ne ostanu.
2. Obrisite `public/assets/.manifest.json` u Redmine fascikli.
3. Restartujte Redmine.

Korak 2 je bitan. Pri pokretanju Redmine ponovo objavljuje plugin resurse samo ako su njihove datoteke novije od ovog manifesta. Datoteke raspakivane iz arhive čuvaju svoje izvorne vremenske žigove, tako da bez koraka 2 Redmine može nastaviti da služi stari editor. Manifest se automatski ponovo pravi pri pokretanju. Sa `git pull` ovaj korak nije potreban: git daje promijenjenim datotekama trenutno vrijeme.

### Nakon ažuriranja

- Skripti i stilovi editora se serve sa finger printi sadržaja u njihovim URL-ima, tako da pregledači učitaju novu verziju odmah nakon restarta. Korisnici nisu trebali da obriše keš svojih pregledača.
- Ako je *Keširaj formatirani tekst* omogućen u postavkama Redminea (Administracija → Postavke → Općenito), obrišite Redmine keš jednom nakon ažuriranja na verziju koja mijenja kako se tekstovi prikazuju (čišćenje HTML-a, podrška tekstovima iz CKEditora): `bundle exec rake tmp:cache:clear RAILS_ENV=production` u Redmine fascikli. U drugom slučaju stranice prikazane prije ažuriranja mogu biti pokazane iz keša, nečišćene, dok se njihov tekst ne promijeni.
- Ranije verzije plugina su kopirali skriptu u `public/tiptap_bundle.js`. Ove datoteke se više ne koriste i mogu biti obrisane:
  ```sh
  rm -f /path/to/redmine/public/tiptap_bundle.js /path/to/redmine/public/tiptap_bundle.js.map
  ```

## Migracija iz CKEditora

Ako vaš Redmine je koristio [redmine_ckeditor](https://github.com/a-ono/redmine_ckeditor), možete se prebaciti na ovaj plugin i zadržati sve tekstove koji su pisani: tikete, komentare, wiki stranice, novosti, poruke, dokumente. Ništa se ne konvertuje i baza podataka se ne dotiče. CKEditor pohranjuje svoje tekstove kao HTML i tako i ovaj plugin, tako da se pohranjen tekst jednostavno prikazuje od strane novog formatera.

1. Instalirajte plugin (vidite gore) i odaberite Formatiranje teksta: *TipTap HTML*.
2. Zadržite fasciklu `public/system/rich/` vašeg Redminea. Ako su ljudi umetnuli slike i datoteke pomoću pretraživača slika CKEditora, one se čuvaju tamo, a ne u bazi podataka niti među prilozima, i tekstovi se na njih odnose po adresi (`/system/rich/...`). **Ako se Redmine prenosi na drugi server ili se ponovo instalira, prenesite i ovu fasciklu**, zajedno sa bazom podataka i fasciklom `files/`: ni u jednoj od njih nema ovih datoteka, a bez fascikle slike u starim tekstovima prikazuju grešku 404. Prilozi tiketa, wiki stranica i tako dalje se čuvaju kao prije i ne zahtijevaju ništa. Slike umetnute u ovaj editor su obični prilozi. Fascikla ostaje potrebna i nakon uklanjanja redmine_ckeditor.
3. Uklonite redmine_ckeditor kada ga više ne trebate.

Stari tekst se prikazuje onako kako je CKEditor prikazao: fontovi, veličine, boje i poravnanja, uvlake, liste, tabele (granice, širine, naslovi, spojene ćelije), slike (veličina, plovak, granica, slika unutar linka), linkovi, blokovi koda sa njihovim jezikom (isticanjem obrađeni), Redmine makroi (`{{toc}}`, `{{collapse(Title) ... }}`, `{{thumbnail(...)}}` i tako dalje), wiki i linkovi tiketa, obični web adrese napravljeni klikabilni, i ugnježđeni `<iframe>` (video). Tekst napisan u CKEditors-u se prepoznaje po njegovoj oznaci i čuva razmak između paragrafa koji je imao tamo, što je veći nego u ovom editoru.

Razlike namjerno:
- `<iframe>` se prikazuje samo kada ukazuje na drugo mjesto preko http(s), i on je sandboxan: stranica unutar može pokrenuti svoje skripte, ali ne može dosegnuti stranicu Redminea, otvoriti gornji prozor ili poslati forme. Svi ostali `<iframe>` se uklanjaju.
- Linkovi se otvaraju u istom prozoru: atribut `target` linka (CKEditor-ova "Novi prozor (_blank)") se ne čuva.
- Neka formatiranja koja je CKEditor nudio ali su njegove stranice tiho odbacile se ovdje prikazuju: na primjer boje pozadine njegovih "Marker" stilova i navodnici od `<q>`.
- CKEditor-ov stil „Special Container“ (blok sa sivim okvirom) prikazuje se kao blok koda bez isticanja, a u editoru je takođe blok koda.

Stari tekst čuva svoje formatiranje kada se otvori u editoru i ponovo spremi: Redmine makroi (makro je jedan sivi element u editoru; uredite ga u `<HTML>` modu, kao u CKEditor-ovom Source modu), `<iframe>`, `<div>` i `<address>` blokovi sa svojim stilom (`<div>` zalijepljen sa web stranice se i dalje pretvara u paragraf), donji i gornji indeks, CKEditor-ovi inline stilovi (veliki, mali, tastatura, uzorak i tako dalje), stil naslova, tabela i ćelija tabela, veličina (širina i visina), plovak, granica i link slika, jezik blokova koda. Šta ne preživi uređivanje: naslov tabele postaje centriran paragraf iznad nje, zaglavlje i podnožje sekcije tabele postaju obični redovi (podnožje ostaje na dnu) i `<del>` postaje `<s>` (isti izgled). Tekst spremljen iz ovog editora dobija kompaktan razmak paragrafa ovog editora.
