import { createMap, loadMunicipalities, addMunicipalLayer, bindMapInteractions } from './mapa.js?v=20261124-zoomfix2';
import { initPanel, closePanel } from './panel.js?v=20261125-vignette';
import { initRegionalDashboard } from './dados-gerais.js?v=20261125-dados-gerais';

const loading = document.querySelector('#map-loading');
const error = document.querySelector('#map-error');

async function start() {
  initPanel(closePanel);
  initRegionalDashboard();
  const map = createMap();
  map.on('load', async () => {
    try {
      const geojson = await loadMunicipalities();
      addMunicipalLayer(map, geojson);
      bindMapInteractions(map, geojson);
      loading.hidden = true;
      console.info(`Malha carregada: ${geojson.features.length} feições.`);
      console.info('Atributos disponíveis na primeira feição:', geojson.features[0]?.properties);
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