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

> *Den här översättningen gjordes med hjälp av en AI-modell och har inte granskats av en modersmålstalare. Om du hittar ett misstag, öppna gärna ett [ärende eller en pull-begäran](https://github.com/Du10777/redmine_tiptap).*

Det här är en texteditor för Redmine, baserad på TipTap https://github.com/ueberdosis/tiptap

Versioner av Redmine som stöds: **6.\*** och **7.\*** (testad på 6.1.4, 6.1.5 och 7.0.2).

Motorn för redigeraren: **TipTap 3.31.4**. Alla `@tiptap/*`-paket är låsta till exakt denna version i `package.json` och `package-lock.json` och måste alltid uppgraderas tillsammans till en och samma version.

## Funktioner

**Textformatering**
- Fet, kursiv, understruken, genomstruken, nedsänkt och upphöjd text (Ctrl+, och Ctrl+.), infogad kod.
- Textfärg och bakgrundsfärg: en palett med 64 färger eller något valfritt hex-värde.
- Typsnittsfamilj (13 typsnitt) och teckenstorlek (förinställda från 8 till 72 px, eller något värde).
- Styckeformat: rubrik 1–6 och vanlig text.
- Justering (vänster, centrum, höger, motiverad) och indrag (upp till 8 nivåer) av stycken och rubriker.
- Länkar: infoga, redigera, ta bort.
- Horisontell linje, ångra och upprepa.

**Listor**
- Punktlistor med skiva, cirkel eller fyrkant markörer.
- Numrerade listor: 1, 01, a, A, i, I, α.
- Uppgiftslistor med kryssrutor; slutförda uppgifter är genomstrukna.
- Kapslade listor (Tab / Skift+Tab).

**Tabeller**
- Infoga en tabell av valfri storlek, med eller utan en rubrikrad.
- Högerklicksmeny i en cell: lägg till och ta bort rader och kolumner, slå samman och dela celler, rubrikrad och rubrikkolumn, ta bort tabellen.
- Kolumnbredder ändras genom att dra cellgränser.
- Inklistring från Excel behåller kolumnbredder, justering och teckenstorlekar; en tabell kopierad från Redmine klistras in i Excel med gränser.

**Bilder och bifogade filer**
- Klistra in en bild från urklipp: den laddas upp som en bifogad fil och visas i texten.
- Bilder bifogade med Redmines filfield, eller släppade på den, infogas även i texten.
- Infoga en bild från bifogade filer (en miniatyrväljar) eller en länk till någon bifogad fil.
- Ändra storlek på en bild genom att dra dess hörn.

**Kod**
- Kodblock med syntaxmarkering i redigeraren och på sparade sidor: 52 språk, och du kan lägga till fler (se [Syntaxmarkering](#syntaxmarkering)).
- Språket i ett block väljs från en märke i dess hörn, med sökning, senaste och ofta använda språk.
- Tab och Skift+Tab drar in och drar ut rader inuti ett kodblock; fet, länkar och färger inuti kod bevaras.

**Block**
- Sammanfällbart block: en titel med dolt innehål (`<details>`). Sammanfallt på sparade sidor, utökat i redigeraren.
- Citatlblock med en författar- och datumrad.

**Redigering**
- `<HTML>`-läge för att visa och redigera HTML-källan: kapslade block dras in, block som upptar flera rader skiljs åt av en tom rad, syntaxen färgläggs enligt samma regler som i ett HTML-kodblock, och Enter behåller radens indrag.
- Markdown-inspirerad skrivning: `#` för rubriker, `-` och `1.` för listor, `[ ]` för uppgifter, ```` ```python ```` för ett kodblock (ett språknamn eller inget), `**bold**`, `---` för en horisontell linje. Standardtangentbordets genvägar: Ctrl+B, Ctrl+I, Ctrl+U, Ctrl+Z och andra.
- Redigeraren blir aldrig högre än fönstret: verktygsfältet och formulärknapparna förblir synliga, och texten rullas inuti. Höjden följer fönsterstorleken och sidans zoomning.
- En storleksförändringsgreppad i det nedre högra hörnet ställer in höjden för hand. Höjden är ihågkommen; dubbelklick återgår till automatisk höjd.

**Redmine-integration**
- Fungerar i alla Redminetextfält med formatering: ärendebeskrivningar och anteckningar, wikisidor, nyheter, forummeddelanden, dokument, projektbeskrivningar, långa textkustomfält, inklusive fält som visas på sidan senare.
- Text lagras som HTML. För att använda redigeraren, välj *TipTap HTML* som textformatering i Redmine-inställningarna.
- Gränssnittet (tips, menyer, dialogrutor) följer språket i användarens Redmine-profil. 47 av Redmines 50 språk levereras med plugin: engelska och ryska är fullständiga, de andra 45 är utkast gjorda med en AI-modell som modersmålstalare är välkomna att korrigera. De tre språken skrivna från höger till vänster (arabiska, hebreiska, persiska) stöds avsiktligt inte (se [Gränssnittsspråk](#gränssnittsspråk)).
- Förblir snabb på stora texter: redigerare i dolda formulär skapas endast när formuläret öppnas, och långa kodblock markeras när de rullas in i vy.
- Texter skrivna i CKEditor (plugin-modulen redmine_ckeditor) visas på det sätt de var och öppnas i redigeraren med sin formatering: ingen konvertering, se [Migration från CKEditor](#migration-från-ckeditor).
- Sparade texter visas utan osäker HTML: skript, händelsehanterare och `javascript:`-länkar tas bort när en sida visas, endast det som redigeraren själv producerar bevaras. Detta täcker även texter som kommer genom REST API eller `<HTML>`-läget.

## Syntaxmarkering

Kodblock är markerade i redigeraren och på sparade sidor på samma sätt. Språket i ett block plockas från märkena i dess övre högra hörn; listan har en sökruta och kommer ihåg nyligen och ofta använda språk.

52 språk levereras med plugin, bland dem HTML, 1C, Cisco IOS, MikroTik RouterOS, Windows cmd, docker compose, Linux-tjänstloggar och journalctl-utdata.

Du kan lägga till dina egna språk. Varje språk är en fil i mappen `highlight/`. Vilken som helst av de 190+ highlight.js-grammatiker, eller en från tredje part, konverteras till sådan fil med ett kommando:

```sh
python3 highlight/_convert_grammar.py erlang
sh highlight/_compile.sh
```

Detaljer: [highlight/README/sv.md](../highlight/README/sv.md).

## Gränssnittsspråk

Redigeraren talar det språk som valts i användarens Redmine-profil (Mitt konto → Språk). Filer för 47 av Redmines 50 språk levereras med plugin, i `config/locales/`. Engelska är källan och ryska är författarens egen; de andra 45 är utkast gjorda med hjälp av en AI-modell och ännu inte granskade av modersmålstalare, så förvänta dig en skev fras här och där. En text som saknas från en fil visas på engelska.

För att korrigera en översättning, ändra dess värden i `config/locales/<code>.yml` (`de`, `fr`, `pt-BR`, ...) och starta om Redmine. `bundle exec rake redmine_tiptap:locales` kontrollerar filerna. Pull-begäranden med korrigeringar är välkomna.

**Språken skrivna från höger till vänster (arabiska, hebreiska, persiska) stöds avsiktligt inte.** Att stödja dem kräver många ändringar i kodbasen, inte bara en översättning, och vi valde att inte ta tag i det. För dessa språk visas redigeraren på engelska och dess layout justeras inte. Om du behöver något av dem, gör en fork: översätningsmekanism är klar, och vad annat som måste ändras listas i [config/locales/README.md](../config/locales/README.md#right-to-left-languages).

Detaljer och listan över Redmine-språk: [config/locales/README.md](../config/locales/README.md).

## Installation

1. Lägg plugin-modulen i Redmines `plugins`-mapp. Mappen måste heta `redmine_tiptap`. Det enklaste sättet är git, som också gör uppdateringar till ett kommando:
   ```sh
   cd /path/to/redmine
   git clone https://github.com/Du10777/redmine_tiptap.git plugins/redmine_tiptap
   ```
2. Starta om Redmine.
3. I Redmine-inställningarna (redmine.selfhosted/_settings_) väljer du Textformatering: *TipTap HTML*.

## Uppdatering

Plugin-modulen har ingen databasmigrering, och den skapade JavaScript-paketet och stilmallen är del av arkivet. Uppdatering kräver varken npm eller en skapande på servern: byt plugin-filer och starta om Redmine.

Innan uppdatering, kontrollera att den nya versionen stödjer din Redmine-version (se "Versioner av Redmine som stöds" ovan).

### Installerat med git (rekommenderas)

```sh
cd /path/to/redmine/plugins/redmine_tiptap
git pull
```

Starta sedan om Redmine, till exempel:

```sh
sudo systemctl restart redmine          # Redmine som en systemd-tjänst
touch /path/to/redmine/tmp/restart.txt  # Passenger
docker compose restart redmine          # Docker
```

För att stanna på en särskild version istället för det senaste skicka: `git fetch && git checkout <tag-or-commit>`.

### Installerat från ett arkiv

1. Ta bort den gamla `plugins/redmine_tiptap`-mappen och packa upp den nya versionen på dess plats. Att ta bort först ser till att filer som tagits bort i den nya versionen inte ligger kvar.
2. Ta bort `public/assets/.manifest.json` i Redmine-mappen.
3. Starta om Redmine.

Steg 2 är viktigt. Vid uppstart publicerar Redmine endast plugin-tillgångar om deras filer är nyare än detta manifest. Filer utpakade från ett arkiv behåller sina ursprungliga tidsstämplar, så utan steg 2 kan Redmine fortsätta att tjäna den gamla redigeraren. Manifestet återskapas automatiskt vid uppstart. Med `git pull` behövs inte detta steg: git ger ändrade filer aktuell tid.

### Efter uppdatering

- Redigerarens skript och stilmall serveras med ett innehålls fingeravtryck i deras URL:er, så webbläsare laddar den nya versionen direkt efter omstarten. Användare behöver inte rensa sin webbläsarens cache.
- Om *Förladda formaterad text* är aktiverat i Redmine-inställningarna (Administration → Inställningar → Allmänt), rensa Redmines cache en gång efter uppdatering till en version som ändrar hur texter visas (HTML-rengöring, stöd för CKEditor-texter): `bundle exec rake tmp:cache:clear RAILS_ENV=production` i Redmine-mappen. Annars kan sidor som återgavs före uppdateringen visas från cacheminnet, orenoverade, tills deras text ändras.
- Tidigare versioner av plugin-modulen kopierade skriptet till `public/tiptap_bundle.js`. Dessa filer används inte längre och kan tas bort:
  ```sh
  rm -f /path/to/redmine/public/tiptap_bundle.js /path/to/redmine/public/tiptap_bundle.js.map
  ```

## Migration från CKEditor

Om din Redmine använde [redmine_ckeditor](https://github.com/a-ono/redmine_ckeditor), kan du byta till denna plugin och behålla all text som har skrivits: ärenden, anteckningar, wikisidor, nyheter, meddelanden, dokument. Ingenting konverteras och databasen rör inte. CKEditor lagrar sin text som HTML och det gör denna plugin också, så en lagrad text visas helt enkelt av den nya formateringen.

1. Installera plugin-modulen (se ovan) och välj Textformatering: *TipTap HTML*.
2. Behåll mappen `public/system/rich/` i din Redmine. Om bilder och filer har infogats med CKEditors bildbläddrare lagras de där, inte i databasen och inte bland de bifogade filerna, och texterna refererar till dem per adress (`/system/rich/...`). **Om Redmine flyttas till en annan server eller sätts upp på nytt, flytta även denna mapp**, tillsammans med databasen och mappen `files/`: ingen av dem innehåller dessa filer, och utan mappen ger bilderna i gamla texter ett 404-fel. Bifogade filer för ärenden, wikisidor och så vidare lagras som tidigare och behöver ingenting. Bilder som infogas i denna redigerare är vanliga bifogade filer. Mappen behövs fortfarande efter att redmine_ckeditor har tagits bort.
3. Ta bort redmine_ckeditor när du inte längre behöver det.

En gammal text visas på det sätt CKEditor visade den: typsnitt, storlekar, färger och justering, indrag, listor, tabeller (gränser, bredder, bildtexter, sammanslagna celler), bilder (storlek, float, gräns, en bild inuti en länk), länkar, kodblock med sitt språk (markerat), Redmine-makron (`{{toc}}`, `{{collapse(Title) ... }}`, `{{thumbnail(...)}}` och så vidare), wiki- och ärendenlänkar, vanliga webbadresser gjorda klickbara, och inbäddad `<iframe>` (video). En text skriven i CKEditor känns igen av dess märkning och behåller avståndet mellan stycken det hade där, vilket är större än i denna redigerare.

Skillnader med avsikt:
- En `<iframe>` visas endast när den pekar på en annan webbplats över http(s), och den är sandlåda: sidan inuti kan köra sina egna skript, men kan inte nå Redmine-sidan, öppna topfönstret eller skicka formulär. Alla andra `<iframe>` tas bort.
- Liens öppnas i samma fönster: länkens `target`-attribut (CKEditors "Nytt fönster (_blank)") bevaras inte.
- Viss formatering som CKEditor erbjöd men dess sidor tyst tappade visas här: till exempel bakgrundsfärgerna för dess "Markör"-stilar och citattecknen för `<q>`.
- CKEditors stil ”Special Container” (ett block med grå ram) visas som ett kodblock utan syntaxmarkering, och i redigeraren är det också ett kodblock.

En gammal text behåller sin formatering när den öppnas i redigeraren och sparas igen: Redmine-makron (ett makro är ett grått element i redigeraren; redigera det i `<HTML>`-läget, som i CKEditors källäge), `<iframe>`, `<div>`- och `<address>`-block med sin stil (en `<div>` som klistras in från en webbsida omvandlas fortfarande till ett stycke), nedsänkt och upphöjt, CKEditors infogade stilar (stor, liten, tangentbord, prov och så vidare), stilsättningen av rubriker, tabeller och tabellceller, storleken (bredd och höjd), float, gräns och länk för bilder, språket för kodblock. Vad som inte överlever redigering: bildtexten för en tabell blir ett centrerat stycke ovanför den, rubrik- och sidfotssektionerna i en tabell blir vanliga rader (sidfoten förblir längst ned) och `<del>` blir `<s>` (samma utseende). En text sparad från denna redigerare får det kompakta styckeavståndet från denna redigerare.
