import { POPULATION_TOTAL_2022, POPULATION_SOURCE_2022 } from '../data/populacao-municipal-censo-2022.js';
import { QUILOMBOLA_2022, QUILOMBOLA_SOURCE_2022 } from '../data/populacao-quilombola-censo-2022.js';
import { QUILOMBOLA_LOCALITIES_BY_MUNICIPALITY, QUILOMBOLA_LOCALITIES_SOURCE } from '../data/localidades-quilombolas-municipais-censo-2022.js';

// Camada de dados municipais. Os atributos da malha são normalizados
// para uma estrutura estável, independentemente do nome original do campo.
const NAME_KEYS = ['NM_MUN','nm_mun','NM_MUNICIP','NM_MUNICIPIO','nome','Nome','municipio','MUNICIPIO','name','NAME'];
const CODE_KEYS = ['codarea','CD_MUN','cd_mun','CD_GEOCMU','CD_GEOCODI','codigo_ibge','cod_ibge','geocodigo','GEOCODIGO','id'];

function firstValue(properties, keys) {
  for (const key of keys) {
    const value = properties?.[key];
    if (value !== undefined && value !== null && String(value).trim() !== '') return value;
  }
  return null;
}

export function normalizeFeature(feature, index) {
  const props = feature.properties || {};
  const name = firstValue(props, NAME_KEYS) || `Município ${index + 1}`;
  const code = firstValue(props, CODE_KEYS);
  return {
    ...feature,
    id: String(code ?? index + 1).padStart(7, '0'),
    properties: {
      ...props,
      _app_id: String(code ?? index + 1).padStart(7, '0'),
      _app_name: String(name),
      _app_code: code ? String(code) : 'Não identificado'
    }
  };
}

export function normalizeCollection(collection) {
  return {
    ...collection,
    features: (collection.features || []).map(normalizeFeature)
  };
}

// Dados editoriais separados da geometria. A estrutura está pronta para
// receber dados validados, sem misturar estatísticas com a malha cartográfica.
export const MUNICIPAL_DATA = Object.fromEntries(
  Object.entries(POPULATION_TOTAL_2022).map(([code, row]) => {
    const [populationQuilombola = 0, populationQuilombolaInside = 0, populationQuilombolaOutside = 0] = QUILOMBOLA_2022[code] || [];
    return [code, {
      populationTotal: row.populationTotal,
      populationTotalSource: POPULATION_SOURCE_2022,
      populationQuilombola,
      populationQuilombolaInside,
      populationQuilombolaOutside,
      populationQuilombolaSource: QUILOMBOLA_SOURCE_2022,
      quilombolaLocalities: QUILOMBOLA_LOCALITIES_BY_MUNICIPALITY[code] || null,
      quilombolaLocalitiesSource: QUILOMBOLA_LOCALITIES_SOURCE
    }];
  })
);

/* Estrutura editorial a complementar por município:
export const MUNICIPAL_EDITORIAL_DATA = {
  // Exemplo de estrutura futura:
  // "2600000": {
  //   populationTotal: 0, populationQuilombola: 0,
  //   communities: [], history: "", photos: [],
  //   sources: [{label:"IBGE Censo 2022", url:"...", year:2022}]
  // }
};
*/