# Sintaksės paryškinimas: kalbos

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

> *Šis vertimas parengtas pasitelkus dirbtinio intelekto modelį ir nebuvo peržiūrėtas gimtakalbio. Jei rasite klaidą, [sukurkite pranešimą (issue) arba pull request](https://github.com/Du10777/redmine_tiptap).*

Kodų blokai yra paryškinami tiek redaktoriuje, tiek išsaugotose puslapiuose (darbai, pastabos, wiki), ir jie atrodo vienodi abiejuose. Bloko kalba pasirenkama iš ženklelio jo viršutiniame dešiniajame kampe. Kalbų sąrašas nustatytas failais `highlight/` aplanke: vienas failas yra viena kalba.

Įskiepis atgabena 52 kalbas. Galite pridėti daugiau: konvertuoti paruoštą highlight.js gramatiką su skreiptu (žr. [Kalbos pridėjimas iš highlight.js](#kalbos-pridėjimas-iš-highlightjs)) arba parašyti savo.

## Kaip tai veikia

- Paryškinimas atliekamas [highlight.js](https://highlightjs.org) (per [lowlight](https://github.com/wooorm/lowlight)). Redaktorius ir išsaugoti puslapiai naudoja tą patį variklį, todėl spalvos sutampa.
- `_compile.sh` surišamas visus kalbų failus į vieną failą, `assets/javascripts/tiptap_highlight.js`. Šis failas yra jau sukompiliuotas saugykloje, todėl įskiepio diegimas nereikalinga statyba. Jums tik reikia jį statyti, kai keičiate kalbų rinkinį.
- „Redmine" įkrauna `tiptap_highlight.js` kiekviename puslapyje, prieš redaktorių (`tiptap_bundle.js`). Įkėlus redaktorius registruoja visas kalbas iš to failo.
- Redaktoriuje blokas yra paryškintas iš naujo 50 ms po pauzės rašymo, ir tik pasikeitęs blok. Išsaugotose puslapiuose blokas yra paryškintas, kai jis slenka į peržiūrą. Blokas sumažintoje sekcijoje yra paryškintas, kai sekcija atidariama.
- Kalba saugoma išsaugotame HTML: `<pre><code class="language-<id>">`. Todėl kalbos `id` niekada neturi keistis: blokai saugoti su seną `id` būtų taptų paprastas tekstas.
- Nėra kalbos automatinio aptikimo: blokas be kalbos rodomas kaip paprastas tekstas. Taip pat ir blokas, kurio kalba nėra `highlight/` (pavyzdžiui, kalbos failas buvo panaikintas); jo ženklelis toliau rodo `id`. Jei kalbos failas grąžinamas, taip pat spalvos.
- Spalvos. highlight.js žymi tekstą klasėmis, tokiomis kaip `hljs-keyword`, `hljs-string`, `hljs-comment`. Jų spalvos nustatytos `assets/stylesheets/src/06_code.css`, naudojant „Redmine" paties sintaksės paryškinimo paletę.

## Kalbos failas

Pavyzdžiui, `routeros.js`:

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

| Laukas | Privalomas | Kas tai |
|---|---|---|
| `id` | taip | Kalbos pavadinimas išsaugotame HTML (`class="language-<id>"`). Leistini simboliai: `a-z`, `0-9`, `-`, `_`. **Niekada jo nekeiskite** kartą blokai su šia kalba buvo išsaugoti. |
| `label` | ne | Pavadinimas kalbų sąraše ir bloko ženklelyje. Numatytasis yra `id`. |
| `hint` | ne | Pilka pastaba šalia pavadinimo sąraše. |
| `keywords` | ne | Papildomi žodžiai sąrašo paieškai, atskirtis tarpais. |
| `grammar` | taip | highlight.js gramatika: funkcija `(hljs) => language definition`. |

`label`, `hint` ir `keywords` yra anglų kalba. Norint rodyti kalbą kitais vardais sąsajoje vartotojo sąsajos kalboje, arba padaryti ją ieškomą žodžiais tos kalbos, pridėkite įrašą į tos kalbos vertimo failą, `config/locales/<code>.yml`, po `code_languages:`. Žodžiai ten yra pridedami prie `keywords`; `label` ir `hint` keičia iš kalbos failo. `config/locales/ru.yml` turi pavyzdžius, taisyklės yra [config/locales/README.md](../../config/locales/README.md).

Failų rūšys aplanke:

- **Trumpa.** Nuoroda į gramatiką iš highlight.js npm paketo, kaip pavyzdyje; dauguma kalbų yra tokios. Gramatika gaunama iš highlight.js versijos, įrašytos į įskiepio `package-lock.json`.
- **Visa kopija.** Gramatikos kodas yra pačiame faile ir gali būti redaguojamas. Šie failai sukuriami konversijos skripto (žr. žemiau).
- **Savas gramatika.** `log.js`, `journalctl.js`, `cisco-ios.js`; jų bendros dalys yra `_common.js`.
- **Apvalkalas.** Paruošta gramatika kitame pavadinime: `cmd.js` yra `dos` iš highlight.js, `docker-compose.js` yra `yaml`.

Failai ir aplankai, kurių vardai prasideda `_`, nėra kalbos:

- `_compile.sh` statybi kalbas;
- `_check.mjs` tikrina kalbas statymo metu;
- `_common.js` turi bendras dalis įskiepio pačių gramatikų;
- `_convert_grammar.py` yra skreiptas, kuris konvertuoja highlight.js gramatika (žr. žemiau);
- `_vendor/` turi failus, kuriuos importuoja konvertuotos gramatika.

`README/` aplankas turi šią dokumentaciją.

## Kalbos pridėjimas iš highlight.js

Paruoštos gramatika (daugiau nei 190) yra čia: https://github.com/highlightjs/highlight.js/tree/main/src/languages. Jų vardai ir pseunonimiai yra išvardyti [SUPPORTED_LANGUAGES.md](https://github.com/highlightjs/highlight.js/blob/main/SUPPORTED_LANGUAGES.md), kartu su apie šimtu trečiosios šalies gramatikų, laikomų atskiroose saugyklose. Skreiptas `_convert_grammar.py` šiame aplanke konvertuoja bet kurią iš jų į įskiepio formatą.

Skreiptas reikalinga Python 3.6+ (nėra papildomų paketų) ir prieigą prie github.com. Paleiskite jį iš įskiepio aplanko:

```sh
cd /path/to/redmine/plugins/redmine_tiptap
python3 highlight/_convert_grammar.py erlang
sh highlight/_compile.sh
```

Argumentas `erlang` yra failo vardas `src/languages` be `.js`. Antroji komanda statybi kalbas ir juos tikrina. Tada paleiskite „Redmine" iš naujo (žr. [Statyba ir taikymas](#statyba-ir-taikymas)). „Windows" naudokite `py` arba `python` vietoj `python3`.

Pavyzdžiai:

```sh
# highlight.js kalbų sąrašas (* = jau highlight/), neprivaloma filtrų žodžiu
python3 highlight/_convert_grammar.py --list
python3 highlight/_convert_grammar.py --list sql

# kelios kalbos iš karto
python3 highlight/_convert_grammar.py erlang nix fsharp

# savoj vardas, užuomina ir paieškos žodžiai (viena kalba iš karto)
python3 highlight/_convert_grammar.py erlang --label "Erlang/OTP" --hint BEAM --keywords "erl otp"

# pakeisti trumpą failą, kurį šaukia įskiepis, su redaguojamą pilną kopiją
python3 highlight/_convert_grammar.py routeros --force --label RouterOS --hint MikroTik --keywords mikrotik

# kalba, dar ne išduoto highlight.js versijoje, iš torinės šakos
python3 highlight/_convert_grammar.py odin --ref main

# nuoroda į gramatikos failą, teisiai iš naršyklės adreso juostos
python3 highlight/_convert_grammar.py https://github.com/highlightjs/highlight.js/blob/main/src/languages/odin.js

# trečiosios šalies gramatika: nuoroda į jos saugyklą, skreiptas randa gramatikos failą
python3 highlight/_convert_grammar.py https://github.com/highlightjs/highlightjs-terraform

# vietinis gramatikos failas
python3 highlight/_convert_grammar.py ~/grammars/mylang.js --id mylang

# trumpas failas, kuris nukreipia npm paketą vietoj kodo kopijos
python3 highlight/_convert_grammar.py erlang --npm

# parodykite, kas būtų daryti, nekeisdami nieko
python3 highlight/_convert_grammar.py erlang --dry-run
```

### Ką daro skreiptas

1. Atsisiunčia `src/languages/<name>.js` highlight.js versijos, kurią paleida įskiepis. Versija skaitoma iš `package-lock.json` (dabar 11.12.0), nes gramatika yra parašyta savo versijos varikliui. `--ref` pasirenka kitą versiją, šaką arba įsipareigojimą.
2. Paimti kalbos pavadinimą iš gramatikos antraščio `Language:` eilutės ir paieškos žodžius iš jos pseunonimų (`aliases`). `id` yra gramatikos failo vardas.
3. Sudėti gramatikos kodą į `highlight/<id>.js` nepakitęs, išskyrus eksportą: `export default function(hljs)` tampa `function grammar(hljs)`, ir kalbos objektas `export default { id, label, keywords, grammar }` yra pridedamas failo gale. Jei gramatika yra CommonJS modulis (`module.exports = ...`), eilutė, deklaravusi `module` ir `exports`, yra prideda viršuje.
4. Jei gramatika importuoja kitus failus, atsisiunčia juos į `highlight/_vendor/<source>-<version>/` pagal tą patį kelią kaip saugykloje ir nustato importai ten. Pavyzdžiui, `typescript` importuoja `javascript.js` ir `lib/ecmascript.js`. Šie failai yra bendrinti visų kalbų iš tos pačios šaltinio ir versijos; nėra poreikio jų redaguoti.
5. Patikrinti `Requires:` eilutę, kuri išvardina kalbas, naudojamas įterpam kodui (pavyzdžiui, `php-template` reikalinga `xml` ir `php`). Jei jų nėra `highlight/`, spausdina komandą, kuri jas prideda. Be jų įterptas kodas tiesiog lieka nepersiųstas; tai nėra klaida.
6. Neperkraipinatot esamų failų be `--force` ir netikrina `id`, jau naudoto kito failo.

Po konversijos kalba gali būti redaguojama jos faile.

### Variantai

| Variantas | Ką daro |
|---|---|
| `LANGUAGE ...` | highlight.js kalbos pavadinimas, nuoroda į gramatikos failą arba trečiosios šalies gramatikos saugyklą GitHub, arba kelias į vietinį `.js` failą. |
| `--ref REF` | highlight.js versija (žyma), šaka arba įsipareigojimas. Numatytasis yra versija `package-lock.json`. Nuorodoms versija gaunama iš nuorodos. |
| `--id ID` | Kalbos `id`. Numatytasis yra gramatikos failo vardas. |
| `--label TEXT` | Pavadinimas sąraše ir ženklelyje. Numatytasis yra `Language:` iš gramatikos. |
| `--hint TEXT` | Pilka pastaba sąraše. |
| `--keywords TEXT` | Atskirtis tarpais paieškos žodžiai. Numatytasis: gramatikos pseunonimiai. |
| `--npm` | Vietoj kodo kopijos, parašyti trumpą failą, kuris nukreipia highlight.js npm paketą. Tik highlight.js kalboms. |
| `--force` | Pakeisti esamų failų. |
| `--dry-run` | Parodykite, kas būtų daryti, nekeisdami nieko. |
| `--list [WORD]` | Sąrašo highlight.js kalbos ir trečiosios šalies gramatika, neprivaloma filtrų žodžiu. |
| `--prune` | Panaikinti failai `_vendor/`, kurie jau nėra importuojami kalbai. |


**Kopija arba `--npm`?** Kopija rodo taisykles tiesiogiai faile: galite jas redaguoti, pasiimti gramatiką naujesnę nei diegtas paketas, arba trečiosios šalies. Kopija nesikeičia, kai įskiepis atnaujina highlight.js; norint jį atnaujinti, konvertuoti kalbą iš naujo su `--force`. Failas, padarytas su `--npm`, yra kelios linijos, ir jo gramatika yra atnaujinta kartu su įskiepiu.

## Statyba ir taikymas

```sh
sh highlight/_compile.sh
```

- Jei reikalinga Docker (statyba veikia `node:20-alpine` konteineriu) arba, jei nėra Docker, Node.js 18+ toje pačioje mašinoje. Pirmame paleidimu skreiptas diegias npm paketą į įskiepio `node_modules/` aplanką.
- Pirmiausia skreiptas patikrina kiekvieną kalbą: statybi ją atskirai, įkrauna, registruoja tą patį variklį, kuris veikia naršyklėje, ir paryškina bandymo tekstą. Jei kalba sugadinta (klaida kode, netinkama reguliarinė išraiška, `id` jau naudotas), skreiptas vardina failą ir priežastį ir sustabdo; ankstesnis `tiptap_highlight.js` lieka vietoje.
- Tada skreiptas surišias visas kalbas į `assets/javascripts/tiptap_highlight.js`.

Po statybo, paleiskite „Redmine" iš naujo: jis publikuoja įskiepio failas paleidimuose (žr. „Atnaujinimas" [pagrindiniam README](../../docs/README.lt.md#atnaujinimas) komandoms). Naršyklės gauna naują failą iš karto, nes jo URL turi turinio pirštai spalvomis.

Jei „Redmine" serveris neturi nei Docker nei Node.js, statyti bet kurioje mašinoje, kuri turi vieną iš jų (kopija įskiepio aplanko yra pakankamai), ir sudėkite gautą `assets/javascripts/tiptap_highlight.js` į serverį.

## Kalbos pašalinimas

Panaikinkite kalbos failą iš `highlight/`, statyti, ir paleiskite „Redmine" iš naujo. Išsaugoti blokai šioje kalboje lieka kaip jie yra ir rodomi kaip paprastas tekstas. Failai `_vendor/`, kurie jau nereikalingi, pašalinami su:

```sh
python3 highlight/_convert_grammar.py --prune
```

## Savos gramatika ir redagavimo taisyklės

- Gramatika yra funkcija, kuri gauna `hljs` objektą ir grąžina kalbos apibrėžimą: kuriuos tekstų gabalus žymėti ir kaip. Vadovas: https://highlightjs.readthedocs.io/en/latest/language-guide.html, nuoroda: https://highlightjs.readthedocs.io/en/latest/mode-reference.html. Pavyzdžiai: `log.js`, `journalctl.js`, `cisco-ios.js`.
- highlight.js sujungia reguliariąsias visų kalbos taisyklių išraiškas į vieną ir nepaiso jų pačių žymenų. Todėl negraudžią paiešką turi būti išrašyta (`[Ee]rror`) arba įgalinta visai kalbai su `case_insensitive: true`.
- Pirmenybė standartiniams žymams (`keyword`, `string`, `number`, `comment`, `title`, `attr`, `variable`, `built_in`, `literal`, `meta`, `symbol`, `type` ir t.t.): jie jau turi spalvos. Tavo klasė (pavyzdžiui, `scope: 'log-error'` pagamina klasę `hljs-log-error`) reikalinga taisyklė `assets/stylesheets/src/06_code.css` ir CSS statyba (`assets/stylesheets/src/_build.sh`).
- Norint pasiūlyti paruoštą gramatiką kitame pavadinime, daryti kaip `cmd.js` daro: šaukti originalus gramatika ir pakeisti `name` ir `aliases` jos rezultate. Jei pseunonimiai nėra pakeisti, nauja kalba jų iš originalios paima.

## Įskiepio atnaujinimas, kai pridėtos kalbos

git palieka jūsų failus `highlight/` nepaliestus. Bet `assets/javascripts/tiptap_highlight.js` naujoje įskiepio versijoje yra sukompiliuotas be jūsų kalbų, ir jūsų šios failo statyba trukdo `git pull`. Taigi:

```sh
cd /path/to/redmine/plugins/redmine_tiptap
git checkout -- assets/javascripts/tiptap_highlight.js
git pull
sh highlight/_compile.sh
```

Pirmoji komanda atmetamas jūsų statyba, paskutinė statybi kalbos iš naujo, taip pat jūsų. Tada paleiskite „Redmine" iš naujo. Jei redagavote kalbos failai, kurie suteikti su įskiepiu, git gali paprašyti išspręsti jų konfliktus.

Jei įskiepis buvo diegtas iš archyvo, išsaugokite savo kalbos failus ir `_vendor/` aplanką prieš pakeičiant įskiepio aplanką, sudėkite juos atgal afterwards, ir statyti kalbos.

## Dydis

Visos kalbos yra surištos į vieną failą; naršyklė atsisiunčia jį kartą ir tada jį paimti iš šios atminties. Dabar jis yra 226 KB 52 kalbų. Dauguma kalbų yra 1–10 KB, didžiausia yra 1C (55 KB).
