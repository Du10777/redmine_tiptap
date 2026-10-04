# Penyorotan sintaks: bahasa

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

> *Terjemahan ini dibuat dengan bantuan model AI dan belum ditinjau oleh penutur asli. Jika Anda menemukan kesalahan, silakan [buka masalah atau permintaan tarik](https://github.com/Du10777/redmine_tiptap).*

Blok kode disorot baik di editor maupun di halaman yang disimpan (masalah, catatan, wiki), dan terlihat sama di keduanya. Bahasa blok dipilih dari badge di sudut kanan atasnya. Daftar bahasa didefinisikan oleh file dalam folder `highlight/`: satu file adalah satu bahasa.

Plugin dikirim dengan 52 bahasa. Anda dapat menambahkan lebih banyak: konversikan tata bahasa highlight.js yang siap pakai dengan skrip (lihat [Menambahkan bahasa dari highlight.js](#menambahkan-bahasa-dari-highlightjs)) atau tulis yang Anda miliki sendiri.

## Cara kerjanya

- Penyorotan dilakukan oleh [highlight.js](https://highlightjs.org) (melalui [lowlight](https://github.com/wooorm/lowlight)). Editor dan halaman yang disimpan menggunakan mesin yang sama, jadi warna cocok.
- `_compile.sh` membundel semua file bahasa menjadi satu file, `assets/javascripts/tiptap_highlight.js`. File ini sudah dikomit ke repositori yang dibangun, jadi memasang plugin tidak memerlukan build. Anda hanya perlu membangunnya ketika Anda mengubah set bahasa.
- Redmine memuat `tiptap_highlight.js` di setiap halaman, sebelum editor (`tiptap_bundle.js`). Saat dimuat editor mendaftarkan semua bahasa dari file itu.
- Di editor blok disorot kembali 50 ms setelah Anda berhenti mengetik, dan hanya blok yang berubah. Di halaman yang disimpan blok disorot ketika bergulir ke tampilan. Blok di dalam bagian yang dapat disembunyikan disorot ketika bagian dibuka.
- Bahasa disimpan dalam HTML yang disimpan: `<pre><code class="language-<id>">`. Itulah mengapa `id` bahasa tidak boleh pernah berubah: blok yang disimpan dengan `id` lama akan berubah menjadi teks biasa.
- Tidak ada deteksi bahasa otomatis: blok tanpa bahasa ditampilkan sebagai teks biasa. Begitu juga blok yang bahasanya tidak dalam `highlight/` (misalnya, file bahasa dihapus); badge-nya terus menampilkan `id`-nya. Jika file bahasa kembali, begitu juga warnanya.
- Warna. highlight.js menandai teks dengan kelas seperti `hljs-keyword`, `hljs-string`, `hljs-comment`. Warnanya ditetapkan dalam `assets/stylesheets/src/06_code.css`, menggunakan palet penyorotan sintaks Redmine sendiri.

## File bahasa

Misalnya, `routeros.js`:

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

| Field | Diperlukan | Apa itu |
|---|---|---|
| `id` | ya | Nama bahasa dalam HTML yang disimpan (`class="language-<id>"`). Karakter yang diizinkan: `a-z`, `0-9`, `-`, `_`. **Jangan pernah mengubahnya** setelah blok dengan bahasa ini disimpan. |
| `label` | tidak | Nama dalam daftar bahasa dan pada badge blok. Default ke `id`. |
| `hint` | tidak | Catatan abu-abu di sebelah nama dalam daftar. |
| `keywords` | tidak | Kata-kata tambahan untuk pencarian daftar, dipisahkan spasi. |
| `grammar` | ya | Tata bahasa highlight.js: fungsi `(hljs) => language definition`. |

`label`, `hint` dan `keywords` dalam Bahasa Inggris. Untuk menampilkan bahasa di bawah nama lain dalam bahasa antarmuka pengguna, atau untuk membuatnya dapat ditemukan oleh kata-kata bahasa itu, tambahkan entri ke file terjemahan bahasa itu, `config/locales/<code>.yml`, di bawah `code_languages:`. Kata-kata di sana ditambahkan ke `keywords`; `label` dan `hint` menggantikan yang dari file bahasa. `config/locales/ru.yml` memiliki contoh, aturannya ada dalam [config/locales/README.md](../../config/locales/README.md).

Jenis file dalam folder:

- **Pendek.** Referensi ke tata bahasa dari paket npm highlight.js, seperti dalam contoh di atas; sebagian besar bahasa seperti ini. Tata bahasa berasal dari versi highlight.js yang tercatat dalam `package-lock.json` plugin.
- **Salinan penuh.** Kode tata bahasa ada dalam file itu sendiri dan dapat disunting. File-file ini dibuat oleh skrip konversi (lihat di bawah).
- **Tata bahasa sendiri.** `log.js`, `journalctl.js`, `cisco-ios.js`; bagian bersama mereka dalam `_common.js`.
- **Wrapper.** Tata bahasa siap di bawah nama lain: `cmd.js` adalah `dos` dari highlight.js, `docker-compose.js` adalah `yaml`.

File dan folder yang namanya dimulai dengan `_` bukan bahasa:

- `_compile.sh` membangun bahasa;
- `_check.mjs` memeriksa bahasa selama build;
- `_common.js` memegang bagian bersama tata bahasa plugin sendiri;
- `_convert_grammar.py` adalah skrip yang mengkonversi tata bahasa highlight.js (lihat di bawah);
- `_vendor/` menyimpan file yang diimpor oleh tata bahasa yang dikonversi (dibuat oleh skrip konversi).

Folder `README/` menyimpan dokumentasi ini.

## Menambahkan bahasa dari highlight.js

Tata bahasa siap (lebih dari 190) ada di sini: https://github.com/highlightjs/highlight.js/tree/main/src/languages. Nama dan alias mereka tercantum dalam [SUPPORTED_LANGUAGES.md](https://github.com/highlightjs/highlight.js/blob/main/SUPPORTED_LANGUAGES.md), bersama dengan sekitar seratus tata bahasa pihak ketiga yang disimpan di repositori terpisah. Skrip `_convert_grammar.py` dalam folder ini mengkonversi salah satu dari mereka ke format plugin.

Skrip membutuhkan Python 3.6+ (tidak ada paket ekstra) dan akses ke github.com. Jalankan dari folder plugin:

```sh
cd /path/to/redmine/plugins/redmine_tiptap
python3 highlight/_convert_grammar.py erlang
sh highlight/_compile.sh
```

Argumen `erlang` adalah nama file dalam `src/languages` tanpa `.js`. Perintah kedua membangun bahasa dan memeriksanya. Kemudian restart Redmine (lihat [Membangun dan menerapkan](#membangun-dan-menerapkan)). Di Windows gunakan `py` atau `python` bukan `python3`.

Contoh:

```sh
# daftar bahasa highlight.js (* = sudah dalam highlight/), opsional disaring oleh kata
python3 highlight/_convert_grammar.py --list
python3 highlight/_convert_grammar.py --list sql

# beberapa bahasa sekaligus
python3 highlight/_convert_grammar.py erlang nix fsharp

# nama sendiri, hint dan kata pencarian (satu bahasa sekaligus)
python3 highlight/_convert_grammar.py erlang --label "Erlang/OTP" --hint BEAM --keywords "erl otp"

# ganti file pendek yang dikirim dengan plugin dengan salinan penuh yang dapat disunting
python3 highlight/_convert_grammar.py routeros --force --label RouterOS --hint MikroTik --keywords mikrotik

# bahasa belum ada dalam versi highlight.js yang dirilis, dari cabang pengembangan
python3 highlight/_convert_grammar.py odin --ref main

# tautan ke file tata bahasa, langsung dari bilah alamat browser
python3 highlight/_convert_grammar.py https://github.com/highlightjs/highlight.js/blob/main/src/languages/odin.js

# tata bahasa pihak ketiga: tautan ke repositorinya, skrip menemukan file tata bahasa
python3 highlight/_convert_grammar.py https://github.com/highlightjs/highlightjs-terraform

# file tata bahasa lokal
python3 highlight/_convert_grammar.py ~/grammars/mylang.js --id mylang

# file pendek yang mereferensikan paket npm bukan salinan kode
python3 highlight/_convert_grammar.py erlang --npm

# tunjukkan apa yang akan dilakukan tanpa mengubah apa pun
python3 highlight/_convert_grammar.py erlang --dry-run
```

### Apa yang dilakukan skrip

1. Unduh `src/languages/<name>.js` dari versi highlight.js yang dijalankan plugin. Versi dibaca dari `package-lock.json` (saat ini 11.12.0), karena tata bahasa ditulis untuk mesin versi mereka sendiri. `--ref` memilih versi, cabang, atau komit lain.
2. Ambil nama bahasa dari baris `Language:` header tata bahasa dan kata pencarian dari alias-nya (`aliases`). `id` adalah nama file tata bahasa.
3. Letakkan kode tata bahasa dalam `highlight/<id>.js` tidak berubah kecuali untuk ekspor: `export default function(hljs)` menjadi `function grammar(hljs)`, dan objek bahasa `export default { id, label, keywords, grammar }` ditambahkan di akhir file. Jika tata bahasa adalah modul CommonJS (`module.exports = ...`), baris yang mendeklarasikan `module` dan `exports` ditambahkan di bagian atas.
4. Jika tata bahasa mengimpor file lain, unduhnya ke `highlight/_vendor/<source>-<version>/` di bawah jalur yang sama seperti dalam repositori dan arahkan impor ke sana. Misalnya, `typescript` mengimpor `javascript.js` dan `lib/ecmascript.js`. File-file ini dibagikan oleh semua bahasa dari sumber dan versi yang sama; tidak perlu disunting.
5. Periksa baris `Requires:`, yang mencantumkan bahasa yang digunakan untuk kode yang tertanam (misalnya, `php-template` membutuhkan `xml` dan `php`). Jika mereka tidak dalam `highlight/`, cetak perintah yang menambahkannya. Tanpa mereka kode yang tertanam hanya tetap tidak berwarna; ini bukan kesalahan.
6. Jangan timpa file yang ada tanpa `--force` dan jangan ambil `id` yang sudah digunakan oleh file lain.

Setelah konversi bahasa dapat disunting langsung di file-nya.

### Opsi

| Opsi | Apa yang dilakukan |
|---|---|
| `LANGUAGE ...` | Nama bahasa highlight.js, tautan ke file tata bahasa atau ke repositori tata bahasa pihak ketiga di GitHub, atau jalur ke file `.js` lokal. |
| `--ref REF` | Versi highlight.js (tag), cabang, atau komit. Default ke versi dalam `package-lock.json`. Untuk tautan versi diambil dari tautan. |
| `--id ID` | Bahasa `id`. Default ke nama file tata bahasa. |
| `--label TEXT` | Nama dalam daftar dan pada badge. Default ke `Language:` dari tata bahasa. |
| `--hint TEXT` | Catatan abu-abu dalam daftar. |
| `--keywords TEXT` | Kata pencarian yang dipisahkan spasi. Default: alias tata bahasa. |
| `--npm` | Bukan salinan kode, tulis file pendek yang mereferensikan paket npm highlight.js. Hanya untuk bahasa highlight.js itu sendiri. |
| `--force` | Ganti file yang ada. |
| `--dry-run` | Tunjukkan apa yang akan dilakukan tanpa mengubah apa pun. |
| `--list [WORD]` | Daftar bahasa highlight.js dan tata bahasa pihak ketiga, opsional disaring oleh kata. |
| `--prune` | Hapus file dalam `_vendor/` yang tidak lagi diimpor oleh bahasa apa pun. |


**Salinan atau `--npm`?** Salinan menunjukkan aturan langsung dalam file: Anda dapat menyuntingnya, mengambil tata bahasa lebih baru daripada paket yang dipasang, atau yang pihak ketiga. Salinan tidak berubah ketika plugin meningkatkan highlight.js; untuk menyegarkannya, konversikan bahasa lagi dengan `--force`. File yang dibuat dengan `--npm` adalah beberapa baris panjang, dan tata bahasanya ditingkatkan bersama plugin.

## Membangun dan menerapkan

```sh
sh highlight/_compile.sh
```

- Ini memerlukan Docker (build berjalan dalam kontainer `node:20-alpine`) atau, jika tidak ada Docker, Node.js 18+ di mesin yang sama. Pada run pertama skrip memasang paket npm ke folder `node_modules/` plugin.
- Pertama skrip memeriksa setiap bahasa: membangunnya terpisah, memmuatnya, mendaftarkannya di mesin yang sama yang berjalan di browser, dan menyorot teks sampel. Jika bahasa rusak (kesalahan dalam kode, ekspresi reguler yang tidak valid, `id` yang sudah diambil), skrip menamai file dan alasannya dan berhenti; `tiptap_highlight.js` sebelumnya tetap ada.
- Kemudian skrip membundel semua bahasa ke dalam `assets/javascripts/tiptap_highlight.js`.

Setelah build, restart Redmine: ia menerbitkan file plugin saat startup (lihat "Pembaruan" dalam [README utama](../../docs/README.id.md#pembaruan) untuk perintah). Browser mendapatkan file baru langsung, karena URL-nya berisi sidik jari konten.

Jika server Redmine tidak memiliki Docker maupun Node.js, bangun di mesin apa pun yang memiliki salah satunya (salinan folder plugin sudah cukup) dan letakkan `assets/javascripts/tiptap_highlight.js` yang dihasilkan di server.

## Menghapus bahasa

Hapus file bahasa dari `highlight/`, bangun, dan restart Redmine. Blok yang disimpan dalam bahasa ini tetap apa adanya dan ditampilkan sebagai teks biasa. File dalam `_vendor/` yang tidak lagi diperlukan dihapus dengan:

```sh
python3 highlight/_convert_grammar.py --prune
```

## Tata bahasa sendiri dan aturan penyuntingan

- Tata bahasa adalah fungsi yang menerima objek `hljs` dan mengembalikan definisi bahasa: piece teks mana yang akan ditandai dan bagaimana. Panduan: https://highlightjs.readthedocs.io/en/latest/language-guide.html, referensi: https://highlightjs.readthedocs.io/en/latest/mode-reference.html. Contoh: `log.js`, `journalctl.js`, `cisco-ios.js`.
- highlight.js menggabungkan ekspresi reguler semua aturan bahasa menjadi satu dan mengabaikan flag mereka sendiri. Jadi pencocokan yang tidak peka terhadap kasus harus dieja (`[Ee]rror`) atau diaktifkan untuk seluruh bahasa dengan `case_insensitive: true`.
- Lebih suka kelas token standar (`keyword`, `string`, `number`, `comment`, `title`, `attr`, `variable`, `built_in`, `literal`, `meta`, `symbol`, `type` dan sebagainya): mereka sudah memiliki warna. Kelas Anda sendiri (misalnya, `scope: 'log-error'` menghasilkan kelas `hljs-log-error`) memerlukan aturan dalam `assets/stylesheets/src/06_code.css` dan rebuild CSS (`assets/stylesheets/src/_build.sh`).
- Untuk menawarkan tata bahasa siap di bawah nama lain, lakukan seperti yang dilakukan `cmd.js`: panggil tata bahasa asli dan ubah `name` dan `aliases` di hasilnya. Jika alias tidak diganti, bahasa baru mengambil alih dari yang asli.

## Memperbarui plugin ketika Anda telah menambahkan bahasa

git meninggalkan file Anda dalam `highlight/` sendiri. Tetapi `assets/javascripts/tiptap_highlight.js` dalam versi plugin baru dibangun tanpa bahasa Anda, dan build file ini menghalangi `git pull`. Jadi:

```sh
cd /path/to/redmine/plugins/redmine_tiptap
git checkout -- assets/javascripts/tiptap_highlight.js
git pull
sh highlight/_compile.sh
```

Perintah pertama membuang build Anda, yang terakhir membangun bahasa lagi, termasuk milik Anda. Kemudian restart Redmine. Jika Anda telah menyunting file bahasa yang dikirim dengan plugin, git mungkin meminta Anda untuk menyelesaikan konflik di dalamnya.

Jika plugin dipasang dari arsip, simpan file bahasa Anda dan folder `_vendor/` sebelum mengganti folder plugin, letakkan kembali sesudahnya, dan bangun bahasa.

## Ukuran

Semua bahasa dibundel menjadi satu file; browser mengunduhnya sekali dan kemudian mengambilnya dari cache. Saat ini 226 KB untuk 52 bahasa. Sebagian besar bahasa membutuhkan 1–10 KB, yang terbesar adalah 1C (55 KB).
