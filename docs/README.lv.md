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

> *Šis tulkojums ir izveidots ar mākslīgā intelekta modeļa palīdzību, un to nav pārbaudījis dzimtās valodas runātājs. Ja atrodat kļūdu, lūdzu, [atveriet issue vai pull request](https://github.com/Du10777/redmine_tiptap).*

Šis ir Redmine teksta redaktors, kas balstīts uz TipTap https://github.com/ueberdosis/tiptap

Atbalstītās Redmine versijas:

| Redmine | Atbalstīta | Testēts versijās |
|---|---|---|
| 7.x | jā | 7.0.2 |
| 6.x | jā | 6.1.4, 6.1.5 |
| 5.x un vecākas | nē | — |

Jauna galvenā versija (8.x un jaunākas) tiek atbalstīta tikai pēc tam, kad spraudnis tajā ir pārbaudīts. Līdz tam šīs versijas Redmine ar instalētu spraudni nestartē: tas apstājas ar kļūdu, kurā nosauktas atbalstītās versijas.

Redaktora dzinējs: **TipTap 3.31.4**. Visas `@tiptap/*` pakotnes failos `package.json` un `package-lock.json` ir piesaistītas tieši šai versijai, un tās vienmēr jājaunina kopā — līdz vienai un tai pašai versijai.

## Iespējas

**Teksta formatēšana**
- Treknraksts, slīpraksts, pasvītrojums, pārsvītrojums, apakšraksts un augšraksts (Ctrl+, un Ctrl+.), iekļautais kods.
- Teksta krāsa un fona krāsa: 64 krāsu palete vai jebkura hex vērtība.
- Fonts (13 fonti) un fonta lielums (gatavie lielumi no 8 līdz 72 px vai jebkura vērtība).
- Rindkopu stili: virsraksti 1–6 un parasts teksts.
- Rindkopu un virsrakstu līdzināšana (pa kreisi, centrēti, pa labi, abpusēji) un atkāpes (līdz 8 līmeņiem).
- Saites: ievietošana, rediģēšana, noņemšana.
- Horizontāla līnija, darbību atsaukšana un atkārtošana.

**Saraksti**
- Aizzīmju saraksti ar aizpildītu apļu, tukšu apļu vai kvadrātu aizzīmēm.
- Numurētie saraksti: 1, 01, a, A, i, I, α.
- Uzdevumu saraksti ar izvēles rūtiņām; izpildītie uzdevumi tiek pārsvītroti.
- Ligzdoti saraksti (Tab / Shift+Tab).

**Tabulas**
- Jebkura izmēra tabulas ievietošana ar galvenes rindu vai bez tās.
- Izvēlne šūnā ar peles labo pogu: rindu un kolonnu pievienošana un dzēšana, šūnu apvienošana un sadalīšana, galvenes rinda un galvenes kolonna, tabulas dzēšana.
- Kolonnu platumu maina, velkot šūnu apmales.
- Ielīmējot no Excel, saglabājas kolonnu platumi, līdzinājums un fontu izmēri; no Redmine nokopēta tabula tiek ielīmēta Excel ar apmalēm.

**Attēli un pielikumi**
- Attēla ielīmēšana no starpliktuves: tas tiek augšupielādēts kā pielikums un parādās tekstā.
- Attēli, kas pievienoti ar Redmine pielikumu lauku vai nomesti uz tā, arī tiek ievietoti tekstā.
- Attēla ievietošana no pielikumiem (sīktēlu izvēle) vai saites uz jebkuru pielikumu.
- Attēla izmēru maina, velkot tā stūrus.

**Kods**
- Koda bloki ar sintakses izcelšanu redaktorā un saglabātajās lapās: 52 valodas, un var pievienot vēl (skatiet [Sintakses izcelšana](#sintakses-izcelšana)).
- Bloka valodu izvēlas no nozīmītes tā stūrī; ir meklēšana, nesen un bieži lietotās valodas.
- Tab un Shift+Tab koda blokā palielina un samazina rindu atkāpi; treknraksts, saites un krāsas kodā tiek saglabātas.

**Bloki**
- Sakļaujams bloks: virsraksts ar slēptu saturu (`<details>`). Saglabātajās lapās ir sakļauts, redaktorā — izvērsts.
- Citāta bloks ar autora un datuma rindu.

**Rediģēšana**
- `<HTML>` režīms HTML pirmkoda skatīšanai un rediģēšanai: ligzdotie bloki tiek attēloti ar atkāpēm; bloki, kas aizņem vairākas rindas, tiek atdalīti ar tukšu rindu; sintakse tiek iekrāsota pēc tiem pašiem noteikumiem kā HTML koda blokā; Enter saglabā rindas atkāpi.
- Rakstīšana Markdown stilā: `#` virsrakstiem, `-` un `1.` sarakstiem, `[ ]` uzdevumiem, ```` ```python ```` koda blokam (jebkurš valodas nosaukums vai bez tā), `**bold**`, `---` horizontālai līnijai. Standarta īsinājumtaustiņi: Ctrl+B, Ctrl+I, Ctrl+U, Ctrl+Z un citi.
- Redaktors nekad nekļūst augstāks par logu: rīkjosla un veidlapas pogas paliek redzamas, bet teksts ritinās iekšpusē. Augstums pielāgojas loga izmēram un lapas tālummaiņai.
- Izmēra maiņas rokturis apakšējā labajā stūrī ļauj iestatīt augstumu ar roku. Augstums tiek atcerēts; dubultklikšķis atjauno automātisko augstumu.

**Integrācija ar Redmine**
- Darbojas visos Redmine teksta laukos, kas atbalsta formatēšanu: uzdevumu aprakstos un piezīmēs, viki lapās, ziņās, foruma ziņojumos, dokumentos, projektu aprakstos, garā teksta pielāgojamajos laukos, tostarp laukos, kas lapā parādās vēlāk.
- Teksts tiek glabāts kā HTML. Lai izmantotu redaktoru, Redmine iestatījumos kā teksta formatēšanu izvēlieties *TipTap HTML*.
- Saskarne (ekrānpadomi, izvēlnes, dialoglodziņi) seko valodai lietotāja Redmine profilā. Kopā ar spraudni tiek piegādātas 47 no Redmine 50 valodām: angļu un krievu valodas ir pilnīgas, pārējās 45 ir melnraksti, kas izveidoti ar mākslīgā intelekta modeli un ko dzimtās valodas runātāji ir laipni aicināti labot. Trīs valodas, kuras raksta no labās uz kreiso pusi (arābu, ivrits, persiešu), apzināti netiek atbalstītas (skatiet [Saskarnes valoda](#saskarnes-valoda)).
- Darbojas ātri arī ar lieliem tekstiem: redaktori slēptās veidlapās tiek izveidoti tikai tad, kad veidlapa tiek atvērta, bet gari koda bloki tiek izcelti, kad ritināšanas laikā nonāk redzamajā apgabalā.
- Ar CKEditor (spraudni redmine_ckeditor) uzrakstītie teksti tiek rādīti tādi, kādi tie bija, un redaktorā atveras ar saviem formatējumiem: bez pārveidošanas, skatiet [Migrēšana no CKEditor](#migrēšana-no-ckeditor).
- Saglabātie teksti tiek rādīti bez nedrošā HTML: skripti, notikumu apstrādātāji un `javascript:` saites tiek noņemti, kad lapa tiek attēlota, un paliek tikai tas, ko rada pats redaktors. Tas attiecas arī uz tekstiem, kas nonāk caur REST API vai `<HTML>` režīmu.

## Sintakses izcelšana

Koda bloki tiek izcelti vienādi gan redaktorā, gan saglabātajās lapās. Bloka valodu izvēlas no nozīmītes tā augšējā labajā stūrī; sarakstā ir meklēšanas lodziņš, un tas atceras nesen un bieži lietotās valodas.

Kopā ar spraudni tiek piegādātas 52 valodas, to vidū HTML, 1C, Cisco IOS, MikroTik RouterOS, Windows cmd, docker compose, Linux pakalpojumu žurnāli un journalctl izvade.

Varat pievienot savas valodas. Katra valoda ir viens fails mapē `highlight/`. Jebkuru no 190+ highlight.js gramatikām vai trešās puses gramatiku ar vienu komandu var pārveidot par šādu failu:

```sh
python3 highlight/_convert_grammar.py erlang
sh highlight/_compile.sh
```

Sīkāk: [highlight/README/lv.md](../highlight/README/lv.md).

## Saskarnes valoda

Redaktors tiek rādīts valodā, kas izvēlēta lietotāja Redmine profilā (Mans konts → Valoda). Kopā ar spraudni tiek piegādāti faili 47 no 50 Redmine valodām mapē `config/locales/`. Angļu valoda ir avots, bet krievu valodas tulkojums ir paša autora; pārējie 45 ir melnraksti, kas izveidoti ar mākslīgā intelekta modeļa palīdzību un vēl nav pārbaudīti dzimtās valodas runātājiem, tāpēc vietumis var gadīties dīvaina frāze. Teksts, kura failā nav, tiek rādīts angliski.

Lai labotu tulkojumu, mainiet tā vērtības failā `config/locales/<code>.yml` (`de`, `fr`, `pt-BR`, ...) un pārstartējiet Redmine. Failus pārbauda komanda `bundle exec rake redmine_tiptap:locales`. Laipni gaidīti labojumi pull request veidā.

**Valodas, kuras raksta no labās uz kreiso pusi (arābu, ivrits, persiešu), apzināti netiek atbalstītas.** To atbalstam koda bāzē jāveic daudz izmaiņu, ne tikai jāpārtulko, un mēs nolēmām to neuzņemties. Šīm valodām redaktors tiek rādīts angliski, un tā izkārtojums netiek pielāgots. Ja jums vajadzīga kāda no tām, izveidojiet fork: tulkošanas mehānisms ir gatavs, bet tas, kas vēl jāmaina, ir uzskaitīts [config/locales/README.md](../config/locales/README.md#right-to-left-languages).

Sīkāka informācija un Redmine valodu saraksts: [config/locales/README.md](../config/locales/README.md).

## Instalēšana

1. Ievietojiet spraudni Redmine mapē `plugins`. Mapei jābūt nosauktai `redmine_tiptap`. Vienkāršākais veids ir git, ar kuru arī atjaunināšana ir tikai viena komanda:
   ```sh
   cd /path/to/redmine
   git clone https://github.com/Du10777/redmine_tiptap.git plugins/redmine_tiptap
   ```
2. Pārstartējiet Redmine.
3. Redmine iestatījumos (redmine.selfhosted/_settings_) kā Teksta formatēšanu izvēlieties *TipTap HTML*.

## Atjaunināšana

Spraudnim nav datubāzes migrāciju, un uzbūvētais JavaScript bundle un stilu lapa ir repozitorija daļa. Atjaunināšanai uz servera nav vajadzīgs ne npm, ne būvēšana: nomainiet spraudņa failus un pārstartējiet Redmine.

Pirms atjaunināšanas pārbaudiet, vai jaunā versija atbalsta jūsu Redmine versiju (skatiet iepriekš „Atbalstītās Redmine versijas“).

### Instalēts ar git (ieteicams)

```sh
cd /path/to/redmine/plugins/redmine_tiptap
git pull
```

Pēc tam pārstartējiet Redmine, piemēram:

```sh
sudo systemctl restart redmine          # Redmine kā systemd pakalpojums
touch /path/to/redmine/tmp/restart.txt  # Passenger
docker compose restart redmine          # Docker
```

Lai paliktu pie noteiktas versijas, nevis jaunākā commit: `git fetch && git checkout <tag-or-commit>`.

### Instalēts no arhīva

1. Izdzēsiet veco mapi `plugins/redmine_tiptap` un tās vietā izpakojiet jauno versiju. Vispirms izdzēšot, tiek nodrošināts, ka faili, kas jaunajā versijā ir noņemti, nepaliek.
2. Izdzēsiet `public/assets/.manifest.json` Redmine mapē.
3. Pārstartējiet Redmine.

Otrais solis ir svarīgs. Startējot Redmine no jauna publicē spraudņu resursus tikai tad, ja to faili ir jaunāki par šo manifestu. No arhīva izpakotie faili saglabā savus sākotnējos laika zīmogus, tāpēc bez otrā soļa Redmine var turpināt piegādāt veco redaktoru. Manifests tiek izveidots no jauna automātiski startēšanas laikā. Ar `git pull` šis solis nav vajadzīgs: git mainītajiem failiem piešķir pašreizējo laiku.

### Pēc atjaunināšanas

- Redaktora skripts un stilu lapa tiek piegādāti ar satura pirkstu nospiedumu savās URL, tāpēc pārlūkprogrammas jauno versiju ielādē uzreiz pēc pārstartēšanas. Lietotājiem nav jātīra pārlūkprogrammas kešatmiņa.
- Ja Redmine iestatījumos (Administrācija → Iestatījumi → Galvenais) ir ieslēgta opcija *Kešot formatētu tekstu*, pēc atjaunināšanas uz versiju, kas maina teksta attēlošanu (HTML attīrīšana, CKEditor tekstu atbalsts), vienreiz iztīriet Redmine kešatmiņu: `bundle exec rake tmp:cache:clear RAILS_ENV=production` Redmine mapē. Pretējā gadījumā pirms atjaunināšanas atveidotās lapas var tikt rādītas no kešatmiņas neattīrītas, līdz mainās to teksts.
- Spraudņa iepriekšējās versijas kopēja skriptu uz `public/tiptap_bundle.js`. Šie faili vairs netiek izmantoti, un tos var izdzēst:
  ```sh
  rm -f /path/to/redmine/public/tiptap_bundle.js /path/to/redmine/public/tiptap_bundle.js.map
  ```

## Migrēšana no CKEditor

Ja jūsu Redmine izmantoja [redmine_ckeditor](https://github.com/a-ono/redmine_ckeditor), varat pāriet uz šo spraudni un saglabāt visus jau uzrakstītos tekstus: uzdevumus, piezīmes, viki lapas, ziņas, ziņojumus, dokumentus. Nekas netiek pārveidots, un datubāze netiek aiztikta. CKEditor glabā savus tekstus kā HTML, un tāpat dara arī šis spraudnis, tāpēc saglabāto tekstu jaunais formatētājs vienkārši attēlo.

1. Instalējiet spraudni (skatiet iepriekš) un kā Teksta formatēšanu izvēlieties *TipTap HTML*.
2. Saglabājiet sava Redmine mapi `public/system/rich/`. Ja cilvēki ar CKEditor attēlu pārlūku ir ievietojuši attēlus un failus, tie tiek glabāti tur, nevis datubāzē vai pielikumos, un teksti uz tiem atsaucas pēc adreses (`/system/rich/...`). **Ja pārceļat Redmine uz citu serveri vai instalējat to no jauna, pārnesiet līdzi arī šo mapi**, kopā ar datubāzi un mapi `files/`: nevienā no tām šo failu nav, un bez šīs mapes attēli vecajos tekstos atgriež kļūdu 404. Uzdevumu, viki lapu un citu objektu pielikumi tiek glabāti kā iepriekš, un tiem nekas nav jādara. Ar šo redaktoru ievietotie attēli ir parastie pielikumi. Mape ir vajadzīga arī pēc redmine_ckeditor noņemšanas.
3. Noņemiet redmine_ckeditor, kad tas vairs nav vajadzīgs.

Vecs teksts tiek rādīts tā, kā to rādīja CKEditor: fonti, izmēri, krāsas un līdzinājums, atkāpes, saraksti, tabulas (apmales, platumi, paraksti, apvienotās šūnas), attēli (izmērs, teksta aplaušana, apmale, attēls saitē), saites, koda bloki ar to valodu (izcelti), Redmine makro (`{{toc}}`, `{{collapse(Title) ... }}`, `{{thumbnail(...)}}` un tā tālāk), viki un uzdevumu saites, vienkāršas tīmekļa adreses, kas padarītas par klikšķināmām, un iegulti `<iframe>` (video). Ar CKEditor uzrakstīts teksts tiek atpazīts pēc tā marķējuma un saglabā tur bijušo atstarpi starp rindkopām, kas ir platāka nekā šajā redaktorā.

Apzināti ieviestās atšķirības:
- `<iframe>` tiek rādīts tikai tad, ja tas norāda uz citu vietni, izmantojot http(s), un tas darbojas smilškastē: iekšpusē esošā lapa var izpildīt savus skriptus, bet nevar piekļūt Redmine lapai, atvērt augšējo logu vai iesniegt veidlapas. Visi pārējie `<iframe>` tiek noņemti.
- Saites tiek atvērtas tajā pašā logā: saites atribūts `target` (CKEditor „Jauns logs (_blank)“) netiek saglabāts.
- Daļa formatējuma, ko CKEditor piedāvāja, bet ko tā lapas klusējot zaudēja, šeit tiek rādīta: piemēram, tā stilu „Marķieris“ fona krāsas un `<q>` pēdiņas.
- CKEditor stils „Special Container“ (bloks ar pelēku rāmi) tiek rādīts kā koda bloks bez sintakses izcelšanas, un redaktorā tas arī ir koda bloks.

Vecs teksts saglabā savu formatējumu, kad to atver redaktorā un saglabā vēlreiz: Redmine makro (makro redaktorā ir viens pelēks elements; to rediģē `<HTML>` režīmā, tāpat kā CKEditor pirmkoda režīmā), `<iframe>`, `<div>` un `<address>` bloki ar savu stilu (`<div>`, kas ielīmēts no tīmekļa lapas, joprojām tiek pārveidots par rindkopu), apakšraksts un augšraksts, CKEditor rindas stili (liels, mazs, tastatūra, paraugs un tā tālāk), virsrakstu, tabulu un tabulas šūnu stils, attēlu izmērs (platums un augstums), teksta aplaušana, apmale un saite, koda bloku valoda. Kas rediģējot nesaglabājas: tabulas paraksts kļūst par centrētu rindkopu virs tabulas, tabulas galvenes un kājenes sadaļas kļūst par parastām rindām (kājene paliek apakšā), un `<del>` kļūst par `<s>` (izskats tāds pats). Ar šo redaktoru saglabātam tekstam tiek piemērota šī redaktora kompaktā atstarpe starp rindkopām.
