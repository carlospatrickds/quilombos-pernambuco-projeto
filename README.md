# Quilombos de Pernambuco — Atlas territorial

> **Política permanente de dados:** consulte [`docs/POLITICA_DE_FONTES_E_VALIDACAO_DOS_DADOS.md`](docs/POLITICA_DE_FONTES_E_VALIDACAO_DOS_DADOS.md) antes de incluir, corrigir ou publicar números e registros quilombolas.\n> **Histórico de alterações:** consulte [`CHANGELOG.md`](CHANGELOG.md) para acompanhar as mudanças do projeto, com data, horário de Brasília e arquivos afetados.


> **Base Mestra Quilombola de Pernambuco:** consulte [`docs/BASE_MESTRA_QUILOMBOLA_PERNAMBUCO.md`](docs/BASE_MESTRA_QUILOMBOLA_PERNAMBUCO.md) para a estrutura de comunidades, localidades e territórios, as fontes censitárias e o protocolo de consolidação.

Protótipo modular de mapa municipal 3D com estética cartográfica elevada e fundo escuro/terroso.

## O que está implementado

- Mapa vetorial em MapLibre GL JS.
- Polígonos municipais carregados a partir de GeoJSON.
- Extrusão 3D discreta de todos os municípios.
- Município selecionado elevado e destacado.
- Painel lateral com ficha territorial.
- Busca por nome do município.
- População municipal do Censo 2022 integrada para os 184 municípios, por código IBGE.
- Estrutura separada para dados quilombolas, comunidades, textos e fotografias.
- Campos sem dados exibem “A verificar”; nenhum valor municipal foi inventado.

## Fonte cartográfica

**Fonte primária: IBGE — Malha Municipal Digital 2025.** O aplicativo consulta a API pública de Malhas do IBGE para obter a geometria dos municípios de Pernambuco:

https://servicodados.ibge.gov.br/api/v3/malhas/estados/26?formato=application/vnd.geo+json&qualidade=minima&intrarregiao=municipio

Página institucional:
https://www.ibge.gov.br/geociencias/todos-os-produtos-geociencias/15774-malhas.html

A API retorna a malha em GeoJSON, com divisões municipais. O código geográfico é usado como identificador para relacionar as fichas e os dados demográficos.

**Fonte alternativa de geometria:** CONDEPE/FIDEM — Malha Municipal de Pernambuco, edição 2025, versão 3, publicada em 21/05/2026, EPSG:4674 / SIRGAS 2000. É a cartografia oficial estadual do Arquivo Gráfico Municipal, fruto de cooperação técnica com o IBGE.

Página:
https://www.cf.pe.gov.br/dados

GeoJSON:
https://www.cf.pe.gov.br/downloads/malha-municipal/2025-v3/malha-pe-2025-v3.geojson

SHA-256 publicado pela CONDEPE/FIDEM:
`942c5cde14d4388e906f338b4f6c50079096b0964c6a266e9670221e54220ad6`

**Nota metodológica:** os limites municipais de 2025 não devem ser confundidos com os recortes territoriais usados na divulgação do Censo 2022. Para análises estritamente comparáveis ao Censo, deve-se considerar a malha de referência de 2022.

## Instalação dos dados geográficos

1. Baixe o GeoJSON pelo endereço oficial acima.
2. Salve o arquivo com o nome `municipios-pe.geojson` dentro da pasta `data/`.
3. O aplicativo tenta primeiro carregar `data/municipios-pe.geojson`. Se não encontrar, consulta a API oficial do IBGE; se ela estiver indisponível, tenta o GeoJSON da CONDEPE/FIDEM.

> Se o navegador bloquear a consulta remota por CORS ou a conexão estiver indisponível, use o arquivo local.

## Como executar

Não abra `index.html` diretamente pelo explorador de arquivos. Execute um servidor local na pasta do projeto.

### Python
```bash
python -m http.server 8000
```
Depois acesse:
http://localhost:8000

### VS Code
Instale a extensão Live Server, clique com o botão direito em `index.html` e escolha “Open with Live Server”.

