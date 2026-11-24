// Fontes cartográficas e parâmetros gerais do projeto.
export const CONFIG = {
  // GeoJSON oficial da Malha Municipal de Pernambuco, CONDEPE/FIDEM,
  // edição 2025, versão 3. O arquivo pode ser baixado e servido localmente.
  geojsonUrl: 'https://servicodados.ibge.gov.br/api/v3/malhas/estados/26?formato=application/vnd.geo+json&qualidade=minima&intrarregiao=municipio',
  fallbackGeojsonUrl: 'https://www.cf.pe.gov.br/downloads/malha-municipal/2025-v3/malha-pe-2025-v3.geojson',
  localGeojsonUrl: './data/municipios-pe.geojson',
  center: [-37.9, -8.25],
  zoom: 6.1,
  maxZoom: 8.2, // Limita a aproximação para preservar o contexto territorial e a seleção dos municípios.
  pitch: 75, // Inclinação aumentada em 20 graus em relação à configuração anterior.
  bearing: -8,
  extrusion: { base: 0, normal: 28, selected: 180 },
  colors: {
    fill: '#916D50',
    line: '#3D2500',
    selected: '#D66A32',
    background: '#E9DDCB'
  }
};

// Campos de dados que ainda serão conectados às tabelas oficiais.
// Não inserir estimativas sem referência, ano e metodologia.
export const DATA_STATUS = {
  population: 'Pendente de integração com tabela oficial do Censo 2022.',
  quilombola: 'Pendente de integração com a divulgação municipal do Censo 2022.',
  communities: 'Pendente de validação por município e fonte.',
  history: 'Conteúdo editorial a ser preenchido e revisado.'
};