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

> *Terjemahan ini dibuat dengan bantuan model AI dan belum ditinjau oleh penutur asli. Jika Anda menemukan kesalahan, silakan [buka masalah atau permintaan tarik](https://github.com/Du10777/redmine_tiptap).*

Ini adalah editor teks untuk Redmine, berdasarkan TipTap https://github.com/ueberdosis/tiptap

**[Coba editor secara daring](https://du10777.github.io/redmine_tiptap/)**: halaman demo menjalankan editor plugin ini langsung di peramban Anda, pada halaman yang dibuat seperti formulir Redmine. Ketik dan format teks, tempel gambar, buka tab "Tinjauan" untuk melihat tampilan teks setelah disimpan, ganti bahasa antarmuka, atau pilih contoh teks. Tidak perlu memasang apa pun, dan tidak ada yang dikirim ke mana pun.

[![Editor di halaman demo](../docs/images/demo.png)](https://du10777.github.io/redmine_tiptap/)

Mesin editor: **TipTap 3.31.4**. Semua paket `@tiptap/*` disematkan ke versi yang sama persis dalam `package.json` dan `package-lock.json` dan harus selalu ditingkatkan bersama, ke satu versi yang sama.

**Daftar isi**

- [Versi Redmine yang didukung](#versi-redmine-yang-didukung)
- [Fitur](#fitur)
  - [Format teks](#format-teks)
  - [Daftar](#daftar)
  - [Tabel](#tabel)
  - [Gambar dan berkas](#gambar-dan-berkas)
  - [Kode](#kode)
  - [Blok](#blok)
  - [Penyuntingan](#penyuntingan)
  - [Integrasi Redmine](#integrasi-redmine)
- [Penyorotan sintaks](#penyorotan-sintaks)
- [Bahasa antarmuka](#bahasa-antarmuka)
- [Instalasi](#instalasi)
- [Pembaruan](#pembaruan)
  - [Dipasang dengan git (direkomendasikan)](#dipasang-dengan-git-direkomendasikan)
  - [Dipasang dari arsip](#dipasang-dari-arsip)
  - [Setelah memperbarui](#setelah-memperbarui)
- [Migrasi dari CKEditor](#migrasi-dari-ckeditor)

## Versi Redmine yang didukung

| Redmine | Didukung | Diuji di |
|---|---|---|
| 7.x | ya | 7.0.2 |
| 6.x | ya | 6.1.4, 6.1.5 |
| 5.x dan lebih lama | tidak | — |

Versi mayor baru (8.x dan seterusnya) baru didukung setelah plugin diuji di versi tersebut. Sampai saat itu, Redmine versi tersebut tidak dapat berjalan dengan plugin terpasang: Redmine berhenti dengan galat yang menyebutkan versi yang didukung.

## Fitur

### Format teks
- Tebal, miring, garis bawah, coretan, subscript dan superscript (Ctrl+, dan Ctrl+.), kode dalam baris.
- Warna teks dan warna latar belakang: palet 64 warna atau nilai heksadesimal apa pun.
- Keluarga font (13 font) dan ukuran font (preset dari 8 hingga 72 px, atau nilai apa pun).
- Gaya paragraf: tajuk 1–6 dan teks normal.
- Penyelarasan (kiri, tengah, kanan, rata kanan) dan indentasi (hingga 8 level) paragraf dan tajuk.
- Tautan: sisipkan, sunting, hapus.
- Garis horizontal, batalkan, dan ulangi.

### Daftar
- Daftar berpoin dengan penanda cakram, lingkaran, atau bujur sangkar.
- Daftar bernomor: 1, 01, a, A, i, I, α.
- Daftar tugas dengan kotak centang; tugas yang diselesaikan dicoret.
- Daftar bersarang (Tab / Shift+Tab).

### Tabel
- Sisipkan tabel dengan ukuran apa pun, dengan atau tanpa baris header.
- Menu klik kanan dalam sel: tambahkan dan hapus baris dan kolom, gabungkan dan pisahkan sel, baris header dan kolom header, hapus tabel.
- Lebar kolom diubah dengan menyeret batas sel.
- Menempel dari Excel mempertahankan lebar kolom, penyelarasan, dan ukuran font; tabel yang disalin dari Redmine menempel ke Excel dengan batas.

### Gambar dan berkas
- Tempel gambar dari papan klip: gambar diunggah sebagai berkas dan muncul dalam teks.
- Gambar yang dilampirkan dengan field file Redmine, atau dijatuhkan ke dalamnya, juga dimasukkan ke dalam teks.
- Sisipkan gambar dari berkas (pemilih thumbnail) atau tautan ke berkas apa pun.
- Ubah ukuran gambar dengan menyeret sudutnya.

### Kode
- Blok kode dengan penyorotan sintaks di editor dan di halaman yang disimpan: 52 bahasa, dan Anda dapat menambahkan lebih banyak (lihat [Penyorotan sintaks](#penyorotan-sintaks)).
- Bahasa blok dipilih dari badge di sudut kanannya, dengan pencarian, bahasa terbaru dan sering digunakan.
- Tab dan Shift+Tab indent dan outdent baris dalam blok kode; tebal, tautan, dan warna dalam kode dipertahankan.

### Blok
- Blok yang dapat disembunyikan: judul dengan konten tersembunyi (`<details>`). Disembunyikan di halaman yang disimpan, diperluas di editor.
- Blok kutipan dengan baris penulis dan tanggal.

### Penyuntingan
- Mode `<HTML>` untuk melihat dan menyunting sumber HTML: blok bersarang diberi indentasi, satu baris kosong memisahkan blok yang terdiri dari beberapa baris, sintaks diwarnai dengan aturan yang sama seperti blok kode HTML, dan Enter mempertahankan indentasi baris.
- Pengetikan gaya Markdown: `#` untuk tajuk, `-` dan `1.` untuk daftar, `[ ]` untuk tugas, ```` ```python ```` untuk blok kode (nama bahasa apa pun atau tidak ada), `**bold**`, `---` untuk garis horizontal. Pintasan papan ketik standar: Ctrl+B, Ctrl+I, Ctrl+U, Ctrl+Z dan lainnya.
- Editor tidak pernah tumbuh lebih tinggi dari jendela: bilah alat dan tombol formulir tetap terlihat, dan teks bergulir di dalamnya. Tinggi mengikuti ukuran jendela dan perbesar halaman.
- Gagang pengubah ukuran di sudut kanan bawah mengatur tinggi dengan tangan. Tinggi diingat; klik ganda kembali ke tinggi otomatis.

### Integrasi Redmine
- Bekerja di semua field teks Redmine dengan format: deskripsi masalah dan catatan, halaman wiki, berita, pesan forum, dokumen, deskripsi proyek, field teks panjang kustom, termasuk field yang muncul di halaman nanti.
- Teks disimpan sebagai HTML. Untuk menggunakan editor, pilih *TipTap HTML* sebagai format teks dalam pengaturan Redmine.
- Antarmuka (tooltip, menu, dialog) mengikuti bahasa dalam profil Redmine pengguna. 47 dari 50 bahasa Redmine dilengkapi dengan plugin: Bahasa Inggris dan Rusia lengkap, 45 lainnya adalah draf yang dibuat dengan model AI yang penutur asli diundang untuk mengoreksi. Tiga bahasa yang ditulis dari kanan ke kiri (Arab, Ibrani, Persia) sengaja tidak didukung (lihat [Bahasa antarmuka](#bahasa-antarmuka)).
- Tetap cepat pada teks besar: editor dalam bentuk tersembunyi dibuat hanya ketika formulir dibuka, dan blok kode panjang disorot ketika bergulir ke tampilan.
- Teks yang ditulis di CKEditor (plugin redmine_ckeditor) ditampilkan seperti adanya dan dibuka di editor dengan formatnya: tidak ada konversi, lihat [Migrasi dari CKEditor](#migrasi-dari-ckeditor).
- Teks yang disimpan ditampilkan tanpa HTML yang tidak aman: skrip, penangan acara, dan tautan `javascript:` dihapus saat halaman ditampilkan, hanya apa yang dihasilkan editor itu sendiri yang dipertahankan. Ini mencakup teks yang datang melalui REST API atau mode `<HTML>` juga.

## Penyorotan sintaks

Blok kode disorot di editor dan di halaman yang disimpan. Bahasa blok dipilih dari badge di sudut kanan atasnya; daftar memiliki kotak pencarian dan mengingat bahasa yang baru-baru ini dan sering digunakan.

52 bahasa disertakan dengan plugin, termasuk HTML, 1C, Cisco IOS, MikroTik RouterOS, Windows cmd, docker compose, log layanan Linux dan output journalctl.

Anda dapat menambahkan bahasa Anda sendiri. Setiap bahasa adalah satu file dalam folder `highlight/`. Salah satu dari 190+ tata bahasa highlight.js, atau tata bahasa pihak ketiga, dikonversi menjadi file seperti itu dengan satu perintah:

```sh
python3 highlight/_convert_grammar.py erlang
sh highlight/_compile.sh
```

Detail: [highlight/README/id.md](../highlight/README/id.md).

## Bahasa antarmuka

Editor berbicara dalam bahasa yang dipilih dalam profil Redmine pengguna (Akun saya → Bahasa). File untuk 47 dari 50 bahasa Redmine disertakan dengan plugin, dalam `config/locales/`. Bahasa Inggris adalah sumber dan Rusia adalah milik penulis sendiri; 45 lainnya adalah draf yang dibuat dengan bantuan model AI dan belum ditinjau oleh penutur asli, jadi harapkan frasa yang aneh di sana-sini. Teks yang hilang dari file ditampilkan dalam Bahasa Inggris.

Untuk mengoreksi terjemahan, ubah nilainya dalam `config/locales/<code>.yml` (`de`, `fr`, `pt-BR`, ...) dan restart Redmine. `bundle exec rake redmine_tiptap:locales` memeriksa file. Pull request dengan koreksi disambut.

**Bahasa yang ditulis dari kanan ke kiri (Arab, Ibrani, Persia) sengaja tidak didukung.** Mendukung mereka membutuhkan banyak perubahan pada basis kode, bukan hanya terjemahan, dan kami memilih untuk tidak melakukannya. Untuk bahasa ini editor ditampilkan dalam Bahasa Inggris dan tata letaknya tidak disesuaikan. Jika Anda membutuhkan salah satu dari mereka, buat fork: mekanisme terjemahan sudah siap, dan apa lagi yang harus diubah tercantum dalam [config/locales/README.md](../config/locales/README.md#right-to-left-languages).

Detail dan daftar bahasa Redmine: [config/locales/README.md](../config/locales/README.md).

## Instalasi

1. Letakkan plugin ke dalam folder `plugins` Redmine. Folder harus diberi nama `redmine_tiptap`. Cara paling mudah adalah git, yang juga membuat pembaruan menjadi satu perintah:
   ```sh
   cd /path/to/redmine
   git clone --branch release --single-branch --depth 1 https://github.com/Du10777/redmine_tiptap.git plugins/redmine_tiptap
   ```
   Cabang `release` hanya berisi file yang dibutuhkan plugin untuk berjalan, tanpa dokumentasi ini, dan `--depth 1` tidak mengunduh riwayat repositori.
2. Restart Redmine.
3. Dalam pengaturan Redmine (redmine.selfhosted/_settings_) pilih Format teks: *TipTap HTML*.

## Pembaruan

Plugin tidak memiliki migrasi database, dan bundel JavaScript bawaan dan stylesheet adalah bagian dari repositori. Pembaruan tidak memerlukan npm atau build di server: ganti file plugin dan restart Redmine.

Sebelum memperbarui, periksa bahwa versi baru mendukung versi Redmine Anda (lihat "Versi Redmine yang Didukung" di atas).

### Dipasang dengan git (direkomendasikan)

```sh
cd /path/to/redmine/plugins/redmine_tiptap
git pull
```

Kemudian restart Redmine, misalnya:

```sh
sudo systemctl restart redmine          # Redmine berjalan sebagai layanan systemd
touch /path/to/redmine/tmp/restart.txt  # Passenger
docker compose restart redmine          # Docker
```

Untuk tetap di versi tertentu alih-alih yang terbaru, ambil sebuah commit dari cabang `release` lalu beralih ke sana: `git fetch --depth 1 origin <commit> && git checkout <commit>`.

Jika plugin dipasang dengan `git clone` biasa (cabang `main`, dengan dokumentasi dan seluruh riwayat), pindahlah ke cabang `release` sekali saja: hapus folder `plugins/redmine_tiptap` lalu pasang ulang plugin seperti dijelaskan di [Instalasi](#instalasi). Plugin tidak menyimpan apa pun miliknya sendiri di foldernya, jadi tidak ada yang hilang; hanya bahasa penyorotan kode yang Anda tambahkan sendiri yang perlu disalin keluar dari `highlight/` terlebih dahulu.

### Dipasang dari arsip

1. Unduh `redmine_tiptap.zip` dari rilis terbaru: https://github.com/Du10777/redmine_tiptap/releases/latest/download/redmine_tiptap.zip. Isinya file yang sama dengan cabang `release` (plugin tanpa dokumentasi ini). Hapus folder lama `plugins/redmine_tiptap` dan ekstrak arsip di tempatnya; folder di dalamnya sudah bernama `redmine_tiptap`. Menghapus lebih dulu memastikan bahwa file yang sudah tidak ada di versi baru tidak tertinggal.
2. Hapus `public/assets/.manifest.json` di folder Redmine.
3. Restart Redmine.

Langkah 2 penting. Saat startup Redmine menerbitkan ulang aset plugin hanya jika file mereka lebih baru dari manifes ini. File yang diekstrak dari arsip mempertahankan stempel waktu asli mereka, jadi tanpa langkah 2 Redmine mungkin terus melayani editor lama. Manifes dibuat kembali secara otomatis saat startup. Dengan `git pull` langkah ini tidak diperlukan: git memberikan file yang berubah waktu saat ini.

### Setelah memperbarui

- Skrip dan stylesheet editor disajikan dengan sidik jari konten di URL mereka, jadi browser memuat versi baru langsung setelah restart. Pengguna tidak perlu menghapus cache browser mereka.
- Jika *Cache formatted text* diaktifkan dalam pengaturan Redmine (Administrasi → Pengaturan → Umum), hapus cache Redmine sekali setelah memperbarui ke versi yang mengubah cara teks ditampilkan (pembersihan HTML, dukungan teks CKEditor): `bundle exec rake tmp:cache:clear RAILS_ENV=production` di folder Redmine. Jika tidak, halaman yang dirender sebelum pembaruan dapat ditampilkan dari cache, tidak dibersihkan, sampai teksnya berubah.
- Versi plugin sebelumnya menyalin skrip ke `public/tiptap_bundle.js`. File-file ini tidak lagi digunakan dan dapat dihapus:
  ```sh
  rm -f /path/to/redmine/public/tiptap_bundle.js /path/to/redmine/public/tiptap_bundle.js.map
  ```

## Migrasi dari CKEditor

Jika Redmine Anda menggunakan [redmine_ckeditor](https://github.com/a-ono/redmine_ckeditor), Anda dapat beralih ke plugin ini dan menyimpan setiap teks yang telah ditulis: masalah, catatan, halaman wiki, berita, pesan, dokumen. Tidak ada yang dikonversi dan database tidak disentuh. CKEditor menyimpan teksnya sebagai HTML dan begitu juga plugin ini, jadi teks yang disimpan hanya ditampilkan oleh pemformat baru.

1. Pasang plugin (lihat di atas) dan pilih Format teks: *TipTap HTML*.
2. Simpan folder `public/system/rich/` dari Redmine Anda. Jika orang memasukkan gambar dan file dengan browser gambar CKEditor, semuanya disimpan di sana, bukan di database dan bukan sebagai lampiran, dan teks merujuk ke sana berdasarkan alamat (`/system/rich/...`). **Jika Redmine dipindahkan ke server lain atau dipasang ulang, pindahkan juga folder ini**, bersama database dan folder `files/`: keduanya tidak berisi file-file ini, dan tanpa folder tersebut gambar di teks lama menampilkan kesalahan 404. Lampiran masalah, halaman wiki, dan sebagainya disimpan seperti sebelumnya dan tidak perlu apa-apa. Gambar yang disisipkan di editor ini adalah lampiran biasa. Folder ini tetap diperlukan setelah redmine_ckeditor dihapus.
3. Hapus redmine_ckeditor ketika Anda tidak lagi membutuhkannya.

Teks lama ditampilkan seperti yang ditampilkan CKEditor: font, ukuran, warna dan penyelarasan, indentasi, daftar, tabel (batas, lebar, captions, sel yang digabung), gambar (ukuran, mengapung, batas, gambar dalam tautan), tautan, blok kode dengan bahasa mereka (disorot), makro Redmine (`{{toc}}`, `{{collapse(Title) ... }}`, `{{thumbnail(...)}}` dan sebagainya), wiki dan tautan masalah, alamat web biasa yang dapat diklik, dan `<iframe>` yang tertanam (video). Teks yang ditulis di CKEditor dikenali oleh markup-nya dan mempertahankan jarak antara paragraf yang dimilikinya di sana, yang lebih lebar daripada di editor ini.

Perbedaan dengan sengaja:
- `<iframe>` hanya ditampilkan jika menunjuk ke situs lain melalui http(s), dan disandboxkan: halaman di dalam dapat menjalankan skrip sendiri, tetapi tidak dapat menjangkau halaman Redmine, membuka jendela atas atau mengirimkan formulir. Semua `<iframe>` lainnya dihapus.
- Tautan terbuka di jendela yang sama: atribut `target` tautan (CKEditor's "New Window (_blank)") tidak dipertahankan.
- Beberapa pemformatan yang CKEditor tawarkan tetapi halaman-halamannya diam-diam dijatuhkan ditampilkan di sini: misalnya warna latar belakang gaya "Marker" dan tanda kutip dari `<q>`.
- Gaya "Special Container" dari CKEditor (blok dengan bingkai abu-abu) ditampilkan sebagai blok kode tanpa penyorotan, dan di editor juga berupa blok kode.

Teks lama mempertahankan pemformatannya ketika dibuka di editor dan disimpan kembali: makro Redmine (makro adalah satu elemen abu-abu di editor; sunting dalam mode `<HTML>`, seperti dalam mode Sumber CKEditor), `<iframe>`, blok `<div>` dan `<address>` beserta gayanya (`<div>` yang ditempel dari halaman web tetap diubah menjadi paragraf), subscript dan superscript, gaya inline CKEditor (besar, kecil, papan ketik, sampel dan sebagainya), gaya tajuk, tabel dan sel tabel, ukuran (lebar dan tinggi), mengapung, batas dan tautan gambar, bahasa blok kode. Apa yang tidak bertahan setelah penyuntingan: caption tabel menjadi paragraf berpusat di atasnya, bagian header dan footer tabel menjadi baris biasa (footer tetap di bawah), dan `<del>` menjadi `<s>` (tampilan yang sama). Teks yang disimpan dari editor ini mendapatkan jarak paragraf kompak dari editor ini.
