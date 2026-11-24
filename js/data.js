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
export const MUNICIPAL_DATA = {
  // Exemplo de estrutura futura:
  // "2600000": {
  //   populationTotal: 0, populationQuilombola: 0,
  //   communities: [], history: "", photos: [],
  //   sources: [{label:"IBGE Censo 2022", url:"...", year:2022}]
  // }
};