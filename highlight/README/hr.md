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

> *Ovaj prijevod je napravljen uz pomoć AI modela i nije verificiran od strane izvornog govornika. Ako nađete grešku, molim vas [otvorite problem ili pull request](https://github.com/Du10777/redmine_tiptap).*

Blokovi koda su isticanjem obrade i u editoru i na spremljenim stranicama (predmeti, napomene, wiki), i izgledaju jednako na obje strane. Jezik bloka odabiere se iz znaka u njegovom gornjem desnom kutu. Popis jezika definiše datoteke u `highlight/` mapi: jedna datoteka je jedan jezik.

Dodatak dolazi sa 52 jezika. Možete dodati više: pretvorite gotovu highlight.js gramatiku sa skriptom (vidi [Dodavanje jezika iz highlight.js](#dodavanje-jezika-iz-highlightjs)) ili napišite svoju.

## Kako radi

- Isticanje sintakse radi [highlight.js](https://highlightjs.org) (kroz [lowlight](https://github.com/wooorm/lowlight)). Editor i spremljene stranice koriste isti engine, tako da se boje poklapaju.
- `_compile.sh` paketira sve datoteke jezika u jednu datoteku, `assets/javascripts/tiptap_highlight.js`. Ova datoteka je već u repozitoriju izgrađena, tako da instalacija dodatka ne trebata gradnju. Trebat će je graditi samo kada promijenite skup jezika.
- Redmine učitava `tiptap_highlight.js` na svakoj stranici, prije editora (`tiptap_bundle.js`). Pri učitavanju editor registrira sve jezike iz te datoteke.
- U editoru se blok ponovno isticanjem obrade 50 ms nakon što prestanete pisati, i samo blok koji se promijenjio. Na spremljenim stranicama se blok isticanjem obrade kada se pojavi u vidnom polju. Blok unutar skupljenog dijela se isticanjem obrade kada se dijel otvori.
- Jezik se sprema u spremljeni HTML: `<pre><code class="language-<id>">`. To je zašto `id` jezika nikada ne smije biti promijenjen: blokovi spremljeni sa starim `id` bi se pretvorili u obični tekst.
- Nema automatske detekcije jezika: blok bez jezika prikazuje se kao obični tekst. Tako je i blok čiji jezik nije u `highlight/` (na primjer, datoteka jezika je izbrisana); njegov znak nastavlja prikazivati `id`. Ako datoteka jezika vrati, boje se vraćaju.
- Boje. highlight.js označi tekst sa klasama kao što su `hljs-keyword`, `hljs-string`, `hljs-comment`. Njihove boje se postavljaju u `assets/stylesheets/src/06_code.css`, koristeći paletu Redmine-ovog vlastitog isticanja sintakse.

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

| Polje | Obavezno | Što je |
|---|---|---|
| `id` | da | Naziv jezika u spremljenom HTML-u (`class="language-<id>"`). Dozvoljeni znakovi: `a-z`, `0-9`, `-`, `_`. **Nikada ga ne mijenjajte** kada su blokovi sa ovim jezikom spremljeni. |
| `label` | ne | Naziv u popisu jezika i na znaku bloka. Zadana vrijednost na `id`. |
| `hint` | ne | Siva napomena pored naziva u popisu. |
| `keywords` | ne | Dodatne riječi za pretraživanje popisa, odvojene razmakom. |
| `grammar` | da | highlight.js gramatika: funkcija `(hljs) => language definition`. |

`label`, `hint` i `keywords` su na engleskom. Da prikazujete jezik pod drugim imenom u jeziku sučelja korisnika, ili da ga učinite pronađivim riječima tog jezika, dodajte unos u datoteku prijevoda tog jezika, `config/locales/<code>.yml`, pod `code_languages:`. Riječi tamo se dodaju `keywords`; `label` i `hint` zamjenjuju one iz datoteke jezika. `config/locales/ru.yml` ima primjere, pravila su u [config/locales/README.md](../../config/locales/README.md).

Vrste datoteka u mapi:

- **Kratka.** Referenca na gramatiku iz highlight.js npm paketa, kao u primjeru gore; većina jezika je takva. Gramatika dolazi iz highlight.js verzije zabilježene u `package-lock.json` dodatka.
- **Puna kopija.** Kod gramatike je u datoteci i može biti urešen. Ove datoteke kreira skript konverzije (vidi dolje).
- **Vlastita gramatika.** `log.js`, `journalctl.js`, `cisco-ios.js`; njihovi dijeljeni dijelovi su u `_common.js`.
- **Omotač.** Gotova gramatika pod drugim imenom: `cmd.js` je `dos` iz highlight.js, `docker-compose.js` je `yaml`.

Datoteke i mape čija imena počinju sa `_` nisu jezici:

- `_compile.sh` gradi jezike;
- `_check.mjs` provjerava jezike tijekom gradnje;
- `_common.js` sadrži dijeljene dijelove dodatka-ovih vlastitih gramatika;
- `_convert_grammar.py` je skript koji pretvara highlight.js gramatike (vidi dolje);
- `_vendor/` sadrži datoteke koje pretvorene gramatike uvode (kreirane od strane skripte konverzije).

Mapa `README/` sadrži ovu dokumentaciju.

## Dodavanje jezika iz highlight.js

Gotove gramatike (više od 190) su ovdje: https://github.com/highlightjs/highlight.js/tree/main/src/languages. Njihova imena i aliasi su navedeni u [SUPPORTED_LANGUAGES.md](https://github.com/highlightjs/highlight.js/blob/main/SUPPORTED_LANGUAGES.md), zajedno sa stotinjama gramatika treće strane čuvanih u odvojenim repozitorijima. Skript `_convert_grammar.py` u ovoj mapi pretvara bilo koju od njih u format dodatka.

Skript trebat će Python 3.6+ (bez dodatnih paketa) i pristup github.com. Pokrenite ga iz mape dodatka:

```sh
cd /path/to/redmine/plugins/redmine_tiptap
python3 highlight/_convert_grammar.py erlang
sh highlight/_compile.sh
```

Argument `erlang` je naziv datoteke u `src/languages` bez `.js`. Druga naredba gradi jezike i provjerava ih. Zatim restartujte Redmine (vidi [Gradnja i primjena](#gradnja-i-primjena)). Na Windows koristite `py` ili `python` umjesto `python3`.

Primjeri:

```sh
# popis highlight.js jezika (* = već u highlight/), opciono filtriran sa riječju
python3 highlight/_convert_grammar.py --list
python3 highlight/_convert_grammar.py --list sql

# nekoliko jezika odjednom
python3 highlight/_convert_grammar.py erlang nix fsharp

# vlastiti naziv, napomena i riječi za pretraživanje (jedan jezik odjednom)
python3 highlight/_convert_grammar.py erlang --label "Erlang/OTP" --hint BEAM --keywords "erl otp"

# zamijeni kratku datoteku koju dolazi sa dodatkom sa uredivom punom kopijom
python3 highlight/_convert_grammar.py routeros --force --label RouterOS --hint MikroTik --keywords mikrotik

# jezik koji nije još u objavljenoj highlight.js verziji, iz grana razvoja
python3 highlight/_convert_grammar.py odin --ref main

# veza na datoteku gramatike, direktno iz adresne trake pretraživača
python3 highlight/_convert_grammar.py https://github.com/highlightjs/highlight.js/blob/main/src/languages/odin.js

# gramatika treće strane: veza na njen repozitorij, skript pronalazi datoteku gramatike
python3 highlight/_convert_grammar.py https://github.com/highlightjs/highlightjs-terraform

# lokalna datoteka gramatike
python3 highlight/_convert_grammar.py ~/grammars/mylang.js --id mylang

# kratka datoteka koja referenca npm paket umjesto kopije koda
python3 highlight/_convert_grammar.py erlang --npm

# pokazati što bi se učinilo bez promjene bilo čega
python3 highlight/_convert_grammar.py erlang --dry-run
```

### Što skript radi

1. Preuzima `src/languages/<name>.js` highlight.js verzije na kojoj dodatak radi. Verzija se čita iz `package-lock.json` (trenutno 11.12.0), jer su gramatike napisane za engine njihove vlastite verzije. `--ref` bira drugu verziju, granu ili commit.
2. Uzima naziv jezika iz `Language:` linije zaglavlja gramatike i riječi za pretraživanje iz njenih aliasa (`aliases`). `id` je naziv datoteke gramatike.
3. Stavlja kod gramatike u `highlight/<id>.js` nepromijenjen osim izvoza: `export default function(hljs)` postaje `function grammar(hljs)`, i objekt jezika `export default { id, label, keywords, grammar }` se dodaje na kraju datoteke. Ako je gramatika CommonJS modul (`module.exports = ...`), linija koja deklarira `module` i `exports` se dodaje na početku.
4. Ako gramatika uvozi ostale datoteke, preuzima ih u `highlight/_vendor/<source>-<version>/` pod istim putanjama kao u repozitoriju i upućuje uvoze tamo. Na primjer, `typescript` uvozi `javascript.js` i `lib/ecmascript.js`. Ove datoteke se dijele sa svim jezicima iz istog izvora i verzije; nema potrebe da ih mijenjate.
5. Provjerava `Requires:` liniju, koja navodi jezike korišćene za ugnježđeni kod (na primjer, `php-template` trebat će `xml` i `php`). Ako nisu u `highlight/`, ispisuje naredbu koja ih dodaje. Bez njih se ugnježđeni kod jednostavno ostaje neobojani; ovo nije greška.
6. Ne prepisuje postojeće datoteke bez `--force` i ne uzima `id` koji se već koristi drugom datotekom.

Nakon konverzije jezik može biti urešen desno u njegovoj datoteci.

### Opcije

| Opcija | Što radi |
|---|---|
| `LANGUAGE ...` | Naziv highlight.js jezika, veza na datoteku gramatike ili na repozitorij gramatike treće strane na GitHub-u, ili putanja na lokalnu `.js` datoteku. |
| `--ref REF` | highlight.js verzija (tag), grana ili commit. Zadana vrijednost je verzija u `package-lock.json`. Za veze se verzija uzima iz veze. |
| `--id ID` | Jezik `id`. Zadana vrijednost je naziv datoteke gramatike. |
| `--label TEXT` | Naziv u popisu i na znaku. Zadana vrijednost je `Language:` iz gramatike. |
| `--hint TEXT` | Siva napomena u popisu. |
| `--keywords TEXT` | Riječi za pretraživanje odvojene razmakom. Zadana vrijednost: aliasi gramatike. |
| `--npm` | Umjesto kopije koda, napišite kratku datoteku koja referenca highlight.js npm paket. Samo za jezike highlight.js samog. |
| `--force` | Zamijeni postojeće datoteke. |
| `--dry-run` | Pokazati što bi se učinilo bez promjene bilo čega. |
| `--list [WORD]` | Popis highlight.js jezika i gramatika treće strane, opciono filtrirane sa riječju. |
| `--prune` | Izbrišite datoteke u `_vendor/` koje nijedan jezik više ne uvozi. |


**Kopija ili `--npm`?** Kopija pokazuje pravila desno u datoteci: možete ih mijenjati, uzeti gramatiku noviju nego instaliran paket, ili gramatiku treće strane. Kopija se ne promijeni kada dodatak ažurira highlight.js; da je osvježite, ponovno pretvorite jezik sa `--force`. Datoteka napravljana sa `--npm` je nekoliko linija dugačka, a njena gramatika se ažurira zajedno sa dodatkom.

## Gradnja i primjena

```sh
sh highlight/_compile.sh
```

- Trebat će Docker (gradnja se radi u `node:20-alpine` kontejneru) ili, ako nema Dockera, Node.js 18+ na istoj mašini. Na prvoj pokretanju skript instalira npm pakete u `node_modules/` mapu dodatka.
- Prvo skript provjerava svaki jezik: gradi ga odvojeno, učitava ga, registrira ga u istom engineu koji se radi u pretraživaču, i isticanjem obrade tekst uzorka. Ako je jezik slomljen (greška u kodu, neispravan regularni izraz, `id` već korišten), skript imenuje datoteku i razlog i zaustavlja se; prethodni `tiptap_highlight.js` ostaje na mjestu.
- Zatim skript paketira sve jezike u `assets/javascripts/tiptap_highlight.js`.

Nakon gradnje, restartujte Redmine: objavljuje datoteke dodatka pri pokretanju (vidi "Ažuriranje" u [glavnoj README](../../docs/README.hr.md#ažuriranje) za naredbe). Pretraživači dobijaju novu datoteku odmah, jer njen URL sadrži otisk sadržaja.

Ako Redmine server nema ni Dockera ni Node.js, gradite na bilo kojoj mašini koja ima jedan od njih (kopija mape dodatka je dovoljna) i stavite rezultirajući `assets/javascripts/tiptap_highlight.js` na server.

## Uklanjanje jezika

Izbrišite datoteku jezika iz `highlight/`, gradite, i restartujte Redmine. Spremljeni blokovi u ovom jeziku ostaju kako su i prikazuju se kao obični tekst. Datoteke u `_vendor/` koje se više ne trebaju se uklanjaju sa:

```sh
python3 highlight/_convert_grammar.py --prune
```

## Vlastite gramatike i pravila uređivanja

- Gramatika je funkcija koja prima `hljs` objekt i vraća definiciju jezika: koji dijelovi teksta da se označe i kako. Vodič: https://highlightjs.readthedocs.io/en/latest/language-guide.html, referenca: https://highlightjs.readthedocs.io/en/latest/mode-reference.html. Primjeri: `log.js`, `journalctl.js`, `cisco-ios.js`.
- highlight.js spaja redovne izraze svih pravila jezika u jedan i ignoriše njihove vlastite zastavice. Tako je case-insensitive matching trebalo biti napisano (`[Ee]rror`) ili omogućen za cijeli jezik sa `case_insensitive: true`.
- Preferirajte standardne klase tokena (`keyword`, `string`, `number`, `comment`, `title`, `attr`, `variable`, `built_in`, `literal`, `meta`, `symbol`, `type` i tako dalje): oni već imaju boje. Klasa vašega (na primjer, `scope: 'log-error'` daje klasu `hljs-log-error`) trebat će pravilo u `assets/stylesheets/src/06_code.css` i CSS gradnju (`assets/stylesheets/src/_build.sh`).
- Da se ponudi gotova gramatika pod drugim imenom, činite kao `cmd.js` radi: pozovite originalnu gramatiku i promijenite `name` i `aliases` u njegovom rezultatu. Ako aliasi se ne zamijene, novi jezik preuzima njih od originala.

## Ažuriranje dodatka kada ste dodali jezike

git ostavlja vaše datoteke u `highlight/` same. Ali `assets/javascripts/tiptap_highlight.js` u novoj verziji dodatka se gradi bez vaših jezika, i vaša gradnja ove datoteke stoji na putu `git pull`. Zato:

```sh
cd /path/to/redmine/plugins/redmine_tiptap
git checkout -- assets/javascripts/tiptap_highlight.js
git pull
sh highlight/_compile.sh
```

Prva naredba odbacuje vašu gradnju, posljednja gradi jezike ponovo, uključujući vaše. Zatim restartujte Redmine. Ako ste urešili datoteke jezika koje dolaze sa dodatkom, git vas može pitati da razriješite sukobe u njima.

Ako je dodatak instaliran iz arhive, spasite vaše datoteke jezika i `_vendor/` mapu prije zamjene mape dodatka, stavite ih nazad nakon, i gradite jezike.

## Veličina

Svi jezici su paketirati u jednu datoteku; pretraživač je preuzima jednom i zatim je uzima iz keša. Trenutno je 226 KB za 52 jezika. Većina jezika uzima 1–10 KB, najveći je 1C (55 KB).
