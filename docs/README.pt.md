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

> *Esta tradução foi feita com a ajuda de um modelo de IA e não foi revista por um falante nativo. Se encontrar um erro, abra um [problema ou um pedido de pull](https://github.com/Du10777/redmine_tiptap).*

Este é um editor de texto para Redmine, baseado em TipTap https://github.com/ueberdosis/tiptap

Versões suportadas do Redmine:

| Redmine | Suportada | Testado em |
|---|---|---|
| 7.x | sim | 7.0.2 |
| 6.x | sim | 6.1.4, 6.1.5 |
| 5.x e anteriores | não | — |

Uma nova versão principal (8.x em diante) só passa a ser suportada depois de o plugin ter sido testado nela. Até lá, o Redmine dessa versão não arranca com o plugin instalado: para com um erro que indica as versões suportadas.

Motor do editor: **TipTap 3.31.4**. Todos os pacotes `@tiptap/*` estão fixados a esta versão exata em `package.json` e `package-lock.json` e devem ser sempre atualizados em conjunto, para uma e a mesma versão.

## Funcionalidades

**Formatação de texto**
- Negrito, itálico, sublinhado, rasurado, subscrito e superscrito (Ctrl+, e Ctrl+.), código incorporado.
- Cor do texto e cor de fundo: uma paleta de 64 cores ou qualquer valor hexadecimal.
- Família de fontes (13 fontes) e tamanho de fonte (predefinições de 8 a 72 px, ou qualquer valor).
- Estilos de parágrafo: títulos 1–6 e texto normal.
- Alinhamento (esquerda, centro, direita, justificado) e indentação (até 8 níveis) de parágrafos e títulos.
- Ligações: inserir, editar, remover.
- Linha horizontal, desfazer e refazer.

**Listas**
- Listas com marcas de disco, círculo ou quadrado.
- Listas numeradas: 1, 01, a, A, i, I, α.
- Listas de tarefas com caixas de verificação; as tarefas concluídas são riscadas.
- Listas aninhadas (Tab / Shift+Tab).

**Tabelas**
- Inserir uma tabela de qualquer tamanho, com ou sem uma linha de cabeçalho.
- Menu de clique direito numa célula: adicionar e eliminar linhas e colunas, unir e dividir células, linha de cabeçalho e coluna de cabeçalho, eliminar a tabela.
- As larguras de coluna são alteradas arrastando as bordas das células.
- Colar do Excel mantém as larguras de coluna, alinhamento e tamanhos de fonte; uma tabela copiada do Redmine cola no Excel com bordas.

**Imagens e anexos**
- Colar uma imagem da área de transferência: é carregada como um anexo e aparece no texto.
- As imagens anexadas com o campo de ficheiro do Redmine, ou colocadas nele, também são inseridas no texto.
- Inserir uma imagem a partir dos anexos (um seletor de miniaturas) ou uma ligação para qualquer anexo.
- Redimensionar uma imagem arrastando seus cantos.

**Código**
- Blocos de código com destaque de sintaxe no editor e em páginas guardadas: 52 idiomas, e pode adicionar mais (consulte [Destaque de sintaxe](#destaque-de-sintaxe)).
- A linguagem de um bloco é escolhida a partir de um distintivo no seu canto superior direito, com pesquisa, idiomas recentes e frequentes.
- Tab e Shift+Tab recuam e diminuem o recuo das linhas dentro de um bloco de código; o negrito, as ligações e as cores dentro do código são mantidos.

**Blocos**
- Bloco colapsável: um título com conteúdo oculto (`<details>`). Recolhido em páginas guardadas, expandido no editor.
- Bloco de citação com uma linha de autor e data.

**Edição**
- Modo `<HTML>` para ver e editar a fonte HTML: os blocos aninhados são indentados, uma linha em branco separa os blocos que ocupam várias linhas, a sintaxe é colorida segundo as mesmas regras de um bloco de código HTML, e Enter mantém a indentação da linha.
- Escrita ao estilo Markdown: `#` para títulos, `-` e `1.` para listas, `[ ]` para tarefas, ```` ```python ```` para um bloco de código (qualquer nome de idioma ou nenhum), `**bold**`, `---` para uma linha horizontal. Atalhos de teclado padrão: Ctrl+B, Ctrl+I, Ctrl+U, Ctrl+Z e outros.
- O editor nunca fica mais alto do que a janela: a barra de ferramentas e os botões do formulário ficam à vista, e o texto deslocar-se dentro. A altura segue o tamanho da janela e o zoom da página.
- Uma asa de redimensionamento no canto inferior direito define a altura manualmente. A altura é memorizada; fazer duplo clique volta à altura automática.

**Integração com Redmine**
- Funciona em todos os campos de texto do Redmine com formatação: descrições e notas de tarefas, páginas da wiki, notícias, mensagens de fóruns, documentos, descrições de projetos, campos personalizados de texto longo, incluindo campos que aparecem na página mais tarde.
- O texto é armazenado como HTML. Para usar o editor, escolha *TipTap HTML* na formatação do texto nas configurações do Redmine.
- A interface (dicas de ferramentas, menus, diálogos) segue a linguagem no perfil Redmine do utilizador. 47 dos 50 idiomas do Redmine vêm com o plugin: Inglês e Russo são completos, os outros 45 são rascunhos feitos com um modelo de IA que os falantes nativos são bem-vindos a corrigir. Os três idiomas escritos da direita para a esquerda (Árabe, Hebraico, Persa) não são deliberadamente suportados (consulte [Idioma da interface](#idioma-da-interface)).
- Permanece rápido em textos grandes: os editores em formulários ocultos são criados apenas quando o formulário é aberto, e os blocos de código longos são destacados quando deslocam para a vista.
- Os textos escritos no CKEditor (o plugin redmine_ckeditor) são mostrados da forma como eram e abrem no editor com a sua formatação: sem conversão, consulte [Migração do CKEditor](#migração-do-ckeditor).
- Os textos guardados são mostrados sem HTML inseguro: scripts, manipuladores de eventos e ligações `javascript:` são removidos quando uma página é apresentada, apenas o que o próprio editor produz é mantido. Isto cobre textos que vêm através da API REST ou do modo `<HTML>` também.

## Destaque de sintaxe

Os blocos de código são destacados no editor e em páginas guardadas da mesma forma. A linguagem de um bloco é escolhida a partir do distintivo no seu canto superior direito; a lista tem uma caixa de pesquisa e memoriza idiomas recentes e frequentes.

52 idiomas vêm com o plugin, entre eles HTML, 1C, Cisco IOS, MikroTik RouterOS, Windows cmd, docker compose, registos de serviço Linux e saída journalctl.

Pode adicionar seus próprios idiomas. Cada idioma é um ficheiro na pasta `highlight/`. Qualquer uma das 190+ gramáticas highlight.js, ou de terceiros, é convertida num ficheiro assim com um comando:

```sh
python3 highlight/_convert_grammar.py erlang
sh highlight/_compile.sh
```

Detalhes: [highlight/README/pt.md](../highlight/README/pt.md).

## Idioma da interface

O editor fala o idioma escolhido no perfil Redmine do utilizador (Minha conta → Língua). Ficheiros para 47 dos 50 idiomas do Redmine vêm com o plugin, em `config/locales/`. O Inglês é a fonte e o Russo é do autor; os outros 45 são rascunhos feitos com a ajuda de um modelo de IA e ainda não foram revistos por falantes nativos, portanto, espere uma frase ocasional estranha. Um texto em falta num ficheiro é mostrado em Inglês.

Para corrigir uma tradução, altere seus valores em `config/locales/<code>.yml` (`de`, `fr`, `pt-BR`, ...) e reinicie o Redmine. `bundle exec rake redmine_tiptap:locales` verifica os ficheiros. Pedidos de pull com correções são bem-vindos.

**Os idiomas escritos da direita para a esquerda (Árabe, Hebraico, Persa) não são deliberadamente suportados.** Apoiá-los requer muitas alterações à base de código, não apenas uma tradução, e escolhemos não avançar com isso. Para esses idiomas, o editor é mostrado em Inglês e o seu layout não é ajustado. Se precisar de um deles, faça uma bifurcação: o mecanismo de tradução está pronto, e o que mais tem de ser alterado está listado em [config/locales/README.md](../config/locales/README.md#right-to-left-languages).

Detalhes e lista dos idiomas Redmine: [config/locales/README.md](../config/locales/README.md).

## Instalação

1. Coloque o plugin na pasta `plugins` do Redmine. A pasta deve ser nomeada `redmine_tiptap`. A forma mais fácil é git, que também torna as atualizações um comando único:
   ```sh
   cd /path/to/redmine
   git clone https://github.com/Du10777/redmine_tiptap.git plugins/redmine_tiptap
   ```
2. Reinicie o Redmine.
3. Nas configurações do Redmine (redmine.selfhosted/_settings_) escolha Formatação do texto: *TipTap HTML*.

## Atualização

O plugin não possui migrações de base de dados, e o pacote JavaScript construído e a folha de estilo fazem parte do repositório. A atualização não requer npm nem uma compilação no servidor: substitua os ficheiros do plugin e reinicie o Redmine.

Antes de atualizar, verifique que a nova versão suporta a sua versão do Redmine (consulte "Versões suportadas do Redmine" acima).

### Instalado com git (recomendado)

```sh
cd /path/to/redmine/plugins/redmine_tiptap
git pull
```

Depois reinicie o Redmine, por exemplo:

```sh
sudo systemctl restart redmine          # Redmine em execução como um serviço systemd
touch /path/to/redmine/tmp/restart.txt  # Passenger
docker compose restart redmine          # Docker
```

Para manter-se numa versão específica em vez do último commit: `git fetch && git checkout <tag-or-commit>`.

### Instalado a partir de um arquivo

1. Elimine a pasta antiga `plugins/redmine_tiptap` e desempacote a nova versão no seu lugar. Eliminar primeiro garante que os ficheiros removidos na nova versão não ficam retidos.
2. Elimine `public/assets/.manifest.json` na pasta do Redmine.
3. Reinicie o Redmine.

O passo 2 é importante. No arranque, o Redmine republica os ativos do plugin apenas se os ficheiros forem mais recentes do que este manifesto. Os ficheiros desempacotados a partir de um arquivo mantêm seus registos de tempo originais, portanto, sem o passo 2, o Redmine pode continuar servindo o editor antigo. O manifesto é recriado automaticamente no arranque. Com `git pull`, este passo não é necessário: o git dá aos ficheiros alterados o tempo atual.

### Depois de atualizar

- O script e a folha de estilo do editor são servidos com uma impressão de conteúdo nos seus URLs, portanto, os navegadores carregam a nova versão logo após o reinício. Os utilizadores não precisam de limpar a memória cache do seu navegador.
- Se *Colocar formatação do texto na memória cache* está ativada nas configurações do Redmine (Administração → Configurações → Geral), limpe a memória cache do Redmine uma vez após a atualização para uma versão que muda como os textos são mostrados (limpeza de HTML, suporte de textos do CKEditor): `bundle exec rake tmp:cache:clear RAILS_ENV=production` na pasta do Redmine. Caso contrário, as páginas renderizadas antes da atualização podem ser mostradas a partir da memória cache, limpas, até que o seu texto mude.
- As versões anteriores do plugin copiaram o script para `public/tiptap_bundle.js`. Esses ficheiros não são mais utilizados e podem ser eliminados:
  ```sh
  rm -f /path/to/redmine/public/tiptap_bundle.js /path/to/redmine/public/tiptap_bundle.js.map
  ```

## Migração do CKEditor

Se o seu Redmine usava [redmine_ckeditor](https://github.com/a-ono/redmine_ckeditor), pode mudar para este plugin e manter todo o texto que foi escrito: tarefas, notas, páginas da wiki, notícias, mensagens, documentos. Nada é convertido e a base de dados não é tocada. O CKEditor armazena seus textos como HTML e este plugin também, portanto, um texto armazenado é simplesmente mostrado pelo novo formatador.

1. Instale o plugin (consulte acima) e escolha Formatação do texto: *TipTap HTML*.
2. Mantenha a pasta `public/system/rich/` do seu Redmine. Se as pessoas inseriram imagens e ficheiros com o navegador de imagens do CKEditor, estes são armazenados lá, e não na base de dados nem entre os anexos, e os textos referem-se a eles por endereço (`/system/rich/...`). **Se o Redmine for movido para outro servidor ou instalado de novo, mova também esta pasta**, juntamente com a base de dados e a pasta `files/`: nenhuma delas contém estes ficheiros, e sem a pasta as imagens dos textos antigos devolvem um erro 404. Os anexos de tarefas, páginas da wiki e afins são armazenados como antes e não precisam de nada. As imagens inseridas neste editor são anexos normais. A pasta continua a ser necessária depois de remover o redmine_ckeditor.
3. Remova redmine_ckeditor quando deixar de precisar.

Um texto antigo é mostrado da forma como o CKEditor o mostrava: fontes, tamanhos, cores e alinhamento, recuos, listas, tabelas (bordas, larguras, legendas, células mescladas), imagens (tamanho, flutuação, borda, uma imagem dentro de uma ligação), ligações, blocos de código com o seu idioma (destacado), macros Redmine (`{{toc}}`, `{{collapse(Title) ... }}`, `{{thumbnail(...)}}` e afins), ligações de wiki e tarefas, endereços web simples feitos clicáveis, e `<iframe>` incorporado (vídeo). Um texto escrito no CKEditor é reconhecido pela sua marcação e mantém o espaçamento entre parágrafos que tinha lá, que é maior do que neste editor.

Diferenças intencionais:
- Um `<iframe>` é mostrado apenas quando aponta para outro site sobre http(s), e é em sandbox: a página dentro pode executar seus próprios scripts, mas não pode alcançar a página do Redmine, abrir a janela superior ou enviar formulários. Todos os outros `<iframe>` são removidos.
- As ligações abrem na mesma janela: o atributo `target` de uma ligação (o "Nova Janela (_blank)" do CKEditor) não é mantido.
- Alguma formatação que o CKEditor oferecia mas suas páginas silenciosamente descartava é mostrada aqui: por exemplo, as cores de fundo dos seus estilos de "Marcador" e as aspas de `<q>`.
- O estilo "Special Container" do CKEditor (um bloco com uma moldura cinza) é mostrado como um bloco de código sem destaque de sintaxe, e no editor também é um bloco de código.

Um texto antigo mantém a sua formatação quando é aberto no editor e guardado novamente: macros do Redmine (uma macro é um elemento cinza no editor; edite-a no modo `<HTML>`, como no modo Fonte do CKEditor), `<iframe>`, blocos `<div>` e `<address>` com o seu estilo (um `<div>` colado de uma página web continua a ser convertido num parágrafo), subscritos e superscritos, estilos incorporados do CKEditor (grande, pequeno, teclado, amostra e afins), o estilo de títulos, tabelas e células de tabela, o tamanho (largura e altura), flutuação, borda e ligação de imagens, o idioma dos blocos de código. O que não sobrevive à edição: a legenda de uma tabela torna-se um parágrafo centrado acima dela, as seções de cabeçalho e rodapé de uma tabela tornam-se linhas ordinárias (o rodapé fica na parte inferior) e `<del>` torna-se `<s>` (a mesma aparência). Um texto guardado a partir deste editor recebe o espaçamento compacto entre parágrafos deste editor.
