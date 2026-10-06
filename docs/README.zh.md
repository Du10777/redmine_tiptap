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

> *本译文借助 AI 模型完成，尚未经过母语人士审校。如果发现错误，请[提交 issue 或 pull request](https://github.com/Du10777/redmine_tiptap)。*

这是一个用于 Redmine 的文本编辑器，基于 TipTap https://github.com/ueberdosis/tiptap

**[在线试用编辑器](https://du10777.github.io/redmine_tiptap/?lang=zh)**：演示页面直接在您的浏览器中运行本插件的编辑器，页面仿照 Redmine 的表单制作。您可以输入并设置文本格式、粘贴图片、打开“预览”选项卡查看文本保存后的样子、切换界面语言，或选择示例文本。无需安装任何东西，也不会发送任何数据。

[![演示页面上的编辑器](../docs/images/demo.png)](https://du10777.github.io/redmine_tiptap/?lang=zh)

编辑器引擎：**TipTap 3.31.4**。所有 `@tiptap/*` 包在 `package.json` 和 `package-lock.json` 中都固定为这一确切版本，并且必须始终一起升级，且升级到同一个版本。

**目录**

- [支持的 Redmine 版本](#支持的-redmine-版本)
- [功能](#功能)
  - [文本格式](#文本格式)
  - [列表](#列表)
  - [表格](#表格)
  - [图片和附件](#图片和附件)
  - [代码](#代码)
  - [内容块](#内容块)
  - [编辑](#编辑)
  - [与 Redmine 集成](#与-redmine-集成)
- [语法高亮](#语法高亮)
- [界面语言](#界面语言)
- [安装](#安装)
- [更新](#更新)
  - [通过 git 安装（推荐）](#通过-git-安装推荐)
  - [通过压缩包安装](#通过压缩包安装)
  - [更新之后](#更新之后)
- [从 CKEditor 编辑器进行迁移](#从-ckeditor-编辑器进行迁移)

## 支持的 Redmine 版本

| Redmine | 支持 | 已测试版本 |
|---|---|---|
| 7.x | 是 | 7.0.2 |
| 6.x | 是 | 6.1.4, 6.1.5 |
| 5.x 及更早版本 | 否 | — |

新的主版本（8.x 及以后）只有在插件于该版本上测试之后才会获得支持。在此之前，安装了插件的该版本 Redmine 将无法启动：它会停止并显示错误，其中列出受支持的版本。

## 功能

### 文本格式
- 粗体、斜体、下划线、删除线、下标和上标（Ctrl+, 和 Ctrl+.）、行内代码。
- 文本颜色和背景颜色：64 色调色板，或任意十六进制值。
- 字体（共 13 种）和字号（8 到 72 px 的预设值，或任意值）。
- 段落样式：1–6 级标题和正文。
- 段落和标题的对齐方式（左对齐、居中、右对齐、两端对齐）和缩进（最多 8 级）。
- 链接：插入、编辑、移除。
- 水平分隔线、撤销和重做。

### 列表
- 项目符号列表，符号可选实心圆、空心圆或方块。
- 编号列表：1、01、a、A、i、I、α。
- 带复选框的任务列表；已完成的任务会显示删除线。
- 嵌套列表（Tab / Shift+Tab）。

### 表格
- 插入任意大小的表格，可带表头行，也可不带。
- 单元格的右键菜单：添加和删除行与列、合并和拆分单元格、表头行与表头列、删除表格。
- 拖动单元格边框即可调整列宽。
- 从 Excel 粘贴时会保留列宽、对齐方式和字号；从 Redmine 复制的表格粘贴到 Excel 时会带有边框。

### 图片和附件
- 从剪贴板粘贴图片：图片会作为附件上传，并显示在文本中。
- 通过 Redmine 的“文件”字段添加的图片，或拖放到该字段上的图片，同样会插入到文本中。
- 从附件中插入图片（缩略图选择器），或插入指向任意附件的链接。
- 拖动图片的边角即可调整图片大小。

### 代码
- 带语法高亮的代码块，在编辑器和已保存的页面中均可使用：支持 52 种语言，还可以添加更多（参见[语法高亮](#语法高亮)）。
- 代码块的编程语言通过其一角的角标选择，支持实时搜索功能，并提供最近使用过的语言和常用的语言列表。
- 在代码块中，Tab 和 Shift+Tab 分别用于增加和减少行的缩进等级；代码块内的粗体、链接和颜色效果会被完整保留。

### 内容块
- 可折叠块：一个标题加上被隐藏的内容（`<details>`）。在已保存的页面中折叠，在编辑器中展开。
- 带有作者和日期行的引用块。

### 编辑
- 用于查看和编辑 HTML 源代码的 `<HTML>` 模式：嵌套的块带有缩进，占多行的块之间用一个空行分隔，语法按与 HTML 代码块相同的规则着色，按 Enter 键会保持当前行的缩进。
- 支持 Markdown 风格的输入方式：用 `#` 创建标题、用 `-` 和 `1.` 创建列表、用 `[ ]` 创建任务、用 ```` ```python ```` 创建代码块（语言名称任意或可以省略）、用 `**bold**` 加粗、用 `---` 创建水平分隔线。支持标准的键盘快捷键：Ctrl+B、Ctrl+I、Ctrl+U、Ctrl+Z 等操作。
- 编辑器的高度不会超过窗口：工具栏和表单按钮始终可见，文本在编辑器内部滚动。高度会随窗口大小和页面缩放而变化。
- 右下角的调整手柄可手动设置高度。高度会被记住；双击可恢复为自动高度。

### 与 Redmine 集成
- 适用于 Redmine 中所有带格式功能的文本字段：问题的描述和说明、Wiki 页面、新闻、讨论区消息、文档、项目描述、长文本类型的自定义属性，也包括稍后才出现在页面上的字段。
- 文本以 HTML 格式保存。要使用该编辑器，请在 Redmine 配置中将文本格式选择为 *TipTap HTML*。
- 界面（工具提示、菜单、对话框）会跟随用户 Redmine 个人资料中的语言设置。插件内置了 Redmine 50 种语言中的 47 种：英语和俄语是完整的，其余 45 种是借助 AI 模型生成的草稿，欢迎母语人士修正。三种从右到左书写的语言（阿拉伯语、希伯来语、波斯语）有意不予支持（参见[界面语言](#界面语言)）。
- 处理大文本时依然流畅：隐藏表单中的编辑器只在打开表单时才会创建，较长的代码块则在滚动到可见区域时才进行高亮。
- 用 CKEditor（redmine_ckeditor 插件）编写的文本会按原样显示并在编辑器中打开，保留原有的格式：不需要进行转换，详细信息见[从 CKEditor 迁移](#从-ckeditor-编辑器进行迁移)。
- 已保存的文本在显示时不含不安全的 HTML：显示页面时会移除脚本、事件处理程序和 `javascript:` 链接，只保留编辑器自身生成的内容。来自 REST API 或 `<HTML>` 模式的文本同样适用。

## 语法高亮

代码块在编辑器和已保存的页面中同样会被高亮。代码块的语言通过其右上角的角标选择；列表带有搜索框，并会记住最近使用和常用的语言。

插件内置了 52 种语言，其中包括 HTML、1C、Cisco IOS、MikroTik RouterOS、Windows cmd、docker compose、Linux 服务日志和 journalctl 输出。

可以添加自己的语言。每种语言对应 `highlight/` 文件夹中的一个文件。highlight.js 的 190 多种语法中的任意一种，或者第三方语法，都可以用一条命令转换成这样的文件：

```sh
python3 highlight/_convert_grammar.py erlang
sh highlight/_compile.sh
```

详细信息：[highlight/README/zh.md](../highlight/README/zh.md)。

## 界面语言

编辑器使用用户在 Redmine 个人资料（我的帐号 → 语言）中选择的语言。Redmine 的 50 种语言中，有 47 种的语言文件随插件一起提供，位于 `config/locales/`。英语是源语言，俄语由作者本人翻译；其余 45 种是借助 AI 模型生成的草稿，尚未经过母语人士审校，因此个别地方可能会出现不自然的措辞。文件中缺少的文本会以英语显示。

要修正翻译，请修改 `config/locales/<code>.yml`（`de`、`fr`、`pt-BR` 等）中的值，然后重启 Redmine。`bundle exec rake redmine_tiptap:locales` 用于检查这些文件。欢迎提交包含修正的 pull request。

**从右到左书写的语言（阿拉伯语、希伯来语、波斯语）有意不予支持。** 支持这些语言需要对代码库做大量修改，而不只是翻译，我们选择不承担这项工作。对于这些语言，编辑器以英语显示，其布局也不做调整。如果你需要其中某种语言，可以自行 fork：翻译机制已经就绪，还需要修改的其他内容列在 [config/locales/README.md](../config/locales/README.md#right-to-left-languages) 中。

详细信息和 Redmine 语言列表：[config/locales/README.md](../config/locales/README.md)。

## 安装

1. 将插件放入 Redmine 的 `plugins` 文件夹中，文件夹必须命名为 `redmine_tiptap`。最简单的方式是使用 git，这样更新也只需一条命令：
   ```sh
   cd /path/to/redmine
   git clone --branch release --single-branch --depth 1 https://github.com/Du10777/redmine_tiptap.git plugins/redmine_tiptap
   ```
   `release` 分支只包含插件运行所需的文件，不含这份文档，而 `--depth 1` 不会下载仓库的历史记录。
2. 重启 Redmine。
3. 在 Redmine 配置（redmine.selfhosted/_settings_）中，将文本格式选择为 *TipTap HTML*。

## 更新

插件没有数据库迁移，构建好的 JavaScript 打包文件和样式表已包含在仓库中。更新时无需在服务器上使用 npm，也无需构建：替换插件文件并重启 Redmine 即可。

更新之前，请确认新版本支持你所使用的 Redmine 版本（参见上面的“支持的 Redmine 版本”）。

### 通过 git 安装（推荐）

```sh
cd /path/to/redmine/plugins/redmine_tiptap
git pull
```

然后重启 Redmine，例如：

```sh
sudo systemctl restart redmine          # 以 systemd 服务方式运行的 Redmine
touch /path/to/redmine/tmp/restart.txt  # Passenger
docker compose restart redmine          # Docker
```

若要停留在某个特定版本而不是最新版本，请获取 `release` 分支的某个提交并切换过去：`git fetch --depth 1 origin <commit> && git checkout <commit>`。

如果插件是用普通的 `git clone` 安装的（`main` 分支，包含文档和完整历史），请一次性改用 `release` 分支：删除 `plugins/redmine_tiptap` 文件夹，并按照[安装](#安装)一节重新安装插件。插件不会在自己的文件夹中保存任何自己的数据，所以不会丢失任何东西；只有您自己添加的代码高亮语言需要先从 `highlight/` 复制出来。

### 通过压缩包安装

1. 从最新发行版下载 `redmine_tiptap.zip`：https://github.com/Du10777/redmine_tiptap/releases/latest/download/redmine_tiptap.zip 。其中的文件与 `release` 分支相同（不含这份文档的插件）。删除旧的 `plugins/redmine_tiptap` 文件夹，并在原位置解压；里面的文件夹名称已经是 `redmine_tiptap`。先删除可以确保新版本中已移除的文件不会残留。
2. 删除 Redmine 文件夹中的 `public/assets/.manifest.json`。
3. 重启 Redmine。

第 2 步很重要。Redmine 在启动时，只有当插件资源文件比这个清单文件新时，才会重新发布插件资源。从压缩包解压出来的文件会保留原来的时间戳，因此如果跳过第 2 步，Redmine 可能会继续提供旧版编辑器。清单文件会在启动时自动重新生成。使用 `git pull` 时不需要这一步：git 会把被修改的文件的时间设为当前时间。

### 更新之后

- 编辑器的脚本和样式表的 URL 中带有内容指纹，因此浏览器在重启后会立即加载新版本。用户无需清除浏览器缓存。
- 如果在 Redmine 配置（管理 → 配置 → 一般）中启用了 *缓存格式化文字*，则在更新到改变文本显示方式的版本（包括 HTML 清理和 CKEditor 文本的支持）后，请清除一次 Redmine 系统的缓存：在 Redmine 文件夹中执行 `bundle exec rake tmp:cache:clear RAILS_ENV=production`。否则，更新之前渲染的页面可能会一直从缓存中显示未经清理的内容，直到其文本发生变化。
- 早期版本的插件会把脚本复制到 `public/tiptap_bundle.js`。这些文件已不再使用，可以删除：
  ```sh
  rm -f /path/to/redmine/public/tiptap_bundle.js /path/to/redmine/public/tiptap_bundle.js.map
  ```

## 从 CKEditor 编辑器进行迁移

如果你的 Redmine 系统中曾经使用过 [redmine_ckeditor](https://github.com/a-ono/redmine_ckeditor) 插件，可以直接切换到本插件并保留所有已经写入的所有文本内容：包括问题描述、说明备注、Wiki 页面、新闻通知、讨论区消息、项目文档等。不需要进行任何转换处理，数据库中的数据也不会被修改。因为 CKEditor 将文本内容存储为 HTML 格式，本插件也同样采用 HTML 格式存储，因此存储的文本只需由新的格式化程序显示即可。

1. 安装好该插件（请参见上面的详细说明部分），然后选择文本格式为 *TipTap HTML*。
2. 保留 Redmine 文件夹中的 `public/system/rich/` 文件夹路径。如果用户曾通过 CKEditor 的图片浏览器插入图片和文件，它们就存储在那里，既不在数据库中，也不在附件中，文本通过地址路径引用它们（`/system/rich/...`）。**如果将 Redmine 迁移到其他服务器或重新安装，也要迁移这个文件夹**，与数据库和 `files/` 文件夹一起：它们都不包含这些文件，没有这个文件夹，旧文本中的图片会出现 404 错误。问题、Wiki 页面等的附件和之前一样存储在系统中，不需要任何处理。在本编辑器中插入的图片是普通附件。即使删除了 redmine_ckeditor，这个文件夹仍然需要保留。
3. 当不再需要时，可以删除 redmine_ckeditor 插件。

旧的文本会按照 CKEditor 编辑器曾经的显示方式进行完全显示：包括字体、大小、颜色和对齐方式、缩进、列表、表格（包括边框、列宽、标题、合并单元格）、图片（大小、浮动、边框、链接中的图片）、链接、带编程语言标记的代码块（已进行高亮显示）、Redmine 系统中的宏（`{{toc}}`、`{{collapse(Title) ... }}`、`{{thumbnail(...)}}` 等）、Wiki 文档和问题的链接、纯文本网址（已自动转为可点击链接）以及嵌入的 `<iframe>`（视频内容）。用 CKEditor 编辑器创建的文本会通过其特有的标记方式进行识别和处理，保留了原来在该编辑器中的段落间距，这个间距比现在本编辑器使用的间距更加宽松。

故意设计的差异：
- 嵌入的 `<iframe>` 仅在指向其他网站的安全 http(s) 协议地址时才会被显示和加载，同时被设置了安全沙盒化隔离：其中嵌入的页面可以运行自己的脚本程序代码，但却无法访问 Redmine 系统的页面、打开浏览器顶层窗口或提交表单数据。所有其他类型的 `<iframe>` 内容会被完全删除掉。
- 链接会在同一个浏览器窗口中打开和显示：链接的 `target` 属性设置（来自 CKEditor 的"新窗口 (_blank)"设置选项）不会被保留下来。
- CKEditor 编辑器曾经提供但其显示页面悄悄丢弃掉的某些格式化效果在这个编辑器中会正常显示出来：例如其"标记"样式的背景颜色设置和 `<q>` 标签产生的引号效果。
- CKEditor 的“Special Container”样式（带灰色边框的块）会显示为没有高亮的代码块，在编辑器中它同样是代码块。

老旧的文本内容在该编辑器中再次打开并进行保存时会保持原有的格式化效果：包括来自 Redmine 系统中的宏定义（宏在编辑器中显示为一个灰色的元素块；在 `<HTML>` 源代码模式下编辑，就像在 CKEditor 的源代码编辑模式中的做法一样）、嵌入的 `<iframe>` 内容元素、带有各自样式的 `<div>` 和 `<address>` 块（从网页粘贴的 `<div>` 仍会被转换为段落）、下标和上标格式设置、来自 CKEditor 的内联样式（big、small、keyboard、sample 等代码类名称）、标题的样式格式、表格和表格单元格的样式设置、图片的大小（宽度和高度）参数、浮动方向设置、边框效果和链接方式、代码块中指定的编程语言类型。但是在编辑过程中不会被保留的内容包括：表格的标题部分会变成上方的居中段落、表格的页眉和页脚部分会变成普通的数据行（页脚始终保留在底部）以及 `<del>` 标签会变成 `<s>` 标签（外观效果相同）。从本编辑器保存的文本会自动采用本编辑器的紧凑型段落间距样式。
