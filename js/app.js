import {
  createMap, loadMunicipalities, addMunicipalLayer, bindMapInteractions,
  loadStates, addStateLayer, showStateView, loadMacroRegions, addMacroRegionLayer,
  setBrazilMapMode, applyMesorregionColors, addMesorregionBoundaries,
  setPernambucoMapMode, setCommunityLayer, addCommunityPointLayer, addPernambucoNortheastOverlay, setNortheastPeMode, clearTerritorialSelection
} from './mapa.js?v=20261127-enquadramento-pe-centralizado-v139';
import { initPanel, closePanel } from './panel.js?v=20261127-fcp-piloto-v124';
import { initRegionalDashboard } from './dados-gerais.js?v=20261125-kpis-compactos';
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
  let pendingRegion = 'pernambuco';
  let appliedRegion = null;
  let brazilMapMode = 'regioes';
  let pernambucoMapMode = document.querySelector('#pernambuco-map-mode .map-mode-button.active')?.dataset.mapMode || 'municipios';
  let communityLayerEnabled = false;
  let mapTooltipEnabled = true;
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
    addCommunityPointLayer(map, geojson);
    bindMapInteractions(map, geojson, {
      getMode: () => pernambucoMapMode,
      isTooltipEnabled: () => pendingRegion === 'pernambuco' && mapTooltipEnabled,
      isCommunityLayerEnabled: () => communityLayerEnabled,
      onCommunitySearchSelect: () => {
        pernambucoMapMode = 'municipios';
        document.querySelectorAll('#pernambuco-map-mode [data-map-mode]').forEach(button => {
          const active = button.dataset.mapMode === 'municipios';
          button.classList.toggle('active', active);
          button.setAttribute('aria-pressed', String(active));
        });
        setPernambucoMapMode(map, 'municipios');
      }
    });
    municipalityLoaded = true;
    return geojson;
  }

  function syncRegionControls(region) {
    const brazilControl = document.querySelector('#brazil-map-mode');
    const pernambucoControl = document.querySelector('#pernambuco-map-mode');
    if (brazilControl) brazilControl.hidden = region !== 'brasil';
    if (pernambucoControl) pernambucoControl.hidden = region !== 'pernambuco';
  }

  async function changeRegion(region) {
    pendingRegion = region;
    // Atualiza a interface imediatamente, inclusive durante a inicialização
    // e antes de qualquer carregamento assíncrono da malha.
    syncRegionControls(region);
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
      if (region === 'pernambuco') {
        setPernambucoMapMode(map, pernambucoMapMode);
        setCommunityLayer(map, communityLayerEnabled, pernambucoMapMode);
      }
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
      const communityControl = document.querySelector('#community-layer-control');
      if (communityControl) communityControl.hidden = region !== 'pernambuco';
      const tooltipControl = document.querySelector('#tooltip-layer-control');
      if (tooltipControl) tooltipControl.hidden = region !== 'pernambuco';
      if (region !== 'pernambuco') {
        communityLayerEnabled = false;
        const communityShow = document.querySelector('#community-layer-show');
        const communityHide = document.querySelector('#community-layer-hide');
        if (communityShow) { communityShow.classList.remove('active'); communityShow.setAttribute('aria-pressed','false'); }
        if (communityHide) { communityHide.classList.add('active'); communityHide.setAttribute('aria-pressed','true'); }
        const communityNote = document.querySelector('#community-layer-note');
        if (communityNote) communityNote.hidden = true;
      }
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
        if (!bounds.isEmpty()) {
          const desktop = window.matchMedia('(min-width: 701px)').matches;
          const mapHeight = map.getContainer().clientHeight;
          map.fitBounds(bounds, {
            // No desktop, aproxima Pernambuco para uma escala visual próxima
            // de 500 km e reposiciona o território 40% para cima no quadro,
            // mantendo-o na mesma faixa vertical da visualização do Brasil.
            padding: desktop
              ? { top: 55, right: 55, bottom: 55 + mapHeight * 0.8, left: 55 }
              : { top: 28, right: 35, bottom: 28, left: 35 },
            duration: 450,
            maxZoom: desktop ? 9.0 : 7.5
          });
          if (desktop) {
            map.setZoom(Math.min(map.getZoom() + 2.5, 9.0));
          }
        }
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
    if (pendingRegion === 'pernambuco' && municipalityLoaded) {
      setPernambucoMapMode(map, pernambucoMapMode);
      setCommunityLayer(map, communityLayerEnabled, pernambucoMapMode);
      const communityControl = document.querySelector('#community-layer-control');
      if (communityControl) communityControl.hidden = false;
    }
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

  const communityShow = document.querySelector('#community-layer-show');
  const communityHide = document.querySelector('#community-layer-hide');
  function setCommunityVisibility(enabled) {
    if (pendingRegion !== 'pernambuco' || !municipalityLoaded) return;
    communityLayerEnabled = enabled;
    setCommunityLayer(map, communityLayerEnabled, pernambucoMapMode);
    communityShow?.classList.toggle('active', enabled);
    communityHide?.classList.toggle('active', !enabled);
    communityShow?.setAttribute('aria-pressed', String(enabled));
    communityHide?.setAttribute('aria-pressed', String(!enabled));
    const note = document.querySelector('#community-layer-note');
    if (note) note.hidden = !enabled;
  }
  communityShow?.addEventListener('click', () => setCommunityVisibility(true));
  communityHide?.addEventListener('click', () => setCommunityVisibility(false));

  const tooltipOn = document.querySelector('#map-tooltip-on');
  const tooltipOff = document.querySelector('#map-tooltip-off');
  function setTooltipState(enabled) {
    mapTooltipEnabled = enabled;
    tooltipOn?.classList.toggle('active', enabled);
    tooltipOff?.classList.toggle('active', !enabled);
    tooltipOn?.setAttribute('aria-pressed', String(enabled));
    tooltipOff?.setAttribute('aria-pressed', String(!enabled));
  }
  tooltipOn?.addEventListener('click', () => setTooltipState(true));
  tooltipOff?.addEventListener('click', () => setTooltipState(false));

  retryButton.addEventListener('click', () => changeRegion(pendingRegion));

  map.on('load', async () => {
    mapReady = true;
    await changeRegion(pendingRegion);
  });
}

start();
