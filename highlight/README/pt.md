# Destaque de sintaxe: idiomas

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

> *Esta tradução foi feita com a ajuda de um modelo de IA e não foi revista por um falante nativo. Se encontrar um erro, abra um [problema ou um pedido de pull](https://github.com/Du10777/redmine_tiptap).*

Os blocos de código são destacados tanto no editor quanto em páginas guardadas (tarefas, notas, wiki), e têm o mesmo aspecto nos dois. A linguagem de um bloco é escolhida a partir do distintivo no seu canto superior direito. A lista de idiomas é definida pelos ficheiros na pasta `highlight/`: um ficheiro é um idioma.

O plugin vem com 52 idiomas. Pode adicionar mais: converter uma gramática highlight.js pronta com um script (consulte [Adicionar um idioma do highlight.js](#adicionar-um-idioma-do-highlightjs)) ou escrever a sua própria.

## Como funciona

- O destaque é feito por [highlight.js](https://highlightjs.org) (através de [lowlight](https://github.com/wooorm/lowlight)). O editor e as páginas guardadas usam o mesmo motor, portanto, as cores correspondem.
- `_compile.sh` agrupa todos os ficheiros de idioma num ficheiro, `assets/javascripts/tiptap_highlight.js`. Este ficheiro está comprometido no repositório já construído, portanto, instalar o plugin não requer compilação. Precisa apenas de compilar quando alterar o conjunto de idiomas.
- O Redmine carrega `tiptap_highlight.js` em todas as páginas, antes do editor (`tiptap_bundle.js`). No carregamento, o editor regista todos os idiomas desse ficheiro.
- No editor, um bloco é novamente destacado 50 ms depois de pausar a digitação, e apenas o bloco que foi alterado. Em páginas guardadas, um bloco é destacado quando deslocar para a vista. Um bloco dentro de uma seção recolhida é destacado quando a seção é aberta.
- A linguagem é armazenada no HTML guardado: `<pre><code class="language-<id>">`. É por isso que o `id` de um idioma nunca deve mudar: blocos guardados com o antigo `id` tornar-se-iam texto simples.
- Não há detecção automática de idioma: um bloco sem idioma é mostrado como texto simples. O mesmo vale para um bloco cuja linguagem não está em `highlight/` (por exemplo, o ficheiro de idioma foi eliminado); o seu distintivo continua mostrando o `id`. Se o ficheiro de idioma voltar, as cores também.
- Cores. highlight.js marca o texto com classes como `hljs-keyword`, `hljs-string`, `hljs-comment`. As suas cores são definidas em `assets/stylesheets/src/06_code.css`, usando a paleta do próprio destaque de sintaxe do Redmine.

## Ficheiro de idioma

Por exemplo, `routeros.js`:

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

| Campo | Obrigatório | O que é |
|---|---|---|
| `id` | sim | Nome da linguagem no HTML guardado (`class="language-<id>"`). Caracteres permitidos: `a-z`, `0-9`, `-`, `_`. **Nunca altere** uma vez guardados blocos com este idioma. |
| `label` | não | Nome na lista de idiomas e no distintivo do bloco. Predefinição para `id`. |
| `hint` | não | Nota cinzenta ao lado do nome na lista. |
| `keywords` | não | Palavras extra para a pesquisa de lista, separadas por espaço. |
| `grammar` | sim | Uma gramática highlight.js: uma função `(hljs) => language definition`. |

`label`, `hint` e `keywords` estão em Inglês. Para mostrar um idioma com outro nome na linguagem de interface de um utilizador, ou torná-lo procurável por palavras desse idioma, adicione uma entrada ao ficheiro de tradução desse idioma, `config/locales/<code>.yml`, sob `code_languages:`. As palavras lá são adicionadas a `keywords`; `label` e `hint` substituem os do ficheiro de idioma. `config/locales/ru.yml` tem exemplos, as regras estão em [config/locales/README.md](../../config/locales/README.md).

Tipos de ficheiros na pasta:

- **Curto.** Uma referência a uma gramática do pacote npm highlight.js, como no exemplo acima; a maioria dos idiomas é assim. A gramática vem da versão highlight.js registada no `package-lock.json` do plugin.
- **Cópia completa.** O código da gramática está no ficheiro e pode ser editado. Estes ficheiros são criados pelo script de conversão (consulte abaixo).
- **Gramática própria.** `log.js`, `journalctl.js`, `cisco-ios.js`; as suas partes partilhadas estão em `_common.js`.
- **Embrulho.** Uma gramática pronta com outro nome: `cmd.js` é `dos` do highlight.js, `docker-compose.js` é `yaml`.

Ficheiros e pastas cujos nomes começam com `_` não são idiomas:

- `_compile.sh` compila os idiomas;
- `_check.mjs` verifica os idiomas durante a compilação;
- `_common.js` contém partes partilhadas das gramáticas próprias do plugin;
- `_convert_grammar.py` é o script que converte gramáticas highlight.js (consulte abaixo);
- `_vendor/` contém ficheiros importados por gramáticas convertidas (criadas pelo script de conversão).

A pasta `README/` contém esta documentação.

## Adicionar um idioma do highlight.js

As gramáticas prontas (mais de 190) estão aqui: https://github.com/highlightjs/highlight.js/tree/main/src/languages. Os seus nomes e pseudónimos estão listados em [SUPPORTED_LANGUAGES.md](https://github.com/highlightjs/highlight.js/blob/main/SUPPORTED_LANGUAGES.md), juntamente com cerca de uma centena de gramáticas de terceiros mantidas em repositórios separados. O script `_convert_grammar.py` nesta pasta converte qualquer uma delas para o formato do plugin.

O script requer Python 3.6+ (sem pacotes extra) e acesso a github.com. Execute-o a partir da pasta do plugin:

```sh
cd /path/to/redmine/plugins/redmine_tiptap
python3 highlight/_convert_grammar.py erlang
sh highlight/_compile.sh
```

O argumento `erlang` é o nome do ficheiro em `src/languages` sem `.js`. O segundo comando compila os idiomas e verifica-os. Em seguida, reinicie o Redmine (consulte [Compilação e aplicação](#compilação-e-aplicação)). No Windows, use `py` ou `python` em vez de `python3`.

Exemplos:

```sh
# lista de idiomas highlight.js (* = já em highlight/), opcionalmente filtrada por uma palavra
python3 highlight/_convert_grammar.py --list
python3 highlight/_convert_grammar.py --list sql

# vários idiomas de uma vez
python3 highlight/_convert_grammar.py erlang nix fsharp

# próprio nome, dica e palavras de pesquisa (um idioma de cada vez)
python3 highlight/_convert_grammar.py erlang --label "Erlang/OTP" --hint BEAM --keywords "erl otp"

# substituir um ficheiro curto enviado com o plugin por uma cópia completa editável
python3 highlight/_convert_grammar.py routeros --force --label RouterOS --hint MikroTik --keywords mikrotik

# um idioma ainda não numa versão lançada do highlight.js, do ramo de desenvolvimento
python3 highlight/_convert_grammar.py odin --ref main

# uma ligação para um ficheiro de gramática, diretamente da barra de endereços do navegador
python3 highlight/_convert_grammar.py https://github.com/highlightjs/highlight.js/blob/main/src/languages/odin.js

# uma gramática de terceiros: uma ligação para seu repositório, o script encontra o ficheiro de gramática
python3 highlight/_convert_grammar.py https://github.com/highlightjs/highlightjs-terraform

# um ficheiro de gramática local
python3 highlight/_convert_grammar.py ~/grammars/mylang.js --id mylang

# um ficheiro curto referenciando o pacote npm em vez de uma cópia do código
python3 highlight/_convert_grammar.py erlang --npm

# mostrar o que seria feito sem alterar nada
python3 highlight/_convert_grammar.py erlang --dry-run
```

### O que o script faz

1. Descarrega `src/languages/<name>.js` da versão highlight.js em que o plugin é executado. A versão é lida de `package-lock.json` (atualmente 11.12.0), porque as gramáticas são escritas para o motor da sua própria versão. `--ref` seleciona outra versão, ramo ou commit.
2. Tira o nome da linguagem da linha `Language:` do cabeçalho da gramática e as palavras de pesquisa dos seus pseudónimos (`aliases`). O `id` é o nome do ficheiro de gramática.
3. Coloca o código da gramática em `highlight/<id>.js` inalterado, exceto pela exportação: `export default function(hljs)` torna-se `function grammar(hljs)`, e o objeto de linguagem `export default { id, label, keywords, grammar }` é acrescentado no final do ficheiro. Se a gramática for um módulo CommonJS (`module.exports = ...`), uma linha declarando `module` e `exports` é adicionada no topo.
4. Se a gramática importar outros ficheiros, descarrega-os para `highlight/_vendor/<source>-<version>/` com os mesmos caminhos que no repositório e aponta as importações lá. Por exemplo, `typescript` importa `javascript.js` e `lib/ecmascript.js`. Estes ficheiros são partilhados por todos os idiomas da mesma fonte e versão; não é necessário editá-los.
5. Verifica a linha `Requires:`, que lista as linguagens usadas para código incorporado (por exemplo, `php-template` precisa de `xml` e `php`). Se não estiverem em `highlight/`, imprime o comando que os adiciona. Sem eles, o código incorporado simplesmente fica sem cores; isto não é um erro.
6. Não sobrescreve ficheiros existentes sem `--force` e não toma um `id` já utilizado por outro ficheiro.

Após a conversão, a linguagem pode ser editada diretamente no seu ficheiro.

### Opções

| Opção | O que faz |
|---|---|
| `LANGUAGE ...` | Um nome de linguagem highlight.js, uma ligação para um ficheiro de gramática ou para um repositório de gramática de terceiros no GitHub, ou um caminho para um ficheiro local `.js`. |
| `--ref REF` | Versão highlight.js (etiqueta), ramo ou commit. Predefinição para a versão em `package-lock.json`. Para ligações, a versão é retirada da ligação. |
| `--id ID` | Idioma `id`. Predefinição para o nome do ficheiro de gramática. |
| `--label TEXT` | Nome na lista e no distintivo. Predefinição para `Language:` da gramática. |
| `--hint TEXT` | Nota cinzenta na lista. |
| `--keywords TEXT` | Palavras de pesquisa separadas por espaço. Predefinição: os pseudónimos da gramática. |
| `--npm` | Em vez de uma cópia do código, escreva um ficheiro curto referenciando o pacote npm highlight.js. Apenas para idiomas do próprio highlight.js. |
| `--force` | Substituir ficheiros existentes. |
| `--dry-run` | Mostrar o que seria feito sem alterar nada. |
| `--list [WORD]` | Listar idiomas highlight.js e gramáticas de terceiros, opcionalmente filtrados por uma palavra. |
| `--prune` | Eliminar ficheiros em `_vendor/` que nenhuma linguagem importa mais. |


**Cópia ou `--npm`?** Uma cópia mostra as regras logo no ficheiro: pode editá-las, levar uma gramática mais recente do que o pacote instalado, ou uma de terceiros. Uma cópia não muda quando o plugin atualiza highlight.js; para atualizá-la, converta o idioma novamente com `--force`. Um ficheiro feito com `--npm` tem poucas linhas, e sua gramática é atualizada juntamente com o plugin.

## Compilação e aplicação

```sh
sh highlight/_compile.sh
```

- Precisa de Docker (a compilação é executada num contentor `node:20-alpine`) ou, se não houver Docker, Node.js 18+ na mesma máquina. Na primeira execução, o script instala pacotes npm na pasta `node_modules/` do plugin.
- Primeiro, o script verifica cada idioma: compila-o separadamente, carrega-o, regista-o no mesmo motor que é executado no navegador, e destaca um texto de amostra. Se um idioma está quebrado (um erro no código, uma expressão regular inválida, um `id` já utilizado), o script nomeia o ficheiro e o motivo e para; o anterior `tiptap_highlight.js` permanece no lugar.
- Depois, o script agrupa todos os idiomas em `assets/javascripts/tiptap_highlight.js`.

Após a compilação, reinicie o Redmine: publica ficheiros de plugin na inicialização (consulte "Atualização" no [README principal](../../docs/README.pt.md#atualização) para os comandos). Os navegadores obtêm o novo ficheiro logo, porque o seu URL contém uma impressão do conteúdo.

Se o servidor Redmine não tiver nem Docker nem Node.js, compile em qualquer máquina que tenha um deles (uma cópia da pasta do plugin é suficiente) e coloque o `assets/javascripts/tiptap_highlight.js` resultante no servidor.

## Remover um idioma

Elimine o ficheiro de idioma de `highlight/`, compile e reinicie o Redmine. Os blocos guardados neste idioma permanecem como estão e são mostrados como texto simples. Os ficheiros em `_vendor/` que já não são necessários são removidos com:

```sh
python3 highlight/_convert_grammar.py --prune
```

## Gramáticas próprias e regras de edição

- Uma gramática é uma função que recebe o objeto `hljs` e retorna uma definição de linguagem: quais pedaços de texto marcar e como. Guia: https://highlightjs.readthedocs.io/en/latest/language-guide.html, referência: https://highlightjs.readthedocs.io/en/latest/mode-reference.html. Exemplos: `log.js`, `journalctl.js`, `cisco-ios.js`.
- highlight.js une as expressões regulares de todas as regras de um idioma numa e ignora suas próprias bandeiras. Portanto, a correspondência sem distinção de maiúsculas e minúsculas tem de ser soletrada (`[Ee]rror`) ou ativada para o idioma inteiro com `case_insensitive: true`.
- Prefira as classes de token padrão (`keyword`, `string`, `number`, `comment`, `title`, `attr`, `variable`, `built_in`, `literal`, `meta`, `symbol`, `type` e afins): já têm cores. Uma classe sua (por exemplo, `scope: 'log-error'` produz a classe `hljs-log-error`) precisa de uma regra em `assets/stylesheets/src/06_code.css` e de uma reconstrução de CSS (`assets/stylesheets/src/_build.sh`).
- Para oferecer uma gramática pronta com outro nome, faça como `cmd.js` faz: chame a gramática original e altere `name` e `aliases` no seu resultado. Se os pseudónimos não forem substituídos, a nova linguagem toma-os da original.

## Atualizar o plugin quando tiver adicionado idiomas

git deixa os seus ficheiros em `highlight/` sozinhos. Mas `assets/javascripts/tiptap_highlight.js` na nova versão do plugin é compilado sem os seus idiomas, e a sua compilação deste ficheiro fica no caminho do `git pull`. Portanto:

```sh
cd /path/to/redmine/plugins/redmine_tiptap
git checkout -- assets/javascripts/tiptap_highlight.js
git pull
sh highlight/_compile.sh
```

O primeiro comando descarta a sua compilação, o último compila os idiomas novamente, incluindo o seu. Em seguida, reinicie o Redmine. Se tiver editado ficheiros de idioma enviados com o plugin, git pode pedir-lhe para resolver conflitos neles.

Se o plugin foi instalado a partir de um arquivo, guarde os seus ficheiros de idioma e a pasta `_vendor/` antes de substituir a pasta do plugin, coloque-os de volta depois e compile os idiomas.

## Tamanho

Todos os idiomas são agrupados num ficheiro; o navegador descarrega-o uma vez e depois tira-o da memória cache. Atualmente, são 226 KB para 52 idiomas. A maioria dos idiomas ocupa 1–10 KB, o maior é 1C (55 KB).
