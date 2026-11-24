import { CONFIG } from './config.js';
import { normalizeCollection } from './data.js';
import { openMunicipality } from './panel.js';

const SOURCE_ID = 'municipios-pe';
const FILL_ID = 'municipios-fill-3d';
const LINE_ID = 'municipios-lines';

async function fetchGeoJSON(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Falha HTTP ${response.status}`);
  const data = await response.json();
  if (!data.features || !Array.isArray(data.features)) throw new Error('GeoJSON sem coleção de feições válida.');
  return normalizeCollection(data);
}

async function attachMunicipalityNames(collection) {
  const url = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/26/municipios';
  const response = await fetch(url);
  if (!response.ok) throw new Error(`API de localidades do IBGE respondeu HTTP ${response.status}`);
  const municipalities = await response.json();
  const namesByCode = new Map(municipalities.map(item => [String(item.id).padStart(7, '0'), item.nome]));

  collection.features = collection.features.map(feature => {
    const code = String(feature.properties._app_code || feature.properties._app_id).padStart(7, '0');
    const officialName = namesByCode.get(code);
    feature.properties._app_code = code;
    feature.properties._app_id = code;
    feature.id = code;
    feature.properties._app_name = officialName || feature.properties._app_name || 'Fernando de Noronha / área especial';
    return feature;
  });
  return collection;
}

export async function loadMunicipalities() {
  let collection;
  try {
    collection = await fetchGeoJSON(CONFIG.localGeojsonUrl);
  } catch (localError) {
    console.info('GeoJSON local indisponível; consultando a API oficial do IBGE.', localError);
  }
  if (!collection) {
    try {
      collection = await fetchGeoJSON(CONFIG.geojsonUrl);
    } catch (ibgeError) {
      console.warn('API de malhas do IBGE indisponível; tentando a malha estadual CONDEPE/FIDEM.', ibgeError);
      collection = await fetchGeoJSON(CONFIG.fallbackGeojsonUrl);
    }
  }
  try {
    return await attachMunicipalityNames(collection);
  } catch (nameError) {
    console.warn('Não foi possível consultar os nomes oficiais no serviço de Localidades do IBGE.', nameError);
    return collection;
  }
}

export function createMap() {
  const map = new maplibregl.Map({
    container: 'map',
    style: {
      version: 8,
      sources: {},
      layers: [{ id: 'background', type: 'background', paint: { 'background-color': CONFIG.colors.background } }]
    },
    center: CONFIG.center,
    zoom: CONFIG.zoom,
    pitch: CONFIG.pitch,
    bearing: CONFIG.bearing,
    antialias: true,
    attributionControl: true
  });
  map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), 'bottom-right');
  map.addControl(new maplibregl.ScaleControl({ maxWidth: 100, unit: 'metric' }), 'bottom-right');
  return map;
}

export function addMunicipalLayer(map, geojson) {
  map.addSource(SOURCE_ID, { type: 'geojson', data: geojson, promoteId: '_app_id' });
  map.addLayer({
    id: FILL_ID, type: 'fill-extrusion', source: SOURCE_ID,
    paint: {
      'fill-extrusion-color': [
        'case', ['boolean', ['feature-state', 'selected'], false],
        CONFIG.colors.selected,
        ['boolean', ['feature-state', 'hover'], false], '#a98668',
        CONFIG.colors.fill
      ],
      'fill-extrusion-height': [
        'case', ['boolean', ['feature-state', 'selected'], false],
        CONFIG.extrusion.selected,
        ['boolean', ['feature-state', 'hover'], false], 18,
        CONFIG.extrusion.normal
      ],
      'fill-extrusion-base': CONFIG.extrusion.base,
      'fill-extrusion-opacity': 0.96,
      'fill-extrusion-vertical-gradient': true
    }
  });
  map.addLayer({
    id: LINE_ID, type: 'line', source: SOURCE_ID,
    paint: { 'line-color': CONFIG.colors.line, 'line-width': 0.8, 'line-opacity': 0.75 }
  });
  map.addLayer({
    id: 'municipios-labels', type: 'symbol', source: SOURCE_ID,
    minzoom: 7.1,
    layout: {
      'text-field': ['get', '_app_name'],
      'text-font': ['Open Sans Regular'],
      'text-size': ['interpolate', ['linear'], ['zoom'], 7, 8, 9, 11],
      'text-max-width': 8,
      'text-allow-overlap': false,
      'text-ignore-placement': false
    },
    paint: {
      'text-color': '#f0dfca',
      'text-halo-color': '#211914',
      'text-halo-width': 1.4,
      'text-opacity': 0.95
    }
  });
  map.setLight({ anchor: 'viewport', color: '#fff0dc', intensity: 0.48, position: [1.2, 160, 70] });

  // Enquadra todo o território de Pernambuco automaticamente.
  const bounds = new maplibregl.LngLatBounds();
  const extendCoordinates = (coordinates) => {
    if (typeof coordinates[0] === 'number') bounds.extend(coordinates);
    else coordinates.forEach(extendCoordinates);
  };
  geojson.features.forEach(feature => extendCoordinates(feature.geometry.coordinates));
  if (!bounds.isEmpty()) {
    map.fitBounds(bounds, {
      padding: { top: 65, right: 65, bottom: 65, left: 65 },
      duration: 0,
      maxZoom: 7.2
    });
  }
}

function getFeatureByName(geojson, value) {
  const normalized = value.trim().toLocaleLowerCase('pt-BR');
  return geojson.features.find(f => (f.properties._app_name || '').toLocaleLowerCase('pt-BR') === normalized);
}

export function bindMapInteractions(map, geojson) {
  let selectedId = null;
  let hoveredId = null;

  function selectFeature(feature) {
    const id = String(feature.properties._app_id);
    if (selectedId !== null) map.setFeatureState({ source: SOURCE_ID, id: selectedId }, { selected: false });
    selectedId = id;
    map.setFeatureState({ source: SOURCE_ID, id }, { selected: true });
    const bounds = new maplibregl.LngLatBounds();
    const walk = coords => {
      if (typeof coords[0] === 'number') bounds.extend(coords);
      else coords.forEach(walk);
    };
    walk(feature.geometry.coordinates);
    map.fitBounds(bounds, { padding: { top: 70, bottom: 70, left: 70, right: 440 }, duration: 850, maxZoom: 9.5 });
    // Aguarda o início da transição de elevação antes de abrir a ficha.
    window.setTimeout(() => openMunicipality(feature), 180);
  }

  map.on('mousemove', FILL_ID, event => {
    map.getCanvas().style.cursor = 'pointer';
    const feature = event.features?.[0];
    if (!feature) return;
    const id = String(feature.properties._app_id);
    if (hoveredId && hoveredId !== selectedId) map.setFeatureState({ source: SOURCE_ID, id: hoveredId }, { hover: false });
    hoveredId = id;
    if (id !== selectedId) map.setFeatureState({ source: SOURCE_ID, id }, { hover: true });
  });
  map.on('mouseleave', FILL_ID, () => {
    map.getCanvas().style.cursor = '';
    if (hoveredId && hoveredId !== selectedId) map.setFeatureState({ source: SOURCE_ID, id: hoveredId }, { hover: false });
    hoveredId = null;
  });
  map.on('click', FILL_ID, event => {
    const feature = event.features?.[0];
    if (feature) selectFeature(feature);
  });

  const search = document.querySelector('#municipio-search');
  search.addEventListener('keydown', event => {
    if (event.key !== 'Enter') return;
    const feature = getFeatureByName(geojson, search.value);
    if (feature) selectFeature(feature);
    else {
      search.setCustomValidity('Município não localizado na malha carregada.');
      search.reportValidity();
      search.addEventListener('input', () => search.setCustomValidity(''), { once: true });
    }
  });

  document.querySelector('#reset-view').addEventListener('click', () => {
    if (selectedId !== null) map.setFeatureState({ source: SOURCE_ID, id: selectedId }, { selected: false });
    selectedId = null;
    map.flyTo({ center: CONFIG.center, zoom: CONFIG.zoom, pitch: CONFIG.pitch, bearing: CONFIG.bearing, duration: 900 });
  });
}