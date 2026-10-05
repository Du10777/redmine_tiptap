# Isticanje sintakse: jezici

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

> *Ovaj prijevod je napravljen uz pomoć AI modela i nije provjeren od strane izvornog govornika. Ako nađete grešku, molim vas [otvorite pitanje ili pull request](https://github.com/Du10777/redmine_tiptap).*

Blokovi koda se isticanjem obrađuju i u editoru i na spremljenim stranicama (tiketi, komentari, wiki), i izgledaju isto na oba mjesta. Jezik bloka se bira iz znaka u njegovom gornjem desnom uglu. Lista jezika se definiše datotekama u `highlight/` fascikli: jedna datoteka je jedan jezik.

Plugin dolazi sa 52 jezika. Možete dodati više: pretvorite gotovu highlight.js gramatiku sa skriptom (vidite [Dodavanje jezika iz highlight.js](#dodavanje-jezika-iz-highlightjs)) ili napišite svoju.

## Kako radi

- Isticanje sintakse radi [highlight.js](https://highlightjs.org) (kroz [lowlight](https://github.com/wooorm/lowlight)). Editor i spravljene stranice koriste isti engine, tako da se boje poklapaju.
- `_compile.sh` paketira sve datoteke jezika u jednu datoteku, `assets/javascripts/tiptap_highlight.js`. Ova datoteka je već u repozitorijumu ugrađena, tako da instalacija plugina ne trebava gradnje. Trebate je graditi samo kada promijenite skup jezika.
- Redmine učitava `tiptap_highlight.js` na svakoj stranici, prije editora (`tiptap_bundle.js`). Pri učitavanju editor registrira sve jezike iz te datoteke.
- U editoru se blok ponovo isticanjem obradi 50 ms nakon što zastanete sa pisanjem, i samo blok koji se promijenjio. Na spremljenim stranicama se blok isticanjem obradi kada se pojavi u vidnom polju. Blok unutar skupljenog odjeljka se isticanjem obradi kada se odjeljak otvori.
- Jezik se pohranjuje u spremljeni HTML: `<pre><code class="language-<id>">`. To je zašto `id` jezika nikada ne smije biti promijenjen: blokovi spremljeni sa starim `id` bi se pretvorili u običan tekst.
- Nema automatske detekcije jezika: blok bez jezika se pokazuje kao običan tekst. Tako je i blok čiji jezik nije u `highlight/` (na primjer, datoteka jezika je obrisana); njegov znak nastavlja prikazivati `id`. Ako datoteka jezika vrati, boje se vraćaju.
- Boje. highlight.js označi tekst sa klasama kao što su `hljs-keyword`, `hljs-string`, `hljs-comment`. Njihove boje se postavljaju u `assets/stylesheets/src/06_code.css`, koristeći paletu Redmine-ovog sopstvenog isticanja sintakse.

## Datoteka jezika

Na primjer, `routeros.js`:

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

| Polje | Obavezno | Šta je |
|---|---|---|
| `id` | da | Naziv jezika u spremljenom HTML-u (`class="language-<id>"`). Dozvoljeni znakovi: `a-z`, `0-9`, `-`, `_`. **Nikada ga ne mjenjajte** kada su blokovi sa ovim jezikom spremljeni. |
| `label` | ne | Naziv u listi jezika i na znaku bloka. Defaulta na `id`. |
| `hint` | ne | Siva bilješka pored naziva u listi. |
| `keywords` | ne | Dodatne riječi za pretraživanje liste, odvojene razmakom. |
| `grammar` | da | highlight.js gramatika: funkcija `(hljs) => language definition`. |

`label`, `hint` i `keywords` su na engleskom. Da prikazujete jezik pod drugim imenom u jeziku interfejsa korisnika, ili da ga učinite pronađivim riječima tog jezika, dodajte stavku u datoteku prijevoda tog jezika, `config/locales/<code>.yml`, pod `code_languages:`. Riječi tamo se dodaju `keywords`; `label` i `hint` zamjenjuju one iz datoteke jezika. `config/locales/ru.yml` ima primjere, pravila su u [config/locales/README.md](../../config/locales/README.md).

Vrste datoteka u fascikli:

- **Kratka.** Referenca na gramatiku iz highlight.js npm paketa, kao u primjeru gore; većina jezika je takva. Gramatika dolazi iz highlight.js verzije zabilježene u `package-lock.json` plugina.
- **Puna kopija.** Kod gramatike je u datoteci i može biti urešen. Ove datoteke kreira skript konverzije (vidite ispod).
- **Sopstvena gramatika.** `log.js`, `journalctl.js`, `cisco-ios.js`; njihovi dijeljeni dijelovi su u `_common.js`.
- **Omotač.** Gotova gramatika pod drugim imenom: `cmd.js` je `dos` iz highlight.js, `docker-compose.js` je `yaml`.

Datoteke i fascikle čija imena počinju sa `_` nisu jezici:

- `_compile.sh` gradi jezike;
- `_check.mjs` provjerava jezike tijekom gradnje;
- `_common.js` sadrži dijeljene dijelove plugina-ovih sopstvenih gramatika;
- `_convert_grammar.py` je skript koji pretvara highlight.js gramatike (vidite ispod);
- `_vendor/` sadrži datoteke koje konvertovane gramatike uvozile (kreirane od strane skripte konverzije).

Fascikla `README/` sadrži ovu dokumentaciju.

## Dodavanje jezika iz highlight.js

Gotove gramatike (više od 190) su ovdje: https://github.com/highlightjs/highlight.js/tree/main/src/languages. Njihova imena i aliasa su navedeni u [SUPPORTED_LANGUAGES.md](https://github.com/highlightjs/highlight.js/blob/main/SUPPORTED_LANGUAGES.md), zajedno sa stotinu trećestranačkih gramatika čuvanih u odvojenim repozitorijumima. Skript `_convert_grammar.py` u ovoj fascikli pretvara bilo koju od njih u format plugina.

Skript trebava Python 3.6+ (bez ekstra paketa) i pristup github.com. Pokrenite ga iz fascikle plugina:

```sh
cd /path/to/redmine/plugins/redmine_tiptap
python3 highlight/_convert_grammar.py erlang
sh highlight/_compile.sh
```

Argument `erlang` je naziv datoteke u `src/languages` bez `.js`. Druga naredba gradi jezike i provjerava ih. Zatim restartujte Redmine (vidite [Gradnja i primjena](#gradnja-i-primjena)). Na Windows koristite `py` ili `python` umjesto `python3`.

Primjeri:

```sh
# lista highlight.js jezika (* = već u highlight/), opciono filtrirana sa riječju
python3 highlight/_convert_grammar.py --list
python3 highlight/_convert_grammar.py --list sql

# nekoliko jezika odjednom
python3 highlight/_convert_grammar.py erlang nix fsharp

# sopstveno ime, bilješka i riječi za pretraživanje (jedan jezik odjednom)
python3 highlight/_convert_grammar.py erlang --label "Erlang/OTP" --hint BEAM --keywords "erl otp"

# zamijeni kratku datoteku koju dolazi sa pluginom sa uredivom punom kopijom
python3 highlight/_convert_grammar.py routeros --force --label RouterOS --hint MikroTik --keywords mikrotik

# jezik koji nije još u objavljenoj highlight.js verziji, iz grana razvoja
python3 highlight/_convert_grammar.py odin --ref main

# link na datoteku gramatike, direktno iz adresnoga reda pregledača
python3 highlight/_convert_grammar.py https://github.com/highlightjs/highlight.js/blob/main/src/languages/odin.js

# trećestranačka gramatika: link na njen repozitorijum, skript pronalazi datoteku gramatike
python3 highlight/_convert_grammar.py https://github.com/highlightjs/highlightjs-terraform

# lokalna datoteka gramatike
python3 highlight/_convert_grammar.py ~/grammars/mylang.js --id mylang

# kratka datoteka koja referenca npm paket umjesto kopije koda
python3 highlight/_convert_grammar.py erlang --npm

# pokazati šta bi se učinilo bez promjene bilo čega
python3 highlight/_convert_grammar.py erlang --dry-run
```

### Šta skript radi

1. Preuzima `src/languages/<name>.js` highlight.js verzije na kojoj plugin radi. Verzija se čita iz `package-lock.json` (trenutno 11.12.0), jer su gramatike pisane za engine njihove vlastite verzije. `--ref` bira drugu verziju, granu ili commit.
2. Uzima naziv jezika iz `Language:` linije zaglavlja gramatike i riječi za pretraživanje iz njenih aliasa (`aliases`). `id` je naziv datoteke gramatike.
3. Stavlja kod gramatike u `highlight/<id>.js` nepromijenjen osim izvoza: `export default function(hljs)` postaje `function grammar(hljs)`, i objekt jezika `export default { id, label, keywords, grammar }` se dodaje na kraju datoteke. Ako je gramatika CommonJS modul (`module.exports = ...`), linija koja deklarira `module` i `exports` se dodaje na početku.
4. Ako gramatika uvozi ostale datoteke, preuzima ih u `highlight/_vendor/<source>-<version>/` pod istim putanjama kao u repozitorijumu i upućuje uvozove tamo. Na primjer, `typescript` uvozi `javascript.js` i `lib/ecmascript.js`. Ove datoteke se dijele sa svim jezicima iz istog izvora i verzije; nema potrebe da ih mijenjate.
5. Provjerava `Requires:` liniju, koja lista jezike korišćene za ugnježđeni kod (na primjer, `php-template` trebava `xml` i `php`). Ako nisu u `highlight/`, ispisuje naredbu koja ih dodaje. Bez njih se ugnježđeni kod jednostavno ostaje neobojani; ovo nije greška.
6. Ne prepisuje postojeće datoteke bez `--force` i ne uzima `id` koji se već koristi drugom datotekom.

Nakon konverzije jezik može biti urešen desno u njegovoj datoteci.

### Opcije

| Opcija | Šta radi |
|---|---|
| `LANGUAGE ...` | Naziv highlight.js jezika, link na datoteku gramatike ili na repozitorijum trećestranačke gramatike na GitHub-u, ili putanja na lokalnu `.js` datoteku. |
| `--ref REF` | highlight.js verzija (tag), grana ili commit. Defaulta na verziju u `package-lock.json`. Za linkove se verzija uzima iz linka. |
| `--id ID` | Jezik `id`. Defaulta na naziv datoteke gramatike. |
| `--label TEXT` | Naziv u listi i na znaku. Defaulta na `Language:` iz gramatike. |
| `--hint TEXT` | Siva bilješka u listi. |
| `--keywords TEXT` | Riječi za pretraživanje odvojene razmakom. Default: aliasa gramatike. |
| `--npm` | Umjesto kopije koda, napišite kratku datoteku koja referenca highlight.js npm paket. Samo za jezike highlight.js samog. |
| `--force` | Zamijeni postojeće datoteke. |
| `--dry-run` | Pokažite šta bi se učinilo bez promjene bilo čega. |
| `--list [WORD]` | Lista highlight.js jezike i trećestranačke gramatike, opciono filtrirane sa riječju. |
| `--prune` | Obriši datoteke u `_vendor/` koje nijedan jezik više ne uvozi. |


**Kopija ili `--npm`?** Kopija pokazuje pravila desno u datoteci: možete ih mijenjati, uzeti gramatiku noviju nego instaliran paket, ili trećestranačku. Kopija se ne promijeni kada plugin ažurira highlight.js; da je osvježite, ponovo pretvorite jezik sa `--force`. Datoteka napravljna sa `--npm` je nekoliko linija dugačka, i njena gramatika se ažurira zajedno sa pluginom.

## Gradnja i primjena

```sh
sh highlight/_compile.sh
```

- Trebava Docker (gradnja se radi u `node:20-alpine` kontejneru) ili, ako nema Dockera, Node.js 18+ na istoj mašini. Na prvoj pokretanju skript instalira npm pakete u `node_modules/` fasciklu plugina.
- Prvo skript provjerava svaki jezik: gradi ga odvojeno, učitava ga, registrira ga u istom engineu koji se radi u pregledaču, i isticanjem obradi tekst uzorka. Ako je jezik slomljen (greška u kodu, nevaljana redovna izraza, `id` već korišten), skript imenuje datoteku i razlog i zaustavlja se; prethodnji `tiptap_highlight.js` ostaje na mjestu.
- Zatim skript paketira sve jezike u `assets/javascripts/tiptap_highlight.js`.

Nakon gradnje, restartujte Redmine: objavljuje datoteke plugina pri pokretanju (vidite "Ažuriranje" u [glavnom README-u](../../docs/README.bs.md#ažuriranje) za naredbe). Pregledači dobijaju novu datoteku odmah, jer njen URL sadrži finger printi sadržaja.

Ako Redmine server nije ima ni Dockera ni Node.js, gradite na bilo kojoj mašini koja ima jedan od njih (kopija fascikle plugina je dovoljna) i stavite rezultirajući `assets/javascripts/tiptap_highlight.js` na server.

## Uklanjanje jezika

Obriši datoteku jezika iz `highlight/`, gradite, i restartujte Redmine. Spremljeni blokovi u ovom jeziku ostaju kao što su i prikazuju se kao običan tekst. Datoteke u `_vendor/` koje se više ne trebaju se uklanjaju sa:

```sh
python3 highlight/_convert_grammar.py --prune
```

## Sopstvene gramatike i pravila uređivanja

- Gramatika je funkcija koja prima `hljs` objekt i vraća definiciju jezika: koji dijelovi teksta da se označe i kako. Vodič: https://highlightjs.readthedocs.io/en/latest/language-guide.html, referenca: https://highlightjs.readthedocs.io/en/latest/mode-reference.html. Primjeri: `log.js`, `journalctl.js`, `cisco-ios.js`.
- highlight.js spaja redovne izraze svih pravila jezika u jedan i ignoriše njihove vlastite zastavice. Tako je case-insensitive matching trebalo biti napisano (`[Ee]rror`) ili omogućen za cijeli jezik sa `case_insensitive: true`.
- Preferirajte standardne klase tokena (`keyword`, `string`, `number`, `comment`, `title`, `attr`, `variable`, `built_in`, `literal`, `meta`, `symbol`, `type` i tako dalje): oni već imaju boje. Klasa vašega (na primjer, `scope: 'log-error'` daje klasu `hljs-log-error`) trebava pravilo u `assets/stylesheets/src/06_code.css` i CSS gradnju (`assets/stylesheets/src/_build.sh`).
- Da se nudi gotova gramatika pod drugim imenom, radite kao `cmd.js` radi: pozovite originalnu gramatiku i promijenite `name` i `aliases` u njenom rezultatu. Ako aliasi se ne zamijene, novi jezik preuzima njih od originala.

## Ažuriranje plugina kada ste dodali jezike

git ostavlja vaše datoteke u `highlight/` same. Ali `assets/javascripts/tiptap_highlight.js` u novoj verziji plugina se gradi bez vaših jezika, i vaša gradnja ove datoteke stoji na putu `git pull`. Zato:

```sh
cd /path/to/redmine/plugins/redmine_tiptap
git checkout -- assets/javascripts/tiptap_highlight.js
git pull
sh highlight/_compile.sh
```

Prva naredba odbacuje vašu gradnju, posljednja gradi jezike ponovo, uključujući vaše. Zatim restartujte Redmine. Ako ste urešili datoteke jezika koje dolaze sa pluginom, git vas može pitati da razriješite sukobe u njima.

Ako je plugin instaliran iz arhive, spasite vaše datoteke jezika i `_vendor/` fasciklu prije zamjene fascikle plugina, stavite ih nazad nakon, i gradite jezike.

## Veličina

Svi jezici se paketiraju u jednu datoteku; pregledač je preuzima jednom i zatim je uzima iz keša. Trenutno je 226 KB za 52 jezika. Većina jezika uzima 1–10 KB, najveći je 1C (55 KB).
