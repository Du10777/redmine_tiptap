# Ressaltat de sintaxi: llenguatges

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

> *Aquesta traducció s'ha realitzat amb l'ajuda d'un model d'IA i no ha estat revisada per un parlant natiu. Si detecteu un error, obriu una [incidència o una sol·licitud de fusió](https://github.com/Du10777/redmine_tiptap).*

Els blocs de codi es ressalten tant a l'editor com a les pàgines guardades (demandes, notes, wiki), i es veuen igual als dos. El llenguatge d'un bloc es tria desde la insígnia a la seva cantonada superior dreta. La llista de llenguatges es defineix pels fitxers de la carpeta `highlight/`: un fitxer és un llenguatge.

El complement s'envia amb 52 llenguatges. Podeu afegir-ne més: convertiu una gramàtica highlight.js preparada amb un script (veieu [Afegir un llenguatge desde highlight.js](#afegir-un-llenguatge-desde-highlightjs)) o escriviu la vostra.

## Com funciona

- El ressaltat es fa per [highlight.js](https://highlightjs.org) (a través de [lowlight](https://github.com/wooorm/lowlight)). L'editor i les pàgines guardades utilitzen el mateix motor, de manera que els colors coincideixen.
- `_compile.sh` empaqueta tots els fitxers de llenguatge en un fitxer, `assets/javascripts/tiptap_highlight.js`. Aquest fitxer es compromet al dipòsit ja compilat, de manera que instal·lar el complement no requereix compilació. Només cal compilar quan canvieu el conjunt de llenguatges.
- Redmine carrega `tiptap_highlight.js` a cada pàgina, abans de l'editor (`tiptap_bundle.js`). Al carregament, l'editor registra tots els llenguatges d'aquest fitxer.
- A l'editor, un bloc es ressalta 50 ms després que pareu de teclejar, i només el bloc que va canviar. A les pàgines guardades, un bloc es ressalta quan es desplaça cap a la vista. Un bloc dins d'una secció col·lapsada es ressalta quan s'obri la secció.
- El llenguatge es guarda al HTML guardat: `<pre><code class="language-<id>">`. Per això l'`id` d'un llenguatge mai no ha de canviar: els blocs guardats amb l'antic `id` es convertirien en text sense format.
- No hi ha detecció automàtica de llenguatge: un bloc sense llenguatge es mostra com a text sense format. Igual amb un bloc el llenguatge del qual no està a `highlight/` (per exemple, el fitxer de llenguatge va ser suprimit); la seva insígnia continua mostrant l'`id`. Si el fitxer de llenguatge torna, igual els colors.
- Colors. highlight.js marca el text amb classes com `hljs-keyword`, `hljs-string`, `hljs-comment`. Els seus colors es defineixen a `assets/stylesheets/src/06_code.css`, usant la paleta del ressaltat de sintaxi propi de Redmine.

## Fitxer de llenguatge

Per exemple, `routeros.js`:

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

| Camp | Obligatori | Què és |
|---|---|---|
| `id` | sí | Nom del llenguatge al HTML guardat (`class="language-<id>"`). Caràcters permesos: `a-z`, `0-9`, `-`, `_`. **No el canvieu mai** un cop blocs amb aquest llenguatge s'han guardat. |
| `label` | no | Nom a la llista de llenguatges i a la insígnia del bloc. Per defecte, `id`. |
| `hint` | no | Nota gris al costat del nom a la llista. |
| `keywords` | no | Paraules addicionals per a la cerca a la llista, separades per espais. |
| `grammar` | sí | Una gramàtica highlight.js: una funció `(hljs) => language definition`. |

`label`, `hint` i `keywords` són en anglès. Per mostrar un llenguatge amb un altre nom a l'idioma de la interfície d'un usuari, o per fer-lo trobar amb paraules d'aquest idioma, afegiu una entrada al fitxer de traducció d'aquest idioma, `config/locales/<code>.yml`, sota `code_languages:`. Les paraules allí afegeixen a `keywords`; `label` i `hint` reemplacen els del fitxer de llenguatge. `config/locales/ru.yml` té exemples, les normes estan a [config/locales/README.md](../../config/locales/README.md).

Tipus de fitxers a la carpeta:

- **Curt.** Una referència a una gramàtica del paquet npm highlight.js, com en l'exemple anterior; la majoria de llenguatges són així. La gramàtica prové de la versió de highlight.js registrada a `package-lock.json` del complement.
- **Còpia sencera.** El codi de la gramàtica es trobarà al fitxer mateix i es pot editar. Aquests fitxers es creen pel script de conversió (veieu més avall).
- **Gramàtica pròpia.** `log.js`, `journalctl.js`, `cisco-ios.js`; les parts comunes estan a `_common.js`.
- **Embolcall.** Una gramàtica preparada amb un altre nom: `cmd.js` és `dos` desde highlight.js, `docker-compose.js` és `yaml`.

Fitxers i carpetes els noms dels quals comencen amb `_` no són llenguatges:

- `_compile.sh` compila els llenguatges;
- `_check.mjs` verifica els llenguatges durant la compilació;
- `_common.js` manté parts compartides de les gramàtiques pròpies del complement;
- `_convert_grammar.py` és el script que converteix les gramàtiques de highlight.js (veieu més avall);
- `_vendor/` manté fitxers importats per gramàtiques convertides (creats pel script de conversió).

La carpeta `README/` manté aquesta documentació.

## Afegir un llenguatge desde highlight.js

Les gramàtiques preparades (més de 190) es troben aquí: https://github.com/highlightjs/highlight.js/tree/main/src/languages. Els seus noms i àlies es llisten a [SUPPORTED_LANGUAGES.md](https://github.com/highlightjs/highlight.js/blob/main/SUPPORTED_LANGUAGES.md), juntament amb cent de gramàtiques de tercers mantingudes en dipòsits separats. El script `_convert_grammar.py` en aquesta carpeta converteix qualsevol d'ells al format del complement.

L'script necessita Python 3.6+ (sense paquets addicionals) i accés a github.com. Executeu-lo desde la carpeta del complement:

```sh
cd /path/to/redmine/plugins/redmine_tiptap
python3 highlight/_convert_grammar.py erlang
sh highlight/_compile.sh
```

L'argument `erlang` és el nom del fitxer a `src/languages` sense `.js`. La segona comanda compila els llenguatges i els verifica. Després reinicieu Redmine (veieu [Compilar i aplicar](#compilar-i-aplicar)). A Windows useu `py` o `python` en lloc de `python3`.

Exemples:

```sh
# llista de llenguatges de highlight.js (* = ja a highlight/), opcionalment filtrat per una paraula
python3 highlight/_convert_grammar.py --list
python3 highlight/_convert_grammar.py --list sql

# diversos llenguatges alhora
python3 highlight/_convert_grammar.py erlang nix fsharp

# nom, pista i paraules de cerca propis (un llenguatge alhora)
python3 highlight/_convert_grammar.py erlang --label "Erlang/OTP" --hint BEAM --keywords "erl otp"

# reemplaçar un fitxer curt enviat amb el complement per una còpia completa editable
python3 highlight/_convert_grammar.py routeros --force --label RouterOS --hint MikroTik --keywords mikrotik

# un llenguatge encara no a una versió publicada de highlight.js, desde la branca de desenvolupament
python3 highlight/_convert_grammar.py odin --ref main

# un enllaç a un fitxer de gramàtica, directament desde la barra d'adreça del navegador
python3 highlight/_convert_grammar.py https://github.com/highlightjs/highlight.js/blob/main/src/languages/odin.js

# una gramàtica de tercers: un enllaç al seu dipòsit, l'script troba el fitxer de gramàtica
python3 highlight/_convert_grammar.py https://github.com/highlightjs/highlightjs-terraform

# un fitxer de gramàtica local
python3 highlight/_convert_grammar.py ~/grammars/mylang.js --id mylang

# un fitxer curt que referencia el paquet npm en lloc d'una còpia del codi
python3 highlight/_convert_grammar.py erlang --npm

# mostrar què es faria sense canviar res
python3 highlight/_convert_grammar.py erlang --dry-run
```

### Què fa l'script

1. Descarrega `src/languages/<name>.js` de la versió de highlight.js que executa el complement. La versió es llegeix desde `package-lock.json` (actualment 11.12.0), perquè les gramàtiques s'escriuen per al motor de la seva pròpia versió. `--ref` trieu una altra versió, branca o commit.
2. Pren el nom del llenguatge desde la línia `Language:` de la capçalera de la gramàtica i les paraules de cerca des dels seus àlies (`aliases`). L'`id` és el nom del fitxer de la gramàtica.
3. Posa el codi de la gramàtica a `highlight/<id>.js` incanviat excepte l'exportació: `export default function(hljs)` esdevé `function grammar(hljs)`, i l'objecte de llenguatge `export default { id, label, keywords, grammar }` s'afegeix al final del fitxer. Si la gramàtica és un mòdul CommonJS (`module.exports = ...`), una línia que declara `module` i `exports` s'afegeix a la part superior.
4. Si la gramàtica importa altres fitxers, els descarrega a `highlight/_vendor/<source>-<version>/` sota els mateixos camins que al dipòsit i apunta les importacions allà. Per exemple, `typescript` importa `javascript.js` i `lib/ecmascript.js`. Aquests fitxers es comparteixen per tots els llenguatges de la mateixa font i versió; no cal editar-los.
5. Verifica la línia `Requires:`, que llista els llenguatges usats per codi incrustrat (per exemple, `php-template` necessita `xml` i `php`). Si no estan a `highlight/`, imprimeix la comanda que els afegeix. Sense ells el codi incrustat simplement es manté sense color; això no és un error.
6. No sobreescriu fitxers existents sense `--force` i no pren un `id` ja usat per un altre fitxer.

Després de la conversió el llenguatge es pot editar directament al seu fitxer.

### Opcions

| Opció | Què fa |
|---|---|
| `LANGUAGE ...` | Un nom de llenguatge de highlight.js, un enllaç a un fitxer de gramàtica o a un dipòsit de gramàtica de tercers a GitHub, o un camí a un fitxer `.js` local. |
| `--ref REF` | Versió de highlight.js (etiqueta), branca o commit. Per defecte, la versió a `package-lock.json`. Per als enllaços la versió es pren de l'enllaç. |
| `--id ID` | `id` del llenguatge. Per defecte, el nom del fitxer de la gramàtica. |
| `--label TEXT` | Nom a la llista i a la insígnia. Per defecte, `Language:` de la gramàtica. |
| `--hint TEXT` | Nota gris a la llista. |
| `--keywords TEXT` | Paraules de cerca separades per espais. Per defecte: els àlies de la gramàtica. |
| `--npm` | En lloc d'una còpia del codi, escriviu un fitxer curt que referencia el paquet npm de highlight.js. Només per a llenguatges de highlight.js mateix. |
| `--force` | Reemplaceu fitxers existents. |
| `--dry-run` | Mostrar què es faria sense canviar res. |
| `--list [WORD]` | Llista els llenguatges de highlight.js i les gramàtiques de tercers, opcionalment filtrades per una paraula. |
| `--prune` | Suprimiu fitxers a `_vendor/` que cap llenguatge importa més. |


**Còpia o `--npm`?** Una còpia mostra les normes directament al fitxer: podeu editar-les, prendre una gramàtica més nova que el paquet instal·lat, o una de tercers. Una còpia no canvia quan el complement fa upgrade de highlight.js; per refrescar-la, convertiu el llenguatge novament amb `--force`. Un fitxer feta amb `--npm` és uns quants de línies, i la sua gramàtica s'actualitza juntament amb el complement.

## Compilar i aplicar

```sh
sh highlight/_compile.sh
```

- Necessita Docker (la compilació s'executa a un contenidor `node:20-alpine`) o, si no hi ha Docker, Node.js 18+ a la mateixa màquina. A la primera execució l'script instal·la paquets npm a la carpeta `node_modules/` del complement.
- Primer l'script verifica cada llenguatge: el compila separadament, el carrega, el registra al mateix motor que executa al navegador, i ressalta un text de mostra. Si un llenguatge és trencador (un error al codi, una expressió regular no vàlida, un `id` ja pres), l'script en nomena el fitxer i la raó i s'atura; el anterior `tiptap_highlight.js` es manté en lloc.
- Després l'script empaqueta tots els llenguatges a `assets/javascripts/tiptap_highlight.js`.

Després de la compilació, reinicieu Redmine: es publicarà els fitxers del complement a l'inici (veieu "Actualitzar" al [README principal](../../docs/README.ca.md#actualització) pels comandos). Els navegadors obtenen el fitxer nou immediatament, perquè el seu URL conté una empremta del contingut.

Si el servidor de Redmine ni té Docker ni Node.js, compileu en qualsevol màquina que en tingui un (una còpia de la carpeta del complement és suficient) i poseu el resultat `assets/javascripts/tiptap_highlight.js` al servidor.

## Suprimir un llenguatge

Suprimiu el fitxer de llenguatge desde `highlight/`, compileu, i reinicieu Redmine. Els blocs guardats en aquest llenguatge romanen com estaven i es mostren com a text sense format. Els fitxers a `_vendor/` que ja no es necessiten es suprimeixen amb:

```sh
python3 highlight/_convert_grammar.py --prune
```

## Gramàtiques pròpies i normes d'edició

- Una gramàtica és una funció que rep l'objecte `hljs` i retorna una definició de llenguatge: quins fragments de text marcar i com. Guia: https://highlightjs.readthedocs.io/en/latest/language-guide.html, referència: https://highlightjs.readthedocs.io/en/latest/mode-reference.html. Exemples: `log.js`, `journalctl.js`, `cisco-ios.js`.
- highlight.js uneix les expressions regulars de totes les normes d'un llenguatge en una i ignora les seves pròpies baneres. Així que la concordança sense diferenciar majúscules i minúscules s'ha d'escriure (com `[Ee]rror`) o habilitar per a tot el llenguatge amb `case_insensitive: true`.
- Preferiu els tipus de token estàndard (`keyword`, `string`, `number`, `comment`, `title`, `attr`, `variable`, `built_in`, `literal`, `meta`, `symbol`, `type` i similars): ja hi ha colors. Una classe vostra (per exemple, `scope: 'log-error'` produeix la classe `hljs-log-error`) necessita una norma a `assets/stylesheets/src/06_code.css` i una recompilació de CSS (`assets/stylesheets/src/_build.sh`).
- Per oferir una gramàtica preparada amb un altre nom, feu com `cmd.js`: crideu la gramàtica original i canvieu `name` i `aliases` al seu resultat. Si els àlies no es reemplacen, el novo llenguatge els pren de l'original.

## Actualitzar el complement quan heu afegit llenguatges

git deixa els vostres fitxers a `highlight/` sols. Però `assets/javascripts/tiptap_highlight.js` a la nova versió del complement es compila sense els vostres llenguatges, i la vostra compilació d'aquest fitxer fa falta pels `git pull`. Així que:

```sh
cd /path/to/redmine/plugins/redmine_tiptap
git checkout -- assets/javascripts/tiptap_highlight.js
git pull
sh highlight/_compile.sh
```

El primer comanda descarta la vostra compilació, l'últim compila els llenguatges novament, incloent els vostres. Després reinicieu Redmine. Si heu editat fitxers de llenguatge enviats amb el complement, git pot demanar-vos que resolgueu conflictes en ells.

Si el complement s'ha instal·lat desde un arxiu, deseu els vostres fitxers de llenguatge i la carpeta `_vendor/` abans de reemplaçar la carpeta del complement, poseu-los de nou després, i compileu els llenguatges.

## Mida

Tots els llenguatges s'empaqueten en un fitxer; el navegador el descarrega un cop i després el pren des de la memòria cau. Actualment és 226 KB per 52 llenguatges. La majoria dels llenguatges prenen 1–10 KB, el més gran és 1C (55 KB).
