// Indicadores agregados do Censo Demográfico 2022.
// População quilombola: IBGE/SIDRA, tabela 9578, variável Pessoas quilombolas.
// População residente total: IBGE/SIDRA, tabela 9578, bloco População residente total.
// Valores absolutos em pessoas; percentuais derivados por cálculo simples.
export const REGIONAL_CENSUS_2022 = {
  brasil: { name: 'Brasil', populationTotal: 203080756, quilombolaTotal: 1330186, quilombolaInside: 167769, quilombolaOutside: 1162417, sharePercent: 0.6550034706 },
  nordeste: { name: 'Nordeste', populationTotal: 54658515, quilombolaTotal: 906337, quilombolaInside: 89521, quilombolaOutside: 816816, sharePercent: 1.6581807976 },
  pernambuco: { name: 'Pernambuco', populationTotal: 9058931, quilombolaTotal: 78864, quilombolaInside: 6769, quilombolaOutside: 72095, sharePercent: 0.8705662953 }
};

export const REGIONAL_CENSUS_SOURCE = {
  quilombola: 'IBGE, Censo Demográfico 2022, SIDRA, tabela 9578, variável Pessoas quilombolas, localização do domicílio.',
  population: 'IBGE, Censo Demográfico 2022, SIDRA, tabela 9578, bloco População residente total.',
  consultedAt: '2026-11-25',
  urls: ['https://sidra.ibge.gov.br/tabela/9578']
};
