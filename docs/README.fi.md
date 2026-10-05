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

> *Tämä käännös on tehty tekoälymallin avulla eikä sitä ole tarkistanut äidinkielinen puhuja. Jos löydät virheen, avaa [ongelma tai pull-pyyntö](https://github.com/Du10777/redmine_tiptap).*

Tämä on tekstieditori Redminelle, joka perustuu TipTapiin https://github.com/ueberdosis/tiptap

Tuetut Redmine-versiot: **6.\*** (kehitetty ja testattu versiolla 6.1.4).

Editorin moottori: **TipTap 3.31.4**. Kaikki `@tiptap/*`-paketit on kiinnitetty tähän tarkasti samaan versioon `package.json`- ja `package-lock.json`-tiedostoissa ja ne on aina päivitettävä yhdessä samaan versioon.

## Ominaisuudet

**Tekstin muotoilu**
- Lihavointi, kursivointi, alleviivaus, yliviivaus, alaindeksi ja yläindeksi (Ctrl+, ja Ctrl+.), rivinsisäinen koodi.
- Tekstin väri ja taustaväri: 64 värin paneeli tai mikä tahansa hex-arvo.
- Kirjasimen perhe (13 kirjasinta) ja koko (esiasetukset 8-72 pikseliä tai mikä tahansa arvo).
- Kappaleen tyylit: otsikot 1–6 ja normaali teksti.
- Tasaus (vasen, keskellä, oikea, tasattu) ja sisennys (enintään 8 tasoa) kappaleille ja otsikoille.
- Linkit: lisää, muokkaa, poista.
- Vaakasuora viiva, kumoa ja toista.

**Luettelot**
- Luettelot, joissa on levy-, ympyrä- tai neliömerkit.
- Numeroitut luettelot: 1, 01, a, A, i, I, α.
- Tehtäväluettelot, joissa on valintaruudut; valmiit tehtävät on yliviivattu.
- Sisäkkäiset luettelot (sarkain / Shift+sarkain).

**Taulukot**
- Lisää mikä tahansa kokoinen taulukko, jossa on tai ilman otsikkorivi.
- Hiiren oikean painikkeen valikko solusa: lisää ja poista rivejä ja sarakkeita, yhdistä ja jaa soluja, otsikko rivi ja otsikko sarake, poista taulukko.
- Sarakkeiden leveyksiä muutetaan vetämällä solun rajoja.
- Excelin liittäminen säilyttää sarakkeiden leveydet, tasauksen ja fonttikoot; Redminesta kopioitu taulukko liitetään Exceliin reunuksilla.

**Kuvat ja liitetiedostot**
- Liitä kuva leikepöydältä: se ladataan liitetiedostoksi ja näkyy tekstissä.
- Kuvat, jotka on liitetty Redminen tiedostokenttään tai pudotettu siihen, lisätään myös tekstiin.
- Lisää kuva liitetiedostoista (pienoiskuvavälitsin) tai linkki mihin tahansa liitetiedostoon.
- Muuta kuvan kokoa vetämällä sen kulmia.

**Koodi**
- Koodilohkot syntaksivalairalla editorissa ja tallentavissa sivuissa: 52 kieltä ja voit lisätä lisää (katso [Syntaksivalaistus](#syntaksivalaistus)).
- Lohkon kieli valitaan sen kulmassa olevasta merkistä, hakua, viime aikojen ja usein käytettyjä kieliä.
- Sarkain ja Shift+sarkain pienentävät ja suurentavat rivejä koodilohkossa; lihavointi, linkit ja värit koodin sisällä säilytetään.

**Lohkot**
- Taitettava lohko: otsikko piilotetulla sisällöllä (`<details>`). Taitettu tallennetuissa sivuissa, laajennettu editorissa.
- Lainaustaulukko, jossa on kirjoittaja- ja päivämäärärivi.

**Muokkaus**
- `<HTML>`-tila HTML-lähteen katselemiseen ja muokkaamiseen: sisäkkäiset lohkot sisennetään, usealle riville ulottuvat lohkot erotetaan toisistaan tyhjällä rivillä, syntaksi väritetään samoilla säännöillä kuin HTML-koodilohkossa, ja Enter säilyttää rivin sisennyksen.
- Markdown-tyylinen kirjoitus: `#` otsikoille, `-` ja `1.` luetteloille, `[ ]` tehtäville, ```` ```python ```` koodilohkolle (mikä tahansa kielentunnus tai ei mitään), `**bold**`, `---` vaakasuoralle viivalle. Vakiokiilentäppäimistön pikakuvakkeet: Ctrl+B, Ctrl+I, Ctrl+U, Ctrl+Z ja muut.
- Editor ei ole koskaan korkeampi kuin ikkuna: työkalupalkki ja lomakkeen painikkeet pysyvät näkyvissä ja teksti vierittää sisällä. Korkeus seuraa ikkunan kokoa ja sivun zoomausta.
- Koon muuttamisen kahva oikeassa alakulmassa asettaa korkeuden käsin. Korkeus muistetaan; kaksoisnapsautus palaa automaattiseen korkeuteen.

**Redminen integraatio**
- Toimii kaikissa Redmine-tekstikentissä, joissa on muotoilu: tehtävien kuvaukset ja huomautukset, wikisivut, uutiset, keskustelupalstien viestit, asiakirjat, projektien kuvaukset, pitkän tekstin mukautetut kentät, mukaan lukien kentät, jotka ilmestyvät sivulle myöhemmin.
- Teksti tallennetaan HTML-muodossa. Käyttääksesi editoria, valitse *TipTap HTML* tekstinmuotoiluna Redminen asetuksissa.
- Käyttöliittymä (vinkit, valikot, valintaikkunat) noudattaa käyttäjän Redmine-profiilin kieltä. 47 Redminen 50 kielestä tulee liitännäisen kanssa: englanti ja venäjä ovat täydellisiä, loput 45 ovat luonnoksia, jotka on tehty tekoälymallin avulla ja äidinkieliset puhujat voivat korjata. Kolmea oikealta vasemmalle kirjoitettua kieltä (arabia, hepraea, persia) ei tueta tarkoituksella (katso [Käyttöliittymän kieli](#käyttöliittymän-kieli)).
- Pysyy nopeana suurissa teksteissä: piilotettujen lomakkeiden editorit luodaan vain, kun lomake avataan, ja pitkät koodilohkot korostetaan, kun ne vieritetään näkyviin.
- CKEditorilla kirjoitetut tekstit (redmine_ckeditor-liitännäinen) näytetään sellaisina kuin ne olivat ja avautuvat editorissa muotoilulla: ei muunnosta, katso [CKEditorista siirtyminen](#siirtyminen-ckeditorista).
- Tallennetut tekstit näytetään ilman turvattomaa HTML-koodia: skriptit, tapahtumankäsittelijät ja `javascript:`-linkit poistetaan sivua näytettäessä, vain se, mitä itse editori tuottaa, säilyy. Tämä kattaa myös tekstit, jotka tulevat REST API:n tai `<HTML>`-tilan kautta.

## Syntaksivalaistus

Koodilohkot korostetaan sekä editorissa että tallennetuissa sivuissa samalla tavalla. Lohkon kieli valitaan sen yläoikeassa kulmassa olevasta merkistä; lista sisältää hakuruudun ja muistaa viime aikojen ja usein käytetyt kielet.

52 kieltä tulee liitännäisen kanssa, mukaan lukien HTML, 1C, Cisco IOS, MikroTik RouterOS, Windows cmd, docker compose, Linux-palvelun lokit ja journalctl-ulostulo.

Voit lisätä omia kieliä. Jokainen kieli on yksi tiedosto `highlight/`-kansiossa. Mikä tahansa 190+ highlight.js-kieliopista tai kolmansien osapuolien kielioppi voidaan muuntaa sellaiseksi tiedostoksi yhdellä komennolla:

```sh
python3 highlight/_convert_grammar.py erlang
sh highlight/_compile.sh
```

Tiedot: [highlight/README/fi.md](../highlight/README/fi.md).

## Käyttöliittymän kieli

Editori puhuu käyttäjän Redmine-profiilissa valittua kieltä (Oma tili → Kieli). 47 Redminen 6 50 kielestä tulee liitännäisen kanssa `config/locales/`-kansiossa. Englanti on lähde ja venäjä on kirjoittajan oma; loput 45 ovat luonnoksia, jotka on tehty tekoälymallin avulla ja joita äidinkieliset puhujat eivät ole vielä tarkastaneet, joten odota jotakin ihmeellistä sanaa täällä ja siellä. Tiedostosta puuttuva teksti näytetään englanniksi.

Käännöksen korjaamiseksi muuta sen arvoja `config/locales/<code>.yml`-tiedostossa (`de`, `fr`, `pt-BR`, ...) ja käynnistä Redmine uudelleen. `bundle exec rake redmine_tiptap:locales` tarkistaa tiedostot. Pull-pyyntöjä korjauksilla otetaan vastaan.

**Oikealta vasemmalle kirjoitetut kielet (arabia, hepraea, persia) eivät ole tarkoituksella tuettuja.** Niiden tukeminen vaatii monia muutoksia koodikantaan, ei vain käännöstä, ja päätimme olla tekemättä sitä. Näillä kielillä editori näytetään englanniksi eikä sen asettelua säädössä. Jos tarvitset jotakin niistä, tee haara: käännösmekanismi on valmis ja mitä muuta on muutettava, on lueteltu [config/locales/README.md](../config/locales/README.md#right-to-left-languages).

Tiedot ja Redminen kielten luettelo: [config/locales/README.md](../config/locales/README.md).

## Asennus

1. Laita liitännäinen Redminen `plugins`-kansioon. Kansion on oltava nimeltään `redmine_tiptap`. Helpoin tapa on git, joka tekee päivityksistä myös yhden komennon:
   ```sh
   cd /path/to/redmine
   git clone https://github.com/Du10777/redmine_tiptap.git plugins/redmine_tiptap
   ```
2. Käynnistä Redmine uudelleen.
3. Valitse Redminen asetuksissa (redmine.selfhosted/_settings_) Tekstin muotoilu: *TipTap HTML*.

## Päivitys

Liitännäisellä ei ole tietokantasiirtoja, ja rakennettu JavaScript-nippu ja tyylitiedosto ovat osa arkistoa. Päivitys ei vaadi npm:ää tai rakentamista palvelimella: korvaa liitännäisen tiedostot ja käynnistä Redmine uudelleen.

Ennen päivitystä tarkista, että uusi versio tukee Redmine-versiotasi (katso "Tuetut Redmine-versiot" yllä).

### Asennettu git-ohjelmalla (suositeltu)

```sh
cd /path/to/redmine/plugins/redmine_tiptap
git pull
```

Käynnistä sitten Redmine uudelleen, esimerkiksi:

```sh
sudo systemctl restart redmine          # Redmine systemd-palveluna
touch /path/to/redmine/tmp/restart.txt  # Passenger
docker compose restart redmine          # Docker
```

Pysyäkseen tietyssä versiossa viimeisen commit-osoitteen sijasta: `git fetch && git checkout <tag-or-commit>`.

### Asennettu arkistosta

1. Poista vanha `plugins/redmine_tiptap`-kansio ja pura uusi versio sen tilalle. Poistaminen ensin varmistaa, että uuden version poistetut tiedostot eivät jää.
2. Poista `public/assets/.manifest.json` Redmine-kansiosta.
3. Käynnistä Redmine uudelleen.

Vaihe 2 on tärkeä. Käynnistyksen yhteydessä Redmine julkaisee liitännäisen resurssit vain, jos niiden tiedostot ovat uudempia kuin tämä manifesti. Arkistosta puretut tiedostot säilyttävät alkuperäiset aikaleimansa, joten ilman vaihetta 2 Redmine voi jatkaa vanhan editorin palvelemista. Manifesti luodaan uudelleen automaattisesti käynnistyksen yhteydessä. `git pull`-käyttöä käyttämällä tämä vaihe ei ole tarpeen: git antaa muutetuille tiedostoille nykyisen ajan.

### Päivityksen jälkeen

- Editorin skripti ja tyylitiedosto palvelevat sisältöä sormuljäljillä niiden URL-osoitteissa, joten selaimet lataavat uuden version heti uudelleenkäynnistyksen jälkeen. Käyttäjien ei tarvitse tyhjentää selainensa välimuistia.
- Jos *Tekstin muotoilu* on käytössä Redminen asetuksissa (Ylläpito → Asetukset → Yleinen), tyhjennä Redminen välimuisti kerran päivitettäessä versioon, joka muuttaa tekstien näyttöä (HTML-siivous, CKEditor-tekstien tuki): `bundle exec rake tmp:cache:clear RAILS_ENV=production` Redmine-kansiossa. Muuten päivitystä ennen renderoidut sivut voidaan näyttää välimuistista, puhdistamattomina, kunnes niiden teksti muuttuu.
- Liitännäisen aikaisemmat versiot kopioivat komentosarjan osoitteeseen `public/tiptap_bundle.js`. Näitä tiedostoja ei enää käytetä ja ne voidaan poistaa:
  ```sh
  rm -f /path/to/redmine/public/tiptap_bundle.js /path/to/redmine/public/tiptap_bundle.js.map
  ```

## Siirtyminen CKEditorista

Jos Redmine käytti [redmine_ckeditor](https://github.com/a-ono/redmine_ckeditor)-ohjelmaa, voit vaihtaa tähän liitännäiseen ja säilyttää kaiken kirjoitetun tekstin: tehtävät, huomautukset, wikisivut, uutiset, viestit, asiakirjat. Mitään ei muunneta ja tietokantaa ei kosketa. CKEditor tallentaa tekstit HTML-muodossa kuten tämä liitännäinen, joten tallennettu teksti näytetään yksinkertaisesti uuden muotoilijan toimesta.

1. Asenna liitännäinen (katso yllä) ja valitse Tekstin muotoilu: *TipTap HTML*.
2. Säilytä Redminen `public/system/rich/`-kansio. Jos ihmiset ovat lisänneet kuvia ja tiedostoja CKEditorin kuvaselaimen kautta, ne tallennetaan sinne, ei tietokantaan eikä liitetiedostoihin, ja tekstit viittaavat niihin osoitteella (`/system/rich/...`). **Jos Redmine siirretään toiselle palvelimelle tai asennetaan uudelleen, siirrä myös tämä kansio**, tietokannan ja `files/`-kansion mukana: kumpikaan niistä ei sisällä näitä tiedostoja, ja ilman kansiota vanhojen tekstien kuvat antavat 404-virheen. Tehtävien, wikisivujen ja niin edelleen liitetiedostot tallennetaan kuten ennenkin eikä vaadi mitään. Tässä editorissa lisätyt kuvat ovat tavallisia liitetiedostoja. Kansio on tarpeen myös sen jälkeen, kun redmine_ckeditor on poistettu.
3. Poista redmine_ckeditor, kun et enää tarvitse sitä.

Vanha teksti näytetään sillä tavalla, jolla CKEditor näytti sen: fontit, koot, värit ja tasaus, sisennykset, luettelot, taulukot (rajat, leveydet, kuvatekstit, yhdistetyt solut), kuvat (koko, float, raja, kuva linkin sisällä), linkit, koodilohkot niiden kielellä (korostettuna), Redminen makrot (`{{toc}}`, `{{collapse(Title) ... }}`, `{{thumbnail(...)}}` ja niin edelleen), wiki- ja tehtävälinkit, tavallisten verkko-osoitteiden tekeminen klikkikelpoisiksi ja upotettua `<iframe>` (video). CKEditorissa kirjoitettu teksti tunnistetaan merkintöjen avulla ja säilyttää siinä olleet kappaleiden väliset välit, jotka ovat suuremmat kuin tässä editorissa.

Tarkoituksella tehdyt erot:
- `<iframe>` näytetään vain, kun se osoittaa toiselle sivustolle http(s)-osoitteen kautta ja se on hiekkalaatikko: sivulla voi olla omia skriptejä, mutta se ei voi saavuttaa Redmine-sivua, avata ylimmän tason ikkunaa tai lähettää lomakkeita. Kaikki muut `<iframe>` poistetaan.
- Linkit avautuvat samassa ikkunassa: linkin `target`-attribuutti (CKEditorin "Uusi ikkuna (_blank)") ei säily.
- Joitain muotoiluja, joita CKEditor tarjosi, mutta sen sivut hiljaa pudottivat, näytetään täällä: esimerkiksi sen "Merkitsin" tyylien taustavärit ja `<q>`:n lainausmerkit.
- CKEditorin tyyli "Special Container" (lohko, jossa on harmaa kehys) näytetään koodilohkona ilman korostusta, ja se on koodilohko myös editorissa.

Vanha teksti säilyttää muotoiluansa, kun se avataan editorissa ja tallennetaan uudelleen: Redminen makrot (makro on yksi harmaa elementti editorissa; muokkaa sitä `<HTML>`-tilassa, kuten CKEditorin lähdetilassa), `<iframe>`, `<div>`- ja `<address>`-lohkot tyyleineen (verkkosivulta liitetty `<div>` muutetaan edelleen kappaleeksi), alaindeksi ja yläindeksi, CKEditorin sisäiset tyylit (iso, pieni, näppäimistö, näyte ja niin edelleen), otsikoiden, taulukoiden ja taulukkosolun tyylittely, kuvien koko (leveys ja korkeus), float, raja ja linkki, koodilohkojen kieli. Mikä ei selviä muokkauksesta: taulukon kuvausteksti tulee keskitetyksi kappaleeksi sen yläpuolelle, taulukon ylä- ja alatunniste tulevat tavallisiksi riveiksi (alatunniste pysyy alhaalla) ja `<del>` tulee `<s>` (sama ulkonäkö). Tästä editorista tallennettu teksti saa tämän editorin kompaktin kappaleen välilyönnin.
