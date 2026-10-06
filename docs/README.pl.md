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

> *To tłumaczenie powstało przy pomocy modelu AI i nie zostało sprawdzone przez osobę, dla której polski jest językiem ojczystym. Jeśli znajdziesz błąd, [otwórz zgłoszenie (issue) lub pull request](https://github.com/Du10777/redmine_tiptap).*

To jest edytor tekstu dla Redmine'a, oparty na TipTap https://github.com/ueberdosis/tiptap

**[Wypróbuj edytor online](https://du10777.github.io/redmine_tiptap/)**: strona demonstracyjna uruchamia edytor tej wtyczki bezpośrednio w przeglądarce, na stronie zrobionej jak formularz Redmine. Pisz i formatuj tekst, wklej obrazek, otwórz kartę „Podgląd”, aby zobaczyć, jak tekst będzie wyglądał po zapisaniu, zmień język interfejsu lub wybierz przykładowy tekst. Niczego nie trzeba instalować i nic nie jest nigdzie wysyłane.

[![Edytor na stronie demonstracyjnej](../docs/images/demo.png)](https://du10777.github.io/redmine_tiptap/)

Silnik edytora: **TipTap 3.31.4**. Wszystkie pakiety `@tiptap/*` są przypięte do tej dokładnej wersji w `package.json` i `package-lock.json` i zawsze muszą być uaktualniane razem do tej samej wersji.

**Spis treści**

- [Obsługiwane wersje Redmine](#obsługiwane-wersje-redmine)
- [Funkcje](#funkcje)
  - [Formatowanie tekstu](#formatowanie-tekstu)
  - [Listy](#listy)
  - [Tabele](#tabele)
  - [Obrazy i załączniki](#obrazy-i-załączniki)
  - [Kod](#kod)
  - [Bloki](#bloki)
  - [Edycja](#edycja)
  - [Integracja z Redmine](#integracja-z-redmine)
- [Wyróżnianie składni](#wyróżnianie-składni)
- [Język interfejsu](#język-interfejsu)
- [Instalacja](#instalacja)
- [Aktualizacja](#aktualizacja)
  - [Zainstalowana z git (zalecane)](#zainstalowana-z-git-zalecane)
  - [Zainstalowana z archiwum](#zainstalowana-z-archiwum)
  - [Po aktualizacji](#po-aktualizacji)
- [Migracja z CKEditor](#migracja-z-ckeditor)

## Obsługiwane wersje Redmine

| Redmine | Obsługa | Testowano na |
|---|---|---|
| 7.x | tak | 7.0.2 |
| 6.x | tak | 6.1.4, 6.1.5 |
| 5.x i starsze | nie | — |

Nowa wersja główna (8.x i późniejsze) jest obsługiwana dopiero po przetestowaniu na niej wtyczki. Do tego czasu Redmine w tej wersji nie uruchomi się z zainstalowaną wtyczką: zatrzyma się z błędem, który podaje obsługiwane wersje.

## Funkcje

### Formatowanie tekstu
- Pogrubienie, kursywa, podkreślenie, przekreślenie, indeks dolny i górny (Ctrl+, i Ctrl+.), kod wstawiony.
- Kolor tekstu i kolor tła: paleta 64 kolorów lub dowolna wartość szesnastkowa.
- Rodzina czcionek (13 czcionek) i rozmiar czcionki (predefiniowane wartości od 8 do 72 px lub dowolna wartość).
- Style akapitów: nagłówki 1–6 i tekst normalny.
- Wyrównanie (lewe, centrum, prawe, obustronnie) i wcięcia (do 8 poziomów) akapitów i nagłówków.
- Linki: wstawienie, edycja, usunięcie.
- Linia pozioma, cofnij i ponów.

### Listy
- Listy punktowane z znaczkami dysku, koła lub kwadratu.
- Listy numerowane: 1, 01, a, A, i, I, α.
- Listy zadań ze zdanikami; ukończone zadania są przekreślone.
- Listy zagnieżdżone (Tab / Shift+Tab).

### Tabele
- Wstawienie tabeli dowolnego rozmiaru, z nagłówkiem lub bez.
- Menu kliknięcia prawym przyciskiem w komórce: dodawanie i usuwanie wierszy i kolumn, scalanie i dzielenie komórek, wiersz nagłówka i kolumna nagłówka, usunięcie tabeli.
- Szerokości kolumn zmienia się przez przeciąganie krawędzi komórki.
- Wklejenie z Excela zachowuje szerokości kolumn, wyrównanie i rozmiary czcionek; tabela skopiowana z Redmine wklejana do Excela z obramowaniem.

### Obrazy i załączniki
- Wklejanie obrazu ze schowka: jest przesyłany jako załącznik i pojawia się w tekście.
- Obrazy dołączone polem pliku Redmine lub upuszczone na niego są również wstawiane do tekstu.
- Wstawienie obrazu z załączników (selektor miniatur) lub łącze do dowolnego załącznika.
- Zmiana rozmiaru obrazu przez przeciąganie jego rogów.

### Kod
- Bloki kodu z wyróżnianiem składni w edytorze i na zapisanych stronach: 52 języki i możliwość dodania więcej (zobacz [Wyróżnianie składni](#wyróżnianie-składni)).
- Język bloku jest wybierany z plakietki w jego rogu, z wyszukiwaniem i ostatnio oraz często używanymi językami.
- Tab i Shift+Tab wcina i zmniejsza wcięcie linii wewnątrz bloku kodu; pogrubienie, łącza i kolory wewnątrz kodu są zachowywane.

### Bloki
- Blok zwijany: tytuł z ukrytą zawartością (`<details>`). Zwinięty na zapisanych stronach, rozwinięty w edytorze.
- Cytat bloku z linią autora i daty.

### Edycja
- Tryb `<HTML>` do przeglądania i edycji źródła HTML: bloki zagnieżdżone są wcięte, pusta linia oddziela bloki zajmujące kilka linii, składnia jest kolorowana według tych samych reguł co w bloku kodu HTML, a Enter zachowuje wcięcie linii.
- Wpisywanie w stylu Markdown: `#` dla nagłówków, `-` i `1.` dla list, `[ ]` dla zadań, ```` ```python ```` dla bloku kodu (dowolna nazwa języka lub brak), `**bold**`, `---` dla linii poziomej. Standardowe skróty klawiszowe: Ctrl+B, Ctrl+I, Ctrl+U, Ctrl+Z i inne.
- Edytor nigdy nie rośnie wyżej niż okno: pasek narzędzi i przyciski formularza pozostają widoczne, a tekst przewija się wewnątrz. Wysokość zmienia się wraz z rozmiarem okna i powiększeniem strony.
- Uchwyt zmiany rozmiaru w dolnym prawym rogu ustawia wysokość ręcznie. Wysokość jest pamiętana; podwójne kliknięcie przywraca automatyczną wysokość.

### Integracja z Redmine
- Działa we wszystkich polach tekstowych Redmine z formatowaniem: opisy i notatki problemów, strony wiki, wiadomości, posty na forach, dokumenty, opisy projektów, długie pola tekstu niestandardowego, w tym pola pojawiające się na stronie później.
- Tekst jest przechowywany jako HTML. Aby korzystać z edytora, wybierz *TipTap HTML* jako formatowanie tekstu w ustawieniach Redmine.
- Interfejs (podpowiedzi, menu, okna dialogowe) podąża za językiem w profilu Redmine użytkownika. 47 z 50 języków Redmine jest dostarczane z wtyczką: angielski i rosyjski są kompletne, pozostałe 45 to szkice wykonane za pomocą modelu AI, które goście mogą poprawiać. Trzy języki pisane od prawej do lewej (arabski, hebrajski, perski) celowo nie są obsługiwane (zobacz [Język interfejsu](#język-interfejsu)).
- Pozostaje szybki na dużych tekstach: edytory w ukrytych formularzach są tworzone tylko wtedy, gdy formularz jest otwarty, a długie bloki kodu są wyróżniane, gdy przewijają się do widoku.
- Teksty napisane w CKEditor (wtyczka redmine_ckeditor) są wyświetlane tak jak były, i otwierane w edytorze z ich formatowaniem: bez konwersji, zobacz [Migracja z CKEditor](#migracja-z-ckeditor).
- Zapisane teksty są wyświetlane bez niebezpiecznego HTML: skrypty, procedury obsługi zdarzeń i linki `javascript:` są usuwane, gdy strona jest wyświetlana, zachowywane jest tylko to, co sam edytor produkuje. Dotyczy to również tekstów przychodzących przez REST API lub tryb `<HTML>`.

## Wyróżnianie składni

Bloki kodu są wyróżniane w edytorze i na zapisanych stronach. Język bloku jest wybierany z plakietki w jego górnym prawym rogu; lista ma pole wyszukiwania i pamięta ostatnio i często używane języki.

52 języki są dostarczane z wtyczką, w tym HTML, 1C, Cisco IOS, MikroTik RouterOS, Windows cmd, docker compose, dzienniki usług Linux i wyjście journalctl.

Możesz dodawać własne języki. Każdy język to jeden plik w folderze `highlight/`. Dowolna z ponad 190 gramatyk highlight.js lub gramatyka innej firmy jest konwertowana na taki plik jedną komendą:

```sh
python3 highlight/_convert_grammar.py erlang
sh highlight/_compile.sh
```

Szczegóły: [highlight/README/pl.md](../highlight/README/pl.md).

## Język interfejsu

Edytor mówi językiem wybranym w profilu Redmine użytkownika (Moje konto → Język). Pliki dla 47 z 50 języków Redmine są dostarczane z wtyczką, w `config/locales/`. Angielski to źródło, a rosyjski jest autorskim; pozostałe 45 to szkice wykonane za pomocą modelu AI i nie zostały jeszcze zweryfikowane przez rodzimych użytkowników, spodziewaj się więc dziwnej frazy tu i tam. Tekst brakujący w pliku jest wyświetlany w angielskim.

Aby poprawić tłumaczenie, zmień jego wartości w `config/locales/<code>.yml` (`de`, `fr`, `pt-BR`, ...) i uruchom ponownie Redmine. `bundle exec rake redmine_tiptap:locales` sprawdza pliki. Requesty pull z poprawkami są mile widziane.

**Języki pisane od prawej do lewej (arabski, hebrajski, perski) celowo nie są obsługiwane.** Obsługiwanie ich wymaga wielu zmian w bazie kodu, nie tylko tłumaczenia, i zdecydowaliśmy się na to nie podejmować. Dla tych języków edytor jest wyświetlany w angielskim i jego układ nie jest dostosowany. Jeśli potrzebujesz jednego z nich, zrób forka: mechanizm tłumaczenia jest gotowy, a co jeszcze musi zostać zmienione, jest wymienione w [config/locales/README.md](../config/locales/README.md#right-to-left-languages).

Szczegóły i lista języków Redmine: [config/locales/README.md](../config/locales/README.md).

## Instalacja

1. Umieść wtyczkę w folderze `plugins` Redmine. Folder musi być nazwany `redmine_tiptap`. Najprościej jest użyć git, co również ułatwia aktualizacje jedną komendą:
   ```sh
   cd /path/to/redmine
   git clone --branch release --single-branch --depth 1 https://github.com/Du10777/redmine_tiptap.git plugins/redmine_tiptap
   ```
   Gałąź `release` zawiera tylko pliki potrzebne wtyczce do działania, bez tej dokumentacji, a `--depth 1` nie pobiera historii repozytorium.
2. Uruchom ponownie Redmine.
3. W ustawieniach Redmine (redmine.selfhosted/_settings_) wybierz Formatowanie tekstu: *TipTap HTML*.

## Aktualizacja

Wtyczka nie ma migracji bazy danych, a wbudowany pakiet JavaScript i arkusz stylów są częścią repozytorium. Aktualizacja nie wymaga npm ani kompilacji na serwerze: zamień pliki wtyczki i uruchom ponownie Redmine.

Przed aktualizacją sprawdź, czy nowa wersja obsługuje twoją wersję Redmine (patrz „Obsługiwane wersje Redmine" powyżej).

### Zainstalowana z git (zalecane)

```sh
cd /path/to/redmine/plugins/redmine_tiptap
git pull
```

Następnie uruchom ponownie Redmine, na przykład:

```sh
sudo systemctl restart redmine          # Redmine uruchomiony jako usługa systemd
touch /path/to/redmine/tmp/restart.txt  # Passenger
docker compose restart redmine          # Docker
```

Aby pozostać przy określonej wersji zamiast najnowszej, pobierz commit z gałęzi `release` i przełącz się na niego: `git fetch --depth 1 origin <commit> && git checkout <commit>`.

Jeśli wtyczka została zainstalowana zwykłym `git clone` (gałąź `main`, z dokumentacją i całą historią), przejdź jednorazowo na gałąź `release`: usuń folder `plugins/redmine_tiptap` i zainstaluj wtyczkę ponownie, jak opisano w sekcji [Instalacja](#instalacja). Wtyczka nie przechowuje w swoim folderze niczego własnego, więc nic nie przepadnie; jedynie języki wyróżniania składni dodane samodzielnie trzeba najpierw skopiować z `highlight/`.

### Zainstalowana z archiwum

1. Pobierz `redmine_tiptap.zip` z najnowszego wydania: https://github.com/Du10777/redmine_tiptap/releases/latest/download/redmine_tiptap.zip. Zawiera te same pliki co gałąź `release` (wtyczka bez tej dokumentacji). Usuń stary folder `plugins/redmine_tiptap` i rozpakuj archiwum w jego miejscu; folder w środku nazywa się już `redmine_tiptap`. Wcześniejsze usunięcie gwarantuje, że nie zostaną pliki, których nowa wersja już nie ma.
2. Usuń `public/assets/.manifest.json` w folderze Redmine.
3. Uruchom ponownie Redmine.

Krok 2 jest ważny. Przy starcie Redmine ponownie publikuje zasoby wtyczki tylko wtedy, gdy ich pliki są nowsze niż ten manifest. Pliki rozpakowane z archiwum zachowują oryginalne sygnatury czasowe, więc bez kroku 2 Redmine może nadal obsługiwać stary edytor. Manifest jest automatycznie ponownie tworzony przy starcie. W przypadku `git pull` ten krok nie jest potrzebny: git daje zmienionym plikom bieżący czas.

### Po aktualizacji

- Skrypt i arkusz stylów edytora są obsługiwane za pomocą odcisku palca treści w ich adresach URL, więc przeglądarki ładują nową wersję tuż po restarcie. Użytkownicy nie muszą czyszczić pamięci podręcznej przeglądarki.
- Jeśli *Buforuj sformatowany tekst* jest włączony w ustawieniach Redmine (Administracja → Ustawienia → Ogólne), wyczyść pamięć podręczną Redmine raz po aktualizacji do wersji, która zmienia sposób wyświetlania tekstów (czyszczenie HTML, obsługa tekstów CKEditor): `bundle exec rake tmp:cache:clear RAILS_ENV=production` w folderze Redmine. W przeciwnym razie strony renderowane przed aktualizacją mogą być wyświetlane z pamięci podręcznej, niezaśmiecone, do czasu zmiany ich tekstu.
- Wcześniejsze wersje wtyczki skopiowały skrypt do `public/tiptap_bundle.js`. Te pliki nie są już używane i mogą być usunięte:
  ```sh
  rm -f /path/to/redmine/public/tiptap_bundle.js /path/to/redmine/public/tiptap_bundle.js.map
  ```

## Migracja z CKEditor

Jeśli twój Redmine używał [redmine_ckeditor](https://github.com/a-ono/redmine_ckeditor), możesz przełączyć się na tę wtyczkę i zachować każdy napisany tekst: problemy, notatki, strony wiki, wiadomości, posty, dokumenty. Nic nie jest konwertowane, a baza danych nie jest dotykana. CKEditor przechowuje swoje teksty jako HTML, a ta wtyczka również, więc przechowywany tekst jest po prostu wyświetlany przez nowy formatter.

1. Zainstaluj wtyczkę (patrz wyżej) i wybierz Formatowanie tekstu: *TipTap HTML*.
2. Zachowaj folder `public/system/rich/` twojego Redmine. Jeśli ludzie wstawiali obrazy i pliki za pomocą przeglądarki obrazów CKEditor, są one przechowywane tam, a nie w bazie danych ani wśród załączników, a teksty odwołują się do nich przez adres (`/system/rich/...`). **Jeśli Redmine zostanie przeniesiony na inny serwer lub zainstalowany od nowa, przenieś też ten folder**, razem z bazą danych i folderem `files/`: żadne z nich nie zawiera tych plików, a bez tego folderu obrazy w starych tekstach będą zwracać błąd 404. Załączniki problemów, stron wiki itp. są przechowywane jak poprzednio i nic nie wymagają. Obrazy wstawione w tym edytorze są zwykłymi załącznikami. Folder pozostaje potrzebny także po usunięciu redmine_ckeditor.
3. Usuń redmine_ckeditor, gdy go już nie potrzebujesz.

Stary tekst jest wyświetlany w taki sposób, jaki pokazał CKEditor: czcionki, rozmiary, kolory i wyrównanie, wcięcia, listy, tabele (obramowania, szerokości, napisy, scalone komórki), obrazy (rozmiar, przepływ, obramowanie, obraz wewnątrz łącza), łącza, bloki kodu z ich językiem (wyróżnione), makra Redmine (`{{toc}}`, `{{collapse(Title) ... }}`, `{{thumbnail(...)}}` itp.), linki wiki i problemy, zwykłe adresy internetowe uczyniające je klikalnym, a wbudowane `<iframe>` (wideo). Tekst napisany w CKEditor jest rozpoznawany po jego znacznikach i zachowuje rozstaw między akapitami, które miał tam, który jest szerszy niż w tym edytorze.

Różnice celowe:
- `<iframe>` jest wyświetlany tylko wtedy, gdy wskazuje na inną witrynę poprzez http(s), i jest w piaskownicy: strona wewnątrz może uruchamiać swoje własne skrypty, ale nie może uzyskać dostępu do strony Redmine, otworzyć górnego okna lub przesłać formularze. Wszystkie inne `<iframe>` są usuwane.
- Linki otwierają się w tym samym oknie: atrybut `target` łącza (CKEditor „Nowe okno (_blank)") nie jest zachowywany.
- Niektóre formatowanie, które oferował CKEditor, ale jego strony po cichu odrzuciły, jest tutaj wyświetlane: na przykład kolory tła jego stylów „Marker" i cudzysłowy `<q>`.
- Styl „Special Container” z CKEditor (blok z szarą ramką) jest wyświetlany jako blok kodu bez wyróżniania składni, a w edytorze również jest blokiem kodu.

Stary tekst zachowuje swoje formatowanie, gdy jest otwarty w edytorze i ponownie zapisany: makra Redmine (makro to jeden szary element w edytorze; edytuj go w trybie `<HTML>`, jak w trybie Źródło CKEditor), `<iframe>`, bloki `<div>` i `<address>` z ich stylem (`<div>` wklejony ze strony internetowej nadal jest zamieniany na akapit), indeks dolny i górny, wbudowane style CKEditor (duży, mały, klawiatura, próbka itp.), styl nagłówków, tabel i komórek tabeli, rozmiar (szerokość i wysokość), przepływ, obramowanie i łącze obrazów, język bloków kodu. Co nie przetrwa edycji: napis tabeli staje się wyśrodkowanym akapitem powyżej niego, sekcje nagłówka i stopki tabeli stają się zwykłymi wierszami (stopka pozostaje na dole) i `<del>` staje się `<s>` (ten sam wygląd). Tekst zapisany z tego edytora otrzymuje kompaktowy odstęp akapitu tego edytora.
