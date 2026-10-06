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

> *Šis vertimas parengtas pasitelkus dirbtinio intelekto modelį ir nebuvo peržiūrėtas gimtakalbio. Jei rasite klaidą, [sukurkite pranešimą (issue) arba pull request](https://github.com/Du10777/redmine_tiptap).*

Tai tekstų redaktorius „Redmine", pagrįstas „TipTap" https://github.com/ueberdosis/tiptap

Redaktoriaus variklis: **TipTap 3.31.4**. Visos `@tiptap/*` paketai yra prisegti prie šios tikslios versijos `package.json` ir `package-lock.json` ir visada turi būti atnaujinti kartu iki tos pačios versijos.

**Turinys**

- [Palaikomos „Redmine" versijos](#palaikomos-redmine-versijos)
- [Funkcijos](#funkcijos)
  - [Teksto formatavimas](#teksto-formatavimas)
  - [Sąrašai](#sąrašai)
  - [Lentelės](#lentelės)
  - [Paveikslai ir priedai](#paveikslai-ir-priedai)
  - [Kodas](#kodas)
  - [Blokai](#blokai)
  - [Redagavimas](#redagavimas)
  - [„Redmine" integracija](#redmine-integracija)
- [Sintaksės paryškinimas](#sintaksės-paryškinimas)
- [Sąsajos kalba](#sąsajos-kalba)
- [Diegimas](#diegimas)
- [Atnaujinimas](#atnaujinimas)
  - [Diegta su git (rekomenduojama)](#diegta-su-git-rekomenduojama)
  - [Diegta iš archyvo](#diegta-iš-archyvo)
  - [Po atnaujinimo](#po-atnaujinimo)
- [Migracija iš „CKEditor"](#migracija-iš-ckeditor)

## Palaikomos „Redmine" versijos

| Redmine | Palaikoma | Testuota su |
|---|---|---|
| 7.x | taip | 7.0.2 |
| 6.x | taip | 6.1.4, 6.1.5 |
| 5.x ir senesnės | ne | — |

Nauja pagrindinė versija (8.x ir vėlesnės) palaikoma tik tada, kai įskiepis joje išbandomas. Iki tol tos versijos „Redmine" su įdiegtu įskiepiu nepasileidžia: sustoja su klaida, kurioje nurodytos palaikomos versijos.

## Funkcijos

### Teksto formatavimas
- Pusjuodis, kursyvas, pabraukimas, perbraukimas, apatinis ir viršutinis indeksas (Ctrl+, ir Ctrl+.), vidinis kodas.
- Teksto spalva ir fono spalva: 64 spalvų paletė arba bet kokia šešioliktainė reikšmė.
- Šrifto šeima (13 šriftų) ir šrifto dydis (iš 8 iki 72 pikselių arba bet kokia reikšmė).
- Pastraipos stiliai: antraštės 1–6 ir normalus tekstas.
- Lygiavimas (kairė, centras, dešinė, iš abiejų pusių) ir paraštės (iki 8 lygiai) pastraipų ir antraščių.
- Nuorodos: įterpti, redaguoti, pašalinti.
- Horizontali linija, atsaukti ir pakartoti.

### Sąrašai
- Ženkleliai sąrašai su diskiniais, apskriamais arba kvadratiniais žymenimis.
- Numatyti sąrašai: 1, 01, a, A, i, I, α.
- Užduočių sąrašai su žymimaisiais laukeliais; baigtos užduotys yra peršamos.
- Vidiniai sąrašai (Tab / Shift+Tab).

### Lentelės
- Įterpti bet kokio dydžio lentelę, su arba be antraštės eilutės.
- Dešiniuoju pelenu meniu langelyje: pridėti ir pašalinti eilutes ir stulpelius, sujungti ir padalinti langelius, antraštės eilutę ir antraštės stulpelį, panaikinti lentelę.
- Stulpelių plotis keičiamas vilkdami langelio ribas.
- Klijavimas iš „Excel" išsaugo stulpelių plotį, lygiavimą ir šrifto dydžius; lentelė, nukopijuota iš „Redmine", klijuojama į „Excel" su ribomis.

### Paveikslai ir priedai
- Klijuoti paveikslą iš mainų: jis yra įkeltas kaip priedas ir atsiranda tekste.
- Paveikslai pritvirtinti naudojant „Redmine" failų lauką arba į jį nuleisus, taip pat įterpiami į tekstą.
- Įterpti paveikslą iš priedų (miniatiūrų pasirinkiklis) arba nuorodą į bet kurį priedą.
- Paveikslą perrašyti vilkdami jo kampus.

### Kodas
- Kodų blokai su sintaksės paryškintu redaktoriuje ir išsaugotose puslapiuose: 52 kalbos, ir galite pridėti daugiau (žr. [Sintaksės paryškinimas](#sintaksės-paryškinimas)).
- Bloko kalba pasirenkama iš ženklelio jo kampyje su paieška, neseniai ir dažnai naudojamomis kalbomis.
- Tab ir Shift+Tab įdengia ir neidengia eilutes kodų bloke; **pusjuodis**, nuorodos ir spalvos viduje kodo yra išsaugotos.

### Blokai
- Supainiojamas blok: antraštė su paslėptu turiniu (`<details>`). Susupainiojamas išsaugotose puslapiuose, išskleistas redaktoriuje.
- Citatos blokas su autoriaus ir datos eilute.

### Redagavimas
- `<HTML>` režimas HTML šaltinio peržiūrai ir redagavimui: įdėtieji blokai rodomi su įtrauka, tuščia eilutė atskiria blokus, užimančius kelias eilutes, sintaksė spalvinama pagal tas pačias taisykles kaip HTML kodų bloke, o Enter išsaugo eilutės įtrauką.
- Žymeklio stiliaus rašymas: `#` antraštėms, `-` ir `1.` sąrašams, `[ ]` užduotims, ```` ```python ```` kodų blokui (bet kokia kalba arba nė viena), `**bold**`, `---` horizontaliai linijai. Standartiniai klaviatūros nuotolinat: Ctrl+B, Ctrl+I, Ctrl+U, Ctrl+Z ir kiti.
- Redaktorius niekada neauga aukščiau nei langas: įrankių juosta ir formos mygtukai lieka akivaizdūs, ir tekstas slenka viduje. Aukštis keičiasi pagal lango dydį ir puslapio mastelio keitimą.
- Dydžio rankena apatiniame dešiniajame kampe nustato aukštį rankiniu būdu. Aukštis yra įsimenamas; dvigubas spustelėjimas grąžina automatinį aukštį.

### „Redmine" integracija
- Veikia visuose „Redmine" tekstiniuose laukuose su formatavimu: darbų aprašuose ir pastabose, wiki puslapiuose, naujienose, forumų žinučiose, dokumentuose, projekto aprašuose, ilgo teksto tinkiniuose laukuose, taip pat laukuose, kurie vėliau rodomi puslapyje.
- Tekstas saugomas kaip HTML. Norint naudoti redaktorių, pasirinkite *TipTap HTML* kaip teksto formatavimą „Redmine" nustatymuose.
- Sąsaja (patarimai, meniu, dialogo langai) seka vartotojo „Redmine" profilio kalbą. 47 iš 50 „Redmine" kalbų yra kartu su įskiepiu: anglų ir rusų kalbos yra pilnos, kitos 45 yra juodraščiai, padaryti naudojant dirbtinį intelektą, kuriuos mielai pataisys gimtakalbiai. Trys kalbos, rašomos iš dešinės į kairę (arabų, hebrajų, persų), sąmoningai nepalaikomos (žr. [Sąsajos kalba](#sąsajos-kalba)).
- Lieka greita su dideliais tekstais: redaktoriai paslėptose formose kuriami tik tada, kai forma atidariama, ir ilgi kodų blokai yra paryškinami, kai jie slenka į peržiūrą.
- Tekstai, parašyti naudojant „CKEditor" („redmine_ckeditor" įskiepis), rodomi taip, kaip jie buvo, ir atsidaro redaktoriuje su jų formatavimu: nėra konversijos, žr. [Migracija iš „CKEditor"](#migracija-iš-ckeditor).
- Išsaugoti tekstai rodomi be nesaugaus HTML: scenarijai, įvykio valdikliai ir `javascript:` nuorodos pašalinamos, kai puslapis rodomas, išsaugotas tik redaktoriaus paties pagaminti HTML. Tai apima ir tekstus, kurie gaunami per REST API arba `<HTML>` režimą.

## Sintaksės paryškinimas

Kodų blokai yra paryškinami redaktoriuje ir išsaugotose puslapiuose. Bloko kalba pasirenkama iš ženklelio jo viršutiniame dešiniajame kampe; sąrašas turi paieškos laukelį ir prisimena neseniai ir dažnai naudojamas kalbas.

52 kalbos yra kartu su įskiepiu, tarp jų HTML, 1C, Cisco IOS, MikroTik RouterOS, Windows cmd, docker compose, Linux paslaugų žurnalai ir journalctl išvestis.

Galite pridėti savo kalbas. Kiekviena kalba yra vienas failas `highlight/` aplanke. Bet kuris iš daugiau nei 190 highlight.js gramatikų arba trečiosios šalies gramatika konvertuojama į tokį failą viena komanda:

```sh
python3 highlight/_convert_grammar.py erlang
sh highlight/_compile.sh
```

Išsamiau: [highlight/README/lt.md](../highlight/README/lt.md).

## Sąsajos kalba

Redaktorius kalba vartotojo „Redmine" profilio pasirinkta kalba (Mano paskyra → Kalba). Failai 47 iš 50 „Redmine" kalbų yra kartu su įskiepiu `config/locales/` aplanke. Anglų kalba yra šaltinis, o rusų kalba yra autoriaus pačios; kitos 45 yra juodraščiai, padaryti naudojant dirbtinio intelekto pagalbą ir dar nepatikrinti gimtakalbių, todėl tikėkitės keisto žodžio čia ir ten. Tekstas, trūkstamas iš failo, rodomas anglų kalba.

Norint ištaisyti vertimą, pakeiskite jo reikšmes `config/locales/<code>.yml` (`de`, `fr`, `pt-BR`, ...) ir paleiskite iš naujo „Redmine". `bundle exec rake redmine_tiptap:locales` patikrina failai. Traukiusios užklausos su pataisymais yra sveikingos.

**Kalbos, rašomos iš dešinės į kairę (arabų, hebrajų, persų), sąmoningai nepalaikomos.** Jų palaikymas reikalinga daug kodo bazės pakeitimų, ne tik vertimo, ir pasirinkome nepriimti to. Šioms kalboms redaktorius rodomas anglų kalba ir jo išdėstymas nėra pakoreguotas. Jei reikalinga viena iš jų, padarykite šaką: vertimo mechanizmas yra paruoštas, ir kas dar turi būti pakeista, yra paminėta [config/locales/README.md](../config/locales/README.md#right-to-left-languages).

Išsamiau ir „Redmine" kalbų sąrašas: [config/locales/README.md](../config/locales/README.md).

## Diegimas

1. Sudėkite įskiepį į „Redmine" `plugins` aplanką. Aplanko pavadinimas turi būti `redmine_tiptap`. Lengviausia yra naudoti git, kas taip pat leidžia atnaujinti viena komanda:
   ```sh
   cd /path/to/redmine
   git clone --branch release --single-branch --depth 1 https://github.com/Du10777/redmine_tiptap.git plugins/redmine_tiptap
   ```
   Šakoje `release` yra tik tie failai, kurių reikia įskiepio veikimui, be šios dokumentacijos, o `--depth 1` neatsisiunčia saugyklos istorijos.
2. Paleiskite „Redmine" iš naujo.
3. „Redmine" nustatymuose (redmine.selfhosted/_settings_) pasirinkite Teksto formatavimas: *TipTap HTML*.

## Atnaujinimas

Įskiepis neturi duomenų bazės migracijų, ir sukurtas JavaScript paketas bei stilių lapas yra saugykloje. Atnaujinimas nereikalinga npm ir statybą serveryje: pakeiskite įskiepio failus ir paleiskite „Redmine" iš naujo.

Prieš atnaujinant, patikrinkite, ar nauja versija palaiko jūsų „Redmine" versiją (žr. „Palaikomos „Redmine" versijos" viršuje).

### Diegta su git (rekomenduojama)

```sh
cd /path/to/redmine/plugins/redmine_tiptap
git pull
```

Tada paleiskite „Redmine" iš naujo, pavyzdžiui:

```sh
sudo systemctl restart redmine          # „Redmine" veikia kaip systemd paslauga
touch /path/to/redmine/tmp/restart.txt  # Passenger
docker compose restart redmine          # Docker
```

Jei norite likti konkrečioje versijoje, o ne naujausioje, atsisiųskite šakos `release` commit ir persijunkite į jį: `git fetch --depth 1 origin <commit> && git checkout <commit>`.

Jei įskiepis buvo įdiegtas paprastu `git clone` (šaka `main`, su dokumentacija ir visa istorija), vieną kartą pereikite į šaką `release`: ištrinkite aplanką `plugins/redmine_tiptap` ir įdiekite įskiepį iš naujo, kaip aprašyta skyriuje [Diegimas](#diegimas). Įskiepis savo aplanke nesaugo nieko savo, todėl niekas neprarandama; tik pačių pridėtas kodo paryškinimo kalbas pirmiau nukopijuokite iš `highlight/`.

### Diegta iš archyvo

1. Atsisiųskite šakos `release` archyvą: https://github.com/Du10777/redmine_tiptap/archive/refs/heads/release.zip. Ištrinkite seną aplanką `plugins/redmine_tiptap` ir išskleiskite archyvą jo vietoje; archyve esantis aplankas vadinasi `redmine_tiptap-release`, pervadinkite jį į `redmine_tiptap`. Ištrynus iš anksto, neliks failų, kurių naujoje versijoje nebėra.
2. Panaikinkite `public/assets/.manifest.json` „Redmine" aplanke.
3. Paleiskite „Redmine" iš naujo.

2 žingsnis yra svarbus. Pradžioje „Redmine" iš naujo publikuoja įskiepio turtą tik jei jų failai yra naujesni nei šis manifestas. Failai iš archyvo iškompakuoti išsaugo originalius laiko žymas, todėl be 2 žingsnio „Redmine" gali toliau teikti seną redaktorių. Manifestas automatiškai persukuriamas paleidžiant. Su `git pull` šis žingsnis nereikalingas: git suteikia pakeistiems failams dabartinį laiką.

### Po atnaujinimo

- Redaktoriaus scenarijus ir stilių lapas yra teikiami su turinio pirštais spalvomis jų URL, todėl naršyklės perkrauna naują versiją iš karto po paleidimo. Vartotojai neturi valyti naršyklės šios atminties.
- Jei *Laikyti atmintyje formatuotą tekstą* įgalinta „Redmine" nustatymuose (Administravimas → Nustatymai → Bendri(-as)), išvalykite „Redmine" šios atminties kartą po atnaujinimo į versiją, kuri keičia, kaip tekstai rodomi (HTML valymas, „CKEditor" tekstų palaikymas): `bundle exec rake tmp:cache:clear RAILS_ENV=production` „Redmine" aplanke. Priešingu atveju puslapiai, persiųsti prieš atnaujinimą, gali būti rodomi iš šios atminties, nevalytų, kol keičiasi jų tekstas.
- Ankstesnės įskiepio versijos nukopijavo scenariją į `public/tiptap_bundle.js`. Šie failai jau negrąžinami ir gali būti panaikinti:
  ```sh
  rm -f /path/to/redmine/public/tiptap_bundle.js /path/to/redmine/public/tiptap_bundle.js.map
  ```

## Migracija iš „CKEditor"

Jei jūsų „Redmine" naudojo [redmine_ckeditor](https://github.com/a-ono/redmine_ckeditor), galite perjungti į šį įskiepį ir išsaugoti kiekvieną parašytą tekstą: darbus, pastabas, wiki puslapius, naujienas, žinutes, dokumentus. Nieko neiš verčiama ir duomenų bazė nėra liečiama. „CKEditor" saugo savo tekstus kaip HTML, ir šis įskiepis taip pat, todėl saugomas tekstas yra paprasčiausiai rodomas naujo formatoriaus.

1. Diezkite įskiepį (žr. aukščiau) ir pasirinkite Teksto formatavimas: *TipTap HTML*.
2. Išsaugokite „Redmine" `public/system/rich/` aplanką. Jei žmonės įterpė paveikslus ir failus naudodami „CKEditor" paveikslų naršyklę, jie saugomi ten, o ne duomenų bazėje ir ne tarp priedų, ir tekstai juos rodo pagal adresą (`/system/rich/...`). **Jei „Redmine" perkeliamas į kitą serverį arba diegiamas iš naujo, perkelkite ir šį aplanką**, kartu su duomenų baze ir aplanku `files/`: nė vienoje iš jų šių failų nėra, o be šio aplanko paveikslai senuose tekstuose rodo 404 klaidą. Darbų, wiki puslapių priedai saugomi, kaip anksčiau, ir nedarbo nieko. Šiame redaktoriuje įterpti paveikslai yra paprasti priedai. Aplankas lieka reikalingas ir pašalinus redmine_ckeditor.
3. Nuimkite redmine_ckeditor, kai jums to jau nebereikia.

Senasis tekstas rodomas taip, kaip jį rodė „CKEditor": šriftai, dydžiai, spalvos ir lygiavimas, indentacija, sąrašai, lentelės (ribos, plotis, antraštės, sulieti langeliai), paveikslai (dydis, plūdimas, riba, paveikslą viduje nuorodos), nuorodos, kodų blokai su jų kalba (paryškinimas), „Redmine" makrosai (`{{toc}}`, `{{collapse(Title) ... }}`, `{{thumbnail(...)}}` ir pan.), wiki ir darbų nuorodos, paprasti žiniatinklio adresai, padaryti kliklabais, ir su sąmata `<iframe>` (vaizdo). Tekstas, parašytas naudojant „CKEditor", yra atpažintas pagal jo žymę ir išsaugo paraštę tarp pastraipų, kurias jis turėjo ten, kuris yra platesnis nei šiame redaktoriuje.

Skirtumai sąmoningai:
- `<iframe>` rodomas tik tada, kai jis rodomas į kitą svetainę per http(s), ir jis yra su smėliu: puslapis viduje gali paleisti savo scenarijus, bet negali pasiekti „Redmine" puslapio, atidaryti viršaus lango arba pateikti formas. Visi kiti `<iframe>` pašalinami.
- Nuorodos atsidaro tame pačiame lange: `target` atributas nuorodos („CKEditor" „Naujas langas (_blank)") nėra išsaugotas.
- Kai kuris formatavimas, kurį pasiūlė „CKEditor", bet jo puslapiai tyliai nubraukė, čia rodomas: pavyzdžiui, jo „Žymeklis" stilių fono spalvos ir `<q>` kabutės.
- „CKEditor" stilius „Special Container" (blokas su pilku rėmeliu) rodomas kaip kodų blokas be paryškinimo, ir redaktoriuje jis taip pat yra kodų blokas.

Senasis tekstas išsaugo formatavimą, kai jis atidarytas redaktoriuje ir išsaugotas iš naujo: „Redmine" makrosai (makrosas yra vienas pilkas elementas redaktoriuje; redaguokite jį `<HTML>` režime, kaip „CKEditor" šaltinio režime), `<iframe>`, `<div>` ir `<address>` blokai su jų stiliumi (`<div>`, įklijuotas iš žiniatinklio puslapio, vis tiek paverčiamas pastraipa), apatinis ir viršutinis indeksas, „CKEditor" vidutinio tipo stiliai (didelis, mažas, klaviatūra, mėginys ir pan.), antraščių, lentelių ir lentelių langelių stilius, paveikslų dydis (plotis ir aukštis), plūdimas, riba ir nuoroda, kodų blokų kalba. Kas neišgyvena redagavimo: lentelės antraštė tampa centruota parastraipa aukščiau jos, lentelės antraštės ir poraštės sekcijos tampa paprastomis eilutėmis (poraštė lieka apačioje) ir `<del>` tampa `<s>` (tas pats pavidala). Tekstas, išsaugotas iš šio redaktoriaus, gauna kompaktišką paragrafo tiesiką šio redaktoriaus.
