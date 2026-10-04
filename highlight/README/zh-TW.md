# 語法醒目提示：程式語言

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

> *本譯文借助 AI 模型完成，尚未經過母語人士審校。如果發現錯誤，請[提交 issue 或 pull request](https://github.com/Du10777/redmine_tiptap)。*

程式碼區塊在編輯器和已儲存的網頁中（議題、筆記、Wiki）同樣會被醒目提示，兩處的外觀完全相同。程式碼區塊的語言透過其右上角的徽章選擇。語言清單由 `highlight/` 資料夾中的檔案定義：一個檔案對應一種語言。

外掛程式內建了 52 種語言。可以新增更多：用指令碼轉換現成的 highlight.js 語法（參見[從 highlight.js 新增語言](#從-highlightjs-新增語言)）或編寫自己的。

## 運作原理

- 醒目提示由 [highlight.js](https://highlightjs.org)（透過 [lowlight](https://github.com/wooorm/lowlight)）完成。編輯器和已儲存的網頁使用相同的引擎，因此顏色一致。
- `_compile.sh` 將所有語言檔案打包成一個檔案 `assets/javascripts/tiptap_highlight.js`。這個檔案已在儲存庫中以建立狀態提交，因此安裝外掛程式不需要建立。只有在改變語言集合時才需要建立。
- Redmine 在每個網頁載入時都會載入 `tiptap_highlight.js`，在編輯器（`tiptap_bundle.js`）之前載入。載入時編輯器從該檔案註冊所有語言。
- 在編輯器中，程式碼區塊會在停止輸入 50 毫秒後重新醒目提示，且只會醒目提示被改變的塊。在已儲存的網頁中，程式碼區塊會在捲動進入檢視時被醒目提示。摺疊部分內的程式碼區塊會在展開時被醒目提示。
- 語言會被儲存在 HTML 中：`<pre><code class="language-<id>">`。因此語言的 `id` 絕不能改變：用舊 `id` 儲存的塊會變成純文字。
- 沒有語言自動偵測：沒有指定語言的塊顯示為純文字。指定的語言不在 `highlight/` 中的塊也是如此（例如語言檔案被刪除了）；其徽章仍會顯示 `id`。如果語言檔案恢復，顏色也會恢復。
- 顏色。highlight.js 用 `hljs-keyword`、`hljs-string`、`hljs-comment` 等類別標記文字。這些類別的顏色在 `assets/stylesheets/src/06_code.css` 中設定，使用 Redmine 自身語法醒目提示的調色板。

## 語言檔案

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

| 欄位 | 必需 | 說明 |
|---|---|---|
| `id` | 是 | 已儲存 HTML 中的語言名稱（`class="language-<id>"`）。允許的字元：`a-z`、`0-9`、`-`、`_`。**一旦有塊用此語言儲存，就絕不能改變。** |
| `label` | 否 | 語言清單中和塊徽章上顯示的名稱。預設為 `id`。 |
| `hint` | 否 | 清單中名稱旁的灰色註記。 |
| `keywords` | 否 | 清單搜尋的額外關鍵詞，空格分隔。 |
| `grammar` | 是 | 一個 highlight.js 語法：一個函式 `(hljs) => language definition`。 |

`label`、`hint` 和 `keywords` 都是英文。要讓一種語言在使用者的介面語言中顯示不同的名稱，或用該語言的詞使其可被搜尋到，請在該語言的翻譯檔案 `config/locales/<code>.yml` 的 `code_languages:` 下新增條目。那裡的詞會被加到 `keywords`；`label` 和 `hint` 會替代語言檔案中的。`config/locales/ru.yml` 有例子，規則在 [config/locales/README.md](../../config/locales/README.md) 中。

資料夾中各類檔案：

- **短引用。** 對 highlight.js npm 套件中語法的引用，如上面的例子；大多數語言都是這樣。語法來自外掛程式 `package-lock.json` 中記錄的 highlight.js 版本。
- **完整副本。** 語法程式碼在檔案本身中，可以編輯。這些檔案由轉換指令碼建立（見下）。
- **自己的語法。** `log.js`、`journalctl.js`、`cisco-ios.js`；它們的共同部分在 `_common.js` 中。
- **包裝器。** 現成的語法以另一個名稱使用：`cmd.js` 是 highlight.js 中的 `dos`，`docker-compose.js` 是 `yaml`。

名稱以 `_` 開頭的檔案和資料夾不是語言：

- `_compile.sh` 建立語言；
- `_check.mjs` 在建立過程中檢查語言；
- `_common.js` 儲存外掛程式自己的語法的共同部分；
- `_convert_grammar.py` 是轉換 highlight.js 語法的指令碼（見下）；
- `_vendor/` 儲存被轉換的語法匯入的檔案（由轉換指令碼建立）。

`README/` 資料夾儲存本文件。

## 從 highlight.js 新增語言

現成的語法（超過 190 種）在這裡：https://github.com/highlightjs/highlight.js/tree/main/src/languages 。它們的名稱和別名列在 [SUPPORTED_LANGUAGES.md](https://github.com/highlightjs/highlight.js/blob/main/SUPPORTED_LANGUAGES.md) 中，還有大約一百種第三方語法儲存在單獨的儲存庫中。這個資料夾中的指令碼 `_convert_grammar.py` 可以將其中任意一種轉換成外掛程式的格式。

指令碼需要 Python 3.6+（無需額外套件）和對 github.com 的存取。從外掛程式資料夾執行：

```sh
cd /path/to/redmine/plugins/redmine_tiptap
python3 highlight/_convert_grammar.py erlang
sh highlight/_compile.sh
```

參數 `erlang` 是 `src/languages` 中的檔案名稱，不帶 `.js`。第二個指令建立語言並檢查它們。然後重新啟動 Redmine（見[建立和應用](#建立和應用)）。在 Windows 上用 `py` 或 `python` 替代 `python3`。

例子：

```sh
# highlight.js 語言清單（* = 已在 highlight/ 中），可選用關鍵詞篩選
python3 highlight/_convert_grammar.py --list
python3 highlight/_convert_grammar.py --list sql

# 一次多種語言
python3 highlight/_convert_grammar.py erlang nix fsharp

# 自訂名稱、註記和搜尋詞（一次一種語言）
python3 highlight/_convert_grammar.py erlang --label "Erlang/OTP" --hint BEAM --keywords "erl otp"

# 替換外掛程式內建的短檔案為可編輯的完整副本
python3 highlight/_convert_grammar.py routeros --force --label RouterOS --hint MikroTik --keywords mikrotik

# 一個尚未發布的 highlight.js 版本中的語言，從開發分支取得
python3 highlight/_convert_grammar.py odin --ref main

# 一個語法檔案的連結，直接從瀏覽器地址欄複製
python3 highlight/_convert_grammar.py https://github.com/highlightjs/highlight.js/blob/main/src/languages/odin.js

# 第三方語法：其儲存庫的連結，指令碼找到語法檔案
python3 highlight/_convert_grammar.py https://github.com/highlightjs/highlightjs-terraform

# 本機語法檔案
python3 highlight/_convert_grammar.py ~/grammars/mylang.js --id mylang

# 一個短檔案，引用 npm 套件而非程式碼副本
python3 highlight/_convert_grammar.py erlang --npm

# 顯示將要進行的操作而不做任何改變
python3 highlight/_convert_grammar.py erlang --dry-run
```

### 指令碼做什麼

1. 下載外掛程式執行的 highlight.js 版本的 `src/languages/<name>.js`。版本從 `package-lock.json` 讀取（當前 11.12.0），因為語法是為其版本的引擎編寫的。`--ref` 選擇另一個版本、分支或提交。
2. 從語法頭的 `Language:` 列讀取語言名稱，從其別名（`aliases`）讀取搜尋詞。`id` 是語法檔案名稱。
3. 把語法程式碼放入 `highlight/<id>.js`，除了匯出部分不變：`export default function(hljs)` 變成 `function grammar(hljs)`，語言物件 `export default { id, label, keywords, grammar }` 追加在檔案末尾。如果語法是 CommonJS 模組（`module.exports = ...`），檔案頂部會新增聲明 `module` 和 `exports` 的列。
4. 如果語法匯入其他檔案，下載它們到 `highlight/_vendor/<source>-<version>/`，保持在儲存庫中的相同路徑，並指向那裡。例如 `typescript` 匯入 `javascript.js` 和 `lib/ecmascript.js`。這些檔案被來自相同源和版本的所有語言共用；無需編輯。
5. 檢查 `Requires:` 列，列出用於嵌入程式碼的語言（例如 `php-template` 需要 `xml` 和 `php`）。如果它們不在 `highlight/` 中，列印新增它們的指令。沒有它們嵌入的程式碼只是保持無顏色；這不是錯誤。
6. 沒有 `--force` 不會覆寫現有檔案，不會取用已被另一個檔案使用的 `id`。

轉換後語言可以直接在其檔案中編輯。

### 選項

| 選項 | 說明 |
|---|---|
| `LANGUAGE ...` | 一個 highlight.js 語言名稱，一個語法檔案的連結或 GitHub 上第三方語法儲存庫的連結，或本機 `.js` 檔案的路徑。 |
| `--ref REF` | highlight.js 版本（標籤）、分支或提交。預設為 `package-lock.json` 中的版本。對於連結，版本從連結中提取。 |
| `--id ID` | 語言 `id`。預設為語法檔案名稱。 |
| `--label TEXT` | 清單中和徽章上的名稱。預設為語法中的 `Language:`。 |
| `--hint TEXT` | 清單中的灰色註記。 |
| `--keywords TEXT` | 空格分隔的搜尋詞。預設：語法的別名。 |
| `--npm` | 不用程式碼副本，而是寫一個短檔案引用 highlight.js npm 套件。僅適用於 highlight.js 自身的語言。 |
| `--force` | 替換現有檔案。 |
| `--dry-run` | 顯示將要做的事而不改變任何東西。 |
| `--list [WORD]` | 列出 highlight.js 語言和第三方語法，可選用關鍵詞篩選。 |
| `--prune` | 刪除 `_vendor/` 中沒有語言再匯入的檔案。 |


**副本還是 `--npm`？** 副本在檔案中顯示規則：可以編輯、採用比已安裝套件更新的語法或第三方語法。副本在外掛程式升級 highlight.js 時不變；要重新整理請用 `--force` 再轉換一次。用 `--npm` 製作的檔案只有幾列，其語法隨外掛程式一起升級。

## 建立和應用

```sh
sh highlight/_compile.sh
```

- 需要 Docker（建立在 `node:20-alpine` 容器中執行）或如果沒有 Docker，則需要機器上的 Node.js 18+。首次執行時指令碼會把 npm 套件安裝到外掛程式的 `node_modules/` 資料夾。
- 首先指令碼檢查每種語言：分別建立、載入、在瀏覽器中執行的相同引擎中註冊、醒目提示樣本文字。如果一種語言損壞（程式碼中的錯誤、無效的正規表達式、已取用的 `id`），指令碼會標出檔案和原因並停止；之前的 `tiptap_highlight.js` 保持不變。
- 然後指令碼將所有語言打包成 `assets/javascripts/tiptap_highlight.js`。

建立後，重新啟動 Redmine：在啟動時發佈外掛程式檔案（[主 README](../../docs/README.zh-TW.md#更新) 的「更新」部分有指令）。瀏覽器立即取得新檔案，因為其 URL 包含內容的指紋。

如果 Redmine 伺服器既沒有 Docker 也沒有 Node.js，在有其中之一的任何機器上建立（只需外掛程式資料夾的副本）然後把 `assets/javascripts/tiptap_highlight.js` 放到伺服器上。

## 刪除語言

從 `highlight/` 刪除語言檔案、建立、重新啟動 Redmine。用此語言儲存的塊保持原樣，顯示為純文字。`_vendor/` 中不再需要的檔案用以下方式刪除：

```sh
python3 highlight/_convert_grammar.py --prune
```

## 自己的語法和編輯規則

- 語法是一個函式，接收 `hljs` 物件並返回一個語言定義：標記哪些文字以及如何標記。指南：https://highlightjs.readthedocs.io/en/latest/language-guide.html ，參考：https://highlightjs.readthedocs.io/en/latest/mode-reference.html 。例子：`log.js`、`journalctl.js`、`cisco-ios.js`。
- highlight.js 把一種語言所有規則的正規表達式連接起來並忽視它們各自的旗標。因此不區分大小寫的符合必須拼出（`[Ee]rror`）或用 `case_insensitive: true` 為整個語言啟用。
- 傾向於標準權杖類別（`keyword`、`string`、`number`、`comment`、`title`、`attr`、`variable`、`built_in`、`literal`、`meta`、`symbol`、`type` 等）：它們已有顏色。自己的類別（例如 `scope: 'log-error'` 生成類別 `hljs-log-error`）需要 `assets/stylesheets/src/06_code.css` 中的規則和 CSS 重建（`assets/stylesheets/src/_build.sh`）。
- 要用另一個名稱提供現成的語法，如 `cmd.js` 做的：呼叫原語法並改變其結果中的 `name` 和 `aliases`。如果別名沒被替換，新語言會從原語言繼承它們。

## 新增語言時更新外掛程式

git 不會動你 `highlight/` 中的檔案。但新外掛程式版本的 `assets/javascripts/tiptap_highlight.js` 是在沒有你的語言情況下建立的，你這個檔案的建立會妨礙 `git pull`。所以：

```sh
cd /path/to/redmine/plugins/redmine_tiptap
git checkout -- assets/javascripts/tiptap_highlight.js
git pull
sh highlight/_compile.sh
```

第一個指令放棄你的建立，最後一個再次建立語言，包括你的。然後重新啟動 Redmine。如果編輯過外掛程式隨附的語言檔案，git 可能要求解決衝突。

如果從壓縮檔案安裝外掛程式，替換前儲存你的語言檔案和 `_vendor/` 資料夾，替換後放回，然後建立語言。

## 大小

所有語言打包成一個檔案；瀏覽器一次下載，然後從快取取得。當前 52 種語言 226 KB。大多數語言 1–10 KB，最大的是 1C（55 KB）。
