# Tô sáng cú pháp: ngôn ngữ

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

> *Bản dịch này được tạo với sự trợ giúp của mô hình AI và chưa được xem xét bởi một người bản xứ. Nếu bạn tìm thấy lỗi, vui lòng [mở một issue hoặc gửi pull request](https://github.com/Du10777/redmine_tiptap).*

Các khối mã được tô sáng cả trong trình soạn thảo và trên các trang đã lưu (vấn đề, ghi chú, wiki), và chúng trông giống nhau ở cả hai nơi. Ngôn ngữ của khối được chọn từ huy hiệu ở góc trên cùng bên phải của khối. Danh sách các ngôn ngữ được xác định bởi các tệp trong thư mục `highlight/`: một tệp là một ngôn ngữ.

Plugin được cung cấp với 52 ngôn ngữ. Bạn có thể thêm nhiều hơn: chuyển đổi một ngữ pháp highlight.js sẵn có với một tập lệnh (xem [Thêm ngôn ngữ từ highlight.js](#thêm-ngôn-ngữ-từ-highlightjs)) hoặc viết của riêng bạn.

## Nó hoạt động như thế nào

- Tô sáng được thực hiện bởi [highlight.js](https://highlightjs.org) (qua [lowlight](https://github.com/wooorm/lowlight)). Trình soạn thảo và các trang đã lưu sử dụng cùng một công cụ, vì vậy các màu sắc phù hợp.
- `_compile.sh` gộp tất cả các tệp ngôn ngữ thành một tệp, `assets/javascripts/tiptap_highlight.js`. Tệp này được commit vào kho lưu trữ đã được xây dựng, vì vậy cài đặt plugin không cần xây dựng. Bạn chỉ cần xây dựng khi bạn thay đổi bộ ngôn ngữ.
- Redmine tải `tiptap_highlight.js` trên mọi trang, trước trình soạn thảo (`tiptap_bundle.js`). Khi tải, trình soạn thảo đăng ký tất cả các ngôn ngữ từ tệp đó.
- Trong trình soạn thảo, một khối được tô sáng lại 50 ms sau khi bạn tạm dừng gõ, và chỉ khối đã thay đổi. Trên các trang đã lưu, một khối được tô sáng khi nó cuộn vào chế độ xem. Một khối bên trong một phần có thể thu gọn được tô sáng khi phần đó được mở.
- Ngôn ngữ được lưu trữ trong HTML được lưu: `<pre><code class="language-<id>">`. Đó là lý do tại sao `id` của một ngôn ngữ không bao giờ được thay đổi: các khối được lưu với `id` cũ sẽ trở thành văn bản thuần túy.
- Không có phát hiện ngôn ngữ tự động: một khối không có ngôn ngữ được hiển thị dưới dạng văn bản thuần túy. Cũng vậy một khối có ngôn ngữ không có trong `highlight/` (ví dụ, tệp ngôn ngữ bị xóa); huy hiệu của nó vẫn hiển thị `id`. Nếu tệp ngôn ngữ quay lại, các màu sắc cũng vậy.
- Màu sắc. highlight.js đánh dấu văn bản bằng các lớp như `hljs-keyword`, `hljs-string`, `hljs-comment`. Màu sắc của chúng được đặt trong `assets/stylesheets/src/06_code.css`, sử dụng bảng màu của tô sáng cú pháp của chính Redmine.

## Tệp ngôn ngữ

Ví dụ: `routeros.js`:

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

| Trường | Bắt buộc | Nó là cái gì |
|---|---|---|
| `id` | có | Tên ngôn ngữ trong HTML được lưu (`class="language-<id>"`) Các ký tự được phép: `a-z`, `0-9`, `-`, `_` **Không bao giờ thay đổi nó** khi các khối có ngôn ngữ này đã được lưu. |
| `label` | không | Tên trong danh sách ngôn ngữ và trên huy hiệu khối. Mặc định là `id`. |
| `hint` | không | Ghi chú màu xám bên cạnh tên trong danh sách. |
| `keywords` | không | Các từ bổ sung cho tìm kiếm danh sách, được phân tách bằng dấu cách. |
| `grammar` | có | Một ngữ pháp highlight.js: một hàm `(hljs) => language definition`. |

`label`, `hint` và `keywords` bằng Tiếng Anh. Để hiển thị một ngôn ngữ dưới một tên khác trong ngôn ngữ giao diện của người dùng, hoặc để làm cho nó có thể tìm kiếm được bằng các từ của ngôn ngữ đó, hãy thêm một mục vào tệp dịch của ngôn ngữ đó, `config/locales/<code>.yml`, dưới `code_languages:`. Các từ đó được thêm vào `keywords`; `label` và `hint` thay thế các từ từ tệp ngôn ngữ. `config/locales/ru.yml` có các ví dụ, các quy tắc nằm trong [config/locales/README.md](../../config/locales/README.md).

Các loại tệp trong thư mục:

- **Ngắn.** Một tham chiếu đến một ngữ pháp từ gói npm highlight.js, như trong ví dụ ở trên; hầu hết các ngôn ngữ như thế này. Ngữ pháp đến từ phiên bản highlight.js được ghi trong `package-lock.json` của plugin.
- **Sao chép đầy đủ.** Mã ngữ pháp nằm trong chính tệp và có thể được chỉnh sửa. Các tệp này được tạo bởi tập lệnh chuyển đổi (xem bên dưới).
- **Ngữ pháp riêng.** `log.js`, `journalctl.js`, `cisco-ios.js`; các phần được chia sẻ của chúng nằm trong `_common.js`.
- **Bộ bao bọc.** Một ngữ pháp sẵn có dưới một tên khác: `cmd.js` là `dos` từ highlight.js, `docker-compose.js` là `yaml`.

Các tệp và thư mục có tên bắt đầu bằng `_` không phải là ngôn ngữ:

- `_compile.sh` xây dựng các ngôn ngữ;
- `_check.mjs` kiểm tra các ngôn ngữ trong quá trình xây dựng;
- `_common.js` giữ các phần được chia sẻ của ngữ pháp tự viết của plugin;
- `_convert_grammar.py` là tập lệnh chuyển đổi ngữ pháp highlight.js (xem bên dưới);
- `_vendor/` giữ các tệp được nhập bởi ngữ pháp được chuyển đổi (được tạo bởi tập lệnh chuyển đổi).

Thư mục `README/` giữ tài liệu này.

## Thêm ngôn ngữ từ highlight.js

Các ngữ pháp sẵn có (hơn 190) ở đây: https://github.com/highlightjs/highlight.js/tree/main/src/languages. Tên và bí danh của chúng được liệt kê trong [SUPPORTED_LANGUAGES.md](https://github.com/highlightjs/highlight.js/blob/main/SUPPORTED_LANGUAGES.md), cùng với khoảng một trăm ngữ pháp của bên thứ ba được lưu trữ trong các kho lưu trữ riêng biệt. Tập lệnh `_convert_grammar.py` trong thư mục này có thể chuyển đổi bất kỳ cái nào thành định dạng của plugin.

Tập lệnh cần Python 3.6+ (không cần gói bổ sung) và truy cập vào github.com. Chạy nó từ thư mục plugin:

```sh
cd /path/to/redmine/plugins/redmine_tiptap
python3 highlight/_convert_grammar.py erlang
sh highlight/_compile.sh
```

Tham số `erlang` là tên tệp trong `src/languages` không có `.js`. Lệnh thứ hai xây dựng các ngôn ngữ và kiểm tra chúng. Sau đó khởi động lại Redmine (xem [Xây dựng và áp dụng](#xây-dựng-và-áp-dụng)). Trên Windows, hãy sử dụng `py` hoặc `python` thay vì `python3`.

Ví dụ:

```sh
# danh sách các ngôn ngữ highlight.js (* = đã có trong highlight/), tùy chọn được lọc theo một từ
python3 highlight/_convert_grammar.py --list
python3 highlight/_convert_grammar.py --list sql

# nhiều ngôn ngữ cùng một lúc
python3 highlight/_convert_grammar.py erlang nix fsharp

# tên, gợi ý và các từ tìm kiếm riêng (một ngôn ngữ cùng một lúc)
python3 highlight/_convert_grammar.py erlang --label "Erlang/OTP" --hint BEAM --keywords "erl otp"

# thay thế một tệp ngắn được cung cấp với plugin bằng một bản sao đầy đủ có thể chỉnh sửa
python3 highlight/_convert_grammar.py routeros --force --label RouterOS --hint MikroTik --keywords mikrotik

# một ngôn ngữ chưa có trong phiên bản highlight.js được phát hành, từ nhánh phát triển
python3 highlight/_convert_grammar.py odin --ref main

# một liên kết đến tệp ngữ pháp, ngay từ thanh địa chỉ trình duyệt
python3 highlight/_convert_grammar.py https://github.com/highlightjs/highlight.js/blob/main/src/languages/odin.js

# một ngữ pháp của bên thứ ba: một liên kết đến kho lưu trữ của nó, tập lệnh tìm tệp ngữ pháp
python3 highlight/_convert_grammar.py https://github.com/highlightjs/highlightjs-terraform

# một tệp ngữ pháp cục bộ
python3 highlight/_convert_grammar.py ~/grammars/mylang.js --id mylang

# một tệp ngắn tham chiếu gói npm thay vì sao chép mã
python3 highlight/_convert_grammar.py erlang --npm

# hiển thị những gì sẽ được thực hiện mà không thay đổi bất cứ điều gì
python3 highlight/_convert_grammar.py erlang --dry-run
```

### Tập lệnh làm gì

1. Tải xuống `src/languages/<name>.js` của phiên bản highlight.js mà plugin chạy trên đó. Phiên bản được đọc từ `package-lock.json` (hiện tại là 11.12.0), bởi vì ngữ pháp được viết cho công cụ của phiên bản của chúng. `--ref` chọn một phiên bản, nhánh hoặc commit khác.
2. Lấy tên ngôn ngữ từ dòng `Language:` trong tiêu đề ngữ pháp và các từ tìm kiếm từ bí danh của nó (`aliases`). `id` là tên tệp ngữ pháp.
3. Đặt mã ngữ pháp vào `highlight/<id>.js` không thay đổi ngoại trừ export: `export default function(hljs)` trở thành `function grammar(hljs)`, và đối tượng ngôn ngữ `export default { id, label, keywords, grammar }` được nối vào cuối tệp. Nếu ngữ pháp là mô-đun CommonJS (`module.exports = ...`), một dòng khai báo `module` và `exports` được thêm ở đầu.
4. Nếu ngữ pháp nhập các tệp khác, tải xuống chúng vào `highlight/_vendor/<source>-<version>/` dưới cùng đường dẫn như trong kho lưu trữ và chỉ các import đó ở đó. Ví dụ: `typescript` nhập `javascript.js` và `lib/ecmascript.js`. Các tệp này được chia sẻ bởi tất cả các ngôn ngữ từ cùng một nguồn và phiên bản; không cần phải chỉnh sửa chúng.
5. Kiểm tra dòng `Requires:`, liệt kê các ngôn ngữ được sử dụng cho mã nhúng (ví dụ: `php-template` cần `xml` và `php`). Nếu chúng không có trong `highlight/`, in ra lệnh thêm chúng. Nếu không có, mã nhúng đơn giản là không có màu; đây không phải là lỗi.
6. Không ghi đè các tệp hiện có mà không có `--force` và không sử dụng `id` đã được sử dụng bởi tệp khác.

Sau khi chuyển đổi, ngôn ngữ có thể được chỉnh sửa ngay trong tệp của nó.

### Tùy chọn

| Tùy chọn | Nó làm gì |
|---|---|
| `LANGUAGE ...` | Tên ngôn ngữ highlight.js, liên kết đến tệp ngữ pháp hoặc kho lưu trữ ngữ pháp của bên thứ ba trên GitHub, hoặc đường dẫn đến tệp `.js` cục bộ. |
| `--ref REF` | Phiên bản highlight.js (thẻ), nhánh hoặc commit. Mặc định là phiên bản trong `package-lock.json`. Đối với các liên kết, phiên bản được lấy từ liên kết. |
| `--id ID` | `id` ngôn ngữ. Mặc định là tên tệp ngữ pháp. |
| `--label TEXT` | Tên trong danh sách và trên huy hiệu. Mặc định là `Language:` từ ngữ pháp. |
| `--hint TEXT` | Ghi chú màu xám trong danh sách. |
| `--keywords TEXT` | Các từ tìm kiếm được phân tách bằng dấu cách. Mặc định: bí danh ngữ pháp. |
| `--npm` | Thay vì sao chép mã, hãy viết một tệp ngắn tham chiếu gói npm highlight.js. Chỉ dành cho các ngôn ngữ của highlight.js. |
| `--force` | Ghi đè các tệp hiện có. |
| `--dry-run` | Hiển thị những gì sẽ được thực hiện mà không thay đổi bất cứ điều gì. |
| `--list [WORD]` | Liệt kê các ngôn ngữ highlight.js và ngữ pháp của bên thứ ba, tùy chọn được lọc theo một từ. |
| `--prune` | Xóa các tệp trong `_vendor/` không còn được bất kỳ ngôn ngữ nào nhập. |


**Sao chép hay `--npm`?** Một bản sao hiển thị các quy tắc ngay trong tệp: bạn có thể chỉnh sửa chúng, lấy ngữ pháp mới hơn gói được cài đặt, hoặc ngữ pháp của bên thứ ba. Một bản sao không thay đổi khi plugin nâng cấp highlight.js; để làm mới nó, chuyển đổi ngôn ngữ một lần nữa với `--force`. Một tệp được tạo bằng `--npm` chỉ dài vài dòng, và ngữ pháp của nó được nâng cấp cùng với plugin.

## Xây dựng và áp dụng

```sh
sh highlight/_compile.sh
```

- Nó cần Docker (bản dựng chạy trong vùng chứa `node:20-alpine`) hoặc, nếu không có Docker, Node.js 18+ trên cùng một máy. Lần chạy đầu tiên, tập lệnh cài đặt các gói npm vào thư mục `node_modules/` của plugin.
- Đầu tiên, tập lệnh kiểm tra từng ngôn ngữ: xây dựng nó riêng biệt, tải nó, đăng ký nó trong cùng công cụ chạy trong trình duyệt, và tô sáng một văn bản mẫu. Nếu một ngôn ngữ bị hỏng (lỗi trong mã, biểu thức chính quy không hợp lệ, `id` đã được sử dụng), tập lệnh sẽ đặt tên của tệp và lý do, sau đó dừng lại; `tiptap_highlight.js` trước đó vẫn đang cư trú.
- Sau đó, tập lệnh gộp tất cả các ngôn ngữ vào `assets/javascripts/tiptap_highlight.js`.

Sau khi xây dựng, khởi động lại Redmine: nó xuất bản các tệp plugin khi khởi động (xem "Cập nhật" trong [README chính](../../docs/README.vi.md#cập-nhật) cho các lệnh). Các trình duyệt nhận được tệp mới ngay lập tức, vì URL của nó chứa dấu vân tay của nội dung.

Nếu máy chủ Redmine không có Docker cũng như Node.js, hãy xây dựng trên bất kỳ máy nào có một trong hai cái (một bản sao của thư mục plugin là đủ) và đặt `assets/javascripts/tiptap_highlight.js` kết quả trên máy chủ.

## Xóa ngôn ngữ

Xóa tệp ngôn ngữ khỏi `highlight/`, xây dựng và khởi động lại Redmine. Các khối đã lưu bằng ngôn ngữ này vẫn nguyên vẹn và được hiển thị dưới dạng văn bản thuần túy. Các tệp trong `_vendor/` không còn cần thiết được xóa bằng:

```sh
python3 highlight/_convert_grammar.py --prune
```

## Ngữ pháp của riêng bạn và các quy tắc chỉnh sửa

- Một ngữ pháp là một hàm nhận đối tượng `hljs` và trả về một định nghĩa ngôn ngữ: những phần văn bản nào để đánh dấu và cách thế nào. Hướng dẫn: https://highlightjs.readthedocs.io/en/latest/language-guide.html, tài liệu tham khảo: https://highlightjs.readthedocs.io/en/latest/mode-reference.html. Ví dụ: `log.js`, `journalctl.js`, `cisco-ios.js`.
- highlight.js kết hợp các biểu thức chính quy của tất cả các quy tắc của một ngôn ngữ thành một quy tắc duy nhất và bỏ qua cờ của chúng. Vì vậy, so khớp không phân biệt chữ hoa chữ thường phải được viết rõ ràng (`[Ee]rror`) hoặc bật cho toàn bộ ngôn ngữ với `case_insensitive: true`.
- Ưu tiên các lớp mã thông báo tiêu chuẩn (`keyword`, `string`, `number`, `comment`, `title`, `attr`, `variable`, `built_in`, `literal`, `meta`, `symbol`, `type`, v.v.): chúng đã có màu sắc. Một lớp của riêng bạn (ví dụ: `scope: 'log-error'` tạo ra lớp `hljs-log-error`) cần một quy tắc trong `assets/stylesheets/src/06_code.css` và xây dựng lại CSS (`assets/stylesheets/src/_build.sh`).
- Để cung cấp một ngữ pháp sẵn có dưới một tên khác, hãy làm như `cmd.js` làm: gọi ngữ pháp ban đầu và thay đổi `name` và `aliases` trong kết quả. Nếu không thay thế các bí danh, ngôn ngữ mới sẽ lấy chúng từ bản gốc.

## Cập nhật plugin khi bạn đã thêm ngôn ngữ

git để yên các tệp của bạn trong `highlight/`. Nhưng `assets/javascripts/tiptap_highlight.js` trong phiên bản mới của plugin được xây dựng mà không có các ngôn ngữ của bạn, và lần xây dựng của tệp này sẽ cản trở `git pull`. Vì vậy:

```sh
cd /path/to/redmine/plugins/redmine_tiptap
git checkout -- assets/javascripts/tiptap_highlight.js
git pull
sh highlight/_compile.sh
```

Lệnh đầu tiên loại bỏ bản dựng của bạn, lệnh cuối cùng xây dựng các ngôn ngữ một lần nữa, bao gồm cả các ngôn ngữ của bạn. Sau đó khởi động lại Redmine. Nếu bạn đã chỉnh sửa các tệp ngôn ngữ được cung cấp với plugin, git có thể yêu cầu bạn giải quyết xung đột trong chúng.

Nếu plugin được cài đặt từ một kho lưu trữ, hãy lưu các tệp ngôn ngữ và thư mục `_vendor/` của bạn trước khi thay thế thư mục plugin, đặt chúng lại sau đó và xây dựng các ngôn ngữ.

## Kích thước

Tất cả các ngôn ngữ được gộp vào một tệp; trình duyệt tải xuống nó một lần và sau đó lấy nó từ bộ đệm. Hiện tại, nó là 226 KB cho 52 ngôn ngữ. Hầu hết các ngôn ngữ chiếm 1–10 KB, ngôn ngữ lớn nhất là 1C (55 KB).
