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

> *Esta tradução foi feita com a ajuda de um modelo de IA e não foi revista por um falante nativo. Se encontrar um erro, abra uma [issue ou um pull request](https://github.com/Du10777/redmine_tiptap).*

Blocos de código são destacados tanto no editor quanto em páginas salvas (tarefas, notas, wiki), e parecem iguais em ambas. A linguagem de um bloco é escolhida a partir do crachá no canto superior direito. A lista de idiomas é definida pelos arquivos na pasta `highlight/`: um arquivo é um idioma.

O plugin vem com 52 idiomas. Você pode adicionar mais: converter uma gramática highlight.js pronta com um script (veja [Adicionando um idioma do highlight.js](#adicionando-um-idioma-do-highlightjs)) ou escrever a sua própria.

## Como funciona

- O destaque é feito por [highlight.js](https://highlightjs.org) (através de [lowlight](https://github.com/wooorm/lowlight)). O editor e as páginas salvas usam o mesmo motor, portanto as cores coincidem.
- `_compile.sh` agrupa todos os arquivos de idioma em um arquivo, `assets/javascripts/tiptap_highlight.js`. Este arquivo está comprometido no repositório já compilado, portanto instalar o plugin não requer compilação. Você só precisa compilar quando muda o conjunto de idiomas.
- O Redmine carrega `tiptap_highlight.js` em todas as páginas, antes do editor (`tiptap_bundle.js`). No carregamento, o editor registra todos os idiomas desse arquivo.
- No editor, um bloco é re-destacado 50 ms após você pausar a digitação, e apenas o bloco que mudou. Em páginas salvas, um bloco é destacado quando rola para a visualização. Um bloco dentro de uma seção recolhível é destacado quando a seção é aberta.
- A linguagem é armazenada no HTML salvo: `<pre><code class="language-<id>">`. É por isso que o `id` de um idioma nunca deve mudar: blocos salvos com o `id` antigo se tornariam texto simples.
- Não há detecção automática de idioma: um bloco sem idioma é mostrado como texto simples. O mesmo vale para um bloco cujo idioma não está em `highlight/` (por exemplo, o arquivo de idioma foi excluído); seu crachá continua mostrando o `id`. Se o arquivo de idioma voltar, as cores também voltam.
- Cores. highlight.js marca o texto com classes como `hljs-keyword`, `hljs-string`, `hljs-comment`. Suas cores são definidas em `assets/stylesheets/src/06_code.css`, usando a paleta do próprio destaque de sintaxe do Redmine.

## Arquivo de idioma

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
| `id` | sim | Nome do idioma no HTML salvo (`class="language-<id>"`). Caracteres permitidos: `a-z`, `0-9`, `-`, `_`. **Nunca altere** uma vez que blocos com este idioma tenham sido salvos. |
| `label` | não | Nome na lista de idiomas e no crachá do bloco. Padrão para `id`. |
| `hint` | não | Nota cinzenta ao lado do nome na lista. |
| `keywords` | não | Palavras extras para pesquisa de lista, separadas por espaço. |
| `grammar` | sim | Uma gramática highlight.js: uma função `(hljs) => language definition`. |

`label`, `hint` e `keywords` estão em Inglês. Para mostrar um idioma com outro nome na linguagem de interface de um usuário, ou para torná-lo pesquisável por palavras desse idioma, adicione uma entrada ao arquivo de tradução desse idioma, `config/locales/<code>.yml`, sob `code_languages:`. As palavras lá são adicionadas a `keywords`; `label` e `hint` substituem os do arquivo de idioma. `config/locales/ru.yml` tem exemplos, as regras estão em [config/locales/README.md](../../config/locales/README.md).

Tipos de arquivos na pasta:

- **Curto.** Uma referência a uma gramática do pacote npm highlight.js, como no exemplo acima; a maioria dos idiomas é assim. A gramática vem da versão highlight.js registrada em `package-lock.json` do plugin.
- **Cópia completa.** O código da gramática está no arquivo e pode ser editado. Estes arquivos são criados pelo script de conversão (veja abaixo).
- **Gramática própria.** `log.js`, `journalctl.js`, `cisco-ios.js`; suas partes compartilhadas estão em `_common.js`.
- **Wrapper.** Uma gramática pronta com outro nome: `cmd.js` é `dos` do highlight.js, `docker-compose.js` é `yaml`.

Arquivos e pastas cujos nomes começam com `_` não são idiomas:

- `_compile.sh` compila os idiomas;
- `_check.mjs` verifica os idiomas durante a compilação;
- `_common.js` contém partes compartilhadas das gramáticas próprias do plugin;
- `_convert_grammar.py` é o script que converte gramáticas highlight.js (veja abaixo);
- `_vendor/` contém arquivos importados por gramáticas convertidas (criados pelo script de conversão).

A pasta `README/` contém esta documentação.

## Adicionando um idioma do highlight.js

Gramáticas prontas (mais de 190) estão aqui: https://github.com/highlightjs/highlight.js/tree/main/src/languages. Seus nomes e aliases estão listados em [SUPPORTED_LANGUAGES.md](https://github.com/highlightjs/highlight.js/blob/main/SUPPORTED_LANGUAGES.md), junto com cerca de cem gramáticas de terceiros mantidas em repositórios separados. O script `_convert_grammar.py` nesta pasta converte qualquer uma delas para o formato do plugin.

O script requer Python 3.6+ (sem pacotes extras) e acesso a github.com. Execute-o a partir da pasta do plugin:

```sh
cd /path/to/redmine/plugins/redmine_tiptap
python3 highlight/_convert_grammar.py erlang
sh highlight/_compile.sh
```

O argumento `erlang` é o nome do arquivo em `src/languages` sem `.js`. O segundo comando compila os idiomas e os verifica. Em seguida, reinicie o Redmine (veja [Compilação e aplicação](#compilação-e-aplicação)). No Windows, use `py` ou `python` em vez de `python3`.

Exemplos:

```sh
# lista de idiomas highlight.js (* = já em highlight/), opcionalmente filtrada por uma palavra
python3 highlight/_convert_grammar.py --list
python3 highlight/_convert_grammar.py --list sql

# vários idiomas de uma vez
python3 highlight/_convert_grammar.py erlang nix fsharp

# nome próprio, dica e palavras de pesquisa (um idioma por vez)
python3 highlight/_convert_grammar.py erlang --label "Erlang/OTP" --hint BEAM --keywords "erl otp"

# substituir um arquivo curto enviado com o plugin por uma cópia completa editável
python3 highlight/_convert_grammar.py routeros --force --label RouterOS --hint MikroTik --keywords mikrotik

# um idioma ainda não em uma versão lançada do highlight.js, do ramo de desenvolvimento
python3 highlight/_convert_grammar.py odin --ref main

# um link para um arquivo de gramática, diretamente da barra de endereços do navegador
python3 highlight/_convert_grammar.py https://github.com/highlightjs/highlight.js/blob/main/src/languages/odin.js

# uma gramática de terceiros: um link para seu repositório, o script encontra o arquivo de gramática
python3 highlight/_convert_grammar.py https://github.com/highlightjs/highlightjs-terraform

# um arquivo de gramática local
python3 highlight/_convert_grammar.py ~/grammars/mylang.js --id mylang

# um arquivo curto referenciando o pacote npm em vez de uma cópia do código
python3 highlight/_convert_grammar.py erlang --npm

# mostrar o que seria feito sem fazer nenhuma alteração
python3 highlight/_convert_grammar.py erlang --dry-run
```

### O que o script faz

1. Baixa `src/languages/<name>.js` da versão highlight.js em que o plugin é executado. A versão é lida de `package-lock.json` (atualmente 11.12.0), porque as gramáticas são escritas para o motor de sua própria versão. `--ref` seleciona outra versão, ramo ou commit.
2. Tira o nome do idioma da linha `Language:` do cabeçalho da gramática e as palavras de pesquisa de seus aliases (`aliases`). O `id` é o nome do arquivo de gramática.
3. Coloca o código da gramática em `highlight/<id>.js` inalterado, exceto pela exportação: `export default function(hljs)` torna-se `function grammar(hljs)`, e o objeto de idioma `export default { id, label, keywords, grammar }` é anexado ao final do arquivo. Se a gramática for um módulo CommonJS (`module.exports = ...`), uma linha declarando `module` e `exports` é adicionada no topo.
4. Se a gramática importar outros arquivos, baixa-os para `highlight/_vendor/<source>-<version>/` com os mesmos caminhos que no repositório e aponta as importações para lá. Por exemplo, `typescript` importa `javascript.js` e `lib/ecmascript.js`. Esses arquivos são compartilhados por todos os idiomas da mesma fonte e versão; não há necessidade de editá-los.
5. Verifica a linha `Requires:`, que lista os idiomas usados para código incorporado (por exemplo, `php-template` precisa de `xml` e `php`). Se eles não estiverem em `highlight/`, imprime o comando que os adiciona. Sem eles, o código incorporado simplesmente fica sem cores; isto não é um erro.
6. Não sobrescreve arquivos existentes sem `--force` e não toma um `id` já utilizado por outro arquivo.

Após a conversão, o idioma pode ser editado direto em seu arquivo.

### Opções

| Opção | O que faz |
|---|---|
| `LANGUAGE ...` | Um nome de idioma highlight.js, um link para um arquivo de gramática ou para um repositório de gramática de terceiros no GitHub, ou um caminho para um arquivo `.js` local. |
| `--ref REF` | Versão highlight.js (tag), ramo ou commit. Padrão para a versão em `package-lock.json`. Para links, a versão é tirada do link. |
| `--id ID` | Idioma `id`. Padrão para o nome do arquivo de gramática. |
| `--label TEXT` | Nome na lista e no crachá. Padrão para `Language:` da gramática. |
| `--hint TEXT` | Nota cinzenta na lista. |
| `--keywords TEXT` | Palavras de pesquisa separadas por espaço. Padrão: os aliases da gramática. |
| `--npm` | Em vez de uma cópia do código, escreva um arquivo curto referenciando o pacote npm highlight.js. Apenas para idiomas do próprio highlight.js. |
| `--force` | Substituir arquivos existentes. |
| `--dry-run` | Mostrar o que seria feito sem fazer nenhuma alteração. |
| `--list [WORD]` | Listar idiomas highlight.js e gramáticas de terceiros, opcionalmente filtrados por uma palavra. |
| `--prune` | Excluir arquivos em `_vendor/` que nenhum idioma importa mais. |


**Cópia ou `--npm`?** Uma cópia mostra as regras direto no arquivo: você pode editá-las, pegar uma gramática mais nova que o pacote instalado, ou uma de terceiros. Uma cópia não muda quando o plugin atualiza highlight.js; para atualizá-la, converta o idioma novamente com `--force`. Um arquivo feito com `--npm` tem algumas linhas, e sua gramática é atualizada junto com o plugin.

## Compilação e aplicação

```sh
sh highlight/_compile.sh
```

- Requer Docker (a compilação é executada em um contêiner `node:20-alpine`) ou, se não houver Docker, Node.js 18+ na mesma máquina. Na primeira execução, o script instala pacotes npm na pasta `node_modules/` do plugin.
- Primeiro, o script verifica cada idioma: compila-o separadamente, carrega-o, registra-o no mesmo motor que é executado no navegador, e destaca um texto de amostra. Se um idioma está quebrado (um erro no código, uma expressão regular inválida, um `id` já utilizado), o script nomeia o arquivo e a razão e para; o `tiptap_highlight.js` anterior permanece no lugar.
- Então o script agrupa todos os idiomas em `assets/javascripts/tiptap_highlight.js`.

Após a compilação, reinicie o Redmine: ela publica arquivos de plugin na inicialização (veja "Atualização" no [README principal](../../docs/README.pt-BR.md#atualização) para os comandos). Os navegadores obtêm o novo arquivo imediatamente, porque seu URL contém uma impressão digital do conteúdo.

Se o servidor Redmine não tiver nem Docker nem Node.js, compile em qualquer máquina que tenha um deles (uma cópia da pasta do plugin é o suficiente) e coloque o `assets/javascripts/tiptap_highlight.js` resultante no servidor.

## Removendo um idioma

Exclua o arquivo de idioma de `highlight/`, compile e reinicie o Redmine. Blocos salvos neste idioma permanecem como estão e são mostrados como texto simples. Arquivos em `_vendor/` que não são mais necessários são removidos com:

```sh
python3 highlight/_convert_grammar.py --prune
```

## Gramáticas próprias e regras de edição

- Uma gramática é uma função que recebe o objeto `hljs` e retorna uma definição de idioma: quais pedaços de texto marcar e como. Guia: https://highlightjs.readthedocs.io/en/latest/language-guide.html, referência: https://highlightjs.readthedocs.io/en/latest/mode-reference.html. Exemplos: `log.js`, `journalctl.js`, `cisco-ios.js`.
- highlight.js une as expressões regulares de todas as regras de um idioma em uma e ignora suas próprias flags. Portanto, correspondência sem distinção de maiúsculas e minúsculas tem que ser soletrada (`[Ee]rror`) ou habilitada para o idioma inteiro com `case_insensitive: true`.
- Prefira as classes de token padrão (`keyword`, `string`, `number`, `comment`, `title`, `attr`, `variable`, `built_in`, `literal`, `meta`, `symbol`, `type` e assim por diante): elas já têm cores. Uma classe sua (por exemplo, `scope: 'log-error'` produz a classe `hljs-log-error`) precisa de uma regra em `assets/stylesheets/src/06_code.css` e de uma reconstrução de CSS (`assets/stylesheets/src/_build.sh`).
- Para oferecer uma gramática pronta com outro nome, faça como `cmd.js` faz: chame a gramática original e altere `name` e `aliases` em seu resultado. Se os aliases não forem substituídos, o novo idioma os herda do original.

## Atualizando o plugin quando você adicionou idiomas

git deixa seus arquivos em `highlight/` sozinhos. Mas `assets/javascripts/tiptap_highlight.js` na nova versão do plugin é compilado sem seus idiomas, e sua compilação deste arquivo fica no caminho do `git pull`. Portanto:

```sh
cd /path/to/redmine/plugins/redmine_tiptap
git checkout -- assets/javascripts/tiptap_highlight.js
git pull
sh highlight/_compile.sh
```

O primeiro comando descarta sua compilação, o último compila os idiomas novamente, incluindo o seu. Em seguida, reinicie o Redmine. Se você editou arquivos de idioma enviados com o plugin, git pode pedir que você resolva conflitos neles.

Se o plugin foi instalado a partir de um arquivo, salve seus arquivos de idioma e a pasta `_vendor/` antes de substituir a pasta do plugin, coloque-os de volta depois e compile os idiomas.

## Tamanho

Todos os idiomas são agrupados em um arquivo; o navegador baixa uma vez e depois o toma do cache. Atualmente são 226 KB para 52 idiomas. A maioria dos idiomas ocupa 1–10 KB, o maior é 1C (55 KB).
