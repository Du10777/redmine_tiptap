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

> *Ovaj prijevod je napravljen uz pomoć AI modela i nije verificiran od strane izvornog govornika. Ako nađete grešku, molim vas [otvorite problem ili pull request](https://github.com/Du10777/redmine_tiptap).*

Ovo je tekstualni editor za Redmine, temeljen na TipTap https://github.com/ueberdosis/tiptap

Podržane verzije Redminea: **6.\*** (razvijano i testirano na verziji 6.1.4).

Engine editora: **TipTap 3.31.4**. Svi `@tiptap/*` paketi su učvršćeni na ovu točnu verziju u `package.json` i `package-lock.json` i moraju se uvijek ažurirati zajedno, na istu verziju.

## Značajke

**Oblikovanje teksta**
- Podebljano, kurzivno, podcrtano, precrtano, donji i gornji indeks (Ctrl+, i Ctrl+.), tekst sa inline kodom.
- Boja teksta i boja pozadine: paleta od 64 boje ili bilo koja heksadecimalna vrijednost.
- Obitelj fontova (13 fontova) i veličina fonta (unaprijed postavljene vrijednosti od 8 do 72 px, ili bilo koja vrijednost).
- Stilovi odlomaka: naslovi 1–6 i normalan tekst.
- Poravnanje (lijevo, sredina, desno, opravdano) i uvlačenje (do 8 razina) odlomaka i naslova.
- Veze: umetnite, uredite, uklonite.
- Vodoravna crta, poništi i ponovi.

**Popisi**
- Popisi s grafičkim znamenima sa diska, kruga ili kvadrata.
- Brojani popisi: 1, 01, a, A, i, I, α.
- Popisi zadataka sa checkboxima; dovršeni zadaci su precrtani.
- Ugniježđeni popisi (Tab / Shift+Tab).

**Tablice**
- Umetnite tablicu bilo koje veličine, sa ili bez reda zaglavlja.
- Kontekstni izbornik u ćeliji: dodajte i brišite redove i stupce, spojite i podijelite ćelije, red zaglavlja i stupac zaglavlja, izbrišite tablicu.
- Širine stupaca se mijenjaju povlačenjem granica ćelija.
- Lijepljenje iz Excela čuva širine stupaca, poravnanje i veličine fontova; tablica kopirana iz Redminea se lijepi u Excel sa granicama.

**Slike i prilozi**
- Lijepi sliku iz međuspremnika: učitava se kao prilog i pojavljuje se u tekstu.
- Slike priložene poljem Redminea ili ispuštene na njega, umjećuju se i u tekst.
- Umetnite sliku iz priloga (birač sličica) ili vezu do bilo kojeg priloga.
- Promijenite veličinu slike povlačenjem njenih uglova.

**Kod**
- Blokovi koda sa isticanjem sintakse u editoru i na spremljenim stranicama: 52 jezika, i možete dodati više (vidi [Isticanje sintakse](#isticanje-sintakse)).
- Jezik bloka odabire se iz znaka u njegovom kutu sa pretraživanjem, nedavnim i često korišćenim jezicima.
- Tab i Shift+Tab povlače i uvlače linije unutar bloka koda; podebljano, veze i boje u kodu se čuvaju.

**Blokovi**
- Skupljiv blok: naslov sa skrivenim sadržajem (`<details>`). Skupljen na spremljenim stranicama, otvoren u editoru.
- Blok citata sa linijom autora i datuma.

**Uređivanje**
- `<HTML>` mod za prikaz i uređivanje HTML izvora: ugniježđeni blokovi su uvučeni, prazna linija odvaja blokove koji zauzimaju više linija, sintaksa je obojena po istim pravilima kao u HTML bloku koda, a Enter zadržava uvlaku linije.
- Pisanje u Markdown stilu: `#` za naslove, `-` i `1.` za popise, `[ ]` za zadatke, ```` ```python ```` za blok koda (bilo koji naziv jezika ili ništa), `**bold**`, `---` za vodoravnu crtu. Standardne tipkovničke prečice: Ctrl+B, Ctrl+I, Ctrl+U, Ctrl+Z i ostale.
- Editor nikada ne raste viši od prozora: alatna traka i gumbi formi ostaju vidljivi, a tekst se klizi unutar. Visina slijedi veličinu prozora i razinu zuma stranice.
- Ručica za promjenu veličine u donjem desnom kutu postavlja visinu ručno. Visina se pamti; dvostruki klik vraća automatsku visinu.

**Integracija u Redmine**
- Radi u svim poljima Redminea za oblikovanje teksta: opisi predmeta i napomene, wiki stranice, novosti, poruke foruma, dokumenti, opisi projekata, polja sa dugim tekstom po korisniku, uključujući polja koja se pojavljuju na stranici kasnije.
- Tekst se pohranjuje kao HTML. Da koristite editor, odaberite *TipTap HTML* kao oblikovanje teksta u Redmine postavkama.
- Sučelje (savjeti, izbornici, dijalozi) prati jezik u korisnički Redmine profilu. 47 od 50 jezika Redminea dolazi sa dodatkom: Engleski i Ruski su potpuni, ostalih 45 su skice napravljene sa AI modelom koje su izvorni govornici dobrodošli da isprave. Tri jezika napisana s desna na lijevo (Arapski, Hebrejski, Perzijski) su namjerno nepodržani (vidi [Jezik sučelja](#jezik-sučelja)).
- Ostaje brz na velikim tekstima: editori u skrivenim formama se stvaraju samo kada se forma otvori, a dugi blokovi koda se isticanjem obrađuju kada se pojave u vidnom polju.
- Tekstovi pisani u CKEditors-u (dodatak redmine_ckeditor) prikazuju se kao što su i otvaraju se u editoru sa svojim oblikovanjem: bez pretvorbe, vidi [Migracija sa CKEditora](#migracija-sa-ckeditora).
- Spremljeni tekstovi se prikazuju bez nesigurnog HTML-a: skripte, rukovaoce događaja i `javascript:` veze se uklanjaju kada se stranica prikaze, samo ono što sam editor proizvodi se čuva. Ovo pokriva tekstove koji dolaze kroz REST API ili `<HTML>` mod također.

## Isticanje sintakse

Blokovi koda su isticanjem obrade u editoru i na spremljenim stranicama podjednako. Jezik bloka odabire se iz znaka u njegovom gornjem desnom kutu; popis ima polje za pretraživanje i pamti nedavno i često korišćene jezike.

52 jezika dolaze sa dodatkom, između ostalog HTML, 1C, Cisco IOS, MikroTik RouterOS, Windows cmd, docker compose, Linux service logovi i journalctl izlaz.

Možete dodati svoje jezike. Svaki jezik je jedna datoteka u `highlight/` mapi. Bilo koja od 190+ highlight.js gramatike, ili gramatika treće strane, pretvara se u takvu datoteku sa jednom naredbom:

```sh
python3 highlight/_convert_grammar.py erlang
sh highlight/_compile.sh
```

Detalji: [highlight/README/hr.md](../highlight/README/hr.md).

## Jezik sučelja

Editor govori jezikom odabranim u korisnički Redmine profilu (Moj profil → Primarni jezik). Datoteke za 47 od 50 jezika Redminea 6 dolaze sa dodatkom, u `config/locales/`. Engleski je izvor i Ruski je od autora; ostalih 45 su skice napravljene uz pomoć AI modela i još nisu verificirane od strane izvornih govornika, zato očekujte nečudnu frazu tu i tamo. Tekst koji nedostaje u datoteci prikazuje se na engleskom.

Da ispravite prijevod, promijenite njegove vrijednosti u `config/locales/<code>.yml` (`de`, `fr`, `pt-BR`, ...) i restartujte Redmine. `bundle exec rake redmine_tiptap:locales` provjerava datoteke. Pull zahtjevi sa ispravkama su dobrodošli.

**Jezici napisani s desna na lijevo (Arapski, Hebrejski, Perzijski) su namjerno nepodržani.** Njihova podrška zahtijeva mnoge promjene u bazi koda, ne samo prijevod, i odlučili smo da to ne činimo. Za te jezike editor se prikazuje na engleskom i njegov raspored se ne prilagođava. Ako trebate jedan od njih, napravite ogranak: mehanizam prijevoda je spreman, a što se drugoga trebati promijeniti je navedeno u [config/locales/README.md](../config/locales/README.md#right-to-left-languages).

Detalji i popis jezika Redminea: [config/locales/README.md](../config/locales/README.md).

## Instalacija

1. Stavite dodatak u `plugins` mapu Redminea. Mapa mora biti nazvana `redmine_tiptap`. Najjednostavniji način je git, koji također čini ažuriranje jednom naredbom:
   ```sh
   cd /path/to/redmine
   git clone https://github.com/Du10777/redmine_tiptap.git plugins/redmine_tiptap
   ```
2. Restartujte Redmine.
3. U Redmine postavkama (redmine.selfhosted/_settings_) odaberite Oblikovanje teksta: *TipTap HTML*.

## Ažuriranje

Dodatak nema migracijskih baza podataka, a izgrađeni JavaScript bundel i stylesheet su dio repozitorija. Ažuriranje ne trebata npm ili gradnju na serveru: zamijenite datoteke dodatka i restartujte Redmine.

Prije ažuriranja provjerite da nova verzija podržava vašu verziju Redminea (vidi "Podržane verzije Redminea" gore).

### Instaliran sa git-om (preporučeno)

```sh
cd /path/to/redmine/plugins/redmine_tiptap
git pull
```

Zatim restartujte Redmine, na primjer:

```sh
sudo systemctl restart redmine          # Redmine je pokrenut kao systemd usluga
touch /path/to/redmine/tmp/restart.txt  # Passenger
docker compose restart redmine          # Docker
```

Da ostanete na određenoj verziji umjesto najnovijeg commita: `git fetch && git checkout <tag-or-commit>`.

### Instaliran iz arhive

1. Izbrišite stari `plugins/redmine_tiptap` mapu i raspakujte novu verziju na njezino mjesto. Brisanje prvo osigurava da datoteke uklonjene u novoj verziji ne ostanu.
2. Izbrišite `public/assets/.manifest.json` u Redmine mapi.
3. Restartujte Redmine.

Korak 2 je bitan. Pri pokretanju Redmine ponovo objavljuje datoteke dodatka samo ako su njihove datoteke novije od ovog manifesta. Datoteke raspakivane iz arhive čuvaju svoje originalne vremenske oznake, tako da bez koraka 2 Redmine može nastaviti posluživati stari editor. Manifest se automatski ponovno kreira pri pokretanju. Sa `git pull` ovaj korak nije potreban: git daje promijenjenim datotekama trenutno vrijeme.

### Nakon ažuriranja

- Skripte i stilovi editora se serviser sa sadržajnom otiska u njihovim URL-ima, tako da pretraživači učitaju novu verziju odmah nakon restarta. Korisnici nisu trebali da očiste keš svojih pretraživača.
- Ako je *Cache formatted text* omogućeno u Redmine postavkama (Administracija → Postavke → Općenito), očistite Redmine keš jednom nakon ažuriranja na verziju koja mijenja kako se tekstovi prikazuju (čišćenje HTML-a, podrška tekstovima iz CKEditora): `bundle exec rake tmp:cache:clear RAILS_ENV=production` u Redmine mapi. U drugom slučaju stranice prikazane prije ažuriranja mogu biti prikazane iz keša, očišćene, dok se njihov tekst ne promijeni.
- Ranije verzije dodatka su kopirali skriptu u `public/tiptap_bundle.js`. Ove datoteke se više ne koriste i mogu biti izbrisane:
  ```sh
  rm -f /path/to/redmine/public/tiptap_bundle.js /path/to/redmine/public/tiptap_bundle.js.map
  ```

## Migracija sa CKEditora

Ako je vaš Redmine koristio [redmine_ckeditor](https://github.com/a-ono/redmine_ckeditor), možete preći na ovaj dodatak i zadržati sve tekstove koji su napisani: predmete, napomene, wiki stranice, novosti, poruke, dokumente. Ništa se ne pretvara i baza podataka se ne dotakne. CKEditor sprema svoje tekstove kao HTML i tako i ovaj dodatak, tako da se spremljeni tekst jednostavno prikazuje od strane novog formatera.

1. Instalirajte dodatak (vidi gore) i odaberite Oblikovanje teksta: *TipTap HTML*.
2. Zadržite `public/system/rich/` mapu vašeg Redminea. Ako su ljudi umetnuli slike i datoteke CKEditorovim preglednikom slika, one su spremljene tamo, ne u bazi podataka i ne među prilozima, a tekstovi na njih upućuju po adresi (`/system/rich/...`). **Ako se Redmine preseli na drugi server ili se ponovno postavi, preselite i ovu mapu**, zajedno s bazom podataka i mapom `files/`: nijedna od njih ne sadrži te datoteke, a bez te mape slike u starim tekstovima daju grešku 404. Prilozi predmeta, wiki stranica i tako dalje spremaju se kao prije i ne treba im ništa. Slike umetnute u ovaj editor obični su prilozi. Mapa je i dalje potrebna nakon što se ukloni redmine_ckeditor.
3. Uklonite redmine_ckeditor kada ga više ne trebate.

Stari tekst prikazuje se kao što ga je prikazao CKEditor: fontovi, veličine, boje i poravnanja, uvlakanja, popisi, tablice (granice, širine, naslovi, spojene ćelije), slike (veličina, plutanje, granica, slika unutar veze), veze, blokovi koda sa njihovim jezikom (isticanjem obrade), Redmine makroi (`{{toc}}`, `{{collapse(Title) ... }}`, `{{thumbnail(...)}}` i tako dalje), wiki i veze predmeta, obični web adrese učinjene klikabilnima, i ugnježđeni `<iframe>` (video). Tekst napisan u CKEditorsu se prepoznaje po njegovoj oznaci i čuva razmak između odlomaka koji je imao tamo, što je veće nego u ovom editoru.

Namjerne razlike:
- `<iframe>` prikazuje se samo kada pokazuje na drugo mjesto preko http(s), i sandiboxan je: stranica unutar može pokrenuti svoje skripte, ali ne može dosegnuti Redmine stranicu, otvoriti gornji prozor ili poslati forme. Svi ostali `<iframe>` se uklanjaju.
- Veze se otvaraju u istom prozoru: `target` atribut veze (CKEditorov "Novi prozor (_blank)") se ne čuva.
- Neko oblikovanje koji je CKEditor nudao ali su njegove stranice tiho odbacile prikazuje se ovdje: na primjer boje pozadine njegovih "Marker" stilova i navodnici od `<q>`.
- CKEditorov stil „Special Container“ (blok sa sivim okvirom) prikazuje se kao blok koda bez isticanja sintakse, a i u editoru je blok koda.

Stari tekst čuva svoje oblikovanje kada se otvori u editoru i ponovo spremi: Redmine makroi (makro je jedan sivi element u editoru; uredite ga u `<HTML>` modu, kao u CKEditorovom Source modu), `<iframe>`, `<div>` i `<address>` blokovi sa svojim stilom (`<div>` koji se zalijepi s web stranice i dalje se pretvara u odlomak), donji i gornji indeks, CKEditorovi inline stilovi (veliki, mali, tipkovnica, uzorak i tako dalje), stil naslova, tablica i ćelija tablica, veličina (širina i visina), plutanje, granica i veza slika, jezik blokova koda. Ono što ne preživi uređivanje: naslov tablice postaje centriran odlomak iznad nje, sekcije zaglavlja i podnožja tablice postaju obični redovi (podnožje ostaje na dnu) i `<del>` postaje `<s>` (isti izgled). Tekst spremljen iz ovog editora dobiva kompaktan razmak odlomaka ovog editora.
