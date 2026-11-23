import { createMap, loadMunicipalities, addMunicipalLayer, bindMapInteractions } from './mapa.js';
import { initPanel, closePanel } from './panel.js';

const loading = document.querySelector('#map-loading');
const error = document.querySelector('#map-error');

async function start() {
  initPanel(closePanel);
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