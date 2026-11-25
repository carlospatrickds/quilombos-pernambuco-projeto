// Indicadores das cinco Grandes Regiões — Censo Demográfico 2022.
// Quilombolas: IBGE, SIDRA 9578 (total, em territórios e fora).
// População residente: IBGE, SIDRA 4709, variável 93.
// Percentual calculado: população quilombola / população residente * 100.
export const MACROREGIONS_CENSUS_2022 = [
  { name:'Norte', aliases:['Região Norte'], populationTotal:17354884, quilombolaTotal:167311, quilombolaInside:52249, quilombolaOutside:115062 },
  { name:'Nordeste', aliases:['Região Nordeste'], populationTotal:54658515, quilombolaTotal:906337, quilombolaInside:89521, quilombolaOutside:816816 },
  { name:'Sudeste', aliases:['Região Sudeste'], populationTotal:84840113, quilombolaTotal:182427, quilombolaInside:14945, quilombolaOutside:167482 },
  { name:'Sul', aliases:['Região Sul'], populationTotal:29937706, quilombolaTotal:29114, quilombolaInside:3845, quilombolaOutside:25269 },
  { name:'Centro-Oeste', aliases:['Centro Oeste','Região Centro-Oeste'], populationTotal:16289538, quilombolaTotal:44997, quilombolaInside:7209, quilombolaOutside:37788 }
];
export const MACROREGIONS_SOURCE = {
  quilombola:'IBGE, Censo Demográfico 2022, SIDRA tabela 9578; página Brasil Quilombola — tabela por Grandes Regiões e localização do domicílio.',
  population:'IBGE, Censo Demográfico 2022, SIDRA tabela 4709, variável 93.',
  consultedAt:'2026-11-25',
  urls:['https://sidra.ibge.gov.br/tabela/9578','https://sidra.ibge.gov.br/tabela/4709','https://www.ibge.gov.br/brasil-quilombola/']
};
