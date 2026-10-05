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

> *Bản dịch này được tạo với sự trợ giúp của mô hình AI và chưa được xem xét bởi một người bản xứ. Nếu bạn tìm thấy lỗi, vui lòng [mở một issue hoặc gửi pull request](https://github.com/Du10777/redmine_tiptap).*

Đây là trình soạn thảo văn bản cho Redmine, dựa trên TipTap https://github.com/ueberdosis/tiptap

Các phiên bản Redmine được hỗ trợ: **6.\*** (phát triển và kiểm thử trên 6.1.4).

Công cụ trình soạn thảo: **TipTap 3.31.4**. Tất cả các gói `@tiptap/*` được ghim vào phiên bản chính xác này trong `package.json` và `package-lock.json` và phải luôn được nâng cấp cùng nhau lên cùng một phiên bản.

## Tính năng

**Định dạng văn bản**
- Đậm, in nghiêng, gạch chân, gạch bỏ, chỉ số dưới và chỉ số trên (Ctrl+, và Ctrl+.), mã nội tuyến.
- Màu văn bản và màu nền: bảng màu 64 màu hoặc bất kỳ giá trị hex nào.
- Họ phông chữ (13 phông) và kích thước phông chữ (các kích thước từ 8 đến 72 px hoặc bất kỳ giá trị nào).
- Kiểu đoạn: tiêu đề 1–6 và văn bản thông thường.
- Căn chỉnh (trái, giữa, phải, kéo dài) và thụt lề (lên đến 8 mức) của các đoạn và tiêu đề.
- Liên kết: chèn, chỉnh sửa, loại bỏ.
- Đường nằm ngang, hoàn tác và làm lại.

**Danh sách**
- Danh sách dấu gạch ngang với dấu tròn đặc, tròn rỗng hoặc hình vuông.
- Danh sách được đánh số: 1, 01, a, A, i, I, α.
- Danh sách tác vụ với hộp kiểm; các tác vụ hoàn thành sẽ bị gạch bỏ.
- Danh sách lồng nhau (Tab / Shift+Tab).

**Bảng**
- Chèn bảng bất kỳ kích thước nào, có hoặc không có hàng tiêu đề.
- Menu nhấp chuột phải trong ô: thêm và xóa hàng và cột, hợp nhất và tách ô, hàng tiêu đề và cột tiêu đề, xóa bảng.
- Độ rộng cột có thể được thay đổi bằng cách kéo các viền ô.
- Dán từ Excel sẽ giữ lại độ rộng cột, căn chỉnh và kích thước phông chữ; bảng được sao chép từ Redmine dán vào Excel với các đường viền.

**Hình ảnh và tệp đính kèm**
- Dán hình ảnh từ khay nhớ tạm: nó được tải lên dưới dạng tệp đính kèm và xuất hiện trong văn bản.
- Hình ảnh được đính kèm bằng trường tệp của Redmine hoặc được thả vào nó sẽ được chèn vào văn bản.
- Chèn hình ảnh từ các tệp đính kèm (bộ chọn hình ảnh nhỏ) hoặc liên kết đến bất kỳ tệp đính kèm nào.
- Thay đổi kích thước hình ảnh bằng cách kéo các góc của nó.

**Mã**
- Khối mã có tô sáng cú pháp trong trình soạn thảo và trên các trang đã lưu: 52 ngôn ngữ, và bạn có thể thêm nhiều hơn (xem [Tô sáng cú pháp](#tô-sáng-cú-pháp)).
- Ngôn ngữ của khối được chọn từ một huy hiệu ở góc của nó, với tìm kiếm, ngôn ngữ gần đây và thường xuyên.
- Tab và Shift+Tab thụt lề và loại bỏ thụt lề các dòng trong khối mã; chữ đậm, liên kết và màu sắc bên trong mã vẫn được giữ lại.

**Khối**
- Khối có thể thu gọn: tiêu đề với nội dung ẩn (`<details>`). Thu gọn trên các trang đã lưu, mở rộng trong trình soạn thảo.
- Khối trích dẫn có dòng tác giả và ngày tháng.

**Biên tập**
- Chế độ `<HTML>` để xem và chỉnh sửa mã nguồn HTML: các khối lồng nhau được thụt lề, một dòng trống ngăn cách các khối chiếm nhiều dòng, cú pháp được tô màu theo cùng quy tắc như khối mã HTML, và phím Enter giữ nguyên thụt lề của dòng.
- Gõ kiểu Markdown: `#` cho tiêu đề, `-` và `1.` cho danh sách, `[ ]` cho tác vụ, ```` ```python ```` cho khối mã (bất kỳ tên ngôn ngữ nào hoặc không), `**bold**`, `---` cho đường nằm ngang. Các phím tắt tiêu chuẩn: Ctrl+B, Ctrl+I, Ctrl+U, Ctrl+Z và các phím khác.
- Trình soạn thảo không bao giờ cao hơn cửa sổ: thanh công cụ và nút biểu mẫu luôn trong tầm nhìn, và văn bản cuộn bên trong. Chiều cao tuân theo kích thước cửa sổ và mức độ phóng to của trang.
- Tay cầm thay đổi kích thước ở góc dưới cùng bên phải đặt chiều cao theo cách thủ công. Chiều cao được ghi nhớ; nhấp đôi lần sẽ trở lại chiều cao tự động.

**Tích hợp Redmine**
- Hoạt động trong tất cả các trường văn bản của Redmine có hỗ trợ định dạng: mô tả và ghi chú vấn đề, trang wiki, tin tức, tin nhắn diễn đàn, tài liệu, mô tả dự án, trường văn bản tùy chỉnh dài, bao gồm các trường xuất hiện trên trang sau đó.
- Văn bản được lưu trữ dưới dạng HTML. Để sử dụng trình soạn thảo, hãy chọn *TipTap HTML* làm định dạng bài viết trong phần thiết lập Redmine.
- Giao diện (mẹo công cụ, menu, hộp thoại) tuân theo ngôn ngữ trong hồ sơ Redmine của người dùng. 47 trong số 50 ngôn ngữ của Redmine đi kèm với plugin: Tiếng Anh và Tiếng Nga đầy đủ, 45 ngôn ngữ còn lại là bản nháp được tạo bằng mô hình AI mà những người bản xứ rất sẵn lòng sửa chữa. Ba ngôn ngữ viết từ phải sang trái (Tiếng Ả Rập, Tiếng Do Thái, Tiếng Ba Tư) cố ý không được hỗ trợ (xem [Ngôn ngữ giao diện](#ngôn-ngữ-giao-diện)).
- Vẫn nhanh chóng trên các văn bản lớn: các trình soạn thảo trong các biểu mẫu ẩn chỉ được tạo khi biểu mẫu được mở, và các khối mã dài được tô sáng khi chúng cuộn vào chế độ xem.
- Các tệp văn bản được viết trong CKEditor (plugin redmine_ckeditor) được hiển thị theo cách chúng có và mở trong trình soạn thảo với định dạng của chúng: không có chuyển đổi, xem [Chuyển sang từ CKEditor](#chuyển-sang-từ-ckeditor).
- Các văn bản đã lưu được hiển thị mà không có HTML không an toàn: các tập lệnh, trình xử lý sự kiện và các liên kết `javascript:` được xóa khi hiển thị trang, chỉ giữ lại những gì trình soạn thảo tạo. Điều này cũng bao gồm các văn bản đi qua REST API hoặc chế độ `<HTML>`.

## Tô sáng cú pháp

Các khối mã được tô sáng giống nhau cả trong trình soạn thảo và trên các trang đã lưu. Ngôn ngữ của khối được chọn từ huy hiệu ở góc trên cùng bên phải; danh sách có hộp tìm kiếm và ghi nhớ các ngôn ngữ gần đây và thường xuyên.

52 ngôn ngữ đi kèm với plugin, bao gồm HTML, 1C, Cisco IOS, MikroTik RouterOS, Windows cmd, docker compose, nhật ký dịch vụ Linux và đầu ra journalctl.

Bạn có thể thêm các ngôn ngữ của riêng mình. Mỗi ngôn ngữ là một tệp trong thư mục `highlight/`. Bất kỳ một trong hơn 190 ngữ pháp highlight.js hoặc của bên thứ ba nào cũng có thể được chuyển đổi thành tệp như vậy bằng một lệnh:

```sh
python3 highlight/_convert_grammar.py erlang
sh highlight/_compile.sh
```

Chi tiết: [highlight/README/vi.md](../highlight/README/vi.md).

## Ngôn ngữ giao diện

Trình soạn thảo nói theo ngôn ngữ được chọn trong hồ sơ Redmine của người dùng (Cá nhân → Ngôn ngữ). Các tệp cho 47 trong số 50 ngôn ngữ của Redmine 6 đi kèm với plugin, trong `config/locales/`. Tiếng Anh là nguồn và Tiếng Nga là của tác giả; 45 ngôn ngữ còn lại là bản nháp được tạo với sự trợ giúp của mô hình AI và chưa được xem xét bởi người bản xứ, vì vậy hãy mong đợi một cụm từ lạ ở đây. Văn bản bị thiếu từ tệp sẽ được hiển thị bằng Tiếng Anh.

Để sửa một bản dịch, hãy thay đổi các giá trị của nó trong `config/locales/<code>.yml` (`de`, `fr`, `pt-BR`, ...) và khởi động lại Redmine. `bundle exec rake redmine_tiptap:locales` kiểm tra các tệp. Pull request có sửa chữa được hoan nghênh.

**Các ngôn ngữ viết từ phải sang trái (Tiếng Ả Rập, Tiếng Do Thái, Tiếng Ba Tư) cố ý không được hỗ trợ.** Hỗ trợ cho họ cần nhiều thay đổi cho cơ sở mã, không chỉ là một bản dịch, và chúng tôi chọn không làm điều đó. Đối với những ngôn ngữ này, trình soạn thảo được hiển thị bằng Tiếng Anh và bố cục của nó không được điều chỉnh. Nếu bạn cần một trong những ngôn ngữ này, hãy tạo fork: cơ chế dịch đã sẵn sàng, và những gì khác phải thay đổi được liệt kê trong [config/locales/README.md](../config/locales/README.md#right-to-left-languages).

Chi tiết và danh sách các ngôn ngữ Redmine: [config/locales/README.md](../config/locales/README.md).

## Cài đặt

1. Đặt plugin vào thư mục `plugins` của Redmine. Thư mục phải được đặt tên `redmine_tiptap`. Cách dễ nhất là sử dụng git, điều này cũng làm cho việc cập nhật chỉ còn một lệnh:
   ```sh
   cd /path/to/redmine
   git clone https://github.com/Du10777/redmine_tiptap.git plugins/redmine_tiptap
   ```
2. Khởi động lại Redmine.
3. Trong phần thiết lập Redmine (redmine.selfhosted/_settings_) chọn Định dạng bài viết: *TipTap HTML*.

## Cập nhật

Plugin không có các migration cơ sở dữ liệu, và bộ JavaScript được biên dịch cũng như bảng kiểu là một phần của kho lưu trữ. Cập nhật không cần npm hoặc xây dựng trên máy chủ: chỉ cần thay thế các tệp plugin và khởi động lại Redmine.

Trước khi cập nhật, hãy kiểm tra xem phiên bản mới có hỗ trợ phiên bản Redmine của bạn không (xem "Các phiên bản Redmine được hỗ trợ" ở trên).

### Đã cài đặt với git (được khuyên dùng)

```sh
cd /path/to/redmine/plugins/redmine_tiptap
git pull
```

Sau đó khởi động lại Redmine, ví dụ:

```sh
sudo systemctl restart redmine          # Redmine chạy như dịch vụ systemd
touch /path/to/redmine/tmp/restart.txt  # Passenger
docker compose restart redmine          # Docker
```

Để ở lại phiên bản cụ thể thay vì commit mới nhất: `git fetch && git checkout <tag-or-commit>`.

### Được cài đặt từ một kho lưu trữ

1. Xóa thư mục `plugins/redmine_tiptap` cũ và giải nén phiên bản mới vào vị trí tương tự. Xóa trước đảm bảo rằng các tệp bị xóa trong phiên bản mới sẽ không còn tồn tại.
2. Xóa `public/assets/.manifest.json` trong thư mục Redmine.
3. Khởi động lại Redmine.

Bước 2 rất quan trọng. Khi khởi động, Redmine chỉ xuất bản các tệp asset của plugin khi các tệp của nó mới hơn so với bản kê khai này. Các tệp được giải nén từ kho lưu trữ giữ lại dấu thời gian ban đầu của chúng, vì vậy nếu không thực hiện bước 2, Redmine có thể vẫn cung cấp trình soạn thảo phiên bản cũ. Bản kê khai được tạo lại tự động khi khởi động. Với `git pull`, bước này không cần thiết: git cung cấp thời gian hiện tại cho các tệp đã thay đổi.

### Sau khi cập nhật

- Tập lệnh và bảng kiểu của trình soạn thảo được cung cấp với dấu vân tay nội dung trong URL của chúng, vì vậy các trình duyệt tải phiên bản mới ngay sau khi khởi động lại. Người dùng không cần xóa bộ nhớ cache trình duyệt của họ.
- Nếu *Cache định dạng các ký tự* được bật trong phần thiết lập Redmine (Quản trị → Thiết lập → Tổng quan), hãy xóa bộ nhớ cache của Redmine một lần sau khi cập nhật lên phiên bản thay đổi cách các văn bản được hiển thị (làm sạch HTML, hỗ trợ các văn bản từ CKEditor): `bundle exec rake tmp:cache:clear RAILS_ENV=production` trong thư mục Redmine. Ngoài ra, các trang được hiển thị trước bản cập nhật có thể được hiển thị từ bộ nhớ cache mà không được làm sạch, cho đến khi nội dung văn bản của chúng thay đổi.
- Các phiên bản trước của plugin đã sao chép tập lệnh sang `public/tiptap_bundle.js`. Các tệp này không còn được sử dụng và có thể bị xóa:
  ```sh
  rm -f /path/to/redmine/public/tiptap_bundle.js /path/to/redmine/public/tiptap_bundle.js.map
  ```

## Chuyển sang từ CKEditor

Nếu Redmine của bạn đã sử dụng [redmine_ckeditor](https://github.com/a-ono/redmine_ckeditor), bạn có thể chuyển sang plugin này và giữ lại mọi văn bản đã được viết: vấn đề, ghi chú, trang wiki, tin tức, tin nhắn, tài liệu. Không có chuyển đổi nào và cơ sở dữ liệu sẽ không bị chạm vào. CKEditor lưu trữ các văn bản của nó dưới dạng HTML và plugin này cũng vậy, vì vậy một văn bản được lưu trữ chỉ được hiển thị bởi định dạng mới.

1. Cài đặt plugin (xem ở trên) và chọn Định dạng bài viết: *TipTap HTML*.
2. Giữ lại thư mục `public/system/rich/` của Redmine. Nếu mọi người đã chèn hình ảnh và tệp bằng trình duyệt hình ảnh của CKEditor, chúng được lưu trữ ở đó, không phải trong cơ sở dữ liệu và cũng không nằm trong số các tệp đính kèm, và các văn bản tham chiếu chúng theo địa chỉ (`/system/rich/...`). **Nếu Redmine được chuyển sang máy chủ khác hoặc được cài đặt lại từ đầu, hãy chuyển cả thư mục này**, cùng với cơ sở dữ liệu và thư mục `files/`: cả hai đều không chứa các tệp này, và nếu thiếu thư mục này, hình ảnh trong các văn bản cũ sẽ báo lỗi 404. Các tệp đính kèm của vấn đề, trang wiki, v.v. được lưu trữ như trước đây và không cần gì thêm. Hình ảnh được chèn trong trình soạn thảo này là các tệp đính kèm thông thường. Thư mục này vẫn cần thiết sau khi redmine_ckeditor bị xóa.
3. Xóa redmine_ckeditor khi bạn không còn cần nó.

Một văn bản cũ được hiển thị theo cách CKEditor đã hiển thị nó: phông chữ, kích thước, màu sắc và căn chỉnh, thụt lề, danh sách, bảng (đường viền, độ rộng, chú thích, ô hợp nhất), hình ảnh (kích thước, float, đường viền, hình ảnh trong liên kết), liên kết, khối mã với ngôn ngữ của chúng (tô sáng), macro Redmine (`{{toc}}`, `{{collapse(Title) ... }}`, `{{thumbnail(...)}}` v.v.), liên kết wiki và vấn đề, địa chỉ web thuần được làm có thể nhấp vào, và `<iframe>` nhúng (video). Một văn bản được viết trong CKEditor được công nhận bằng cách đánh dấu của nó và giữ lại khoảng cách giữa các đoạn mà nó có ở đó, rộng hơn trong trình soạn thảo này.

Sự khác biệt có mục đích:
- Một `<iframe>` chỉ được hiển thị khi nó trỏ đến một trang web khác qua http(s) và nó được cách ly: trang bên trong có thể chạy các tập lệnh của riêng nó nhưng không thể truy cập trang Redmine, mở cửa sổ trên cùng hoặc gửi biểu mẫu. Tất cả `<iframe>` khác sẽ bị xóa.
- Các liên kết sẽ mở trong cùng một cửa sổ: thuộc tính `target` của một liên kết (CKEditor's "New Window (_blank)") không được giữ lại.
- Một số định dạng mà CKEditor cung cấp nhưng các trang của nó tự động loại bỏ được hiển thị ở đây: ví dụ như màu nền của kiểu "Marker" của nó và dấu ngoặc kép của `<q>`.
- Kiểu “Special Container” của CKEditor (khối có khung màu xám) được hiển thị dưới dạng khối mã không có tô sáng cú pháp, và trong trình soạn thảo nó cũng là khối mã.

Một văn bản cũ giữ lại định dạng của nó khi được mở trong trình soạn thảo và lưu lại: macro Redmine (một macro là một phần tử xám trong trình soạn thảo; chỉnh sửa nó trong chế độ `<HTML>`, như trong chế độ Nguồn của CKEditor), `<iframe>`, các khối `<div>` và `<address>` cùng kiểu của chúng (một `<div>` được dán từ trang web vẫn bị chuyển thành đoạn), chỉ số dưới và chỉ số trên, kiểu nội tuyến của CKEditor (big, small, keyboard, sample, v.v.), kiểu của tiêu đề, bảng và ô bảng, kích thước, float, đường viền và liên kết của hình ảnh, ngôn ngữ của khối mã. Những gì không tồn tại sau khi chỉnh sửa: chú thích của bảng trở thành một đoạn căn giữa phía trên nó, các phần đầu và chân của bảng trở thành các hàng thông thường (chân ở dưới cùng), `<del>` trở thành `<s>` (giao diện tương tự), và chiều cao của hình ảnh bị loại bỏ khi độ rộng được đặt (tỷ lệ được giữ lại). Một văn bản được lưu từ trình soạn thảo này có khoảng cách đoạn gọn gàng của trình soạn thảo này.
