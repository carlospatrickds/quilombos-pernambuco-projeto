# Histórico de alterações

Registro cronológico das mudanças implementadas no projeto. Os horários seguem o fuso de Brasília (UTC−03:00).

## 2026-11-25

### 16:07 — Teste de fundo editorial com luz e sombras
- Criado o arquivo `assets/fundo-luz-sombras.svg`, com base marfim, granulação discreta e sombras orgânicas difusas inspiradas na referência do fundo do e-book.
- Aplicado o fundo à área principal do site, sem alterar cartões, painéis, mapa, controles ou tipografia.
- Mantida a faixa lateral terracota já existente.
- Atualizada a referência de cache de `css/style.css`.

**Arquivos alterados:** `assets/fundo-luz-sombras.svg`, `css/style.css`, `index.html`.

**Natureza da alteração:** teste visual reversível, sujeito à avaliação em desktop e celular.

### 15:38 — Reversão do teste de fundo verde-claro
- Removido o fundo verde-sálvia aplicado experimentalmente à área principal do site.
- Restaurado o fundo original da composição.
- Mantidas as demais aplicações da paleta ampliada: verde nos estados de seleção e indicadores secundários, areia nas superfícies e terracota nos destaques principais.
- Atualizada a referência de cache de `css/style.css`.

**Arquivos alterados:** `css/style.css`, `index.html`.

**Preservação:** nenhuma outra regra cromática, tipografia, estrutura, dado ou elemento cartográfico foi alterado.

### 15:35 — Correção do escopo do teste de fundo verde-claro
- Desfeito o teste anterior que aplicava verde-claro somente ao painel “A população quilombola em números”.
- Aplicado o verde-sálvia claro `#E8EBDD` à área principal do site, abrangendo abertura, indicadores, acordeão, mapa, nota editorial e rodapé, conforme a área delimitada na captura enviada.
- Cabeçalho superior preservado em palha `#F3EBDD`.
- O painel de indicadores voltou ao fundo original.
- Atualizada a referência de cache de `css/style.css`.

**Arquivos alterados:** `css/style.css`, `index.html`.

**Natureza da alteração:** teste visual reversível para avaliação da distribuição cromática.

### 15:31 — Teste de fundo verde-claro no painel principal
- Aplicado o tom verde-claro `#E8EBDD` exclusivamente ao fundo do painel “A população quilombola em números”.
- Cartões internos, indicadores, tipografia, seletores, fontes e demais seções permanecem inalterados.
- Atualizada a referência de cache do CSS para permitir a visualização do teste.

**Arquivos alterados:** `css/style.css`, `index.html`.

**Natureza da alteração:** teste visual reversível, sujeito à avaliação do usuário.

### 15:26 — Reforço da cor verde nos números dos painéis territoriais
- As capturas mostraram que os números do painel de mesorregião continuavam em terracota, apesar da regra geral já registrada.
- Reforçado o seletor CSS com escopo explícito para cartões municipais, mesorregionais e total do levantamento acadêmico.
- Aplicada a cor verde `#68734D` aos valores numéricos desses cartões.
- Renovada a versão de cache de `css/painel.css` para forçar o navegador a buscar a regra corrigida.

**Arquivos alterados:** `css/painel.css`, `index.html`.

**Preservação:** não foram alterados textos, dados, estrutura dos painéis, tipografia, mapas ou geometrias.

### 15:16 — Harmonização dos números nos painéis territoriais
- Os valores numéricos dos cartões de informação municipal e mesorregional passaram a usar o verde `#68734D`.
- O total do bloco de levantamento de comunidades do Agreste também recebeu o verde.
- Os títulos, textos, fundos e destaques terracota foram preservados.
- Atualizada a referência de cache de `css/painel.css`.

**Arquivos alterados:** `css/painel.css`, `index.html`.

**Preservação:** alteração restrita à cor dos números dos cartões de detalhe; dados, estrutura, cartografia e tipografia não foram modificados.

