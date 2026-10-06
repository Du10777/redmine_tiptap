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

> *Aquesta traducció s'ha realitzat amb l'ajuda d'un model d'IA i no ha estat revisada per un parlant natiu. Si detecteu un error, obriu una [incidència o una sol·licitud de fusion](https://github.com/Du10777/redmine_tiptap).*

Es un editor de text per a Redmine, basat en TipTap https://github.com/ueberdosis/tiptap

Motor de l'editor: **TipTap 3.31.4**. Tots els paquets `@tiptap/*` es bloquegen a aquesta versió exacta a `package.json` i `package-lock.json` i sempre s'han d'actualitzar junts, a la mateixa versió.

**Índex**

- [Versions de Redmine compatibles](#versions-de-redmine-compatibles)
- [Funcionalitats](#funcionalitats)
  - [Format del text](#format-del-text)
  - [Llistes](#llistes)
  - [Taules](#taules)
  - [Imatges i fitxers adjunts](#imatges-i-fitxers-adjunts)
  - [Codi](#codi)
  - [Blocs](#blocs)
  - [Edició](#edició)
  - [Integració amb Redmine](#integració-amb-redmine)
- [Ressaltat de sintaxi](#ressaltat-de-sintaxi)
- [Idioma de la interfície](#idioma-de-la-interfície)
- [Instal·lació](#installació)
- [Actualització](#actualització)
  - [Instal·lat amb git (recomanat)](#installat-amb-git-recomanat)
  - [Instal·lat des d'un arxiu](#installat-des-dun-arxiu)
  - [Després d'actualitzar](#després-dactualitzar)
- [Migració des de CKEditor](#migració-des-de-ckeditor)

## Versions de Redmine compatibles

| Redmine | Compatible | Provat a |
|---|---|---|
| 7.x | sí | 7.0.2 |
| 6.x | sí | 6.1.4, 6.1.5 |
| 5.x i anteriors | no | — |

Una nova versió principal (8.x i posteriors) només és compatible després de provar-hi el complement. Fins aleshores, el Redmine d'aquesta versió no s'inicia amb el complement instal·lat: s'atura amb un error que indica les versions compatibles.

## Funcionalitats

### Format del text
- Negreta, cursiva, subratllat, ratllat, subíndex i superíndex (Ctrl+, i Ctrl+.), codi en línia.
- Color del text i color de fons: una paleta de 64 colors o qualsevol valor hexadecimal.
- Tipus de lletra (13 tipus) i mida de lletra (presets de 8 a 72 px, o qualsevol valor).
- Estilos de paràgraf: encapçalaments 1–6 i text normal.
- Alineació (esquerra, centre, dreta, justificat) i sagnat (fins a 8 nivells) de paràgrafs i encapçalaments.
- Enllaços: inserir, editar, suprimir.
- Línia horitzontal, desfer i refer.

### Llistes
- Llistes de viñetes amb marcadors de disc, cercle o quadrat.
- Llistes numerades: 1, 01, a, A, i, I, α.
- Llistes de tasques amb caselles de verificació; les tasques completades es ratllaven.
- Llistes imbricades (Tab / Maj+Tab).

### Taules
- Inserir una taula de qualsevol mida, amb o sense fila de capçalera.
- Menú de clic dret en una cel·la: afegir i suprimir files i columnes, fusionar i separar cel·les, fila de capçalera i columna de capçalera, suprimir la taula.
- L'amplada de les columnes es canvia arrossegant les vores de les cel·les.
- Enganxar des d'Excel conserva l'amplada de les columnes, l'alineació i les mides de lletra; una taula copiada desde Redmine s'enganxa a Excel amb vores.

### Imatges i fitxers adjunts
- Enganxar una imatge del porta-retalls: es carrega com a fitxer adjunt i apareix al text.
- Les imatges adjuntes amb el camp de fitxers de Redmine, o dipositades a aquest camp, també s'insereixen al text.
- Inserir una imatge des dels fitxers adjunts (selector de miniatures) o un enllaç a qualsevol fitxer adjunt.
- Canviar la mida d'una imatge arrossegant les seves cantonades.

### Codi
- Blocs de codi amb ressaltat de sintaxi a l'editor i a les pàgines guardades: 52 llenguatges, i podeu afegir-ne més (veieu [Ressaltat de sintaxi](#ressaltat-de-sintaxi)).
- El llenguatge d'un bloc es tria desde una insígnia a la seva cantonada, amb cercar, llenguatges recents i freqüents.
- Tab i Maj+Tab sagnaten i desfan el sagnament de línies dins d'un bloc de codi; la negreta, els enllaços i els colors dins del codi es conserven.

### Blocs
- Bloc col·lapsible: un títol amb contingut amagat (`<details>`). Col·lapsat a les pàgines guardades, expandit a l'editor.
- Bloc de cita amb una línia per a autor i data.

### Edició
- Mode `<HTML>` per veure i editar el codi HTML font: els blocs imbricats estan sagnats, una línia en blanc separa els blocs que ocupen diverses línies, la sintaxi es colora amb les mateixes regles que en un bloc de codi HTML, i Enter manté el sagnat de la línia.
- Escriptura d'estil Markdown: `#` per a encapçalaments, `-` i `1.` per a llistes, `[ ]` per a tasques, ```` ```python ```` per a un bloc de codi (qualsevol nom de llenguatge o cap), `**bold**`, `---` per a una línia horitzontal. Dreceres de teclat estàndard: Ctrl+B, Ctrl+I, Ctrl+U, Ctrl+Z i altres.
- L'editor mai es fa més alt que la finestra: la barra d'eines i els botons del formulari romanen visibles, i el text es desplaça dins. L'altura segueix la mida de la finestra i el zoom de la pàgina.
- Una nansa de redimensionament a la cantonada inferior dreta estableix l'altura manualment. L'altura es recorda; fer doble clic torna a l'altura automàtica.

### Integració amb Redmine
- Funciona a tots els camps de text de Redmine amb format: descripcions i notes de demandes, pàgines wiki, noticies, missatges de fòrum, documents, descripcions de projectes, camps personalitzats de text llarg, inclosos els camps que apareixen més tard a la pàgina.
- El text es guarda com a HTML. Per utilitzar l'editor, trieu *TipTap HTML* com a format del text a la configuració de Redmine.
- La interfície (consells d'eines, menús, diàlegs) segueix l'idioma del perfil de Redmine de l'usuari. 47 de les 50 llengues de Redmine s'inclouen al complement: l'anglès i el rus són complets, les altres 45 són esborranys fets amb un model d'IA que els parlants nadius són benvinguts a corregir. Les tres llengues que s'escriuen de dreta a esquerra (àrab, hebreu, persa) no es suporten deliberadament (veieu [Idioma de la interfície](#idioma-de-la-interfície)).
- Es manté ràpid amb textos grans: els editors dels formularis ocults es creen només quan s'obri el formulari, i els blocs de codi llargs es ressalten quan es desplacen cap a la vista.
- Els textos escrits en CKEditor (el complement redmine_ckeditor) es mostren tal com eren i s'obren a l'editor amb el seu format: sense conversió, veieu [Migració des de CKEditor](#migració-des-de-ckeditor).
- Els textos guardats es mostren sense HTML insegur: els scripts, els gestors d'events i els enllaços `javascript:` es treuen quan es mostra una pàgina, es conserva només allò que produeix l'editor mateix. Això cobreix els textos que arribin a través de la REST API o del mode `<HTML>`.

## Ressaltat de sintaxi

Els blocs de codi es ressalten tant a l'editor com a les pàgines guardades. El llenguatge d'un bloc es tria desde la insígnia a la seva cantonada superior dreta; la llista té un quadre de cerca i recorda els llenguatges utilitzats recentment i amb freqüència.

52 llenguatges s'inclouen al complement, entre ells HTML, 1C, Cisco IOS, MikroTik RouterOS, Windows cmd, docker compose, registres de serveis Linux i sortida de journalctl.

Podeu afegir els vostres propis llenguatges. Cada llenguatge és un fitxer a la carpeta `highlight/`. Qualsevol de les 190+ gramàtiques de highlight.js, o una de tercers, es converteix en un fitxer d'aquest tipus amb una sola comanda:

```sh
python3 highlight/_convert_grammar.py erlang
sh highlight/_compile.sh
```

Detalls: [highlight/README/ca.md](../highlight/README/ca.md).

## Idioma de la interfície

L'editor parla l'idioma escollit al perfil de Redmine de l'usuari (El meu compte → Idioma). Els fitxers de 47 de les 50 llengues de Redmine s'inclouen al complement, a `config/locales/`. L'anglès és la font i el rus és del mateix autor; els altres 45 són esborranys fets amb l'ajuda d'un model d'IA i encara no s'han revisat per parlants nadius, així que espereu alguna frase estranya aquí i allà. Un text que manqui d'un fitxer es mostra en anglès.

Per corregir una traducció, canvieu els seus valors a `config/locales/<code>.yml` (`de`, `fr`, `pt-BR`, ...) i reinicieu Redmine. `bundle exec rake redmine_tiptap:locales` verifica els fitxers. Les sol·licituds de fusió amb correccions són benvingudes.

**Les llengues que s'escriuen de dreta a esquerra (àrab, hebreu, persa) no es suporten deliberadament.** Suportar-les requereix molts canvis al codi base, no només una traducció, i vam decidir no fer-ho. Per a aquestes llengues, l'editor es mostra en anglès i la seva disposició no s'ajusta. Si en necessiteu una, feu una bifurcació: el mecanisme de traducció està preparat, i el que més ha de canviar es llista a [config/locales/README.md](../config/locales/README.md#right-to-left-languages).

Detalls i llista de llengues de Redmine: [config/locales/README.md](../config/locales/README.md).

## Instal·lació

1. Poseu el complement a la carpeta `plugins` de Redmine. La carpeta s'ha de dir `redmine_tiptap`. El més fàcil és usar git, que també fa les actualitzacions d'una sola comanda:
   ```sh
   cd /path/to/redmine
   git clone --branch release --single-branch --depth 1 https://github.com/Du10777/redmine_tiptap.git plugins/redmine_tiptap
   ```
   La branca `release` només té els fitxers que el complement necessita per funcionar, sense aquesta documentació, i `--depth 1` no baixa l'historial del repositori.
2. Reinicieu Redmine.
3. A la configuració de Redmine (redmine.selfhosted/_settings_), trieu Format del text: *TipTap HTML*.

## Actualització

El complement no té migracions de base de dades, i el feix de JavaScript compilat i l'estil de full de codi són part del dipòsit. L'actualització no necessita ni npm ni compilació al servidor: només reemplaceu els fitxers del complement i reinicieu Redmine.

Abans d'actualitzar, verifiqueu que la nova versió suporta la vostra versió de Redmine (veieu "Versions de Redmine compatibles" anteriorment).

### Instal·lat amb git (recomanat)

```sh
cd /path/to/redmine/plugins/redmine_tiptap
git pull
```

Després reinicieu Redmine, per exemple:

```sh
sudo systemctl restart redmine          # Redmine en execució com a servei systemd
touch /path/to/redmine/tmp/restart.txt  # Passenger
docker compose restart redmine          # Docker
```

Per quedar-vos en una versió concreta en lloc de la més recent, baixeu un commit de la branca `release` i canvieu-hi: `git fetch --depth 1 origin <commit> && git checkout <commit>`.

Si el complement es va instal·lar amb un `git clone` normal (la branca `main`, amb la documentació i tot l'historial), passeu a la branca `release` una vegada: suprimiu la carpeta `plugins/redmine_tiptap` i torneu a instal·lar el complement tal com es descriu a [Instal·lació](#installació). El complement no desa res de propi a la seva carpeta, així que no es perd res; només cal copiar abans fora de `highlight/` els llenguatges de ressaltat de codi que hàgiu afegit vosaltres.

### Instal·lat des d'un arxiu

1. Baixeu l'arxiu de la branca `release`: https://github.com/Du10777/redmine_tiptap/archive/refs/heads/release.zip. Suprimiu l'antiga carpeta `plugins/redmine_tiptap` i descomprimiu l'arxiu al seu lloc; la carpeta de l'arxiu es diu `redmine_tiptap-release`, canvieu-li el nom a `redmine_tiptap`. Suprimir-la primer garanteix que no quedin fitxers que la nova versió ja no té.
2. Supprimiu `public/assets/.manifest.json` a la carpeta de Redmine.
3. Reinicieu Redmine.

El pas 2 és important. A l'inici, Redmine republicar els elements del complement només si els seus fitxers són més nous que aquest manifest. Els fitxers descomprimits d'un arxiu mantenen els seus estampes de temps originals, de manera que sense el pas 2, Redmine pot continuar servint l'editor anterior. El manifest es recrea automàticament a l'inici. Amb `git pull` aquest pas no és necessari: git dóna als fitxers modificats l'hora actual.

### Després d'actualitzar

- L'script i l'estil de full de codi de l'editor es serveixen amb una empremta de contingut als seus URL, de manera que els navegadors carreguen la nova versió immediatament després de l'inici. Els usuaris no necessiten esborrar el cau del seu navegador.
- Si l'opció *Recorda el text formatat* està habilitada a la configuració de Redmine (Administració → Paràmetres → General), esborreu una vegada el cau de Redmine després d'actualitzar a una versió que canvia com es mostren els textos (neteja de HTML, suport de textos CKEditor): `bundle exec rake tmp:cache:clear RAILS_ENV=production` a la carpeta de Redmine. Si no, les pàgines representades abans de l'actualització es poden mostrar desde el cau, sense netejar, fins que el seu text canvii.
- Les versions anteriors del complement copiaven el script a `public/tiptap_bundle.js`. Aquests fitxers ja no s'utilitzen i es poden suprimir:
  ```sh
  rm -f /path/to/redmine/public/tiptap_bundle.js /path/to/redmine/public/tiptap_bundle.js.map
  ```

## Migració des de CKEditor

Si el vostre Redmine va usar [redmine_ckeditor](https://github.com/a-ono/redmine_ckeditor), podeu canviar a aquest complement i mantenir tots els textos que s'han escrit: demandes, notes, pàgines wiki, noticies, missatges, documents. Res no es converteix i la base de dades no es toca. CKEditor guarda els seus textos com a HTML i igual fa aquest complement, de manera que un text guardat simplement es mostra pel nou formador.

1. Instal·leu el complement (veieu anteriorment) i trieu Format del text: *TipTap HTML*.
2. Conserveu la carpeta `public/system/rich/` del vostre Redmine. Si la gent ha inserit imatges i fitxers amb el navegador d'imatges de CKEditor, es guarden allà i no a la base de dades ni entre els fitxers adjunts, i els textos s'hi refereixen per adreça (`/system/rich/...`). **Si Redmine es trasllada a un altre servidor o es torna a instal·lar, traslladeu també aquesta carpeta**, juntament amb la base de dades i la carpeta `files/`: cap de les dues conté aquests fitxers, i sense la carpeta les imatges dels textos antics donen un error 404. Els fitxers adjunts de les demandes, pàgines wiki i similars es guarden com fins ara i no necessiten res. Les imatges inserides en aquest editor són fitxers adjunts ordinaris. La carpeta continua sent necessària després d'eliminar redmine_ckeditor.
3. Supprimiu redmine_ckeditor quan ja no ho necessiteu.

Un text antic es mostra de la manera que ho feia CKEditor: tipus de lletra, mides, colors i alineació, sagnat, llistes, taules (vores, amplades, epígrafs, cel·les fusionades), imatges (mida, flotació, vora, imatge dins d'un enllaç), enllaços, blocs de codi amb el seu llenguatge (ressaltat), macros de Redmine (`{{toc}}`, `{{collapse(Title) ... }}`, `{{thumbnail(...)}}` i similars), enllaços wiki i demandes, adreces web simples fetes cliquables, i `<iframe>` incrustats (vídeo). Un text escrit a CKEditor es reconeix pel seu marcat i conserva l'espaiat entre paràgrafs que hi havia, que és més gran que en aquest editor.

Diferències intencionades:
- Un `<iframe>` es mostra només si apunta a un altre lloc sobre http(s), i està aïllat: la pàgina dins pot executar els seus propis scripts, però no pot arribar a la pàgina de Redmine, obrir la finestra superior o enviar formularis. Tots els altres `<iframe>` es treuen.
- Els enllaços s'obren a la mateixa finestra: l'atribut `target` d'un enllaç (la "Finestra nova (_blank)" de CKEditor) no es conserva.
- Alguns formats que CKEditor ofereia però que les seves pàgines silenciosament trigaven es mostren aquí: per exemple, els colors de fons dels seus estils "Marcador" i les cometes de `<q>`.
- L'estil «Special Container» de CKEditor (un bloc amb un marc gris) es mostra com un bloc de codi sense ressaltat, i a l'editor també és un bloc de codi.

Un text antic conserva el seu format quan s'obri a l'editor i es guardi novament: macros de Redmine (una macro és un element gris a l'editor; editeu-la en mode `<HTML>`, com en el mode Font de CKEditor), `<iframe>`, blocs `<div>` i `<address>` amb el seu estil (un `<div>` enganxat des d'una pàgina web encara es converteix en un paràgraf), subíndex i superíndex, estils en línia de CKEditor (big, small, keyboard, sample i similars), l'estil d'encapçalaments, taules i cel·les de taula, la mida (amplada i altura), flotació, vora i enllaç de les imatges, el llenguatge dels blocs de codi. Allò que no sobreviu a l'edició: l'epígraf d'una taula es converteix en un paràgraf centrat a sobre, les seccions de capçalera i peu de taula es converteixen en files ordinàries (el peu es manté a la part inferior) i `<del>` esdevé `<s>` (el mateix aspecte). Un text guardat des d'aquest editor obté l'espaiat compacte dels paràgrafs d'aquest editor.
