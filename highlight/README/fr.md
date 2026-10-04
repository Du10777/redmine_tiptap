# Coloration syntaxique : langages

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

> *Cette traduction a été réalisée avec l’aide d’un modèle d’IA et n’a pas été relue par un locuteur natif. Si vous trouvez une erreur, veuillez [ouvrir une issue ou une pull request](https://github.com/Du10777/redmine_tiptap).*

Les blocs de code sont colorés aussi bien dans l’éditeur que sur les pages enregistrées (demandes, notes, wiki), et ils ont le même aspect dans les deux cas. Le langage d’un bloc se choisit depuis le badge situé dans son coin supérieur droit. La liste des langages est définie par les fichiers du dossier `highlight/` : un fichier correspond à un langage.

Le plugin est livré avec 52 langages. Vous pouvez en ajouter d’autres : convertissez une grammaire highlight.js toute prête à l’aide d’un script (voir [Ajout d’un langage depuis highlight.js](#ajout-dun-langage-depuis-highlightjs)) ou écrivez la vôtre.

## Fonctionnement

- La coloration est assurée par [highlight.js](https://highlightjs.org) (via [lowlight](https://github.com/wooorm/lowlight)). L’éditeur et les pages enregistrées utilisent le même moteur ; les couleurs sont donc identiques.
- `_compile.sh` regroupe tous les fichiers de langage dans un seul fichier, `assets/javascripts/tiptap_highlight.js`. Ce fichier est versionné dans le dépôt déjà compilé : l’installation du plugin ne nécessite donc aucune compilation. Vous ne devez le compiler que si vous modifiez l’ensemble des langages.
- Redmine charge `tiptap_highlight.js` sur chaque page, avant l’éditeur (`tiptap_bundle.js`). Au chargement, l’éditeur enregistre tous les langages de ce fichier.
- Dans l’éditeur, un bloc est recoloré 50 ms après une pause dans la saisie, et seul le bloc modifié l’est. Sur les pages enregistrées, un bloc est coloré lorsqu’il apparaît à l’écran au fil du défilement. Un bloc situé dans une section repliée est coloré à l’ouverture de la section.
- Le langage est stocké dans le HTML enregistré : `<pre><code class="language-<id>">`. C’est pourquoi l’`id` d’un langage ne doit jamais changer : les blocs enregistrés avec l’ancien `id` deviendraient du texte brut.
- Il n’y a pas de détection automatique du langage : un bloc sans langage est affiché comme du texte brut. Il en va de même pour un bloc dont le langage ne figure pas dans `highlight/` (par exemple, si le fichier de langage a été supprimé) ; son badge continue d’afficher l’`id`. Si le fichier de langage revient, les couleurs reviennent aussi.
- Couleurs. highlight.js marque le texte avec des classes telles que `hljs-keyword`, `hljs-string`, `hljs-comment`. Leurs couleurs sont définies dans `assets/stylesheets/src/06_code.css`, en reprenant la palette de la coloration syntaxique propre à Redmine.

## Fichier de langage

Par exemple, `routeros.js` :

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

| Champ | Obligatoire | Description |
|---|---|---|
| `id` | oui | Nom du langage dans le HTML enregistré (`class="language-<id>"`). Caractères autorisés : `a-z`, `0-9`, `-`, `_`. **Ne le modifiez jamais** une fois que des blocs utilisant ce langage ont été enregistrés. |
| `label` | non | Nom dans la liste des langages et sur le badge du bloc. Par défaut, `id`. |
| `hint` | non | Note grise à côté du nom dans la liste. |
| `keywords` | non | Mots supplémentaires pour la recherche dans la liste, séparés par des espaces. |
| `grammar` | oui | Une grammaire highlight.js : une fonction `(hljs) => language definition`. |

`label`, `hint` et `keywords` sont en anglais. Pour afficher un langage sous un autre nom dans la langue d’interface d’un utilisateur, ou pour permettre de le trouver avec des mots de cette langue, ajoutez une entrée au fichier de traduction de cette langue, `config/locales/<code>.yml`, sous `code_languages:`. Les mots qui y figurent sont ajoutés à `keywords` ; `label` et `hint` remplacent ceux du fichier de langage. `config/locales/ru.yml` contient des exemples, et les règles se trouvent dans [config/locales/README.md](../../config/locales/README.md).

Types de fichiers du dossier :

- **Court.** Une référence à une grammaire du package npm highlight.js, comme dans l’exemple ci-dessus ; la plupart des langages sont ainsi. La grammaire provient de la version de highlight.js enregistrée dans le `package-lock.json` du plugin.
- **Copie complète.** Le code de la grammaire se trouve dans le fichier lui-même et peut être modifié. Ces fichiers sont créés par le script de conversion (voir plus bas).
- **Grammaire propre.** `log.js`, `journalctl.js`, `cisco-ios.js` ; leurs parties communes se trouvent dans `_common.js`.
- **Enveloppe.** Une grammaire existante sous un autre nom : `cmd.js` correspond à `dos` de highlight.js, `docker-compose.js` à `yaml`.

Les fichiers et dossiers dont le nom commence par `_` ne sont pas des langages :

- `_compile.sh` compile les langages ;
- `_check.mjs` vérifie les langages pendant la compilation ;
- `_common.js` contient les parties communes des grammaires propres au plugin ;
- `_convert_grammar.py` est le script qui convertit les grammaires highlight.js (voir plus bas) ;
- `_vendor/` contient les fichiers importés par les grammaires converties (créé par le script de conversion).

Le dossier `README/` contient cette documentation.

## Ajout d’un langage depuis highlight.js

Les grammaires toutes prêtes (plus de 190) se trouvent ici : https://github.com/highlightjs/highlight.js/tree/main/src/languages. Leurs noms et leurs alias sont listés dans [SUPPORTED_LANGUAGES.md](https://github.com/highlightjs/highlight.js/blob/main/SUPPORTED_LANGUAGES.md), avec une centaine de grammaires tierces hébergées dans des dépôts distincts. Le script `_convert_grammar.py` de ce dossier convertit n’importe laquelle d’entre elles au format du plugin.

Le script nécessite Python 3.6+ (aucun package supplémentaire) et un accès à github.com. Lancez-le depuis le dossier du plugin :

```sh
cd /path/to/redmine/plugins/redmine_tiptap
python3 highlight/_convert_grammar.py erlang
sh highlight/_compile.sh
```

L’argument `erlang` est le nom du fichier dans `src/languages`, sans `.js`. La seconde commande compile les langages et les vérifie. Redémarrez ensuite Redmine (voir [Compilation et application](#compilation-et-application)). Sous Windows, utilisez `py` ou `python` à la place de `python3`.

Exemples :

```sh
# liste des langages highlight.js (* = déjà dans highlight/), éventuellement filtrée par un mot
python3 highlight/_convert_grammar.py --list
python3 highlight/_convert_grammar.py --list sql

# plusieurs langages à la fois
python3 highlight/_convert_grammar.py erlang nix fsharp

# nom, note et mots de recherche personnalisés (un seul langage à la fois)
python3 highlight/_convert_grammar.py erlang --label "Erlang/OTP" --hint BEAM --keywords "erl otp"

# remplacer un fichier court livré avec le plugin par une copie complète modifiable
python3 highlight/_convert_grammar.py routeros --force --label RouterOS --hint MikroTik --keywords mikrotik

# un langage qui ne figure pas encore dans une version publiée de highlight.js, depuis la branche de développement
python3 highlight/_convert_grammar.py odin --ref main

# un lien vers un fichier de grammaire, directement depuis la barre d’adresse du navigateur
python3 highlight/_convert_grammar.py https://github.com/highlightjs/highlight.js/blob/main/src/languages/odin.js

# une grammaire tierce : un lien vers son dépôt, le script trouve le fichier de grammaire
python3 highlight/_convert_grammar.py https://github.com/highlightjs/highlightjs-terraform

# un fichier de grammaire local
python3 highlight/_convert_grammar.py ~/grammars/mylang.js --id mylang

# un fichier court faisant référence au package npm au lieu d’une copie du code
python3 highlight/_convert_grammar.py erlang --npm

# afficher ce qui serait fait sans rien modifier
python3 highlight/_convert_grammar.py erlang --dry-run
```

### Ce que fait le script

1. Télécharge `src/languages/<name>.js` de la version de highlight.js sur laquelle fonctionne le plugin. La version est lue dans `package-lock.json` (actuellement 11.12.0), car les grammaires sont écrites pour le moteur de leur propre version. `--ref` permet de choisir une autre version, une autre branche ou un autre commit.
2. Prend le nom du langage dans la ligne `Language:` de l’en-tête de la grammaire et les mots de recherche dans ses alias (`aliases`). L’`id` est le nom du fichier de la grammaire.
3. Place le code de la grammaire dans `highlight/<id>.js` sans le modifier, hormis l’export : `export default function(hljs)` devient `function grammar(hljs)`, et l’objet de langage `export default { id, label, keywords, grammar }` est ajouté à la fin du fichier. Si la grammaire est un module CommonJS (`module.exports = ...`), une ligne déclarant `module` et `exports` est ajoutée en haut.
4. Si la grammaire importe d’autres fichiers, les télécharge dans `highlight/_vendor/<source>-<version>/` en respectant les mêmes chemins que dans le dépôt et y redirige les imports. Par exemple, `typescript` importe `javascript.js` et `lib/ecmascript.js`. Ces fichiers sont partagés par tous les langages issus de la même source et de la même version ; il n’est pas nécessaire de les modifier.
5. Vérifie la ligne `Requires:`, qui énumère les langages utilisés pour le code intégré (par exemple, `php-template` a besoin de `xml` et de `php`). S’ils ne sont pas dans `highlight/`, affiche la commande qui permet de les ajouter. Sans eux, le code intégré reste simplement sans couleurs ; ce n’est pas une erreur.
6. N’écrase pas les fichiers existants sans `--force` et n’utilise pas un `id` déjà pris par un autre fichier.

Après la conversion, le langage peut être modifié directement dans son fichier.

### Options

| Option | Effet |
|---|---|
| `LANGUAGE ...` | Un nom de langage highlight.js, un lien vers un fichier de grammaire ou vers un dépôt de grammaire tierce sur GitHub, ou un chemin vers un fichier `.js` local. |
| `--ref REF` | Version de highlight.js (tag), branche ou commit. Par défaut, la version indiquée dans `package-lock.json`. Pour les liens, la version est tirée du lien. |
| `--id ID` | `id` du langage. Par défaut, le nom du fichier de la grammaire. |
| `--label TEXT` | Nom dans la liste et sur le badge. Par défaut, la valeur de `Language:` de la grammaire. |
| `--hint TEXT` | Note grise dans la liste. |
| `--keywords TEXT` | Mots de recherche séparés par des espaces. Par défaut : les alias de la grammaire. |
| `--npm` | Au lieu d’une copie du code, écrit un fichier court faisant référence au package npm highlight.js. Uniquement pour les langages de highlight.js lui-même. |
| `--force` | Remplace les fichiers existants. |
| `--dry-run` | Affiche ce qui serait fait sans rien modifier. |
| `--list [WORD]` | Liste les langages highlight.js et les grammaires tierces, éventuellement filtrés par un mot. |
| `--prune` | Supprime les fichiers de `_vendor/` qu’aucun langage n’importe plus. |


**Copie ou `--npm` ?** Une copie montre les règles directement dans le fichier : vous pouvez les modifier, prendre une grammaire plus récente que le package installé, ou une grammaire tierce. Une copie ne change pas lorsque le plugin met à jour highlight.js ; pour l’actualiser, convertissez à nouveau le langage avec `--force`. Un fichier créé avec `--npm` ne fait que quelques lignes, et sa grammaire est mise à jour en même temps que le plugin.

## Compilation et application

```sh
sh highlight/_compile.sh
```

- Cette commande nécessite Docker (la compilation s’exécute dans un conteneur `node:20-alpine`) ou, à défaut de Docker, Node.js 18+ sur la même machine. Lors du premier lancement, le script installe les packages npm dans le dossier `node_modules/` du plugin.
- Le script commence par vérifier chaque langage : il le compile séparément, le charge, l’enregistre dans le même moteur que celui qui s’exécute dans le navigateur et colore un texte d’exemple. Si un langage est défectueux (erreur dans le code, expression régulière invalide, `id` déjà pris), le script indique le fichier et la raison, puis s’arrête ; le `tiptap_highlight.js` précédent reste en place.
- Ensuite, le script regroupe tous les langages dans `assets/javascripts/tiptap_highlight.js`.

Après la compilation, redémarrez Redmine : il publie les fichiers des plugins au démarrage (voir « Mise à jour » dans le [README principal](../../docs/README.fr.md#mise-à-jour) pour les commandes). Les navigateurs récupèrent immédiatement le nouveau fichier, car son URL contient une empreinte du contenu.

Si le serveur Redmine n’a ni Docker ni Node.js, effectuez la compilation sur n’importe quelle machine qui dispose de l’un des deux (une copie du dossier du plugin suffit) et placez le fichier `assets/javascripts/tiptap_highlight.js` obtenu sur le serveur.

## Suppression d’un langage

Supprimez le fichier du langage dans `highlight/`, compilez, puis redémarrez Redmine. Les blocs enregistrés dans ce langage restent tels quels et sont affichés comme du texte brut. Les fichiers de `_vendor/` devenus inutiles se suppriment avec :

```sh
python3 highlight/_convert_grammar.py --prune
```

## Grammaires propres et modification des règles

- Une grammaire est une fonction qui reçoit l’objet `hljs` et renvoie une définition de langage : quels morceaux de texte marquer et comment. Guide : https://highlightjs.readthedocs.io/en/latest/language-guide.html, référence : https://highlightjs.readthedocs.io/en/latest/mode-reference.html. Exemples : `log.js`, `journalctl.js`, `cisco-ios.js`.
- highlight.js réunit les expressions régulières de toutes les règles d’un langage en une seule et ignore leurs propres indicateurs. Il faut donc écrire explicitement la correspondance insensible à la casse (`[Ee]rror`) ou l’activer pour l’ensemble du langage avec `case_insensitive: true`.
- Privilégiez les classes de jetons standard (`keyword`, `string`, `number`, `comment`, `title`, `attr`, `variable`, `built_in`, `literal`, `meta`, `symbol`, `type`, etc.) : elles ont déjà des couleurs. Une classe personnalisée (par exemple, `scope: 'log-error'` produit la classe `hljs-log-error`) nécessite une règle dans `assets/stylesheets/src/06_code.css` et une recompilation du CSS (`assets/stylesheets/src/_build.sh`).
- Pour proposer une grammaire existante sous un autre nom, faites comme `cmd.js` : appelez la grammaire d’origine et modifiez `name` et `aliases` dans son résultat. Si les alias ne sont pas remplacés, le nouveau langage les reprend de l’original.

## Mise à jour du plugin lorsque vous avez ajouté des langages

Vos fichiers dans `highlight/` ne sont pas touchés par git. En revanche, le fichier `assets/javascripts/tiptap_highlight.js` de la nouvelle version du plugin est compilé sans vos langages, et votre propre version compilée de ce fichier gêne `git pull`. Procédez donc ainsi :

```sh
cd /path/to/redmine/plugins/redmine_tiptap
git checkout -- assets/javascripts/tiptap_highlight.js
git pull
sh highlight/_compile.sh
```

La première commande annule votre compilation, la dernière compile de nouveau les langages, y compris les vôtres. Redémarrez ensuite Redmine. Si vous avez modifié des fichiers de langage livrés avec le plugin, git peut vous demander d’y résoudre des conflits.

Si le plugin a été installé à partir d’une archive, sauvegardez vos fichiers de langage et le dossier `_vendor/` avant de remplacer le dossier du plugin, remettez-les en place ensuite, puis compilez les langages.

## Taille

Tous les langages sont regroupés dans un seul fichier ; le navigateur le télécharge une fois, puis le récupère depuis le cache. Actuellement, il pèse 226 KB pour 52 langages. La plupart des langages occupent de 1 à 10 KB, le plus volumineux étant 1C (55 KB).
