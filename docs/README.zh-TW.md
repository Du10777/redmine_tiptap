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

> *本譯文借助 AI 模型完成，尚未經過母語人士審校。如果發現錯誤，請[提交 issue 或 pull request](https://github.com/Du10777/redmine_tiptap)。*

這是用於 Redmine 的文字編輯器，基於 TipTap https://github.com/ueberdosis/tiptap

**[線上試用編輯器](https://du10777.github.io/redmine_tiptap/)**：示範頁面直接在您的瀏覽器中執行本外掛程式的編輯器，頁面仿照 Redmine 的表單製作。您可以輸入並設定文字格式、貼上圖片、開啟「預覽」分頁查看文字儲存後的樣子、切換介面語言，或選擇範例文字。無需安裝任何東西，也不會傳送任何資料。

[![示範頁面上的編輯器](../docs/images/demo.png)](https://du10777.github.io/redmine_tiptap/)

編輯器引擎：**TipTap 3.31.4**。所有 `@tiptap/*` 套件在 `package.json` 和 `package-lock.json` 中都固定為此精確版本，並且必須始終一起升級至同一版本。

**目錄**

- [支援的 Redmine 版本](#支援的-redmine-版本)
- [功能](#功能)
  - [文字格式](#文字格式)
  - [清單](#清單)
  - [表格](#表格)
  - [圖片和附件](#圖片和附件)
  - [程式碼](#程式碼)
  - [區塊](#區塊)
  - [編輯](#編輯)
  - [Redmine 整合](#redmine-整合)
- [語法醒目提示](#語法醒目提示)
- [介面語言](#介面語言)
- [安裝](#安裝)
- [更新](#更新)
  - [透過 git 安裝（推薦）](#透過-git-安裝推薦)
  - [透過壓縮檔案安裝](#透過壓縮檔案安裝)
  - [更新之後](#更新之後)
- [從 CKEditor 編輯器進行遷移](#從-ckeditor-編輯器進行遷移)

## 支援的 Redmine 版本

| Redmine | 支援 | 已測試版本 |
|---|---|---|
| 7.x | 是 | 7.0.2 |
| 6.x | 是 | 6.1.4, 6.1.5 |
| 5.x 及更早版本 | 否 | — |

新的主要版本（8.x 及之後）只有在外掛程式於該版本上測試之後才會支援。在此之前，安裝了外掛程式的該版本 Redmine 將無法啟動：它會停止並顯示錯誤，其中列出支援的版本。

## 功能

### 文字格式
- 粗體、斜體、底線、刪除線、下標和上標（Ctrl+, 和 Ctrl+.）、行內程式碼。
- 文字顏色和背景顏色：64 色調色板，或任意十六進位值。
- 字型（共 13 種）和字型大小（8 至 72 px 的預設值，或任意值）。
- 段落樣式：1–6 級標題和正文。
- 段落和標題的對齊方式（左對齊、置中、右對齊、左右對齊）和縮排（最多 8 級）。
- 連結：插入、編輯、刪除。
- 水平分隔線、復原和重做。

### 清單
- 項目符號清單，符號可選實心圓、空心圓或方塊。
- 編號清單：1、01、a、A、i、I、α。
- 帶核取方塊的任務清單；已完成的任務會顯示刪除線。
- 巢狀清單（Tab / Shift+Tab）。

### 表格
- 插入任意大小的表格，可帶表頭列，也可不帶。
- 儲存格的右鍵選單：新增和刪除列與欄、合併和分割儲存格、表頭列與表頭欄、刪除表格。
- 拖曳儲存格邊框即可調整欄寬。
- 從 Excel 貼上時會保留欄寬、對齊方式和字型大小；從 Redmine 複製的表格貼上到 Excel 時會帶有邊框。

### 圖片和附件
- 從剪貼簿貼上圖片：圖片會作為附件上傳，並顯示在文字中。
- 透過 Redmine 的「檔案」欄位新增的圖片，或拖放到該欄位上的圖片，同樣會插入到文字中。
- 從附件中插入圖片（縮圖選擇器），或插入指向任意附件的連結。
- 拖曳圖片的邊角即可調整圖片大小。

### 程式碼
- 帶語法醒目提示的程式碼區塊，在編輯器和已儲存的網頁中均可使用：支援 52 種語言，還可以新增更多（參見[語法醒目提示](#語法醒目提示)）。
- 程式碼區塊的編程語言透過其一角的徽章選擇，支援實時搜尋功能，並提供最近使用過的語言和常用的語言清單。
- 在程式碼區塊中，Tab 和 Shift+Tab 分別用於增加和減少列的縮排等級；程式碼區塊內的粗體、連結和顏色效果會被完整保留。

### 區塊
- 可摺疊區塊：一個標題加上被隱藏的內容（`<details>`）。在已儲存的網頁中摺疊，在編輯器中展開。
- 帶有作者和日期列的引用區塊。

### 編輯
- 用於檢視和編輯 HTML 原始碼的 `<HTML>` 模式：巢狀區塊帶有縮排，佔多行的區塊之間以一個空白行分隔，語法依照與 HTML 程式碼區塊相同的規則著色，按 Enter 鍵會保持目前行的縮排。
- Markdown 風格的輸入：用 `#` 建立標題，用 `-` 和 `1.` 建立清單，用 `[ ]` 建立任務，用 ```` ```python ```` 建立程式碼區塊（語言名稱任意，也可省略），用 `**bold**` 加粗，用 `---` 建立水平分隔線。標準鍵盤快速鍵：Ctrl+B、Ctrl+I、Ctrl+U、Ctrl+Z 等。
- 編輯器的高度不會超過視窗大小：工具列和表單按鈕始終保持可見，文字內容在編輯器內部進行捲動。高度會隨著視窗大小和網頁縮放而自動變化。
- 右下角的調整握把可手動設定編輯器的高度。高度會被記住；雙擊可恢復為自動高度。

### Redmine 整合
- 適用於 Redmine 系統中所有帶格式功能的文字欄位：包括議題的概述和筆記、Wiki 網頁、新聞、論壇訊息、文件、專案概述、長文字類型的自訂欄位清單，也包括稍後才出現在網頁上的欄位。
- 文字內容以 HTML 格式進行儲存。要使用該編輯器，請在 Redmine 系統設定中將文字格式選擇為 *TipTap HTML* 選項。
- 編輯器介面（包括工具提示、選單、對話方塊）會跟隨使用者 Redmine 帳戶中的語言設定進行切換。外掛程式內建了 Redmine 50 種語言中的 47 種：英語和俄語是完整的翻譯，其餘 45 種是借助 AI 模型產生的草稿翻譯，非常歡迎母語人士進行修正。三種從右到左書寫的語言（阿拉伯語、希伯來語、波斯語）有意不予支援（參見[介面語言](#介面語言)部分）。
- 處理大型和長文字時依然保持流暢運作：隱藏在表單中的編輯器只在開啟表單時才會進行建立，較長的程式碼區塊則在捲動到可見區域時才進行醒目提示處理。
- 用 CKEditor（redmine_ckeditor 外掛程式）編寫的文字會按原樣顯示並在編輯器中開啟，保留其格式：不進行轉換，詳見[從 CKEditor 遷移](#從-ckeditor-編輯器進行遷移)。
- 已儲存的文字在顯示時不含不安全的 HTML：顯示網頁時會移除指令稿、事件處理程式和 `javascript:` 連結，只保留編輯器自身產生的內容。來自 REST API 或 `<HTML>` 模式的文字同樣適用。

## 語法醒目提示

程式碼區塊在編輯器和已儲存的網頁中同樣會被醒目提示。程式碼區塊的語言透過其右上角的徽章選擇；清單帶有搜尋方塊，並會記住最近使用和常用的語言。

外掛程式內建了 52 種語言，其中包括 HTML、1C、Cisco IOS、MikroTik RouterOS、Windows cmd、docker compose、Linux 服務日誌和 journalctl 輸出。

可以新增自己喜歡的語言支援。每一種編程語言都對應 `highlight/` 資料夾中的一個檔案。來自 highlight.js 的 190 多種語法中的任意一種，或者來自第三方的語法，都可以用一個簡單的指令轉換成這樣的檔案格式：

```sh
python3 highlight/_convert_grammar.py erlang
sh highlight/_compile.sh
```

詳細資訊：[highlight/README/zh-TW.md](../highlight/README/zh-TW.md)。

## 介面語言

編輯器使用使用者在 Redmine 帳戶（我的帳戶 → 語言）中選擇的語言。Redmine 的 50 種語言中，有 47 種的語言檔案隨外掛程式一起提供，位於 `config/locales/`。英語是原始語言，俄語由作者本人翻譯；其餘 45 種是借助 AI 模型產生的草稿，尚未經過母語人士審校，因此個別地方可能會出現不自然的措辭。檔案中缺少的文字會以英語顯示。

要修正翻譯，請修改 `config/locales/<code>.yml`（`de`、`fr`、`pt-BR` 等）中的值，然後重新啟動 Redmine。`bundle exec rake redmine_tiptap:locales` 用於檢查這些檔案。歡迎提交包含修正的 pull request。

**從右到左書寫的語言（阿拉伯語、希伯來語、波斯語）有意不予支援。** 支援這些語言需要對程式碼庫做大量修改，而不只是翻譯，我們選擇不承擔這項工作。對於這些語言，編輯器以英語顯示，其版面配置也不做調整。如果你需要其中某種語言，可以自行 fork：翻譯機制已經就緒，還需要修改的其他內容列在 [config/locales/README.md](../config/locales/README.md#right-to-left-languages) 中。

詳細資訊和 Redmine 語言清單：[config/locales/README.md](../config/locales/README.md)。

## 安裝

1. 將外掛程式放入 Redmine 的 `plugins` 資料夾中，資料夾必須命名為 `redmine_tiptap`。最簡單的方式是使用 git，這樣更新也只需一個指令：
   ```sh
   cd /path/to/redmine
   git clone --branch release --single-branch --depth 1 https://github.com/Du10777/redmine_tiptap.git plugins/redmine_tiptap
   ```
   `release` 分支只包含外掛程式執行所需的檔案，不含這份文件，而 `--depth 1` 不會下載儲存庫的歷史記錄。
2. 重新啟動 Redmine。
3. 在 Redmine 設定（redmine.selfhosted/_settings_）中，將文字格式選擇為 *TipTap HTML*。

## 更新

外掛程式沒有資料庫遷移需要執行，建立好的 JavaScript 套件和樣式表已包含在儲存庫中。更新時無需在伺服器上使用 npm 工具，也無需進行重新建立：只需替換外掛程式檔案並重新啟動 Redmine 即可完成更新。

更新之前，請務必確認新版本支援你所使用的 Redmine 版本（參見上面的「支援的 Redmine 版本」部分）。

### 透過 git 安裝（推薦）

```sh
cd /path/to/redmine/plugins/redmine_tiptap
git pull
```

然後重新啟動 Redmine，例如：

```sh
sudo systemctl restart redmine          # 以 systemd 服務方式執行的 Redmine
touch /path/to/redmine/tmp/restart.txt  # Passenger
docker compose restart redmine          # Docker
```

若要停留在某個特定版本而不是最新版本，請取得 `release` 分支的某個提交並切換過去：`git fetch --depth 1 origin <commit> && git checkout <commit>`。

如果外掛程式是以一般的 `git clone` 安裝的（`main` 分支，包含文件與完整歷史記錄），請一次性改用 `release` 分支：刪除 `plugins/redmine_tiptap` 資料夾，並依照[安裝](#安裝)一節重新安裝外掛程式。外掛程式不會在自己的資料夾中保存任何自己的資料，所以不會遺失任何東西；只有您自行新增的程式碼醒目提示語言，需要先從 `highlight/` 複製出來。

### 透過壓縮檔案安裝

1. 從最新發行版下載 `redmine_tiptap.zip`：https://github.com/Du10777/redmine_tiptap/releases/latest/download/redmine_tiptap.zip 。其中的檔案與 `release` 分支相同（不含這份文件的外掛程式）。刪除舊的 `plugins/redmine_tiptap` 資料夾，並在原位置解壓縮；裡面的資料夾名稱已經是 `redmine_tiptap`。先刪除可以確保新版本中已移除的檔案不會殘留。
2. 刪除 Redmine 資料夾中的 `public/assets/.manifest.json`。
3. 重新啟動 Redmine。

第 2 步很重要。Redmine 在啟動時，只有當外掛程式資源檔案比這個清單檔案新時，才會重新發佈外掛程式資源。從壓縮檔案解壓出來的檔案會保留原來的時間戳，因此如果跳過第 2 步，Redmine 可能會繼續提供舊版編輯器。清單檔案會在啟動時自動重新產生。使用 `git pull` 時不需要這一步：git 會把被修改的檔案的時間設為當前時間。

### 更新之後

- 編輯器的指令碼和樣式表的 URL 中帶有內容指紋，因此瀏覽器在重新啟動後會立即載入新版本。使用者無需清除瀏覽器快取。
- 如果在 Redmine 設定（網站管理 → 設定 → 一般）中啟用了 *快取已格式化文字*，則在更新到改變文字顯示方式的版本（包括 HTML 清理和 CKEditor 文字的支援）後，請清除一次 Redmine 系統的快取：在 Redmine 資料夾中執行 `bundle exec rake tmp:cache:clear RAILS_ENV=production`。否則，更新之前呈現的網頁可能會一直從快取中顯示未經清理的內容，直到其文字發生變化。
- 早期版本的外掛程式會把指令碼複製到 `public/tiptap_bundle.js`。這些檔案已不再使用，可以刪除：
  ```sh
  rm -f /path/to/redmine/public/tiptap_bundle.js /path/to/redmine/public/tiptap_bundle.js.map
  ```

## 從 CKEditor 編輯器進行遷移

如果你的 Redmine 系統中曾經使用過 [redmine_ckeditor](https://github.com/a-ono/redmine_ckeditor) 外掛程式，可以直接切換到本外掛程式並保留所有已經寫入的所有文字內容：包括議題概述、筆記、Wiki 網頁、新聞通知、論壇訊息、專案文件等資料。不需要進行任何轉換處理，資料庫中的資料也不會被修改或遺失。因為 CKEditor 將文字內容儲存為 HTML 格式，本外掛程式也同樣採用 HTML 格式儲存資料，因此儲存的文字只需由新的格式化程式顯示即可。

1. 安裝好該外掛程式（請參見上面的詳細說明部分），然後選擇文字格式為 *TipTap HTML*。
2. 保留 Redmine 資料夾中的 `public/system/rich/` 資料夾路徑。如果使用者曾透過 CKEditor 的圖片瀏覽器插入圖片和檔案，這些資源會存放在那裡，既不在資料庫中，也不在附件中，文字內容透過地址路徑引用這些資源（`/system/rich/...`）。**如果將 Redmine 遷移到其他伺服器或重新安裝，也要遷移這個資料夾**，與資料庫和 `files/` 資料夾一起：它們都不包含這些檔案，沒有這個資料夾，舊文字中的圖片會出現 404 錯誤。議題、Wiki 網頁等的附件和之前一樣儲存在系統中，不需要進行任何特殊處理。在本編輯器中插入的圖片是普通附件。即使刪除了 redmine_ckeditor，這個資料夾仍然需要保留。
3. 當不再需要時，可以刪除 redmine_ckeditor 外掛程式。

老舊的文字內容會按照 CKEditor 編輯器曾經的顯示方式進行完全顯示：包括字型、大小、顏色和對齊方式、縮排、清單、表格（包括邊框、欄寬、標題、合併儲存格）、圖片（大小、浮動、邊框、連結中的圖片）、連結、帶程式語言標記的程式碼區塊（已進行醒目提示）、Redmine 系統中的巨集（`{{toc}}`、`{{collapse(Title) ... }}`、`{{thumbnail(...)}}` 等）、Wiki 文件和議題的連結、純文字網址（已自動轉為可點擊連結）以及嵌入的 `<iframe>`（影片內容）。用 CKEditor 編輯的文字會透過其標記方式進行識別，保留了原來在該編輯器中的段落間距，這個間距比本編輯器使用的間距更加寬鬆。

故意設計的差異：
- 嵌入的 `<iframe>` 僅在指向其他網站的安全 http(s) 通訊協定地址時才會被顯示和載入，同時被設定了安全沙箱隔離：其中嵌入的網頁可以執行自己的指令碼程式碼，但卻無法存取 Redmine 系統的網頁、開啟瀏覽器頂層視窗或提交表單資料。所有其他類型的 `<iframe>` 內容會被完全刪除掉。
- 連結會在同一個瀏覽器視窗中開啟和顯示：連結的 `target` 屬性設定（來自 CKEditor 的「新視窗 (_blank)」設定選項）不會被保留下來。
- CKEditor 編輯器曾經提供但其顯示網頁悄悄丟棄掉的某些格式化效果在這個編輯器中會正常顯示出來：例如其「標記」樣式的背景顏色設定和 `<q>` 標籤產生的引號效果。
- CKEditor 的「Special Container」樣式（帶有灰色邊框的區塊）會顯示為沒有醒目提示的程式碼區塊，在編輯器中它同樣是程式碼區塊。

老舊的文字在編輯器中開啟並再次儲存時會保持其原有的格式化效果：包括 Redmine 巨集（巨集在編輯器中顯示為一個灰色的元素塊；在 `<HTML>` 模式下編輯，就像在 CKEditor 的原始碼模式中的做法一樣）、嵌入的 `<iframe>`、帶有各自樣式的 `<div>` 和 `<address>` 區塊（從網頁貼上的 `<div>` 仍會被轉換為段落）、下標和上標格式、CKEditor 的行內樣式（big、small、keyboard、sample 等樣式）、標題的樣式、表格和表格儲存格的樣式設定、圖片的大小（寬度和高度）參數、浮動方向、邊框效果和連結方式、程式碼區塊中的程式語言類型。編輯過程中不會被保留的內容：表格的標題會變成上方的置中段落、表格的頁眉和頁尾部分會變成普通的資料列（頁尾保留在底部）以及 `<del>` 會變成 `<s>`（外觀相同）。從本編輯器儲存的文字會採用本編輯器的緊湊型段落間距。