### 15:16 — Aplicação da paleta ampliada à interface editorial
- Mantido o terracota como cor principal de identidade e introduzido o verde `#68734D` como cor secundária de seleção, navegação e detalhes.
- Introduzida a areia `#D6BD91` em superfícies suaves dos indicadores e conteúdos informativos.
- Preservada a palha `#EDE6D8` como base clara e o grafite `#292B28` para contraste e leitura.
- Indicadores secundários receberam acentos verdes; o primeiro indicador mantém destaque terracota.
- Seletor territorial, controles de navegação, acordeão do Censo, destaques internos e elementos auxiliares receberam ajustes cromáticos.
- Atualizada a referência de cache de `css/style.css`.

**Arquivos alterados:** `css/style.css`, `index.html`.

**Preservação:** Fraunces e DM Sans mantidas. Não foram alterados `css/mapa.css`, arquivos GeoJSON, geometrias, cores temáticas dos mapas, camadas, enquadramento ou dados cartográficos.

### 11:28 — Etiqueta flutuante restrita ao mapa de Pernambuco
- A caixinha com o nome do município ou da mesorregião agora é exibida somente quando a escala ativa é Pernambuco.
- Nas escalas Brasil e Nordeste, a etiqueta não aparece.
- Aumentado o afastamento vertical do texto em relação ao ponto do cursor, para que a caixa fique acima do alfinete personalizado.
- Atualizados os identificadores de cache dos módulos JavaScript.

**Arquivos alterados:** `js/mapa.js`, `js/app.js`, `index.html`.

**Preservação:** alteração limitada ao tooltip de identificação. Não foram modificados mapas, geometrias, camadas, cores, zoom, dados ou tipografia.

### 11:24 — Restauração da combinação tipográfica editorial
- Restabelecida a Fraunces nos títulos principais, títulos de seções, números de destaque e elementos serifados da interface.
- Mantida a DM Sans nos textos corridos, controles, legendas e demais elementos funcionais.
- Confirmada a importação das duas famílias pelo Google Fonts; não foi introduzida a DM Serif.
- Atualizada a referência de cache de `css/style.css` para carregar as regras tipográficas novas.

**Arquivos alterados:** `css/style.css`, `index.html`.

**Preservação:** paleta de cores, estrutura dos painéis, indicadores, conteúdo e cartografia não foram alterados.

### 11:22 — Correção do carregamento do território após a compactação dos KPIs
- Identificado que o HTML mantinha a versão de cache anterior do módulo principal `js/app.js`, apesar da atualização de seu import para o módulo de indicadores.
- A versão antiga do módulo de indicadores ainda tentava atualizar o elemento `#regional-resident`, removido na nova estrutura de quatro KPIs. Esse erro interrompia a inicialização antes do registro do evento de carregamento do mapa, deixando a mensagem “Preparando o território” presa na tela.
- Atualizada a versão de cache de `js/app.js` em `index.html`, forçando o navegador a carregar o módulo principal e o módulo de indicadores compatíveis.

**Arquivos alterados:** `index.html`.

**Preservação:** nenhuma alteração nas fontes tipográficas, no CSS cartográfico, no JavaScript do mapa, nas geometrias ou nos dados territoriais.

### 11:17 — Reorganização compacta do painel “A população quilombola em números”
- Reduzida a altura vertical do bloco, com cabeçalho e seletor Brasil/Nordeste/Pernambuco na mesma linha em telas amplas.
- Reorganizados os indicadores em quatro cards horizontais: população quilombola, participação, residentes em territórios delimitados e residentes fora deles.
- Incorporada a população residente total ao subtítulo do KPI de participação, mantendo a atualização dinâmica conforme o recorte selecionado.
- Unificadas a nota explicativa e as fontes em uma faixa de rodapé.
- Reduzidos os espaçamentos entre o painel, o acordeão “O primeiro Censo Quilombola” e o mapa.
- Em telas menores, os quatro indicadores passam a uma grade compacta de duas colunas para preservar legibilidade.
- Atualizados os identificadores de cache do CSS e do módulo de dados.

