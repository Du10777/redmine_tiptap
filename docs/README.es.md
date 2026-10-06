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

> *Esta traducción se realizó con la ayuda de un modelo de IA y no ha sido revisada por un hablante nativo. Si encuentras un error, por favor [abre un problema o una solicitud de extracción](https://github.com/Du10777/redmine_tiptap).*

Este es un editor de texto para Redmine, basado en TipTap https://github.com/ueberdosis/tiptap

**[Prueba el editor en línea](https://du10777.github.io/redmine_tiptap/)**: la página de demostración ejecuta el editor de este complemento directamente en tu navegador, en una página hecha como un formulario de Redmine. Escribe y da formato al texto, pega una imagen, abre la pestaña «Previsualizar» para ver cómo quedará el texto una vez guardado, cambia el idioma de la interfaz o elige un texto de ejemplo. No hay nada que instalar y no se envía nada a ningún sitio.

[![El editor en la página de demostración](../docs/images/demo.png)](https://du10777.github.io/redmine_tiptap/)

Motor del editor: **TipTap 3.31.4**. Todos los paquetes `@tiptap/*` están fijados a esta versión exacta en `package.json` y `package-lock.json` y siempre deben actualizarse juntos, a la misma versión exacta.

**Contenido**

- [Versiones de Redmine compatibles](#versiones-de-redmine-compatibles)
- [Características](#características)
  - [Formato de texto](#formato-de-texto)
  - [Listas](#listas)
  - [Tablas](#tablas)
  - [Imágenes y adjuntos](#imágenes-y-adjuntos)
  - [Código](#código)
  - [Bloques](#bloques)
  - [Edición](#edición)
  - [Integración con Redmine](#integración-con-redmine)
- [Resaltado de sintaxis](#resaltado-de-sintaxis)
- [Idioma de la interfaz](#idioma-de-la-interfaz)
- [Instalación](#instalación)
- [Actualización](#actualización)
  - [Instalado con git (recomendado)](#instalado-con-git-recomendado)
  - [Instalado desde un archivo](#instalado-desde-un-archivo)
  - [Después de actualizar](#después-de-actualizar)
- [Migración desde CKEditor](#migración-desde-ckeditor)

## Versiones de Redmine compatibles

| Redmine | Compatible | Probado en |
|---|---|---|
| 7.x | sí | 7.0.2 |
| 6.x | sí | 6.1.4, 6.1.5 |
| 5.x y anteriores | no | — |

Una nueva versión mayor (8.x y posteriores) solo pasa a ser compatible después de probar el complemento en ella. Hasta entonces, Redmine de esa versión no arranca con el complemento instalado: se detiene con un error que indica las versiones compatibles.

## Características

### Formato de texto
- Negrita, cursiva, subrayado, tachado, subíndice y superíndice (Ctrl+, y Ctrl+.), código en línea.
- Color de texto y color de fondo: una paleta de 64 colores o cualquier valor hexadecimal.
- Familia de fuentes (13 fuentes) y tamaño de fuente (valores preestablecidos de 8 a 72 px, u otro valor).
- Estilos de párrafo: encabezados 1-6 y texto normal.
- Alineación (izquierda, centro, derecha, justificada) e indentación (hasta 8 niveles) de párrafos y encabezados.
- Enlaces: insertar, editar, eliminar.
- Línea horizontal, deshacer y rehacer.

### Listas
- Listas con viñetas con marcadores de disco, círculo o cuadrado.
- Listas numeradas: 1, 01, a, A, i, I, α.
- Listas de tareas con casillas de verificación; las tareas completadas están tachadas.
- Listas anidadas (Tab / Mayús+Tab).

### Tablas
- Insertar una tabla de cualquier tamaño, con o sin fila de encabezado.
- Menú del botón derecho en una celda: agregar y eliminar filas y columnas, combinar y dividir celdas, fila de encabezado y columna de encabezado, eliminar la tabla.
- El ancho de las columnas se cambia arrastrando los bordes de las celdas.
- Pegando desde Excel se conservan el ancho de las columnas, la alineación y los tamaños de fuente; una tabla copiada desde Redmine se pega en Excel con bordes.

### Imágenes y adjuntos
- Pegar una imagen desde el portapapeles: se carga como un adjunto y aparece en el texto.
- Las imágenes adjuntas con el campo de archivo de Redmine, o arrastradas sobre él, también se insertan en el texto.
- Insertar una imagen desde los adjuntos (selector de miniaturas) o un enlace a cualquier adjunto.
- Redimensionar una imagen arrastrando sus esquinas.

### Código
- Bloques de código con resaltado de sintaxis en el editor y en las páginas guardadas: 52 idiomas, y puedes agregar más (ver [Resaltado de sintaxis](#resaltado-de-sintaxis)).
- El idioma de un bloque se elige desde una insignia en su esquina, con búsqueda, idiomas recientes y frecuentes.
- Tab y Mayús+Tab indenta y desindenta líneas dentro de un bloque de código; se mantienen la negrita, los enlaces y los colores dentro del código.

### Bloques
- Bloque contraíble: un título con contenido oculto (`<details>`). Contraído en las páginas guardadas, expandido en el editor.
- Bloque de cita con una línea de autor y fecha.

### Edición
- Modo `<HTML>` para ver y editar la fuente HTML: los bloques anidados se indentan, una línea en blanco separa los bloques que ocupan varias líneas, la sintaxis se colorea con las mismas reglas que un bloque de código HTML, y Enter mantiene la indentación de la línea.
- Escritura al estilo Markdown: `#` para encabezados, `-` y `1.` para listas, `[ ]` para tareas, ```` ```python ```` para un bloque de código (cualquier nombre de idioma o ninguno), `**bold**`, `---` para una línea horizontal. Atajos de teclado estándar: Ctrl+B, Ctrl+I, Ctrl+U, Ctrl+Z y otros.
- El editor nunca crece más alto que la ventana: la barra de herramientas y los botones del formulario permanecen visibles, y el texto se desplaza dentro. La altura sigue el tamaño de la ventana y el zoom de la página.
- Un tirador de redimensionamiento en la esquina inferior derecha permite establecer la altura manualmente. La altura se recuerda; hacer doble clic vuelve a la altura automática.

### Integración con Redmine
- Funciona en todos los campos de texto de Redmine con formato: descripciones y notas de peticiones, páginas wiki, noticias, mensajes del foro, documentos, descripciones de proyectos, campos personalizados de texto largo, incluidos los campos que aparecen en la página más adelante.
- El texto se almacena como HTML. Para usar el editor, elige *TipTap HTML* como formato de texto en la configuración de Redmine.
- La interfaz (información sobre herramientas, menús, diálogos) sigue el idioma en el perfil de Redmine del usuario. 47 de los 50 idiomas de Redmine se incluyen con el complemento: inglés y ruso están completos, los otros 45 son borradores hechos con un modelo de IA que los hablantes nativos pueden corregir. Los tres idiomas escritos de derecha a izquierda (árabe, hebreo, persa) deliberadamente no son compatibles (ver [Idioma de la interfaz](#idioma-de-la-interfaz)).
- Se mantiene rápido en textos grandes: los editores en formularios ocultos se crean solo cuando se abre el formulario, y los bloques de código largos se resaltan cuando se desplazan hacia la vista.
- Los textos escritos en CKEditor (el complemento redmine_ckeditor) se muestran tal como estaban y se abren en el editor con su formato: sin conversión, ver [Migración desde CKEditor](#migración-desde-ckeditor).
- Los textos guardados se muestran sin HTML inseguro: los scripts, los manejadores de eventos y los enlaces `javascript:` se eliminan cuando se muestra una página; solo se mantiene lo que produce el editor mismo. Esto también se aplica a los textos que llegan a través de la API REST o el modo `<HTML>`.

## Resaltado de sintaxis

Los bloques de código se resaltan en el editor y en las páginas guardadas de la misma manera. El idioma de un bloque se elige desde la insignia en su esquina superior derecha; la lista tiene un cuadro de búsqueda y recuerda los idiomas usados recientemente y frecuentemente.

52 idiomas se incluyen con el complemento, entre ellos HTML, 1C, Cisco IOS, MikroTik RouterOS, Windows cmd, docker compose, registros de servicios de Linux y salida de journalctl.

Puedes agregar tus propios idiomas. Cada idioma es un archivo en la carpeta `highlight/`. Cualquiera de las más de 190 gramáticas de highlight.js, o una de terceros, se convierte en un archivo de este tipo con un comando:

```sh
python3 highlight/_convert_grammar.py erlang
sh highlight/_compile.sh
```

Detalles: [highlight/README/es.md](../highlight/README/es.md).

## Idioma de la interfaz

El editor habla el idioma elegido en el perfil de Redmine del usuario (Mi cuenta → Idioma). Se incluyen archivos para 47 de los 50 idiomas de Redmine con el complemento, en `config/locales/`. El inglés es el origen y el ruso es del autor; los otros 45 son borradores hechos con la ayuda de un modelo de IA y aún no revisados por hablantes nativos, así que espera alguna frase extraña aquí y allá. Un texto faltante en un archivo se muestra en inglés.

Para corregir una traducción, cambia sus valores en `config/locales/<code>.yml` (`de`, `fr`, `pt-BR`, ...) y reinicia Redmine. `bundle exec rake redmine_tiptap:locales` verifica los archivos. Se aceptan solicitudes de extracción con correcciones.

**Los idiomas escritos de derecha a izquierda (árabe, hebreo, persa) deliberadamente no son compatibles.** Admitirlos requiere muchos cambios en la base de código, no solo una traducción, y elegimos no hacerlo. Para estos idiomas el editor se muestra en inglés y su diseño no se ajusta. Si necesitas uno de ellos, haz un fork: el mecanismo de traducción está listo, y lo que más debe cambiar se enumera en [config/locales/README.md](../config/locales/README.md#right-to-left-languages).

Detalles y lista de idiomas de Redmine: [config/locales/README.md](../config/locales/README.md).

## Instalación

1. Coloca el complemento en la carpeta `plugins` de Redmine. La carpeta debe llamarse `redmine_tiptap`. La forma más fácil es usar git, que también hace que las actualizaciones sean un solo comando:
   ```sh
   cd /path/to/redmine
   git clone --branch release --single-branch --depth 1 https://github.com/Du10777/redmine_tiptap.git plugins/redmine_tiptap
   ```
   La rama `release` solo tiene los archivos que el complemento necesita para funcionar, sin esta documentación, y `--depth 1` no descarga el historial del repositorio.
2. Reinicia Redmine.
3. En la configuración de Redmine (redmine.selfhosted/_settings_) elige Formato de texto: *TipTap HTML*.

## Actualización

El complemento no tiene migraciones de base de datos, y el conjunto JavaScript compilado y la hoja de estilo son parte del repositorio. Actualizar no requiere npm ni una compilación en el servidor: reemplaza los archivos del complemento y reinicia Redmine.

Antes de actualizar, verifica que la nueva versión sea compatible con tu versión de Redmine (ver "Versiones de Redmine compatibles" arriba).

### Instalado con git (recomendado)

```sh
cd /path/to/redmine/plugins/redmine_tiptap
git pull
```

Luego reinicia Redmine, por ejemplo:

```sh
sudo systemctl restart redmine          # Redmine ejecutándose como servicio systemd
touch /path/to/redmine/tmp/restart.txt  # Passenger
docker compose restart redmine          # Docker
```

Para quedarte en una versión concreta en lugar de la más reciente, descarga un commit de la rama `release` y cambia a él: `git fetch --depth 1 origin <commit> && git checkout <commit>`.

Si el complemento se instaló con un `git clone` normal (la rama `main`, con la documentación y todo el historial), pásate a la rama `release` una sola vez: elimina la carpeta `plugins/redmine_tiptap` y vuelve a instalar el complemento como se describe en [Instalación](#instalación). El complemento no guarda nada propio en su carpeta, así que no se pierde nada; solo los lenguajes de resaltado de código que hayas añadido tú tienen que copiarse antes fuera de `highlight/`.

### Instalado desde un archivo

1. Descarga el archivo de la rama `release`: https://github.com/Du10777/redmine_tiptap/archive/refs/heads/release.zip. Elimina la carpeta antigua `plugins/redmine_tiptap` y descomprime el archivo en su lugar; la carpeta del archivo se llama `redmine_tiptap-release`, cámbiale el nombre a `redmine_tiptap`. Eliminarla primero asegura que no queden archivos que la nueva versión ya no tiene.
2. Elimina `public/assets/.manifest.json` en la carpeta de Redmine.
3. Reinicia Redmine.

El paso 2 es importante. Al iniciar, Redmine vuelve a publicar los activos del complemento solo si sus archivos son más nuevos que este manifiesto. Los archivos descomprimidos de un archivo mantienen sus marcas de tiempo originales, así que sin el paso 2 Redmine puede seguir sirviendo el editor antiguo. El manifiesto se recrea automáticamente al iniciar. Con `git pull` este paso no es necesario: git da a los archivos modificados la hora actual.

### Después de actualizar

- El script y la hoja de estilo del editor se sirven con una huella digital de contenido en sus URLs, por lo que los navegadores cargan la nueva versión justo después del reinicio. Los usuarios no necesitan limpiar la memoria caché de su navegador.
- Si *Cachear texto formateado* está habilitado en la configuración de Redmine (Administración → Configuración → General), limpia la memoria caché de Redmine una vez después de actualizar a una versión que cambia cómo se muestran los textos (limpieza HTML, soporte de textos de CKEditor): `bundle exec rake tmp:cache:clear RAILS_ENV=production` en la carpeta de Redmine. De lo contrario, las páginas generadas antes de la actualización pueden mostrarse desde la memoria caché, sin limpiar, hasta que su texto cambie.
- Las versiones anteriores del complemento copiaban el script a `public/tiptap_bundle.js`. Estos archivos ya no se usan y se pueden eliminar:
  ```sh
  rm -f /path/to/redmine/public/tiptap_bundle.js /path/to/redmine/public/tiptap_bundle.js.map
  ```

## Migración desde CKEditor

Si tu Redmine utilizaba [redmine_ckeditor](https://github.com/a-ono/redmine_ckeditor), puedes cambiar a este complemento y mantener cada texto que se ha escrito: peticiones, notas, páginas wiki, noticias, mensajes, documentos. Nada se convierte y la base de datos no se toca. CKEditor almacena sus textos como HTML y también lo hace este complemento, por lo que un texto almacenado simplemente se muestra con el nuevo formateador.

1. Instala el complemento (ver arriba) y elige Formato de texto: *TipTap HTML*.
2. Mantén la carpeta `public/system/rich/` de tu Redmine. Si las personas insertaron imágenes y archivos con el navegador de imágenes de CKEditor, se almacenan allí, no en la base de datos ni entre los adjuntos, y los textos se refieren a ellos por dirección (`/system/rich/...`). **Si Redmine se traslada a otro servidor o se instala de nuevo, traslada también esta carpeta**, junto con la base de datos y la carpeta `files/`: ninguna de las dos contiene estos archivos, y sin la carpeta las imágenes de los textos antiguos devuelven un error 404. Los adjuntos de peticiones, páginas wiki y similares se almacenan como antes y no requieren nada. Las imágenes insertadas en este editor son adjuntos ordinarios. La carpeta sigue siendo necesaria después de eliminar redmine_ckeditor.
3. Elimina redmine_ckeditor cuando ya no lo necesites.

Un texto antiguo se muestra tal como CKEditor lo mostró: fuentes, tamaños, colores y alineación, indentaciones, listas, tablas (bordes, anchos, leyendas, celdas combinadas), imágenes (tamaño, flotación, borde, una imagen dentro de un enlace), enlaces, bloques de código con su idioma (resaltado), macros de Redmine (`{{toc}}`, `{{collapse(Title) ... }}`, `{{thumbnail(...)}}` y así sucesivamente), enlaces wiki y petición, direcciones web simples hechas clicables e `<iframe>` incrustados (video). Un texto escrito en CKEditor se reconoce por su marcado y mantiene el espaciado entre párrafos que tenía allí, que es más amplio que en este editor.

Diferencias a propósito:
- Un `<iframe>` se muestra solo cuando apunta a otro sitio sobre http(s), y está contenido en un sandbox: la página dentro puede ejecutar sus propios scripts, pero no puede alcanzar la página de Redmine, abrir la ventana superior o enviar formularios. Todos los demás `<iframe>` se eliminan.
- Los enlaces se abren en la misma ventana: el atributo `target` de un enlace (opción "Nueva ventana (_blank)" de CKEditor) no se mantiene.
- Algún formato que CKEditor ofrecía pero sus páginas eliminaba silenciosamente se muestra aquí: por ejemplo, los colores de fondo de los estilos "Marker" de CKEditor y las comillas de `<q>`.
- El estilo "Special Container" de CKEditor (un bloque con un marco gris) se muestra como un bloque de código sin resaltado, y en el editor también es un bloque de código.

Un texto antiguo mantiene su formato cuando se abre en el editor y se guarda nuevamente: macros de Redmine (una macro es un elemento gris en el editor; edítalo en el modo `<HTML>`, como en el modo Origen de CKEditor), `<iframe>`, los bloques `<div>` y `<address>` con su estilo (un `<div>` pegado desde una página web se sigue convirtiendo en párrafo), subíndice y superíndice, estilos en línea de CKEditor (big, small, keyboard, sample y así sucesivamente), el estilo de encabezados, tablas y celdas de tabla, el tamaño (anchura y altura), la flotación, el borde y el enlace de las imágenes, el idioma de los bloques de código. Lo que no sobrevive a la edición: el título de una tabla se convierte en un párrafo centrado encima, las secciones de encabezado y pie de página de una tabla se convierten en filas ordinarias (el pie de página permanece en la parte inferior) y `<del>` se convierte en `<s>` (el mismo aspecto). Un texto guardado desde este editor obtiene el espaciado compacto de párrafo de este editor.
