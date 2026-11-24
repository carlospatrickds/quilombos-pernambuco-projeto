# Documentação de continuidade — Atlas Territorial Quilombos de Pernambuco

**Versão:** 1.0  
**Data de atualização:** 24/11/2026  
**Repositório:** https://github.com/carlospatrickds/quilombos-pernambuco-projeto  
**Publicação:** https://carlospatrickds.github.io/quilombos-pernambuco-projeto/

## 1. Objetivo

Desenvolver um atlas territorial interativo dos municípios de Pernambuco, com foco na presença, história, memória e identidade das comunidades quilombolas. O mapa municipal em 3D é a interface de exploração; os dados estatísticos, registros comunitários, referências históricas e imagens devem ser apresentados com fonte, ano de referência e data de consulta.

O atlas é um produto educacional em desenvolvimento. Não substitui cadastros oficiais, processos de certificação, reconhecimento ou titulação.

## 2. Estado atual do projeto

### Concluído / funcional
- Aplicação web modular em HTML, CSS e JavaScript.
- Mapa vetorial com MapLibre GL JS.
- Malha municipal de Pernambuco carregada em GeoJSON.
- Identificação dos municípios por código geográfico IBGE e associação com nomes oficiais via API de Localidades do IBGE.
- Extrusão 3D dos polígonos e destaque/elevação do município selecionado.
- Painel lateral municipal com campos demográficos, comunidades, história e galeria.
- Busca municipal com sugestões/autocomplete por trecho do nome.
- Identidade visual editorial alinhada ao e-book: Fraunces + DM Sans; tons de areia, marrom avermelhado, marrom intenso e terracota.
- Publicação pelo GitHub Pages.
- Campos sem dados permanecem como “A verificar”; não preencher com números presumidos.

### Em desenvolvimento / não concluído
- Importação e validação dos dados municipais de população total do Censo 2022.
- Importação e validação da população quilombola por município.
- Cálculo e apresentação dos percentuais.
- Registro estruturado de fontes por indicador.
- Cadastro validado de comunidades por município.
- Situação de certificação, reconhecimento territorial, processo de regularização e titulação.
- Conteúdo histórico/editorial por município e comunidade.
- Fotografias, documentos e registros com crédito, contexto e autorização de uso.
- Testes completos de acessibilidade, responsividade, desempenho e qualidade dos dados.

## 3. Princípios editoriais e de dados

1. Toda informação factual deve indicar instituição responsável, título da fonte, ano/período de referência, data de consulta e URL.
2. Não misturar ano de referência com data de consulta ou data de atualização da base.
3. Não misturar população total do Censo 2022 com estimativas populacionais de anos posteriores sem apresentar claramente a diferença.
4. Não confundir população quilombola residente no município com população residente dentro de territórios quilombolas oficialmente delimitados.
5. Não confundir comunidade certificada pela Fundação Cultural Palmares com território identificado, delimitado, reconhecido ou titulado pelo INCRA.
6. Não presumir que toda comunidade se localiza integralmente em um único município; registrar casos intermunicipais e limites da fonte.
7. Não inventar comunidades, quantitativos, narrativas, imagens, autoria ou créditos.
8. Ausência de dado deve ser indicada como “não localizado”, “não disponível na fonte consultada” ou “em validação”, conforme o caso — não como zero.
9. Dados e cartografia devem ser versionados, com data de extração e nota sobre eventuais revisões.
10. O conteúdo histórico deve ser contextualizado e revisado; não reduzir a experiência quilombola ao período escravista ou a uma representação rural homogênea.


## 3.1 Diretriz de contraste e legibilidade do painel municipal

A revisão visual de 24/11/2026 definiu que os textos dos cartões demográficos devem usar contraste alto sobre o fundo areia, aproximando-se do marrom escuro da paleta editorial. Evitar tons bege, areia ou marrom claro em textos informativos, especialmente em telas móveis.

