# Söz dizimi vurgulaması: diller

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

> *Bu çeviri yapay zeka modeli kullanılarak hazırlanmıştır ve yerli bir konuşmacı tarafından gözden geçirilmemiştir. Bir hata bulursanız, lütfen [bir sorun açın veya çekme isteği gönderin](https://github.com/Du10777/redmine_tiptap).*

Kod blokları düzenleyicide ve kaydedilen sayfalarda (görevler, notlar, wiki) eşit şekilde vurgulanır ve her iki yerde de aynı görünürler. Bir bloğun dili, sağ üst köşesindeki rozetten seçilir. Dillerin listesi `highlight/` klasöründeki dosyalar tarafından tanımlanır: bir dosya bir dildir.

Eklenti 52 dil ile birlikte gelir. Daha fazlasını ekleyebilirsiniz: bir highlight.js grameri bir betiğle dönüştürün ([Adding a language from highlight.js](#highlightjsden-dil-ekleme) bölümüne bakın) veya kendi dillerinizi yazın.

## Nasıl çalışır

- Vurgulanma [highlight.js](https://highlightjs.org) tarafından yapılır ([lowlight](https://github.com/wooorm/lowlight) vasıtasıyla). Düzenleyici ve kaydedilen sayfalar aynı motoru kullanır, bu nedenle renkler eşleşir.
- `_compile.sh` tüm dil dosyalarını bir dosyada, `assets/javascripts/tiptap_highlight.js` dosyasında paketler. Bu dosya depo tarafından sağlanır, bu nedenle eklentiyi kurmak herhangi bir derleme gerektirmez. Yalnızca dil kümesini değiştirdiğinizde derlemeniz gerekir.
- Redmine her sayfada `tiptap_highlight.js` dosyasını yükler, düzenleyiciden (`tiptap_bundle.js`) önce. Yüklemede düzenleyici o dosyadan tüm dilleri kaydeder.
- Düzenleyicide bir blok yazma duraklamasından 50 ms sonra yeniden vurgulanır ve yalnızca değişen blok. Kaydedilen sayfalarda bir blok görünüm alanına girdiğinde vurgulanır. Açılan bir bölüm içindeki blok bölüm açıldığında vurgulanır.
- Dil kaydedilen HTML'de tutulur: `<pre><code class="language-<id>">`. Bu nedenle bir dilin `id`'si asla değişmemesi gerekir: eski `id` ile kaydedilen bloklar sade metne dönüşür.
- Dil otomatik algılaması yoktur: dili olmayan bir blok sade metin olarak gösterilir. Dili `highlight/` klasöründe olmayan blok da öyledir (örneğin, dil dosyası silindi); rozeti `id`'yi göstermeye devam eder. Dil dosyası geri gelirse, renkler de geri gelir.
- Renkler. highlight.js metni `hljs-keyword`, `hljs-string`, `hljs-comment` gibi sınıflarla işaretler. Renkleri `assets/stylesheets/src/06_code.css` dosyasında ayarlanır, Redmine'nin kendi söz dizimi vurgulaması paletini kullanır.

## Dil dosyası

Örneğin, `routeros.js`:

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

| Alan | Gerekli | Nedir |
|---|---|---|
| `id` | evet | Kaydedilen HTML'de dil adı (`class="language-<id>"`). İzin verilen karakterler: `a-z`, `0-9`, `-`, `_`. **Bloklar bu dille kaydedildikten sonra asla değişmesin.** |
| `label` | hayır | Dil listesinde ve blok rozetinde ad. `id` ile öntanımlıdır. |
| `hint` | hayır | Listede ad yanında gri not. |
| `keywords` | hayır | Liste araması için ek sözcükler, boşlukla ayrılmış. |
| `grammar` | evet | highlight.js grameri: işlev `(hljs) => language definition`. |

`label`, `hint` ve `keywords` İngilizce'dir. Bir dili kullanıcının arayüz dilinde başka bir adla göstermek veya onu o dilin sözcükleriyle aranabilir hale getirmek için, o dilin çeviri dosyasında `config/locales/<code>.yml` dosyasında `code_languages:` bölümünde bir giriş ekleyin. Orada bulunan sözcükler `keywords` listeğine eklenir; `label` ve `hint` dil dosyasından olanları değiştirir. `config/locales/ru.yml` örneklere sahiptir, kurallar [config/locales/README.md](../../config/locales/README.md) dosyasında belirtilmiştir.

Klasördeki dosya türleri:

- **Kısa.** highlight.js npm paketindeki bir grameye başvuru, yukarıdaki örnek gibi; çoğu dil budur. Gramer, eklentinin `package-lock.json` dosyasında kaydedilen highlight.js sürümünden gelir.
- **Tam kopya.** Gramer kodu dosyada ve düzenlenebilir. Bu dosyalar dönüştürme betiği tarafından oluşturulur (aşağıya bakın).
- **Kendi grameri.** `log.js`, `journalctl.js`, `cisco-ios.js`; ortak parçaları `_common.js` dosyasındadır.
- **Sarıcı.** Başka ad altında hazır gramer: `cmd.js` highlight.js'den `dos`, `docker-compose.js` `yaml`.

`_` ile başlayan adlı dosyalar ve klasörler dil değildir:

- `_compile.sh` dilleri derler;
- `_check.mjs` derleme sırasında dilleri kontrol eder;
- `_common.js` eklentinin kendi gramlerin ortak parçalarını tutar;
- `_convert_grammar.py` highlight.js gramlerin dönüştüren betiktir (aşağıya bakın);
- `_vendor/` dönüştürülen gramlerin tarafından içe aktarılan dosyaları tutar.

`README/` klasörü bu belgeleri tutar.

## highlight.js'den dil ekleme

Hazır gramlerin (190'dan fazla) burada olacak: https://github.com/highlightjs/highlight.js/tree/main/src/languages. Adları ve takma adları [SUPPORTED_LANGUAGES.md](https://github.com/highlightjs/highlight.js/blob/main/SUPPORTED_LANGUAGES.md) dosyasında listelenmiş, ayrı depolarda tutulan yüzlerce üçüncü taraf grameri ile birlikte. Bu klasördeki `_convert_grammar.py` betiği bunlardan herhangi birini eklenti formatına dönüştürür.

Betik Python 3.6+ gerektirir (ek paket yok) ve github.com erişimi. Eklenti klasöründen çalıştırın:

```sh
cd /path/to/redmine/plugins/redmine_tiptap
python3 highlight/_convert_grammar.py erlang
sh highlight/_compile.sh
```

Argüman `erlang` `src/languages` klasöründe dosya adıdır, `.js` olmadan. İkinci komut dilleri derler ve kontrol eder. Sonra Redmine'yi yeniden başlatın ([Building and applying](#derleme-ve-uygulama) bölümüne bakın). Windows'ta `python3` yerine `py` veya `python` kullanın.

Örnekler:

```sh
# highlight.js dillerinin listesi (* = highlight/ klasöründe zaten var), isteğe bağlı olarak bir sözcükle filtrelenir
python3 highlight/_convert_grammar.py --list
python3 highlight/_convert_grammar.py --list sql

# bir kerede birkaç dil
python3 highlight/_convert_grammar.py erlang nix fsharp

# kendi adı, notu ve arama sözcükleri (bir kerede bir dil)
python3 highlight/_convert_grammar.py erlang --label "Erlang/OTP" --hint BEAM --keywords "erl otp"

# eklentiyle birlikte gelen kısa dosyayı düzenlenebilir tam kopya ile değiştir
python3 highlight/_convert_grammar.py routeros --force --label RouterOS --hint MikroTik --keywords mikrotik

# henüz yayımlanmış highlight.js sürümünde olmayan dil, kalkış dalından
python3 highlight/_convert_grammar.py odin --ref main

# tarayıcı adres çubuğundan düz gramer dosya bağlantısı
python3 highlight/_convert_grammar.py https://github.com/highlightjs/highlight.js/blob/main/src/languages/odin.js

# üçüncü taraf grameri: deposu bağlantısı, betik gramer dosyasını bulur
python3 highlight/_convert_grammar.py https://github.com/highlightjs/highlightjs-terraform

# yerel gramer dosyası
python3 highlight/_convert_grammar.py ~/grammars/mylang.js --id mylang

# kopyası yerine npm paketine başvuran kısa dosya yaz
python3 highlight/_convert_grammar.py erlang --npm

# hiçbir şey değiştirmeden ne yapılacağını göster
python3 highlight/_convert_grammar.py erlang --dry-run
```

### Betik ne yapar

1. Eklentinin çalıştığı highlight.js sürümünün `src/languages/<name>.js` dosyasını indir. Sürüm `package-lock.json` dosyasından okunur (şu anda 11.12.0), çünkü gramlerin kendi sürümünün motoru için yazılır. `--ref` başka bir sürüm, dalı veya işlemi seçer.
2. Dil adını gramer başlığının `Language:` satırından ve arama sözcüklerini takma adlarından (`aliases`) alır. `id` gramer dosya adıdır.
3. Gramer kodunu `highlight/<id>.js` dosyasına kopyalar, dışa aktarma hariç: `export default function(hljs)` `function grammar(hljs)` olur ve dil nesnesi `export default { id, label, keywords, grammar }` dosyanın sonuna eklenir. Gramer CommonJS modülüyse (`module.exports = ...`), başında `module` ve `exports` bildiren satır eklenir.
4. Gramer diğer dosyaları içe aktarırsa, bunları `highlight/_vendor/<source>-<version>/` içine depo içinde olduğu gibi indir ve içe aktarmaları oraya yönlendir. Örneğin, `typescript` `javascript.js` ve `lib/ecmascript.js` içe aktarır. Bu dosyalar aynı kaynaktan ve sürümden tüm diller tarafından paylaşılır; düzenleme gerekmez.
5. `Requires:` satırını kontrol eder, gömülü kod için kullanılan dilleri listeler (örneğin, `php-template` `xml` ve `php` gerekir). `highlight/` klasöründe değilse, onları ekleyen komutu yazdırır. Olmadan gömülü kod renklendirilmeden kalır; bu hata değil.
6. `--force` olmadan mevcut dosyaları üzerine yazmaz ve başka dosya tarafından kullanılan `id` almaz.

Dönüştürmeden sonra dil dosyasında düzenlenebilir.

### Seçenekler

| Seçenek | Ne yapar |
|---|---|
| `LANGUAGE ...` | highlight.js dil adı, gramer dosya bağlantısı veya GitHub'da üçüncü taraf gramer deposu bağlantısı, veya yerel `.js` dosya yolu. |
| `--ref REF` | highlight.js sürümü (etiket), dal veya işlem. `package-lock.json` dosyasındaki sürüme varsayılan. Bağlantılar için sürüm bağlantıdan alınır. |
| `--id ID` | Dil `id`'si. Gramer dosya adına varsayılan. |
| `--label TEXT` | Listede ve rozette ad. Gramerden `Language:` ile varsayılan. |
| `--hint TEXT` | Listede gri not. |
| `--keywords TEXT` | Boşlukla ayrılmış arama sözcükleri. Varsayılan: gramer takma adları. |
| `--npm` | Kod kopyası yerine highlight.js npm paketine başvuran kısa dosya yaz. Yalnızca highlight.js'in dilleri için. |
| `--force` | Mevcut dosyaları üzerine yaz. |
| `--dry-run` | Hiçbir şey değiştirmeden ne yapılacağını göster. |
| `--list [WORD]` | highlight.js dillerini ve üçüncü taraf gramlerin listele, isteğe bağlı olarak bir sözcükle filtrelenir. |
| `--prune` | `_vendor/` dosyasındaki hiç dil tarafından artık içe aktarılmayan dosyaları sil. |


**Kopya veya `--npm`?** Kopya kuralları dosyada gösterir: düzenleyebilir, kurulan pakettendan daha yeni bir gramer veya üçüncü taraf kullanabilirsiniz. Kopya eklenti highlight.js yükselttiğinde değişmez; yenilemek için dili `--force` ile yeniden dönüştürün. `--npm` ile yazılan dosya birkaç satırdır ve grameri eklenti ile birlikte yükseltilir.

## Derleme ve uygulama

```sh
sh highlight/_compile.sh
```

- Docker gerektirir (derleme `node:20-alpine` konteynerinde çalışır) veya Docker yoksa, aynı makinede Node.js 18+. İlk çalışta betik npm paketlerini eklentinin `node_modules/` klasörüne kurar.
- Önce betik her dili kontrol eder: ayrı derler, yükler, tarayıcıda çalışan aynı motora kaydeder ve örnek metni vurgular. Dil bozuksa (kod hatası, geçersiz regex, alınan `id`), betik dosyayı ve sebebi adlandırır ve durur; önceki `tiptap_highlight.js` yerinde kalır.
- Sonra betik tüm dilleri `assets/javascripts/tiptap_highlight.js` dosyasında paketler.

Derleme sonra Redmine'yi yeniden başlatın: eklenti dosyalarını başlatmada yayınlar ([Temel README](../../docs/README.tr.md#güncelleme) dosyasında "Güncelleme" için komutlara bakın). Tarayıcılar dosyayı hemen alır, çünkü URL'si içerik parmak izi içerir.

Redmine sunucusunun Docker'ı veya Node.js'ı yoksa, bunlardan birine sahip herhangi bir makinede derleyin (eklenti klasörü kopyası yeterlidir) ve ortaya çıkan `assets/javascripts/tiptap_highlight.js` dosyasını sunucuya koyun.

## Dil kaldırma

Dil dosyasını `highlight/` klasöründen silin, derleyin ve Redmine'yi yeniden başlatın. Kaydedilen bloklar bu dilde kalır ve sade metin olarak gösterilir. `_vendor/` klasöründe artık gerekli olmayan dosyalar şu şekilde silinir:

```sh
python3 highlight/_convert_grammar.py --prune
```

## Kendi gramlerin ve düzenleme kuralları

- Gramer `hljs` nesnesini alır ve dil tanımını döndüren işlevdir: metnin hangi parçalarını işaretlemek ve nasıl. Rehber: https://highlightjs.readthedocs.io/en/latest/language-guide.html, referans: https://highlightjs.readthedocs.io/en/latest/mode-reference.html. Örnekler: `log.js`, `journalctl.js`, `cisco-ios.js`.
- highlight.js bir dilin tüm kurallarının normal ifadelerini birinde birleştirir ve kendi bayraklarını yoksayar. Bu nedenle, büyük küçük harfe duyarlı olmayan eşleşme açık hale getirilmelidir (`[Ee]rror`) veya tüm dil için `case_insensitive: true` ile etkinleştirilmelidir.
- Standart belirteç sınıflarını tercih edin (`keyword`, `string`, `number`, `comment`, `title`, `attr`, `variable`, `built_in`, `literal`, `meta`, `symbol`, `type` vb.): zaten renkleri vardır. Kendi sınıfınız (örneğin, `scope: 'log-error'` `hljs-log-error` sınıfını üretir) `assets/stylesheets/src/06_code.css` dosyasında kurala ve CSS yeniden derlemesine (`assets/stylesheets/src/_build.sh`) ihtiyaç duyar.
- Başka ad altında hazır gramer sunmak için, `cmd.js` yaptığını yapın: orijinal grameri çağırın ve sonucunda `name` ve `aliases` değiştirin. Takma adlar değiştirilmezse, yeni dil orijinaldan onları alır.

## Dil eklendikten sonra eklentiyi güncelleme

git sizin `highlight/` klasörü dosyalarınızı bırakır. Ancak yeni eklenti sürümünde `assets/javascripts/tiptap_highlight.js` sizin dilleriniz olmadan derlenmiş ve sizin bu dosya derlemesi `git pull` yolunda durur. Böylece:

```sh
cd /path/to/redmine/plugins/redmine_tiptap
git checkout -- assets/javascripts/tiptap_highlight.js
git pull
sh highlight/_compile.sh
```

İlk komut derlemenizi atar, sonuncusu dilleri yeniden derler, sizin dilleriniz dahil. Sonra Redmine'yi yeniden başlatın. Eklentiyle gelen dil dosyalarını düzenlediyseniz, git onları çözmenizi isteyebilir.

Eklenti arşivden kurulduysa, dil dosyalarınızı ve `_vendor/` klasörünü eklenti klasörünü değiştirmeden önce kaydedin, daha sonra geri koyun ve dilleri derleyin.

## Boyut

Tüm diller bir dosyada paketlenmiş; tarayıcı onu bir kez indir ve sonra önbellekten alır. Şu anda 52 dil için 226 KB. Çoğu dil 1–10 KB, en büyüğü 1C (55 KB).
