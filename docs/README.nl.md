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

> *Deze vertaling is gemaakt met hulp van een AI-model en is nog niet door een moedertaalspreker gecontroleerd. Als u een fout vindt, [opent u alstublieft een issue of een pull request](https://github.com/Du10777/redmine_tiptap).*

Dit is een teksteditor voor Redmine, gebaseerd op TipTap https://github.com/ueberdosis/tiptap

Ondersteunde Redmine-versies:

| Redmine | Ondersteund | Getest op |
|---|---|---|
| 7.x | ja | 7.0.2 |
| 6.x | ja | 6.1.4, 6.1.5 |
| 5.x en ouder | nee | — |

Een nieuwe hoofdversie (8.x en later) wordt pas ondersteund nadat de plugin erop is getest. Tot die tijd start Redmine van die versie niet met de plugin geïnstalleerd: het stopt met een foutmelding die de ondersteunde versies noemt.

Editor-engine: **TipTap 3.31.4**. Alle `@tiptap/*`-pakketten zijn in `package.json` en `package-lock.json` vastgesteld op deze exacte versie en moeten altijd samen naar dezelfde versie worden bijgewerkt.

## Functies

**Tekstopmaak**
- Vet, cursief, onderstreept, doorgehaald, subscript en superscript (Ctrl+, en Ctrl+.), inline-code.
- Tekstkleur en achtergrondkleur: een palet met 64 kleuren of een willekeurige hexadecimale waarde.
- Lettertype (13 lettertypen) en lettergrootte (standaardinstellingen van 8 tot 72 px of een willekeurige waarde).
- Alineastijlen: koppelingen 1–6 en normale tekst.
- Uitlijning (links, gecentreerd, rechts, uitgevuld) en inspringing (tot 8 niveaus) van alinea's en koppelingen.
- Hyperlinks: invoegen, bewerken, verwijderen.
- Horizontale lijn, ongedaan maken en opnieuw uitvoeren.

**Lijsten**
- Ongeordende lijsten met ronde, vierkante of cirkelvormige markeringen.
- Genummerde lijsten: 1, 01, a, A, i, I, α.
- Takenlijsten met selectievakjes; voltooide taken worden doorgehaald.
- Geneste lijsten (Tab / Shift+Tab).

**Tabellen**
- Een tabel van elke grootte invoegen, met of zonder een koptabelrij.
- Contextmenu in een cel (met rechtermuisknop): rijen en kolommen toevoegen en verwijderen, cellen samenvoegen en splitsen, koptabelrij en kopkolom, tabel verwijderen.
- Kolombreedte wordt gewijzigd door tabelcelranden te slepen.
- Plakken van Excel behoudt kolombreedte, uitlijning en tekengroottes; een tabel die uit Redmine is gekopieerd, wordt met randen in Excel ingeplakt.

**Afbeeldingen en bijlagen**
- Een afbeelding vanuit het klembord plakken: deze wordt geüpload als bijlage en verschijnt in de tekst.
- Afbeeldingen die zijn toegevoegd aan het bestandsveld van Redmine of erop zijn gesleept, worden ook in de tekst ingevoegd.
- Een afbeelding invoegen uit de bijlagen (een miniatuurselectie) of een koppeling naar een willekeurige bijlage.
- Het formaat van een afbeelding wijzigen door aan de hoeken te slepen.

**Code**
- Codeblokken met syntaxmarkering in de editor en op opgeslagen pagina's: 52 talen, en u kunt er meer toevoegen (zie [Syntaxmarkering](#syntaxmarkering)).
- De taal van een blok wordt gekozen via een badge in de hoek, met zoeken, onlangs gebruikte en veelgebruikte talen.
- Tab en Shift+Tab vouwen lijnen in een codeblok in en uit; vet, koppelingen en kleuren in code blijven behouden.

**Blokken**
- Opvouwbaar blok: een titel met verborgen inhoud (`<details>`). Op opgeslagen pagina's is het ingevouwen, in de editor uitgevouwen.
- Citaatblok met een auteur- en datumregel.

**Bewerking**
- Modus `<HTML>` om HTML-broncode weer te geven en te bewerken: geneste blokken zijn ingesprongen, een lege regel scheidt de blokken die meerdere regels beslaan, de syntaxis wordt op dezelfde manier gekleurd als in een HTML-codeblok, en Enter behoudt de inspringing van de regel.
- Markdown-stijltekstinvoer: `#` voor koppelingen, `-` en `1.` voor lijsten, `[ ]` voor taken, ```` ```python ```` voor een codeblok (elke taalname of geen), `**bold**`, `---` voor een horizontale lijn. Standaardtoetscombinaties: Ctrl+B, Ctrl+I, Ctrl+U, Ctrl+Z en anderen.
- De editor wordt nooit hoger dan het venster: de werkbalk en de formulierknoppen blijven zichtbaar, en de tekst schuift binnenin. De hoogte volgt de venstergrootte en pagina's zoomfactor.
- Een sleepgreep in de rechterbenedenhoek stelt de hoogte handmatig in. De hoogte wordt onthouden; dubbelklikken geeft de automatische hoogte terug.

**Redmine-integratie**
- Werkt in alle tekstvelden van Redmine met opmaak: issuebeschrijvingen en notities, wikipagina's, nieuws, forumberichten, documenten, projectbeschrijvingen, vrije tekstvelden, inclusief velden die later op de pagina verschijnen.
- Tekst wordt opgeslagen als HTML. Kies *TipTap HTML* als tekstformaat in de Redmine-instellingen om de editor te gebruiken.
- De interface (tooltips, menu's, dialogen) volgt de taal in het Redmine-profiel van de gebruiker. 47 van de 50 talen van Redmine worden met de plugin geleverd: Engels en Russisch zijn volledig, de andere 45 zijn concepten gemaakt met een AI-model dat inheemse sprekers welkom zijn om te corrigeren. De drie talen die van rechts naar links schrijven (Arabisch, Hebreeuws, Perzisch) worden opzettelijk niet ondersteund (zie [Interfacetaal](#interfacetaal)).
- Blijft snel werken met grote teksten: editors in verborgen formulieren worden alleen gemaakt wanneer het formulier wordt geopend, en lange codeblokken worden gemarkeerd wanneer ze in het zicht verschijnen.
- Teksten geschreven in CKEditor (de plugin redmine_ckeditor) worden zo weergegeven als ze daar waren en geopend in de editor met hun opmaak: geen conversie nodig, zie [Migratie vanuit CKEditor](#migratie-vanuit-ckeditor).
- Opgeslagen teksten worden weergegeven zonder onveilige HTML: scripts, event-handlers en `javascript:`-koppelingen worden verwijderd wanneer een pagina wordt weergegeven, alleen wat de editor zelf produceert, blijft behouden. Dit geldt ook voor teksten die via de REST API of de modus `<HTML>` binnenkomen.

## Syntaxmarkering

Codeblokken worden in de editor en op opgeslagen pagina's op dezelfde manier gemarkeerd. De taal van een blok wordt gekozen via de badge in de rechterbovenhoek; de lijst heeft een zoekvak en herinnert zich onlangs en veelgebruikte talen.

De plugin bevat 52 talen, waaronder HTML, 1C, Cisco IOS, MikroTik RouterOS, Windows cmd, docker compose, Linux-servicelogboeken en journalctl-uitvoer.

U kunt uw eigen talen toevoegen. Elke taal is één bestand in de map `highlight/`. Elke 190+ highlight.js-grammatica's of een grammatica van derden kan met één commando in zo'n bestand worden omgezet:

```sh
python3 highlight/_convert_grammar.py erlang
sh highlight/_compile.sh
```

Details: [highlight/README/nl.md](../highlight/README/nl.md).

## Interfacetaal

De editor spreekt de taal die in het Redmine-profiel van de gebruiker is gekozen (Mijn account → Taal). Bestanden voor 47 van de 50 talen van Redmine worden met de plugin in `config/locales/` geleverd. Engels is de bron en Russisch is het werk van de auteur; de andere 45 zijn concepten gemaakt met behulp van een AI-model en nog niet door inheemse sprekers gecontroleerd, dus verwacht wat ongebruikelijke formulering. Als een tekst in een bestand ontbreekt, wordt deze in het Engels weergegeven.

Wijzig de waarden in `config/locales/<code>.yml` (`de`, `fr`, `pt-BR`, ...) en start Redmine opnieuw op om een vertaling te corrigeren. `bundle exec rake redmine_tiptap:locales` controleert de bestanden. Pull requests met correcties zijn welkom.

**Talen die van rechts naar links schrijven (Arabisch, Hebreeuws, Perzisch) worden opzettelijk niet ondersteund.** Ondersteuning vereist veel wijzigingen in de codebasis, niet alleen een vertaling, en we hebben ervoor gekozen dit niet op ons te nemen. Voor deze talen wordt de editor in het Engels weergegeven en de lay-out niet aangepast. Als u er een nodig hebt, maakt u een fork: het vertaalmechanisme is klaar, en wat er verder moet worden gewijzigd, staat in [config/locales/README.md](../config/locales/README.md#right-to-left-languages).

Details en de lijst met Redmine-talen: [config/locales/README.md](../config/locales/README.md).

## Installatie

1. Plaats de plugin in de map `plugins` van Redmine. De map moet `redmine_tiptap` heten. Het gemakkelijkste is git, waardoor updates ook een enkel commando zijn:
   ```sh
   cd /path/to/redmine
   git clone https://github.com/Du10777/redmine_tiptap.git plugins/redmine_tiptap
   ```
2. Start Redmine opnieuw op.
3. Kies in de Redmine-instellingen (redmine.selfhosted/_settings_) voor Tekstformaat: *TipTap HTML*.

## Bijwerken

De plugin heeft geen databasemigraties, en de ingebouwde JavaScript-bundel en stylesheet maken deel uit van de repository. Bijwerken vereist noch npm noch een build op de server: vervang de plugin-bestanden en start Redmine opnieuw op.

Controleer vóór het bijwerken of de nieuwe versie uw Redmine-versie ondersteunt (zie "Ondersteunde Redmine-versies" hierboven).

### Geïnstalleerd met git (aanbevolen)

```sh
cd /path/to/redmine/plugins/redmine_tiptap
git pull
```

Start Redmine vervolgens opnieuw op, bijvoorbeeld:

```sh
sudo systemctl restart redmine          # Redmine uitgevoerd als systemd-service
touch /path/to/redmine/tmp/restart.txt  # Passenger
docker compose restart redmine          # Docker
```

Gebruik dit om op een bepaalde versie te blijven in plaats van op de nieuwste commit: `git fetch && git checkout <tag-or-commit>`.

### Geïnstalleerd vanuit een archief

1. Verwijder de oude map `plugins/redmine_tiptap` en pak de nieuwe versie op dezelfde plek uit. Door eerst te verwijderen, zorgt u ervoor dat bestanden die in de nieuwe versie zijn verwijderd, niet achterblijven.
2. Verwijder `public/assets/.manifest.json` in de Redmine-map.
3. Start Redmine opnieuw op.

Stap 2 is belangrijk. Bij het opstarten republiceert Redmine plugin-assets alleen als hun bestanden nieuwer zijn dan dit manifest. Bestanden die uit een archief zijn uitgepakt, behouden hun oorspronkelijke tijdstempels, dus zonder stap 2 kan Redmine de oude editor blijven serveren. Het manifest wordt bij het opstarten automatisch opnieuw gemaakt. Dit is niet nodig met `git pull`: git geeft gewijzigde bestanden het huidige tijdstempel.

### Na het bijwerken

- Het script en de stylesheet van de editor worden met een inhoudvingerafdruk in hun URL's geleverd, dus browsers laden de nieuwe versie direct na de herstart. Gebruikers hoeven hun browsercache niet leeg te maken.
- Indien *Opgemaakte tekst cachen* is ingeschakeld in de Redmine-instellingen (Administratie → Instellingen → Algemeen), wist u de Redmine-cache eenmaal na het bijwerken naar een versie die wijzigt hoe teksten worden weergegeven (HTML-schoonmaak, ondersteuning voor CKEditor-teksten): `bundle exec rake tmp:cache:clear RAILS_ENV=production` in de Redmine-map. Anders kunnen pagina's die vóór de update zijn weergegeven, ongewassen uit de cache worden weergegeven totdat hun tekst verandert.
- Eerdere versies van de plugin hebben het script naar `public/tiptap_bundle.js` gekopieerd. Deze bestanden worden niet meer gebruikt en kunnen worden verwijderd:
  ```sh
  rm -f /path/to/redmine/public/tiptap_bundle.js /path/to/redmine/public/tiptap_bundle.js.map
  ```

## Migratie vanuit CKEditor

Als uw Redmine [redmine_ckeditor](https://github.com/a-ono/redmine_ckeditor) gebruikte, kunt u naar deze plugin overschakelen en alle geschreven tekst behouden: issues, notities, wikipagina's, nieuws, berichten, documenten. Er wordt niets omgezet en de database wordt niet aangeraakt. CKEditor slaat de teksten op als HTML en dit gebeurt net als met deze plugin, dus een opgeslagen tekst wordt eenvoudigweg door de nieuwe formatter weergegeven.

1. Installeer de plugin (zie hierboven) en kies Tekstformaat: *TipTap HTML*.
2. Bewaar de map `public/system/rich/` van uw Redmine. Als mensen met de afbeeldingsbrowser van CKEditor afbeeldingen en bestanden hebben ingevoegd, worden deze daar opgeslagen, niet in de database en niet tussen de bijlagen, en de teksten verwijzen ernaar op adres (`/system/rich/...`). **Als Redmine naar een andere server wordt verplaatst of opnieuw wordt opgezet, verplaats dan ook deze map**, samen met de database en de map `files/`: geen van beide bevat deze bestanden, en zonder de map geven de afbeeldingen in oude teksten een 404-fout. Bijlagen van issues, wikipagina's enzovoort worden als voorheen opgeslagen en hebben niets nodig. Afbeeldingen die in deze editor zijn ingevoegd, zijn gewone bijlagen. De map blijft nodig nadat redmine_ckeditor is verwijderd.
3. Verwijder redmine_ckeditor wanneer u dit niet meer nodig hebt.

Een oude tekst wordt zo weergegeven als CKEditor het deed: lettertypen, grootten, kleuren en uitlijning, inspringing, lijsten, tabellen (randen, breedtes, bijschriften, samengevoegde cellen), afbeeldingen (grootte, zweven, rand, een afbeelding in een koppeling), koppelingen, codeblokken met hun taal (gemarkeerd), Redmine-macro's (`{{toc}}`, `{{collapse(Title) ... }}`, `{{thumbnail(...)}}` enzovoort), wiki- en issuekoppelingen, gewone webaddressen omgezet in hyperlinks en ingebedde `<iframe>` (video). Een in CKEditor geschreven tekst wordt herkend aan zijn opmaak en behoudt de afstand tussen alinea's zoals die daar was – dit is groter dan in deze editor.

Opzettelijke verschillen:
- Een `<iframe>` wordt alleen weergegeven als het verwijst naar een ander site over http(s), en het is in een sandbox: de pagina erin kan zijn eigen scripts uitvoeren, maar kan de Redmine-pagina niet bereiken, het topvenster niet openen of formulieren niet indienen. Alle andere `<iframe>` worden verwijderd.
- Koppelingen openen in hetzelfde venster: het `target`-kenmerk van een koppeling (CKEditor's "Nieuw venster (_blank)") wordt niet behouden.
- Enkele opmaak die CKEditor aanbood maar zijn pagina's geruisloos verwierpen, worden hier weergegeven: bijvoorbeeld de achtergrondkleuren van de "Marker"-stijlen en de aanhalingstekens van `<q>`.
- De stijl "Special Container" van CKEditor (een blok met een grijs kader) wordt weergegeven als een codeblok zonder syntaxmarkering, en in de editor is het ook een codeblok.

Een oude tekst behoudt de opmaak wanneer deze in de editor wordt geopend en opnieuw wordt opgeslagen: Redmine-macro's (een macro is één grijs element in de editor; bewerk het in de modus `<HTML>`, zoals in de bronmodus van CKEditor), `<iframe>`, `<div>`- en `<address>`-blokken met hun stijl (een `<div>` die uit een webpagina wordt geplakt, wordt nog steeds een alinea), subscript en superscript, inline-stijlen van CKEditor (big, small, keyboard, sample enzovoort), de stijl van koppelingen, tabellen en tabelcellen, de grootte (breedte en hoogte), zweven, rand en koppeling van afbeeldingen, de taal van codeblokken. Wat niet behouden blijft bij bewerking: het bijschrift van een tabel wordt een gecentreerde alinea erboven, de kop- en voetgedeelten van een tabel worden normale rijen (de voettekst blijft onderaan) en `<del>` wordt `<s>` (dezelfde look). Tekst opgeslagen vanuit deze editor krijgt de compacte alinea-afstand van deze editor.
