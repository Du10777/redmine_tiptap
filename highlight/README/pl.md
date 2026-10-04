# Wyróżnianie składni: języki

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

> *To tłumaczenie powstało przy pomocy modelu AI i nie zostało sprawdzone przez osobę, dla której polski jest językiem ojczystym. Jeśli znajdziesz błąd, [otwórz zgłoszenie (issue) lub pull request](https://github.com/Du10777/redmine_tiptap).*

Bloki kodu są wyróżniane zarówno w edytorze, jak i na zapisanych stronach (problemy, notatki, wiki), i wyglądają identycznie w obu. Język bloku jest wybierany z plakietki w jego górnym prawym rogu. Lista języków jest zdefiniowana przez pliki w folderze `highlight/`: jeden plik to jeden język.

Wtyczka jest dostarczana z 52 językami. Możesz dodać więcej: skonwertuj gotową gramatykę highlight.js za pomocą skryptu (zobacz [Dodawanie języka z highlight.js](#dodawanie-języka-z-highlightjs)) lub napisz własną.

## Jak to działa

- Wyróżnianie jest wykonywane przez [highlight.js](https://highlightjs.org) (poprzez [lowlight](https://github.com/wooorm/lowlight)). Edytor i zapisane strony używają tego samego silnika, dlatego kolory się pokrywają.
- `_compile.sh` łączy wszystkie pliki języków w jeden plik, `assets/javascripts/tiptap_highlight.js`. Ten plik jest już wbudowany w repozytorium, więc instalacja wtyczki nie wymaga budowania. Musisz go zbudować tylko wtedy, gdy zmienisz zestaw języków.
- Redmine ładuje `tiptap_highlight.js` na każdej stronie, przed edytorem (`tiptap_bundle.js`). Po załadowaniu edytor rejestruje wszystkie języki z tego pliku.
- W edytorze blok jest ponownie wyróżniany 50 ms po wstrzymaniu wpisywania i tylko zmieniły się blok. Na zapisanych stronach blok jest wyróżniany, gdy przewija się do widoku. Blok wewnątrz zwiniętej sekcji jest wyróżniany, gdy sekcja jest otwarta.
- Język jest przechowywany w zapisanym HTML: `<pre><code class="language-<id>">`. Dlatego `id` języka nigdy nie powinien się zmienić: bloki zapisane ze starym `id` stałyby się zwykłym tekstem.
- Nie ma automatycznego wykrywania języka: blok bez języka jest wyświetlany jako zwykły tekst. Podobnie blok, którego język nie jest w `highlight/` (na przykład plik języka został usunięty); jego plakietka nadal pokazuje `id`. Jeśli plik języka powróci, tak robią kolory.
- Kolory. highlight.js oznacza tekst klasami, takimi jak `hljs-keyword`, `hljs-string`, `hljs-comment`. Ich kolory są ustawione w `assets/stylesheets/src/06_code.css`, używając palety własnego wyróżniania składni Redmine.

## Plik języka

Na przykład, `routeros.js`:

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

| Pole | Wymagane | Czym jest |
|---|---|---|
| `id` | tak | Nazwa języka w zapisanym HTML (`class="language-<id>"`). Dozwolone znaki: `a-z`, `0-9`, `-`, `_`. **Nigdy go nie zmieniaj** po zapisaniu bloków z tym językiem. |
| `label` | nie | Nazwa na liście języków i plakietce bloku. Domyślnie `id`. |
| `hint` | nie | Szara notatka obok nazwy na liście. |
| `keywords` | nie | Dodatkowe słowa do wyszukiwania list, oddzielone spacją. |
| `grammar` | tak | Gramatyka highlight.js: funkcja `(hljs) => language definition`. |

`label`, `hint` i `keywords` są w angielskim. Aby wyświetlić język pod inną nazwą na interfejsie w języku interfejsu użytkownika, lub aby uczynić go wyszukiwalnym słowami tego języka, dodaj wpis do pliku tłumaczenia tego języka, `config/locales/<code>.yml`, pod `code_languages:`. Słowa tam są dodawane do `keywords`; `label` i `hint` zastępują te z pliku języka. `config/locales/ru.yml` ma przykłady, zasady znajdują się w [config/locales/README.md](../../config/locales/README.md).

Rodzaje plików w folderze:

- **Krótkie.** Odniesienie do gramatyki z pakietu npm highlight.js, jak w powyższym przykładzie; większość języków jest taka. Gramatyka pochodzi z wersji highlight.js zarejestrowanej w `package-lock.json` wtyczki.
- **Pełna kopia.** Kod gramatyki znajduje się w samym pliku i można go edytować. Te pliki są tworzone przez skrypt konwersji (patrz poniżej).
- **Własna gramatyka.** `log.js`, `journalctl.js`, `cisco-ios.js`; ich wspólne części są w `_common.js`.
- **Wrapper.** Gotowa gramatyka pod inną nazwą: `cmd.js` to `dos` z highlight.js, `docker-compose.js` to `yaml`.

Pliki i foldery, których nazwy zaczynają się od `_`, nie są językami:

- `_compile.sh` buduje języki;
- `_check.mjs` sprawdza języki podczas budowy;
- `_common.js` zawiera wspólne części własnych gramatyk wtyczki;
- `_convert_grammar.py` to skrypt, który konwertuje gramatyki highlight.js (patrz poniżej);
- `_vendor/` zawiera pliki importowane przez skonwertowane gramatyki.

Folder `README/` zawiera tę dokumentację.

## Dodawanie języka z highlight.js

Gotowe gramatyki (ponad 190) znajdują się tutaj: https://github.com/highlightjs/highlight.js/tree/main/src/languages. Ich nazwy i aliasy są wymienione w [SUPPORTED_LANGUAGES.md](https://github.com/highlightjs/highlight.js/blob/main/SUPPORTED_LANGUAGES.md), wraz z około stu gramatykami stron trzecich przechowywanymi w oddzielnych repozytoriach. Skrypt `_convert_grammar.py` w tym folderze konwertuje dowolną z nich na format wtyczki.

Skrypt wymaga Pythona 3.6+ (bez dodatkowych pakietów) i dostępu do github.com. Uruchom go z folderu wtyczki:

```sh
cd /path/to/redmine/plugins/redmine_tiptap
python3 highlight/_convert_grammar.py erlang
sh highlight/_compile.sh
```

Argument `erlang` to nazwa pliku w `src/languages` bez `.js`. Druga komenda buduje języki i je sprawdza. Następnie uruchom ponownie Redmine (patrz [Budowanie i stosowanie](#budowanie-i-stosowanie)). Na Windows użyj `py` lub `python` zamiast `python3`.

Przykłady:

```sh
# lista języków highlight.js (* = już w highlight/), opcjonalnie filtrowana słowem
python3 highlight/_convert_grammar.py --list
python3 highlight/_convert_grammar.py --list sql

# kilka języków naraz
python3 highlight/_convert_grammar.py erlang nix fsharp

# własna nazwa, wskazówka i słowa wyszukiwania (jeden język na raz)
python3 highlight/_convert_grammar.py erlang --label "Erlang/OTP" --hint BEAM --keywords "erl otp"

# zamień krótki plik dostarczany z wtyczką na edytowalną pełną kopię
python3 highlight/_convert_grammar.py routeros --force --label RouterOS --hint MikroTik --keywords mikrotik

# język nie wydany jeszcze w wersji highlight.js, z gałęzi rozwojowej
python3 highlight/_convert_grammar.py odin --ref main

# link do pliku gramatyki, bezpośrednio z paska adresu przeglądarki
python3 highlight/_convert_grammar.py https://github.com/highlightjs/highlight.js/blob/main/src/languages/odin.js

# gramatyka innej strony: link do jej repozytorium, skrypt znajduje plik gramatyki
python3 highlight/_convert_grammar.py https://github.com/highlightjs/highlightjs-terraform

# lokalny plik gramatyki
python3 highlight/_convert_grammar.py ~/grammars/mylang.js --id mylang

# krótki plik odwołujący się do pakietu npm zamiast kopii kodu
python3 highlight/_convert_grammar.py erlang --npm

# pokaż, co zostałoby zrobione bez niczego zmieniając
python3 highlight/_convert_grammar.py erlang --dry-run
```

### Co robi skrypt

1. Pobiera `src/languages/<name>.js` wersji highlight.js, na której działa wtyczka. Wersja jest odczytywana z `package-lock.json` (obecnie 11.12.0), ponieważ gramatyki są napisane dla silnika ich własnej wersji. `--ref` wybiera inną wersję, gałąź lub commit.
2. Bierze nazwę języka z linii `Language:` nagłówka gramatyki i słowa wyszukiwania z jej aliasów (`aliases`). `id` to nazwa pliku gramatyki.
3. Umieszcza kod gramatyki w `highlight/<id>.js` bez zmian, z wyjątkiem eksportu: `export default function(hljs)` staje się `function grammar(hljs)`, a obiekt języka `export default { id, label, keywords, grammar }` jest dołączany na końcu pliku. Jeśli gramatyka jest modułem CommonJS (`module.exports = ...`), linia deklarująca `module` i `exports` jest dodawana na górze.
4. Jeśli gramatyka importuje inne pliki, pobiera je do `highlight/_vendor/<source>-<version>/` zgodnie z tymi samymi ścieżkami co w repozytorium i wskazuje tam importy. Na przykład `typescript` importuje `javascript.js` i `lib/ecmascript.js`. Te pliki są współdzielone przez wszystkie języki z tego samego źródła i wersji; nie ma potrzeby ich edytowania.
5. Sprawdza linię `Requires:`, która wymienia języki używane dla wbudowanego kodu (na przykład `php-template` wymaga `xml` i `php`). Jeśli nie ma ich w `highlight/`, drukuje komendę, która je dodaje. Bez nich wbudowany kod po prostu pozostaje niezaznaczony; to nie jest błąd.
6. Nie nadpisuje istniejących plików bez `--force` i nie przyjmuje `id` już używanego przez inny plik.

Po konwersji język można edytować bezpośrednio w jego pliku.

### Opcje

| Opcja | Co robi |
|---|---|
| `LANGUAGE ...` | Nazwa języka highlight.js, link do pliku gramatyki lub repozytorium gramatyki innej firmy w serwisie GitHub, lub ścieżka do lokalnego pliku `.js`. |
| `--ref REF` | Wersja highlight.js (tag), gałąź lub commit. Domyślnie wersja w `package-lock.json`. Do linków wersja pobierana jest z linku. |
| `--id ID` | `id` języka. Domyślnie nazwa pliku gramatyki. |
| `--label TEXT` | Nazwa na liście i plakietce. Domyślnie `Language:` z gramatyki. |
| `--hint TEXT` | Szara notatka na liście. |
| `--keywords TEXT` | Słowa wyszukiwania oddzielone spacją. Domyślnie: aliasy gramatyki. |
| `--npm` | Zamiast kopii kodu, napisz krótki plik odwołujący się do pakietu npm highlight.js. Tylko dla języków highlight.js. |
| `--force` | Zamień istniejące pliki. |
| `--dry-run` | Pokaż, co zostałoby zrobione bez niczego zmieniając. |
| `--list [WORD]` | Wypisz języki highlight.js i gramatyki stron trzecich, opcjonalnie filtrowane słowem. |
| `--prune` | Usuń pliki w `_vendor/`, które żaden język już nie importuje. |


**Kopia czy `--npm`?** Kopia pokazuje zasady bezpośrednio w pliku: możesz je edytować, wziąć gramatykę nowszą niż zainstalowany pakiet, lub stronę trzecią. Kopia się nie zmienia, gdy wtyczka uaktualni highlight.js; aby ją odświeżyć, skonwertuj język ponownie z `--force`. Plik wykonany z `--npm` ma kilka linii, a jego gramatyka jest uaktualniana razem z wtyczką.

## Budowanie i stosowanie

```sh
sh highlight/_compile.sh
```

- Wymaga Docker (budowa działa w kontenerze `node:20-alpine`) lub, jeśli nie ma Docker, Node.js 18+ na tej samej maszynie. Przy pierwszym uruchomieniu skrypt instaluje pakiety npm w folderze `node_modules/` wtyczki.
- Najpierw skrypt sprawdza każdy język: buduje go osobno, ładuje, rejestruje w tym samym silniku, który działa w przeglądarce, i wyróżnia przykładowy tekst. Jeśli język jest uszkodzony (błąd w kodzie, nieprawidłowe wyrażenie regularne, `id` już użyty), skrypt pojawia się nazwą pliku i przyczyną i zatrzymuje się; poprzedni `tiptap_highlight.js` pozostaje na miejscu.
- Następnie skrypt łączy wszystkie języki w `assets/javascripts/tiptap_highlight.js`.

Po budowie uruchom ponownie Redmine: publikuje on pliki wtyczki przy starcie (patrz „Aktualizacja" w [głównym README](../../docs/README.pl.md#aktualizacja) dla poleceń). Przeglądarki pobierają nowy plik od razu, ponieważ jego URL zawiera odcisk treści.

Jeśli serwer Redmine nie ma Docker ani Node.js, buduj na dowolnej maszynie, która ma jeden z nich (kopia folderu wtyczki jest wystarczająca) i umieść wynikowy `assets/javascripts/tiptap_highlight.js` na serwerze.

## Usuwanie języka

Usuń plik języka z `highlight/`, buduj i uruchom ponownie Redmine. Zapisane bloki w tym języku pozostają takie, jakie są i są wyświetlane jako zwykły tekst. Pliki w `_vendor/`, które nie są już potrzebne, są usuwane za pomocą:

```sh
python3 highlight/_convert_grammar.py --prune
```

## Własne gramatyki i reguły edycji

- Gramatyka to funkcja, która otrzymuje obiekt `hljs` i zwraca definicję języka: które fragmenty tekstu oznaczić i jak. Przewodnik: https://highlightjs.readthedocs.io/en/latest/language-guide.html, odwołanie: https://highlightjs.readthedocs.io/en/latest/mode-reference.html. Przykłady: `log.js`, `journalctl.js`, `cisco-ios.js`.
- highlight.js łączy wyrażenia regularne wszystkich reguł języka w jedno i ignoruje ich własne flagi. Dlatego dopasowanie bez rozróżniania wielkości liter musi być zapisane (`[Ee]rror`) lub włączone dla całego języka za pomocą `case_insensitive: true`.
- Preferuj standardowe klasy tokenów (`keyword`, `string`, `number`, `comment`, `title`, `attr`, `variable`, `built_in`, `literal`, `meta`, `symbol`, `type` i tak dalej): mają już kolory. Twoja własna klasa (na przykład `scope: 'log-error'` tworzy klasę `hljs-log-error`) wymaga reguły w `assets/stylesheets/src/06_code.css` i ponownej kompilacji CSS (`assets/stylesheets/src/_build.sh`).
- Aby oferować gotową gramatykę pod inną nazwą, zrób to, co robi `cmd.js`: zadzwoń do oryginalnej gramatyki i zmień `name` i `aliases` w jej wyniku. Jeśli aliasy nie zostaną zamienione, nowy język je przejmie z oryginalnego.

## Aktualizacja wtyczki po dodaniu języków

git pozostawia twoje pliki w `highlight/` nietknięte. Ale `assets/javascripts/tiptap_highlight.js` w nowej wersji wtyczki jest zbudowany bez twoich języków, a twoja kompilacja tego pliku utrudnia `git pull`. Więc:

```sh
cd /path/to/redmine/plugins/redmine_tiptap
git checkout -- assets/javascripts/tiptap_highlight.js
git pull
sh highlight/_compile.sh
```

Pierwsza komenda odrzuca twoją kompilację, ostatnia buduje języki ponownie, w tym twoje. Następnie uruchom ponownie Redmine. Jeśli edytowałeś pliki języków dostarczane z wtyczką, git może poprosić cię o rozwiązanie konfliktów w nich.

Jeśli wtyczka została zainstalowana z archiwum, zapisz swoje pliki języków i folder `_vendor/` przed zastąpieniem folderu wtyczki, umieść je z powrotem później i buduj języki.

## Rozmiar

Wszystkie języki są łączone w jeden plik; przeglądarka pobiera go raz, a następnie bierze go z pamięci podręcznej. Obecnie jest to 226 KB dla 52 języków. Większość języków zajmuje 1–10 KB, największy to 1C (55 KB).
