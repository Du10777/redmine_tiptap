# Söz sözünə vurğulanma: dillər

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

> *Bu tərcümə süni intellekt modelinin köməyi ilə hazırlanıb və ana dili daşıyıcısı tərəfindən yoxlanılmayıb. Səhv tapsanız, lütfən, [issue və ya pull request açın](https://github.com/Du10777/redmine_tiptap).*

Kod blokları redaktorda və saxlanılan səhifələrdə (tapşırıqlar, qeydlər, wiki) bərabər şəkildə vurğulanır və hər iki yerdə eyni görünür. Bir blokunun dili onun sağ üst köşəsindəki əbülhavadan seçilir. Dillərin siyahısı `highlight/` qovluğundakı fayllar tərəfindən müəyyən edilir: bir fayl bir dildir.

Plaqin 52 dil ilə gəlir. Daha çoxunu əlavə edə bilərsiniz: hazır highlight.js qrammatikasını skript ilə çevirin ([Adding a language from highlight.js](#highlightjs-dən-dil-əlavə-etmə)) və ya öz dili yazın.

## Necə işləyir

- Vurğulanma [highlight.js](https://highlightjs.org) tərəfindən edilir ([lowlight](https://github.com/wooorm/lowlight) vasitəsilə). Redaktor və saxlanılan səhifələr eyni mühərriki istifadə edir, buna görə də rənglər uyğun gəlir.
- `_compile.sh` bütün dil fayllarını bir fayla, `assets/javascripts/tiptap_highlight.js` quzuşturur. Bu fayl depo işçisində artıq qurulu vəziyyətdə olur, buna görə plaqini qurğu heç bir qurulma tələb etmir. Dil toplusunu dəyiştirdiyiniz halda yalnız qurmanız lazımdır.
- Redmine hər səhifədə `tiptap_highlight.js` yükləyir, redaktordan (`tiptap_bundle.js`) əvvəl. Yüklənmə zamanı redaktor həmin fayldan bütün dilləri qeydiyyata alır.
- Redaktorda blok siz yazmağı dayandırdıqdan sonra 50 ms-də yenidən vurğulanır və yalnız dəyişən blok. Saxlanılan səhifələrdə blok baxış alanına girəndə vurğulanır. Açılan bölmə içində blok bölmə açıldıqda vurğulanır.
- Dil saxlanılan HTML-də saxlanılır: `<pre><code class="language-<id>">`. Başqa bir səbəbi bir dilin `id`-nin heç vaxt dəyişməməsidir: köhnə `id` ilə saxlanmış bloklar sade mətnə çevrilər.
- Dil avtomatik aşkarlanması yoxdur: dili olmayan blok sade mətn olaraq göstərilir. Dili `highlight/` qovluğunda olmayan blok da belədir (məsələn, dil faylı silindi); onun əbülhavası `id`-ni göstərməyə davam edir. Dil faylı geri qayıdığında, rənglər də qayıdır.
- Rənglər. highlight.js mətnləri `hljs-keyword`, `hljs-string`, `hljs-comment` kimi siniflər ilə işarələyir. Onların rəngləri `assets/stylesheets/src/06_code.css` faylında qurulur, Redmine-nin özünün söz sözünə vurğulanma paletini istifadə edərək.

## Dil faylı

Məsələn, `routeros.js`:

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

| Sahə | Lazım | Nədir |
|---|---|---|
| `id` | bəli | Dil adı saxlanılan HTML-də (`class="language-<id>"`). İcazə verilən simvollar: `a-z`, `0-9`, `-`, `_`. **Bloklar bu dillə saxlandıqdan sonra heç vaxt dəyişməyin.** |
| `label` | yox | Dil siyahısında və blok əbülhavasında ad. `id` ilə əsas tutulur. |
| `hint` | yox | Siyahı daxilində ad yanında boz qeyd. |
| `keywords` | yox | Siyahı axtarışı üçün əlavə sözlər, boşluqla ayrılmış. |
| `grammar` | bəli | highlight.js qrammatikası: funksiyan `(hljs) => language definition`. |

`label`, `hint` və `keywords` İngilizcədir. İstifadəçinin intrefeys dilində dil üzrə başqa bir ad göstərmək və ya onu həmin dilin sözləri ilə axtarış etmək üçün, həmin dilin tərcümə faylında, `config/locales/<code>.yml` faylında `code_languages:` altında giriş əlavə edin. Orada olan sözlər `keywords` siyahısına əlavə olunur; `label` və `hint` dil faylından olanları əvəz edir. `config/locales/ru.yml` nümunələr var, qaydalar [config/locales/README.md](../../config/locales/README.md) içində qeyd olunub.

Qovluq daxilində fayl növləri:

- **Qısa.** highlight.js npm paketindən qrammatikaya istinad, yuxarıda olan misalda olduğu kimi; ən çox dil belədir. Qrammatika plaqinin `package-lock.json` faylında qeyd olunan highlight.js versiyasından gəlir.
- **Tam surəti.** Qrammatika kodu faylın daxilindədir və redaksiya oluna bilər. Bu fayllar konvertasiya skripti tərəfindən yaradılır (aşağıya baxın).
- **Öz qrammatikası.** `log.js`, `journalctl.js`, `cisco-ios.js`; onların ortaq hissələri `_common.js` qovluğunda.
- **Sargı.** Başqa ad altında hazır qrammatika: `cmd.js` highlight.js-dən `dos`, `docker-compose.js` `yaml`.

`_` ilə başlayan ad ilə fayllar və qovluqlar dil deyildir:

- `_compile.sh` dilləri qurur;
- `_check.mjs` qurulma zamanı dilləri yoxlayır;
- `_common.js` plaqinin öz qrammatikalarının ortaq hissələrini saxlayır;
- `_convert_grammar.py` highlight.js qrammatikalrını çevirən skriptdir (aşağıya baxın);
- `_vendor/` çevrilən qrammatikalar tərəfindən idxal olunan faylları saxlayır.

`README/` qovluğu bu sənədləri saxlayır.

## highlight.js-dən dil əlavə etmə

Hazır qrammatikalar (190-dən çox) burada: https://github.com/highlightjs/highlight.js/tree/main/src/languages. Onların adları və aliasları [SUPPORTED_LANGUAGES.md](https://github.com/highlightjs/highlight.js/blob/main/SUPPORTED_LANGUAGES.md) faylında siyahılanmışdır, ayrı depolarda saxlanılan yüz-başlı üçüncü tərəf qrammatikalrı ilə birlikdə. Bu qovluqdakı `_convert_grammar.py` skripti onlardan istənilənini plaqin formatına çevirir.

Skript Python 3.6+ (əlavə paketlər olmadan) və github.com-a daxil olmağa ehtiyac duyur. Plaqin qovluğundan işə salın:

```sh
cd /path/to/redmine/plugins/redmine_tiptap
python3 highlight/_convert_grammar.py erlang
sh highlight/_compile.sh
```

Arqument `erlang` `src/languages` qovluğundakı fayl adı, `.js` olmadan. İkinci əmr dilləri qurur və yoxlayır. Sonra Redmine-ni yenidən başlatın ([Building and applying](#qurulma-və-tətbiq) bölməsinə baxın). Windows-da `python3` əvəzinə `py` və ya `python` istifadə edin.

Nümunələr:

```sh
# highlight.js dilləri siyahısı (* = highlight/ qovluğunda artıq var), sözlə süzülə bilər
python3 highlight/_convert_grammar.py --list
python3 highlight/_convert_grammar.py --list sql

# bir neçə dil birdən
python3 highlight/_convert_grammar.py erlang nix fsharp

# öz adı, qeydi və axtarış sözləri (bir anda bir dil)
python3 highlight/_convert_grammar.py erlang --label "Erlang/OTP" --hint BEAM --keywords "erl otp"

# plaqin ilə yayımlanan qısa fayl redaksiya edilə biləcək tam surətlə əvəz etmə
python3 highlight/_convert_grammar.py routeros --force --label RouterOS --hint MikroTik --keywords mikrotik

# hələ yayımlanmış highlight.js versiyasında olmayan dil, inkişaf qolu-vac
python3 highlight/_convert_grammar.py odin --ref main

# brauzerin ünvan çubuğundan birbaşa qrammatika fayl keçidi
python3 highlight/_convert_grammar.py https://github.com/highlightjs/highlight.js/blob/main/src/languages/odin.js

# üçüncü tərəf qrammatikası: onun deposuna keçid, skript qrammatika fayl tapır
python3 highlight/_convert_grammar.py https://github.com/highlightjs/highlightjs-terraform

# lokal qrammatika faylı
python3 highlight/_convert_grammar.py ~/grammars/mylang.js --id mylang

# surəti yerinə npm paketinə istinad edən qısa fayl yazma
python3 highlight/_convert_grammar.py erlang --npm

# dəyişiklik olmadan nə ediləcəyini göstərərək heç nə dəyişməz
python3 highlight/_convert_grammar.py erlang --dry-run
```

### Skript nə edir

1. Plaqinin işlətdiyi highlight.js versiyasının `src/languages/<name>.js` yükləyir. Versiya `package-lock.json` faylından oxunur (hazırda 11.12.0), çünki qrammatikalar öz versiyasının mühərriki üçün yazılmışdır. `--ref` başqa versiya, qol və ya commit seçir.
2. Dil adı qrammatika başlığının `Language:` sətrindən və axtarış sözləri onun aliaslarından (`aliases`) alınır. `id` qrammatika fayl adıdır.
3. Qrammatika kodu `highlight/<id>.js` qovluğuna dəyişməz şəkildə qoyulur, ixracat istisna ilə: `export default function(hljs)` `function grammar(hljs)` olur və dil ob-jekti `export default { id, label, keywords, grammar }` faylın sonunda əlavə olunur. Qrammatika CommonJS modulu olarsa (`module.exports = ...`), başlanğıcda `module` və `exports` bəyan edən sətir əlavə olunur.
4. Qrammatika digər faylları idxal edirsə, onları `highlight/_vendor/<source>-<version>/` qovluğuna depodakı eyni yollarla yükləyir və idxalları oraya işarə edir. Məsələn, `typescript` `javascript.js` və `lib/ecmascript.js` idxal edir. Bu fayllar eyni mənbə və versiyadan bütün dillərdə ortaqlaşılır; onları redaksiya etməyə ehtiyac yoxdur.
5. `Requires:` sətrini yoxlayır, o, yerləşdirilmiş kod üçün istifadə olunan dilləri siyahıya alır (məsələn, `php-template` `xml` və `php` lazımdır). Əgər `highlight/` qovluğunda yoxdur, onları əlavə edən əmri çıxarır. Onlarsız yerləşdirilmiş kod sadəcə vurğulanan qalır; bu xəta deyil.
6. Mövcud faylları `--force` olmadan əvəz etmir və başqa fayl tərəfindən istifadə olunan `id` almır.

Konvertasiyadan sonra dil onun faylında redaksiya oluna bilər.

### Seçənəklər

| Seçənək | Nə edir |
|---|---|
| `LANGUAGE ...` | highlight.js dil adı, qrammatika fayl keçidi və ya GitHub-da üçüncü tərəf qrammatika deposu keçidi, və ya lokal `.js` fayl yolu. |
| `--ref REF` | highlight.js versiyası (teq), qol və ya commit. `package-lock.json` faylındakı versiya ilə əsas tutulur. Keçidlər üçün versiya keçiddən alınır. |
| `--id ID` | Dil `id`-ni. Qrammatika fayl adı ilə əsas tutulur. |
| `--label TEXT` | Siyahıda və əbülhavalada ad. Qrammatikadan `Language:` ilə əsas tutulur. |
| `--hint TEXT` | Siyahıda boz qeyd. |
| `--keywords TEXT` | Boşluqla ayrılmış axtarış sözləri. Əsas: qrammatika aliasları. |
| `--npm` | Kod suretı əvəzinə highlight.js npm paketinə istinad edən qısa fayl yazma. Yalnız highlight.js-in dilləri üçün. |
| `--force` | Mövcud faylları əvəz etmə. |
| `--dry-run` | Heç nə dəyişməz göstərərək nə ediləcəyini göstərmə. |
| `--list [WORD]` | highlight.js dilləri və üçüncü tərəf qrammatikalrını siyahıya alırma, sözlə süzülə bilər. |
| `--prune` | `_vendor/` qovluğundakı heç bir dil tərəfindən artıq idxal olunmayan faylları silmə. |


**Surət və ya `--npm`?** Surət qaydaları faylın daxilində göstərir: onları redaksiya edə bilərsiniz, qurulmuş paketdən daha yeni qrammatika və ya üçüncü tərəf olanı ala bilərsiniz. Surət plaqin highlight.js yükslədikdə dəyişmir; onu yeniləmə üçün dili `--force` ilə yenidən çevirin. `--npm` ilə yazılan fayl bir neçə sətir uzunluğunda, onun qrammatikası plaqin ilə birlikdə yüksəldilir.

## Qurulma və tətbiq

```sh
sh highlight/_compile.sh
```

- Docker (qurulma `node:20-alpine` konteyner daxilində işləyir) və ya, Docker yoxdur, eyni maşında Node.js 18+ lazımdır. İlk işə salış zamanı skript npm paketlərini plaqinin `node_modules/` qovluğuna quraşdırır.
- Əvvəlcə skript hər dili yoxlayır: ayrı qurur, yükləyir, brauzerdə işləyən eyni mühərrikdə qeydiyyata alır və nümunə mətnini vurğulayır. Dil qırılmışsa (koddakı xəta, etibarsız müntəzəm ifadə, artıq istifadə olunan `id`), skript faylı və səbəbi adlandırır və dayanır; əvvəlki `tiptap_highlight.js` yərində qalır.
- Sonra skript bütün dilləri `assets/javascripts/tiptap_highlight.js` qovluğuna quşturur.

Qurulma-dan sonra Redmine-ni yenidən başlatın: o plaqin fayllarını başlanğıcda yayımlayır ([Əsas README](../../docs/README.az.md#yeniləmə) faylında "Yəniləmə" üçün əmrləri baxın). Brauzerlər faylı dərhal alır, çünki onun URL-də məzmun barmağı var.

Redmine serveri Docker-ə, nə də Node.js-ə malik deyilsə, onlardan birinə malik olduğu istənilən maşında qurulma (plaqin qovluğu surəti kifayətdir) və nəticə `assets/javascripts/tiptap_highlight.js` servere qoyulur.

## Dilin çıxarılması

Dil faylı `highlight/` qovluğundan silin, qurun və Redmine-ni yenidən başlatın. Saxlanılan bloklar bu dildə olduğu kimi qalır və sade mətn olaraq göstərilir. `_vendor/` qovluğundakı artıq lazım olmayan fayllar belə silinir:

```sh
python3 highlight/_convert_grammar.py --prune
```

## Öz qrammatikalrı və redaksiya qaydaları

- Qrammatika `hljs` ob-jektini qəbul edən və dil tərifi qaytaran funksiyadır: mətinin hansı hissələrini işarələmək və necə. Bələdçi: https://highlightjs.readthedocs.io/en/latest/language-guide.html, istinad: https://highlightjs.readthedocs.io/en/latest/mode-reference.html. Nümunələr: `log.js`, `journalctl.js`, `cisco-ios.js`.
- highlight.js bütün dilin bütün qaydalarının müntəzəm ifadələrini birində qoşur və onların öz bayraqlarını yoksayır. Beləliklə, böyük-kiçik hərf fərqi etməyən uyğunluq yazılı olmalıdır (`[Ee]rror`) və ya bütün dil üçün `case_insensitive: true` ilə aktivləşdirilməlidir.
- Standart token siniflərini tercih edin (`keyword`, `string`, `number`, `comment`, `title`, `attr`, `variable`, `built_in`, `literal`, `meta`, `symbol`, `type` və s.): onlar artıq rəngə malikdir. Öz sinifiniz (məsələn, `scope: 'log-error'` `hljs-log-error` sinfi təşkil edir) `assets/stylesheets/src/06_code.css` faylında qaydaya və CSS yenidən qurulmasına (`assets/stylesheets/src/_build.sh`) ehtiyac duyur.
- Hazır qrammatikanı başqa ad altında təklif etmə üçün, `cmd.js` necə edirsə elə edin: orijinal qrammatikanı çağırın və onun nəticəsində `name` və `aliases` dəyişdirin. Aliaslar əvəz olunmazsa, yeni dil onları orijinaldan götürür.

## Dil əlavə etdikdən sonra plaqini yəniləmə

git sizin `highlight/` qovluğu fayllarınızı tərk edir. Lakin yeni plaqin versiyasında `assets/javascripts/tiptap_highlight.js` sizin dilləriniz olmadan qurulmuş, sizin bu faylın qurulması `git pull`-un yolunda turur. Beləliklə:

```sh
cd /path/to/redmine/plugins/redmine_tiptap
git checkout -- assets/javascripts/tiptap_highlight.js
git pull
sh highlight/_compile.sh
```

İlk əmr sizin qurulmanı atsır, sonuncu əmr dilləri yenidən qurur, sizin dilləriniz daxil olmaqla. Sonra Redmine-ni yenidən başlatın. Plaqin ilə yayımlanan dil fayllarını redaksiya etmisinizsə, git sizin onları həll etməyi tələb edə bilər.

Plaqin arxivdən qurulmuşsa, dil fayllarınızı və `_vendor/` qovluğunu plaqin qovluğunu əvəz etməzdən əvvəl saxlayın, daha sonra onları geri qoyun və dilləri qurun.

## Ölçü

Bütün dillər bir faylda quşturulur; brauzer onu bir dəfə yükləyir və sonra keşdən götürür. Hazırda 52 dil üçün 226 KB. Ən çox dil 1–10 KB, ən böyüyü 1C (55 KB).
