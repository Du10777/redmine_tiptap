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

> *Bu tərcümə süni intellekt modelinin köməyi ilə hazırlanıb və ana dili daşıyıcısı tərəfindən yoxlanılmayıb. Səhv tapsanız, lütfən, [issue və ya pull request açın](https://github.com/Du10777/redmine_tiptap).*

Bu, Redmine üçün TipTap (https://github.com/ueberdosis/tiptap) əsasında hazırlanmış mətn redaktorudur.

Dəstəklənən Redmine versiyaları:

| Redmine | Dəstəklənir | Sınaqdan keçirilib |
|---|---|---|
| 7.x | bəli | 7.0.2 |
| 6.x | bəli | 6.1.4, 6.1.5 |
| 5.x və daha köhnə | xeyr | — |

Yeni əsas versiya (8.x və sonrakılar) yalnız plagin onun üzərində sınaqdan keçirildikdən sonra dəstəklənir. O vaxta qədər həmin versiyalı Redmine plagin quraşdırılmış halda işə düşmür: dəstəklənən versiyaları göstərən xəta ilə dayanır.

Redaktorun mühərriki: **TipTap 3.31.4**. Bütün `@tiptap/*` paketləri `package.json` və `package-lock.json` fayllarında məhz bu versiyaya sabitlənib və həmişə birlikdə, bir və eyni versiyaya yenilənməlidir.

## Xüsusiyyətlər

**Mətnin formatlaşdırılması**
- Qalın, kursiv, altından xətt çəkilmiş, üstündən xətt çəkilmiş mətn, alt və üst indekslər (Ctrl+, və Ctrl+.), sətirdaxili kod.
- Mətn rəngi və fon rəngi: 64 rəngli palitra və ya istənilən hex dəyəri.
- Şrift ailəsi (13 şrift) və şrift ölçüsü (8-dən 72 px-ə qədər hazır dəyərlər və ya istənilən dəyər).
- Abzas üslubları: 1–6-cı səviyyə başlıqları və adi mətn.
- Abzasların və başlıqların düzləndirilməsi (sola, mərkəzə, sağa, eninə) və girintisi (8 səviyyəyə qədər).
- Keçidlər: daxil etmək, redaktə etmək, silmək.
- Üfüqi xətt, geri qaytarma və təkrar etmə.

**Siyahılar**
- Markerli siyahılar: dolu dairə, boş dairə və ya kvadrat markerlərlə.
- Nömrələnmiş siyahılar: 1, 01, a, A, i, I, α.
- Seçim qutuları olan tapşırıq siyahıları; yerinə yetirilmiş tapşırıqların üstündən xətt çəkilir.
- İç-içə siyahılar (Tab / Shift+Tab).

**Cədvəllər**
- İstənilən ölçüdə cədvəl daxil etmək: başlıq sətri ilə və ya onsuz.
- Xanada sağ klik menyusu: sətir və sütunların əlavə edilməsi və silinməsi, xanaların birləşdirilməsi və bölünməsi, başlıq sətri və başlıq sütunu, cədvəlin silinməsi.
- Sütunların eni xanaların sərhədlərini sürükləməklə dəyişdirilir.
- Excel-dən yapışdırma zamanı sütunların eni, düzləndirmə və şrift ölçüləri saxlanılır; Redmine-dən kopyalanmış cədvəl Excel-ə haşiyələrlə yapışdırılır.

**Şəkillər və qoşulmuş fayllar**
- Şəkli mübadilə buferindən yapışdırmaq: o, qoşulmuş fayl kimi yüklənir və mətndə görünür.
- Redmine-in fayl sahəsi ilə qoşulan və ya onun üzərinə buraxılan şəkillər də mətnə daxil edilir.
- Qoşulmuş fayllardan şəkil (miniatür seçimi ilə) və ya istənilən qoşulmuş fayla keçid daxil etmək.
- Şəklin ölçüsünü künclərindən sürükləməklə dəyişmək.

**Kod**
- Redaktorda və saxlanmış səhifələrdə sintaksisin vurğulanması ilə kod blokları: 52 dil, daha çoxunu özünüz əlavə edə bilərsiniz (bax: [Sintaksisin vurğulanması](#sintaksisin-vurğulanması)).
- Blokun dili küncündəki nişandan seçilir: axtarış, son istifadə olunan və tez-tez istifadə olunan dillər.
- Tab və Shift+Tab kod blokunun içində sətirlərin girintisini artırır və azaldır; kodun içindəki qalın mətn, keçidlər və rənglər saxlanılır.

**Bloklar**
- Yığıla bilən blok: gizlədilmiş məzmunlu başlıq (`<details>`). Saxlanmış səhifələrdə yığılmış, redaktorda isə açılmış olur.
- Müəllif və tarix sətri olan sitat bloku.

**Redaktə**
- HTML mənbə kodunu görmək və redaktə etmək üçün `<HTML>` rejimi: iç-içə bloklar girintili yazılır, bir neçə sətir tutan blokları boş sətir ayırır, sintaksis HTML kod bloku ilə eyni qaydalar üzrə rənglənir və Enter sətrin girintisini saxlayır.
- Markdown üslubunda yazma: başlıqlar üçün `#`, siyahılar üçün `-` və `1.`, tapşırıqlar üçün `[ ]`, kod bloku üçün ```` ```python ```` (istənilən dil adı ilə və ya dil adı olmadan), `**bold**`, üfüqi xətt üçün `---`. Standart klaviatura qısayolları: Ctrl+B, Ctrl+I, Ctrl+U, Ctrl+Z və digərləri.
- Redaktor heç vaxt pəncərədən hündür olmur: alətlər paneli və formanın düymələri görünən qalır, mətn isə redaktorun daxilində sürüşdürülür. Hündürlük pəncərənin ölçüsünə və səhifənin miqyasına uyğun dəyişir.
- Aşağı sağ küncdəki ölçü dəyişdirmə tutacağı hündürlüyü əl ilə təyin etməyə imkan verir. Hündürlük yadda saxlanılır; iki dəfə klik avtomatik hündürlüyə qaytarır.

**Redmine ilə inteqrasiya**
- Formatlaşdırma imkanı olan bütün Redmine mətn sahələrində işləyir: tapşırıqların təsvirləri və qeydləri, wiki səhifələri, xəbərlər, forum mesajları, sənədlər, layihələrin təsvirləri, uzun mətn tipli sazlanan sahələr, o cümlədən səhifədə sonradan görünən sahələr.
- Mətn HTML şəklində saxlanılır. Redaktordan istifadə etmək üçün Redmine sazlamalarında mətnin formatlaşdırılması kimi *TipTap HTML* seçin.
- İnterfeys (alət məsləhətləri, menyular, dialoqlar) istifadəçinin Redmine profilindəki dilə uyğunlaşır. Redmine-in 50 dilindən 47-si plaginə daxildir: ingilis və rus dilləri tam hazırdır, qalan 45-i süni intellekt modeli ilə hazırlanmış qaralamalardır və dil daşıyıcılarının düzəlişləri məmnuniyyətlə qarşılanır. Sağdan sola yazılan üç dil (ərəb, ivrit, fars) qəsdən dəstəklənmir (bax: [İnterfeys dili](#i̇nterfeys-dili)).
- Böyük mətnlərdə sürətli işləyir: gizli formalardakı redaktorlar yalnız forma açılanda yaradılır, uzun kod blokları isə ekranda göründükdə vurğulanır.
- CKEditor-da (redmine_ckeditor plagini) yazılmış mətnlər əvvəlki kimi göstərilir və redaktorda öz formatlaşdırması ilə açılır: heç bir çevirmə yoxdur, bax: [CKEditor-dan miqrasiya](#ckeditor-dan-miqrasiya).
- Saxlanmış mətnlər təhlükəli HTML olmadan göstərilir: səhifə göstərilərkən skriptlər, hadisə işləyiciləri və `javascript:` keçidləri silinir, yalnız redaktorun özünün yaratdığı elementlər saxlanılır. Bu, REST API və ya `<HTML>` rejimi ilə daxil olan mətnlərə də aiddir.

## Sintaksisin vurğulanması

Kod blokları həm redaktorda, həm də saxlanmış səhifələrdə eyni cür vurğulanır. Blokun dili yuxarı sağ küncdəki nişandan seçilir; siyahıda axtarış sahəsi var və o, son istifadə olunan və tez-tez istifadə olunan dilləri yadda saxlayır.

Plaginlə birlikdə 52 dil gəlir, o cümlədən HTML, 1C, Cisco IOS, MikroTik RouterOS, Windows cmd, docker compose, Linux xidmət jurnalları və journalctl çıxışı.

Öz dillərinizi əlavə edə bilərsiniz. Hər dil `highlight/` qovluğunda bir fayldır. highlight.js-in 190+ qrammatikasından istənilən biri və ya üçüncü tərəfin qrammatikası bir əmrlə belə fayla çevrilir:

```sh
python3 highlight/_convert_grammar.py erlang
sh highlight/_compile.sh
```

Ətraflı: [highlight/README/az.md](../highlight/README/az.md).

## İnterfeys dili

Redaktor istifadəçinin Redmine profilində seçilmiş dildə işləyir (Mənim hesabım → Dil). Redmine-in 50 dilindən 47-nin faylları plaginlə birlikdə `config/locales/` qovluğunda gəlir. İngilis dili mənbədir, rus dili isə müəllifin öz dilidir; qalan 45 dil süni intellekt modelinin köməyi ilə hazırlanmış, hələ dil daşıyıcıları tərəfindən yoxlanılmamış qaralamalardır, ona görə yer-yer qəribə ifadələr ola bilər. Faylda olmayan mətn ingilis dilində göstərilir.

Tərcüməni düzəltmək üçün `config/locales/<code>.yml` faylında (`de`, `fr`, `pt-BR`, ...) onun dəyərlərini dəyişin və Redmine-i yenidən işə salın. `bundle exec rake redmine_tiptap:locales` əmri faylları yoxlayır. Düzəlişləri olan pull request-lər məmnuniyyətlə qarşılanır.

**Sağdan sola yazılan dillər (ərəb, ivrit, fars) qəsdən dəstəklənmir.** Onların dəstəklənməsi yalnız tərcüməni deyil, kod bazasında çoxlu dəyişikliklər tələb edir və biz bunu öz üzərimizə götürməməyi seçdik. Bu dillər üçün redaktor ingilis dilində göstərilir və onun düzülüşü uyğunlaşdırılmır. Onlardan birinə ehtiyacınız varsa, fork yaradın: tərcümə mexanizmi hazırdır, qalan nələrin dəyişdirilməli olduğu isə [config/locales/README.md](../config/locales/README.md#right-to-left-languages) faylında göstərilib.

Ətraflı məlumat və Redmine dillərinin siyahısı: [config/locales/README.md](../config/locales/README.md).

## Quraşdırma

1. Plagini Redmine-in `plugins` qovluğuna yerləşdirin. Qovluğun adı `redmine_tiptap` olmalıdır. Ən asan yol git-dən istifadədir, bu, yeniləməni də tək bir əmrə çevirir:
   ```sh
   cd /path/to/redmine
   git clone https://github.com/Du10777/redmine_tiptap.git plugins/redmine_tiptap
   ```
2. Redmine-i yenidən işə salın.
3. Redmine sazlamalarında (redmine.selfhosted/_settings_) Mətnin formatlaşdırılması üçün *TipTap HTML* seçin.

## Yeniləmə

Plaginin verilənlər bazası migrasiyaları yoxdur, build edilmiş JavaScript bundle faylı və üslub cədvəli isə repozitoriyanın tərkibindədir. Yeniləmək üçün nə npm, nə də serverdə build lazımdır: plaginin fayllarını əvəz edin və Redmine-i yenidən işə salın.

Yeniləmədən əvvəl yeni versiyanın Redmine versiyanızı dəstəklədiyini yoxlayın (yuxarıdakı "Dəstəklənən Redmine versiyaları" ifadəsinə bax).

### git ilə quraşdırıldıqda (tövsiyə olunur)

```sh
cd /path/to/redmine/plugins/redmine_tiptap
git pull
```

Sonra Redmine-i yenidən işə salın, məsələn:

```sh
sudo systemctl restart redmine          # systemd xidməti kimi işləyən Redmine
touch /path/to/redmine/tmp/restart.txt  # Passenger
docker compose restart redmine          # Docker
```

Son commit əvəzinə müəyyən bir versiyada qalmaq üçün: `git fetch && git checkout <tag-or-commit>`.

### Arxivdən quraşdırıldıqda

1. Köhnə `plugins/redmine_tiptap` qovluğunu silin və yeni versiyanı onun yerinə açın. Əvvəlcə silmək yeni versiyada ləğv edilmiş faylların yerində qalmamasını təmin edir.
2. Redmine qovluğundakı `public/assets/.manifest.json` faylını silin.
3. Redmine-i yenidən işə salın.

2-ci addım vacibdir. Redmine işə salınarkən plaginin statik resurslarını yalnız faylları bu manifestdən yenidirsə yenidən dərc edir. Arxivdən çıxarılmış fayllar öz ilkin vaxt möhürlərini saxlayır, ona görə də 2-ci addım olmadan Redmine köhnə redaktoru təqdim etməyə davam edə bilər. Manifest işə salınarkən avtomatik yenidən yaradılır. `git pull` ilə bu addım lazım deyil: git dəyişdirilmiş fayllara cari vaxtı verir.

### Yenilədikdən sonra

- Redaktorun skripti və üslub cədvəli URL ünvanlarında məzmunun barmaq izi ilə təqdim olunur, buna görə brauzerlər yeni versiyanı yenidən işə salındıqdan dərhal sonra yükləyir. İstifadəçilər brauzerin keşini təmizləməli deyillər.
- Redmine sazlamalarında (İnzibatçılıq → Sazlamalar → Ümumi) *Formatlaşdırılmış mətnin heşlənməsi* aktivləşdirilibsə, mətnlərin göstərilmə qaydasını dəyişən versiyaya yenilədikdən sonra (HTML-in təmizlənməsi, CKEditor mətnlərinin dəstəyi) Redmine-in keşini bir dəfə təmizləyin: Redmine qovluğunda `bundle exec rake tmp:cache:clear RAILS_ENV=production` əmrini icra edin. Əks halda yeniləmədən əvvəl render edilmiş səhifələr mətni dəyişənə qədər keşdən, təmizlənməmiş şəkildə göstərilə bilər.
- Plaginin əvvəlki versiyaları skripti `public/tiptap_bundle.js` faylına kopyalayırdı. Bu fayllar artıq istifadə olunmur və silinə bilər:
  ```sh
  rm -f /path/to/redmine/public/tiptap_bundle.js /path/to/redmine/public/tiptap_bundle.js.map
  ```

## CKEditor-dan miqrasiya

Redmine-inizdə [redmine_ckeditor](https://github.com/a-ono/redmine_ckeditor) istifadə olunurdusa, bu plagindən istifadəyə keçib yazılmış bütün mətnləri saxlaya bilərsiniz: tapşırıqlar, qeydlər, wiki səhifələri, xəbərlər, mesajlar, sənədlər. Heç nə çevrilmir və verilənlər bazasına toxunulmur. CKEditor mətnlərini HTML şəklində saxlayır, bu plagin də eyni qaydada saxlayır, ona görə də saxlanmış mətn sadəcə yeni formatlayıcı tərəfindən göstərilir.

1. Plagini quraşdırın (yuxarıya bax) və Mətnin formatlaşdırılması üçün *TipTap HTML* seçin.
2. Redmine-inizin `public/system/rich/` qovluğunu saxlayın. İnsanlar CKEditor-un şəkil brauzeri ilə şəkillər və fayllar daxil etmişlərsə, onlar verilənlər bazasında da, qoşulmuş fayllar arasında da deyil, orada saxlanılır və mətnlər onlara ünvanla (`/system/rich/...`) istinad edir. **Redmine başqa serverə köçürülürsə və ya yenidən quraşdırılırsa, bu qovluğu da köçürün**, verilənlər bazası və `files/` qovluğu ilə birlikdə: onların heç birində bu fayllar yoxdur və bu qovluq olmadan köhnə mətnlərdəki şəkillər 404 xətası verir. Tapşırıqlara, wiki səhifələrinə və s. qoşulmuş fayllar əvvəlki kimi saxlanılır və heç bir əməliyyat tələb etmir. Bu redaktorda daxil edilən şəkillər adi qoşulmuş fayllardır. redmine_ckeditor silindikdən sonra da bu qovluq lazım qalır.
3. redmine_ckeditor artıq lazım olmadıqda onu silin.

Köhnə mətn CKEditor-un göstərdiyi kimi göstərilir: şriftlər, ölçülər, rənglər və düzləndirmə, girintilər, siyahılar, cədvəllər (haşiyələr, enlər, cədvəl başlıqları, birləşdirilmiş xanalar), şəkillər (ölçü, float, haşiyə, keçid daxilində şəkil), keçidlər, öz dili ilə kod blokları (vurğulanmış), Redmine makroları (`{{toc}}`, `{{collapse(Title) ... }}`, `{{thumbnail(...)}}` və s.), wiki və tapşırıq keçidləri, keçidə çevrilmiş sadə veb ünvanlar və yerləşdirilmiş `<iframe>` (video). CKEditor-da yazılmış mətn öz işarələməsinə görə tanınır və orada olan abzaslararası məsafəni saxlayır, bu məsafə bu redaktordakından daha genişdir.

Qəsdən edilən fərqlər:
- `<iframe>` yalnız http(s) üzərindən başqa sayta yönəldikdə göstərilir və sandbox-da işləyir: içindəki səhifə öz skriptlərini icra edə bilər, lakin Redmine səhifəsinə çıxış əldə edə, üst pəncərəni aça və ya formaları göndərə bilməz. Bütün digər `<iframe>` elementləri silinir.
- Keçidlər eyni pəncərədə açılır: keçidin `target` atributu (CKEditor-dakı "Yeni pəncərə (_blank)" seçimi) saxlanılmır.
- CKEditor-un təklif etdiyi, lakin səhifələrində səssizcə buraxılan bəzi formatlaşdırma burada göstərilir: məsələn, onun "Marker" üslublarının fon rəngləri və `<q>` elementinin dırnaq işarələri.
- CKEditor-un «Special Container» üslubu (boz çərçivəli blok) vurğulanmadan kod bloku kimi göstərilir və redaktorda da kod blokudur.

Köhnə mətn redaktorda açılıb yenidən saxlanılanda öz formatlaşdırmasını saxlayır: Redmine makroları (makro redaktorda bir boz elementdir; onu CKEditor-un Mənbə rejimində olduğu kimi `<HTML>` rejimində redaktə edin), `<iframe>`, öz üslubları ilə `<div>` və `<address>` blokları (veb səhifədən yapışdırılan `<div>` yenə də abzasa çevrilir), alt və üst indekslər, CKEditor-un sətirdaxili üslubları (iri, kiçik, klaviatura, nümunə və s.), başlıqların, cədvəllərin və cədvəl xanalarının üslubu, şəkillərin ölçüsü (eni və hündürlüyü), float xassəsi, haşiyəsi və keçidi, kod bloklarının dili. Redaktə zamanı qorunmayanlar: cədvəl başlığı onun üstündə mərkəzləşdirilmiş abzasa çevrilir, cədvəlin başlıq və altlıq bölmələri adi sətirlərə çevrilir (altlıq aşağıda qalır) və `<del>` `<s>` elementinə çevrilir (görünüşü eynidir). Bu redaktordan saxlanılan mətn bu redaktorun yığcam abzas aralığını alır.
