# Realce de sintaxe: idiomas

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

> *Esta tradución foi feita coa axuda dun modelo de IA e non foi revisada por un falante nativo. Se atopas un erro, por favor [abre un problema ou unha solicitude de fusión](https://github.com/Du10777/redmine_tiptap).*

Os bloques de código realcanse tanto no editor como nas páxinas gardadas (peticións, notas, wiki) e teñen o mesmo aspecto en ambos. O idioma dun bloque elíxese no distintivo da súa esquina superior dereita. A lista de idiomas defínese polos ficheiros da carpeta `highlight/`: un ficheiro é un idioma.

O complemento inclúe 52 idiomas. Podes engadir máis: converte unha gramática preparada de highlight.js con un script (ver [Engadir un idioma desde highlight.js](#engadir-un-idioma-desde-highlightjs)) ou escribir o teu propio.

## Como funciona

- O realce faise por [highlight.js](https://highlightjs.org) (a través de [lowlight](https://github.com/wooorm/lowlight)). O editor e as páxinas gardadas usan o mesmo motor, polo que as cores coinciden.
- `_compile.sh` agrupa todos os ficheiros de idioma nun ficheiro, `assets/javascripts/tiptap_highlight.js`. Este ficheiro está no repositorio xa compilado, polo que a instalación do complemento non necesita compilación. Só necesitas compilar cando cambias o conxunto de idiomas.
- Redmine carga `tiptap_highlight.js` en cada páxina, antes do editor (`tiptap_bundle.js`). Ao cargar, o editor rexistra todos os idiomas deste ficheiro.
- No editor un bloque vuelve a realcarse 50 ms despois de que pausas escribir, e só o bloque que cambiou. Nas páxinas gardadas un bloque realcanse cando se desplaza á vista. Un bloque dentro dunha sección plegada realcanse cando se abre a sección.
- O idioma almacénase no HTML gardado: `<pre><code class="language-<id>">`. É por iso que o `id` dun idioma nunca debe cambiar: os bloques gardados coa `id` antiga converterían en texto plano.
- Non hai detección automática de idioma: un bloque sen idioma móstrase como texto plano. Así é un bloque cuxo idioma non está en `highlight/` (por exemplo, o ficheiro de idioma foi eliminado); o seu distintivo continúa amosando a `id`. Se volta o ficheiro de idioma, tamén fan as cores.
- Cores. highlight.js marca o texto con clases como `hljs-keyword`, `hljs-string`, `hljs-comment`. As súas cores establécense en `assets/stylesheets/src/06_code.css`, utilizando a paleta do resalte de sintaxe de Redmine.

## Ficheiro de idioma

Por exemplo, `routeros.js`:

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

| Campo | Obrigatorio | Que é |
|---|---|---|
| `id` | si | Nome de idioma no HTML gardado (`class="language-<id>"`). Caracteres permitidos: `a-z`, `0-9`, `-`, `_`. **Nunca o cambies** unha vez gardados bloques con este idioma. |
| `label` | non | Nome na lista de idiomas e no distintivo do bloque. Por defecto `id`. |
| `hint` | non | Nota gris ao lado do nome na lista. |
| `keywords` | non | Palabras adicionais para a busca da lista, separadas por espacios. |
| `grammar` | si | Unha gramática de highlight.js: unha función `(hljs) => language definition`. |

`label`, `hint` e `keywords` están en inglés. Para amosar un idioma baixo outro nome na lingua de interface do usuario, ou para facelo buscable por palabras dese idioma, engade unha entrada ao ficheiro de tradución dese idioma, `config/locales/<code>.yml`, baixo `code_languages:`. As palabras alí engádense a `keywords`; `label` e `hint` substitúen aos do ficheiro de idioma. `config/locales/ru.yml` ten exemplos, as regras están en [config/locales/README.md](../../config/locales/README.md).

Tipos de ficheiros na carpeta:

- **Curto.** Unha referencia a unha gramática do paquete npm de highlight.js, como no exemplo anterior; a maioría dos idiomas son así. A gramática vén da versión de highlight.js rexistrada no `package-lock.json` do complemento.
- **Copia completa.** O código da gramática está no ficheiro e pode ser editado. Estes ficheiros son creados polo script de conversión (ver abaixo).
- **Gramática propia.** `log.js`, `journalctl.js`, `cisco-ios.js`; as súas partes compartidas están en `_common.js`.
- **Envoltura.** Unha gramática preparada baixo outro nome: `cmd.js` é `dos` de highlight.js, `docker-compose.js` é `yaml`.

Os ficheiros e carpetas cuxos nomes comezar con `_` non son idiomas:

- `_compile.sh` compila os idiomas;
- `_check.mjs` comprobra os idiomas durante a compilación;
- `_common.js` almacena partes compartidas das gramáticas propias do complemento;
- `_convert_grammar.py` é o script que converte gramáticas de highlight.js (ver abaixo);
- `_vendor/` almacena ficheiros importados por gramáticas convertidas (creado polo script de conversión).

A carpeta `README/` contén esta documentación.

## Engadir un idioma desde highlight.js

As gramáticas preparadas (máis de 190) están aquí: https://github.com/highlightjs/highlight.js/tree/main/src/languages. Os seus nomes e alias están listados en [SUPPORTED_LANGUAGES.md](https://github.com/highlightjs/highlight.js/blob/main/SUPPORTED_LANGUAGES.md), xunto con aproximadamente cen gramáticas de terceiros gardadas en repositorios separados. O script `_convert_grammar.py` nesta carpeta converte calquera delas no formato do complemento.

O script require Python 3.6+ (sen paquetes extras) e acceso a github.com. Execútao desde a carpeta do complemento:

```sh
cd /path/to/redmine/plugins/redmine_tiptap
python3 highlight/_convert_grammar.py erlang
sh highlight/_compile.sh
```

O argumento `erlang` é o nome do ficheiro en `src/languages` sen `.js`. O segundo comando compila os idiomas e compróbaos. Despois reinicia Redmine (ver [Compilación e aplicación](#compilación-e-aplicación)). En Windows usa `py` ou `python` en lugar de `python3`.

Exemplos:

```sh
# lista de idiomas de highlight.js (* = xa en highlight/), opcionalmente filtrada por unha palabra
python3 highlight/_convert_grammar.py --list
python3 highlight/_convert_grammar.py --list sql

# varios idiomas á vez
python3 highlight/_convert_grammar.py erlang nix fsharp

# nome propio, suxestión e palabras de busca (un idioma á vez)
python3 highlight/_convert_grammar.py erlang --label "Erlang/OTP" --hint BEAM --keywords "erl otp"

# reemplaza un ficheiro curto que vén co complemento cunha copia completa editable
python3 highlight/_convert_grammar.py routeros --force --label RouterOS --hint MikroTik --keywords mikrotik

# un idioma non aínda nunha versión lanzada de highlight.js, desde a rama de desenvolvemento
python3 highlight/_convert_grammar.py odin --ref main

# unha ligazón a un ficheiro de gramática, directamente desde a barra de enderezos do navegador
python3 highlight/_convert_grammar.py https://github.com/highlightjs/highlight.js/blob/main/src/languages/odin.js

# unha gramática de terceiros: unha ligazón ao seu repositorio, o script atopa o ficheiro de gramática
python3 highlight/_convert_grammar.py https://github.com/highlightjs/highlightjs-terraform

# un ficheiro de gramática local
python3 highlight/_convert_grammar.py ~/grammars/mylang.js --id mylang

# un ficheiro curto que faz referencia ao paquete npm en lugar dunha copia do código
python3 highlight/_convert_grammar.py erlang --npm

# mostra o que se faría sen cambiar nada
python3 highlight/_convert_grammar.py erlang --dry-run
```

### Que fai o script

1. Descarga `src/languages/<name>.js` da versión de highlight.js na que se executa o complemento. A versión se le de `package-lock.json` (actualmente 11.12.0), porque as gramáticas están escritas para o motor da súa propia versión. `--ref` selecciona outra versión, rama ou commit.
2. Toma o nome do idioma da liña `Language:` da cabeceira da gramática e as palabras de busca dos seus alias (`aliases`). O `id` é o nome do ficheiro da gramática.
3. Coloca o código da gramática en `highlight/<id>.js` sen cambios excepto a exportación: `export default function(hljs)` convértese en `function grammar(hljs)`, e o obxecto de idioma `export default { id, label, keywords, grammar }` engádese ao final do ficheiro. Se a gramática é un módulo CommonJS (`module.exports = ...`), engádese unha liña que declara `module` e `exports` na parte superior.
4. Se a gramática importa outros ficheiros, descárgaos en `highlight/_vendor/<source>-<version>/` baixo os mesmos camiños que no repositorio e apunta os imports alí. Por exemplo, `typescript` importa `javascript.js` e `lib/ecmascript.js`. Estes ficheiros son compartidos por todos os idiomas da mesma fonte e versión; non é necesario editalos.
5. Comproba a liña `Requires:`, que lista os idiomas usados para código integrado (por exemplo, `php-template` necesita `xml` e `php`). Se non están en `highlight/`, imprime o comando que os engade. Sen eles o código integrado simplemente permanece sen cores; esto non é un erro.
6. Non sobrescribe ficheiros existentes sen `--force` e non toma un `id` xa utilizado por outro ficheiro.

Despois da conversión o idioma pode ser editado directamente no seu ficheiro.

### Opcións

| Opción | Que fai |
|---|---|
| `LANGUAGE ...` | Un nome de idioma de highlight.js, unha ligazón a un ficheiro de gramática ou a un repositorio de gramática de terceiros en GitHub, ou un camiño a un ficheiro local `.js`. |
| `--ref REF` | Versión de highlight.js (etiqueta), rama ou commit. Por defecto a versión en `package-lock.json`. Para ligazóns a versión se toma da ligazón. |
| `--id ID` | Idioma `id`. Por defecto o nome do ficheiro da gramática. |
| `--label TEXT` | Nome na lista e no distintivo. Por defecto `Language:` da gramática. |
| `--hint TEXT` | Nota gris na lista. |
| `--keywords TEXT` | Palabras de busca separadas por espacios. Por defecto: os alias da gramática. |
| `--npm` | En lugar dunha copia do código, escribe un ficheiro curto que fai referencia ao paquete npm de highlight.js. Só para idiomas de highlight.js mesmo. |
| `--force` | Sobrescribe ficheiros existentes. |
| `--dry-run` | Mostra o que se faría sen cambiar nada. |
| `--list [WORD]` | Lista idiomas de highlight.js e gramáticas de terceiros, opcionalmente filtradas por unha palabra. |
| `--prune` | Elimina ficheiros en `_vendor/` que ningún idioma xa importa. |


**Copia ou `--npm`?** Unha copia mostra as regras directamente no ficheiro: podes editalas, coller unha gramática máis nova que o paquete instalado, ou unha de terceiros. Unha copia non cambia cando o complemento anova highlight.js; para actualizala, converte o idioma de novo con `--force`. Un ficheiro feito con `--npm` é de apenas unhas poucas liñas, e a súa gramática se anova xunto co complemento.

## Compilación e aplicación

```sh
sh highlight/_compile.sh
```

- Require Docker (a compilación se executa nun contedor `node:20-alpine`) ou, se non hai Docker, Node.js 18+ na mesma máquina. Na primeira execución o script instala paquetes npm na carpeta `node_modules/` do complemento.
- Primeiro o script comproba cada idioma: o compila por separado, o carga, o rexistra no mesmo motor que se executa no navegador, e realca un texto de mostra. Se un idioma está roto (un erro no código, unha expresión regular inválida, un `id` xa utilizado), o script nomea o ficheiro e a razón e detense; o `tiptap_highlight.js` anterior permanece en lugar.
- Despois o script agrupa todos os idiomas en `assets/javascripts/tiptap_highlight.js`.

Despois da compilación, reinicia Redmine: publica ficheiros de complemento na posta en marcha (ver "Actualización" no [README principal](../../docs/README.gl.md#actualización) para os comandos). Os navegadores obteñen o ficheiro novo de inmediato, porque a súa URL contén un fingerprint do contido.

Se o servidor Redmine non ten Docker nin Node.js, compila en calquera máquina que teña un deles (é suficiente unha copia da carpeta do complemento) e pon o `assets/javascripts/tiptap_highlight.js` resultante no servidor.

## Eliminación dun idioma

Elimina o ficheiro de idioma de `highlight/`, compila, e reinicia Redmine. Os bloques gardados neste idioma permanecen como están e móstranse como texto plano. Os ficheiros en `_vendor/` que xa non se necesitan elimínanse con:

```sh
python3 highlight/_convert_grammar.py --prune
```

## Gramáticas propias e regras de edición

- Unha gramática é unha función que recibe o obxecto `hljs` e devolve unha definición de idioma: que pezas de texto marcar e como. Guía: https://highlightjs.readthedocs.io/en/latest/language-guide.html, referencia: https://highlightjs.readthedocs.io/en/latest/mode-reference.html. Exemplos: `log.js`, `journalctl.js`, `cisco-ios.js`.
- highlight.js xunta as expresións regulares de todas as regras dun idioma nunha e ignora as súas propias bandeiras. Así a coincidencia sen distinción de maiúsculas ten que ser deletreada (`[Ee]rror`) ou habilitada para todo o idioma con `case_insensitive: true`.
- Preferir as clases de token estándar (`keyword`, `string`, `number`, `comment`, `title`, `attr`, `variable`, `built_in`, `literal`, `meta`, `symbol`, `type` e así sucessivamente): xa teñen cores. Unha clase propia túa (por exemplo, `scope: 'log-error'` produce a clase `hljs-log-error`) require unha regra en `assets/stylesheets/src/06_code.css` e unha reconstrución CSS (`assets/stylesheets/src/_build.sh`).
- Para ofrecer unha gramática preparada baixo outro nome, fai como fai `cmd.js`: chama a gramática orixinal e cambia `name` e `aliases` no seu resultado. Se os alias non se reemplazan, o novo idioma tómaos do orixinal.

## Actualización do complemento cando engadiches idiomas

git deixa os teus ficheiros en `highlight/` sen tocar. Pero `assets/javascripts/tiptap_highlight.js` na nova versión do complemento está compilado sen os teus idiomas, e a túa compilación deste ficheiro interfire con `git pull`. Así pois:

```sh
cd /path/to/redmine/plugins/redmine_tiptap
git checkout -- assets/javascripts/tiptap_highlight.js
git pull
sh highlight/_compile.sh
```

O primeiro comando descarta a túa compilación, o último recompila os idiomas, incluíndo os teus. Despois reinicia Redmine. Se editaches ficheiros de idioma que vañen co complemento, git pode pediche que resuelvas conflictos neles.

Se o complemento foi instalado dende un arquivo, garda os teus ficheiros de idioma e a carpeta `_vendor/` antes de reemplazar a carpeta do complemento, póñoas de novo despois, e compila os idiomas.

## Tamaño

Todos os idiomas están agrupados nun ficheiro; o navegador descárgao unha vez e despois tómao da caché. Actualmente é 226 KB para 52 idiomas. A maioría dos idiomas toman 1–10 KB, o máis grande é 1C (55 KB).
