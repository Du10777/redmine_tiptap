# シンタックスハイライト: 言語

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

> *この翻訳は AI モデルの助けを借りて作成されたもので、ネイティブスピーカーによる確認は行われていません。誤りを見つけた場合は、[issue またはプルリクエストを作成](https://github.com/Du10777/redmine_tiptap)してください。*

コードブロックは、エディターでも保存済みのページ（チケット、コメント、Wiki）でもハイライトされ、どちらでも見た目は同じです。ブロックの言語は、右上隅のバッジから選択します。言語の一覧は `highlight/` フォルダー内のファイルで定義されており、1 つのファイルが 1 つの言語に対応します。

プラグインには 52 言語が同梱されています。さらに追加することもできます。既製の highlight.js の文法をスクリプトで変換する（[highlight.js から言語を追加する](#highlightjs-から言語を追加する)を参照）か、自分で作成します。

## 仕組み

- ハイライトは [highlight.js](https://highlightjs.org)（[lowlight](https://github.com/wooorm/lowlight) 経由）が行います。エディターと保存済みのページは同じエンジンを使うため、色が一致します。
- `_compile.sh` は、すべての言語ファイルを 1 つのファイル `assets/javascripts/tiptap_highlight.js` にバンドルします。このファイルはビルド済みの状態でリポジトリにコミットされているため、プラグインのインストールにビルドは不要です。ビルドが必要なのは、言語の構成を変更したときだけです。
- Redmine は、すべてのページで、エディター（`tiptap_bundle.js`）より前に `tiptap_highlight.js` を読み込みます。読み込み時に、エディターはこのファイルからすべての言語を登録します。
- エディターでは、入力が止まってから 50 ms 後に、変更があったブロックだけが再ハイライトされます。保存済みのページでは、ブロックが表示領域にスクロールされたときにハイライトされます。閉じた状態の折りたたみブロック内にあるコードブロックは、そのブロックが開かれたときにハイライトされます。
- 言語は、保存される HTML に `<pre><code class="language-<id>">` の形で記録されます。そのため、言語の `id` は決して変更してはいけません。古い `id` で保存されたブロックは、プレーンテキストになってしまいます。
- 言語の自動判定はありません。言語のないブロックは、プレーンテキストとして表示されます。言語が `highlight/` にないブロック（たとえば、言語ファイルが削除された場合）も同様で、そのバッジには `id` が表示され続けます。言語ファイルが復活すれば、色も戻ります。
- 色: highlight.js は、`hljs-keyword`、`hljs-string`、`hljs-comment` などのクラスでテキストに印を付けます。これらの色は `assets/stylesheets/src/06_code.css` で設定されており、Redmine 自身のシンタックスハイライトのパレットが使われています。

## 言語ファイル

たとえば、`routeros.js` は次のようになります。

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

| フィールド | 必須 | 説明 |
|---|---|---|
| `id` | はい | 保存される HTML 内の言語名（`class="language-<id>"`）。使用できる文字: `a-z`、`0-9`、`-`、`_`。この言語のブロックを一度保存したら、**絶対に変更しないでください**。 |
| `label` | いいえ | 言語の一覧とブロックのバッジに表示される名前。省略すると `id` が使われます。 |
| `hint` | いいえ | 一覧で名前の横に表示される灰色の補足。 |
| `keywords` | いいえ | 一覧の検索用の追加ワード（スペース区切り）。 |
| `grammar` | はい | highlight.js の文法: 関数 `(hljs) => language definition`。 |

`label`、`hint`、`keywords` は英語で書かれています。ユーザーの表示言語で言語を別の名前で表示したり、その言語の単語で検索できるようにしたりするには、その言語の翻訳ファイル `config/locales/<code>.yml` の `code_languages:` の下に項目を追加します。そこに書いた単語は `keywords` に追加され、`label` と `hint` は言語ファイルのものを置き換えます。`config/locales/ru.yml` に例があり、ルールは [config/locales/README.md](../../config/locales/README.md) にあります。

フォルダー内のファイルの種類は次のとおりです。

- **短いファイル。** highlight.js の npm パッケージにある文法への参照で、上の例がこれにあたります。ほとんどの言語がこの形式です。文法は、プラグインの `package-lock.json` に記録されている highlight.js のバージョンのものが使われます。
- **完全なコピー。** 文法のコードがファイル自体に含まれており、編集できます。このようなファイルは、変換スクリプトによって作成されます（後述）。
- **独自の文法。** `log.js`、`journalctl.js`、`cisco-ios.js`。これらの共通部分は `_common.js` にあります。
- **ラッパー。** 既製の文法を別の名前で提供するファイル。`cmd.js` は highlight.js の `dos`、`docker-compose.js` は `yaml` です。

名前が `_` で始まるファイルとフォルダーは、言語ではありません。

- `_compile.sh` は、言語をビルドします。
- `_check.mjs` は、ビルド中に言語を検証します。
- `_common.js` には、プラグイン独自の文法の共通部分が入っています。
- `_convert_grammar.py` は、highlight.js の文法を変換するスクリプトです（後述）。
- `_vendor/` には、変換された文法がインポートするファイルが入っています（変換スクリプトが作成します）。

`README/` フォルダーには、このドキュメントが入っています。

## highlight.js から言語を追加する

既製の文法（190 以上）は https://github.com/highlightjs/highlight.js/tree/main/src/languages にあります。それらの名前とエイリアスは、別のリポジトリで管理されている約 100 のサードパーティ製の文法とともに、[SUPPORTED_LANGUAGES.md](https://github.com/highlightjs/highlight.js/blob/main/SUPPORTED_LANGUAGES.md) に一覧があります。このフォルダーにあるスクリプト `_convert_grammar.py` は、それらのどれでもプラグインの形式に変換します。

スクリプトの実行には、Python 3.6 以上（追加パッケージは不要）と github.com へのアクセスが必要です。プラグインのフォルダーで実行します。

```sh
cd /path/to/redmine/plugins/redmine_tiptap
python3 highlight/_convert_grammar.py erlang
sh highlight/_compile.sh
```

引数 `erlang` は、`src/languages` にあるファイル名から `.js` を除いたものです。2 つ目のコマンドは、言語をビルドして検証します。その後、Redmine を再起動します（[ビルドと適用](#ビルドと適用)を参照）。Windows では、`python3` の代わりに `py` または `python` を使用します。

例:

```sh
# highlight.js の言語の一覧（* = すでに highlight/ にあるもの）。単語で絞り込むこともできます
python3 highlight/_convert_grammar.py --list
python3 highlight/_convert_grammar.py --list sql

# 複数の言語を一度に変換
python3 highlight/_convert_grammar.py erlang nix fsharp

# 独自の名前、ヒント、検索ワードを指定（一度に 1 言語のみ）
python3 highlight/_convert_grammar.py erlang --label "Erlang/OTP" --hint BEAM --keywords "erl otp"

# プラグインに同梱されている短いファイルを、編集可能な完全なコピーに置き換える
python3 highlight/_convert_grammar.py routeros --force --label RouterOS --hint MikroTik --keywords mikrotik

# リリース済みの highlight.js のバージョンにまだない言語を、開発ブランチから取得する
python3 highlight/_convert_grammar.py odin --ref main

# 文法ファイルへのリンクを、ブラウザーのアドレスバーからそのまま指定する
python3 highlight/_convert_grammar.py https://github.com/highlightjs/highlight.js/blob/main/src/languages/odin.js

# サードパーティ製の文法: リポジトリへのリンクを指定すると、スクリプトが文法ファイルを探す
python3 highlight/_convert_grammar.py https://github.com/highlightjs/highlightjs-terraform

# ローカルの文法ファイル
python3 highlight/_convert_grammar.py ~/grammars/mylang.js --id mylang

# コードのコピーではなく、npm パッケージを参照する短いファイル
python3 highlight/_convert_grammar.py erlang --npm

# 何も変更せずに、実行される内容だけを表示する
python3 highlight/_convert_grammar.py erlang --dry-run
```

### スクリプトの動作

1. プラグインが使用している highlight.js のバージョンの `src/languages/<name>.js` をダウンロードします。バージョンは `package-lock.json`（現在は 11.12.0）から読み取ります。文法は、それぞれのバージョンのエンジン向けに書かれているためです。`--ref` で、別のバージョン、ブランチ、またはコミットを選択できます。
2. 文法のヘッダーにある `Language:` 行から言語名を、そのエイリアス（`aliases`）から検索ワードを取得します。`id` は文法のファイル名になります。
3. 文法のコードを、エクスポート部分を除いて変更せずに `highlight/<id>.js` に配置します。`export default function(hljs)` は `function grammar(hljs)` になり、言語オブジェクト `export default { id, label, keywords, grammar }` がファイルの末尾に追加されます。文法が CommonJS モジュール（`module.exports = ...`）の場合は、`module` と `exports` を宣言する行が先頭に追加されます。
4. 文法が他のファイルをインポートしている場合は、それらを `highlight/_vendor/<source>-<version>/` の下に、リポジトリと同じパスでダウンロードし、インポートの参照先をそこに向けます。たとえば、`typescript` は `javascript.js` と `lib/ecmascript.js` をインポートします。これらのファイルは、同じソースとバージョンのすべての言語で共有されるため、編集する必要はありません。
5. `Requires:` 行を確認します。この行には、埋め込みコードに使われる言語が列挙されています（たとえば、`php-template` には `xml` と `php` が必要です）。それらが `highlight/` にない場合は、追加するためのコマンドを表示します。それらがなくても、埋め込みコードに色が付かないだけで、エラーにはなりません。
6. `--force` なしでは既存のファイルを上書きせず、別のファイルですでに使われている `id` も採用しません。

変換後は、言語をそのファイル内で直接編集できます。

### オプション

| オプション | 動作 |
|---|---|
| `LANGUAGE ...` | highlight.js の言語名、GitHub 上の文法ファイルまたはサードパーティ製の文法リポジトリへのリンク、あるいはローカルの `.js` ファイルへのパス。 |
| `--ref REF` | highlight.js のバージョン（タグ）、ブランチ、またはコミット。省略すると `package-lock.json` のバージョンが使われます。リンクを指定した場合は、リンクからバージョンが取得されます。 |
| `--id ID` | 言語の `id`。省略すると文法のファイル名が使われます。 |
| `--label TEXT` | 一覧とバッジに表示される名前。省略すると、文法の `Language:` が使われます。 |
| `--hint TEXT` | 一覧に表示される灰色の補足。 |
| `--keywords TEXT` | スペース区切りの検索ワード。省略すると、文法のエイリアスが使われます。 |
| `--npm` | コードのコピーの代わりに、highlight.js の npm パッケージを参照する短いファイルを書き出します。highlight.js 自体の言語にのみ使用できます。 |
| `--force` | 既存のファイルを置き換えます。 |
| `--dry-run` | 何も変更せずに、実行される内容を表示します。 |
| `--list [WORD]` | highlight.js の言語とサードパーティ製の文法を一覧表示します。単語で絞り込むこともできます。 |
| `--prune` | どの言語からもインポートされなくなった `_vendor/` 内のファイルを削除します。 |


**コピーか `--npm` か。** コピーでは、ルールがファイル内にそのまま書かれているため、編集できるほか、インストール済みのパッケージより新しい文法やサードパーティ製の文法も使えます。コピーは、プラグインが highlight.js をアップグレードしても変わりません。更新するには、`--force` を付けてその言語をもう一度変換します。`--npm` で作成したファイルは数行しかなく、その文法はプラグインと一緒にアップグレードされます。

## ビルドと適用

```sh
sh highlight/_compile.sh
```

- Docker（ビルドは `node:20-alpine` コンテナー内で実行されます）が必要です。Docker がない場合は、同じマシンに Node.js 18 以上が必要です。初回の実行時に、スクリプトが npm パッケージをプラグインの `node_modules/` フォルダーにインストールします。
- まず、スクリプトがすべての言語を検証します。言語を単独でビルドして読み込み、ブラウザーで動作するものと同じエンジンに登録し、サンプルテキストをハイライトします。言語に問題がある場合（コードのエラー、無効な正規表現、すでに使用されている `id`）は、スクリプトがファイルと理由を表示して停止します。以前の `tiptap_highlight.js` はそのまま残ります。
- 次に、スクリプトがすべての言語を `assets/javascripts/tiptap_highlight.js` にバンドルします。

ビルドの後は、Redmine を再起動します。Redmine は起動時にプラグインのファイルを公開します（コマンドについては、[メインの README](../../docs/README.ja.md#アップデート) の「アップデート」を参照してください）。ファイルの URL にコンテンツのフィンガープリントが含まれているため、ブラウザーは新しいファイルをすぐに取得します。

Redmine のサーバーに Docker も Node.js もない場合は、どちらかがあるマシンでビルドし（プラグインのフォルダーのコピーがあれば十分です）、生成された `assets/javascripts/tiptap_highlight.js` をサーバーに配置してください。

## 言語の削除

`highlight/` から言語ファイルを削除し、ビルドして、Redmine を再起動します。この言語で保存済みのブロックはそのまま残り、プレーンテキストとして表示されます。不要になった `_vendor/` 内のファイルは、次のコマンドで削除できます。

```sh
python3 highlight/_convert_grammar.py --prune
```

## 独自の文法とルールの編集

- 文法は、`hljs` オブジェクトを受け取り、言語定義（どのテキストをどのようにマークするか）を返す関数です。ガイドは https://highlightjs.readthedocs.io/en/latest/language-guide.html に、リファレンスは https://highlightjs.readthedocs.io/en/latest/mode-reference.html にあります。例は `log.js`、`journalctl.js`、`cisco-ios.js` です。
- highlight.js は、言語のすべてのルールの正規表現を 1 つに結合し、各ルール自身のフラグは無視します。そのため、大文字と小文字を区別しない照合は、明示的に書く（`[Ee]rror`）か、`case_insensitive: true` で言語全体に対して有効にする必要があります。
- 標準のトークンクラス（`keyword`、`string`、`number`、`comment`、`title`、`attr`、`variable`、`built_in`、`literal`、`meta`、`symbol`、`type` など）を優先して使ってください。これらにはすでに色が設定されています。独自のクラス（たとえば、`scope: 'log-error'` はクラス `hljs-log-error` を生成します）には、`assets/stylesheets/src/06_code.css` へのルールの追加と、CSS の再ビルド（`assets/stylesheets/src/_build.sh`）が必要です。
- 既製の文法を別の名前で提供するには、`cmd.js` と同じようにします。元の文法を呼び出し、その結果の `name` と `aliases` を変更します。エイリアスを置き換えないと、新しい言語は元の言語からエイリアスを引き継ぎます。

## 言語を追加した場合のプラグインのアップデート

git は、`highlight/` 内の追加したファイルには手を加えません。ただし、新しいバージョンのプラグインに含まれる `assets/javascripts/tiptap_highlight.js` は、追加した言語を含まない状態でビルドされており、手元でビルドしたこのファイルは `git pull` の妨げになります。そこで、次のようにします。

```sh
cd /path/to/redmine/plugins/redmine_tiptap
git checkout -- assets/javascripts/tiptap_highlight.js
git pull
sh highlight/_compile.sh
```

最初のコマンドは手元のビルドを破棄し、最後のコマンドは、追加した言語を含めて言語をもう一度ビルドします。その後、Redmine を再起動します。プラグインに同梱されている言語ファイルを編集している場合は、git からそれらのコンフリクトの解消を求められることがあります。

プラグインをアーカイブからインストールした場合は、プラグインのフォルダーを置き換える前に、追加した言語ファイルと `_vendor/` フォルダーを退避しておき、置き換えた後に元の場所へ戻して、言語をビルドします。

## サイズ

すべての言語は 1 つのファイルにバンドルされます。ブラウザーはこのファイルを一度ダウンロードし、以降はキャッシュから読み込みます。現在のサイズは、52 言語で 226 KB です。ほとんどの言語は 1〜10 KB で、最大のものは 1C（55 KB）です。
