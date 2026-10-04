# 语法高亮：编程语言

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

> *本译文借助 AI 模型完成，尚未经过母语人士审校。如果发现错误，请[提交 issue 或 pull request](https://github.com/Du10777/redmine_tiptap)。*

代码块在编辑器和已保存的页面中（问题、说明、Wiki）同样会被高亮，两处的外观完全相同。代码块的语言通过其右上角的角标选择。语言列表由 `highlight/` 文件夹中的文件定义：一个文件对应一种语言。

插件内置了 52 种语言。可以添加更多：用脚本转换现成的 highlight.js 语法（参见[从 highlight.js 添加语言](#从-highlightjs-添加语言)）或编写自己的。

## 工作原理

- 高亮由 [highlight.js](https://highlightjs.org)（通过 [lowlight](https://github.com/wooorm/lowlight)）完成。编辑器和已保存的页面使用相同的引擎，因此颜色一致。
- `_compile.sh` 将所有语言文件打包成一个文件 `assets/javascripts/tiptap_highlight.js`。这个文件已在仓库中以构建状态提交，因此安装插件不需要构建。只有在改变语言集合时才需要构建。
- Redmine 在每个页面加载时都会加载 `tiptap_highlight.js`，在编辑器（`tiptap_bundle.js`）之前加载。加载时编辑器从该文件注册所有语言。
- 在编辑器中，代码块会在停止输入 50 毫秒后重新高亮，且只会高亮被改变的块。在已保存的页面中，代码块会在滚动进入视图时被高亮。折叠部分内的代码块会在展开时被高亮。
- 语言会被保存在 HTML 中：`<pre><code class="language-<id>">`。因此语言的 `id` 绝不能改变：用旧 `id` 保存的块会变成纯文本。
- 没有语言自动检测：没有指定语言的块显示为纯文本。指定的语言不在 `highlight/` 中的块也是如此（例如语言文件被删除了）；其角标仍会显示 `id`。如果语言文件恢复，颜色也会恢复。
- 颜色。highlight.js 用 `hljs-keyword`、`hljs-string`、`hljs-comment` 等类标记文本。这些类的颜色在 `assets/stylesheets/src/06_code.css` 中设置，使用 Redmine 自身语法高亮的调色板。

## 语言文件

例如 `routeros.js`：

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

| 字段 | 必需 | 说明 |
|---|---|---|
| `id` | 是 | 已保存 HTML 中的语言名称（`class="language-<id>"`）。允许的字符：`a-z`、`0-9`、`-`、`_`。**一旦有块用此语言保存，就绝不能改变。** |
| `label` | 否 | 语言列表中和块角标上显示的名称。默认为 `id`。 |
| `hint` | 否 | 列表中名称旁的灰色注记。 |
| `keywords` | 否 | 列表搜索的额外关键词，空格分隔。 |
| `grammar` | 是 | 一个 highlight.js 语法：一个函数 `(hljs) => language definition`。 |

`label`、`hint` 和 `keywords` 都是英文。要让一种语言在用户的界面语言中显示不同的名称，或用该语言的词使其可被搜索到，请在该语言的翻译文件 `config/locales/<code>.yml` 的 `code_languages:` 下添加条目。那里的词会被加到 `keywords`；`label` 和 `hint` 会替代语言文件中的。`config/locales/ru.yml` 有例子，规则在 [config/locales/README.md](../../config/locales/README.md) 中。

文件夹中各类文件：

- **短引用。** 对 highlight.js npm 包中语法的引用，如上面的例子；大多数语言都是这样。语法来自插件 `package-lock.json` 中记录的 highlight.js 版本。
- **完整副本。** 语法代码在文件本身中，可以编辑。这些文件由转换脚本创建（见下）。
- **自己的语法。** `log.js`、`journalctl.js`、`cisco-ios.js`；它们的共同部分在 `_common.js` 中。
- **包装器。** 现成的语法以另一个名称使用：`cmd.js` 是 highlight.js 中的 `dos`，`docker-compose.js` 是 `yaml`。

名称以 `_` 开头的文件和文件夹不是语言：

- `_compile.sh` 构建语言；
- `_check.mjs` 在构建过程中检查语言；
- `_common.js` 保存插件自己的语法的共同部分；
- `_convert_grammar.py` 是转换 highlight.js 语法的脚本（见下）；
- `_vendor/` 保存被转换的语法导入的文件（由转换脚本创建）。

`README/` 文件夹保存本文档。

## 从 highlight.js 添加语言

现成的语法（超过 190 种）在这里：https://github.com/highlightjs/highlight.js/tree/main/src/languages 。它们的名称和别名列在 [SUPPORTED_LANGUAGES.md](https://github.com/highlightjs/highlight.js/blob/main/SUPPORTED_LANGUAGES.md) 中，还有大约一百种第三方语法保存在单独的仓库中。这个文件夹中的脚本 `_convert_grammar.py` 可以将其中任意一种转换成插件的格式。

脚本需要 Python 3.6+（无需额外包）和对 github.com 的访问。从插件文件夹运行：

```sh
cd /path/to/redmine/plugins/redmine_tiptap
python3 highlight/_convert_grammar.py erlang
sh highlight/_compile.sh
```

参数 `erlang` 是 `src/languages` 中的文件名，不带 `.js`。第二条命令构建语言并检查它们。然后重启 Redmine（见[构建和应用](#构建和应用)）。在 Windows 上用 `py` 或 `python` 替代 `python3`。

例子：

```sh
# highlight.js 语言列表（* = 已在 highlight/ 中），可选用关键词过滤
python3 highlight/_convert_grammar.py --list
python3 highlight/_convert_grammar.py --list sql

# 一次多种语言
python3 highlight/_convert_grammar.py erlang nix fsharp

# 自定义名称、注记和搜索词（一次一种语言）
python3 highlight/_convert_grammar.py erlang --label "Erlang/OTP" --hint BEAM --keywords "erl otp"

# 替换插件内置的短文件为可编辑的完整副本
python3 highlight/_convert_grammar.py routeros --force --label RouterOS --hint MikroTik --keywords mikrotik

# 一个尚未发布的 highlight.js 版本中的语言，从开发分支获取
python3 highlight/_convert_grammar.py odin --ref main

# 一个语法文件的链接，直接从浏览器地址栏复制
python3 highlight/_convert_grammar.py https://github.com/highlightjs/highlight.js/blob/main/src/languages/odin.js

# 第三方语法：其仓库的链接，脚本找到语法文件
python3 highlight/_convert_grammar.py https://github.com/highlightjs/highlightjs-terraform

# 本地语法文件
python3 highlight/_convert_grammar.py ~/grammars/mylang.js --id mylang

# 一个短文件，引用 npm 包而非代码副本
python3 highlight/_convert_grammar.py erlang --npm

# 显示将要进行的操作而不做任何改变
python3 highlight/_convert_grammar.py erlang --dry-run
```

### 脚本做什么

1. 下载插件运行的 highlight.js 版本的 `src/languages/<name>.js`。版本从 `package-lock.json` 读取（当前 11.12.0），因为语法是为其版本的引擎编写的。`--ref` 选择另一个版本、分支或提交。
2. 从语法头的 `Language:` 行读取语言名称，从其别名（`aliases`）读取搜索词。`id` 是语法文件名。
3. 把语法代码放入 `highlight/<id>.js`，除了导出部分不变：`export default function(hljs)` 变成 `function grammar(hljs)`，语言对象 `export default { id, label, keywords, grammar }` 追加在文件末尾。如果语法是 CommonJS 模块（`module.exports = ...`），文件顶部会添加声明 `module` 和 `exports` 的行。
4. 如果语法导入其他文件，下载它们到 `highlight/_vendor/<source>-<version>/`，保持在仓库中的相同路径，并指向那里。例如 `typescript` 导入 `javascript.js` 和 `lib/ecmascript.js`。这些文件被来自相同源和版本的所有语言共用；无需编辑。
5. 检查 `Requires:` 行，列出用于嵌入代码的语言（例如 `php-template` 需要 `xml` 和 `php`）。如果它们不在 `highlight/` 中，打印添加它们的命令。没有它们嵌入的代码只是保持无颜色；这不是错误。
6. 没有 `--force` 不会覆写现有文件，不会取用已被另一个文件使用的 `id`。

转换后语言可以直接在其文件中编辑。

### 选项

| 选项 | 说明 |
|---|---|
| `LANGUAGE ...` | 一个 highlight.js 语言名称，一个语法文件的链接或 GitHub 上第三方语法仓库的链接，或本地 `.js` 文件的路径。 |
| `--ref REF` | highlight.js 版本（标签）、分支或提交。默认为 `package-lock.json` 中的版本。对于链接，版本从链接中提取。 |
| `--id ID` | 语言 `id`。默认为语法文件名。 |
| `--label TEXT` | 列表中和角标上的名称。默认为语法中的 `Language:`。 |
| `--hint TEXT` | 列表中的灰色注记。 |
| `--keywords TEXT` | 空格分隔的搜索词。默认：语法的别名。 |
| `--npm` | 不用代码副本，而是写一个短文件引用 highlight.js npm 包。仅适用于 highlight.js 自身的语言。 |
| `--force` | 替换现有文件。 |
| `--dry-run` | 显示将要做的事而不改变任何东西。 |
| `--list [WORD]` | 列出 highlight.js 语言和第三方语法，可选用关键词过滤。 |
| `--prune` | 删除 `_vendor/` 中没有语言再导入的文件。 |


**副本还是 `--npm`？** 副本在文件中显示规则：可以编辑、采用比已安装包更新的语法或第三方语法。副本在插件升级 highlight.js 时不变；要刷新请用 `--force` 再转换一次。用 `--npm` 制作的文件只有几行，其语法随插件一起升级。

## 构建和应用

```sh
sh highlight/_compile.sh
```

- 需要 Docker（构建在 `node:20-alpine` 容器中运行）或如果没有 Docker，则需要机器上的 Node.js 18+。首次运行时脚本会把 npm 包安装到插件的 `node_modules/` 文件夹。
- 首先脚本检查每种语言：分别构建、加载、在浏览器中运行的相同引擎中注册、高亮样本文本。如果一种语言损坏（代码中的错误、无效的正则表达式、已取用的 `id`），脚本会标出文件和原因并停止；之前的 `tiptap_highlight.js` 保持不变。
- 然后脚本将所有语言打包成 `assets/javascripts/tiptap_highlight.js`。

构建后，重启 Redmine：在启动时发布插件文件（[主 README](../../docs/README.zh.md#更新) 的"更新"部分有命令）。浏览器立即获得新文件，因为其 URL 包含内容的指纹。

如果 Redmine 服务器既没有 Docker 也没有 Node.js，在有其中之一的任何机器上构建（只需插件文件夹的副本）然后把 `assets/javascripts/tiptap_highlight.js` 放到服务器上。

## 删除语言

从 `highlight/` 删除语言文件、构建、重启 Redmine。用此语言保存的块保持原样，显示为纯文本。`_vendor/` 中不再需要的文件用以下方式删除：

```sh
python3 highlight/_convert_grammar.py --prune
```

## 自己的语法和编辑规则

- 语法是一个函数，接收 `hljs` 对象并返回一个语言定义：标记哪些文本以及如何标记。指南：https://highlightjs.readthedocs.io/en/latest/language-guide.html ，参考：https://highlightjs.readthedocs.io/en/latest/mode-reference.html 。例子：`log.js`、`journalctl.js`、`cisco-ios.js`。
- highlight.js 把一种语言所有规则的正则表达式连接起来并忽视它们各自的标志。因此不区分大小写的匹配必须拼出（`[Ee]rror`）或用 `case_insensitive: true` 为整个语言启用。
- 倾向于标准令牌类（`keyword`、`string`、`number`、`comment`、`title`、`attr`、`variable`、`built_in`、`literal`、`meta`、`symbol`、`type` 等）：它们已有颜色。自己的类（例如 `scope: 'log-error'` 生成类 `hljs-log-error`）需要 `assets/stylesheets/src/06_code.css` 中的规则和 CSS 重构（`assets/stylesheets/src/_build.sh`）。
- 要用另一个名称提供现成的语法，如 `cmd.js` 做的：调用原语法并改变其结果中的 `name` 和 `aliases`。如果别名没被替换，新语言会从原语言继承它们。

## 添加语言时更新插件

git 不会动你 `highlight/` 中的文件。但新插件版本的 `assets/javascripts/tiptap_highlight.js` 是在没有你的语言情况下构建的，你这个文件的构建会妨碍 `git pull`。所以：

```sh
cd /path/to/redmine/plugins/redmine_tiptap
git checkout -- assets/javascripts/tiptap_highlight.js
git pull
sh highlight/_compile.sh
```

第一条命令放弃你的构建，最后一条再次构建语言，包括你的。然后重启 Redmine。如果编辑过插件随附的语言文件，git 可能要求解决冲突。

如果从压缩包安装插件，替换前保存你的语言文件和 `_vendor/` 文件夹，替换后放回，然后构建语言。

## 大小

所有语言打包成一个文件；浏览器一次下载，然后从缓存获取。当前 52 种语言 226 KB。大多数语言 1–10 KB，最大的是 1C（55 KB）。