- Fundo dos cartões: areia quente `#F1E5D3`.
- Rótulos dos indicadores: marrom intenso `#3D2500`.
- Valores numéricos: marrom avermelhado `#783F32`.
- Textos auxiliares e códigos: marrom escuro `#4F3C28`.
- Texto descritivo: grafite amarronzado `#3D342B`.
- Rótulos com tamanho mínimo de 12 px e peso semibold; textos auxiliares com 11 px ou mais.
- Não reduzir contraste em nome de uma aparência suave; a prioridade é leitura confortável e acessibilidade.

Ajuste implementado em `css/painel.css` após avaliação do usuário em capturas reais de celular. Essa diretriz deve ser mantida em futuras alterações do painel.


## 3.2 Limites de escala, zoom e restauração da perspectiva 3D

Diretriz definida em 24/11/2026 a partir da avaliação visual do usuário:
- Afastamento máximo: escala de referência aproximada de **100 km** na barra cartográfica.
- Aproximação máxima: escala de referência aproximada de **10 km** na barra cartográfica.
- A escala intermediária de 50 km foi considerada legível e funcional; 20 km ainda deve permitir aproximação adicional até cerca de 10 km.
- Parâmetros iniciais do MapLibre: `minZoom: 7.2` e `maxZoom: 10.6`.
- Inclinação padrão: `pitch: 75`; orientação: `bearing: -8`.
- O botão de reinicialização deve limpar a seleção e restaurar enquadramento de Pernambuco, inclinação e orientação padrão.

**Nota técnica:** a leitura em quilômetros da barra de escala depende da latitude, da largura disponível do mapa e do dispositivo. Os níveis 7.2 e 10.6 são parâmetros iniciais calibrados pela referência visual enviada; devem ser testados em desktop e celular. Não tratar 100 km e 10 km como distâncias geográficas fixas entre os limites do mapa.

## 4. Base estatística — desenho metodológico

### 4.1 População municipal total
- **Status em 24/11/2026:** base integrada para os 184 municípios; dados apresentados no painel municipal.
- **Arquivo no projeto:** `data/populacao-municipal-censo-2022.js`.
- **Total dos 184 municípios:** 9.055.764 pessoas.
- **Fernando de Noronha:** 3.167 pessoas; mantido fora da camada municipal por ser distrito estadual.
- **Conferência:** 9.055.764 + 3.167 = 9.058.931, total estadual publicado pelo IBGE para 2022.
- **Fonte primária:** IBGE, Censo Demográfico 2022, SIDRA, tabela 4709 — população residente.
- **Fonte estadual de apoio/organização:** Observatório de Pernambuco, CONDEPE/FIDEM, fonte `sidra_censo_2022`.
- **Unidade:** pessoas.
- **Período de referência:** 2022.
- **Cobertura divulgada pela CONDEPE/FIDEM:** 185 localidades, incluindo municípios e Fernando de Noronha.
- **Consulta deste documento:** 24/11/2026.
- **Última carga indicada na página consultada:** 21/11/2026.
- **Links:**
  - https://sidra.ibge.gov.br/tabela/4709
  - https://www.cf.pe.gov.br/observatorio/fontes/sidra_censo_2022

A série municipal foi incorporada a partir da tabela por localidade da CONDEPE/FIDEM, que identifica o IBGE como fonte original. Os 184 registros foram associados por código IBGE. Fernando de Noronha foi separado, pois a própria fonte informa que a tabela inclui o distrito estadual além dos 184 municípios. A soma dos 184 municípios (9.055.764) com Fernando de Noronha (3.167) confere com o total estadual do IBGE (9.058.931). A conferência aritmética não substitui futura comparação linha a linha com a extração direta do SIDRA.

### 4.2 População quilombola
- **Fonte primária:** IBGE, Censo Demográfico 2022, SIDRA, tabela 9578 — população residente, total e quilombola, por localização do domicílio.
- **Unidade:** pessoas.
- **Período de referência:** 2022.
- **Recorte necessário:** Pernambuco, municípios, população quilombola total do município.
- **Consulta deste documento:** 24/11/2026.
- **Links:**
  - https://sidra.ibge.gov.br/tabela/9578
  - https://www.ibge.gov.br/brasil-quilombola/
  - https://www.ibge.gov.br/estatisticas/sociais/populacao/22827-censo-demografico-2022.html