**Arquivos alterados:** `index.html`, `css/style.css`, `js/dados-gerais.js`, `js/app.js`.

**Preservação:** paleta terrosa/bege, tipografia editorial, textos metodológicos e links de fonte mantidos. Nenhuma alteração nas geometrias, camadas ou lógica cartográfica.

### 11:09 — Posicionamento geográfico dos cartões de seleção
- Corrigido conflito entre a animação CSS de entrada e a propriedade `transform` usada pelo MapLibre para posicionar o cartão.
- A animação agora altera somente a opacidade; o posicionamento permanece vinculado às coordenadas exatas do clique.
- Mantido o comportamento de posicionamento automático do MapLibre para evitar que o cartão ultrapasse os limites visíveis do mapa.
- Atualizada a referência de cache do CSS.

**Arquivos alterados:** `css/mapa.css`, `index.html`.

**Preservação:** não foi necessário alterar `js/mapa.js`; os eventos já vinculavam os cartões a `event.lngLat`. Geometrias, camadas e dados cartográficos permanecem intactos.

### 11:06 — Correção definitiva da sobreposição da etiqueta da camada
- Identificado que o ajuste anterior só reposicionava a etiqueta em larguras de até 720 px; a captura enviada tinha largura superior a esse limite.
- Adicionada regra responsiva geral para ocultar a etiqueta de identificação da malha enquanto um cartão de seleção estiver aberto.
- Mantido o tooltip de passagem do cursor, que não aciona a ocultação.
- Atualizada a referência de cache do CSS no HTML.

**Arquivos alterados:** `css/mapa.css`, `index.html`.

**Preservação:** nenhuma alteração em JavaScript, camadas, geometrias, cores ou dados do mapa.

### 11:01 — Redução do cursor territorial
- Reduzido em 30% o tamanho visual do cursor personalizado (de 48 × 72 para 34 × 50 unidades SVG).
- Reposicionado o ponto ativo do cursor para acompanhar a nova dimensão e preservar a precisão do clique.
- Atualizada a referência de cache de `css/mapa.css` em `index.html`.

**Arquivos alterados:** `assets/cursor-lanca.svg`, `css/mapa.css`, `index.html`.

**Preservação:** nenhuma alteração na geometria do mapa, nas camadas cartográficas ou nos dados territoriais.

### 08:55 — Ajustes responsivos dos cartões do mapa
- Reposicionada, em telas móveis, a identificação da camada cartográfica para evitar sobreposição com o cartão de informações.
- Ajustada a largura máxima dos cartões de dados conforme a largura disponível no celular.
- Limitada a altura do cartão em dispositivos móveis, com rolagem interna quando o conteúdo exceder o espaço disponível.
- Refinada a hierarquia tipográfica do cartão: título, indicador principal, dados complementares e fonte.
- Ajustado o botão de fechamento do cartão para uso em telas pequenas.
- Atualizada a referência de cache de `css/mapa.css` em `index.html`.

**Arquivos alterados:** `css/mapa.css`, `index.html`.

**Preservação:** nenhuma alteração em `js/mapa.js`, nos arquivos GeoJSON, nas geometrias, nas cores ou no enquadramento cartográfico.

### Horário não registrado — Cursor e transições do mapa
- Adicionado cursor vetorial personalizado inspirado na imagem de referência fornecida.
- Definida animação de entrada de 1 segundo para os cartões flutuantes do mapa.
- Ajustada para 2 segundos a transição do painel de informações de Pernambuco.
- Atualizadas as referências de cache dos arquivos CSS em `index.html`.

**Arquivos alterados:** `assets/cursor-lanca.svg`, `css/mapa.css`, `css/painel.css`, `index.html`.

**Observação:** o horário exato dessa implementação anterior não foi registrado; por isso, não foi estimado.
