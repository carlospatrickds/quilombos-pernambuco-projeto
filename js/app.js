import { createMap, loadMunicipalities, addMunicipalLayer, bindMapInteractions, loadStates, addStateLayer, showStateView, loadMacroRegions, addMacroRegionLayer, setBrazilMapMode, applyMesorregionColors, addMesorregionBoundaries, addPernambucoNortheastOverlay, setNortheastPeMode } from './mapa.js?v=20261125-northeast-subregions';
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
  let brazilMapMode = 'regioes';
  let northeastPeMode = 'subregioes';
  let switching = false;

  async function changeRegion(region) {
    pendingRegion = region;
    if (!mapReady || switching) return;
    switching = true;
    try {
      if ((region === 'pernambuco' || region === 'nordeste') && !municipalityLoaded) {
        const geojson = await loadMunicipalities();
        applyMesorregionColors(geojson);
        addMunicipalLayer(map, geojson);
        addMesorregionBoundaries(map, geojson);
        bindMapInteractions(map, geojson);
        addPernambucoNortheastOverlay(map, geojson);
        municipalityLoaded = true;
      }
      showStateView(map, region);
      if(region==='brasil') setBrazilMapMode(map,brazilMapMode);
      setNortheastPeMode(map,region==='nordeste'?northeastPeMode:'off');
      const meshLabel=document.querySelector('#map-mesh-label');
      const hint=document.querySelector('#map-selection-hint');
      const modeControl=document.querySelector('#brazil-map-mode');
      const northeastControl=document.querySelector('#northeast-map-mode');
      if(modeControl) modeControl.hidden=region!=='brasil';
      if(northeastControl) northeastControl.hidden=region!=='nordeste';
      if(meshLabel) meshLabel.textContent=region==='pernambuco'?'MALHA MUNICIPAL':region==='nordeste'?(northeastPeMode==='subregioes'?'MESORREGIÕES DE PERNAMBUCO':'MALHA MUNICIPAL DE PERNAMBUCO'):(brazilMapMode==='regioes'?'MALHA DAS GRANDES REGIÕES':'MALHA DAS UNIDADES DA FEDERAÇÃO');
      if(hint && region==='nordeste') hint.textContent=northeastPeMode==='subregioes'?'Selecione uma sub-região de Pernambuco para obter dados':'Selecione um município de Pernambuco para obter dados';
      if(hint && region==='pernambuco') hint.textContent='Selecione um município para explorar';
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
      const macroRegions = await loadMacroRegions();
      addMacroRegionLayer(map, macroRegions);
      document.querySelectorAll('#northeast-map-mode [data-map-mode]').forEach(button=>button.addEventListener('click',()=>{
        northeastPeMode=button.dataset.mapMode;
        document.querySelectorAll('#northeast-map-mode [data-map-mode]').forEach(item=>{
          const active=item.dataset.mapMode===northeastPeMode;
          item.classList.toggle('active',active);
          item.setAttribute('aria-pressed',String(active));
        });
        if(pendingRegion==='nordeste'){
          setNortheastPeMode(map,northeastPeMode);
          const legend=document.querySelector('#mesoregion-legend');
          if(legend)legend.style.display='flex';
        }
      }));
      document.querySelectorAll('#brazil-map-mode [data-map-mode]').forEach(button=>button.addEventListener('click',()=>{
        brazilMapMode=button.dataset.mapMode;
        document.querySelectorAll('#brazil-map-mode [data-map-mode]').forEach(item=>{
          const active=item.dataset.mapMode===brazilMapMode;
          item.classList.toggle('active',active);
          item.setAttribute('aria-pressed',String(active));
        });
        if(pendingRegion==='brasil'){
          setBrazilMapMode(map,brazilMapMode);
          const label=document.querySelector('#map-mesh-label');
          const hint=document.querySelector('#map-selection-hint');
          if(label) label.textContent=brazilMapMode==='regioes'?'MALHA DAS GRANDES REGIÕES':'MALHA DAS UNIDADES DA FEDERAÇÃO';
          if(hint) hint.textContent=brazilMapMode==='regioes'?'Selecione uma região para obter dados':'Selecione um estado ou distrito para obter dados';
        }
      }));
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
