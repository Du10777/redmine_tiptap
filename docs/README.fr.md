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

> *Cette traduction a été réalisée avec l’aide d’un modèle d’IA et n’a pas été relue par un locuteur natif. Si vous trouvez une erreur, veuillez [ouvrir une issue ou une pull request](https://github.com/Du10777/redmine_tiptap).*

Il s’agit d’un éditeur de texte pour Redmine, basé sur TipTap https://github.com/ueberdosis/tiptap

Moteur de l’éditeur : **TipTap 3.31.4**. Tous les packages `@tiptap/*` sont épinglés à cette version exacte dans `package.json` et `package-lock.json` et doivent toujours être mis à jour ensemble, vers une seule et même version.

**Sommaire**

- [Versions de Redmine prises en charge](#versions-de-redmine-prises-en-charge)
- [Fonctionnalités](#fonctionnalités)
  - [Formatage du texte](#formatage-du-texte)
  - [Listes](#listes)
  - [Tableaux](#tableaux)
  - [Images et fichiers joints](#images-et-fichiers-joints)
  - [Code](#code)
  - [Blocs](#blocs)
  - [Édition](#édition)
  - [Intégration à Redmine](#intégration-à-redmine)
- [Coloration syntaxique](#coloration-syntaxique)
- [Langue de l’interface](#langue-de-linterface)
- [Installation](#installation)
- [Mise à jour](#mise-à-jour)
  - [Installé avec git (recommandé)](#installé-avec-git-recommandé)
  - [Installé à partir d’une archive](#installé-à-partir-dune-archive)
  - [Après la mise à jour](#après-la-mise-à-jour)
- [Migration depuis CKEditor](#migration-depuis-ckeditor)

## Versions de Redmine prises en charge

| Redmine | Prise en charge | Testé sur |
|---|---|---|
| 7.x | oui | 7.0.2 |
| 6.x | oui | 6.1.4, 6.1.5 |
| 5.x et antérieures | non | — |

Une nouvelle version majeure (8.x et suivantes) n'est prise en charge qu'après que le plugin y a été testé. D'ici là, Redmine dans cette version ne démarre pas avec le plugin installé : il s'arrête sur une erreur qui indique les versions prises en charge.

## Fonctionnalités

### Formatage du texte
- Gras, italique, souligné, barré, indice et exposant (Ctrl+, et Ctrl+.), code en ligne.
- Couleur du texte et couleur d’arrière-plan : une palette de 64 couleurs ou n’importe quelle valeur hexadécimale.
- Police (13 polices) et taille de police (valeurs prédéfinies de 8 à 72 px, ou n’importe quelle valeur).
- Styles de paragraphe : titres 1 à 6 et texte normal.
- Alignement (à gauche, centré, à droite, justifié) et retrait (jusqu’à 8 niveaux) des paragraphes et des titres.
- Liens : insérer, modifier, supprimer.
- Ligne horizontale, annuler et rétablir.

### Listes
- Listes à puces avec des marqueurs en forme de disque, de cercle ou de carré.
- Listes numérotées : 1, 01, a, A, i, I, α.
- Listes de tâches avec cases à cocher ; les tâches terminées sont barrées.
- Listes imbriquées (Tab / Shift+Tab).

### Tableaux
- Insérer un tableau de n’importe quelle taille, avec ou sans ligne d’en-tête.
- Menu du clic droit dans une cellule : ajouter et supprimer des lignes et des colonnes, fusionner et fractionner des cellules, ligne d’en-tête et colonne d’en-tête, supprimer le tableau.
- La largeur des colonnes se modifie en faisant glisser les bordures des cellules.
- Le collage depuis Excel conserve la largeur des colonnes, l’alignement et les tailles de police ; un tableau copié depuis Redmine se colle dans Excel avec ses bordures.

### Images et fichiers joints
- Coller une image depuis le presse-papiers : elle est téléversée comme fichier joint et apparaît dans le texte.
- Les images jointes avec le champ « Fichiers » de Redmine, ou déposées sur ce champ, sont elles aussi insérées dans le texte.
- Insérer une image depuis les fichiers joints (sélecteur de miniatures) ou un lien vers n’importe quel fichier joint.
- Redimensionner une image en faisant glisser ses coins.

### Code
- Blocs de code avec coloration syntaxique dans l’éditeur et sur les pages enregistrées : 52 langages, et vous pouvez en ajouter d’autres (voir [Coloration syntaxique](#coloration-syntaxique)).
- Le langage d’un bloc se choisit depuis un badge placé dans son coin, avec une recherche et les langages récents et fréquents.
- Tab et Shift+Tab augmentent et diminuent le retrait des lignes dans un bloc de code ; le gras, les liens et les couleurs à l’intérieur du code sont conservés.

### Blocs
- Bloc repliable : un titre avec un contenu masqué (`<details>`). Replié sur les pages enregistrées, déplié dans l’éditeur.
- Bloc de citation avec une ligne pour l’auteur et la date.

### Édition
- Mode `<HTML>` pour afficher et modifier le code source HTML : les blocs imbriqués sont mis en retrait, une ligne vide sépare les blocs qui occupent plusieurs lignes, la syntaxe est colorée selon les mêmes règles que dans un bloc de code HTML, et Enter conserve le retrait de la ligne.
- Saisie de type Markdown : `#` pour les titres, `-` et `1.` pour les listes, `[ ]` pour les tâches, ```` ```python ```` pour un bloc de code (n’importe quel nom de langage, ou aucun), `**bold**`, `---` pour une ligne horizontale. Raccourcis clavier standard : Ctrl+B, Ctrl+I, Ctrl+U, Ctrl+Z et d’autres.
- L’éditeur ne devient jamais plus haut que la fenêtre : la barre d’outils et les boutons du formulaire restent visibles, et le texte défile à l’intérieur. La hauteur suit la taille de la fenêtre et le zoom de la page.
- Une poignée de redimensionnement dans le coin inférieur droit permet de régler la hauteur à la main. La hauteur est mémorisée ; un double-clic rétablit la hauteur automatique.

### Intégration à Redmine
- Fonctionne dans tous les champs de texte de Redmine qui prennent en charge le formatage : descriptions et notes des demandes, pages wiki, annonces, messages des forums, documents, descriptions des projets, champs personnalisés de type texte long, y compris les champs qui apparaissent plus tard sur la page.
- Le texte est stocké en HTML. Pour utiliser l’éditeur, choisissez *TipTap HTML* comme formatage du texte dans la configuration de Redmine.
- L’interface (info-bulles, menus, boîtes de dialogue) suit la langue du profil Redmine de l’utilisateur. 47 des 50 langues de Redmine sont fournies avec le plugin : l’anglais et le russe sont complets, les 45 autres sont des ébauches réalisées avec un modèle d’IA, dont la correction par des locuteurs natifs est la bienvenue. Les trois langues qui s’écrivent de droite à gauche (arabe, hébreu, persan) ne sont volontairement pas prises en charge (voir [Langue de l’interface](#langue-de-linterface)).
- Reste rapide avec les textes volumineux : les éditeurs des formulaires masqués ne sont créés qu’à l’ouverture du formulaire, et les longs blocs de code sont colorés lorsqu’ils apparaissent à l’écran au fil du défilement.
- Les textes écrits avec CKEditor (le plugin redmine_ckeditor) sont affichés comme ils l’étaient et s’ouvrent dans l’éditeur avec leur formatage : aucune conversion, voir [Migration depuis CKEditor](#migration-depuis-ckeditor).
- Les textes enregistrés sont affichés sans HTML dangereux : les scripts, les gestionnaires d’événements et les liens `javascript:` sont supprimés à l’affichage d’une page, seul ce que produit l’éditeur lui-même est conservé. Cela concerne aussi les textes qui arrivent par la REST API ou par le mode `<HTML>`.

## Coloration syntaxique

Les blocs de code sont colorés aussi bien dans l’éditeur que sur les pages enregistrées. Le langage d’un bloc se choisit depuis le badge situé dans son coin supérieur droit ; la liste dispose d’un champ de recherche et mémorise les langages utilisés récemment et fréquemment.

52 langages sont fournis avec le plugin, dont HTML, 1C, Cisco IOS, MikroTik RouterOS, Windows cmd, docker compose, les journaux des services Linux et la sortie de journalctl.

Vous pouvez ajouter vos propres langages. Chaque langage est un fichier du dossier `highlight/`. N’importe laquelle des plus de 190 grammaires de highlight.js, ou une grammaire tierce, se convertit en un tel fichier avec une seule commande :

```sh
python3 highlight/_convert_grammar.py erlang
sh highlight/_compile.sh
```

Détails : [highlight/README/fr.md](../highlight/README/fr.md).

## Langue de l’interface

L’éditeur s’affiche dans la langue choisie dans le profil Redmine de l’utilisateur (Mon compte → Langue). Les fichiers de 47 des 50 langues de Redmine sont fournis avec le plugin, dans `config/locales/`. L’anglais est la langue source et le russe est l’œuvre de l’auteur lui-même ; les 45 autres sont des ébauches réalisées avec l’aide d’un modèle d’IA et pas encore relues par des locuteurs natifs : attendez-vous donc à une tournure étrange çà et là. Un texte absent d’un fichier s’affiche en anglais.

Pour corriger une traduction, modifiez ses valeurs dans `config/locales/<code>.yml` (`de`, `fr`, `pt-BR`, ...) puis redémarrez Redmine. La commande `bundle exec rake redmine_tiptap:locales` vérifie les fichiers. Les pull requests contenant des corrections sont les bienvenues.

**Les langues qui s’écrivent de droite à gauche (arabe, hébreu, persan) ne sont volontairement pas prises en charge.** Leur prise en charge exige de nombreuses modifications de la base de code, et pas seulement une traduction ; nous avons choisi de ne pas nous y atteler. Pour ces langues, l’éditeur s’affiche en anglais et sa mise en page n’est pas adaptée. Si vous avez besoin de l’une d’elles, créez un fork : le mécanisme de traduction est prêt, et ce qu’il faut modifier d’autre est indiqué dans [config/locales/README.md](../config/locales/README.md#right-to-left-languages).

Détails et liste des langues de Redmine : [config/locales/README.md](../config/locales/README.md).

## Installation

1. Placez le plugin dans le dossier `plugins` de Redmine. Le dossier doit s’appeler `redmine_tiptap`. Le plus simple est d’utiliser git, ce qui réduit aussi les mises à jour à une seule commande :
   ```sh
   cd /path/to/redmine
   git clone --branch release --single-branch --depth 1 https://github.com/Du10777/redmine_tiptap.git plugins/redmine_tiptap
   ```
   La branche `release` ne contient que les fichiers dont le plugin a besoin pour fonctionner, sans cette documentation, et `--depth 1` ne télécharge pas l’historique du dépôt.
2. Redémarrez Redmine.
3. Dans la configuration de Redmine (redmine.selfhosted/_settings_), choisissez Formatage du texte : *TipTap HTML*.

## Mise à jour

Le plugin n’a pas de migrations de base de données, et le bundle JavaScript compilé ainsi que la feuille de style font partie du dépôt. La mise à jour ne nécessite ni npm ni compilation sur le serveur : remplacez les fichiers du plugin et redémarrez Redmine.

Avant la mise à jour, vérifiez que la nouvelle version prend en charge votre version de Redmine (voir « Versions de Redmine prises en charge » ci-dessus).

### Installé avec git (recommandé)

```sh
cd /path/to/redmine/plugins/redmine_tiptap
git pull
```

Redémarrez ensuite Redmine, par exemple :

```sh
sudo systemctl restart redmine          # Redmine exécuté en tant que service systemd
touch /path/to/redmine/tmp/restart.txt  # Passenger
docker compose restart redmine          # Docker
```

Pour rester sur une version précise plutôt que sur la plus récente, récupérez un commit de la branche `release` et basculez dessus : `git fetch --depth 1 origin <commit> && git checkout <commit>`.

Si le plugin a été installé avec un simple `git clone` (la branche `main`, avec la documentation et tout l’historique), passez une fois à la branche `release` : supprimez le dossier `plugins/redmine_tiptap` et réinstallez le plugin comme décrit dans [Installation](#installation). Le plugin ne garde rien qui lui soit propre dans son dossier, rien n’est donc perdu ; seuls les langages de coloration syntaxique que vous avez ajoutés vous-même doivent d’abord être copiés hors de `highlight/`.

### Installé à partir d’une archive

1. Téléchargez l’archive de la branche `release` : https://github.com/Du10777/redmine_tiptap/archive/refs/heads/release.zip. Supprimez l’ancien dossier `plugins/redmine_tiptap` et décompressez l’archive à sa place ; le dossier de l’archive s’appelle `redmine_tiptap-release`, renommez-le en `redmine_tiptap`. Cette suppression préalable garantit que les fichiers retirés dans la nouvelle version ne subsistent pas.
2. Supprimez `public/assets/.manifest.json` dans le dossier de Redmine.
3. Redémarrez Redmine.

L’étape 2 est importante. Au démarrage, Redmine ne republie les assets des plugins que si leurs fichiers sont plus récents que ce manifeste. Les fichiers décompressés d’une archive conservent leurs horodatages d’origine ; sans l’étape 2, Redmine risque donc de continuer à servir l’ancien éditeur. Le manifeste est recréé automatiquement au démarrage. Avec `git pull`, cette étape n’est pas nécessaire : git attribue aux fichiers modifiés l’heure actuelle.

### Après la mise à jour

- Le script et la feuille de style de l’éditeur sont servis avec une empreinte du contenu dans leurs URL, si bien que les navigateurs chargent la nouvelle version dès le redémarrage. Les utilisateurs n’ont pas besoin de vider le cache de leur navigateur.
- Si l’option *Mettre en cache le texte formaté* est activée dans la configuration de Redmine (Administration → Configuration → Général), videz une fois le cache de Redmine après la mise à jour vers une version qui change le rendu des textes (nettoyage du HTML, prise en charge des textes CKEditor) : `bundle exec rake tmp:cache:clear RAILS_ENV=production` dans le dossier de Redmine. Sinon, les pages générées avant la mise à jour peuvent être affichées depuis le cache, non nettoyées, jusqu’à ce que leur texte change.
- Les versions précédentes du plugin copiaient le script dans `public/tiptap_bundle.js`. Ces fichiers ne sont plus utilisés et peuvent être supprimés :
  ```sh
  rm -f /path/to/redmine/public/tiptap_bundle.js /path/to/redmine/public/tiptap_bundle.js.map
  ```

## Migration depuis CKEditor

Si votre Redmine utilisait [redmine_ckeditor](https://github.com/a-ono/redmine_ckeditor), vous pouvez passer à ce plugin et conserver tous les textes écrits : demandes, notes, pages wiki, annonces, messages, documents. Rien n'est converti et la base de données n'est pas modifiée. CKEditor stocke ses textes en HTML, comme ce plugin le fait aussi, de sorte qu'un texte stocké est simplement affiché par le nouveau formateur.

1. Installez le plugin (voir ci-dessus) et choisissez Formatage du texte : *TipTap HTML*.
2. Conservez le dossier `public/system/rich/` de votre Redmine. Si des utilisateurs ont inséré des images et des fichiers avec le navigateur d'images de CKEditor, ils y sont stockés, et non dans la base de données ni parmi les fichiers joints ; les textes s'y réfèrent par adresse (`/system/rich/...`). **Si Redmine est déplacé vers un autre serveur ou réinstallé, déplacez aussi ce dossier**, avec la base de données et le dossier `files/` : ni l'un ni l'autre ne contient ces fichiers, et sans ce dossier les images des textes anciens renvoient une erreur 404. Les fichiers joints des demandes, pages wiki et autres sont stockés comme avant et ne nécessitent rien. Les images insérées dans cet éditeur sont des fichiers joints ordinaires. Le dossier reste nécessaire après la suppression de redmine_ckeditor.
3. Supprimez redmine_ckeditor quand vous n'en avez plus besoin.

Un texte ancien s'affiche comme CKEditor l'affichait : polices, tailles, couleurs et alignement, retraits, listes, tableaux (bordures, largeurs, légendes, cellules fusionnées), images (taille, positionnement, bordure, image dans un lien), liens, blocs de code avec leur langage (colorés), macros Redmine (`{{toc}}`, `{{collapse(Title) ... }}`, `{{thumbnail(...)}}` et autres), liens wiki et demandes, adresses web simples rendues cliquables, et `<iframe>` intégrés (vidéo). Un texte écrit avec CKEditor est reconnu par son balisage et conserve l'espacement entre paragraphes qu'il avait là, lequel est plus large que dans cet éditeur.

Différences intentionnelles :
- Une `<iframe>` n'est affichée que si elle pointe vers un autre site via http(s), et elle est cloisonnée : la page qu'elle contient peut exécuter ses propres scripts, mais ne peut pas accéder à la page de Redmine, ouvrir la fenêtre supérieure ou soumettre des formulaires. Toutes les autres `<iframe>` sont supprimées.
- Les liens s'ouvrent dans la même fenêtre : l'attribut `target` d'un lien (« Nouvelle fenêtre (_blank) » dans CKEditor) n'est pas conservé.
- Certains formatages que CKEditor proposait mais que ses pages supprimaient silencieusement s'affichent ici : par exemple, les couleurs d'arrière-plan de ses styles « Marqueur » et les guillemets de `<q>`.
- Le style « Special Container » de CKEditor (un bloc avec un cadre gris) s'affiche comme un bloc de code sans coloration syntaxique, et c'est aussi un bloc de code dans l'éditeur.

Un texte ancien conserve son formatage quand il est ouvert dans l'éditeur et enregistré à nouveau : macros Redmine (une macro est un élément gris dans l'éditeur ; modifiez-la en mode `<HTML>`, comme en mode Source de CKEditor), `<iframe>`, les blocs `<div>` et `<address>` avec leur style (un `<div>` collé depuis une page web est tout de même transformé en paragraphe), indice et exposant, styles en ligne de CKEditor (big, small, keyboard, sample et autres), le style des titres, tableaux et cellules de tableau, la taille (largeur et hauteur), le positionnement, la bordure et le lien des images, le langage des blocs de code. Ce qui ne survivra pas à l'édition : la légende d'un tableau devient un paragraphe centré au-dessus, les sections d'en-tête et de pied de tableau deviennent des lignes ordinaires (le pied reste en bas) et `<del>` devient `<s>` (même aspect). Un texte enregistré depuis cet éditeur obtient l'espacement compact des paragraphes de cet éditeur.
