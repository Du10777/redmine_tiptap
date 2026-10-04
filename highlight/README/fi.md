# Syntaksivalaistus: kielet

**Read this in other languages:**
[English](en.md) ·
[Русский](ru.md) ·
[Shqip](sq.md) ·
[Azeri](az.md) ·
[Bosanski](bs.md) ·
[Български](bg.md) ·
[Català](ca.md) ·
[简体中文](zh.md) ·
[繁體中文](zh-TW.md) ·
[Hrvatski](hr.md) ·
[Čeština](cs.md) ·
[Dansk](da.md) ·
[Nederlands](nl.md) ·
[Eesti](et.md) ·
[Suomi](fi.md) ·
[Français](fr.md) ·
[Galego](gl.md) ·
[Deutsch](de.md) ·
[Ελληνικά](el.md) ·
[Magyar](hu.md) ·
[Bahasa Indonesia](id.md) ·
[Italiano](it.md) ·
[日本語](ja.md) ·
[한국어](ko.md) ·
[Latviešu](lv.md) ·
[lietuvių](lt.md) ·
[Монгол](mn.md) ·
[Norsk bokmål](no.md) ·
[Polski](pl.md) ·
[Português](pt.md) ·
[Português/Brasil](pt-BR.md) ·
[Română](ro.md) ·
[Srpski](sr-YU.md) ·
[Српски](sr.md) ·
[Slovenčina](sk.md) ·
[Slovenščina](sl.md) ·
[Español](es.md) ·
[Svenska](sv.md) ·
[ไทย](th.md) ·
[Türkçe](tr.md) ·
[Українська](uk.md) ·
[Tiếng Việt](vi.md)