A tabela 9578 também discrimina localização em/fora de territórios quilombolas oficialmente delimitados. Para o indicador “população quilombola do município”, somar as categorias de localização somente após confirmar no dicionário da tabela que são categorias mutuamente exclusivas e exaustivas. Preservar também os subtotais “em territórios” e “fora de territórios” como variáveis distintas, quando disponíveis. Não usar o total estadual como substituto de valores municipais.

### 4.3 Percentual de participação quilombola
Calcular apenas quando os dois valores do mesmo município e do mesmo período estiverem validados:

`participacao_quilombola = (populacao_quilombola_total / populacao_municipal_total) * 100`

- Usar o total de pessoas quilombolas residentes no município no numerador.
- Usar a população residente total do município no denominador.
- Armazenar valor sem arredondamento excessivo; exibir, por exemplo, duas casas decimais.
- Se um dos dados estiver ausente ou não comparável, exibir “A verificar”, não zero.

### 4.4 Controle de qualidade
Antes de publicar:
- validar os 184 códigos IBGE municipais;
- conferir duplicidades e municípios sem correspondência;
- conferir valores nulos, supressões e categorias;
- verificar se a soma municipal é compatível com o total estadual publicado, respeitando diferenças de cobertura e eventuais notas metodológicas;
- comparar os valores de população total com a fonte CONDEPE/FIDEM;
- registrar divergências e não as corrigir silenciosamente;
- salvar arquivo original baixado e arquivo tratado, com data, fonte e procedimento de transformação.

## 5. Estrutura de dados recomendada

A geometria municipal deve permanecer separada dos indicadores. A chave de integração é o código IBGE de sete dígitos.

Estrutura lógica sugerida para cada município:

```json
{
  "2607208": {
    "municipality": "Ipojuca",
    "ibge_code": "2607208",
    "reference_year": 2022,
    "population_total": null,
    "population_quilombola_total": null,
    "population_quilombola_in_delimited_territories": null,
    "population_quilombola_outside_delimited_territories": null,
    "quilombola_share_percent": null,
    "communities": [],
    "history": [],
    "photos": [],
    "sources": []
  }
}
```

Cada elemento em `sources` deve conter pelo menos: instituição, título, tabela/documento, URL, ano de referência, data de consulta, data de atualização/publicação se disponível, observação metodológica e indicador sustentado.

## 6. Fontes institucionais para as próximas camadas

### Fundação Cultural Palmares — certificação
A FCP informa que emite certidões de autodefinição e mantém cadastro geral de comunidades certificadas. A própria FCP esclarece que a certificação respeita a autodefinição; não é uma avaliação externa de quem pode ou não ser quilombola. A lista deve ser consultada e datada no momento da extração.
- Página: https://www.gov.br/palmares/pt-br/departamentos/protecao-preservacao-e-articulacao/certificacao-quilombola
- Dados abertos: https://www.gov.br/palmares/pt-br/acesso-a-informacao/dados-abertos

### INCRA — regularização territorial
O INCRA conduz a política federal de identificação, reconhecimento, delimitação, desintrusão e titulação de territórios quilombolas. Processos e etapas devem ser apresentados como situação administrativa, sem confundir abertura de processo, RTID, portaria, decreto e título.
- Página: https://www.gov.br/incra/pt-br/assuntos/governanca-fundiaria/quilombolas
- Quadro geral e processos: https://www.gov.br/incra/pt-br/assuntos/governanca-fundiaria/quilombolas/andamento-processos

### IBGE — conceito e distribuição
O IBGE explica que a identificação censitária de pessoas quilombolas decorre de autodeclaração e distingue residência dentro e fora de territórios oficialmente delimitados.
- Página: https://www.ibge.gov.br/brasil-quilombola/
- Publicação: https://www.ibge.gov.br/biblioteca/visualizacao/periodicos/3104/cd_2022_quilombolas.pdf

## 7. Cartografia e limites de interpretação

