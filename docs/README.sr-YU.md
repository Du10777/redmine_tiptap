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

> *Ovaj prevod je napravljen uz pomoć modela veštačke inteligencije i nije ga proverio izvorni govornik. Ako pronađete grešku, [otvorite issue ili pull request](https://github.com/Du10777/redmine_tiptap).*

Ovo je uređivač teksta za Redmine, zasnovan na TipTap-u https://github.com/ueberdosis/tiptap

Podržane verzije Redmine-a: **6.\*** (razvijeno i testirano na 6.1.4).

Mehanizam uređivača: **TipTap 3.31.4**. Svi paketi `@tiptap/*` fiksirani su na tačno ovu verziju u `package.json` i `package-lock.json` i uvek se moraju nadograđivati zajedno, na jednu istu verziju.

## Mogućnosti

**Oblikovanje teksta**
- Podebljano, kurziv, podvučeno, precrtano, donji i gornji indeks (Ctrl+, i Ctrl+.), kod unutar teksta.
- Boja teksta i boja pozadine: paleta od 64 boje ili bilo koja heksadecimalna vrednost.
- Font (13 fontova) i veličina fonta (unapred zadati vrednosti od 8 do 72 px ili bilo koja vrednost).
- Stilovi pasusa: naslovi 1–6 i običan tekst.
- Poravnanje (levo, centrirano, desno, obostrano) i uvlačenje (do 8 nivoa) pasusa i naslova.
- Veze: umetanje, izmena, uklanjanje.
- Horizontalna linija, opozivanje i ponavljanje.

**Liste**
- Liste sa nabrajanjem, sa markerima u obliku diska, kruga ili kvadrata.
- Numerisane liste: 1, 01, a, A, i, I, α.
- Liste zadataka sa poljima za potvrdu; završeni zadaci su precrtani.
- Ugneždene liste (Tab / Shift+Tab).

**Tabele**
- Umetanje tabele bilo koje veličine, sa redom zaglavlja ili bez njega.
- Kontekstni meni desnog klika u ćeliji: dodavanje i brisanje redova i kolona, spajanje i deljenje ćelija, red zaglavlja i kolona zaglavlja, brisanje tabele.
- Širine kolona menjaju se prevlačenjem ivica ćelija.
- Pri nalepljivanju iz Excel-a zadržavaju se širine kolona, poravnanje i veličine fonta; tabela kopirana iz Redmine-a nalepljuje se u Excel sa ivicama.

**Slike i priložene datoteke**
- Nalepljivanje slike iz klipborda: otprema se kao priložena datoteka i pojavljuje se u tekstu.
- Slike priložene pomoću Redmine-ovog polja "Datoteke" ili prevučene na njega takodje se umećuuu u tekst.
- Umetanje slike iz priloženih datoteka (izbor pomoću sličica) ili veze ka bilo kojoj priloženoj datoteci.
- Promena veličine slike prevlačenjem njenih uglova.

**Kod**
- Blokovi koda sa ističanjem sintakse u uređivaču i na sačuvanim stranicama: 52 jezika, a možete dodati i druge (pogledajte [Ističanje sintakse](#ističanje-sintakse)).
- Jezik bloka bira se pomoću znački u njegovu uglom, uz pretragu, kao i nedavno i često korišćene jezike.
- Tab i Shift+Tab povećavaju, odnosno smanjuju uvlačenje redova unutar bloka koda; podebljani tekst, veze i boje unutar koda se zadržavaju.

**Blokovi**
- Sklopivi blok: naslov sa skrivenim sadržajem (`<details>`). Na sačuvanim stranicama je sklopljen, a u uređivaču rasklopljeν.
- Blok citata sa redom za autora i datum.

**Uređivanje**
- Režim `<HTML>` za pregled i izmenu HTML izvornog koda: ugneždeni blokovi su uvučeni, prazan red razdvaja blokove koji zauzimaju više redova, sintaksa je obojena po istim pravilima kao u HTML bloku koda, a Enter zadržava uvlačenje reda.
- Kucanje u stilu Markdown-а: `#` za naslove, `-` i `1.` za liste, `[ ]` za zadatke, ```` ```python ```` za blok koda (bilo koje ime jezika ili bez njega), `**bold**`, `---` za horizontalnu liniju. Standardne prečice na tastaturi: Ctrl+B, Ctrl+I, Ctrl+U, Ctrl+Z i druge.
- Uređivač nikada ne postaje viši od prozora: traka sa alatama i dugmad obrasca ostaju u vidnom polju, a tekst se pomera unutar uređivača. Visina prati veličinu prozora i zum stranice.
- Ručica za promenu veličine u donjem desnom uglu služi za ručno podešavanje visine. Visina se pamti; dvostruki klik vraća automatsku visinu.

**Integracija sa Redmine-om**
- Radi u svim Redmine-ovim tekstualnim poljima sa oblikovanjem: opisi i beleške problema, wiki stranice, vesti, poruke na forumima, dokumenti, opisi projekata, prilagođena polja sa dugim tekstom, uključujući i polja koja se na stranici pojave kasnije.
- Tekst se čuva kao HTML. Da biste koristili uređivač, u podešavanjima Redmine-a izaberite *TipTap HTML* kao oblikovanje teksta.
- Interfejs (opisi alata, meniji, dijalozi) prati jezik iz Redmine profila korisnika. Sa dodatnom komponentom dolazi 47 od 50 jezika Redmine-a: engleski i ruski su potpuni, a ostalih 45 su nacrti napravljeni uz pomoć modela veštačke inteligencije, a izvorni govorioci su dobrodošli da ih isprave. Tri jezika koja se pišu zdesna nalevo (arapski, hebrejski, persijski) namerno nisu podržana (pogledajte [Jezik interfejsa](#jezik-interfejsa)).
- Ostaje brz i na velikim tekstovima: uređivači u skrivenim obrascima kreiraju se tek kada se obrazac otvori, a sintaksa dugačkih blokova koda istakuje se kada se oni pomeranjem nađu u vidnom polju.
- Tekstovi napisani u CKEditor-u (dodatna komponenta redmine_ckeditor) prikazuju se onako kako su bili i otvaraju se u uređivaču sa svojim oblikovanjem: nema konverzije, videti [Prelazak sa CKEditor-a](#prelazak-sa-ckeditor-a).
- Sačuvani tekstovi prikazuju se bez nebezbednog HTML-a: skripte, rukovalci događajima i `javascript:` veze uklanjaju se kada se stranica prikazuje, a zadržava se samo ono što sam uređivač proizvodi. Ovo obuhvata i tekstove koji stižu preko REST API-ja ili režima `<HTML>`.

## Ističanje sintakse

Sintaksa u blokovima koda istakuje se podjednako i u uređivaču i na sačuvanim stranicama. Jezik bloka bira se pomoću znački u njegovu gornjem desnom uglu; lista ima polje za pretragu i pamti nedavno i često korišćene jezike.

Sa dodatnom komponentom dolazi 52 jezika, među kojima su HTML, 1C, Cisco IOS, MikroTik RouterOS, Windows cmd, docker compose, dnevnici Linux servisa i izlaz komande journalctl.

Možete dodati sopstvene jezike. Svaki jezik je jedna datoteka u faskikli `highlight/`. Bilo koja od 190+ gramatika highlight.js, ili gramatika treće strane, konvertuje se u takvu datoteku jednom komandom:

```sh
python3 highlight/_convert_grammar.py erlang
sh highlight/_compile.sh
```

Detalji: [highlight/README/sr-YU.md](../highlight/README/sr-YU.md).

## Jezik interfejsa

Uređivač se prikazuje na jeziku izabranom u Redmine profilu korisnika (Moj nalog → Jezik). Datoteke za 47 od 50 jezika Redmine-a 6 ispručuju se sa dodatnom komponentom, u faskikli `config/locales/`. Engleski je izvorni jezik, a ruski pottiče od samog autora; ostalih 45 su nacrti napravljeni uz pomoć modela veštačke inteligencije koje izvorni govorioci još nisu proverili, pa tu i tamo očekujte neuobičajenu formulaciju. Tekst koji nedostaje u datoteci prikazuje se na engleskom.

Da biste ispravili prevod, izmenite njegove vrednosti u `config/locales/<code>.yml` (`de`, `fr`, `pt-BR`, ...) i ponovo pokrenite Redmine. `bundle exec rake redmine_tiptap:locales` proverava datoteke. Dobrodošli su pull request-ovi sa ispravkama.

**Jezici koji se pišu zdesna nalevo (arapski, hebrejski, persijski) namerno nisu podržani.** Njihova podrška zahtera mnoge izmene u kodu, a ne samo prevod, pa smo odlučili da to ne preuzimamo. Za ove jezike uređivač se prikazuje na engleskom, a njegov raspored se ne prilagođava. Ako vam je potreban neki od njih, napravite fork: mehanizam prevođenja je spreman, a šta još treba izmeniti navedeno je u [config/locales/README.md](../config/locales/README.md#right-to-left-languages).

Detalji i lista jezika Redmine-a: [config/locales/README.md](../config/locales/README.md).

## Instalacija

1. Stavite dodatnu komponentu u Redmine-ovu fasciklu `plugins`. Fascikla mora da se zove `redmine_tiptap`. Najlakši način je git, koji i ažuriranja svodi na jednu komandu:
   ```sh
   cd /path/to/redmine
   git clone https://github.com/Du10777/redmine_tiptap.git plugins/redmine_tiptap
   ```
2. Ponovo pokrenite Redmine.
3. U podešavanjima Redmine-a (redmine.selfhosted/_settings_) za Oblikovanje teksta izaberite *TipTap HTML*.

## Ažuriranje

Dodatna komponenta nema migracije baze podataka, a izgrađeni JavaScript paket i stilski list dio su repozitorijuma. Za ažuriranje na serveru nisu potrebni ni npm ni izgradnja: zamenite datoteke dodatne komponente i ponovo pokrenite Redmine.

Pre ažuriranja proverite da li nova verzija podrržava vašu verziju Redmine-a (pogledajte "Podržane verzije Redmine-a" iznad).

### Inštalirano pomoću git-a (preporučeno)

```sh
cd /path/to/redmine/plugins/redmine_tiptap
git pull
```

Zatim ponovo pokrenite Redmine, na primer:

```sh
sudo systemctl restart redmine          # Redmine radi kao systemd servis
touch /path/to/redmine/tmp/restart.txt  # Passenger
docker compose restart redmine          # Docker
```

Da biste ostali na određenoj verziji umesto na najnovijem komitu: `git fetch && git checkout <tag-or-commit>`.

### Inštalirano iz arhive

1. Izbrišite staru fasciklu `plugins/redmine_tiptap` i na njeno mjesto raspakujte novu verziju. Prethodno brisanje obezbeđuje da datoteke uklonjene u novoj verziji ne zaostanu.
2. Izbrišite `public/assets/.manifest.json` u faskikli Redmine-a.
3. Ponovo pokrenite Redmine.

Korak 2 je važan. Pri pokretanju Redmine ponovo objavljuje resurse dodatnih komponenti samo ako su njihove datoteke novije od ovog manifesta. Datoteke raspakovane iz arhive zadržavaju svoje prvobitne vremenske oznake, pa bez koraka 2 Redmine može i dalje da isporučuje stari uređivač. Manifest se automatski ponovo pravi pri pokretanju. Sa `git pull` ovaj korak nije potreban: git izmenjenim datotekama postavlja trenutno vreme.

### Posle ažuriranja

- Skripta i stilski list uređivača isporučuju se sa otiskom sadržaja u svojim URL adresama, pa pregledači učitavaju novu verziju odmah nakon ponovnog pokretanja. Korisnici ne moraju da brišu keš svog pregledača.
- Ako je u podešavanjima Redmine-a uključeno *Keširanje obrađenog teksta* (Administracija → Podešavanja → Opšti), jednom očistite Redmine-ov keš nakon ažuriranja na verziju koja menja kako se tekstovi prikazuju (čišćenje HTML-a, podrška za tekstove iz CKEditor-a): `bundle exec rake tmp:cache:clear RAILS_ENV=production` u faskikli Redmine-a. U suprotnom se stranice obrađene pre ažuriranja mogu prikazivati iz keša, nečišćene, sve dok se njihov tekst ne izmeni.
- Ranije verzije dodatne komponente kopirali su skriptu u `public/tiptap_bundle.js`. Ove datoteke se više ne koriste i mogu se izbrisati:
  ```sh
  rm -f /path/to/redmine/public/tiptap_bundle.js /path/to/redmine/public/tiptap_bundle.js.map
  ```

## Prelazak sa CKEditor-a

Ako vaš Redmine koristi [redmine_ckeditor](https://github.com/a-ono/redmine_ckeditor), možete preći na ovu dodatnu komponentu i zadržati svaki tekst koji je napisan: problemi, beleške, wiki stranice, vesti, poruke, dokumenti. Ništa se ne konvertuje i baza podataka se ne dodiruje. CKEditor čuva svoje tekstove kao HTML i takodje i ova dodatna komponenta, pa se čuvani tekst jednostavno prikazuje novim oblikivačem.

1. Inštalirajte dodatnu komponentu (videti iznad) i izaberite Oblikovanje teksta: *TipTap HTML*.
2. Zadržite fasciklu `public/system/rich/` vaše Redmine instalacije. Ako su ljudi umetali slike i datoteke pomoću CKEditor-ovog pregledača slika, one se čuvaju tamo, a ne u bazi podataka niti među priloženim datotekama, dok tekstovi na njih upućuju po adresi (`/system/rich/...`). **Ako se Redmine premesti na drugi server ili ponovo postavi, premestite i ovu fasciklu**, zajedno sa bazom podataka i fasciklom `files/`: nijedna od njih ne sadrži ove datoteke, a bez ove fascikle slike u starim tekstovima vraćaju grešku 404. Priložene datoteke problema, wiki stranica i slično čuvaju se kao i ranije i ne zahtevaju ništa. Slike umetnute pomoću ovog uređivača su obične priložene datoteke. Fascikla ostaje potrebna i kada se redmine_ckeditor ukloni.
3. Uklonite redmine_ckeditor kada vam više nije potrebna.

Stari tekst prikazuje se onako kako ga je prikazivao CKEditor: fontovi, veličine, boje i poravnanje, uvlačenja, liste, tabele (ivice, širine, naslovi, spojene ćelije), slike (veličina, plutanje, ivica, slika unutar veze), veze, blokovi koda sa svojim jezikom (istaknuty), Redmine makroi (`{{toc}}`, `{{collapse(Title) ... }}`, `{{thumbnail(...)}}` i slično), wiki i problem veze, obične veb adrese učinjene klikabilnim i ugneždeni `<iframe>` (video). Tekst napisan u CKEditor-u prepoznaje se po svojoj razmetki i zadržava razmak između pasusa koji je imao tamo, što je veći nego u ovom uređivaču.

Razlike namerno:
- `<iframe>` se prikazuje samo kada pokazuje na drugi sajt preko http(s), i on je izolovan u pesku: stranica unutar može pokrenuti svoje skripte, ali ne može dostići stranicu Redmine-a, otvoriti glavni prozor ili poslati obriesce. Svi ostali `<iframe>` uklanjaju se.
- Veze se otvaraju u istom prozoru: `target` atribut veze (CKEditor-ovo "New Window (_blank)") se ne zadržava.
- Neko oblikovanje koje je CKEditor nudio ali njegove stranice su šćutljivo izbacili prikazuje se ovde: na primer pozadinske boje njegovih "Marker" stilova i navodnika `<q>`.
- Stil „Special Container“ iz CKEditor-a (blok sa sivim okvirom) prikazuje se kao blok koda bez ističanja sintakse, a i u uređivaču je blok koda.

Stari tekst zadržava svoje oblikovanje kada se otvori u uređivaču i ponovo sačuva: Redmine makroi (makro je jedan siv element u uređivaču; izmenite ga u režimu `<HTML>`, kao u CKEditor-ovom režimu Source), `<iframe>`, blokovi `<div>` i `<address>` sa svojim stilom (`<div>` nalepljen sa veb stranice i dalje se pretvara u pasus), donji i gornji indeks, CKEditor-ovi unutrašnji stilovi (big, small, keyboard, sample i slično), stil naslova, tabela i ćelija tabele, veličina (širina i visina), plutanje, ivica i veza slike, jezik blokova koda. Šta ne preživi izmenu: naslov tabele postaje centriran pasus iznad nje, zaglavlje i podnožje tabele postaju obični redovi (podnožje ostaje na dnu) i `<del>` postaje `<s>` (isti izgled). Tekst sačuvan iz ovog uređivača dobija kompaktan razmak između pasusa ovog uređivača.
