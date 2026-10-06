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

> *See tõlge on tehtud tehisintellekti mudeli abiga ja emakeelne kõneleja pole seda üle vaadanud. Kui leiate vea, [avage issue või pull request](https://github.com/Du10777/redmine_tiptap).*

See on tekstiredaktor Redmine'i jaoks, mis põhineb TipTapil https://github.com/ueberdosis/tiptap

Toetatud Redmine'i versioonid: **6.\*** ja **7.\*** (testitud versioonidel 6.1.4, 6.1.5 ja 7.0.2).

Redaktori mootor: **TipTap 3.31.4**. Kõik `@tiptap/*` paketid on kinnitatud selle täpsele versioonile `package.json` ja `package-lock.json` ning neid tuleb alati koos täiendada ühele ja samale versioonile.

## Funktsioonid

**Teksti vormindamine**
- Paks, kaldkiri, allajoon, läbijoonitud, alaindeks ja ülaindeks (Ctrl+, ja Ctrl+.), tekstisisene kood.
- Teksti värvus ja tausta värvus: 64-värvine palett või mis tahes kuueteistkümnendsüsteemi väärtus.
- Kirjatüüp (13 fonti) ja kirjasuuruse (eelseadistused 8 kuni 72 px või mis tahes väärtus).
- Lõigu stiilid: pealkirjad 1–6 ja tavaline tekst.
- Joondamine (vasak, keskel, parem, ümber) ja taandamine (kuni 8 taset) lõikude ja pealkirjade puhul.
- Lingid: sisestamine, redigeerimine, eemaldamine.
- Horisontaalne joon, võta tagasi ja tee uuesti.

**Loendid**
- Täpiloenelud ketta, ringi või ruudu markeritega.
- Nummerdatud loendid: 1, 01, a, A, i, I, α.
- Ülesandeloendelid märkekastidega; lõpetatud ülesanded on läbijoonitud.
- Pesastatud loendid (Tab / Shift+Tab).

**Tabelid**
- Sisestage mis tahes suurusega tabel, päiserida või ilma.
- Paremklõpsu menüü lahtris: ridade ja veergude lisamine ja kustutamine, lahtrite ühendamine ja jagamine, päiserida ja päiseveerg, tabeli kustutamine.
- Veergude laiuseid muudetakse lahtri piiride lohistamisel.
- Excelist kleepimisega säilitatakse veergude laiused, joondamine ja fondi suurused; Redmine'ist kopeeritud tabel liimitakse Exceli piiridega.

**Pildid ja manustamised**
- Kleepige pilt lõikepuhvrist: see laetakse üles manustamisena ja kuvatakse tekstis.
- Pildid, mis on manustatud Redmine'i failivalja abil või loobitud sellele, lisatakse samuti tekstisse.
- Sisestage pilt manustamistest (pisipildi valija) või link mis tahes manustamisele.
- Muutke pildi suurust, lohistades selle nurki.

**Kood**
- Koodiblokid süntaksivärvitusega redaktoris ja salvestatud lehtedel: 52 keelt ja te võite lisada rohkem (vt [Süntaksvärvitus](#süntaksvärvitus)).
- Ploki keel valitakse selle nurga märgist, otsing, viimased ja sagedased keeled.
- Tab ja Shift+Tab taandasid ja väljundsid jooned koodiplokkides; paks, lingid ja värvid koodis säilitatakse.

**Plokid**
- Volditav plokk: pealkiri peidetud sisuga (`<details>`). Salvestatud lehtedel kokku pandud, redaktoris avatud.
- Tsitaat-plokk koos autori ja kuupäeva reaga.

**Redigeerimine**
- `<HTML>` režiim HTML-i allika vaatamiseks ja redigeerimiseks: pesastatud plokid taandatakse, mitmest reast koosnevad plokid eraldatakse tühja reaga, süntaksit värvitakse samade reeglite järgi nagu HTML-koodiplokis ning Enter säilitab rea taande.
- Markdown-stiilis sisestus: `#` pealkirjade jaoks, `-` ja `1.` loendite jaoks, `[ ]` ülesannete jaoks, ```` ```python ```` koodiplokkide jaoks (mis tahes keele nimi või mitte), `**bold**`, `---` horisontaalse joone jaoks. Standardsed klaviatuurikäsud: Ctrl+B, Ctrl+I, Ctrl+U, Ctrl+Z ja teised.
- Redaktor ei kasva kunagi aknasoole kõrgemale: tööriistariba ja vormi nupud jäävad nähtavaks ning tekst skrollub sisemises. Kõrgus järgib akna suurust ja lehe suumi.
- Redaktori parempoolses alumises nurgas on suuruse muutmise käepide. Kõrgus jäetakse meelde; topeltklõps naaseb automaatsele kõrgusele.

**Redmine'i integreerimine**
- Töötab kõigis Redmine'i tekstiväljade vormindamisega: teema kirjeldused ja märkused, viki lehed, uudised, foorumi sõnumid, dokumendid, projekti kirjeldused, pikad tekstilised kohandatud väljad, sealhulgas väljad, mis kuvatakse lehel hiljem.
- Tekst salvestatakse HTML-ina. Redaktori kasutamiseks valige Redmine'i seadetes *TipTap HTML* teksti vormindamisena.
- Liides (näpunäited, menüüd, dialoogid) järgib kasutaja Redmine'i profiilis valitud keelt. 47 Redmine'i 50 keelest sisaldab pistikut: inglise keel ja vene keel on täielikud, ülejäänud 45 on mustandi, mille on teinud tehisintellekt, mida emakeelsed kõnelejad on teretulnud parandama. Kolm paremalalt vasakule kirjutatud keelt (Araabia, Heebrea, Persia) ei ole tahtlikult toetatud (vt [Liidese keel](#liidese-keel)).
- Jääb kiireks suurte tekstidega: redaktoreid varjatud vormidel luuakse alles siis, kui vorm avatakse, ja pikad koodiplokid esiletõstetakse, kui nad vaatesse skrollitavad.
- Tekstid, mis on kirjutatud CKEditoris (redmine_ckeditor plugin), kuvatakse nii nagu olid ja avatakse redaktoris nende vormindamisega: konversiooni ei ole, vt [CKEditorist üleminekul](#ckeditorist-üleminekul).
- Salvestatud tekstid kuvatakse ilma ebaturvalise HTML-ita: skriptid, sündmuste käsitlejad ja `javascript:` lingid eemaldatakse lehe kuvamisel, säilitatakse ainult see, mida redaktor ise loob. See hõlmab ka tekste, mis tulevad REST API-t või `<HTML>` režiimit.

## Süntaksvärvitus

Koodiblokid on esiletõstetud redaktoris ja salvestatud lehtedel. Ploki keel valitakse selle parempoolsest ülaosast olevaast märgist; loendis on otsinguväli ja see mäletab hiljuti ja sageli kasutatud keeli.

52 keelt käivad pistikuga, nende hulgas HTML, 1C, Cisco IOS, MikroTik RouterOS, Windows cmd, docker compose, Linuxi teenuste logid ja journalctl väljund.

Te võite lisada oma keeli. Iga keel on üks fail `highlight/` kaustas. Mis tahes 190+ highlight.js grammatikast või kolmandale osapoolele kuuluva saab teisendada selliseks failiks ühe käsuga:

```sh
python3 highlight/_convert_grammar.py erlang
sh highlight/_compile.sh
```

Üksikasjad: [highlight/README/et.md](../highlight/README/et.md).

## Liidese keel

Redaktor räägib kasutaja Redmine'i profiilis valitud keelt (Minu konto → Keel). 47 Redmine'i 50 keelest failid käivad pistikuga `config/locales/` kaustas. Inglise on allikaks ja vene on autori oma; ülejäänud 45 on mustandi, mille on teinud tehisintellekti abil ja mida emakeelsed kõnelejad ei ole üle vaadanud, nii et oodake paarset kummaline fraasi. Failist puuduv tekst kuvatakse inglise keeles.

Tõlke parandamiseks muutke selle väärtused `config/locales/<code>.yml` (`de`, `fr`, `pt-BR`, ...) ja taaskäivitage Redmine. `bundle exec rake redmine_tiptap:locales` kontrollib faile. Pull-taotlused paranduste abil on teretulnud.

**Paremalalt vasakule kirjutatud keeled (Araabia, Heebrea, Persia) ei ole tahtlikult toetatud.** Nende toetamine nõuab koodi baasi palju muudatusi, mitte ainult tõlget, ja me otsustasime selle üle võtta. Nende keelte jaoks kuvatakse redaktor inglise keeles ja selle paigutust ei kohandita. Kui teil on neist üks, tehke lehutamine: tõlkemehhanism on valmis ja mida muust tuleb muuta, on loetletud [config/locales/README.md](../config/locales/README.md#right-to-left-languages).

Üksikasjad ja Redmine'i keelte loend: [config/locales/README.md](../config/locales/README.md).

## Paigaldus

1. Pange pistik Redmine'i `plugins` kausta. Kaust tuleb nimetada `redmine_tiptap`. Lihtsaim viis on git, mis teeb värskendused ühe käsuga:
   ```sh
   cd /path/to/redmine
   git clone https://github.com/Du10777/redmine_tiptap.git plugins/redmine_tiptap
   ```
2. Taaskäivitage Redmine.
3. Redmine seadetes (redmine.selfhosted/_settings_) valige Teksti vormindamine: *TipTap HTML*.

## Värskendamine

Pistikul ei ole andmebaasi migratsioone ja koostatud JavaScripti jupp ning laadistik on osa hoidlast. Värskendamine ei vaja npm-i ega serveri koostamist: asendage pistiku failid ja taaskäivitage Redmine.

Enne värskendamist kontrollige, et uus versioon toetab teie Redmine'i versiooni (vt "Toetatud Redmine'i versioonid" ülal).

### Paigaldatud giti abil (soovitatav)

```sh
cd /path/to/redmine/plugins/redmine_tiptap
git pull
```

Seejärel taaskäivitage Redmine, näiteks:

```sh
sudo systemctl restart redmine          # Redmine käib süsteemse teenusena
touch /path/to/redmine/tmp/restart.txt  # Reisija
docker compose restart redmine          # Docker
```

Konkreetsele versioonile jäämiseks viimase asemel: `git fetch && git checkout <tag-or-commit>`.

### Paigaldatud arhiivist

1. Kustutage vana `plugins/redmine_tiptap` kaust ja pakkige uus versioon selle asemele. Kustutamine esimesena taastab, et uues versioonis eemaldatud failid ei säili.
2. Kustutage `public/assets/.manifest.json` Redmine'i kaustas.
3. Taaskäivitage Redmine.

Teine samm on oluline. Käivitamisel avaldab Redmine pistiku varad ainult siis, kui nende failid on selle manifestist uuemad. Arhiivist lahti pakitud failid säilitavad oma algse ajatemplid, nii et ilma teise sammuta võib Redmine edasi välja anda vana redaktori. Manifest luuakse automaatselt käivitamisel. Selle sammuga `git pull` ei ole vaja: git annab muudetud failidele praeguse aja.

### Pärast värskendamist

- Redaktori skript ja laadistik vastatakse sisu sõrmejäljega nende URL-des, seega laadivad brauserid kohe pärast taaskäivitamist uue versiooni. Kasutajate ei pea kustutama brauseri vahemälu.
- Kui Redmine'i seadetes on lubatud *Puhverda vormindatud teksti* (Seadistused → Seaded → Üldine), kustutage Redmine'i vahemälu üks kord pärast värskendamist versioonile, mis muudab tekstide kuvamist (HTML puhastamine, CKEditori tekstide tugi): `bundle exec rake tmp:cache:clear RAILS_ENV=production` Redmine'i kaustas. Muidu saab enne värskendamist tehtud lehti näidata vahemälust, puhastamata, kuni nende tekst muutub.
- Pistiku varasemad versioonid kopeerisid stsenaariumi `public/tiptap_bundle.js`. Need failid ei ole enam kasutusel ja neid saab kustutada:
  ```sh
  rm -f /path/to/redmine/public/tiptap_bundle.js /path/to/redmine/public/tiptap_bundle.js.map
  ```

## CKEditorist üleminekul

Kui teie Redmine kasutas [redmine_ckeditor](https://github.com/a-ono/redmine_ckeditor), saate vahetada selle pistikule ja hoida iga teksti, mis on kirjutatud: teemad, märkused, viki lehed, uudised, sõnumid, dokumendid. Midagi ei teisendita ja andmebaas ei puuduta. CKEditor salvestab oma tekstid HTML-ina ja nii teeb see pistik, seega salvestatud tekst kuvatakse lihtsalt uue vormindaja poolt.

1. Paigaldage pistik (vt ülal) ja valige Teksti vormindamine: *TipTap HTML*.
2. Säilitage oma Redmine'i kaust `public/system/rich/`. Kui inimesed on CKEditori pildisirvijaga pilte ja faile sisestanud, salvestatakse need sinna, mitte andmebaasi ega manustamiste hulka, ning tekstid viitavad neile aadressi järgi (`/system/rich/...`). **Kui Redmine viiakse üle teise serverisse või paigaldatakse uuesti, viige ka see kaust üle**, koos andmebaasi ja `files/` kaustaga: kumbki neist neid faile ei sisalda ja ilma selle kaustata annavad vanade tekstide pildid vea 404. Teemade, viki lehtede jne manustamised salvestatakse nagu varem ja ei vaja midagi. Selles redaktoris sisestatud pildid on tavalised manustamised. Kaust jääb vajalikuks ka siis, kui redmine_ckeditor on eemaldatud.
3. Eemaldage redmine_ckeditor, kui te seda enam ei vaja.

Vana tekst kuvatakse nii, nagu CKEditor seda näitas: fondid, suurused, värvid ja joondamine, taandamised, loendid, tabelid (piirid, laiused, pealkirjad, ühendatud lahtrid), pildid (suurus, ujumine, piir, pilt lingis), lingid, koodiblokid nende keelega (esile tõstetud), Redmine'i makrod (`{{toc}}`, `{{collapse(Title) ... }}`, `{{thumbnail(...)}}` jne), viki ja teemade lingid, tavalised veebiaadressid klikkavad ja manustatud `<iframe>` (video). Tekst, mis on kirjutatud CKEditoris, tunnetatakse selle märgistuse järgi ja säilitab paragraafide vahel tühikute, mis tal oli seal, mis on selles redaktoris suurem.

Erinevused tahtlikult:
- `<iframe>` kuvatakse ainult siis, kui see osutab teisele saidile http(s) üle ja see on liivakastis: lehe sise saab käivitada oma skriptid, kuid ei saa jõuda Redmine'i lehele, avada ülemist akent ega esitada vorme. Kõik muud `<iframe>` eemaldatakse.
- Lingid avatakse samas aknas: lingi `target` atributi (CKEditori "Uus aken (_blank)") ei säilitata.
- Mõningaid vormindamist, mille CKEditor pakkus, kuid selle lehed vaikimisi langesid, kuvatakse siin: näiteks tema "Marker" stiilide tausta värvid ja `<q>` tsitaatide märgid.
- CKEditori stiil "Special Container" (halli raamiga plokk) kuvatakse koodiplokina ilma süntaksivärvituseta ning redaktoris on see samuti koodiplokk.

Vana tekst säilitab oma vormindamise, kui see avatakse redaktoris ja salvestatakse uuesti: Redmine'i makrod (makro on üks hall element redaktoris; redigeerige seda `<HTML>` režiimis, nagu CKEditori lähtekoodi režiimis), `<iframe>`, `<div>` ja `<address>` plokid koos nende stiiliga (veebilehelt kleebitud `<div>` muudetakse siiski lõiguks), alaindeks ja ülaindeks, CKEditori sisese stiili (suur, väike, klaviatuuri, näidis jne), pealkirjade, tabelite ja tabeli lahtrite stiil, piltide suurus (laius ja kõrgus), ujumine, piir ja link, koodiploki keel. Mis redigeerimisel ei säili: tabeli pealkiri muutub keskele joondatud lõiguks, tabeli päis ja jalus muutuvad tavaliseks ridadeks (jalus jääb alumisele) ja `<del>` muutub `<s>` (sama vaade). See redaktori poolt salvestatud tekst saab selle redaktori kompaktse paragraafide vahega.