- Fonte cartográfica primária atualmente configurada: API de Malhas do IBGE, unidade da Federação 26, recorte municipal.
- Fonte alternativa configurada: CONDEPE/FIDEM, Malha Municipal de Pernambuco, edição 2025, versão 3.
- GeoJSON local opcional: `data/municipios-pe.geojson`.
- API de nomes municipais: API de Localidades do IBGE.
- Código geográfico IBGE é a chave de associação entre feição e ficha.

**Atenção temporal:** malha municipal 2025 e dados do Censo 2022 possuem referências temporais diferentes. Para análises que dependam de comparabilidade estrita com a geografia censitária, verificar e utilizar a malha de referência do Censo 2022. Não afirmar que a geometria 2025 é a malha censitária 2022.

A população municipal é um indicador estatístico agregado. Não deve ser representada como se delimitasse a extensão física de uma comunidade ou território quilombola. Uma camada futura de territórios quilombolas exige geometrias oficiais próprias e metadados de situação fundiária.

## 8. Identidade visual aprovada

Referência aprovada pelo responsável pelo projeto em 24/11/2026:
- Fundo cartográfico areia claro.
- Municípios em marrom terroso.
- Divisas municipais finas, claras e discretas.
- Elevação 3D moderada.
- Município selecionado em laranja queimado.
- Linguagem editorial cultural contemporânea.
- Tipografia: Fraunces para títulos e DM Sans para interface/textos funcionais.
- Paleta editorial do e-book: #783F32, #3D2500, terracota, areia/off-white e grafite #292B28.

A captura de tela aprovada pelo responsável é a referência visual para futuras alterações. Não modificar cores, espessuras, enquadramento ou relevo sem comparar com essa referência e validar no navegador.


## 8.1 Limite de aproximação do mapa

Em 24/11/2026 foi definido limite de zoom máximo `8.2` no MapLibre GL JS, aplicado tanto à navegação manual quanto ao enquadramento automático do município selecionado. O objetivo é impedir aproximações excessivas que retirem a referência visual do território pernambucano e dificultem a seleção de municípios vizinhos. A escala física em quilômetros varia conforme a largura da tela e a latitude; portanto, o limite 8.2 é um parâmetro de zoom, não uma distância fixa de 50 km. Ajustar somente após teste visual em celular e desktop.

## 9. Regras de manutenção e publicação

- Desenvolver em módulos separados: HTML, CSS, JavaScript e dados.
- Não incorporar estatísticas diretamente ao GeoJSON.
- Manter arquivos-fonte e dados tratados identificáveis.
- Testar localmente com servidor HTTP antes de publicar.
- Verificar o GitHub Pages após cada alteração.
- Usar `Ctrl + F5` para descartar cache durante testes.
- Registrar commits com mensagens que descrevam a alteração.
- Não declarar uma funcionalidade concluída antes de testá-la no site publicado.

## 10. Histórico desta documentação

- **24/11/2026:** consolidação do estado do protótipo, definição da próxima etapa demográfica, registro das fontes iniciais e do roteiro de desenvolvimento.


### Correção adicional — reforço dos limites de zoom (24/11/2026)
A captura de teste mostrou que o mapa ainda permitia afastamento até escala de 1.000 km. O código foi corrigido para aplicar `setMinZoom(7.2)` e `setMaxZoom(10.6)` diretamente na instância do mapa, tanto na criação quanto após o evento `load` e na reinicialização. O resultado precisa ser novamente validado no site publicado, pois a escala exibida depende também do dispositivo e do tamanho do contêiner.


### Ajuste fino do afastamento máximo (24/11/2026)
Após teste do usuário, o limite mínimo foi ajustado de `7.2` para `6.2` para permitir um nível adicional de afastamento, visando retornar à escala aproximada de 100 km (em vez de parar em 50 km). O zoom inicial permanece em `7.2`, e o limite de aproximação permanece em `10.6`. Validar a escala real no dispositivo após publicação.


