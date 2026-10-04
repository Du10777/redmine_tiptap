# Poudarjanje skladnje: jeziki

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

> *Ta prevod je nastal s pomočjo modela umetne inteligence in ga naravni govorec ni pregledal. Če najdete napako, [odprite issue ali pull request](https://github.com/Du10777/redmine_tiptap).*

Bloki kode so osvetljeni v urejevalniku in na shranjenih straneh (zahtevki, zabeležke, wiki) ter imajo videz v obeh. Jezik bloka je izbran iz značke v njegovem zgornjem desnem kotu. Seznam jezikov je opredeljen z datotekami v mapi `highlight/`: ena datoteka je en jezik.

Plagi je priloženo 52 jezikov. Dodati lahko več: pretvorite že pripravljeno slovnico highlight.js s skriptom (glejte [Dodajanje jezika iz highlight.js](#dodajanje-jezika-iz-highlightjs)) ali napišete svoj lastni.

## Kako deluje

- Osvetljavanje je narejeno s [highlight.js](https://highlightjs.org) (prek [lowlight](https://github.com/wooorm/lowlight)). Urejevalnik in shranjene strani uporabljajo enako pogonsko črv, zato barve ustrezajo.
- `_compile.sh` zbira vse datoteke jezikov v eno datoteko, `assets/javascripts/tiptap_highlight.js`. Ta datoteka je že vgrajenja v skladišče, zato namestitev plaga ne potrebuje gradnje. Graditi ga je treba le, ko spremenite nabor jezikov.
- Redmine naloži `tiptap_highlight.js` na vsaki strani pred urejevalnikom (`tiptap_bundle.js`). Pri nalaganju urejevalnik registrira vse jezike iz te datoteke.
- V urejevalniku se blok ponovno osvetli 50 ms po tem, ko prenehate pisati, in samo blok, ki se je spremenil. Na shranjenih straneh je blok osvetljen, ko se pojavi v vidnu. Blok znotraj skrčnega razdelka se osvetli, ko se razdelek odpre.
- Jezik je shranjen v shranjeni HTML: `<pre><code class="language-<id>">`. Zato se `id` jezika nikoli ne sme spremeniti: bloki, shranjeni s starim `id`, bi postali navadno besedilo.
- Ni samodejnega zaznavanja jezika: blok brez jezika je prikazan kot navadno besedilo. Prav tako je blok, katerega jezik ni v `highlight/` (na primer, datoteka jezika je bila izbrisana); njegova značka še vedno prikazuje `id`. Če datoteka jezika vrne, tudi barve.
- Barve. highlight.js označi besedilo s razredi, kot so `hljs-keyword`, `hljs-string`, `hljs-comment`. Njihove barve so nastavljena v `assets/stylesheets/src/06_code.css`, z uporabo palete lastnega osvetljevanja skladnje Redmineja.

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

| Polje | Zahtevano | Kaj je |
|---|---|---|
| `id` | da | Ime jezika v shranjeni HTML (`class="language-<id>"`). Dovoljeni znaki: `a-z`, `0-9`, `-`, `_`. **Nikoli ga ne spreminjajte** enkrat, ko so bloki v tem jeziku shranjeni. |
| `label` | ne | Ime na seznamu jezikov in na znački bloka. Privzeto na `id`. |
| `hint` | ne | Siva opomba ob imenu na seznamu. |
| `keywords` | ne | Dodatne besede za iskanje seznama, ločene s presledki. |
| `grammar` | da | highlight.js slovnica: funkcija `(hljs) => language definition`. |

`label`, `hint` in `keywords` so v angleščini. Če želite, da se jezik v vmesniku prikaže pod drugim imenom, ali da je mogoče najti ga s besedami tega jezika, dodajte vnos v datoteko prevoda tega jezika, `config/locales/<code>.yml`, pod `code_languages:`. Besede tam se dodajo `keywords`; `label` in `hint` nadomestita tiste iz datoteke jezika. `config/locales/ru.yml` ima primere, pravila so v [config/locales/README.md](../../config/locales/README.md).

Vrste datotek v mapi:

- **Kratko.** Sklicevanje na slovnico iz paketa npm highlight.js, kot v primeru zgoraj; večina jezikov je takšna. Slovnica prihaja iz različice highlight.js, zabeležene v `package-lock.json` plaga.
- **Polna kopija.** Koda slovnice je v datoteki sami in jo je mogoče urediti. Te datoteke so ustvarjene z skripto pretvorbe (glejte spodaj).
- **Lastna slovnica.** `log.js`, `journalctl.js`, `cisco-ios.js`; njihovi skupni deli so v `_common.js`.
- **Ovoj.** Pripravljeno slovnica pod drugim imenom: `cmd.js` je `dos` iz highlight.js, `docker-compose.js` je `yaml`.

Datoteke in mape, katerih imena se začnejo z `_`, niso jeziki:

- `_compile.sh` gradi jezike;
- `_check.mjs` preverja jezike med gradnjo;
- `_common.js` drži skupne dele lasten slovnic plaga;
- `_convert_grammar.py` je skripta, ki pretvarja slovnice highlight.js (glejte spodaj);
- `_vendor/` drži datoteke, ki jih uvozijo prevojeni jeziki (ustvarjena s skriptom pretvorbe).

Mapa `README/` drži to dokumentacijo.

## Dodajanje jezika iz highlight.js

Pripravljena slovnica (več kot 190) je tu: https://github.com/highlightjs/highlight.js/tree/main/src/languages. Njihova imena in vzdevki so navedeni v [SUPPORTED_LANGUAGES.md](https://github.com/highlightjs/highlight.js/blob/main/SUPPORTED_LANGUAGES.md), skupaj s stotinami slovnic tretjih oseb v ločenih skladiščih. Skripta `_convert_grammar.py` v tej mapi pretvarja katero koli od njih v obliko plaga.

Skripta potrebuje Python 3.6+ (brez dodatnih paketov) in dostop do github.com. Zaženite jo iz mape plaga:

```sh
cd /path/to/redmine/plugins/redmine_tiptap
python3 highlight/_convert_grammar.py erlang
sh highlight/_compile.sh
```

Argument `erlang` je ime datoteke v `src/languages` brez `.js`. Drugi ukaz gradi jezike in jih preverja. Nato ponovno zaženite Redmine (glejte [Gradnja in uporaba](#gradnja-in-uporaba)). Na Windows-u uporabite `py` ali `python` namesto `python3`.

Primeri:

```sh
# seznam jezikov highlight.js (* = že v highlight/), po želji filtriran po besedi
python3 highlight/_convert_grammar.py --list
python3 highlight/_convert_grammar.py --list sql

# več jezikov hkrati
python3 highlight/_convert_grammar.py erlang nix fsharp

# lastno ime, namig in besede za iskanje (en jezik naenkrat)
python3 highlight/_convert_grammar.py erlang --label "Erlang/OTP" --hint BEAM --keywords "erl otp"

# zamenjaj kratko datoteko, dostavljena s plagom z uređljivo polno kopijo
python3 highlight/_convert_grammar.py routeros --force --label RouterOS --hint MikroTik --keywords mikrotik

# jezik, ki ga še ni v izdani različici highlight.js, iz veje za razvoj
python3 highlight/_convert_grammar.py odin --ref main

# povezava na datoteko slovnice, direktno iz naslova brskalnika
python3 highlight/_convert_grammar.py https://github.com/highlightjs/highlight.js/blob/main/src/languages/odin.js

# slovnica tretje osebe: povezava do njenega skladišča, skripta poišče datoteko slovnice
python3 highlight/_convert_grammar.py https://github.com/highlightjs/highlightjs-terraform

# lokalna datoteka slovnice
python3 highlight/_convert_grammar.py ~/grammars/mylang.js --id mylang

# kratka datoteka, ki kaže na paket npm namesto kopije kode
python3 highlight/_convert_grammar.py erlang --npm

# prikaži, kaj bi se storilo, ne da bi kaj spremenil
python3 highlight/_convert_grammar.py erlang --dry-run
```

### Kaj naredi skripta

1. Preuzmite `src/languages/<name>.js` različice highlight.js, na kateri temelji plagi. Različica je prebrana iz `package-lock.json` (trenutno 11.12.0), ker so slovnice napisane za pogon svoje različice. `--ref` izbere drugo različico, vejo ali zavezek.
2. Vzamite ime jezika iz vrstice `Language:` glave slovnice in besede za iskanje iz njenega vzdevka (`aliases`). `id` je ime datoteke slovnice.
3. Postavite kodo slovnice v `highlight/<id>.js` nespremenjena razen za izvoz: `export default function(hljs)` postane `function grammar(hljs)`, in predmet jezika `export default { id, label, keywords, grammar }` se doda na konec datoteke. Če je slovnica modul CommonJS (`module.exports = ...`), je vrstica, ki deklarira `module` in `exports`, dodana na vrhu.
4. Če slovnica uvozi druge datoteke, jih preuzmite v `highlight/_vendor/<source>-<version>/` pod enakimi potmi kot v skladišču in kažejo uvoz tja. Na primer, `typescript` uvozi `javascript.js` in `lib/ecmascript.js`. Te datoteke si deljene z vsemi jeziki iz istega vira in različice; ni treba jih urediti.
5. Preverite vrstico `Requires:`, ki navaja jezike, ki se uporabljajo za vgrajeni kod (na primer, `php-template` potrebuje `xml` in `php`). Če jih ni v `highlight/`, natisne ukaz, ki jih doda. Brez njih vgrajeni kod enostavno ostane brez barv; to ni napaka.
6. Ne prepiše obstoječih datotek brez `--force` in ne sprejme `id` že uporabljen drugje.

Po pretvorbi se jezik lahko takoj uredi v svoji datoteki.

### Možnosti

| Možnost | Kaj naredi |
|---|---|
| `LANGUAGE ...` | Ime jezika highlight.js, povezava do datoteke slovnice ali do skladišča slovnice tretje osebe na GitHub-u, ali pot do lokalne datoteke `.js`. |
| `--ref REF` | Različica highlight.js (oznaka), veja ali zavezek. Privzeto na različici v `package-lock.json`. Za povezave je različica vzeta iz povezave. |
| `--id ID` | Jezik `id`. Privzeto na imenu datoteke slovnice. |
| `--label TEXT` | Ime na seznamu in na znački. Privzeto na `Language:` iz slovnice. |
| `--hint TEXT` | Siva opomba na seznamu. |
| `--keywords TEXT` | Besede za iskanje, ločene s presledki. Privzeto: vzdevki slovnice. |
| `--npm` | Namesto kopije kode napišite kratko datoteko, ki se sklicuje na paket npm highlight.js. Le za jezike samega highlight.js. |
| `--force` | Prepiši obstoječe datoteke. |
| `--dry-run` | Prikaži, kaj bi se storilo, ne da bi kaj spremenil. |
| `--list [WORD]` | Seznamite jezike highlight.js in slovnice tretjih oseb, po želji filtrirane po besedi. |
| `--prune` | Izbrišite datoteke v `_vendor/`, ki jih več nobeden jezik ne uvozi. |


**Kopija ali `--npm`?** Kopija kaže pravila v datoteki: jih lahko uređite, vzamete slovnico novejšo kot inštalirani paket, ali tretje osebe. Kopija se ne spremeni, ko plagi nadgradi highlight.js; da jo osvežite, pretvorite jezik ponovno z `--force`. Datoteka, narejena z `--npm`, je velika nekaj vrstic, in njena slovnica se nadgradi skupaj s plagom.

## Gradnja in uporaba

```sh
sh highlight/_compile.sh
```

- Potrebuje Docker (gradnja teče v posodi `node:20-alpine`) ali, če Docker ni na voljo, Node.js 18+ na istem računalniku. Pri prvi zagonu skripta namesti pakete npm v mapo `node_modules/` plaga.
- Najprej skripta preverja vsak jezik: gradi ga ločeno, ga naloži, registrira ga v isti pogon, ki teče v brskalniku, in osvetli besedilo vzorca. Če je jezik pokvarjen (napaka v kodi, neveljavni regularni izraz, `id` že uporabljen), skripta poimenuje datoteko in razlog ter se ustavi; prejšnji `tiptap_highlight.js` ostane na mestu.
- Nato skripta zbira vse jezike v `assets/javascripts/tiptap_highlight.js`.

Po gradnji ponovno zaženite Redmine: objavi datoteke plaga ob zagonu (glejte "Posodabljanje" v [glavnem BRANJU](../../docs/README.sl.md#posodabljanje) za ukaze). Brskalniki dobijo novo datoteko takoj, ker njegov URL vsebuje prstis vsebine.

Če Redminejev strežnik nima niti Docker niti Node.js, gradite na vsakem računalniku, ki ga ima (kopija mape plaga je dovolj) in postavite nastali `assets/javascripts/tiptap_highlight.js` na strežnik.

## Odstranjevanje jezika

Izbrišite datoteko jezika iz `highlight/`, gradite in ponovno zaženite Redmine. Shranjeni bloki v tem jeziku ostanejo tak, kot so in so prikazani kot navadno besedilo. Datoteke v `_vendor/`, ki se ne potrebuje več, se odstranijo z:

```sh
python3 highlight/_convert_grammar.py --prune
```

## Lastne slovnice in pravila za urejanje

- Slovnica je funkcija, ki prejme predmet `hljs` in vrne definicijo jezika: katerih delov besedila je treba označiti in kako. Vodnik: https://highlightjs.readthedocs.io/en/latest/language-guide.html, sklic: https://highlightjs.readthedocs.io/en/latest/mode-reference.html. Primeri: `log.js`, `journalctl.js`, `cisco-ios.js`.
- highlight.js se povezuje z regularnimi izrazi vseh pravil jezika v eno in ignorira lastne zastave. Zato mora biti ujemanje, ki ne razlikuje velikosti črk, izpisane (`[Ee]rror`) ali omogočeno za celoten jezik z `case_insensitive: true`.
- Imejte raje standardne razrede žetonov (`keyword`, `string`, `number`, `comment`, `title`, `attr`, `variable`, `built_in`, `literal`, `meta`, `symbol`, `type` in tako naprej): že imajo barve. Razred od vas (na primer, `scope: 'log-error'` proizvede razred `hljs-log-error`) potrebuje pravilo v `assets/stylesheets/src/06_code.css` in obnovitev CSS (`assets/stylesheets/src/_build.sh`).
- Če želite ponuditi priprajeno slovnico pod drugim imenom, storite, kot to naredi `cmd.js`: pokličite prvotno slovnico in spremenite `name` in `aliases` v njenem rezultatu. Če vzdevki niso zamenjani, novi jezik prevzame od izvirnika.

## Posodabljanje plaga, ko ste dodali jezike

git pusti vaše datoteke v `highlight/` pri miru. Vendar je `assets/javascripts/tiptap_highlight.js` v novi različici plaga zgrajen brez vaših jezikov in vaša gradnja te datoteke ovira `git pull`. Zato:

```sh
cd /path/to/redmine/plugins/redmine_tiptap
git checkout -- assets/javascripts/tiptap_highlight.js
git pull
sh highlight/_compile.sh
```

Prvi ukaz zavrže vašo gradnjo, zadnji gradi jezike ponovno, vključno s svojimi. Nato ponovno zaženite Redmine. Če ste uredili datoteke jezika dostavljene s plagom, vam git morda prosi, da razrešite konflikte v njih.

Če je bil plagi namestljen iz arhiva, shranite datoteke jezika in mapo `_vendor/` pred zamenjavo mape plaga, ju postavite nazaj in gradite jezike.

## Velikost

Vsi jeziki so zbrani v eno datoteko; brskalnik ga preuzmeta enkrat in potem ga vzame iz predpomnilnika. Trenutno je 226 KB za 52 jezikov. Večina jezikov traja 1–10 KB, največja je 1C (55 KB).
