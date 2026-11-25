import {
  createMap, loadMunicipalities, addMunicipalLayer, bindMapInteractions,
  loadStates, addStateLayer, showStateView, loadMacroRegions, addMacroRegionLayer,
  setBrazilMapMode, applyMesorregionColors, addMesorregionBoundaries,
  setPernambucoMapMode, addPernambucoNortheastOverlay, setNortheastPeMode, clearTerritorialSelection
} from './mapa.js?v=20261125-vignette-fix-2';
import { initPanel, closePanel } from './panel.js?v=20261125-vignette-fix-2';
import { initRegionalDashboard } from './dados-gerais.js?v=20261125-statechoropleth';
import { STATE_CENSUS_2022 } from '../data/populacao-quilombola-estados-censo-2022.js';

const loading = document.querySelector('#map-loading');
const error = document.querySelector('#map-error');
const retryButton = document.querySelector('#retry-load');

async function start() {
  initPanel(closePanel);
  const map = createMap();
  let mapReady = false;
  let statesLoaded = false;
  let macroRegionsLoaded = false;
  let municipalityLoaded = false;
  let northeastPeOverlayLoaded = false;
  let pendingRegion = 'brasil';
  let appliedRegion = null;
  let brazilMapMode = 'regioes';
  let pernambucoMapMode = document.querySelector('#pernambuco-map-mode .map-mode-button.active')?.dataset.mapMode || 'municipios';
  let switching = false;

  const setLoading = active => { loading.hidden = !active; };
  const setError = active => { error.hidden = !active; };

  async function ensureStates() {
    if (statesLoaded) return;
    const states = await loadStates();
    addStateLayer(map, states, STATE_CENSUS_2022);
    statesLoaded = true;
  }

  async function ensureMacroRegions() {
    if (macroRegionsLoaded) return;
    const regions = await loadMacroRegions();
    addMacroRegionLayer(map, regions);
    macroRegionsLoaded = true;
  }

  async function ensureMunicipalities() {
    if (municipalityLoaded) return;
    const geojson = await loadMunicipalities();
    applyMesorregionColors(geojson);
    addMunicipalLayer(map, geojson);
    addMesorregionBoundaries(map, geojson);
    bindMapInteractions(map, geojson, { getMode: () => pernambucoMapMode });
    municipalityLoaded = true;
    return geojson;
  }

  async function changeRegion(region) {
    pendingRegion = region;
    if (!mapReady || switching) return;
    switching = true;
    setError(false);
    setLoading(true);
    try {
      clearTerritorialSelection(map);
      if (region === 'brasil' || region === 'nordeste') await ensureStates();

      if (region === 'brasil' && brazilMapMode === 'regioes') {
        try {
          await ensureMacroRegions();
        } catch (macroError) {
          console.warn('Malha das Grandes Regiões indisponível; exibindo unidades da Federação.', macroError);
          brazilMapMode = 'estados';
          document.querySelectorAll('#brazil-map-mode [data-map-mode]').forEach(button => {
            const active = button.dataset.mapMode === 'estados';
            button.classList.toggle('active', active);
            button.setAttribute('aria-pressed', String(active));
          });
        }
      }

      if (region === 'nordeste' && !northeastPeOverlayLoaded) {
        const geojson = await ensureMunicipalities();
        addPernambucoNortheastOverlay(map, geojson);
        northeastPeOverlayLoaded = true;
      } else if (region === 'pernambuco') {
        await ensureMunicipalities();
      }

      showStateView(map, region);
      if (region === 'brasil') setBrazilMapMode(map, brazilMapMode);
      if (region === 'pernambuco') setPernambucoMapMode(map, pernambucoMapMode);
      if (region === 'nordeste') {
        setNortheastPeMode(map, document.querySelector('#northeast-map-mode .map-mode-button.active')?.dataset.mapMode || 'subregioes');
      }

      const mesoLegend = document.querySelector('#mesoregion-legend');
      if (mesoLegend) mesoLegend.style.display = region === 'pernambuco' ? 'flex' : 'none';
      const meshLabel = document.querySelector('#map-mesh-label');
      const hint = document.querySelector('#map-selection-hint');
      const modeControl = document.querySelector('#brazil-map-mode');
      const pernambucoControl = document.querySelector('#pernambuco-map-mode');
      if (modeControl) modeControl.hidden = region !== 'brasil';
      if (pernambucoControl) pernambucoControl.hidden = region !== 'pernambuco';
      if (meshLabel) meshLabel.textContent = region === 'pernambuco'
        ? 'MALHA MUNICIPAL'
        : region === 'nordeste'
          ? 'MALHA DAS UNIDADES DA FEDERAÇÃO'
          : (brazilMapMode === 'regioes' ? 'MALHA DAS GRANDES REGIÕES' : 'MALHA DAS UNIDADES DA FEDERAÇÃO');
      if (hint && region === 'nordeste') hint.textContent = 'Selecione um estado para obter dados';
      if (hint && region === 'pernambuco') hint.textContent = pernambucoMapMode === 'subregioes'
        ? 'Selecione uma sub-região para obter dados'
        : 'Selecione um município para explorar';

      if (region === 'pernambuco') {
        const bounds = new maplibregl.LngLatBounds();
        const geo = await loadMunicipalities();
        const walk = coords => {
          if (typeof coords[0] === 'number') bounds.extend(coords);
          else coords.forEach(walk);
        };
        geo.features.forEach(feature => walk(feature.geometry.coordinates));
        if (!bounds.isEmpty()) map.fitBounds(bounds, { padding: 65, duration: 450, maxZoom: 7.5 });
      }
      appliedRegion = region;
      console.info('Escala territorial carregada:', region);
    } catch (err) {
      console.error('Falha ao carregar a escala territorial ' + region + ':', err);
      setError(true);
    } finally {
      switching = false;
      setLoading(false);
      // Se outra aba foi escolhida durante uma requisição, aplica a escolha mais recente.
      if (mapReady && pendingRegion !== appliedRegion) {
        const nextRegion = pendingRegion;
        queueMicrotask(() => changeRegion(nextRegion));
      }
    }
  }

  initRegionalDashboard(changeRegion);

  document.querySelectorAll('#pernambuco-map-mode [data-map-mode]').forEach(button => button.addEventListener('click', () => {
    pernambucoMapMode = button.dataset.mapMode;
    document.querySelectorAll('#pernambuco-map-mode [data-map-mode]').forEach(item => {
      const active = item.dataset.mapMode === pernambucoMapMode;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    if (pendingRegion === 'pernambuco' && municipalityLoaded) setPernambucoMapMode(map, pernambucoMapMode);
  }));

  document.querySelectorAll('#brazil-map-mode [data-map-mode]').forEach(button => button.addEventListener('click', async () => {
    brazilMapMode = button.dataset.mapMode;
    document.querySelectorAll('#brazil-map-mode [data-map-mode]').forEach(item => {
      const active = item.dataset.mapMode === brazilMapMode;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    if (pendingRegion === 'brasil') await changeRegion('brasil');
    const label = document.querySelector('#map-mesh-label');
    const hint = document.querySelector('#map-selection-hint');
    if (label) label.textContent = brazilMapMode === 'regioes' ? 'MALHA DAS GRANDES REGIÕES' : 'MALHA DAS UNIDADES DA FEDERAÇÃO';
    if (hint) hint.textContent = brazilMapMode === 'regioes'
      ? 'Selecione uma região para obter dados'
      : 'Selecione um estado ou distrito para obter dados';
  }));

  retryButton.addEventListener('click', () => changeRegion(pendingRegion));

  map.on('load', async () => {
    mapReady = true;
    await changeRegion(pendingRegion);
  });
}

start();