## Estrutura

```text
quilombos-pernambuco/
├── index.html
├── README.md
├── css/
│   ├── style.css
│   ├── mapa.css
│   └── painel.css
├── js/
│   ├── app.js
│   ├── config.js
│   ├── data.js
│   ├── mapa.js
│   └── panel.js
├── data/
│   └── dados-municipais.modelo.json
└── assets/
    ├── images/
    └── icons/
```

## Como adicionar dados municipais

Os dados ficam separados da geometria. A população municipal de 2022 está em `data/populacao-municipal-censo-2022.js` e é conectada por `js/data.js`. Os dados quilombolas e editoriais serão incorporados usando a chave do código IBGE:

```js
export const MUNICIPAL_DATA = {
  "codigo_ibge": {
    populationTotal: 0,
    populationQuilombola: 0,
    communities: ["Nome confirmado da comunidade"],
    history: "Texto revisado e referenciado.",
    photos: [
      { url: "assets/images/foto.jpg", caption: "Legenda e crédito" }
    ],
    sourceNote: "Fonte, ano, tabela e link."
  }
};
```

Não use os zeros do exemplo como dado real. Informe números apenas quando a fonte estiver confirmada. A proporção é calculada automaticamente quando os dois valores estão preenchidos.

## Próximas etapas recomendadas

1. Confirmar o esquema de atributos do GeoJSON após o download.
2. Integrar e validar a população quilombola municipal do Censo 2022 (tabela SIDRA 9578).
3. Construir uma base revisada de comunidades quilombolas por município, distinguindo certificação, reconhecimento e titulação.
4. Inserir fotografias com autorização, crédito e legenda.
5. Acrescentar fontes e referências em cada ficha.

## Bibliotecas

MapLibre GL JS 4.7.1, carregada por CDN. O projeto não utiliza framework ou build step nesta fase.


## Ajustes de visualização — revisão 1

- Corrigida a regra CSS do estado `hidden` do carregador, que podia permanecer sobre o mapa mesmo após a carga dos 185 polígonos.
- O mapa agora calcula os limites do GeoJSON e enquadra automaticamente todo o território de Pernambuco.
- Reforçada discretamente a extrusão padrão para tornar o relevo perceptível em escala estadual.


## Publicar no GitHub Pages

1. Envie a pasta inteira `quilombos-pernambuco` para a raiz do repositório (o arquivo `index.html` precisa ficar na raiz publicada).
2. No GitHub, abra **Settings → Pages**.
3. Em **Build and deployment**, selecione **Deploy from a branch**.
4. Escolha a branch `main` e a pasta `/ (root)`; salve.
5. Aguarde o GitHub informar o endereço publicado.

O projeto usa caminhos relativos (`./css`, `./js`, `./data`), adequados a um site de projeto no formato `https://usuario.github.io/nome-do-repositorio/`. Não renomeie nem mova isoladamente as pastas `css`, `js` e `data`.

Se abrir no GitHub o código-fonte do repositório, isso não é o site publicado. Use o endereço exibido em **Settings → Pages**. Para diagnosticar o endereço público específico, é necessário conferir a URL do repositório e a URL do Pages.

## Nomes dos municípios

O GeoJSON da API de Malhas do IBGE fornece o atributo `codarea` (geocódigo), que identifica o polígono. O aplicativo consulta também a API de Localidades do IBGE e associa o nome oficial pelo código de sete dígitos. Os rótulos aparecem ao aproximar o mapa para evitar sobreposição de 184 nomes em uma visão estadual; o nome também aparece na ficha ao selecionar a área.


## Documentação e roadmap do projeto

A documentação consolidada de escopo, fontes, metodologia, estado atual e regras de dados está em [docs/DOCUMENTACAO_ATLAS.md](docs/DOCUMENTACAO_ATLAS.md). O planejamento por fases, tarefas e critérios de aceite está em [ROADMAP.md](ROADMAP.md).

Última consolidação documental: 24/11/2026.
