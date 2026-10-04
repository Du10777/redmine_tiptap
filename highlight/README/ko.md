# 구문 강조: 언어

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

> *이 번역은 AI 모델의 도움으로 작성되었으며, 모국어 사용자의 검토를 거치지 않았습니다. 오류를 발견하면 [issue 또는 pull request](https://github.com/Du10777/redmine_tiptap)를 열어주세요.*

코드 블록은 에디터와 저장된 페이지(일감, 댓글, 위키)에서 모두 강조 표시되고 둘 다 동일하게 보입니다. 블록의 언어는 오른쪽 위 모서리의 배지에서 선택됩니다. 언어 목록은 `highlight/` 폴더의 파일로 정의됩니다. 한 파일은 한 언어입니다.

플러그인에는 52개 언어가 포함되어 있습니다. 더 추가할 수 있습니다. ready-made highlight.js 문법을 스크립트로 변환([highlight.js에서 언어 추가](#highlightjs에서-언어-추가) 참조) 하거나 자신의 것을 작성하세요.

## 작동 방식

- 강조 표시는 [highlight.js](https://highlightjs.org)([lowlight](https://github.com/wooorm/lowlight) 통해)에서 수행됩니다. 에디터와 저장된 페이지는 동일한 엔진을 사용하므로 색상이 일치합니다.
- `_compile.sh`는 모든 언어 파일을 한 파일(`assets/javascripts/tiptap_highlight.js`)로 번들합니다. 이 파일은 리포지토리에 이미 빌드된 상태로 커밋되므로 플러그인 설치에는 빌드가 필요하지 않습니다. 언어 세트를 변경할 때만 빌드하면 됩니다.
- Redmine은 모든 페이지에서 `tiptap_highlight.js`를 에디터(`tiptap_bundle.js`)보다 먼저 로드합니다. 로드 시 에디터는 해당 파일의 모든 언어를 등록합니다.
- 에디터에서는 입력을 멈춘 후 50ms 내에 블록을 다시 강조 표시하며, 변경된 블록만 해당합니다. 저장된 페이지에서 블록은 표시 영역으로 스크롤될 때 강조 표시됩니다. 축소된 섹션 내의 블록은 섹션을 열 때 강조 표시됩니다.
- 언어는 저장된 HTML에 저장됩니다. `<pre><code class="language-<id>">`. 그 이유는 언어의 `id`가 절대로 변경되어서는 안 되기 때문입니다. 오래된 `id`로 저장된 블록은 일반 텍스트로 변환됩니다.
- 언어 자동 감지는 없습니다. 언어가 없는 블록은 일반 텍스트로 표시됩니다. `highlight/`에 없는 언어의 블록도 마찬가지입니다(예를 들어 언어 파일이 삭제됨). 해당 배지는 `id`를 계속 표시합니다. 언어 파일이 돌아오면 색상도 돌아옵니다.
- 색상. highlight.js는 `hljs-keyword`, `hljs-string`, `hljs-comment` 같은 클래스로 텍스트를 표시합니다. 색상은 `assets/stylesheets/src/06_code.css`에서 Redmine 자체의 구문 강조 팔레트를 사용하여 설정됩니다.

## 언어 파일

예를 들어, `routeros.js`:

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

| 필드 | 필수 | 내용 |
|---|---|---|
| `id` | yes | 저장된 HTML의 언어 이름(`class="language-<id>"`). 허용된 문자: `a-z`, `0-9`, `-`, `_`. **일단 이 언어의 블록이 저장되면 변경하지 마세요.** |
| `label` | no | 언어 목록 및 블록 배지의 이름. 기본값은 `id`. |
| `hint` | no | 목록에서 이름 옆의 회색 메모. |
| `keywords` | no | 목록 검색을 위한 추가 단어, 공백으로 구분. |
| `grammar` | yes | highlight.js 문법: 함수 `(hljs) => language definition`. |

`label`, `hint`, `keywords`는 영어입니다. 사용자의 인터페이스 언어에서 언어를 다른 이름으로 표시하거나 해당 언어의 단어로 검색할 수 있도록 하려면, 해당 언어의 번역 파일 `config/locales/<code>.yml`에 `code_languages:` 아래에 항목을 추가하세요. 거기의 단어는 `keywords`에 추가됩니다. `label`과 `hint`는 언어 파일의 것을 대체합니다. `config/locales/ru.yml`에는 예시가 있고, 규칙은 [config/locales/README.md](../../config/locales/README.md)에 있습니다.

폴더의 파일 종류:

- **짧음.** highlight.js npm 패키지의 문법에 대한 참조, 위의 예제처럼. 대부분의 언어는 이와 같습니다. 문법은 플러그인의 `package-lock.json`에 기록된 highlight.js 버전에서 나옵니다.
- **전체 사본.** 문법 코드가 파일 자체에 있고 편집할 수 있습니다. 이 파일들은 변환 스크립트(아래 참조)에서 생성됩니다.
- **자신의 문법.** `log.js`, `journalctl.js`, `cisco-ios.js`. 공유된 부분은 `_common.js`에 있습니다.
- **래퍼.** 다른 이름으로 ready 문법: `cmd.js`는 highlight.js의 `dos`, `docker-compose.js`는 `yaml`.

이름이 `_`로 시작하는 파일과 폴더는 언어가 아닙니다.

- `_compile.sh`는 언어를 빌드합니다.
- `_check.mjs`는 빌드 중에 언어를 확인합니다.
- `_common.js`는 플러그인 자체 문법의 공유된 부분을 포함합니다.
- `_convert_grammar.py`는 highlight.js 문법을 변환하는 스크립트입니다(아래 참조).
- `_vendor/`는 변환된 문법으로 가져온 파일을 포함합니다(변환 스크립트로 생성).

`README/` 폴더는 이 설명서를 포함합니다.

## highlight.js에서 언어 추가

Ready 문법(190개 이상)은 여기: https://github.com/highlightjs/highlight.js/tree/main/src/languages. 이름과 별칭은 [SUPPORTED_LANGUAGES.md](https://github.com/highlightjs/highlight.js/blob/main/SUPPORTED_LANGUAGES.md)에 나열되어 있으며, 별도의 리포지토리에 보관된 약 백 개의 써드파티 문법과 함께. 이 폴더의 스크립트 `_convert_grammar.py`는 그 중 어느 것을 플러그인 형식으로 변환합니다.

스크립트에는 Python 3.6+(추가 패키지 없음)과 github.com에 대한 접근이 필요합니다. 플러그인 폴더에서 실행하세요:

```sh
cd /path/to/redmine/plugins/redmine_tiptap
python3 highlight/_convert_grammar.py erlang
sh highlight/_compile.sh
```

인수 `erlang`은 `.js` 없이 `src/languages`의 파일 이름입니다. 두 번째 명령은 언어를 빌드하고 확인합니다. 그 다음 Redmine을 다시 시작하세요([빌드 및 적용](#빌드-및-적용) 참조). Windows에서는 `python3` 대신 `py` 또는 `python`을 사용하세요.

예시:

```sh
# highlight.js 언어 목록 (* = 이미 highlight/에 있음), 선택적으로 단어로 필터링됨
python3 highlight/_convert_grammar.py --list
python3 highlight/_convert_grammar.py --list sql

# 여러 언어를 한 번에
python3 highlight/_convert_grammar.py erlang nix fsharp

# 자신의 이름, 힌트, 검색 단어 (한 번에 한 언어)
python3 highlight/_convert_grammar.py erlang --label "Erlang/OTP" --hint BEAM --keywords "erl otp"

# 플러그인과 함께 제공되는 짧은 파일을 편집 가능한 전체 사본으로 바꾸기
python3 highlight/_convert_grammar.py routeros --force --label RouterOS --hint MikroTik --keywords mikrotik

# 아직 릴리스된 highlight.js 버전이 아닌, 개발 브랜치의 언어
python3 highlight/_convert_grammar.py odin --ref main

# 브라우저 주소 표시줄의 문법 파일 링크
python3 highlight/_convert_grammar.py https://github.com/highlightjs/highlight.js/blob/main/src/languages/odin.js

# 써드파티 문법: 해당 리포지토리 링크, 스크립트는 문법 파일을 찾습니다.
python3 highlight/_convert_grammar.py https://github.com/highlightjs/highlightjs-terraform

# 로컬 문법 파일
python3 highlight/_convert_grammar.py ~/grammars/mylang.js --id mylang

# npm 패키지 복사 대신 참조하는 짧은 파일
python3 highlight/_convert_grammar.py erlang --npm

# 변경 없이 어떻게 될지 보여주기
python3 highlight/_convert_grammar.py erlang --dry-run
```

### 스크립트가 수행하는 작업

1. 플러그인이 실행되는 highlight.js 버전의 `src/languages/<name>.js`를 다운로드합니다. 버전은 `package-lock.json`에서 읽습니다(현재 11.12.0). 문법은 자신의 엔진 버전용으로 작성되었기 때문입니다. `--ref`는 다른 버전, 브랜치 또는 커밋을 선택합니다.
2. 문법 헤더의 `Language:` 줄에서 언어 이름을 취하고 별칭(`aliases`)에서 검색 단어를 취합니다. `id`는 문법 파일 이름입니다.
3. 문법 코드를 `highlight/<id>.js`에 넣습니다. export를 제외하고는 변경 없음: `export default function(hljs)`는 `function grammar(hljs)`가 되고, 언어 객체 `export default { id, label, keywords, grammar }`가 파일 끝에 추가됩니다. 문법이 CommonJS 모듈(`module.exports = ...`)인 경우, 맨 위에 `module` 및 `exports`를 선언하는 줄이 추가됩니다.
4. 문법이 다른 파일을 가져오는 경우, `highlight/_vendor/<source>-<version>/` 아래의 리포지토리와 동일한 경로로 다운로드하고 그곳으로 가져오기를 가리킵니다. 예를 들어, `typescript`는 `javascript.js`와 `lib/ecmascript.js`를 가져옵니다. 이 파일들은 동일한 소스와 버전의 모든 언어에서 공유됩니다. 편집할 필요가 없습니다.
5. `Requires:` 줄을 확인하며, 이는 임베드된 코드에 사용되는 언어를 나열합니다(예를 들어, `php-template`는 `xml`과 `php`가 필요함). 그들이 `highlight/`에 없으면, 추가하는 명령을 인쇄합니다. 없으면 임베드된 코드는 단순히 색상이 없는 상태로 유지됩니다. 이것은 오류가 아닙니다.
6. `--force` 없이 기존 파일을 덮어쓰지 않고 다른 파일에서 이미 사용되는 `id`를 취하지 않습니다.

변환 후, 언어를 파일에서 직접 편집할 수 있습니다.

### 옵션

| 옵션 | 작업 |
|---|---|
| `LANGUAGE ...` | highlight.js 언어 이름, GitHub의 문법 파일 또는 써드파티 문법 리포지토리 링크, 또는 로컬 `.js` 파일 경로. |
| `--ref REF` | highlight.js 버전(태그), 브랜치 또는 커밋. 기본값은 `package-lock.json`의 버전. 링크의 경우 버전은 링크에서 가져옵니다. |
| `--id ID` | 언어 `id`. 기본값은 문법 파일 이름. |
| `--label TEXT` | 목록 및 배지의 이름. 기본값은 문법의 `Language:`. |
| `--hint TEXT` | 목록의 회색 메모. |
| `--keywords TEXT` | 공백으로 구분된 검색 단어. 기본값: 문법 별칭. |
| `--npm` | 코드 사본이 아닌, highlight.js npm 패키지를 참조하는 짧은 파일을 작성합니다. highlight.js 자체의 언어에만. |
| `--force` | 기존 파일을 바꾸기. |
| `--dry-run` | 변경하지 않고 어떻게 될지 보여주기. |
| `--list [WORD]` | highlight.js 언어 및 써드파티 문법을 나열하며, 선택적으로 단어로 필터링. |
| `--prune` | `_vendor/`의 파일 중 어떤 언어도 더 이상 가져오지 않는 파일 삭제. |


**사본 또는 `--npm`?** 사본은 파일에 규칙을 바로 보여줍니다. 편집할 수 있고, 설치된 패키지보다 최신 문법을 취할 수 있거나, 써드파티 것을 취할 수 있습니다. 사본은 플러그인이 highlight.js를 업그레이드할 때 변경되지 않습니다. 새로 고침하려면 `--force`로 언어를 다시 변환하세요. `--npm`으로 만든 파일은 몇 줄이고, 문법은 플러그인과 함께 업그레이드됩니다.

## 빌드 및 적용

```sh
sh highlight/_compile.sh
```

- 이것은 Docker(`node:20-alpine` 컨테이너에서 빌드 실행) 또는, Docker가 없으면, 같은 시스템에서 Node.js 18+가 필요합니다. 첫 번째 실행에서 스크립트는 npm 패키지를 플러그인의 `node_modules/` 폴더에 설치합니다.
- 먼저 스크립트는 모든 언어를 확인합니다. 각각 빌드하고, 로드하고, 브라우저에서 실행되는 동일한 엔진에 등록하고, 샘플 텍스트를 강조 표시합니다. 언어가 깨진 경우(코드의 오류, 잘못된 정규식, 이미 사용된 `id`), 스크립트는 파일과 이유를 이름 지으며 중지합니다. 이전 `tiptap_highlight.js`는 그대로 유지됩니다.
- 그 다음 스크립트는 모든 언어를 `assets/javascripts/tiptap_highlight.js`로 번들합니다.

빌드 후, Redmine을 다시 시작하세요. 시작 시 플러그인 파일을 게시합니다([메인 README](../../docs/README.ko.md#업데이트)의 "업데이트"에서 명령 참조). 브라우저는 URL에 콘텐츠의 지문이 포함되어 있기 때문에 새 파일을 즉시 받습니다.

Redmine 서버에 Docker 및 Node.js가 모두 없는 경우, 그 중 하나가 있는 시스템(플러그인 폴더의 사본으로 충분함)에서 빌드하고, 결과 `assets/javascripts/tiptap_highlight.js`를 서버에 넣으세요.

## 언어 제거

`highlight/`에서 언어 파일을 삭제하고, 빌드한 후, Redmine을 다시 시작하세요. 이 언어의 저장된 블록은 그대로 유지되고 일반 텍스트로 표시됩니다. 더 이상 필요하지 않은 `_vendor/`의 파일은 다음으로 제거됩니다.

```sh
python3 highlight/_convert_grammar.py --prune
```

## 자신의 문법 및 편집 규칙

- 문법은 `hljs` 객체를 받고 언어 정의를 반환하는 함수입니다. 표시할 텍스트의 부분과 방법. 가이드: https://highlightjs.readthedocs.io/en/latest/language-guide.html, 참조: https://highlightjs.readthedocs.io/en/latest/mode-reference.html. 예시: `log.js`, `journalctl.js`, `cisco-ios.js`.
- highlight.js는 언어의 모든 규칙의 정규식을 조인하고 자신의 플래그를 무시합니다. 그래서 대소문자를 구분하지 않는 일치는 철자 표기법(`[Ee]rror`)이거나 `case_insensitive: true`로 전체 언어에 사용할 수 있습니다.
- 표준 토큰 클래스(`keyword`, `string`, `number`, `comment`, `title`, `attr`, `variable`, `built_in`, `literal`, `meta`, `symbol`, `type` 등)를 선호하세요. 그들은 이미 색상이 있습니다. 자신의 클래스(예를 들어, `scope: 'log-error'`는 클래스 `hljs-log-error`를 생성함)는 `assets/stylesheets/src/06_code.css`의 규칙과 CSS 리빌드(`assets/stylesheets/src/_build.sh`)가 필요합니다.
- Ready 문법을 다른 이름으로 제공하려면, `cmd.js`처럼 하세요. 원본 문법을 호출하고 결과에서 `name`과 `aliases`를 변경합니다. 별칭을 바꾸지 않으면, 새 언어는 원본에서 그들을 인수합니다.

## 언어를 추가했을 때 플러그인 업데이트

git은 `highlight/`의 파일을 그대로 둡니다. 하지만 새 플러그인 버전의 `assets/javascripts/tiptap_highlight.js`는 당신의 언어 없이 빌드되며, 이 파일의 빌드는 `git pull`을 방해합니다. 그래서:

```sh
cd /path/to/redmine/plugins/redmine_tiptap
git checkout -- assets/javascripts/tiptap_highlight.js
git pull
sh highlight/_compile.sh
```

첫 번째 명령은 빌드를 삭제하고, 마지막은 당신의 것을 포함하여 언어를 다시 빌드합니다. 그 다음 Redmine을 다시 시작하세요. 플러그인과 함께 제공되는 언어 파일을 편집했다면, git이 갈등을 해결하도록 요청할 수 있습니다.

플러그인이 아카이브에서 설치된 경우, 플러그인 폴더를 교체하기 전에 언어 파일과 `_vendor/` 폴더를 저장하고, 나중에 다시 넣고, 언어를 빌드하세요.

## 크기

모든 언어가 한 파일로 번들되면, 브라우저는 한 번 다운로드하고, 그 다음에는 캐시에서 가져옵니다. 현재 52개 언어에 대해 226KB입니다. 대부분의 언어는 1~10KB이고, 가장 큰 것은 1C(55KB)입니다.
