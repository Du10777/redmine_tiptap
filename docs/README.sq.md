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

> *Ky përkthim është bërë me ndihmën e një modeli të inteligjencës artificiale dhe nuk është rishikuar nga një folës amtar. Nëse gjeni ndonjë gabim, ju lutemi [hapni një issue ose një pull request](https://github.com/Du10777/redmine_tiptap).*

Ky është një përpunues teksti për Redmine, i bazuar në TipTap https://github.com/ueberdosis/tiptap

**[Provoni përpunuesin në internet](https://du10777.github.io/redmine_tiptap/)**: faqja e demonstrimit e ekzekuton përpunuesin e kësaj shtojce drejtpërdrejt në shfletuesin tuaj, në një faqe të bërë si një formular i Redmine-it. Shkruani dhe formatoni tekst, ngjitni një figurë, hapni skedën «Paraparje» për të parë si do të duket teksti pasi të ruhet, ndërroni gjuhën e ndërfaqes ose zgjidhni një tekst shembull. Asgjë për të instaluar dhe asgjë nuk dërgohet askund.

[![Përpunuesi në faqen e demonstrimit](../docs/images/demo.png)](https://du10777.github.io/redmine_tiptap/)

Motori i përpunuesit: **TipTap 3.31.4**. Të gjitha paketat `@tiptap/*` janë fiksuar në këtë version të saktë në `package.json` dhe `package-lock.json` dhe duhet të përditësohen gjithmonë së bashku, në një dhe të njëjtin version.

**Përmbajtja**

- [Versionet e mbështetura të Redmine-it](#versionet-e-mbështetura-të-redmine-it)
- [Veçoritë](#veçoritë)
  - [Formatimi i tekstit](#formatimi-i-tekstit)
  - [Listat](#listat)
  - [Tabelat](#tabelat)
  - [Figurat dhe bashkëngjitjet](#figurat-dhe-bashkëngjitjet)
  - [Kodi](#kodi)
  - [Blloqet](#blloqet)
  - [Përpunimi](#përpunimi)
  - [Integrimi me Redmine](#integrimi-me-redmine)
- [Theksimi i sintaksës](#theksimi-i-sintaksës)
- [Gjuha e ndërfaqes](#gjuha-e-ndërfaqes)
- [Instalimi](#instalimi)
- [Përditësimi](#përditësimi)
  - [Instaluar me git (e rekomanduar)](#instaluar-me-git-e-rekomanduar)
  - [Instaluar nga një arkiv](#instaluar-nga-një-arkiv)
  - [Pas përditësimit](#pas-përditësimit)
- [Migrimi nga CKEditor](#migrimi-nga-ckeditor)

## Versionet e mbështetura të Redmine-it

| Redmine | Mbështetet | Testuar në |
|---|---|---|
| 7.x | po | 7.0.2 |
| 6.x | po | 6.1.4, 6.1.5 |
| 5.x dhe më të vjetra | jo | — |

Një version i ri kryesor (8.x e më pas) mbështetet vetëm pasi shtojca të jetë testuar në të. Deri atëherë, Redmine i atij versioni nuk niset me shtojcën të instaluar: ndalet me një gabim që përmend versionet e mbështetura.

## Veçoritë

### Formatimi i tekstit
- Të trasha, të pjerrëta, të nënvizuara, me vijë në mes, indeks i poshtëm dhe i sipërm (Ctrl+, dhe Ctrl+.), kod brenda rreshtit.
- Ngjyra e tekstit dhe ngjyra e sfondit: një paletë me 64 ngjyra ose çdo vlerë heksadecimale.
- Familja e shkronjave (13 fonte) dhe madhësia e shkronjave (vlera të paracaktuara nga 8 deri në 72 px, ose çdo vlerë).
- Stilet e paragrafit: titujt 1–6 dhe teksti normal.
- Rreshtimi (majtas, në qendër, djathtas, në të dy anët) dhe kryeradha (deri në 8 nivele) e paragrafëve dhe e titujve.
- Lidhjet: futje, përpunim, heqje.
- Vijë horizontale, zhbërje dhe ribërje.

### Listat
- Lista me pika, me shënues në formë disku, rrethi ose katrori.
- Lista të numëruara: 1, 01, a, A, i, I, α.
- Lista detyrash me kuti shënimi; detyrat e kryera shfaqen me vijë në mes.
- Lista brenda listash (Tab / Shift+Tab).

### Tabelat
- Futni një tabelë me çfarëdo madhësie, me ose pa rresht kreu.
- Menuja me klikim të djathtë në një qelizë: shtim dhe fshirje rreshtash e shtyllash, bashkim dhe ndarje qelizash, rresht kreu dhe shtyllë kreu, fshirje e tabelës.
- Gjerësia e shtyllave ndryshohet duke tërhequr kufijtë e qelizave.
- Ngjitja nga Excel ruan gjerësinë e shtyllave, rreshtimin dhe madhësitë e shkronjave; një tabelë e kopjuar nga Redmine ngjitet në Excel me kufij.

### Figurat dhe bashkëngjitjet
- Ngjitni një figurë nga clipboard-i: ngarkohet si bashkëngjitje dhe shfaqet në tekst.
- Figurat e bashkëngjitura përmes fushës së kartelave të Redmine-it, ose të lëshuara mbi të, futen gjithashtu në tekst.
- Futni një figurë nga bashkëngjitjet (një përzgjedhës me miniatura) ose një lidhje me çfarëdo bashkëngjitjeje.
- Ndryshoni madhësinë e një figure duke tërhequr cepat e saj.

### Kodi
- Blloqe kodi me theksim sintakse në përpunues dhe në faqet e ruajtura: 52 gjuhë, dhe mund të shtoni të tjera (shihni [Theksimi i sintaksës](#theksimi-i-sintaksës)).
- Gjuha e një blloku zgjidhet nga një etiketë në cepin e tij, me kërkim, si dhe me gjuhët e përdorura së fundi dhe më shpesh.
- Tab dhe Shift+Tab shtojnë dhe heqin kryeradhën e rreshtave brenda një blloku kodi; shkronjat e trasha, lidhjet dhe ngjyrat brenda kodit ruhen.

### Blloqet
- Bllok i palosshëm: një titull me përmbajtje të fshehur (`<details>`). I palosur në faqet e ruajtura, i shpalosur në përpunues.
- Bllok citimi me një rresht për autorin dhe datën.

### Përpunimi
- Mënyra `<HTML>` për të parë dhe përpunuar kodin burimor HTML: blloqet brenda blloqeve shfaqen me kryeradhë, një rresht bosh i ndan blloqet që zënë disa rreshta, sintaksa ngjyroset sipas të njëjtave rregulla si në një bllok kodi HTML dhe Enter e ruan kryeradhën e rreshtit.
- Shkrim në stilin Markdown: `#` për tituj, `-` dhe `1.` për lista, `[ ]` për detyra, ```` ```python ```` për një bllok kodi (me emrin e çfarëdo gjuhe ose pa emër), `**bold**`, `---` për vijë horizontale. Shkurtesa standarde të tastierës: Ctrl+B, Ctrl+I, Ctrl+U, Ctrl+Z dhe të tjera.
- Përpunuesi nuk bëhet kurrë më i lartë se dritarja: shiriti i veglave dhe butonat e formularit mbeten të dukshëm, ndërsa teksti rrëshqet brenda tij. Lartësia ndjek madhësinë e dritares dhe zmadhimin e faqes.
- Një dorezë ndryshimi të madhësisë në cepin e poshtëm djathtas e vendos lartësinë me dorë. Lartësia mbahet mend; me dyklikim kthehet te lartësia automatike.

### Integrimi me Redmine
- Punon në të gjitha fushat e tekstit të Redmine-it me formatim: përshkrimet dhe shënimet e çështjeve, faqet wiki, lajmet, mesazhet e forumeve, dokumentet, përshkrimet e projekteve, fushat vetjake me tekst të gjatë, përfshirë fushat që shfaqen më vonë në faqe.
- Teksti ruhet si HTML. Për të përdorur përpunuesin, zgjidhni *TipTap HTML* si formatim tekstesh në rregullimet e Redmine-it.
- Ndërfaqja (këshillat e veglave, menutë, dialogët) ndjek gjuhën në profilin e përdoruesit në Redmine. Me shtojcën vijnë 47 nga 50 gjuhët e Redmine-it: anglishtja dhe rusishtja janë të plota, 45 të tjerat janë përkthime paraprake të bëra me një model të inteligjencës artificiale, që folësit amtarë janë të mirëpritur t'i korrigjojnë. Tri gjuhët që shkruhen nga e djathta në të majtë (arabishtja, hebraishtja, persishtja) nuk mbështeten qëllimisht (shihni [Gjuha e ndërfaqes](#gjuha-e-ndërfaqes)).
- Mbetet i shpejtë me tekste të mëdha: përpunuesit në formularët e fshehur krijohen vetëm kur hapet formulari, ndërsa blloqet e gjata të kodit theksohen kur vijnë në pamje gjatë rrëshqitjes.
- Tekstet e shkruara në CKEditor (shtojca redmine_ckeditor) shfaqen siç ishin dhe hapen në përpunues me formatimin e tyre: pa konvertim, shihni [Migrimi nga CKEditor](#migrimi-nga-ckeditor).
- Tekstet e ruajtura shfaqen pa HTML të pasigurt: skriptet, trajtuesit e ngjarjeve dhe lidhjet `javascript:` hiqen kur shfaqet një faqe, ruhet vetëm ajo që prodhon vetë përpunuesi. Kjo vlen edhe për tekstet që vijnë përmes REST API ose mënyrës `<HTML>`.

## Theksimi i sintaksës

Blloqet e kodit theksohen njëlloj në përpunues dhe në faqet e ruajtura. Gjuha e një blloku zgjidhet nga etiketa në cepin e tij lart djathtas; lista ka një kuti kërkimi dhe i mban mend gjuhët e përdorura së fundi dhe më shpesh.

Me shtojcën vijnë 52 gjuhë, ndër to HTML, 1C, Cisco IOS, MikroTik RouterOS, Windows cmd, docker compose, ditarët e shërbimeve të Linux-it dhe dalja e journalctl.

Mund të shtoni gjuhët tuaja. Çdo gjuhë është një kartelë në dosjen `highlight/`. Cilado nga gramatikat e highlight.js (190+), ose një gramatikë e palës së tretë, konvertohet në një kartelë të tillë me një komandë të vetme:

```sh
python3 highlight/_convert_grammar.py erlang
sh highlight/_compile.sh
```

Hollësi: [highlight/README/sq.md](../highlight/README/sq.md).

## Gjuha e ndërfaqes

Përpunuesi flet gjuhën e zgjedhur në profilin e përdoruesit në Redmine (Llogaria ime → Gjuhë). Me shtojcën vijnë kartela për 47 nga 50 gjuhët e Redmine, në `config/locales/`. Anglishtja është burimi dhe rusishtja është e vetë autorit; 45 të tjerat janë përkthime paraprake të bëra me ndihmën e një modeli të inteligjencës artificiale, që nuk janë rishikuar ende nga folës amtarë, ndaj prisni ndonjë frazë të çuditshme herë pas here. Një tekst që mungon në një kartelë shfaqet në anglisht.

Për të korrigjuar një përkthim, ndryshoni vlerat e tij në `config/locales/<code>.yml` (`de`, `fr`, `pt-BR`, ...) dhe rinisni Redmine-in. `bundle exec rake redmine_tiptap:locales` i kontrollon kartelat. Mirëpriten pull request-e me korrigjime.

**Gjuhët që shkruhen nga e djathta në të majtë (arabishtja, hebraishtja, persishtja) nuk mbështeten qëllimisht.** Mbështetja e tyre kërkon shumë ndryshime në bazën e kodit, jo vetëm një përkthim, dhe ne vendosëm të mos e marrim përsipër. Për këto gjuhë përpunuesi shfaqet në anglisht dhe paraqitja e tij nuk përshtatet. Nëse ju duhet një prej tyre, bëni një fork: mekanizmi i përkthimit është gati, ndërsa çfarë tjetër duhet ndryshuar është renditur në [config/locales/README.md](../config/locales/README.md#right-to-left-languages).

Hollësi dhe lista e gjuhëve të Redmine-it: [config/locales/README.md](../config/locales/README.md).

## Instalimi

1. Vendoseni shtojcën në dosjen `plugins` të Redmine-it. Dosja duhet të quhet `redmine_tiptap`. Mënyra më e lehtë është git, i cili i bën edhe përditësimet një komandë të vetme:
   ```sh
   cd /path/to/redmine
   git clone --branch release --single-branch --depth 1 https://github.com/Du10777/redmine_tiptap.git plugins/redmine_tiptap
   ```
   Dega `release` ka vetëm kartelat që i duhen shtojcës për të punuar, pa këtë dokumentim, dhe `--depth 1` nuk shkarkon historikun e depos.
2. Rinisni Redmine-in.
3. Te rregullimet e Redmine-it (redmine.selfhosted/_settings_) zgjidhni Formatim tekstesh: *TipTap HTML*.

## Përditësimi

Shtojca nuk ka migrime të bazës së të dhënave, kurse paketa JavaScript e ndërtuar dhe fleta e stileve janë pjesë e depozitës. Përditësimi nuk ka nevojë as për npm, as për ndërtim në server: zëvendësoni kartelat e shtojcës dhe rinisni Redmine-in.

Para përditësimit, kontrolloni që versioni i ri mbështet versionin tuaj të Redmine-it (shihni «Versionet e mbështetura të Redmine-it» më sipër).

### Instaluar me git (e rekomanduar)

```sh
cd /path/to/redmine/plugins/redmine_tiptap
git pull
```

Pastaj rinisni Redmine-in, për shembull:

```sh
sudo systemctl restart redmine          # Redmine që punon si shërbim systemd
touch /path/to/redmine/tmp/restart.txt  # Passenger
docker compose restart redmine          # Docker
```

Për të qëndruar në një version të caktuar në vend të më të riut, shkarkoni një commit të degës `release` dhe kaloni në të: `git fetch --depth 1 origin <commit> && git checkout <commit>`.

Nëse shtojca është instaluar me një `git clone` të zakonshëm (dega `main`, me dokumentimin dhe gjithë historikun), kaloni një herë në degën `release`: fshini dosjen `plugins/redmine_tiptap` dhe instalojeni shtojcën përsëri siç përshkruhet te [Instalimi](#instalimi). Shtojca nuk mban asgjë të vetën në dosjen e saj, ndaj nuk humbet asgjë; vetëm gjuhët e theksimit të kodit që i keni shtuar vetë duhet t’i kopjoni më parë jashtë `highlight/`.

### Instaluar nga një arkiv

1. Shkarkoni `redmine_tiptap.zip` nga hedhja më e fundit: https://github.com/Du10777/redmine_tiptap/releases/latest/download/redmine_tiptap.zip. Përmban të njëjtat kartela si dega `release` (shtojca pa këtë dokumentim). Fshini dosjen e vjetër `plugins/redmine_tiptap` dhe çpaketoni arkivin në vend të saj; dosja brenda tij quhet tashmë `redmine_tiptap`. Fshirja paraprake siguron që kartelat e hequra në versionin e ri të mos mbeten aty.
2. Fshini `public/assets/.manifest.json` në dosjen e Redmine-it.
3. Rinisni Redmine-in.

Hapi 2 ka rëndësi. Gjatë nisjes Redmine i publikon sërish asetet e shtojcave vetëm nëse kartelat e tyre janë më të reja se ky manifest. Kartelat e ekstraktuara nga një arkiv ruajnë vulat e tyre origjinale kohore, ndaj pa hapin 2 Redmine mund të vazhdojë ta ofrojë përpunuesin e vjetër. Manifesti rikrijohet automatikisht gjatë nisjes. Me `git pull` ky hap nuk nevojitet: git u jep kartelave të ndryshuara kohën e tanishme.

### Pas përditësimit

- Skripti dhe fleta e stileve të përpunuesit ofrohen me një gjurmë gishti të përmbajtjes në URL-të e tyre, ndaj shfletuesit e ngarkojnë versionin e ri menjëherë pas rinisjes. Përdoruesit nuk kanë nevojë të pastrojnë fshehtinën e shfletuesit.
- Nëse në rregullimet e Redmine-it është aktivizuar *Ruaj në fshehtinë tekst të formatuar* (Administrim → Rregullime → Të përgjithshme), pastroni një herë fshehtinën e Redmine-it pas përditësimit në një version që ndryshon mënyrën se si shfaqen tekstet (pastrimi i HTML, mbështetja e teksteve të CKEditor): `bundle exec rake tmp:cache:clear RAILS_ENV=production` në dosjen e Redmine-it. Përndryshe faqet e gjeneruara para përditësimit mund të shfaqen nga fshehtina, të papastruara, deri sa të ndryshojë teksti i tyre.
- Versionet e mëparshme të shtojcës e kopjonin skriptin te `public/tiptap_bundle.js`. Këto kartela nuk përdoren më dhe mund të fshihen:
  ```sh
  rm -f /path/to/redmine/public/tiptap_bundle.js /path/to/redmine/public/tiptap_bundle.js.map
  ```

## Migrimi nga CKEditor

Nëse Redmine-i juaj përdorte [redmine_ckeditor](https://github.com/a-ono/redmine_ckeditor), mund të kaloni te kjo shtojcë dhe të ruani çdo tekst që është shkruar: çështje, shënime, faqe wiki, lajme, mesazhe, dokumente. Asgjë nuk konvertohet dhe baza e të dhënave nuk preket. CKEditor i ruan tekstet e tij si HTML dhe po kështu bën edhe kjo shtojcë, prandaj një tekst i ruajtur thjesht shfaqet nga formatuesi i ri.

1. Instaloni shtojcën (shihni më sipër) dhe zgjidhni Formatim tekstesh: *TipTap HTML*.
2. Mbani dosjen `public/system/rich/` të Redmine-it tuaj. Nëse njerëzit kanë futur figura dhe kartela me shfletuesin e figurave të CKEditor, ato ruhen aty, jo në bazën e të dhënave e as mes bashkëngjitjeve, dhe tekstet i referojnë me adresë (`/system/rich/...`). **Nëse Redmine-i zhvendoset në një server tjetër ose instalohet nga e para, zhvendoseni edhe këtë dosje**, bashkë me bazën e të dhënave dhe dosjen `files/`: asnjëra prej tyre nuk i përmban këto kartela, dhe pa këtë dosje figurat në tekstet e vjetra japin gabimin 404. Bashkëngjitjet e çështjeve, të faqeve wiki e kështu me radhë ruhen si më parë dhe nuk kanë nevojë për asgjë. Figurat e futura në këtë përpunues janë bashkëngjitje të zakonshme. Dosja mbetet e nevojshme edhe pasi të hiqet redmine_ckeditor.
3. Hiqni redmine_ckeditor kur nuk ju duhet më.

Një tekst i vjetër shfaqet ashtu siç e shfaqte CKEditor: shkronjat, madhësitë, ngjyrat dhe rreshtimi, kryeradhët, listat, tabelat (kufijtë, gjerësitë, titujt, qelizat e bashkuara), figurat (madhësia, float, kufiri, një figurë brenda një lidhjeje), lidhjet, blloqet e kodit me gjuhën e tyre (të theksuara), makrot e Redmine-it (`{{toc}}`, `{{collapse(Title) ... }}`, `{{thumbnail(...)}}` e kështu me radhë), lidhjet e wiki-t dhe të çështjeve, adresat e thjeshta web të bëra të klikueshme, dhe korniza `<iframe>` të ngulitura (video). Një tekst i shkruar në CKEditor njihet nga shënjimi i tij dhe e ruan hapësirën midis paragrafëve që kishte aty, e cila është më e gjerë se në këtë përpunues.

Dallime të qëllimshme:
- Një kornizë `<iframe>` shfaqet vetëm kur drejton te një sajt tjetër përmes http(s), dhe është e izoluar me sandbox: faqja brenda saj mund të ekzekutojë skriptet e veta, por nuk mund të arrijë faqen e Redmine-it, të hapë dritaren e sipërme apo të dërgojë formularë. Çdo kornizë tjetër `<iframe>` hiqet.
- Lidhjet hapen në të njëjtën dritare: atributi `target` i një lidhjeje (opsioni «Dritare e re (_blank)» i CKEditor) nuk ruhet.
- Disa formatime që CKEditor i ofronte, por faqet e tij i hidhnin heshturazi, shfaqen këtu: për shembull ngjyrat e sfondit të stileve të tij «Marker» dhe thonjëzat e `<q>`.
- Stili «Special Container» i CKEditor (një bllok me kornizë gri) shfaqet si bllok kodi pa theksim, dhe në përpunues është gjithashtu bllok kodi.

Një tekst i vjetër e ruan formatimin kur hapet në përpunues dhe ruhet sërish: makrot e Redmine-it (një makro është një element gri në përpunues; përpunojeni në mënyrën `<HTML>`, si në mënyrën Source të CKEditor), korniza `<iframe>`, blloqet `<div>` dhe `<address>` me stilin e tyre (një `<div>` i ngjitur nga një faqe web prapë bëhet paragraf), indeksi i poshtëm dhe i sipërm, stilet brenda rreshtit të CKEditor (të mëdha, të vogla, tastierë, shembull e kështu me radhë), stili i titujve, i tabelave dhe i qelizave të tabelave, madhësia (gjerësia dhe lartësia), float, kufiri dhe lidhja e figurave, gjuha e blloqeve të kodit. Ajo që nuk mbijeton përpunimin: titulli i tabelës bëhet një paragraf i qendërzuar mbi të, seksionet e kreut dhe të këmbës së tabelës bëhen rreshta të zakonshëm (këmba mbetet poshtë) dhe `<del>` bëhet `<s>` (e njëjta pamje). Një tekst i ruajtur nga ky përpunues merr hapësirën kompakte midis paragrafëve të këtij përpunuesi.
