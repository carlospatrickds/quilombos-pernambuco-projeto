# Histórico de alterações

Registro cronológico das mudanças implementadas no projeto. Os horários seguem o fuso de Brasília (UTC−03:00).

## 2026-11-25

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
