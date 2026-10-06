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

> *Esta tradução foi feita com a ajuda de um modelo de IA e não foi revista por um falante nativo. Se encontrar um erro, abra uma [issue ou um pull request](https://github.com/Du10777/redmine_tiptap).*

Este é um editor de texto para Redmine, baseado em TipTap https://github.com/ueberdosis/tiptap

**[Experimente o editor online](https://du10777.github.io/redmine_tiptap/)**: a página de demonstração roda o editor deste plugin direto no seu navegador, em uma página feita como um formulário do Redmine. Digite e formate texto, cole uma imagem, abra a aba "Pré-visualizar" para ver como o texto vai ficar depois de salvo, troque o idioma da interface ou escolha um texto de exemplo. Nada para instalar, e nada é enviado para lugar nenhum.

[![O editor na página de demonstração](../docs/images/demo.png)](https://du10777.github.io/redmine_tiptap/)

Motor do editor: **TipTap 3.31.4**. Todos os pacotes `@tiptap/*` estão fixados a esta versão exata em `package.json` e `package-lock.json` e devem ser sempre atualizados juntos, para uma e a mesma versão.

**Sumário**

- [Versões suportadas do Redmine](#versões-suportadas-do-redmine)
- [Funcionalidades](#funcionalidades)
  - [Formatação de texto](#formatação-de-texto)
  - [Listas](#listas)
  - [Tabelas](#tabelas)
  - [Imagens e anexos](#imagens-e-anexos)
  - [Código](#código)
  - [Blocos](#blocos)
  - [Edição](#edição)
  - [Integração com Redmine](#integração-com-redmine)
- [Destaque de sintaxe](#destaque-de-sintaxe)
- [Idioma da interface](#idioma-da-interface)
- [Instalação](#instalação)
- [Atualização](#atualização)
  - [Instalado com git (recomendado)](#instalado-com-git-recomendado)
  - [Instalado a partir de um arquivo](#instalado-a-partir-de-um-arquivo)
  - [Depois de atualizar](#depois-de-atualizar)
- [Migrando do CKEditor](#migrando-do-ckeditor)

## Versões suportadas do Redmine

| Redmine | Suportada | Testado em |
|---|---|---|
| 7.x | sim | 7.0.2 |
| 6.x | sim | 6.1.4, 6.1.5 |
| 5.x e anteriores | não | — |

Uma nova versão principal (8.x em diante) só passa a ser suportada depois que o plugin for testado nela. Até lá, o Redmine dessa versão não inicia com o plugin instalado: ele para com um erro que informa as versões suportadas.

## Funcionalidades

### Formatação de texto
- Negrito, itálico, sublinhado, tachado, subscrito e superscrito (Ctrl+, e Ctrl+.), código incorporado.
- Cor do texto e cor de fundo: uma paleta de 64 cores ou qualquer valor hexadecimal.
- Família de fontes (13 fontes) e tamanho de fonte (predefinições de 8 a 72 px, ou qualquer valor).
- Estilos de parágrafo: títulos 1–6 e texto normal.
- Alinhamento (esquerda, centro, direita, justificado) e indentação (até 8 níveis) de parágrafos e títulos.
- Links: inserir, editar, remover.
- Linha horizontal, desfazer e refazer.

### Listas
- Listas com marcadores de disco, círculo ou quadrado.
- Listas numeradas: 1, 01, a, A, i, I, α.
- Listas de tarefas com caixas de seleção; as tarefas concluídas são tachadas.
- Listas aninhadas (Tab / Shift+Tab).

### Tabelas
- Inserir uma tabela de qualquer tamanho, com ou sem linha de cabeçalho.
- Menu de clique direito em uma célula: adicionar e excluir linhas e colunas, mesclar e dividir células, linha de cabeçalho e coluna de cabeçalho, excluir a tabela.
- As larguras de coluna são alteradas arrastando as bordas das células.
- Colar do Excel mantém as larguras de coluna, alinhamento e tamanhos de fonte; uma tabela copiada do Redmine cola no Excel com bordas.

### Imagens e anexos
- Colar uma imagem da área de transferência: ela é enviada como um anexo e aparece no texto.
- As imagens anexadas com o campo de arquivo do Redmine, ou arrastadas para ele, também são inseridas no texto.
- Inserir uma imagem a partir dos anexos (um seletor de miniaturas) ou um link para qualquer anexo.
- Redimensionar uma imagem arrastando seus cantos.

### Código
- Blocos de código com destaque de sintaxe no editor e em páginas salvas: 52 idiomas, e você pode adicionar mais (veja [Destaque de sintaxe](#destaque-de-sintaxe)).
- A linguagem de um bloco é escolhida a partir de um crachá no canto superior direito, com pesquisa, idiomas recentes e frequentes.
- Tab e Shift+Tab indentem e removem a indentação de linhas dentro de um bloco de código; negrito, links e cores dentro do código são preservados.

### Blocos
- Bloco recolhível: um título com conteúdo oculto (`<details>`). Recolhido em páginas salvas, expandido no editor.
- Bloco de citação com uma linha de autor e data.

### Edição
- Modo `<HTML>` para ver e editar o código-fonte HTML: os blocos aninhados são indentados, uma linha em branco separa os blocos que ocupam várias linhas, a sintaxe é colorida pelas mesmas regras de um bloco de código HTML, e Enter mantém a indentação da linha.
- Digitação ao estilo Markdown: `#` para títulos, `-` e `1.` para listas, `[ ]` para tarefas, ```` ```python ```` para um bloco de código (qualquer nome de idioma ou nenhum), `**bold**`, `---` para uma linha horizontal. Atalhos de teclado padrão: Ctrl+B, Ctrl+I, Ctrl+U, Ctrl+Z e outros.
- O editor nunca fica mais alto que a janela: a barra de ferramentas e os botões do formulário permanecem visíveis, e o texto rola dentro. A altura segue o tamanho da janela e o zoom da página.
- Uma asa de redimensionamento no canto inferior direito define a altura manualmente. A altura é lembrada; clique duplo volta à altura automática.

### Integração com Redmine
- Funciona em todos os campos de texto do Redmine com formatação: descrições e notas de tarefas, páginas wiki, notícias, mensagens de fóruns, documentos, descrições de projetos, campos personalizados de texto longo, incluindo campos que aparecem na página mais tarde.
- O texto é armazenado como HTML. Para usar o editor, escolha *TipTap HTML* na formatação do texto nas configurações do Redmine.
- A interface (dicas de ferramentas, menus, diálogos) segue o idioma no perfil Redmine do usuário. 47 dos 50 idiomas do Redmine vêm com o plugin: Inglês e Russo são completos, os outros 45 são rascunhos feitos com um modelo de IA que falantes nativos são bem-vindos a corrigir. Os três idiomas escritos da direita para a esquerda (Árabe, Hebraico, Persa) não são deliberadamente suportados (veja [Idioma da interface](#idioma-da-interface)).
- Permanece rápido em textos grandes: editores em formulários ocultos são criados apenas quando o formulário é aberto, e blocos de código longos são destacados quando aparecem na visualização.
- Textos escritos no CKEditor (o plugin redmine_ckeditor) são mostrados como estavam e abrem no editor com sua formatação: sem conversão, veja [Migrando do CKEditor](#migrando-do-ckeditor).
- Textos salvos são mostrados sem HTML inseguro: scripts, manipuladores de eventos e links `javascript:` são removidos quando uma página é exibida, apenas o que o próprio editor produz é mantido. Isso cobre textos que vêm através da API REST ou do modo `<HTML>` também.

## Destaque de sintaxe

Blocos de código são destacados no editor e em páginas salvas igualmente. A linguagem de um bloco é escolhida a partir do crachá no canto superior direito; a lista tem uma caixa de pesquisa e lembra idiomas recentes e frequentes.

52 idiomas vêm com o plugin, incluindo HTML, 1C, Cisco IOS, MikroTik RouterOS, Windows cmd, docker compose, logs de serviço Linux e saída journalctl.

Você pode adicionar seus próprios idiomas. Cada idioma é um arquivo na pasta `highlight/`. Qualquer uma das 190+ gramáticas highlight.js, ou de terceiros, é convertida em um arquivo assim com um comando:

```sh
python3 highlight/_convert_grammar.py erlang
sh highlight/_compile.sh
```

Detalhes: [highlight/README/pt-BR.md](../highlight/README/pt-BR.md).

## Idioma da interface

O editor fala o idioma escolhido no perfil Redmine do usuário (Minha conta → Idioma). Arquivos para 47 dos 50 idiomas do Redmine vêm com o plugin, em `config/locales/`. O Inglês é a fonte e o Russo é do autor; os outros 45 são rascunhos feitos com a ajuda de um modelo de IA e ainda não foram revistos por falantes nativos, portanto, espere uma frase ocasional estranha. Um texto faltando em um arquivo é mostrado em Inglês.

Para corrigir uma tradução, altere seus valores em `config/locales/<code>.yml` (`de`, `fr`, `pt-BR`, ...) e reinicie o Redmine. `bundle exec rake redmine_tiptap:locales` verifica os arquivos. Pull requests com correções são bem-vindos.

**Os idiomas escritos da direita para a esquerda (Árabe, Hebraico, Persa) não são deliberadamente suportados.** Suportá-los requer muitas mudanças na base de código, não apenas uma tradução, e escolhemos não fazer isso. Para esses idiomas, o editor é mostrado em Inglês e seu layout não é ajustado. Se você precisar de um deles, faça um fork: o mecanismo de tradução está pronto, e o que mais precisa ser alterado está listado em [config/locales/README.md](../config/locales/README.md#right-to-left-languages).

Detalhes e lista dos idiomas Redmine: [config/locales/README.md](../config/locales/README.md).

## Instalação

1. Coloque o plugin na pasta `plugins` do Redmine. A pasta deve ser nomeada `redmine_tiptap`. A forma mais fácil é usar git, que também torna as atualizações um comando único:
   ```sh
   cd /path/to/redmine
   git clone --branch release --single-branch --depth 1 https://github.com/Du10777/redmine_tiptap.git plugins/redmine_tiptap
   ```
   O branch `release` tem apenas os arquivos de que o plugin precisa para funcionar, sem esta documentação, e `--depth 1` não baixa o histórico do repositório.
2. Reinicie o Redmine.
3. Nas configurações do Redmine (redmine.selfhosted/_settings_) escolha Formatação do texto: *TipTap HTML*.

## Atualização

O plugin não tem migrações de banco de dados, e o pacote JavaScript construído e a folha de estilo fazem parte do repositório. A atualização não requer npm nem uma compilação no servidor: substitua os arquivos do plugin e reinicie o Redmine.

Antes de atualizar, verifique se a nova versão suporta sua versão do Redmine (veja "Versões suportadas do Redmine" acima).

### Instalado com git (recomendado)

```sh
cd /path/to/redmine/plugins/redmine_tiptap
git pull
```

Depois reinicie o Redmine, por exemplo:

```sh
sudo systemctl restart redmine          # Redmine rodando como um serviço systemd
touch /path/to/redmine/tmp/restart.txt  # Passenger
docker compose restart redmine          # Docker
```

Para ficar em uma versão específica em vez da mais recente, baixe um commit do branch `release` e mude para ele: `git fetch --depth 1 origin <commit> && git checkout <commit>`.

Se o plugin foi instalado com um `git clone` comum (o branch `main`, com a documentação e todo o histórico), mude para o branch `release` uma única vez: exclua a pasta `plugins/redmine_tiptap` e instale o plugin de novo como descrito em [Instalação](#instalação). O plugin não guarda nada próprio na sua pasta, então nada se perde; apenas as linguagens de destaque de código que você mesmo adicionou precisam ser copiadas antes para fora de `highlight/`.

### Instalado a partir de um arquivo

1. Baixe o `redmine_tiptap.zip` da última release: https://github.com/Du10777/redmine_tiptap/releases/latest/download/redmine_tiptap.zip. Ele tem os mesmos arquivos do branch `release` (o plugin sem esta documentação). Exclua a pasta antiga `plugins/redmine_tiptap` e descompacte o arquivo no lugar dela; a pasta dentro dele já se chama `redmine_tiptap`. Excluir primeiro garante que os arquivos removidos na nova versão não fiquem para trás.
2. Exclua `public/assets/.manifest.json` na pasta do Redmine.
3. Reinicie o Redmine.

O passo 2 é importante. Na inicialização, o Redmine republica ativos do plugin apenas se os arquivos forem mais recentes que este manifesto. Os arquivos descompactados de um arquivo mantêm seus timestamps originais, portanto, sem o passo 2, o Redmine pode continuar servindo o editor antigo. O manifesto é recriado automaticamente na inicialização. Com `git pull`, este passo não é necessário: git atribui aos arquivos alterados a hora atual.

### Depois de atualizar

- O script e a folha de estilo do editor são servidos com uma impressão digital de conteúdo em seus URLs, portanto, os navegadores carregam a nova versão logo após a reinicialização. Os usuários não precisam limpar o cache do navegador.
- Se *Realizar cache de texto formatado* está habilitado nas configurações do Redmine (Administração → Configurações → Geral), limpe o cache do Redmine uma vez após atualizar para uma versão que muda como os textos são exibidos (limpeza de HTML, suporte para textos do CKEditor): `bundle exec rake tmp:cache:clear RAILS_ENV=production` na pasta do Redmine. Caso contrário, páginas renderizadas antes da atualização podem ser exibidas a partir do cache, limpas, até que seu texto mude.
- Versões anteriores do plugin copiavam o script para `public/tiptap_bundle.js`. Esses arquivos não são mais usados e podem ser excluídos:
  ```sh
  rm -f /path/to/redmine/public/tiptap_bundle.js /path/to/redmine/public/tiptap_bundle.js.map
  ```

## Migrando do CKEditor

Se seu Redmine usava [redmine_ckeditor](https://github.com/a-ono/redmine_ckeditor), você pode mudar para este plugin e manter todo o texto que foi escrito: tarefas, notas, páginas wiki, notícias, mensagens, documentos. Nada é convertido e o banco de dados não é tocado. O CKEditor armazena seus textos como HTML e este plugin também, então um texto armazenado é simplesmente exibido pelo novo formatador.

1. Instale o plugin (veja acima) e escolha Formatação do texto: *TipTap HTML*.
2. Mantenha a pasta `public/system/rich/` do seu Redmine. Se as pessoas inseriram imagens e arquivos com o navegador de imagens do CKEditor, eles são armazenados lá, e não no banco de dados nem entre os anexos, e os textos se referem a eles por endereço (`/system/rich/...`). **Se o Redmine for movido para outro servidor ou instalado do zero, mova esta pasta também**, junto com o banco de dados e a pasta `files/`: nenhum dos dois contém esses arquivos, e sem a pasta as imagens dos textos antigos retornam um erro 404. Os anexos de tarefas, páginas wiki etc. são armazenados como antes e não precisam de nada. As imagens inseridas neste editor são anexos normais. A pasta continua necessária depois de remover o redmine_ckeditor.
3. Remova redmine_ckeditor quando não precisar mais dela.

Um texto antigo é exibido como o CKEditor o exibia: fontes, tamanhos, cores e alinhamento, indentações, listas, tabelas (bordas, larguras, legendas, células mescladas), imagens (tamanho, flutuação, borda, uma imagem dentro de um link), links, blocos de código com seu idioma (destacado), macros Redmine (`{{toc}}`, `{{collapse(Title) ... }}`, `{{thumbnail(...)}}` etc.), links de wiki e tarefas, endereços web simples tornados clicáveis, e `<iframe>` incorporado (vídeo). Um texto escrito no CKEditor é reconhecido pela sua marcação e mantém o espaçamento entre parágrafos que tinha lá, que é maior que neste editor.

Diferenças intencionais:
- Um `<iframe>` é mostrado apenas quando aponta para outro site via http(s), e é em sandbox: a página dentro pode executar seus próprios scripts, mas não pode atingir a página do Redmine, abrir a janela superior ou enviar formulários. Todos os outros `<iframe>` são removidos.
- Os links abrem na mesma janela: o atributo `target` de um link (o "Nova Janela (_blank)" do CKEditor) não é mantido.
- Alguma formatação que o CKEditor oferecia mas suas páginas silenciosamente descartava é mostrada aqui: por exemplo, as cores de fundo dos seus estilos de "Marcador" e as aspas de `<q>`.
- O estilo "Special Container" do CKEditor (um bloco com uma moldura cinza) é mostrado como um bloco de código sem destaque de sintaxe, e no editor ele também é um bloco de código.

Um texto antigo mantém sua formatação quando é aberto no editor e salvo novamente: macros do Redmine (uma macro é um elemento cinza no editor; edite-a no modo `<HTML>`, como no modo Fonte do CKEditor), `<iframe>`, blocos `<div>` e `<address>` com seu estilo (um `<div>` colado de uma página web ainda é convertido em um parágrafo), subscritos e superscritos, estilos incorporados do CKEditor (grande, pequeno, teclado, amostra etc.), o estilo de títulos, tabelas e células de tabela, o tamanho (largura e altura), flutuação, borda e link de imagens, o idioma de blocos de código. O que não sobrevive à edição: a legenda de uma tabela torna-se um parágrafo centrado acima, as seções de cabeçalho e rodapé de uma tabela tornam-se linhas ordinárias (o rodapé fica na parte inferior) e `<del>` torna-se `<s>` (a mesma aparência). Um texto salvo a partir deste editor recebe o espaçamento compacto entre parágrafos deste editor.
