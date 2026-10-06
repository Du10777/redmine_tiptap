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

> *Denne oversættelse blev lavet med hjælp fra en AI-model og er ikke blevet gennemset af en modersmålstaler. Hvis du finder en fejl, bedes du [åbne et issue eller en pull request](https://github.com/Du10777/redmine_tiptap).*

Dette er en teksteditor til Redmine, baseret på TipTap https://github.com/ueberdosis/tiptap

**[Prøv editoren online](https://du10777.github.io/redmine_tiptap/)**: demosiden kører editoren fra dette plugin direkte i din browser, på en side lavet som en formular i Redmine. Skriv og formatér tekst, indsæt et billede, åbn fanen »Forhåndsvisning« for at se, hvordan teksten vil se ud, når den er gemt, skift sprog i brugerfladen, eller vælg en eksempeltekst. Intet skal installeres, og intet sendes nogen steder hen.

[![Editoren på demosiden](../docs/images/demo.png)](https://du10777.github.io/redmine_tiptap/)

Editormotor: **TipTap 3.31.4**. Alle `@tiptap/*`-pakker er fastsat til denne præcise version i `package.json` og `package-lock.json` og skal altid opgraderes sammen til samme version.

**Indhold**

- [Understøttede Redmine-versioner](#understøttede-redmine-versioner)
- [Funktioner](#funktioner)
  - [Tekstformatering](#tekstformatering)
  - [Lister](#lister)
  - [Tabeller](#tabeller)
  - [Billeder og vedhæftede filer](#billeder-og-vedhæftede-filer)
  - [Kode](#kode)
  - [Blokke](#blokke)
  - [Redigering](#redigering)
  - [Integration med Redmine](#integration-med-redmine)
- [Syntaksmarkering](#syntaksmarkering)
- [Grænsefladesprog](#grænsefladesprog)
- [Installation](#installation)
- [Opdatering](#opdatering)
  - [Installeret med git (anbefales)](#installeret-med-git-anbefales)
  - [Installeret fra et arkiv](#installeret-fra-et-arkiv)
  - [Efter opdatering](#efter-opdatering)
- [Migration fra CKEditor](#migration-fra-ckeditor)

## Understøttede Redmine-versioner

| Redmine | Understøttet | Testet på |
|---|---|---|
| 7.x | ja | 7.0.2 |
| 6.x | ja | 6.1.4, 6.1.5 |
| 5.x og ældre | nej | — |

En ny hovedversion (8.x og senere) understøttes først, når plugin'et er testet på den. Indtil da starter Redmine i den version ikke med plugin'et installeret: den stopper med en fejl, der angiver de understøttede versioner.

## Funktioner

### Tekstformatering
- Fed, kursiv, understreget, gennemstreget, subscript og superscript (Ctrl+, og Ctrl+.), inline-kode.
- Tekstfarve og baggrundsfarve: en palet med 64 farver eller en hvilken som helst hex-værdi.
- Skrifttype (13 skrifttyper) og skriftstørrelse (forudindstillinger fra 8 til 72 px eller en hvilken som helst værdi).
- Afsnitstyler: overskrifter 1–6 og normal tekst.
- Justering (venstre, center, højre, fuld) og indrykning (op til 8 niveauer) af afsnit og overskrifter.
- Links: indsæt, rediger, fjern.
- Vandret linje, fortryd og gentag.

### Lister
- Punktoplistninger med prik, cirkel eller firkant-markører.
- Nummererede lister: 1, 01, a, A, i, I, α.
- Opgavelister med afkrydsningsfelter; afsluttede opgaver er gennemslagene.
- Indlejrede lister (Tab / Shift+Tab).

### Tabeller
- Indsæt en tabel af enhver størrelse, med eller uden header-række.
- Genvej-menu i en celle: tilføj og slet rækker og kolonner, flet og del celler, header-række og header-kolonne, slet tabellen.
- Kolonnebredder ændres ved at trække cellekanter.
- Indsætning fra Excel bevarer kolonnebredder, justering og skriftstørrelser; en tabel kopieret fra Redmine indsættes i Excel med grænser.

### Billeder og vedhæftede filer
- Indsæt et billede fra udklipsholderen: det uploades som en vedhæftelse og vises i teksten.
- Billeder vedhæftet med Redmines filfeld eller tabt på det indsættes også i teksten.
- Indsæt et billede fra vedhæftelserne (en miniaturevælger) eller et link til en hvilken som helst vedhæftelse.
- Ændring af billede ved at trække dets hjørner.

### Kode
- Kodeblokke med syntaksmarkering i editoren og på gemte sider: 52 sprog, og du kan tilføje mere (se [Syntaksmarkering](#syntaksmarkering)).
- Sproget i en blok vælges fra et badge i hjørnet, med søgning, seneste og hyppige sprog.
- Tab og Shift+Tab indrykker og formindsk linjer inden i en kodeblok; fed, links og farver i kode bevares.

### Blokke
- Kollapsibel blok: en titel med skjult indhold (`<details>`). Lukket på gemte sider, udvidet i editoren.
- Citatblok med forfattar- og datolin.

### Redigering
- `<HTML>`-tilstand til visning og redigering af HTML-kilden: indlejrede blokke er indrykket, en tom linje adskiller de blokke, der fylder flere linjer, syntaksen farves efter de samme regler som i en HTML-kodeblok, og Enter bevarer linjens indrykning.
- Markdown-stilisering: `#` til overskrifter, `-` og `1.` til lister, `[ ]` til opgaver, ```` ```python ```` til en kodeblok (ethvert sproganavn eller ingen), `**bold**`, `---` til en vandret linje. Standard tastaturgenvejer: Ctrl+B, Ctrl+I, Ctrl+U, Ctrl+Z og andre.
- Editoren bliver aldrig højere end vinduet: værktøjslinjen og formularknapperne forbliver synlige, og teksten ruller ind. Højden følger vinduesstørrelse og sidezoom.
- Et ændringsgreb i nederste højre hjørne indstiller højden manuelt. Højden huskes; dobbeltklik går tilbage til automatisk højde.

### Integration med Redmine
- Fungerer i alle Redmine-tekstfelter med formatering: sagsbeskrivelser og noter, wiki-sider, nyheder, forummeddelelser, dokumenter, projektbeskrivelser, lange tekst-brugerdefinerede felter, herunder felter, der vises på siden senere.
- Tekst gemmes som HTML. For at bruge editoren skal du vælge *TipTap HTML* som tekstformatering i Redmines indstillinger.
- Grænsefladen (værktøjstip, menuer, dialoger) følger sproget i brugerens Redmine-profil. 47 af de 50 Redmine-sprog kommer med plugin'et: engelsk og russisk er komplette, de øvrige 45 er kladder lavet med en AI-model, som modersmålstalere gerne må rette. De tre sprog skrevet fra højre til venstre (arabisk, hebraisk, persisk) understøttes bevidst ikke (se [Grænsefladesprog](#grænsefladesprog)).
- Forbliver hurtigt på store tekster: editorer i skjulte formularer oprettes kun, når formularen åbnes, og lange kodeblokke markeres, når de ruller ind i synsfeltet.
- Tekster skrevet i CKEditor (plugin'et redmine_ckeditor) vises, som de var, og åbnes i editoren med deres formatering: ingen konvertering, se [Migration fra CKEditor](#migration-fra-ckeditor).
- Gemte tekster vises uden usikker HTML: scripts, event handlers og `javascript:`-links fjernes, når en side vises, kun det editoren selv producerer bevares. Dette dækker tekster, der kommer gennem REST API eller `<HTML>`-tilstand også.

## Syntaksmarkering

Kodeblokke markeres i editoren og på gemte sider på samme måde. Sproget i en blok vælges fra badgene i dens øverste højre hjørne; listen har en søgeboks og husker for nylig og hyppigt brugte sprog.

52 sprog kommer med plugin'et, herunder HTML, 1C, Cisco IOS, MikroTik RouterOS, Windows cmd, docker compose, Linux service logs og journalctl output.

Du kan tilføje dine egne sprog. Hvert sprog er en fil i mappen `highlight/`. En hvilken som helst af de 190+ highlight.js grammars, eller en tredjepartsgrammatik, konverteres til sådan en fil med en kommando:

```sh
python3 highlight/_convert_grammar.py erlang
sh highlight/_compile.sh
```

Detaljer: [highlight/README/da.md](../highlight/README/da.md).

## Grænsefladesprog

Editoren taler det sprog, der er valgt i brugerens Redmine-profil (Min konto → Sprog). Filer til 47 af de 50 Redmine-sprog kommer med plugin'et i `config/locales/`. Engelsk er kilden, og russisk er forfatterens eget; de øvrige 45 er kladder lavet med hjælp fra en AI-model og endnu ikke blevet gennemset af modersmålstalere, så forvent en ulige sætning her og der. En tekst, der mangler fra en fil, vises på engelsk.

For at rette en oversættelse skal du ændre værdierne i `config/locales/<code>.yml` (`de`, `fr`, `pt-BR`, ...) og genstarte Redmine. `bundle exec rake redmine_tiptap:locales` kontrollerer filerne. Pull requests med rettelser er velkomne.

**Sprogene skrevet fra højre til venstre (arabisk, hebraisk, persisk) understøttes bevidst ikke.** At understøtte dem kræver mange ændringer i kodebasen, ikke kun en oversættelse, og vi valgte ikke at tage det på os. For disse sprog vises editoren på engelsk, og dens layout justeres ikke. Hvis du skal bruge et af dem, skal du lave en fork: oversættelingsmekanismen er klar, og hvad ellers skal ændres er angivet i [config/locales/README.md](../config/locales/README.md#right-to-left-languages).

Detaljer og listen over Redmine-sprog: [config/locales/README.md](../config/locales/README.md).

## Installation

1. Sæt plugin'et ind i Redmines mappe `plugins`. Mappen skal være navngivet `redmine_tiptap`. Den nemmeste måde er git, som også gør opdateringer til en kommando:
   ```sh
   cd /path/to/redmine
   git clone --branch release --single-branch --depth 1 https://github.com/Du10777/redmine_tiptap.git plugins/redmine_tiptap
   ```
   Grenen `release` har kun de filer, plugin'et skal bruge for at køre, uden denne dokumentation, og `--depth 1` udelader repositoriets historik.
2. Genstart Redmine.
3. I Redmines indstillinger (redmine.selfhosted/_settings_) vælg Tekstformatering: *TipTap HTML*.

## Opdatering

Plugin'et har ingen databasemigrationer, og det bygget JavaScript-bundt og stylesheet er en del af arkivet. Opdatering kræver ikke npm eller et build på serveren: udskift plugin-filerne og genstart Redmine.

Før opdatering skal du kontrollere, at den nye version understøtter din Redmine-version (se "Understøttede Redmine-versioner" ovenfor).

### Installeret med git (anbefales)

```sh
cd /path/to/redmine/plugins/redmine_tiptap
git pull
```

Genstart derefter Redmine, for eksempel:

```sh
sudo systemctl restart redmine          # Redmine kørende som en systemd-service
touch /path/to/redmine/tmp/restart.txt  # Passenger
docker compose restart redmine          # Docker
```

For at blive på en bestemt version i stedet for den nyeste skal du hente en commit fra grenen `release` og skifte til den: `git fetch --depth 1 origin <commit> && git checkout <commit>`.

Hvis plugin'et blev installeret med en almindelig `git clone` (grenen `main`, med dokumentationen og hele historikken), så skift til grenen `release` én gang: slet mappen `plugins/redmine_tiptap` og installer plugin'et igen som beskrevet i [Installation](#installation). Plugin'et gemmer intet af sit eget i sin mappe, så intet går tabt; kun sprog til syntaksmarkering, som du selv har tilføjet, skal først kopieres ud af `highlight/`.

### Installeret fra et arkiv

1. Hent arkivet for grenen `release`: https://github.com/Du10777/redmine_tiptap/archive/refs/heads/release.zip. Slet den gamle mappe `plugins/redmine_tiptap` og pak arkivet ud på dens plads; mappen i arkivet hedder `redmine_tiptap-release`, omdøb den til `redmine_tiptap`. Når den slettes først, bliver filer, der er fjernet i den nye version, ikke liggende.
2. Slet `public/assets/.manifest.json` i Redmine-mappen.
3. Genstart Redmine.

Trin 2 betyder noget. Ved opstart genpublicerer Redmine plugin-aktiver kun, hvis deres filer er nyere end dette manifest. Filer pakket ud fra et arkiv beholder deres oprindelige tidsstempler, så uden trin 2 kan Redmine fortsætte med at servere den gamle editor. Manifestet genskabes automatisk ved opstart. Med `git pull` er dette trin ikke nødvendigt: git giver ændrede filer det aktuelle tidsstempel.

### Efter opdatering

- Editorens script og stylesheet serveres med et indholdsfingertryk i deres URL'er, så browsere indlæser den nye version lige efter genstart. Brugere behøver ikke at rydde deres browser-cache.
- Hvis *Cache formatteret tekst* er aktiveret i Redmines indstillinger (Administration → Indstillinger → Generelt), skal du rydde Redmines cache en gang efter opdatering til en version, der ændrer, hvordan tekster vises (HTML-rengøring, support til CKEditor-tekster): `bundle exec rake tmp:cache:clear RAILS_ENV=production` i Redmine-mappen. Ellers kan sider rendereret før opdateringen blive vist fra cachen, urengørde, indtil teksten ændres.
- Tidligere versioner af plugin'et kopierede scriptet til `public/tiptap_bundle.js`. Disse filer bruges ikke længere og kan slettes:
  ```sh
  rm -f /path/to/redmine/public/tiptap_bundle.js /path/to/redmine/public/tiptap_bundle.js.map
  ```

## Migration fra CKEditor

Hvis din Redmine brugte [redmine_ckeditor](https://github.com/a-ono/redmine_ckeditor), kan du skifte til dette plugin og beholde hver tekst, der er skrevet: sager, noter, wiki-sider, nyheder, meddelelser, dokumenter. Intet konverteres, og databasen berøres ikke. CKEditor lagrer sine tekster som HTML, og det gør dette plugin også, så en gemt tekst vises simpelthen af den nye formatter.

1. Installer plugin'et (se ovenfor) og vælg Tekstformatering: *TipTap HTML*.
2. Behold mappen `public/system/rich/` på din Redmine. Hvis folk har indsat billeder og filer med CKEditors billedbrowser, gemmes de der og ikke i databasen eller blandt vedhæftelserne, og teksterne refererer til dem via deres adresse (`/system/rich/...`). **Hvis Redmine flyttes til en anden server eller sættes op på ny, skal du også flytte denne mappe**, sammen med databasen og mappen `files/`: ingen af dem indeholder disse filer, og uden mappen giver billederne i gamle tekster en 404-fejl. Vedhæftelser af sager, wiki-sider og så videre gemmes som før og skal ikke ændres. Billeder, der indsættes i denne editor, er almindelige vedhæftelser. Mappen er stadig nødvendig, også efter at redmine_ckeditor er fjernet.
3. Fjern redmine_ckeditor, når du ikke længere har brug for den.

En gammel tekst vises, som CKEditor viste den: skrifttyper, størrelser, farver og justering, indrykninger, lister, tabeller (grænser, bredder, beskrivelser, fusionerede celler), billeder (størrelse, flyde, grænse, et billede inden for et link), links, kodeblokke med deres sprog (fremhævet), Redmine-makroer (`{{toc}}`, `{{collapse(Title) ... }}`, `{{thumbnail(...)}}` og så videre), wiki- og sagslinks, almindelige webadresser gjort klikbare og indlejret `<iframe>` (video). En tekst skrevet i CKEditor genkender af dens markup og bevarer mellemrummet mellem afsnit, den havde der, som er bredere end i denne editor.

Forskellene med vilje:
- En `<iframe>` vises kun, når den peger på et andet websted over http(s), og den er sandboxed: siden inden i kan køre sine egne scripts, men kan ikke nå siden af Redmine, åbne topvinduet eller sende formularer. Alle andre `<iframe>` fjernes.
- Links åbnes i samme vindue: `target`-attributten for et link (CKEditors "Nyt vindue (_blank)") bevares ikke.
- En vis formatering, som CKEditor tilbyder, men dets sider lydløst faldt er vist her: for eksempel baggrundsfarver på dets "Marker"-stilarter og citationstegnene for `<q>`.
- CKEditors stil »Special Container« (en blok med en grå ramme) vises som en kodeblok uden syntaksmarkering, og i editoren er den også en kodeblok.

En gammel tekst bevarer sin formatering, når den åbnes i editoren og gemmes igen: Redmine-makroer (en makro er et grået element i editoren; rediger det i `<HTML>`-tilstanden, som i CKEditors kildekode-tilstand), `<iframe>`, `<div>`- og `<address>`-blokke med deres stil (en `<div>`, der indsættes fra en webside, bliver stadig til et afsnit), subscript og superscript, CKEditors inline-stilarter (stor, lille, tastatur, prøve og så videre), stilarten for overskrifter, tabeller og tabelceller, størrelse (bredde og højde), flyde, grænse og link af billeder, sproget i kodeblokke. Hvad der ikke overlever redigering: tabellens billedtekst bliver et centreret afsnit over tabellen, tabelheader og footersektioner bliver almindelige rækker (footeren forbliver i bunden), og `<del>` bliver `<s>` (samme udseende). En tekst gemt fra denne editor får denne editors kompakte afsnitsafstand.
