import { createMap, loadMunicipalities, addMunicipalLayer, bindMapInteractions, loadStates, addStateLayer, showStateView } from './mapa.js?v=20261125-zoom5000';
import { initPanel, closePanel } from './panel.js?v=20261125-vignette';
import { initRegionalDashboard } from './dados-gerais.js?v=20261125-statechoropleth';
import { STATE_CENSUS_2022 } from '../data/populacao-quilombola-estados-censo-2022.js';

const loading = document.querySelector('#map-loading');
const error = document.querySelector('#map-error');

async function start() {
  initPanel(closePanel);
  const map = createMap();
  let mapReady = false;
  let municipalityLoaded = false;
  let pendingRegion = 'brasil';
  let switching = false;

  async function changeRegion(region) {
    pendingRegion = region;
    if (!mapReady || switching) return;
    switching = true;
    try {
      if (region === 'pernambuco' && !municipalityLoaded) {
        const geojson = await loadMunicipalities();
        addMunicipalLayer(map, geojson);
        bindMapInteractions(map, geojson);
        municipalityLoaded = true;
      }
      showStateView(map, region);
      if (region === 'pernambuco') {
        const bounds = new maplibregl.LngLatBounds();
        const walk = coords => { if (typeof coords[0] === 'number') bounds.extend(coords); else coords.forEach(walk); };
        const geo = await loadMunicipalities();
        geo.features.forEach(feature=>walk(feature.geometry.coordinates));
        if(!bounds.isEmpty()) map.fitBounds(bounds,{padding:65,duration:700,maxZoom:7.5});
      }
    } catch (err) {
      console.error('Falha ao alternar escala territorial:',err);
      error.hidden=false;
    } finally { switching=false; }
  }

  initRegionalDashboard(changeRegion);

  map.on('load', async () => {
    try {
      const states = await loadStates();
      addStateLayer(map, states, STATE_CENSUS_2022);
      mapReady = true;
      loading.hidden = true;
      await changeRegion(pendingRegion);
      console.info('Malha estadual carregada; dados SIDRA 9578 associados por código IBGE.');
    } catch (err) {
      console.error(err);
      loading.hidden = true;
      error.hidden = false;
    }
  });
  document.querySelector('#retry-load').addEventListener('click', () => {
    error.hidden = true;
    loading.hidden = false;
    window.location.reload();
  });
}
start();
