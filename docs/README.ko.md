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

> *이 번역은 AI 모델의 도움으로 작성되었으며, 모국어 사용자의 검토를 거치지 않았습니다. 오류를 발견하면 [issue 또는 pull request](https://github.com/Du10777/redmine_tiptap)를 열어주세요.*

Redmine용 텍스트 에디터로, TipTap https://github.com/ueberdosis/tiptap 기반입니다.

지원하는 Redmine 버전: **6.\*** 및 **7.\*** (6.1.4, 6.1.5, 7.0.2에서 테스트).

에디터 엔진: **TipTap 3.31.4**. 모든 `@tiptap/*` 패키지는 `package.json`과 `package-lock.json`에서 이 정확한 버전으로 고정되어 있으며, 항상 함께 동일한 버전으로 업그레이드해야 합니다.

## 기능

**본문 형식**
- 굵음, 기울임, 밑줄, 취소선, 아래첨자와 위첨자(Ctrl+, 및 Ctrl+.), 인라인 코드.
- 글자색과 배경색: 64색 팔레트 또는 임의의 16진 값.
- 글꼴 모음(13개 글꼴)과 글꼴 크기(8~72px 사전 설정 또는 임의 값).
- 단락 스타일: 제목 1~6 및 일반 텍스트.
- 단락과 제목의 정렬(좌측, 중앙, 우측, 양쪽 맞춤) 및 들여쓰기(최대 8단계).
- 링크: 삽입, 편집, 제거.
- 수평선, 실행 취소 및 다시 실행.

**리스트**
- 검은 원, 흰 원, 또는 정사각형 마커가 있는 글머리 기호 리스트.
- 번호 매기기: 1, 01, a, A, i, I, α.
- 체크박스가 있는 작업 리스트; 완료된 작업은 취소선이 그어집니다.
- 중첩 리스트(Tab / Shift+Tab).

**표**
- 헤더 행이 있거나 없는 임의 크기의 표 삽입.
- 셀의 우클릭 메뉴: 행과 열 추가 및 삭제, 셀 병합 및 분할, 헤더 행 및 헤더 열, 표 삭제.
- 열 너비는 셀 테두리를 드래그하여 변경.
- Excel에서 붙여넣으면 열 너비, 정렬, 글꼴 크기가 유지됩니다. Redmine에서 복사한 표는 테두리와 함께 Excel에 붙여넣어집니다.

**이미지 및 첨부파일**
- 클립보드에서 이미지를 붙여넣으면 첨부파일로 업로드되고 텍스트에 나타납니다.
- Redmine의 파일 필드로 첨부한 이미지나 여기로 드롭한 이미지도 텍스트에 삽입됩니다.
- 첨부파일에서 이미지를 삽입(썸네일 선택) 또는 임의의 첨부파일에 대한 링크 삽입.
- 이미지의 모서리를 드래그하여 크기 조정.

**코드**
- 에디터와 저장된 페이지 모두에서 구문 강조 표시가 있는 코드 블록. 52개 언어를 지원하며 더 추가할 수 있습니다([구문 강조](#구문-강조) 참조).
- 블록의 언어는 모서리의 배지에서 선택합니다. 검색, 최근 사용 언어, 자주 사용하는 언어를 지원합니다.
- 코드 블록 내에서 Tab과 Shift+Tab으로 줄을 들여쓰고 내려씁니다. 코드 내의 굵음, 링크, 색은 유지됩니다.

**블록**
- 축소 가능한 블록: 제목과 숨겨진 콘텐츠(`<details>`). 저장된 페이지에서는 축소되고, 에디터에서는 확장됩니다.
- 저자와 날짜 줄이 있는 인용 블록.

**편집**
- HTML 소스를 보고 편집하는 `<HTML>` 모드: 중첩된 블록은 들여쓰기되고, 여러 줄을 차지하는 블록은 빈 줄로 구분되며, 구문은 HTML 코드 블록과 같은 규칙으로 색상이 적용되고, Enter를 누르면 줄의 들여쓰기가 유지됩니다.
- Markdown 스타일 입력: 제목은 `#`, 리스트는 `-` 및 `1.`, 작업은 `[ ]`, 코드 블록은 ```` ```python ```` (any language name or none), 굵음은 `**bold**`, 수평선은 `---`. 표준 키보드 단축키: Ctrl+B, Ctrl+I, Ctrl+U, Ctrl+Z 등.
- 에디터는 창 높이보다 커지지 않습니다. 도구 모음과 폼 버튼은 항상 보이고, 텍스트는 에디터 내에서 스크롤됩니다. 높이는 창 크기와 페이지 확대/축소를 따릅니다.
- 오른쪽 아래 모서리의 크기 조정 손잡이로 높이를 수동으로 설정할 수 있습니다. 높이는 기억되고, 더블클릭하면 자동 높이로 돌아갑니다.

**Redmine 통합**
- 모든 Redmine 서식 텍스트 필드에서 작동합니다: 일감 설명 및 댓글, 위키 페이지, 뉴스, 게시판 메시지, 문서, 프로젝트 설명, 긴 텍스트 사용자 정의 항목, 나중에 페이지에 표시되는 필드 포함.
- 텍스트는 HTML로 저장됩니다. 에디터를 사용하려면 Redmine 설정의 본문 형식에서 *TipTap HTML*을 선택하세요.
- 인터페이스(도구 설명, 메뉴, 대화상자)는 사용자의 Redmine 프로필에서 선택한 언어를 따릅니다. Redmine의 50개 언어 중 47개가 플러그인과 함께 제공됩니다. 영어와 러시아어는 완성되었고, 나머지 45개는 AI 모델로 만든 초안으로 모국어 사용자의 수정을 환영합니다. 오른쪽에서 왼쪽으로 쓰는 3개 언어(아랍어, 히브리어, 페르시아어)는 의도적으로 지원되지 않습니다([인터페이스 언어](#인터페이스-언어) 참조).
- 큰 텍스트에서도 빠르게 작동합니다. 숨겨진 폼 내의 에디터는 폼이 열렸을 때만 생성되고, 긴 코드 블록은 표시 영역으로 스크롤될 때 강조 표시됩니다.
- 텍스트 CKEditor(redmine_ckeditor 플러그인)로 작성된 텍스트는 그대로 표시되고 에디터에서 서식을 유지하며 열립니다. 변환 없음, [CKEditor에서 마이그레이션](#ckeditor에서-마이그레이션)을 참조하세요.
- 저장된 텍스트는 안전하지 않은 HTML 없이 표시됩니다. 페이지가 표시될 때 스크립트, 이벤트 핸들러, `javascript:` 링크가 제거되고 에디터 자체가 생성하는 것만 유지됩니다. 이는 REST API 또는 `<HTML>` 모드를 통해 제공되는 텍스트에도 적용됩니다.

## 구문 강조

코드 블록은 에디터와 저장된 페이지 모두에서 동일하게 강조 표시됩니다. 블록의 언어는 오른쪽 위 모서리의 배지에서 선택됩니다. 목록에는 검색 상자가 있고 최근 사용 언어와 자주 사용하는 언어를 기억합니다.

플러그인에는 52개 언어가 포함되어 있습니다. HTML, 1C, Cisco IOS, MikroTik RouterOS, Windows cmd, docker compose, Linux 서비스 로그, journalctl 출력 포함.

자신의 언어를 추가할 수 있습니다. 각 언어는 `highlight/` 폴더의 한 파일입니다. 190개 이상의 highlight.js 문법이나 써드파티 문법은 한 명령으로 그러한 파일로 변환됩니다.

```sh
python3 highlight/_convert_grammar.py erlang
sh highlight/_compile.sh
```

자세한 내용: [highlight/README/ko.md](../highlight/README/ko.md).

## 인터페이스 언어

에디터는 사용자의 Redmine 프로필(내 계정 → 언어)에서 선택한 언어로 표시됩니다. Redmine의 50개 언어 중 47개 파일이 플러그인과 함께 제공되며 `config/locales/`에 있습니다. 영어가 소스이고 러시아어는 작성자 자신의 것입니다. 나머지 45개는 AI 모델의 도움으로 만든 초안으로, 모국어 사용자의 검토를 아직 거치지 않았으므로 어색한 표현이 있을 수 있습니다. 파일에 없는 텍스트는 영어로 표시됩니다.

번역을 수정하려면 `config/locales/<code>.yml`(`de`, `fr`, `pt-BR` 등)의 값을 변경하고 Redmine을 다시 시작합니다. `bundle exec rake redmine_tiptap:locales`로 파일을 검사할 수 있습니다. 수정이 포함된 pull request를 환영합니다.

**오른쪽에서 왼쪽으로 쓰는 언어(아랍어, 히브리어, 페르시아어)는 의도적으로 지원되지 않습니다.** 이를 지원하려면 번역뿐만 아니라 코드베이스에 많은 변경이 필요하며, 우리는 그것을 하지 않기로 선택했습니다. 이 언어들의 경우 에디터는 영어로 표시되고 레이아웃은 조정되지 않습니다. 필요한 경우 fork를 만드세요. 번역 메커니즘은 준비되어 있고, 변경해야 할 다른 사항은 [config/locales/README.md](../config/locales/README.md#right-to-left-languages)에 나열되어 있습니다.

자세한 내용 및 Redmine 언어 목록: [config/locales/README.md](../config/locales/README.md).

## 설치

1. 플러그인을 Redmine의 `plugins` 폴더에 넣으세요. 폴더는 `redmine_tiptap`이어야 합니다. 가장 쉬운 방법은 git을 사용하는 것인데, 업데이트도 한 명령으로 됩니다.
   ```sh
   cd /path/to/redmine
   git clone https://github.com/Du10777/redmine_tiptap.git plugins/redmine_tiptap
   ```
2. Redmine을 다시 시작하세요.
3. Redmine 설정(redmine.selfhosted/_settings_)에서 본문 형식으로 *TipTap HTML*을 선택하세요.

## 업데이트

플러그인에는 데이터베이스 마이그레이션이 없으며, 빌드된 JavaScript 번들과 스타일시트는 리포지토리에 포함되어 있습니다. 업데이트는 서버의 npm이나 빌드가 필요하지 않습니다. 플러그인 파일을 교체하고 Redmine을 다시 시작하세요.

업데이트하기 전에, 새 버전이 사용 중인 Redmine 버전을 지원하는지 확인하세요(위의 "지원하는 Redmine 버전" 참조).

### git으로 설치함(권장)

```sh
cd /path/to/redmine/plugins/redmine_tiptap
git pull
```

그 다음 Redmine을 다시 시작하세요. 예를 들어:

```sh
sudo systemctl restart redmine          # systemd 서비스로 실행하는 Redmine
touch /path/to/redmine/tmp/restart.txt  # Passenger
docker compose restart redmine          # Docker
```

최신 커밋이 아닌 특정 버전으로 유지하려면: `git fetch && git checkout <tag-or-commit>`.

### 아카이브에서 설치함

1. 오래된 `plugins/redmine_tiptap` 폴더를 삭제하고 그 자리에 새 버전을 압축 해제합니다. 먼저 삭제하면 새 버전에서 제거된 파일이 남지 않습니다.
2. Redmine 폴더의 `public/assets/.manifest.json`을 삭제하세요.
3. Redmine을 다시 시작하세요.

단계 2가 중요합니다. Redmine은 시작할 때, 플러그인 파일이 이 매니페스트보다 최신인 경우에만 플러그인 에셋을 다시 게시합니다. 아카이브에서 압축 해제한 파일은 원본 타임스탬프를 유지하므로, 단계 2를 하지 않으면 Redmine이 계속 이전 에디터를 제공할 수 있습니다. 매니페스트는 시작할 때 자동으로 다시 생성됩니다. `git pull`을 사용할 때는 이 단계가 필요하지 않습니다. git은 변경된 파일에 현재 시간을 지정하기 때문입니다.

### 업데이트 후

- 에디터의 스크립트와 스타일시트는 URL의 콘텐츠 지문으로 제공되므로, 브라우저는 다시 시작한 직후 새 버전을 로드합니다. 사용자가 브라우저 캐시를 지울 필요가 없습니다.
- Redmine 설정(관리 → 설정 → 일반)에서 형식을 가진 텍스트 빠른 임시 기억이 활성화된 경우, 텍스트 표시 방식이 변경되는 버전(HTML 정제, CKEditor 텍스트 지원)으로 업데이트한 후 Redmine의 캐시를 한 번 지우세요. Redmine 폴더에서 `bundle exec rake tmp:cache:clear RAILS_ENV=production`을 실행하세요. 그렇지 않으면 업데이트 전에 렌더링된 페이지가 텍스트 변경될 때까지 캐시에서 정제되지 않은 상태로 표시될 수 있습니다.
- 플러그인의 이전 버전은 스크립트를 `public/tiptap_bundle.js`로 복사했습니다. 이 파일은 더 이상 사용되지 않으므로 삭제할 수 있습니다.
  ```sh
  rm -f /path/to/redmine/public/tiptap_bundle.js /path/to/redmine/public/tiptap_bundle.js.map
  ```

## CKEditor에서 마이그레이션

Redmine이 [redmine_ckeditor](https://github.com/a-ono/redmine_ckeditor)를 사용했다면, 이 플러그인으로 전환하고 작성된 모든 텍스트를 유지할 수 있습니다. 일감, 댓글, 위키 페이지, 뉴스, 메시지, 문서. 아무것도 변환되지 않고 데이터베이스도 변경되지 않습니다. CKEditor는 텍스트를 HTML로 저장하고 이 플러그인도 그렇게 하므로, 저장된 텍스트는 단순히 새 포매터로 표시됩니다.

1. 플러그인을 설치(위 참조)하고 본문 형식으로 *TipTap HTML*을 선택하세요.
2. Redmine의 `public/system/rich/` 폴더를 유지하세요. CKEditor의 이미지 브라우저로 이미지와 파일을 삽입했다면, 그것들은 데이터베이스나 첨부파일이 아니라 여기에 저장되며, 텍스트는 주소(`/system/rich/...`)로 그것들을 참조합니다. **Redmine을 다른 서버로 옮기거나 새로 설치하는 경우, 이 폴더도 옮기세요**. 데이터베이스 및 `files/` 폴더와 함께 옮겨야 합니다. 둘 다 이 파일들을 포함하지 않으며, 폴더가 없으면 오래된 텍스트의 이미지에 404 오류가 표시됩니다. 일감, 위키 페이지 등의 첨부파일은 이전과 같이 저장되고 아무것도 필요하지 않습니다. 이 에디터에서 삽입한 이미지는 일반 첨부파일입니다. redmine_ckeditor를 제거한 후에도 이 폴더는 계속 필요합니다.
3. 더 이상 필요하지 않으면 redmine_ckeditor를 제거하세요.

오래된 텍스트는 CKEditor가 표시하는 방식대로 표시됩니다. 글꼴, 크기, 색상, 정렬, 들여쓰기, 리스트, 표(테두리, 너비, 캡션, 병합된 셀), 이미지(크기, float, 테두리, 링크 내 이미지), 링크, 코드 블록(언어 및 강조), Redmine 매크로(`{{toc}}`, `{{collapse(Title) ... }}`, `{{thumbnail(...)}}`등), 위키 및 일감 링크, 일반 웹 주소를 클릭 가능하게 만들고, 임베드된 `<iframe>`(비디오). CKEditor에서 작성된 텍스트는 마크업으로 인식되고 여기 있는 단락 간의 간격을 유지하므로, 이 에디터보다 넓습니다.

의도적인 차이:
- `<iframe>`은 http(s)를 통해 다른 사이트를 가리키고 있을 때만 표시되고 샌드박스화됩니다. 내부 페이지는 자체 스크립트를 실행할 수 있지만 Redmine 페이지에 도달하거나, 최상위 창을 열거나, 폼을 제출할 수 없습니다. 다른 모든 `<iframe>`은 제거됩니다.
- 링크는 같은 창에서 열립니다. 링크의 `target` 특성(CKEditor의 "새 창(_blank)")은 유지되지 않습니다.
- CKEditor가 제공했지만 페이지가 조용히 삭제한 일부 형식은 여기에 표시됩니다. 예를 들어 "마커" 스타일의 배경색과 `<q>`의 인용 부호입니다.
- CKEditor의 "Special Container" 스타일(회색 테두리가 있는 블록)은 강조 표시 없는 코드 블록으로 표시되며, 에디터에서도 코드 블록입니다.

오래된 텍스트는 에디터에서 열어 다시 저장할 때 형식을 유지합니다. Redmine 매크로(매크로는 에디터의 회색 요소입니다. CKEditor의 소스 모드처럼 `<HTML>` 모드에서 편집), `<iframe>`, 스타일이 포함된 `<div>`와 `<address>` 블록(웹 페이지에서 붙여넣은 `<div>`는 여전히 단락이 됩니다), 위첨자 및 아래첨자, CKEditor의 인라인 스타일(big, small, keyboard, sample 등), 제목, 표 및 표 셀의 스타일, 이미지의 크기(너비와 높이), float, 테두리, 링크, 코드 블록의 언어. 편집에서 생존하지 않는 것: 표의 캡션은 위의 중앙 정렬된 단락이 되고, 표의 헤더 및 바닥글 섹션은 일반 행(바닥글은 아래 유지)이 되고, `<del>`은 `<s>`(동일한 모양)이 됩니다. 이 에디터에서 저장된 텍스트는 이 에디터의 압축된 단락 간격을 얻습니다.
