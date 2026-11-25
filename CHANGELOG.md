# Histórico de alterações

Registro cronológico das mudanças implementadas no projeto. Os horários seguem o fuso de Brasília (UTC−03:00).

## 2026-11-25

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