> *Tämä käännös on tehty tekoälymallin avulla eikä sitä ole tarkistanut äidinkielinen puhuja. Jos löydät virheen, avaa [ongelma tai pull-pyyntö](https://github.com/Du10777/redmine_tiptap).*

Koodilohkot korostuvat sekä editorissa että tallentavissa sivuissa (tehtävät, huomautukset, wiki), ja ne näyttävät samalla tavalla molemmissa. Lohkon kieli valitaan sen oikeassa yläkulmassa olevasta merkistä. Kielten luettelo määritellään `highlight/`-kansion tiedostoilla: yksi tiedosto on yksi kieli.

Liitännäinen tulee 52 kielellä. Voit lisätä lisää: muunna valmis highlight.js-kielioppi skriptillä (katso [Kielen lisääminen highlight.js-ohjelmasta](#kielen-lisääminen-highlightjs-ohjelmasta)) tai kirjoita oma.

## Kuinka se toimii

- Korostus tehdään [highlight.js](https://highlightjs.org)-ohjelmalla (kohteessa [lowlight](https://github.com/wooorm/lowlight)). Editori ja tallennetut sivut käyttävät samaa moottoria, joten värit vastaavat.
- `_compile.sh` niputtaa kaikki kielitiedostot yhdeksi tiedostoksi `assets/javascripts/tiptap_highlight.js`. Tämä tiedosto on jo viety arkistoon valmiiksi, joten liitännäisen asentaminen ei vaadi rakentamista. Sinun on vain rakennettava se, kun muutat kielten joukkoa.
- Redmine lataa `tiptap_highlight.js` jokaiselle sivulle ennen editoria (`tiptap_bundle.js`). Latauksen yhteydessä editori rekisteröi kaikki kielet kyseisestä tiedostosta.
- Editorissa lohko korostuu uudelleen 50 ms sen jälkeen, kun lopetat kirjoittamisen, ja vain lohko, joka muuttui. Tallennetuilla sivuilla lohko korostuu, kun se vieritetään näkyviin. Taitetun osion sisällä oleva lohko korostuu osion avattaessa.
- Kieli tallennetaan tallennettuun HTML-muotoon: `<pre><code class="language-<id>">`. Siksi kielen `id` ei saa koskaan muuttua: tällä vanhalla `id`:llä tallennetut lohkot muuttuisivat tavalliseksi tekstiksi.
- Kielen automaattista havaitsemista ei ole: lohko ilman kieltä näytetään tavallisena tekstinä. Sama pätee lohkoon, jonka kieli ei ole `highlight/`-kansiossa (esimerkiksi kielitiedosto poistettiin); sen merkki näyttää edelleen `id`:n. Jos kielitiedosto tulee takaisin, niin tekevät värit.
- Värit. highlight.js merkitsee tekstin luokilla kuten `hljs-keyword`, `hljs-string`, `hljs-comment`. Niiden värit asetetaan `assets/stylesheets/src/06_code.css`-tiedostossa käyttäen Redminen omaa syntaksivalaistusohjelmaa.

## Kielitiedosto

Esimerkiksi `routeros.js`:

```js
import grammar from 'highlight.js/lib/languages/routeros';

export default {
  id: 'routeros',
  label: 'RouterOS',
  hint: 'MikroTik',
  keywords: 'mikrotik',
  grammar: grammar,
};
```

| Kenttä | Vaaditaan | Mikä se on |
|---|---|---|
| `id` | kyllä | Kielen nimi tallennetussa HTML-muodossa (`class="language-<id>"`). Sallitut merkit: `a-z`, `0-9`, `-`, `_`. **Älä koskaan muuta sitä** kun lohkot tällä kielellä on tallennettu. |
| `label` | ei | Nimi kielten luettelossa ja lohkon merkissä. Oletus on `id`. |
| `hint` | ei | Harmaa huomautus nimen vieressä luettelossa. |
| `keywords` | ei | Ylimääräisiä sanoja luettelon hakua varten, välilyönneillä erotettu. |
| `grammar` | kyllä | Highlight.js-kielioppi: funktio `(hljs) => language definition`. |

`label`, `hint` ja `keywords` ovat englanniksi. Näyttääksesi kielen eri nimellä käyttäjän käyttöliittymässä tai tehdäksesi siitä löydettävän kyseisen kielen sanoilla, lisää merkintä kyseisen kielen käännöstiedostoon `config/locales/<code>.yml` alle, kohdassa `code_languages:`. Siellä olevat sanat lisätään `keywords`-kohtaan; `label` ja `hint` korvaavat kielitiedostosta tulevat. `config/locales/ru.yml` sisältää esimerkkejä, säännöt ovat [config/locales/README.md](../../config/locales/README.md).

Kansion tiedostojen tyypit:

- **Lyhyt.** Viittaus highlight.js npm-paketin kieliopiin, kuten yllä olevassa esimerkissä; useimmat kielet ovat tällaisia. Kielioppi tulee plugin-ohjelman `package-lock.json`-tiedostoon tallennetusta highlight.js-versiosta.
- **Täysi kopio.** Kielioppikoodi on itse tiedostossa ja sitä voidaan muokata. Nämä tiedostot luodaan muunnosskriptillä (katso alla).
- **Oma kielioppi.** `log.js`, `journalctl.js`, `cisco-ios.js`; niiden jaetut osat ovat `_common.js`-tiedostossa.
- **Kääre.** Valmis kielioppi eri nimellä: `cmd.js` on `dos` highlight.js-ohjelmasta, `docker-compose.js` on `yaml`.

Tiedostot ja kansiot, joiden nimet alkavat `_`-merkillä, eivät ole kieliä:

- `_compile.sh` rakentaa kielet;
- `_check.mjs` tarkistaa kielet rakentamisen aikana;
- `_common.js` sisältää liitännäisen omien kieliopien jaetut osat;
- `_convert_grammar.py` on skripti, joka muuntaa highlight.js-kieliopit (katso alla);
- `_vendor/` sisältää tiedostot, joita muunnetut kieliopit tuovat (luonut muunnosskripti).

`README/`-kansio sisältää tämän dokumentaation.

## Kielen lisääminen highlight.js-ohjelmasta

Valmiita kieliopit (yli 190) ovat täällä: https://github.com/highlightjs/highlight.js/tree/main/src/languages. Niiden nimet ja aliakset on lueteltu kohteessa [SUPPORTED_LANGUAGES.md](https://github.com/highlightjs/highlight.js/blob/main/SUPPORTED_LANGUAGES.md), sekä noin sata kolmannen osapuolen kielioppia, joita säilytetään erillisissä arkistoissa. Tämän kansion `_convert_grammar.py`-skripti muuntaa minkä tahansa niistä liitännäisen muotoon.

Skripti tarvitsee Python 3.6+ (ei ylimääräisiä paketteja) ja pääsyn github.com-sivustolle. Suorita se liitännäiskansio:

```sh
cd /path/to/redmine/plugins/redmine_tiptap
python3 highlight/_convert_grammar.py erlang
sh highlight/_compile.sh
```

Argumentti `erlang` on `src/languages` sisällä olevan tiedoston nimi ilman `.js`. Toinen komento rakentaa kielet ja tarkistaa ne. Käynnistä sitten Redmine uudelleen (katso [Rakentaminen ja soveltaminen](#rakentaminen-ja-soveltaminen)). Windowsilla käytä `py` tai `python` sijasta `python3`.

Esimerkkejä:

```sh
# highlight.js-kielten luettelo (* = jo highlight/), valinnainen suodatus sanalla
python3 highlight/_convert_grammar.py --list
python3 highlight/_convert_grammar.py --list sql

# useita kieliä kerralla
python3 highlight/_convert_grammar.py erlang nix fsharp

# oma nimi, vihje ja hakusanat (yksi kieli kerralla)
python3 highlight/_convert_grammar.py erlang --label "Erlang/OTP" --hint BEAM --keywords "erl otp"

# korvaa liitännäisen kanssa toimitettu lyhyt tiedosto muokattavalla täydellä kopiolla
python3 highlight/_convert_grammar.py routeros --force --label RouterOS --hint MikroTik --keywords mikrotik

# kieli, jota ei vielä ole julkaistussa highlight.js-versiossa, kehitysosasta
python3 highlight/_convert_grammar.py odin --ref main

# linkki kieliopitiedostoon suoraan selaimen osoiterivillä
python3 highlight/_convert_grammar.py https://github.com/highlightjs/highlight.js/blob/main/src/languages/odin.js

# kolmannen osapuolen kielioppi: linkki sen arkistoon, skripti löytää kieliopitiedoston
python3 highlight/_convert_grammar.py https://github.com/highlightjs/highlightjs-terraform

# paikallinen kieliopitiedosto
python3 highlight/_convert_grammar.py ~/grammars/mylang.js --id mylang

# lyhyt tiedosto, joka viittaa npm-pakettiin koodin kopion sijasta
python3 highlight/_convert_grammar.py erlang --npm

# näytä mitä tehtäisiin muuttamatta mitään
python3 highlight/_convert_grammar.py erlang --dry-run
```

### Mitä skripti tekee

1. Lataa `src/languages/<name>.js` highlight.js-versiosta, jolla liitännäinen toimii. Versio luetaan `package-lock.json`-tiedostosta (tällä hetkellä 11.12.0), koska kieliopit kirjoitetaan niiden oman version moottorille. `--ref` valitsee toisen version, haaran tai commit-osoitteen.
2. Ottaa kielen nimen kieliopin otsikon `Language:`-riviltä ja hakusanat sen aliaksista (`aliases`). `id` on kieliopitiedoston nimi.
3. Laittaa kieliopin koodin `highlight/<id>.js`-tiedostoon muuttumattomaksi viennin osalta: `export default function(hljs)` tulee `function grammar(hljs)`, ja kieliobjekti `export default { id, label, keywords, grammar }` liitetään tiedoston loppuun. Jos kielioppi on CommonJS-moduuli (`module.exports = ...`), rivi, joka julistaa `module` ja `exports`, lisätään alkuun.
4. Jos kielioppi tuo muita tiedostoja, lataa ne `highlight/_vendor/<source>-<version>/` kansioon samaisiin polkuihin kuin arkistossa ja osoittaa tuonti sinne. Esimerkiksi `typescript` tuo `javascript.js` ja `lib/ecmascript.js`. Nämä tiedostot jaetaan kaikilla saman lähteen ja version kielillä; niitä ei tarvitse muokata.
5. Tarkistaa `Requires:`-rivin, joka luettelee sisäkkäiselle koodille käytetyt kielet (esimerkiksi `php-template` tarvitsee `xml` ja `php`). Jos ne eivät ole `highlight/`-kansiossa, tulostaa komennon, joka lisää ne. Ilman niitä sisäkkäinen koodi pysyy yksinkertaisesti värittämättömänä; tämä ei ole virhe.
6. Ei korvaa olemassa olevia tiedostoja ilman `--force` ja ei ota `id`:tä, jota on jo käyttänyt toinen tiedosto.

Muunnoksen jälkeen kieltä voidaan muokata suoraan sen tiedostossa.

### Asetukset

| Asetus | Mitä se tekee |
|---|---|
| `LANGUAGE ...` | Highlight.js-kielen nimi, linkki kieliopitiedostoon tai kolmannen osapuolen kielioppi-arkistoon GitHubissa tai polku paikalliseen `.js`-tiedostoon. |
| `--ref REF` | Highlight.js-versio (merkki), haara tai commit-osoite. Oletus on versio `package-lock.json`-tiedostossa. Linkeille versio otetaan linkistä. |
| `--id ID` | Kielen `id`. Oletus on kieliopin tiedoston nimi. |
| `--label TEXT` | Nimi luettelossa ja merkissä. Oletus on `Language:` kieliopista. |
| `--hint TEXT` | Harmaa huomautus luettelossa. |
| `--keywords TEXT` | Hakusanat välilyönneillä erotettu. Oletus: kieliopin aliakset. |
| `--npm` | Koodin kopion sijasta kirjoita lyhyt tiedosto, joka viittaa highlight.js npm-pakettiin. Vain highlight.js:n itsensä kielille. |
| `--force` | Korvaa olemassa olevat tiedostot. |
| `--dry-run` | Näytä mitä tehtäisiin muuttamatta mitään. |
| `--list [WORD]` | Luettele highlight.js-kielet ja kolmannen osapuolen kieliopit, valinnainen suodatus sanalla. |
| `--prune` | Poista tiedostot `_vendor/`-kansiosta, joita mikään kieli ei enää tuo. |


**Kopio tai `--npm`?** Kopio näyttää säännöt suoraan tiedostossa: voit muokata niitä, ottaa kieliopin, joka on uudempi kuin asennettu paketti, tai kolmannen osapuolen. Kopio ei muutu, kun liitännäinen päivittää highlight.js; päivittääksesi sen, muunna kieli uudelleen `--force`-liputuksella. `--npm`:llä tehty tiedosto on vain muutama rivi pitkä, ja sen kielioppi päivittyy liitännäisen kanssa.

## Rakentaminen ja soveltaminen

```sh
sh highlight/_compile.sh
```

- Se vaatii Dockerin (rakentaminen suoritetaan `node:20-alpine`-säiliössä) tai, jos Dockeria ei ole, Node.js 18+ samalla koneella. Ensimmäisellä kerralla skripti asentaa npm-paketit liitännäisen `node_modules/`-kansioon.
- Ensin skripti tarkistaa jokaisen kielen: rakentaa sen erikseen, lataa sen, rekisteröi sen samassa moottorissa, joka suoritetaan selaimessa, ja korostaa esimerkkitekstia. Jos kieli on rikkoutunut (koodi virhe, virheellinen säännöllinen lauseke, `id` jo otettu), skripti nimeää tiedoston ja syyn ja pysähtyy; edellinen `tiptap_highlight.js` pysyy paikalla.
- Sitten skripti niputtaa kaikki kielet `assets/javascripts/tiptap_highlight.js`-tiedostoon.

Rakentamisen jälkeen käynnistä Redmine uudelleen: se julkaisee liitännäisen tiedostot käynnistyksen yhteydessä (katso "Päivitys" [pääkäsikirjassa](../../docs/README.fi.md#päivitys) komennoista). Selaimet saavat uuden tiedoston heti, koska sen URL sisältää sisällön sormenjäljen.

Jos Redmine-palvelimella ei ole Dockeria eikä Node.js:ää, rakenna millä tahansa koneella, jolla on yksi niistä (liitännäiskansion kopio riittää) ja aseta tuloksena olevan `assets/javascripts/tiptap_highlight.js`-tiedoston palvelimelle.

## Kielen poistaminen

Poista kielitiedosto `highlight/`-kansiosta, rakenna ja käynnistä Redmine uudelleen. Tallennetut lohkot tällä kielellä pysyvät sellaisina kuin ne ovat ja näytetään tavallisena tekstinä. Tiedostot `_vendor/`-kansiossa, jotka eivät enää ole tarpeellisia, poistetaan:

```sh
python3 highlight/_convert_grammar.py --prune
```

## Omat kieliopit ja muokkaussäännöt

- Kielioppi on funktio, joka vastaanottaa `hljs`-objektin ja palauttaa kielidefinition: mitkä tekstitonaveät merkitään ja miten. Opas: https://highlightjs.readthedocs.io/en/latest/language-guide.html, viite: https://highlightjs.readthedocs.io/en/latest/mode-reference.html. Esimerkkejä: `log.js`, `journalctl.js`, `cisco-ios.js`.
- highlight.js liitää kielen kaikkien sääntöjen säännölliset lausekkeet yhteen ja jättää huomiotta niiden omia lippuja. Joten kirjainkokotunton sovituksesta on oltava selkeästi `[Ee]rror` tai se on otettava käyttöön koko kielelle `case_insensitive: true`-lippulla.
- Suosi vakiolokipalvelun luokkia (`keyword`, `string`, `number`, `comment`, `title`, `attr`, `variable`, `built_in`, `literal`, `meta`, `symbol`, `type` jne.): niillä on jo värit. Oma luokka (esimerkiksi `scope: 'log-error'` tuottaa luokan `hljs-log-error`) tarvitsee säännön `assets/stylesheets/src/06_code.css`-tiedostossa ja CSS-uudelleenrakentamisen (`assets/stylesheets/src/_build.sh`).
- Tarjotaksesi valmis kieliopin eri nimellä, tee kuten `cmd.js` tekee: kutsu alkuperäisen kieliopin ja muuta `name` ja `aliases` sen tuloksessa. Jos aliakseja ei korvata, uusi kieli ottaa ne alkuperäisestä.

## Liitännäisen päivittäminen, kun olet lisännyt kieliä

git jättää `highlight/`-kansiossa olevat tiedostot rauhaan. Mutta uuden liitännäisen version `assets/javascripts/tiptap_highlight.js` on rakennettu ilman kieliäsi, ja sinun rakentamasi tämä tiedosto estää `git pull`-komentoa. Joten:

```sh
cd /path/to/redmine/plugins/redmine_tiptap
git checkout -- assets/javascripts/tiptap_highlight.js
git pull
sh highlight/_compile.sh
```

Ensimmäinen komento hylkää rakentamasi, viimeinen rakentaa kielet uudelleen, kotiutesi mukaan lukien. Käynnistä sitten Redmine uudelleen. Jos olet muokannut liitännäisen kanssa toimitetuja kielitiedostoja, git voi pyytää sinua ratkaisemaan niihin kohdistuvat ristiriidat.

Jos liitännäinen asennettiin arkistosta, tallenna kielitiedostot ja `_vendor/`-kansio ennen liitännäiskansion korvaamista, laita ne takaisin sen jälkeen ja rakenna kielet.

## Koko

Kaikki kielet nipuitetaan yhteen tiedostoon; selain lataa sen kerran ja ottaa sen sitten välimuistista. Tällä hetkellä se on 226 KB 52 kielellä. Useimmat kielet vievät 1–10 kt, suurin on 1C (55 kt).
