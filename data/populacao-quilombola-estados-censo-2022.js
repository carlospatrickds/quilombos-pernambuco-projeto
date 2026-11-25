// População quilombola e população residente por Unidade da Federação — Censo 2022.
// Fonte: IBGE, SIDRA, tabela 9578, variável Pessoas quilombolas.
// Extração fornecida pelo responsável pelo projeto (CSV exportado do SIDRA).
// O arquivo contém também os blocos de população residente e percentuais da mesma tabela.
// Valores "-" na tabela original foram preservados como null (não divulgado/sem valor numérico).
// Percentual estadual: população quilombola total / população residente total * 100.
export const STATE_CENSUS_2022 = [
  {
    "ibge": "11",
    "uf": "RO",
    "name": "Rondônia",
    "quilombolaTotal": 2925,
    "quilombolaInside": 221,
    "quilombolaOutside": 2704,
    "populationTotal": 1581196,
    "sharePercent": 0.184987
  },
  {
    "ibge": "12",
    "uf": "AC",
    "name": "Acre",
    "quilombolaTotal": null,
    "quilombolaInside": null,
    "quilombolaOutside": null,
    "populationTotal": 830018,
    "sharePercent": null
  },
  {
    "ibge": "13",
    "uf": "AM",
    "name": "Amazonas",
    "quilombolaTotal": 2812,
    "quilombolaInside": 1231,
    "quilombolaOutside": 1581,
    "populationTotal": 3941613,
    "sharePercent": 0.071341
  },
  {
    "ibge": "14",
    "uf": "RR",
    "name": "Roraima",
    "quilombolaTotal": null,
    "quilombolaInside": null,
    "quilombolaOutside": null,
    "populationTotal": 636707,
    "sharePercent": null
  },
  {
    "ibge": "15",
    "uf": "PA",
    "name": "Pará",
    "quilombolaTotal": 135603,
    "quilombolaInside": 44560,
    "quilombolaOutside": 91043,
    "populationTotal": 8120131,
    "sharePercent": 1.669961
  },
  {
    "ibge": "16",
    "uf": "AP",
    "name": "Amapá",
    "quilombolaTotal": 12894,
    "quilombolaInside": 4909,
    "quilombolaOutside": 7985,
    "populationTotal": 733759,
    "sharePercent": 1.757253
  },
  {
    "ibge": "17",
    "uf": "TO",
    "name": "Tocantins",
    "quilombolaTotal": 13077,
    "quilombolaInside": 1328,
    "quilombolaOutside": 11749,
    "populationTotal": 1511460,
    "sharePercent": 0.86519
  },
  {
    "ibge": "21",
    "uf": "MA",
    "name": "Maranhão",
    "quilombolaTotal": 269168,
    "quilombolaInside": 29142,
    "quilombolaOutside": 240026,
    "populationTotal": 6776699,
    "sharePercent": 3.971963
  },
  {
    "ibge": "22",
    "uf": "PI",
    "name": "Piauí",
    "quilombolaTotal": 31786,
    "quilombolaInside": 8419,
    "quilombolaOutside": 23367,
    "populationTotal": 3271199,
    "sharePercent": 0.971693
  },
  {
    "ibge": "23",
    "uf": "CE",
    "name": "Ceará",
    "quilombolaTotal": 23994,
    "quilombolaInside": 4609,
    "quilombolaOutside": 19385,
    "populationTotal": 8794957,
    "sharePercent": 0.272815
  },
  {
    "ibge": "24",
    "uf": "RN",
    "name": "Rio Grande do Norte",
    "quilombolaTotal": 22371,
    "quilombolaInside": 3450,
    "quilombolaOutside": 18921,
    "populationTotal": 3302729,
    "sharePercent": 0.677349
  },
  {
    "ibge": "25",
    "uf": "PB",
    "name": "Paraíba",
    "quilombolaTotal": 16765,
    "quilombolaInside": 2922,
    "quilombolaOutside": 13843,
    "populationTotal": 3974687,
    "sharePercent": 0.421794
  },
  {
    "ibge": "26",
    "uf": "PE",
    "name": "Pernambuco",
    "quilombolaTotal": 78864,
    "quilombolaInside": 6769,
    "quilombolaOutside": 72095,
    "populationTotal": 9058931,
    "sharePercent": 0.870566
  },
  {
    "ibge": "27",
    "uf": "AL",
    "name": "Alagoas",
    "quilombolaTotal": 37724,
    "quilombolaInside": 691,
    "quilombolaOutside": 37033,
    "populationTotal": 3127683,
    "sharePercent": 1.206132
  },
  {
    "ibge": "28",
    "uf": "SE",
    "name": "Sergipe",
    "quilombolaTotal": 28163,
    "quilombolaInside": 12748,
    "quilombolaOutside": 15415,
    "populationTotal": 2210004,
    "sharePercent": 1.274342
  },
  {
    "ibge": "29",
    "uf": "BA",
    "name": "Bahia",
    "quilombolaTotal": 397502,
    "quilombolaInside": 20771,
    "quilombolaOutside": 376731,
    "populationTotal": 14141626,
    "sharePercent": 2.810865
  },
  {
    "ibge": "31",
    "uf": "MG",
    "name": "Minas Gerais",
    "quilombolaTotal": 135315,
    "quilombolaInside": 4576,
    "quilombolaOutside": 130739,
    "populationTotal": 20539989,
    "sharePercent": 0.658788
  },
  {
    "ibge": "32",
    "uf": "ES",
    "name": "Espírito Santo",
    "quilombolaTotal": 15659,
    "quilombolaInside": 2793,
    "quilombolaOutside": 12866,
    "populationTotal": 3833712,
    "sharePercent": 0.408455
  },
  {
    "ibge": "33",
    "uf": "RJ",
    "name": "Rio de Janeiro",
    "quilombolaTotal": 20447,
    "quilombolaInside": 3500,
    "quilombolaOutside": 16947,
    "populationTotal": 16055174,
    "sharePercent": 0.127355
  },
  {
    "ibge": "35",
    "uf": "SP",
    "name": "São Paulo",
    "quilombolaTotal": 11006,
    "quilombolaInside": 4076,
    "quilombolaOutside": 6930,
    "populationTotal": 44411238,
    "sharePercent": 0.024782
  },
  {
    "ibge": "41",
    "uf": "PR",
    "name": "Paraná",
    "quilombolaTotal": 7113,
    "quilombolaInside": 648,
    "quilombolaOutside": 6465,
    "populationTotal": 11444380,
    "sharePercent": 0.062153
  },
  {
    "ibge": "42",
    "uf": "SC",
    "name": "Santa Catarina",
    "quilombolaTotal": 4449,
    "quilombolaInside": 580,
    "quilombolaOutside": 3869,
    "populationTotal": 7610361,
    "sharePercent": 0.05846
  },
  {
    "ibge": "43",
    "uf": "RS",
    "name": "Rio Grande do Sul",
    "quilombolaTotal": 17552,
    "quilombolaInside": 2617,
    "quilombolaOutside": 14935,
    "populationTotal": 10882965,
    "sharePercent": 0.16128
  },
  {
    "ibge": "50",
    "uf": "MS",
    "name": "Mato Grosso do Sul",
    "quilombolaTotal": 2572,
    "quilombolaInside": 1145,
    "quilombolaOutside": 1427,
    "populationTotal": 2757013,
    "sharePercent": 0.093289
  },
  {
    "ibge": "51",
    "uf": "MT",
    "name": "Mato Grosso",
    "quilombolaTotal": 11729,
    "quilombolaInside": 958,
    "quilombolaOutside": 10771,
    "populationTotal": 3658649,
    "sharePercent": 0.320583
  },
  {
    "ibge": "52",
    "uf": "GO",
    "name": "Goiás",
    "quilombolaTotal": 30391,
    "quilombolaInside": 5106,
    "quilombolaOutside": 25285,
    "populationTotal": 7056495,
    "sharePercent": 0.430681
  },
  {
    "ibge": "53",
    "uf": "DF",
    "name": "Distrito Federal",
    "quilombolaTotal": 305,
    "quilombolaInside": null,
    "quilombolaOutside": 305,
    "populationTotal": 2817381,
    "sharePercent": 0.010826
  }
];

export const STATE_CENSUS_SOURCE = {
  institution: 'IBGE',
  census: 'Censo Demográfico 2022',
  table: 'SIDRA 9578',
  variable: 'Pessoas quilombolas',
  geographicLevel: 'Unidade da Federação',
  referenceYear: 2022,
  extraction: 'CSV exportado do SIDRA e fornecido pelo responsável pelo projeto',
  consultedAt: '2026-11-25',
  url: 'https://sidra.ibge.gov.br/tabela/9578',
  notes: [
    'A população residente total foi extraída do bloco correspondente da própria tabela 9578, mantendo coerência de série.',
    'Acre e Roraima apresentam traço para os quantitativos quilombolas na extração; foram preservados como null, não como zero.',
    'No Distrito Federal, o recorte em territórios quilombolas aparece como traço e foi preservado como null.',
    'Os percentuais estaduais foram calculados a partir dos quantitativos absolutos da tabela.'
  ]
};
