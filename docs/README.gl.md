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

> *Esta tradución foi feita coa axuda dun modelo de IA e non foi revisada por un falante nativo. Se atopas un erro, por favor [abre un problema ou unha solicitude de fusión](https://github.com/Du10777/redmine_tiptap).*

Editor de texto para Redmine, baseado en TipTap https://github.com/ueberdosis/tiptap

Versións soportadas de Redmine: **6.\*** (desenvolvido e probado en 6.1.4).

Motor do editor: **TipTap 3.31.4**. Todos os paquetes `@tiptap/*` están fixados a esta versión exacta en `package.json` e `package-lock.json` e deben ser sempre actualizados xunto á mesma versión.

## Características

**Formato de texto**
- Negra, cursiva, subliñado, tachado, código en liña.
- Cor do texto e cor de fondo: paleta de 64 cores ou calquera valor hexadecimal.
- Familia de fontes (13 fontes) e tamaño de fonte (predefinidos de 8 a 72 px, ou calquera valor).
- Estilos de parágrafo: títulos 1–6 e texto normal.
- Aliñación (esquerda, centro, dereita, xustificado) e sangría (ata 8 niveis) de parágrafos e títulos.
- Ligazóns: inserir, editar, eliminar.
- Liña horizontal, desfacer e refacer.

**Listas**
- Listas con viñetas con marcadores de disco, círculo ou cadrado.
- Listas numeradas: 1, 01, a, A, i, I, α.
- Listas de tarefas con casillas de verificación; as tarefas completadas están tachadas.
- Listas aniñadas (Tab / Shift+Tab).

**Táboas**
- Inserir unha táboa de calquera tamaño, con ou sen fila de encabezado.
- Menú de botón dereito nunha cela: engadir e eliminar filas e columnas, fusionar e dividir celas, fila de encabezado e columna de encabezado, eliminar a táboa.
- Os anchos de columna cambían arrastrando os bordes das celas.
- A pegada de Excel mantén os anchos de columna, aliñación e tamaños de fonte; unha táboa copiada de Redmine pégate en Excel con bordes.

**Imaxes e ficheiros**
- Pegar unha imaxe desde o portapapeles: cárgase como un ficheiro adxunto e aparece no texto.
- As imaxes adxuntas co campo de ficheiro de Redmine, ou soltas nel, tamén se insertan no texto.
- Inserir unha imaxe desde os ficheiros adxuntos (un selector de miniaturas) ou unha ligazón a calquera ficheiro.
- Redimensionar unha imaxe arrastrando as súas esquinas.

**Código**
- Bloques de código con realce de sintaxe no editor e nas páxinas gardadas: 52 idiomas, e podes engadir máis (ver [Realce de sintaxe](#realce-de-sintaxe)).
- O idioma dun bloque elíxese nun distintivo na súa esquina superior dereita, cunha busca, idiomas recentes e frecuentes.
- Tab e Shift+Tab identan e desidentan liñas dentro dun bloque de código; negra, ligazóns e cores dentro do código se mantén.

**Bloques**
- Bloque plegable: un título con contido oculto (`<details>`). Contraído en páxinas gardadas, expandido no editor.
- Bloque de cita cun autor e liña de data.

**Edición**
- Modo `<HTML>` para ver e editar o código fonte HTML.
- Escritura ao estilo Markdown: `#` para títulos, `-` e `1.` para listas, `[ ]` para tarefas, ```` ```python ```` para un bloque de código (calquera nome de idioma ou ningún), `**bold**`, `---` para unha liña horizontal. Atallos estándar de teclado: Ctrl+B, Ctrl+I, Ctrl+U, Ctrl+Z e outros.
- O editor nunca crece máis alto que a xanela: a barra de ferramentas e os botóns do formulario permanecen á vista, e o texto desplazase no interior. A altura segue o tamaño da xanela e o zoom da páxina.
- Un mando de redimensionamento na esquina inferior dereita establece a altura manualmente. A altura recórdase; facer doble clic volve á altura automática.

**Integración de Redmine**
- Funciona en todos os campos de texto con formato de Redmine: descricións de peticións e notas, páxinas wiki, noticias, mensaxes de foro, documentos, descricións de proxectos, campos de texto longo personalizados, incluíndo campos que aparecen máis tarde na páxina.
- O texto almacénase como HTML. Para usar o editor, escolle *TipTap HTML* como formato de texto nos axustes de Redmine.
- A interface (consellos, menús, diálogos) segue o idioma no perfil de Redmine do usuario. 47 dos 50 idiomas de Redmine veñen co complemento: o inglés e o ruso están completos, os outros 45 son borradores feitos cun modelo de IA que os falantes nativos son benvidos para corrixir. Os tres idiomas escritos de dereita a esquerda (árabe, hebreo, persa) non son deliberadamente soportados (ver [Idioma da interface](#idioma-da-interface)).
- Mantense rápido en textos grandes: os editores en formularios ocultos créanse só cando se abre o formulario, e os bloques de código longos realcanse cando se desplazan á vista.
- Os textos escritos en CKEditor (o complemento redmine_ckeditor) móstranse do xeito que foron e abren no editor coa súa formatación: sen conversión, ver [Migración desde CKEditor](#migración-desde-ckeditor).
- Os textos gardados móstranse sen HTML inseguro: os scripts, os manipuladores de eventos e as ligazóns `javascript:` elimínanse cando se mostra unha páxina, só se conserva o que produce o editor. Isto cobre tamén os textos que veñen a través da API REST ou do modo `<HTML>`.

## Realce de sintaxe

Os bloques de código realcanse no editor e nas páxinas gardadas. O idioma dun bloque escóllese no distintivo da súa esquina superior dereita; a lista ten un cadro de busca e recorda idiomas recentes e frecuentemente usados.

52 idiomas veñen co complemento, entre eles 1C, Cisco IOS, MikroTik RouterOS, Windows cmd, docker compose, rexistros de servizo Linux e saída de journalctl.

Podes engadir os teus propios idiomas. Cada idioma é un ficheiro na carpeta `highlight/`. Calquera das 190+ gramáticas de highlight.js, ou unha de terceros, convirte nun ficheiro así cun comando:

```sh
python3 highlight/_convert_grammar.py erlang
sh highlight/_compile.sh
```

Detalles: [highlight/README/gl.md](../highlight/README/gl.md).

## Idioma da interface

O editor fala o idioma escollo no perfil de Redmine do usuario (Conta → Idioma). Os ficheiros para 47 dos 50 idiomas de Redmine 6 veñen co complemento, en `config/locales/`. O inglés é a fonte e o ruso é o do autor; os outros 45 son borradores feitos coa axuda dun modelo de IA e aínda non foron revisados por falantes nativos, polo que espera algunha frase estrañada. Un texto que falta nun ficheiro móstrase en inglés.

Para corrixir unha tradución, cambia os seus valores en `config/locales/<code>.yml` (`de`, `fr`, `pt-BR`, ...) e reinicia Redmine. `bundle exec rake redmine_tiptap:locales` comproba os ficheiros. As solicitudes de fusión con correccións son benvidas.

**Os idiomas escritos de dereita a esquerda (árabe, hebreo, persa) non son deliberadamente soportados.** Soportalos require moitos cambios na base de código, non só unha tradución, e optamos por non facelo. Para estes idiomas o editor móstrase en inglés e o seu deseño non se axusta. Se precisa un deles, facer un fork: o mecanismo de tradución está listo, e o que máis hai que cambiar está listado en [config/locales/README.md](../config/locales/README.md#right-to-left-languages).

Detalles e lista de idiomas de Redmine: [config/locales/README.md](../config/locales/README.md).

## Instalación

1. Pon o complemento na carpeta `plugins` de Redmine. A carpeta debe chamarse `redmine_tiptap`. A forma máis fácil é git, que tamén fai que as actualizacións sexa un único comando:
   ```sh
   cd /path/to/redmine
   git clone https://github.com/Du10777/redmine_tiptap.git plugins/redmine_tiptap
   ```
2. Reinicia Redmine.
3. Nos axustes de Redmine (redmine.selfhosted/_settings_) escolle Formato de texto: *TipTap HTML*.

## Actualización

O complemento non ten migracións de base de datos, e o bundle de JavaScript compilado e a folla de estilos forman parte do repositorio. A actualización non require nin npm nin unha compilación no servidor: reemplaza os ficheiros do complemento e reinicia Redmine.

Antes de actualizar, comproba que a nova versión soporta a túa versión de Redmine (ver "Versións soportadas de Redmine" arriba).

### Instalado con git (recomendado)

```sh
cd /path/to/redmine/plugins/redmine_tiptap
git pull
```

Despois reinicia Redmine, por exemplo:

```sh
sudo systemctl restart redmine          # Redmine en execución como servizo systemd
touch /path/to/redmine/tmp/restart.txt  # Passenger
docker compose restart redmine          # Docker
```

Para quedarse nunha versión particular en lugar da última confirmación: `git fetch && git checkout <tag-or-commit>`.

### Instalado desde un arquivo

1. Elimina a carpeta antiga `plugins/redmine_tiptap` e descomprime a nova versión no seu lugar. Elimina primeiro asegúrate de que os ficheiros eliminados na nova versión non quedan atrasados.
2. Elimina `public/assets/.manifest.json` na carpeta de Redmine.
3. Reinicia Redmine.

O paso 2 importa. No inicio Redmine vuelve a publicar os activos do complemento só se os seus ficheiros son máis novos que este manifesto. Os ficheiros descomprimidos dun arquivo gardaron os seus marcas de tempo orixinais, polo que sen o paso 2 Redmine pode seguir servindo o editor antigo. O manifesto recréase automaticamente no inicio. Con `git pull` este paso non é necesario: git dá aos ficheiros cambiados a hora actual.

### Despois de actualizar

- O script e a folla de estilos do editor son servidos cun fingerprint de contido nas súas URLs, polo que os navegadores cargan a nova versión logo do reinicio. Os usuarios non necesitan limpar a caché do navegador.
- Se *Gardar o texto formatado na caché* está activado nos axustes de Redmine (Administración → Configuración → Xeral), borra a caché de Redmine unha vez despois de actualizar a unha versión que cambia como se amosan os textos (limpeza de HTML, soporte de textos de CKEditor): `bundle exec rake tmp:cache:clear RAILS_ENV=production` na carpeta de Redmine. En caso contrario, as páxinas renderizadas antes da actualización pódense amosar da caché, sen limpar, ata que o seu texto cambie.
- As versións anteriores do complemento copiaban o script a `public/tiptap_bundle.js`. Estes ficheiros xa non se usan e pódense eliminar:
  ```sh
  rm -f /path/to/redmine/public/tiptap_bundle.js /path/to/redmine/public/tiptap_bundle.js.map
  ```

## Migración desde CKEditor

Se o teu Redmine usou [redmine_ckeditor](https://github.com/a-ono/redmine_ckeditor), podes cambiar a este complemento e manter cada texto que se escribiu: peticións, notas, páxinas wiki, noticias, mensaxes, documentos. Nada se converte e a base de datos non se toca. CKEditor almacena os seus textos como HTML e este complemento tamén, polo que un texto almacenado simplemente se mostra polo novo formateador.

1. Instala o complemento (ver arriba) e escolle Formato de texto: *TipTap HTML*.
2. Manten a carpeta `public/system/rich/` do teu Redmine. As imaxes e ficheiros que a xente inseriu co navegador de imaxes de CKEditor están almacenados alí e non na base de datos, e os textos refírense a eles por enderezo (`/system/rich/...`). Os ficheiros adxuntos de peticións, páxinas wiki e similares almacénanse como antes e non necesitan nada.
3. Elimina redmine_ckeditor cando xa non o necesites.

Un texto antigo móstrase do xeito que CKEditor o amosaba: fontes, tamaños, cores e aliñación, sangría, listas, táboas (bordes, anchos, pés de páxina, celas fusionadas), imaxes (tamaño, flotante, bordes, imaxe dentro dunha ligazón), ligazóns, bloques de código coa súa lingua (realcados), macros de Redmine (`{{toc}}`, `{{collapse(Title) ... }}`, `{{thumbnail(...)}}` e similares), ligazóns wiki e de peticións, enderezos web simples feitos clicables e `<iframe>` embebido (vídeo). Un texto escrito en CKEditor recoñécese pola súa marcaxe e mantén o espazo entre parágrafos que tiña alí, que é máis ancho que neste editor.

Diferenzas propósito:
- Unha `<iframe>` móstrase só cando apunta a outro sitio en http(s), e está en caixa de area: a páxina dentro pode executar os seus propios scripts, pero non pode alcanzar a páxina de Redmine, abrir a xanela superior ou enviar formularios. Todos os outros `<iframe>` elimínanse.
- As ligazóns abren na mesma xanela: o atributo `target` dunha ligazón (o "Xanela nova (_blank)" de CKEditor) non se conserva.
- Algún formato que CKEditor ofrecía pero as súas páxinas silenciosamente deixaban caer móstrase aquí: por exemplo os colores de fondo dos seus estilos "Marcador" e as aspas de `<q>`.

Un texto antigo mantén a súa formatación cando se abre no editor e se garda de novo: macros de Redmine (un macro é un elemento gris no editor; edítao no modo `<HTML>`, como no modo Fonte de CKEditor), `<iframe>`, subíndice e superíndice, estilos en liña de CKEditor (grande, pequeno, teclado, mostra e similares), o estilo dos títulos, táboas e celas de táboa, o tamaño, flotante, bordes e ligazón de imaxes, o idioma de bloques de código. O que non sobrevive á edición: bloques `<address>` e `<div>` convértense en parágrafos, o pé de páxina dunha táboa convértese nun parágrafo centrado encima, as seccións de encabezado e pé de páxina dunha táboa convértense en filas ordinarias (o pé permanece na parte inferior), `<del>` convértese en `<s>` (o mesmo aspecto), e a altura dunha imaxe elimínase cando se establece o seu ancho (as proporcións se mantén). Un texto gardado deste editor obtén o espazo de parágrafo compacto deste editor.
