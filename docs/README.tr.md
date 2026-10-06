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

> *Bu çeviri yapay zeka modeli kullanılarak hazırlanmıştır ve yerli bir konuşmacı tarafından gözden geçirilmemiştir. Bir hata bulursanız, lütfen [bir sorun açın veya çekme isteği gönderin](https://github.com/Du10777/redmine_tiptap).*

Bu, TipTap tabanlı Redmine için bir metin düzenleyicidir https://github.com/ueberdosis/tiptap

Desteklenen Redmine sürümleri: **6.\*** ve **7.\*** (6.1.4, 6.1.5 ve 7.0.2 üzerinde test edilmiştir).

Düzenleyici motoru: **TipTap 3.31.4**. Tüm `@tiptap/*` paketleri `package.json` ve `package-lock.json` dosyalarında bu tam sürüme sabitlenmiştir ve her zaman birlikte, aynı sürüme yükseltilmelidir.

## Özellikler

**Metin biçimi**
- Kalın, italik, altı çizili, üstü çizili, alt simge ve üst simge (Ctrl+, ve Ctrl+.), satır içi kod.
- Metin rengi ve arka plan rengi: 64 renkli palet veya herhangi bir hex değeri.
- Font ailesi (13 yazı tipi) ve font boyutu (8'den 72 px'e kadar ön ayarlar veya herhangi bir değer).
- Paragraf stilleri: başlıklar 1–6 ve normal metin.
- Paragraflar ve başlıkların hizalanması (sol, merkez, sağ, yasla) ve girinti (8 seviyeye kadar).
- Bağlantılar: ekle, düzenle, kaldır.
- Yatay çizgi, geri al ve yinele.

**Listeler**
- Disk, daire veya kare işaretleri olan madde işaretli listeler.
- Numaralandırılmış listeler: 1, 01, a, A, i, I, α.
- Onay kutuları olan görev listeleri; tamamlanan görevler üstü çizilidir.
- İç içe listeler (Tab / Shift+Tab).

**Tablolar**
- Başlık satırı olan veya olmayan herhangi bir boyutta tablo ekle.
- Hücrede sağ tık menüsü: satır ve sütun ekle ve sil, hücreleri birleştir ve böl, başlık satırını ayarla, tabloyu sil.
- Sütun genişlikleri hücre kenarlığını sürükleyerek değiştirilir.
- Excel'den yapıştırıldığında sütun genişlikleri, hizalama ve yazı tipi boyutları korunur; Redmine'den kopyalanan tablo, sınırlarla Excel'e yapıştırılır.

**Resimler ve ekler**
- Panodan bir resim yapıştırıldığında: dosya olarak yüklenir ve metinde görünür.
- Redmine'nin dosya alanıyla eklenen veya üzerine atılan resimler de metne eklenir.
- Ekli dosyalardan resim ekle (küçük resim seçici) veya herhangi bir dosyaya bağlantı.
- Köşelerini sürükleyerek resimi yeniden boyutlandırın.

**Kod**
- Düzenleyicide ve kaydedilen sayfalarda söz dizimi vurgulaması olan kod blokları: 52 dil ve daha fazlasını ekleyebilirsiniz ([Syntax highlighting](#söz-dizimi-vurgulaması) bölümüne bakın).
- Bir bloğun dili, köşesindeki rozet çizgisinden seçilir; listede arama, son kullanılan ve sık kullanılan diller vardır.
- Kod bloğu içinde Tab ve Shift+Tab satırları girintiler; kod içindeki kalın, bağlantılar ve renkler korunur.

**Bloklar**
- Çöktürülebilir blok: başlığı olan gizli içerik (`<details>`). Kaydedilen sayfalarda kapalı, düzenleyicide açık.
- Yazar ve tarih satırı olan alıntı bloğu.

**Düzenleme**
- `<HTML>` modu HTML kaynağını görmek ve düzenlemek içindir: iç içe bloklar girintilenir, birden çok satır kaplayan bloklar boş bir satırla ayrılır, söz dizimi bir HTML kod bloğuyla aynı kurallara göre renklendirilir ve Enter satırın girintisini korur.
- Markdown benzeri yazma: başlıklar için `#`, listeler için `-` ve `1.`, görevler için `[ ]`, kod bloğu için ```` ```python ````, `**bold**`, yatay çizgi için `---`. Standart klavye kısayolları: Ctrl+B, Ctrl+I, Ctrl+U, Ctrl+Z vb.
- Düzenleyici hiçbir zaman pencerenin ötesinde büyümez: araç çubuğu ve form düğmeleri görünür kalır, metin içinde kaydırılır. Yükseklik, pencere boyutunu ve sayfa yakınlaştırmasını takip eder.
- Sağ alt köşedeki yeniden boyutlandırma tutacağı yüksekliği elle ayarlar. Yükseklik hatırlanır; çift tıklama otomatik yüksekliğe döner.

**Redmine entegrasyonu**
- Redmine'nin metin formatıyla tüm metin alanlarında çalışır: görev açıklamaları ve notları, wiki sayfaları, haberler, forum iletileri, belgeler, proje açıklamaları, uzun metin özel alanları, daha sonra sayfada görünen alanlar da dahil olmak üzere.
- Metin HTML olarak depolanır. Düzenleyiciyi kullanmak için Redmine ayarlarında metin biçimini *TipTap HTML* seçin.
- Arayüz (ipuçları, menüler, iletişim kutuları) kullanıcının Redmine profilindeki dili takip eder. Redmine'nin 50 dilinden 47'si eklentiyle birlikte gelir: İngilizce ve Rusça tamamdır, diğer 45'i yapay zeka modeli tarafından hazırlanan taslaklar olup yerli konuşmacılar tarafından düzeltilmesi beklenmektedir. Sağdan sola yazılan üç dil (Arapça, İbranice, Farsça) bilerek desteklenmez ([Interface language](#arayüz-dili) bölümüne bakın).
- Büyük metinlerde hızlı kalır: gizli formlardaki düzenleyiciler yalnızca form açıldığında oluşturulur ve uzun kod blokları görünüm alanına girdiğinde vurgulanır.
- CKEditor'da yazılan metinler (redmine_ckeditor eklentisi) olduğu gibi gösterilir ve düzenleyicide açılır, biçimlendirmesi korunur: dönüştürme yoktur, [Migrating from CKEditor](#ckeditordan-geçiş) bölümüne bakın.
- Kaydedilen metinler güvenli olmayan HTML olmadan gösterilir: komut dosyaları, olay işleyicileri ve `javascript:` bağlantıları bir sayfa görüntülendiğinde kaldırılır, yalnızca düzenleyicinin kendisi tarafından üretilen şey tutulur. Bu, REST API aracılığıyla ve `<HTML>` modu aracılığıyla gelen metinleri de kapsar.

## Söz dizimi vurgulaması

Kod blokları düzenleyicide ve kaydedilen sayfalarda eşit şekilde vurgulanır. Bir bloğun dili, sağ üst köşesindeki rozetten seçilir; listede bir arama kutusu vardır ve son kullanılan ve sık kullanılan dilleri hatırlar.

Eklenti 52 dil ile birlikte gelir; bunlar arasında HTML, 1C, Cisco IOS, MikroTik RouterOS, Windows cmd, docker compose, Linux hizmet günlükleri ve journalctl çıktısı vardır.

Kendi dillerinizi ekleyebilirsiniz. Her dil `highlight/` klasöründe bir dosyadır. 190'dan fazla highlight.js gramerini veya üçüncü taraf grameri tek bir komutla böyle bir dosyaya dönüştürebilirsiniz:

```sh
python3 highlight/_convert_grammar.py erlang
sh highlight/_compile.sh
```

Ayrıntılar: [highlight/README/tr.md](../highlight/README/tr.md).

## Arayüz dili

Düzenleyici, kullanıcının Redmine profilinde seçilen dili konuşur (Hesabım → Dil). Redmine'nin 50 dilinden 47'si için dosyalar eklentiyle birlikte gelir, `config/locales/` klasöründe. İngilizce kaynak ve Rusça yazar kendi dilidir; diğer 45'i yapay zeka modeli tarafından hazırlanan taslaklar olup henüz yerli konuşmacılar tarafından gözden geçirilmemiştir, bu nedenle burada orada garip bir ifade bekleyin. Dosyada eksik olan metin İngilizce gösterilir.

Tercümeyi düzeltmek için `config/locales/<code>.yml` (`de`, `fr`, `pt-BR`, ...) dosyasında değerlerini değiştirin ve Redmine'yi yeniden başlatın. `bundle exec rake redmine_tiptap:locales` dosyaları kontrol eder. Düzeltmelerle çekme istekleri hoş karşılanır.

**Sağdan sola yazılan diller (Arapça, İbranice, Farsça) bilerek desteklenmez.** Bunları desteklemek yalnızca tercüme değil, kod tabanında birçok değişiklik gerektirir ve bunu yapmaması kararını verdik. Bu diller için düzenleyici İngilizce gösterilir ve düzeni ayarlanmaz. Bunlardan birine ihtiyacınız varsa, çatal oluşturun: tercüme mekanizması hazırdır ve başka ne değiştirilmesi gerekiyorsa [config/locales/README.md](../config/locales/README.md#right-to-left-languages) dosyasında listelenmiştir.

Ayrıntılar ve Redmine dillerinin listesi: [config/locales/README.md](../config/locales/README.md).

## Kurulum

1. Eklentiyi Redmine'nin `plugins` klasörüne yerleştirin. Klasör `redmine_tiptap` adlandırılmalıdır. En kolay yol git'tir, bu da güncellemeleri tek bir komut yapar:
   ```sh
   cd /path/to/redmine
   git clone https://github.com/Du10777/redmine_tiptap.git plugins/redmine_tiptap
   ```
2. Redmine'yi yeniden başlatın.
3. Redmine ayarlarında (redmine.selfhosted/_settings_) metin biçimini seçin: *TipTap HTML*.

## Güncelleme

Eklentinin veritabanı geçişi yoktur ve yerleşik JavaScript paketi ve stil sayfası depo tarafından sağlanır. Güncelleme ne npm ne de sunucuda derleme gerektirir: eklenti dosyalarını değiştirin ve Redmine'yi yeniden başlatın.

Güncellemeden önce yeni sürümün Redmine sürümünüzü destekleyip desteklemediğini kontrol edin (yukarıdaki "Desteklenen Redmine sürümleri"ne bakın).

### Git ile kurulu (önerilir)

```sh
cd /path/to/redmine/plugins/redmine_tiptap
git pull
```

Sonra Redmine'yi yeniden başlatın, örneğin:

```sh
sudo systemctl restart redmine          # Redmine systemd hizmeti olarak çalışıyor
touch /path/to/redmine/tmp/restart.txt  # Passenger
docker compose restart redmine          # Docker
```

En son sürümde kalmak yerine belirli bir sürümde kalmak için: `git fetch && git checkout <tag-or-commit>`.

### Arşivden kurulu

1. Eski `plugins/redmine_tiptap` klasörünü silin ve yeni sürümü onun yerine çıkarın. Silme, yeni sürümde kaldırılan dosyaların kalmamasını sağlar.
2. Redmine klasöründe `public/assets/.manifest.json` dosyasını silin.
3. Redmine'yi yenidenibaşlatın.

Adım 2 önemlidir. Redmine başlatmada eklenti varlıklarını yalnızca dosyaları bu manifestten daha yeniyse yeniden yayınlar. Arşivden çıkarılan dosyalar orijinal zaman damgalarını korur, bu nedenle adım 2 olmadan Redmine eski düzenleyiciyi sunmaya devam edebilir. Manifest başlatmada otomatik olarak yeniden oluşturulur. `git pull` ile bu adım gerekli değildir: git değiştirilen dosyalara geçerli saati verir.

### Güncellemeden sonra

- Düzenleyici betiği ve stil sayfası URL'lerinde içerik parmak izi ile sunulduğundan, tarayıcılar yeniden başladıktan sonra yeni sürümü yükler. Kullanıcıların tarayıcı önbelleğini temizlemeleri gerekmez.
- Redmine ayarlarında *Biçimlendirilmiş metni önbelleğe al* etkinse (Yönetim → Ayarlar → Genel), metinlerin gösterilişini değiştiren bir sürüme güncelledikten sonra Redmine'nin önbelleğini bir kez temizleyin (HTML temizliği, CKEditor metni desteği): Redmine klasöründe `bundle exec rake tmp:cache:clear RAILS_ENV=production`. Aksi takdirde güncelleme öncesinde oluşturulmuş sayfalar metni değişene kadar önbellekten temizlenmemiş gösterilebilir.
- Eklentinin önceki sürümleri komut dosyasını `public/tiptap_bundle.js` dosyasına kopyaladı. Bu dosyalar artık kullanılmamakta ve silinebilirler:
  ```sh
  rm -f /path/to/redmine/public/tiptap_bundle.js /path/to/redmine/public/tiptap_bundle.js.map
  ```

## CKEditor'dan Geçiş

Redmine'niz [redmine_ckeditor](https://github.com/a-ono/redmine_ckeditor) kullanıyorsa, bu eklentiye geçebilir ve yazılan her metni tutabilirsiniz: görevler, notlar, wiki sayfaları, haberler, iletiler, belgeler. Hiçbir şey dönüştürülmez ve veritabanı değiştirilmez. CKEditor metinleri HTML olarak depolar ve bu eklenti de öyle yapar, bu nedenle depolanan metin yeni biçimci tarafından gösterilir.

1. Eklentiyi kurun (yukarıya bakın) ve metin biçimini seçin: *TipTap HTML*.
2. Redmine'nizin `public/system/rich/` klasörünü tutun. CKEditor'un resim tarayıcısıyla resim ve dosya eklenmişse, bunlar veritabanında veya ekler arasında değil, orada depolanır ve metinler bunlara adresle referans verir (`/system/rich/...`). **Redmine başka bir sunucuya taşınırsa veya yeniden kurulursa bu klasörü de taşıyın**, veritabanı ve `files/` klasörüyle birlikte: bunların hiçbiri bu dosyaları içermez ve klasör olmadan eski metinlerdeki resimler 404 hatası verir. Görevlerin, wiki sayfalarının vb. ekleri eskisi gibi depolanır ve hiçbir şey gerektirmez. Bu düzenleyiciyle eklenen resimler sıradan eklerdir. Klasör, redmine_ckeditor kaldırıldıktan sonra da gereklidir.
3. Artık ihtiyacınız olmadığında redmine_ckeditor'u kaldırın.

Eski metin, CKEditor'un gösterdiği şekilde gösterilir: yazı tipleri, boyutlar, renkler ve hizalama, girintiler, listeler, tablolar (sınırlar, genişlikler, yazlıklar, birleştirilmiş hücreler), resimler (boyut, float, sınır, bağlantı içindeki resim), bağlantılar, dili vurgulanmış kod blokları, Redmine makroları (`{{toc}}`, `{{collapse(Title) ... }}`, `{{thumbnail(...)}}` vb.), wiki ve görev bağlantıları, düz web adresleri tıklanabilir yapılmış ve gömülü `<iframe>` (video). CKEditor'da yazılan metin işareti tarafından tanınır ve paragraflar arasında orada olduğu boşluğu tutar, bu da bu düzenleyicide olduğundan daha geniştir.

Amaçlı farklar:
- `<iframe>` yalnızca başka bir siteyi http(s) üzerinden işaret ettiğinde gösterilir ve korumalı hale getirilir: sayfa içindeki sayfa kendi komut dosyalarını çalıştırabilir, ancak Redmine sayfasına erişemez, üst pencereyi açamaz veya formları gönderemez. Diğer tüm `<iframe>` kaldırılır.
- Bağlantılar aynı pencerede açılır: bağlantının `target` niteliği (CKEditor'un "Yeni Pencere (_blank)") tutulmaz.
- CKEditor tarafından sunulan ancak sayfaları sessizce bıraktığı bazı biçimlendirmeler burada gösterilir: örneğin, "İşaretçi" stillerinin arka plan renkleri ve `<q>` alıntı işaretleri.
- CKEditor'un “Special Container” stili (gri çerçeveli bir blok) söz dizimi vurgulaması olmayan bir kod bloğu olarak gösterilir ve düzenleyicide de bir kod bloğudur.

Eski metin, düzenleyicide açıldığında ve tekrar kaydedildiğinde biçimlendirmesini tutar: Redmine makroları (makro düzenleyicide bir gri öğedir; `<HTML>` modunda CKEditor'un Kaynak modunda olduğu gibi düzenleyin), `<iframe>`, stilleriyle birlikte `<div>` ve `<address>` blokları (bir web sayfasından yapıştırılan `<div>` yine de paragrafa dönüştürülür), alt simgeler ve üst simgeler, CKEditor satır içi stilleri (büyük, küçük, klavye, örnek vb.), başlık stilleri, tablolar ve tablo hücreleri, resim boyutu (genişlik ve yükseklik), float, sınır ve bağlantısı, kod bloklarının dili. Düzenlemeden sonra korunmayanlar: tablo başlığı onun üstündeki ortalanmış paragrafa dönüşür, tablo üst bilgisi ve alt bilgisi bölümleri sıradan satırlara dönüşür (alt bilgi altta kalır) ve `<del>` `<s>` olur (aynı görünüş). Bu düzenleyiciden kaydedilen metin bu düzenleyicinin kompakt paragraf aralığını alır.