### Correção da aproximação excessiva — 24/11/2026
O usuário constatou que o limite anterior permitia aproximação até aproximadamente 5 km, abaixo do desejado. Reduzido `maxZoom` de `10.6` para `9.6` (redução de um nível de zoom, equivalente aproximadamente a dobrar a largura da escala: 5 km → 10 km). Mantido `minZoom: 6.2` para o afastamento pretendido de aproximadamente 100 km. Não alterar novamente os dois limites em conjunto: `minZoom` controla o afastamento máximo; `maxZoom` controla a aproximação máxima.


### Revisão de navegação e perspectiva — 24/11/2026
A pedido do usuário, a visualização inicial e a reinicialização passam a ser planas (2D): `pitch: 0` e `bearing: 0`. Os limites de zoom foram redefinidos considerando o sentido dos controles MapLibre: o botão **menos (−)** afasta e deve parar próximo da escala de 100 km (`minZoom: 5.2`); o botão **mais (+)** aproxima e deve parar próximo de 20 km (`maxZoom: 7.5`). Os níveis são calibração inicial baseada nas capturas de tela e devem ser conferidos na barra de escala do dispositivo; a escala varia com a dimensão do contêiner e a latitude. A ficha de município também respeita os mesmos limites.


### Correção de cache e calibração final do zoom — 24/11/2026
A captura ainda indicava 3 km, incompatível com o limite esperado. A configuração anterior não estava refletindo a alteração na tela, possivelmente por cache dos módulos. Foram acrescentados identificadores de versão às URLs de `app.js`, `mapa.js` e `config.js` para forçar o navegador a carregar a cadeia atualizada. `minZoom` foi ajustado para 4.2 (afastamento pretendido: 100 km) e `maxZoom` mantido em 7.5 (aproximação pretendida: 20 km). Perspectiva padrão 2D: pitch 0°, bearing 0°. Validar a escala efetiva após o deploy; não presumir conclusão antes do teste.


### Aceite da navegação e encerramento da etapa — 24/11/2026
O responsável pelo projeto informou que, após testar no celular, o comportamento do mapa está aceitável e autorizou avançar para a próxima etapa. A configuração desejada permanece: visualização inicial plana (2D), aproximação limitada a aproximadamente 20 km pelo botão (+) e afastamento limitado a aproximadamente 100 km pelo botão (−). Foi observada discrepância no computador, possivelmente relacionada a cache ou renderização, mas ela não bloqueia o avanço neste momento. A revisão em desktop fica registrada como pendência da fase de qualidade/responsividade (Fase 10). Não declarar que o comportamento desktop foi validado.


### Ajuste responsivo do afastamento máximo — 24/11/2026
A pedido do responsável, o afastamento máximo no celular foi ampliado de aproximadamente 100 km para aproximadamente 200 km, pois a área útil da tela é menor. A configuração agora diferencia dispositivos por largura de viewport: desktop `minZoom: 4.2` (alvo ~100 km), celular até 700 px `mobileMinZoom: 3.2` (alvo ~200 km). O limite de aproximação permanece `maxZoom: 7.5` (alvo ~20 km) em ambos. A seleção de município, enquadramento automático e botão de reinicialização usam o limite correspondente ao dispositivo. O mapa permanece 2D por padrão. Escalas em km são aproximadas e devem ser conferidas em cada viewport.


## Vinheta cartográfica municipal no painel lateral — 25/11/2026
Foi implementada no cabeçalho do painel lateral de detalhes uma vinheta cartográfica vetorial dinâmica. Ao selecionar um município, o sistema usa a geometria GeoJSON da própria feição selecionada (Polygon ou MultiPolygon), calcula seus limites e desenha o contorno em SVG, com preenchimento terracota `#D66A32` e contorno claro. O desenho fica acima/ao fundo do rótulo “Território quilombola”, preservando o título e a sigla PE. A solução não usa imagem externa nem captura de tela: a forma deriva da mesma malha municipal usada no mapa, garantindo correspondência geométrica e nitidez em diferentes telas. A atualização ocorre a cada seleção municipal. Arquivos alterados: `js/panel.js`, `css/painel.css`, `index.html` e `js/app.js` (versionamento para evitar cache).
