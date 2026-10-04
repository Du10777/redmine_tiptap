# Resaltado de sintaxis: idiomas

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

> *Esta traducción se realizó con la ayuda de un modelo de IA y no ha sido revisada por un hablante nativo. Si encuentras un error, por favor [abre un problema o una solicitud de extracción](https://github.com/Du10777/redmine_tiptap).*

Los bloques de código se resaltan tanto en el editor como en las páginas guardadas (peticiones, notas, wiki) y se ven igual en ambos. El idioma de un bloque se elige desde la insignia en su esquina superior derecha. La lista de idiomas se define mediante los archivos en la carpeta `highlight/`: un archivo es un idioma.

El complemento se incluye con 52 idiomas. Puedes agregar más: convertir una gramática de highlight.js lista con un script (ver [Agregar un idioma desde highlight.js](#agregar-un-idioma-desde-highlightjs)) o escribir la tuya propia.

## Cómo funciona

- El resaltado lo realiza [highlight.js](https://highlightjs.org) (a través de [lowlight](https://github.com/wooorm/lowlight)). El editor y las páginas guardadas utilizan el mismo motor, por lo que los colores coinciden.
- `_compile.sh` agrupa todos los archivos de idiomas en un archivo, `assets/javascripts/tiptap_highlight.js`. Este archivo ya está compilado en el repositorio, por lo que instalar el complemento no requiere compilación. Solo necesitas compilarlo cuando cambias el conjunto de idiomas.
- Redmine carga `tiptap_highlight.js` en cada página, antes que el editor (`tiptap_bundle.js`). Al cargarse, el editor registra todos los idiomas de ese archivo.
- En el editor, un bloque se resalta nuevamente 50 ms después de que dejes de escribir, y solo el bloque que cambió. En las páginas guardadas, un bloque se resalta cuando se desplaza hacia la vista. Un bloque dentro de una sección contraída se resalta cuando se abre la sección.
- El idioma se almacena en el HTML guardado: `<pre><code class="language-<id>">`. Por eso el `id` de un idioma nunca debe cambiar: los bloques guardados con el `id` antiguo se convertirían en texto sin formato.
- No hay detección automática de idioma: un bloque sin idioma se muestra como texto sin formato. También un bloque cuyo idioma no está en `highlight/` (por ejemplo, se eliminó el archivo del idioma); su insignia sigue mostrando el `id`. Si el archivo del idioma regresa, también lo hacen los colores.
- Colores. highlight.js marca el texto con clases como `hljs-keyword`, `hljs-string`, `hljs-comment`. Sus colores se establecen en `assets/stylesheets/src/06_code.css`, usando la paleta de resaltado de sintaxis de Redmine.

## Archivo de idioma

Por ejemplo, `routeros.js`:

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

| Campo | Requerido | Qué es |
|---|---|---|
| `id` | sí | Nombre del idioma en el HTML guardado (`class="language-<id>"`). Caracteres permitidos: `a-z`, `0-9`, `-`, `_`. **Nunca lo cambies** una vez que se han guardado bloques con este idioma. |
| `label` | no | Nombre en la lista de idiomas y en la insignia del bloque. Por defecto: `id`. |
| `hint` | no | Nota gris junto al nombre en la lista. |
| `keywords` | no | Palabras adicionales para la búsqueda de lista, separadas por espacios. |
| `grammar` | sí | Una gramática highlight.js: una función `(hljs) => language definition`. |

`label`, `hint` y `keywords` están en inglés. Para mostrar un idioma con otro nombre en la interfaz en el idioma del usuario, o para hacerlo buscable por palabras de ese idioma, agrega una entrada al archivo de traducción de ese idioma, `config/locales/<code>.yml`, bajo `code_languages:`. Las palabras allí se agregan a `keywords`; `label` e `hint` reemplazan los del archivo de idioma. `config/locales/ru.yml` tiene ejemplos, las reglas están en [config/locales/README.md](../../config/locales/README.md).

Tipos de archivos en la carpeta:

- **Corto.** Una referencia a una gramática del paquete npm highlight.js, como en el ejemplo anterior; la mayoría de los idiomas son así. La gramática proviene de la versión de highlight.js registrada en `package-lock.json` del complemento.
- **Copia completa.** El código de la gramática está en el archivo mismo y se puede editar. Estos archivos se crean mediante el script de conversión (ver abajo).
- **Gramática propia.** `log.js`, `journalctl.js`, `cisco-ios.js`; sus partes compartidas están en `_common.js`.
- **Envoltorio.** Una gramática lista bajo otro nombre: `cmd.js` es `dos` de highlight.js, `docker-compose.js` es `yaml`.

Los archivos y carpetas cuyos nombres comienzan con `_` no son idiomas:

- `_compile.sh` compila los idiomas;
- `_check.mjs` verifica los idiomas durante la compilación;
- `_common.js` contiene partes compartidas de las gramáticas propias del complemento;
- `_convert_grammar.py` es el script que convierte las gramáticas de highlight.js (ver abajo);
- `_vendor/` contiene archivos importados por gramáticas convertidas (creados por el script de conversión).

La carpeta `README/` contiene esta documentación.

## Agregar un idioma desde highlight.js

Las gramáticas listas (más de 190) están aquí: https://github.com/highlightjs/highlight.js/tree/main/src/languages. Sus nombres y alias se enumeran en [SUPPORTED_LANGUAGES.md](https://github.com/highlightjs/highlight.js/blob/main/SUPPORTED_LANGUAGES.md), junto con aproximadamente cien gramáticas de terceros mantenidas en repositorios separados. El script `_convert_grammar.py` en esta carpeta convierte cualquiera de ellas al formato del complemento.

El script necesita Python 3.6+ (sin paquetes adicionales) y acceso a github.com. Ejecútalo desde la carpeta del complemento:

```sh
cd /path/to/redmine/plugins/redmine_tiptap
python3 highlight/_convert_grammar.py erlang
sh highlight/_compile.sh
```

El argumento `erlang` es el nombre del archivo en `src/languages` sin `.js`. El segundo comando compila los idiomas y los verifica. Luego reinicia Redmine (ver [Compilación y aplicación](#compilación-y-aplicación)). En Windows usa `py` o `python` en lugar de `python3`.

Ejemplos:

```sh
# lista de idiomas de highlight.js (* = ya en highlight/), filtrada opcionalmente por una palabra
python3 highlight/_convert_grammar.py --list
python3 highlight/_convert_grammar.py --list sql

# varios idiomas a la vez
python3 highlight/_convert_grammar.py erlang nix fsharp

# nombre, hint y palabras de búsqueda personalizados (un idioma a la vez)
python3 highlight/_convert_grammar.py erlang --label "Erlang/OTP" --hint BEAM --keywords "erl otp"

# reemplazar un archivo corto incluido con el complemento con una copia completa editable
python3 highlight/_convert_grammar.py routeros --force --label RouterOS --hint MikroTik --keywords mikrotik

# un idioma que no está aún en una versión lanzada de highlight.js, desde la rama de desarrollo
python3 highlight/_convert_grammar.py odin --ref main

# un enlace a un archivo de gramática, directamente desde la barra de direcciones del navegador
python3 highlight/_convert_grammar.py https://github.com/highlightjs/highlight.js/blob/main/src/languages/odin.js

# una gramática de terceros: un enlace a su repositorio, el script encuentra el archivo de gramática
python3 highlight/_convert_grammar.py https://github.com/highlightjs/highlightjs-terraform

# un archivo de gramática local
python3 highlight/_convert_grammar.py ~/grammars/mylang.js --id mylang

# un archivo corto que hace referencia al paquete npm en lugar de una copia del código
python3 highlight/_convert_grammar.py erlang --npm

# mostrar qué se haría sin hacer cambios
python3 highlight/_convert_grammar.py erlang --dry-run
```

### Qué hace el script

1. Descarga `src/languages/<name>.js` de la versión highlight.js en la que se ejecuta el complemento. La versión se lee de `package-lock.json` (actualmente 11.12.0), porque las gramáticas se escriben para el motor de su versión. `--ref` selecciona otra versión, rama o confirmación.
2. Toma el nombre del idioma de la línea `Language:` del encabezado de la gramática y las palabras de búsqueda de sus alias (`aliases`). El `id` es el nombre del archivo de gramática.
3. Pone el código de la gramática en `highlight/<id>.js` sin cambios excepto por la exportación: `export default function(hljs)` se convierte en `function grammar(hljs)`, y el objeto de idioma `export default { id, label, keywords, grammar }` se agrega al final del archivo. Si la gramática es un módulo CommonJS (`module.exports = ...`), se agrega una línea que declara `module` y `exports` en la parte superior.
4. Si la gramática importa otros archivos, los descarga en `highlight/_vendor/<source>-<version>/` bajo las mismas rutas que en el repositorio y apunta las importaciones allí. Por ejemplo, `typescript` importa `javascript.js` y `lib/ecmascript.js`. Estos archivos se comparten entre todos los idiomas de la misma fuente y versión; no hay necesidad de editarlos.
5. Verifica la línea `Requires:`, que enumera los idiomas utilizados para código incrustado (por ejemplo, `php-template` necesita `xml` y `php`). Si no están en `highlight/`, imprime el comando que los agrega. Sin ellos, el código incrustado simplemente se queda sin color; esto no es un error.
6. No sobrescribe archivos existentes sin `--force` y no toma un `id` ya usado por otro archivo.

Después de la conversión, el idioma se puede editar directamente en su archivo.

### Opciones

| Opción | Qué hace |
|---|---|
| `LANGUAGE ...` | Un nombre de idioma highlight.js, un enlace a un archivo de gramática o a un repositorio de gramática de terceros en GitHub, o una ruta a un archivo `.js` local. |
| `--ref REF` | Versión de highlight.js (etiqueta), rama o confirmación. Por defecto: la versión en `package-lock.json`. Para enlaces, la versión se toma del enlace. |
| `--id ID` | `id` del idioma. Por defecto: el nombre del archivo de gramática. |
| `--label TEXT` | Nombre en la lista y en la insignia. Por defecto: `Language:` de la gramática. |
| `--hint TEXT` | Nota gris en la lista. |
| `--keywords TEXT` | Palabras de búsqueda separadas por espacios. Por defecto: los alias de la gramática. |
| `--npm` | En lugar de una copia del código, escribe un archivo corto que hace referencia al paquete npm de highlight.js. Solo para idiomas de highlight.js en sí. |
| `--force` | Sobrescribir archivos existentes. |
| `--dry-run` | Mostrar qué se haría sin hacer cambios. |
| `--list [WORD]` | Enumerar idiomas de highlight.js y gramáticas de terceros, filtrados opcionalmente por una palabra. |
| `--prune` | Eliminar archivos en `_vendor/` que ningún idioma importa más. |


**¿Copia o `--npm`?** Una copia muestra las reglas directamente en el archivo: puedes editarlas, tomar una gramática más nueva que el paquete instalado, o una de terceros. Una copia no cambia cuando el complemento actualiza highlight.js; para actualizar, convierte el idioma nuevamente con `--force`. Un archivo creado con `--npm` tiene pocas líneas, y su gramática se actualiza junto con el complemento.

## Compilación y aplicación

```sh
sh highlight/_compile.sh
```

- Necesita Docker (la compilación se ejecuta en un contenedor `node:20-alpine`) o, si no hay Docker, Node.js 18+ en la misma máquina. En la primera ejecución, el script instala paquetes npm en la carpeta `node_modules/` del complemento.
- Primero, el script verifica cada idioma: lo compila por separado, lo carga, lo registra en el mismo motor que se ejecuta en el navegador, y resalta un texto de ejemplo. Si un idioma está roto (un error en el código, una expresión regular inválida, un `id` ya utilizado), el script nombra el archivo y la razón y se detiene; el `tiptap_highlight.js` anterior permanece en su lugar.
- Luego, el script agrupa todos los idiomas en `assets/javascripts/tiptap_highlight.js`.

Después de la compilación, reinicia Redmine: publica archivos del complemento al iniciar (ver "Actualización" en el [README principal](../../docs/README.es.md#actualización) para los comandos). Los navegadores obtienen el nuevo archivo de inmediato, porque su URL contiene una huella digital del contenido.

Si el servidor Redmine no tiene Docker ni Node.js, compila en cualquier máquina que tenga uno de ellos (una copia de la carpeta del complemento es suficiente) y coloca el resultado `assets/javascripts/tiptap_highlight.js` en el servidor.

## Eliminar un idioma

Elimina el archivo del idioma de `highlight/`, compila y reinicia Redmine. Los bloques guardados en este idioma permanecen como están y se muestran como texto sin formato. Los archivos en `_vendor/` que ya no son necesarios se eliminan con:

```sh
python3 highlight/_convert_grammar.py --prune
```

## Gramáticas propias y reglas de edición

- Una gramática es una función que recibe el objeto `hljs` y devuelve una definición de idioma: qué partes de texto marcar y cómo. Guía: https://highlightjs.readthedocs.io/en/latest/language-guide.html, referencia: https://highlightjs.readthedocs.io/en/latest/mode-reference.html. Ejemplos: `log.js`, `journalctl.js`, `cisco-ios.js`.
- highlight.js une las expresiones regulares de todas las reglas de un idioma en una e ignora sus propias banderas. Entonces, la coincidencia sin distinción de mayúsculas y minúsculas debe escribirse explícitamente (`[Ee]rror`) o habilitarse para el idioma completo con `case_insensitive: true`.
- Prefiere las clases de token estándar (`keyword`, `string`, `number`, `comment`, `title`, `attr`, `variable`, `built_in`, `literal`, `meta`, `symbol`, `type` y similares): ya tienen colores. Una clase propia (por ejemplo, `scope: 'log-error'` produce la clase `hljs-log-error`) requiere una regla en `assets/stylesheets/src/06_code.css` y una recompilación CSS (`assets/stylesheets/src/_build.sh`).
- Para ofrecer una gramática lista bajo otro nombre, haz como `cmd.js`: llama a la gramática original y cambia `name` y `aliases` en su resultado. Si los alias no se reemplazan, el nuevo idioma los asume del original.

## Actualizar el complemento cuando has agregado idiomas

git deja tus archivos en `highlight/` intactos. Pero `assets/javascripts/tiptap_highlight.js` en la nueva versión del complemento se compila sin tus idiomas, y tu compilación de este archivo se interpone en `git pull`. Entonces:

```sh
cd /path/to/redmine/plugins/redmine_tiptap
git checkout -- assets/javascripts/tiptap_highlight.js
git pull
sh highlight/_compile.sh
```

El primer comando descarta tu compilación, el último compila los idiomas nuevamente, incluidos los tuyos. Luego reinicia Redmine. Si has editado archivos de idioma incluidos con el complemento, git puede pedirte que resuelvas conflictos en ellos.

Si el complemento se instaló desde un archivo, guarda tus archivos de idioma y la carpeta `_vendor/` antes de reemplazar la carpeta del complemento, vuelve a colocarlos después, y compila los idiomas.

## Tamaño

Todos los idiomas se agrupan en un archivo; el navegador lo descarga una vez y luego lo toma de la memoria caché. Actualmente es 226 KB para 52 idiomas. La mayoría de los idiomas ocupan 1-10 KB, el más grande es 1C (55 KB).
