# Ističanje sintakse: jezici

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

> *Ovaj prevod je napravljen uz pomoć modela veštačke inteligencije i nije ga proverio izvorni govornik. Ako pronađete grešku, [otvorite issue ili pull request](https://github.com/Du10777/redmine_tiptap).*

Blokovi koda se ističu podjednako u uređivaču i na sačuvanim stranicama (problemi, beleške, wiki), i izgledaju isto na oba mesta. Jezik bloka bira se pomoću znački u njegovu gornjem desnom uglu. Lista jezika određena je datotekama u faskikli `highlight/`: jedna datoteka je jedan jezik.

Dodatna komponenta dolazi sa 52 jezika. Možete dodati više: konvertujte gotovu highlight.js gramatiku pomoću skripta (viditi [Dodavanje jezika iz highlight.js](#dodavanje-jezika-iz-highlightjs)) ili napišite svoju.

## Kako funkconiše

- Ističanje sintakse vrši [highlight.js](https://highlightjs.org) (kroz [lowlight](https://github.com/wooorm/lowlight)). Uređivač i sačuvane stranice koriste isti mehanizam, tako da se boje podudaraju.
- `_compile.sh` pakuje sve datoteke jezika u jednu datoteku, `assets/javascripts/tiptap_highlight.js`. Ova datoteka je već izgrađena u repozitorijumu, tako da instalacija dodatne komponente ne zahteva izgradnju. Trebate da je izgraduje samo kada promenite skup jezika.
- Redmine učitava `tiptap_highlight.js` na svakoj stranici, pre uređivača (`tiptap_bundle.js`). Pri učitavanju uređivač registruje sve jezike iz te datoteke.
- U uređivaču blok se ponovo istakuje 50 ms posle što pauzarate kucanje, i samo blok koji se promenio. Na sačuvanim stranicama blok se istakuje kada se pomera u vidno polje. Blok unutar sklopljene sekcije istakuje se kada se sekcija otvori.
- Jezik se čuva u sačuvanom HTML-u: `<pre><code class="language-<id>">`. Zbog toga `id` jezika nikada ne sme da se promeni: blokovi sačuvani sa starim `id` bi postali običan tekst.
- Nema automatske detekcije jezika: blok bez jezika prikazuje se kao običan tekst. Isto se dešava sa blokom čiji jezik nije u `highlight/` (na primer, datoteka jezika je izbrisana); njegova znački nastavlja da pokazuje `id`. Ako se datoteka jezika vrati, vrate se i boje.
- Boje. highlight.js obilezava tekst klasama kao što su `hljs-keyword`, `hljs-string`, `hljs-comment`. Njihove boje postavljene su u `assets/stylesheets/src/06_code.css`, koristeći paletu Redmine-ovog sopstvenog ističanja sintakse.

## Datoteka jezika

Na primer, `routeros.js`:

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

| Polje | Obavezno | Šta je to |
|---|---|---|
| `id` | da | Naziv jezika u sačuvanom HTML-u (`class="language-<id>"`). Dozvoljeni karakteri: `a-z`, `0-9`, `-`, `_`. **Nikada ga ne menjajte** kada su blokovi sa ovim jezikom već sačuvani. |
| `label` | ne | Naziv u listi jezika i na znački bloka. Podrazumevano je `id`. |
| `hint` | ne | Siva napomena pored naziva u listi. |
| `keywords` | ne | Dodatne reči za pretragu u listi, odvojene razmakom. |
| `grammar` | da | Gramatika highlight.js: funkcija `(hljs) => language definition`. |

`label`, `hint` i `keywords` su na engleskom. Da bi se jezik prikazao pod drugim nazivom na jeziku interfejsa korisnika, ili da bi se mogao naći rečima tog jezika, dodajte unos u datoteku prevoda tog jezika, `config/locales/<code>.yml`, pod `code_languages:`. Reč tamo dodaju se `keywords`; `label` i `hint` zamenjuju one iz datoteke jezika. `config/locales/ru.yml` ima primere, pravila su u [config/locales/README.md](../../config/locales/README.md).

Vrste datoteka u faskikli:

- **Kratka.** Referenca na gramatiku iz highlight.js npm paketa, kao u primeru iznad; većina jezika je takva. Gramatika dolazi iz highlight.js verzije zabeleške u `package-lock.json` dodatne komponente.
- **Puna kopija.** Kod gramatike je u samoj datoteci i može se uređivati. Ove datoteke pravi skripta za konverziju (viditi dole).
- **Vlastita gramatika.** `log.js`, `journalctl.js`, `cisco-ios.js`; njihovi zajednički delovi su u `_common.js`.
- **Obvijač.** Gotova gramatika pod drugim nazivom: `cmd.js` je `dos` iz highlight.js, `docker-compose.js` je `yaml`.

Datoteke i fascikle čija imena počinju sa `_` nisu jezici:

- `_compile.sh` izgrađuje jezike;
- `_check.mjs` proverava jezike pri izgradnji;
- `_common.js` sadrži zajedniške delove vlastuih gramatika dodatne komponente;
- `_convert_grammar.py` je skripta koja konvertuje highlight.js gramatike (viditi dole);
- `_vendor/` sadrži datoteke koje konvertovana gramatika uvozi (pravi skripta za konverziju).

Fascikla `README/` sadrži ovu dokumentaciju.

## Dodavanje jezika iz highlight.js

Gotove gramatike (više od 190) su ovde: https://github.com/highlightjs/highlight.js/tree/main/src/languages. Njihovi nazivi i aliasi navedeni su u [SUPPORTED_LANGUAGES.md](https://github.com/highlightjs/highlight.js/blob/main/SUPPORTED_LANGUAGES.md), zajedno sa oko stotinu gramatika treće strane čuvani u odvojenim repozitorijumima. Skripta `_convert_grammar.py` u ovoj faskikli konvertuje bilo koju od njih u format dodatne komponente.

Skripta zahteva Python 3.6+ (bez dodatnih paketa) i pristup github.com. Pokrenite je iz faskikle dodatne komponente:

```sh
cd /path/to/redmine/plugins/redmine_tiptap
python3 highlight/_convert_grammar.py erlang
sh highlight/_compile.sh
```

Argument `erlang` je naziv datoteke u `src/languages` bez `.js`. Druga komanda izgrađuje jezike i proverava ih. Zatim ponovo pokrenite Redmine (viditi [Izgradnja i primena](#izgradnja-i-primena)). Na Windows koristite `py` ili `python` umesto `python3`.

Primeri:

```sh
# lista highlight.js jezika (* = već u highlight/), opcionalno filtrirana po reči
python3 highlight/_convert_grammar.py --list
python3 highlight/_convert_grammar.py --list sql

# nekoliko jezika odjednom
python3 highlight/_convert_grammar.py erlang nix fsharp

# vlastiti naziv, napomena i reči za pretragu (jedan jezik odjednom)
python3 highlight/_convert_grammar.py erlang --label "Erlang/OTP" --hint BEAM --keywords "erl otp"

# zameni kratku datoteku dostavljenu sa dodatnom komponentom urediivom punom kopijom
python3 highlight/_convert_grammar.py routeros --force --label RouterOS --hint MikroTik --keywords mikrotik

# jezik nije još u puštenoj highlight.js verziji, iz razvojne grane
python3 highlight/_convert_grammar.py odin --ref main

# veža na datoteku gramatike, direktno iz adresne linije pregledača
python3 highlight/_convert_grammar.py https://github.com/highlightjs/highlight.js/blob/main/src/languages/odin.js

# gramatika treće strane: veža na njen repozitorijum, skripta pronalazi datoteku gramatike
python3 highlight/_convert_grammar.py https://github.com/highlightjs/highlightjs-terraform

# lokalna datoteka gramatike
python3 highlight/_convert_grammar.py ~/grammars/mylang.js --id mylang

# kratka datoteka koja referencira npm paket umesto kopije koda
python3 highlight/_convert_grammar.py erlang --npm

# pokaži šta bi radio bez izmene čega god
python3 highlight/_convert_grammar.py erlang --dry-run
```

### Šta skripta radi

1. Preuzima `src/languages/<name>.js` highlight.js verzije na kojoj dodatna komponenta radi. Verzija se čita iz `package-lock.json` (trenutno 11.12.0), jer su gramatike napisane za mehanizam svoje verzije. `--ref` bira drugu verziju, granu ili komit.
2. Preuzima naziv jezika iz `Language:` linije zaglavlja gramatike i reči za pretragu iz njegovih aliasa (`aliases`). `id` je naziv datoteke gramatike.
3. Stavi kod gramatike u `highlight/<id>.js` nepromenjeno izuzev izvoza: `export default function(hljs)` postaje `function grammar(hljs)`, i objekat jezika `export default { id, label, keywords, grammar }` dodaje se na kraj datoteke. Ako je gramatika CommonJS modul (`module.exports = ...`), linija koja deklarira `module` i `exports` dodaje se na vrh.
4. Ako gramatika uvozi druge datoteke, preuzima ih u `highlight/_vendor/<source>-<version>/` pod istim putanjama kao u repozitorijumu i upućuje uvoze tamo. Na primer, `typescript` uvozi `javascript.js` i `lib/ecmascript.js`. Ove datoteke dele svi jezici iz istog izvora i verzije; nema potrebe da ih uredite.
5. Proverava `Requires:` liniju, koja navodi jezike korišćene za ugneždeni kod (na primer, `php-template` zahteva `xml` i `php`). Ako ih nema u `highlight/`, ispisuje komandu koja ih dodaje. Bez njih ugneždeni kod ostane neobojen; ovo nije greška.
6. Ne prepakovava postojeće datoteke bez `--force` i ne prihvata `id` već korišćenu od druge datoteke.

Posle konverzije jezik može biti uredjivan pravo u svojoj datoteci.

### Opcije

| Opcija | Šta ona radi |
|---|---|
| `LANGUAGE ...` | Naziv highlight.js jezika, veža na datoteku gramatike ili na repozitorijum gramatike treće strane na GitHub-u, ili putanja do lokalne `.js` datoteke. |
| `--ref REF` | highlight.js verzija (tag), grana ili komit. Podrazumevano je verzija u `package-lock.json`. Za veze verzija se uzima iz same veze. |
| `--id ID` | Jezik `id`. Podrazumevano je naziv datoteke gramatike. |
| `--label TEXT` | Naziv u listi i na znački. Podrazumevano je `Language:` iz gramatike. |
| `--hint TEXT` | Siva napomena u listi. |
| `--keywords TEXT` | Reči za pretragu odvojene razmakom. Podrazumevano su aliasi gramatike. |
| `--npm` | Umesto kopije koda, napišite kratku datoteku koja referencira highlight.js npm paket. Samo za jezike samog highlight.js. |
| `--force` | Zameni postojeće datoteke. |
| `--dry-run` | Pokažiš ta bi radio bez izmene čega god. |
| `--list [WORD]` | Navedi highlight.js jezike i gramatike treće strane, opcionalno filtrirane po reči. |
| `--prune` | Obriši datoteke u `_vendor/` koje nijedan jezik više ne uvozi. |


**Kopija ili `--npm`?** Kopija pokazuje pravila pravo u datoteci: možete je uređivati, uzeti gramatiku noviju od instaliranog paketa, ili treću stranu. Kopija se ne menja kada dodatna komponenta nadogradi highlight.js; da je osvežite, ponovo konvertujte jezik sa `--force`. Datoteka napravljena sa `--npm` je nekoliko redova duža, a njenu gramatika nadogradi se zajedno sa dodatnom komponentom.

## Izgradnja i primena

```sh
sh highlight/_compile.sh
```

- Trebaće Docker (izgradnja radi u `node:20-alpine` kontejneru) ili, ako nema Docker-a, Node.js 18+ na istoj mašini. Pri prvom izvršavanju skripta instalira npm pakete u fasciklu `node_modules/` dodatne komponente.
- Prvo skripta proverava svaki jezik: izgrađuje ga odvojeno, učitava ga, registruje ga u istom mehanizmu koji radi u pregledaču, i istakuje uzorak teksta. Ako je jezik neispravan (greška u kodu, nevažeći regulirani izraz, `id` već korišćen), skripta naziva datoteku i razlog i zaustavlja se; prethodna `tiptap_highlight.js` ostaje na mestu.
- Zatim skripta pakuje sve jezike u `assets/javascripts/tiptap_highlight.js`.

Posle izgradnje ponovo pokrenite Redmine: objavljuje datoteke dodatnih komponenti pri pokretanju (viditi "Ažuriranje" u [glavnom README](../../docs/README.sr-YU.md#ažuriranje) za komande). Pregledači preuzimaju novu datoteku odmah, jer njena adresa sadrži otisak sadržaja.

Ako Redmine server nema ni Docker ni Node.js, izgradujte na bilo kojoj mašini koja ima neki od njih (kopija faskikle dodatne komponente je dovoljna) i stavite rezultujuću `assets/javascripts/tiptap_highlight.js` na server.

## Uklanjanje jezika

Izbrišite datoteku jezika iz `highlight/`, izgradujte, i ponovo pokrenite Redmine. Sačuvani blokovi na ovom jeziku ostaju kako su bili i prikazuju se kao običan tekst. Datoteke u `_vendor/` koje više nisu potrebne uklanjaju se sa:

```sh
python3 highlight/_convert_grammar.py --prune
```

## Vlastite gramatike i pravila uređivanja

- Gramatika je funkcija koja dobija objekat `hljs` i vraća definiciju jezika: koja mesta teksta obelezi i kako. Vodič: https://highlightjs.readthedocs.io/en/latest/language-guide.html, referenca: https://highlightjs.readthedocs.io/en/latest/mode-reference.html. Primeri: `log.js`, `journalctl.js`, `cisco-ios.js`.
- highlight.js spaja regularne izraze svih pravila jezika u jedan i ignoriše njihove sopstvene zastavice. Tako da podudaranje bez razlikovanja velikih i malih slova mora biti izrađeno (`[Ee]rror`) ili omogućeno za celi jezik sa `case_insensitive: true`.
- Predpoćitite standardne klase žetona (`keyword`, `string`, `number`, `comment`, `title`, `attr`, `variable`, `built_in`, `literal`, `meta`, `symbol`, `type` i sl.): već imaju boje. Klasa od vas (na primer, `scope: 'log-error'` proizvodi klasu `hljs-log-error`) zahteva pravilo u `assets/stylesheets/src/06_code.css` i obnovu CSS-a (`assets/stylesheets/src/_build.sh`).
- Da ponudite gotovu gramatiku pod drugim nazivom, učinite kao što `cmd.js` radi: pozovite originalnu gramatiku i promenite `name` i `aliases` u njenom rezultatu. Ako aliasi nisu zamenjeni, novi jezik ih preuzima od originalne.

## Ažuriranje dodatne komponente kada ste dodali jezike

git ostavlja vaše datoteke u `highlight/` same. Ali `assets/javascripts/tiptap_highlight.js` u novoj verziji dodatne komponente izgrađena je bez vaših jezika, a vaša izgradnja ove datoteke zamršava `git pull`. Tako:

```sh
cd /path/to/redmine/plugins/redmine_tiptap
git checkout -- assets/javascripts/tiptap_highlight.js
git pull
sh highlight/_compile.sh
```

Prva komanda odbacuje vašu izgradnju, poslednja odbacuje jezike ponovo, uključujući vaše. Zatim ponovo pokrenite Redmine. Ako ste uredili datoteke jezika dostavljene sa dodatnom komponentom, git može da vas moži da razreširte konflikte u njima.

Ako je dodatna komponenta instalirana iz arhive, sačuvajte vaše datoteke jezika i fasciklu `_vendor/` pre zamene faskikle dodatne komponente, vraćajte ih nazad posle zamene, i izgradujte jezike.

## Veličina

Svi jezici su pakovani u jednu datoteku; pregledač je preuzima jednom i zatim je uzima iz keša. Trenutno je 226 KB za 52 jezika. Većina jezika zauzima 1–10 KB, najveći je 1C (55 KB).
