import { CONFIG } from './config.js?v=20261125-pe-color';
import { normalizeCollection } from './data.js';
import { openMunicipality, openMesoregion } from './panel.js?v=20261125-vignette-fix-2';
import { MACROREGIONS_CENSUS_2022 } from '../data/populacao-quilombola-regioes-censo-2022.js';
import { MESOREGION_BY_MUNICIPALITY } from '../data/mesorregioes-municipios.js';
import { MESOREGION_QUILOMBOLA_2022 } from '../data/populacao-quilombola-mesorregioes-censo-2022.js';
import { getAgresteMunicipalityCommunityCount } from '../data/comunidades-agreste.js';

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

function getDeviceMinZoom() {
  return window.matchMedia('(max-width: 700px)').matches ? CONFIG.mobileMinZoom : CONFIG.minZoom;
}

export function createMap() {
  const deviceMinZoom = getDeviceMinZoom();
  const map = new maplibregl.Map({
    container: 'map',
    style: {
      version: 8,
      sources: {},
      layers: [{ id: 'background', type: 'background', paint: { 'background-color': CONFIG.colors.background } }]
    },
    center: CONFIG.center,
    zoom: CONFIG.zoom,
    minZoom: deviceMinZoom,
    maxZoom: CONFIG.maxZoom,
    pitch: CONFIG.pitch,
    bearing: CONFIG.bearing,
    antialias: true,
    attributionControl: true
  });
  // Reforça o limite mínimo também pela API, evitando que ajustes de enquadramento o contornem.
  map.setMinZoom(deviceMinZoom);
  map.setMaxZoom(CONFIG.maxZoom);
  map.on('load', () => {
    map.setMinZoom(getDeviceMinZoom());
    map.setMaxZoom(CONFIG.maxZoom);
  });
  map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), 'bottom-right');
  map.addControl(new maplibregl.ScaleControl({ maxWidth: 540, unit: 'metric' }), 'bottom-right');
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
        ['coalesce', ['get', '_meso_color'], CONFIG.colors.fill]
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
  // Divisas municipais finas e discretas, conforme a referência visual editorial.
  map.addLayer({
    id: LINE_ID, type: 'line', source: SOURCE_ID,
    paint: {
      'line-color': '#B49A80',
      'line-width': ['interpolate', ['linear'], ['zoom'], 4, 0.65, 6, 0.85, 8, 1.05, 10, 1.25],
      'line-opacity': 0.82,
      'line-blur': 0
    }
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
      maxZoom: CONFIG.maxZoom,
      minZoom: getDeviceMinZoom(),
      pitch: CONFIG.pitch,
      bearing: CONFIG.bearing
    });
  }
}

// Atribui a cada município a cor correspondente ao total quilombola de sua mesorregião.
export function applyMesorregionColors(geojson) {
  const counts={};
  geojson.features.forEach(feature=>{
    const code=String(feature.properties._app_code||feature.properties._app_id||'');
    const region=MESOREGION_BY_MUNICIPALITY[code];
    const stats=region?MESOREGION_QUILOMBOLA_2022[region]:null;
    feature.properties._mesoregion=region||'';
    const communityRecord=getAgresteMunicipalityCommunityCount(feature.properties._app_name);
    feature.properties._community_count=communityRecord?.count ?? null;
    feature.properties._community_subregion=communityRecord?.subregion ?? '';
    feature.properties._meso_color=stats?.color||'#D9CFC0';
    feature.properties._meso_total=stats?.total??-1;
  });
  Object.entries(MESOREGION_QUILOMBOLA_2022).forEach(([name])=>{
    counts[name]=geojson.features.filter(f=>f.properties._mesoregion===name).length;
  });
  console.info('Cores regionais aplicadas aos municípios:',counts);
  return geojson;
}


// Gera pontos representativos a partir da malha municipal existente.
 // Os pontos indicam municípios com registros, não a localização exata das comunidades.
function getRingCentroid(ring) {
  let area2=0, cx=0, cy=0;
  for(let i=0;i<ring.length-1;i++){
    const [x1,y1]=ring[i], [x2,y2]=ring[i+1];
    const cross=x1*y2-x2*y1;
    area2+=cross; cx+=(x1+x2)*cross; cy+=(y1+y2)*cross;
  }
  if(Math.abs(area2)<1e-12)return null;
  return [cx/(3*area2),cy/(3*area2)];
}
function getMunicipalityRepresentativePoint(geometry) {
  const polygons=geometry.type==='Polygon'?[geometry.coordinates]:geometry.coordinates;
  let best=null,bestArea=-1;
  polygons.forEach(polygon=>{
    const ring=polygon[0]; if(!ring?.length)return;
    const point=getRingCentroid(ring); if(!point)return;
    let area=0;
    for(let i=0;i<ring.length-1;i++)area+=ring[i][0]*ring[i+1][1]-ring[i+1][0]*ring[i][1];
    area=Math.abs(area);
    if(area>bestArea){bestArea=area;best=point;}
  });
  return best;
}
export function addCommunityPointLayer(map, geojson) {
  const sourceId='quilombola-community-points';
  const layerId='quilombola-community-circles';
  if(map.getLayer(layerId))map.removeLayer(layerId);
  if(map.getSource(sourceId))map.removeSource(sourceId);
  const features=geojson.features.filter(feature=>Number.isFinite(feature.properties?._community_count)&&feature.properties._community_count>0)
    .map(feature=>{
      const coordinates=getMunicipalityRepresentativePoint(feature.geometry);
      if(!coordinates)return null;
      return {type:'Feature',properties:{
        municipality:feature.properties._app_name,
        count:feature.properties._community_count,
        subregion:feature.properties._community_subregion
      },geometry:{type:'Point',coordinates}};
    }).filter(Boolean);
  map.addSource(sourceId,{type:'geojson',data:{type:'FeatureCollection',features}});
  map.addLayer({
    id:layerId,type:'circle',source:sourceId,
    layout:{visibility:'none'},
    paint:{
      'circle-radius':['interpolate',['linear'],['get','count'],1,5,3,7,6,10,11,14],
      'circle-color':'#C94F2D',
      'circle-opacity':0.9,
      'circle-stroke-color':'#FFF8ED',
      'circle-stroke-width':1.5
    }
  });
  return features.length;
}

// Camada temática opcional: destaca somente municípios com quantitativo documentado.
 // Os demais permanecem sem classificação; ausência de registro não equivale a zero.
export function setCommunityLayer(map, enabled, mode='municipios') {
  if (map.getLayer(FILL_ID)) {
    map.setPaintProperty(FILL_ID, 'fill-extrusion-color', [
      'case',
      ['boolean', ['feature-state', 'selected'], false], CONFIG.colors.selected,
      ['boolean', ['feature-state', 'hover'], false], '#a98668',
      enabled && mode==='municipios' ? ['>', ['coalesce', ['get', '_community_count'], 0], 0] : false, '#D66A32',
      ['coalesce', ['get', '_meso_color'], CONFIG.colors.fill]
    ]);
  }
  const circles='quilombola-community-circles';
  if(map.getLayer(circles))map.setLayoutProperty(circles,'visibility',enabled&&mode==='subregioes'?'visible':'none');
}

export function setPernambucoMapMode(map, mode) {
  const subregions = mode === 'subregioes';
  // O controle temático permanece disponível nos dois modos de Pernambuco.
  const communityControl = document.querySelector('#community-layer-control');
  if (communityControl) communityControl.hidden = false;
  if (map.getLayer('municipios-lines')) map.setLayoutProperty('municipios-lines','visibility',subregions?'none':'visible');
  if (map.getLayer('municipios-labels')) map.setLayoutProperty('municipios-labels','visibility',subregions?'none':'visible');

  const mesh = document.querySelector('#map-mesh-label');
  if (mesh) mesh.textContent = subregions ? 'MESORREGIÕES DE PERNAMBUCO' : 'MALHA MUNICIPAL';

  const legend = document.querySelector('#mesoregion-legend');
  if (legend) legend.style.display = subregions ? 'flex' : 'none';
  if (map.getLayer('mesoregion-boundaries-line')) map.setLayoutProperty('mesoregion-boundaries-line','visibility',subregions?'visible':'none');

  document.querySelectorAll('.map-footer .legend').forEach((item,index)=>{
    item.style.display='flex';
    item.lastChild.textContent=subregions
      ? (index===0?'Mesorregião':'Mesorregião selecionada')
      : (index===0?'Município':'Município selecionado');
  });

  const hint = document.querySelector('#map-selection-hint');
  if (hint) hint.textContent = subregions
    ? 'Passe o cursor e selecione uma mesorregião'
    : 'Passe o cursor e selecione um município';
}

// Camada de Pernambuco dentro do mapa do Nordeste: alterna leitura municipal e mesorregional.
export function addPernambucoNortheastOverlay(map, geojson) {
  if (!map.getSource('municipios-pe')) throw new Error('A malha municipal de Pernambuco ainda não foi carregada.');
  map.addLayer({
    id:'ne-pe-municipios-fill',type:'fill',source:SOURCE_ID,
    paint:{'fill-color':['coalesce',['get','_meso_color'],'#D9CFC0'],'fill-opacity':0.98}
  });
  map.addLayer({
    id:'ne-pe-municipios-lines',type:'line',source:SOURCE_ID,
    paint:{'line-color':'#B49A80','line-width':0.65,'line-opacity':0.8}
  });
  map.addLayer({
    id:'ne-pe-outline',type:'line',source:'estados-br',
    filter:['==',['get','_app_code'],'26'],
    paint:{'line-color':'#F3EBDD','line-width':1.8,'line-opacity':1}
  });
  // Nesta escala, Pernambuco é selecionado como Unidade da Federação.
  // A sobreposição mesorregional é somente visual; o clique exibe o total estadual.
  map.setLayoutProperty('ne-pe-municipios-fill','visibility','none');
  map.setLayoutProperty('ne-pe-municipios-lines','visibility','none');
  map.setLayoutProperty('ne-pe-outline','visibility','none');
}

export function setNortheastPeMode(map, mode) {
  const subregions=mode==='subregioes';
  const visible=mode==='off'?'none':'visible';
  ['ne-pe-municipios-fill','ne-pe-municipios-lines','ne-pe-outline'].forEach(id=>{
    if(map.getLayer(id))map.setLayoutProperty(id,'visibility',visible);
  });
  if(map.getLayer('ne-pe-municipios-lines'))map.setLayoutProperty('ne-pe-municipios-lines','visibility',mode==='off'||subregions?'none':'visible');
  const hint=document.querySelector('#map-selection-hint');
  if(hint&&mode!=='off')hint.textContent=subregions?'Selecione uma sub-região de Pernambuco para obter dados':'Selecione um município de Pernambuco para obter dados';
  const mesh=document.querySelector('#map-mesh-label');
  if(mesh&&mode!=='off')mesh.textContent=subregions?'MESORREGIÕES DE PERNAMBUCO':'MALHA MUNICIPAL DE PERNAMBUCO';
  const legend=document.querySelector('#mesoregion-legend');
  if(legend)legend.style.display=mode==='off'?'none':'flex';
}

// Legenda com quantitativos reais; as divisas municipais permanecem finas e discretas.
function buildMesorregionBoundaryGeoJSON(geojson) {
  const edges = new Map();
  const keyPoint = point => point.map(value => Number(value).toFixed(6)).join(',');
  const addRing = (ring, region) => {
    for (let i=0;i<ring.length-1;i++) {
      const a=ring[i], b=ring[i+1];
      const ka=keyPoint(a), kb=keyPoint(b);
      const key=ka<kb ? ka+'|'+kb : kb+'|'+ka;
      if(!edges.has(key)) edges.set(key,[]);
      edges.get(key).push({region,coordinates:[a,b]});
    }
  };
  const walkGeometry = (geometry, region) => {
    if(!geometry)return;
    const walkCoordinates = coords => {
      if(!Array.isArray(coords)||!coords.length)return;
      if(typeof coords[0][0]==='number') addRing(coords,region);
      else coords.forEach(walkCoordinates);
    };
    walkCoordinates(geometry.coordinates);
  };
  geojson.features.forEach(feature=>walkGeometry(feature.geometry,feature.properties._mesoregion));
  const features=[];
  edges.forEach(occurrences=>{
    const regions=new Set(occurrences.map(item=>item.region).filter(Boolean));
    if(regions.size>1) {
      const segment=occurrences[0].coordinates;
      features.push({type:'Feature',properties:{},geometry:{type:'LineString',coordinates:segment}});
    }
  });
  return {type:'FeatureCollection',features};
}

export function addMesorregionBoundaries(map, geojson) {
  const boundarySource='mesoregion-boundaries';
  const boundaryLayer='mesoregion-boundaries-line';
  if(map.getLayer(boundaryLayer))map.removeLayer(boundaryLayer);
  if(map.getSource(boundarySource))map.removeSource(boundarySource);
  const boundaries=buildMesorregionBoundaryGeoJSON(geojson);
  map.addSource(boundarySource,{type:'geojson',data:boundaries});
  map.addLayer({
    id:boundaryLayer,type:'line',source:boundarySource,
    layout:{visibility:'none'},
    paint:{
      'line-color':'#FFFDF8',
      'line-width':['interpolate',['linear'],['zoom'],5,1.1,7,1.45,9,1.8],
      'line-opacity':0.94,
      'line-blur':0.15
    }
  });

  const existing=document.querySelector('#mesoregion-legend');
  if(existing) existing.remove();
  const legend=document.createElement('section');
  legend.id='mesoregion-legend';
  legend.className='mesoregion-legend';
  const heading=document.createElement('strong');
  heading.textContent='População quilombola por região';
  legend.append(heading);
  Object.entries(MESOREGION_QUILOMBOLA_2022).sort((a,b)=>a[1].rank-b[1].rank).forEach(([name,stats])=>{
    const item=document.createElement('div');item.className='mesoregion-legend-item';
    const swatch=document.createElement('span');swatch.className='mesoregion-swatch';swatch.style.backgroundColor=stats.color;
    const value=document.createElement('strong');value.className='mesoregion-value';value.textContent=new Intl.NumberFormat('pt-BR').format(stats.total);
    const separator=document.createElement('span');separator.className='mesoregion-separator';separator.textContent='|';
    const label=document.createElement('span');label.className='mesoregion-name';label.textContent=name;
    item.append(swatch,value,separator,label);legend.append(item);
  });
  const note=document.createElement('small');note.textContent='Pessoas · Censo 2022 · IBGE, SIDRA 9578';legend.append(note);
  const footer=document.querySelector('.map-footer');if(footer)footer.insertAdjacentElement('afterend',legend);
  return boundaries.features.length;
}

function getFeatureByName(geojson, value) {
  const normalized = value.trim().toLocaleLowerCase('pt-BR');
  return geojson.features.find(f => (f.properties._app_name || '').toLocaleLowerCase('pt-BR') === normalized);
}

export function bindMapInteractions(map, geojson, options = {}) {
  let selectedId = null;
  let selectedIds = [];
  let hoveredId = null;
  let hoverPopup = null;
  let lastTouchKey = null;
  let lastTouchAt = 0;
  const getMode = options.getMode || (() => 'municipios');
  const isTooltipEnabled = options.isTooltipEnabled || (() => true);
  const isCommunityLayerEnabled = options.isCommunityLayerEnabled || (() => false);
  const isTouchDevice = () => window.matchMedia('(hover: none), (pointer: coarse)').matches;
  const CIRCLE_LAYER = 'quilombola-community-circles';

  function resolveMunicipality(feature) {
    const props=feature?.properties||{};
    if(props.municipality) return geojson.features.find(item=>item.properties?._app_name===props.municipality)||null;
    const code=String(props._app_id??props._app_code??feature?.id??'');
    return geojson.features.find(item=>String(item.properties?._app_id??item.id??'')===code)||null;
  }

  function selectFeature(feature, forceMunicipality=false) {
    const sourceFeature=resolveMunicipality(feature)||feature;
    const mode=forceMunicipality?'municipios':getMode();
    if(mode==='subregioes'){
      const region=sourceFeature.properties?._mesoregion;
      if(!region)return;
      selectedIds.forEach(id=>map.setFeatureState({source:SOURCE_ID,id},{selected:false}));
      selectedId=null;
      const members=geojson.features.filter(item=>item.properties._mesoregion===region&&item.geometry);
      selectedIds=members.map(item=>String(item.properties._app_id));
      selectedIds.forEach(id=>map.setFeatureState({source:SOURCE_ID,id},{selected:true}));
      openMesoregion(region,members.length,members);
      return;
    }
    const id=String(sourceFeature.properties._app_id);
    selectedIds.forEach(old=>map.setFeatureState({source:SOURCE_ID,id:old},{selected:false}));
    selectedIds=[id];
    if(selectedId!==null)map.setFeatureState({source:SOURCE_ID,id:selectedId},{selected:false});
    selectedId=id;
    map.setFeatureState({source:SOURCE_ID,id},{selected:true});
    openMunicipality(sourceFeature);
  }

  function getTooltipParts(feature, forceMunicipality=false) {
    const props=feature?.properties||{};
    const isMunicipality=forceMunicipality||Boolean(props.municipality)||getMode()==='municipios';
    const name=props.municipality||props._app_name||props._mesoregion||'Território';
    const count=Number.isFinite(props.count)?props.count:props._community_count;
    return {name,isMunicipality,count};
  }

  function showFeatureTooltip(feature,lngLat,{withButton=false,forceMunicipality=false}={}) {
    const {name,isMunicipality,count}=getTooltipParts(feature,forceMunicipality);
    const content=document.createElement('div');
    content.className='atlas-feature-tooltip';
    const title=document.createElement('strong');
    title.textContent=name;
    content.append(title);
    if(isMunicipality&&isCommunityLayerEnabled()&&Number.isFinite(count)){
      const quantity=document.createElement('span');
      quantity.textContent=count+' comunidades · levantamento acadêmico UFPE';
      content.append(quantity);
    }
    if(withButton){
      const button=document.createElement('button');
      button.type='button';
      button.className='atlas-tooltip-action';
      button.textContent='Abrir painel lateral';
      button.addEventListener('click',event=>{
        event.stopPropagation();
        if(hoverPopup){hoverPopup.remove();hoverPopup=null;}
        selectFeature(feature,forceMunicipality);
        lastTouchKey=null;
      });
      content.append(button);
    }
    if(!hoverPopup)hoverPopup=new maplibregl.Popup({closeButton:true,closeOnClick:false,offset:22,className:withButton?'map-hover-tooltip map-hover-tooltip-actionable':'map-hover-tooltip map-hover-tooltip-static',maxWidth:'260px'});
    hoverPopup.setLngLat(lngLat).setDOMContent(content).addTo(map);
  }

  function featureKey(feature,forceMunicipality=false){
    const p=feature?.properties||{};
    return String(p.municipality||p._app_id||p._app_code||p._mesoregion||p._app_name||'');
  }

  function handleFeatureClick(feature,lngLat,forceMunicipality=false){
    if(!feature)return;
    if(!isTouchDevice()||!isTooltipEnabled()){
      if(hoverPopup){hoverPopup.remove();hoverPopup=null;}
      selectFeature(feature,forceMunicipality);
      return;
    }
    const key=featureKey(feature,forceMunicipality);
    const now=Date.now();
    if(lastTouchKey===key&&now-lastTouchAt<2800){
      if(hoverPopup){hoverPopup.remove();hoverPopup=null;}
      selectFeature(feature,forceMunicipality);
      lastTouchKey=null;
      lastTouchAt=0;
      return;
    }
    lastTouchKey=key;
    lastTouchAt=now;
    showFeatureTooltip(feature,lngLat,{withButton:true,forceMunicipality});
  }

  function handleHover(feature,lngLat,forceMunicipality=false){
    if(isTouchDevice()||!isTooltipEnabled()){
      if(hoverPopup){hoverPopup.remove();hoverPopup=null;}
      return;
    }
    showFeatureTooltip(feature,lngLat,{forceMunicipality});
  }

  map.on('mousemove',FILL_ID,event=>{
    map.getCanvas().style.cursor='pointer';
    const feature=event.features?.[0];if(!feature)return;
    if(getMode()==='subregioes'){
      if(hoveredId&&hoveredId!==selectedId)map.setFeatureState({source:SOURCE_ID,id:hoveredId},{hover:false});
      hoveredId=null;
      return;
    }
    const id=String(feature.properties._app_id);
    if(hoveredId&&hoveredId!==selectedId)map.setFeatureState({source:SOURCE_ID,id:hoveredId},{hover:false});
    hoveredId=id;
    if(id!==selectedId)map.setFeatureState({source:SOURCE_ID,id},{hover:true});
  });
  map.on('mousemove',FILL_ID,event=>{
    // Em Sub-regiões, as etiquetas pertencem somente às bolhas proporcionais.
    if(getMode()==='subregioes')return;
    const feature=event.features?.[0];if(feature)handleHover(feature,event.lngLat);
  });
  map.on('mousemove',CIRCLE_LAYER,event=>{
    const feature=event.features?.[0];if(feature)handleHover(feature,event.lngLat,true);
    map.getCanvas().style.cursor='pointer';
  });
  map.on('mouseleave',FILL_ID,()=>{
    if(hoverPopup&&!isTouchDevice()){hoverPopup.remove();hoverPopup=null;}
    map.getCanvas().style.cursor='';
    if(hoveredId&&hoveredId!==selectedId)map.setFeatureState({source:SOURCE_ID,id:hoveredId},{hover:false});
    hoveredId=null;
  });
  map.on('mouseleave',CIRCLE_LAYER,()=>{
    if(hoverPopup&&!isTouchDevice()){hoverPopup.remove();hoverPopup=null;}
  });

  map.on('click',event=>{
    const activeLayers=getMode()==='subregioes'?[CIRCLE_LAYER]:[CIRCLE_LAYER,FILL_ID];
    const hits=map.queryRenderedFeatures(event.point,{layers:activeLayers.filter(id=>map.getLayer(id))});
    if(!hits.length)return;
    const bubble=hits.find(item=>item.layer?.id===CIRCLE_LAYER);
    const feature=bubble||(getMode()==='municipios'?hits.find(item=>item.layer?.id===FILL_ID):null);
    if(feature)handleFeatureClick(feature,event.lngLat,Boolean(bubble));
  });

  const search = document.querySelector('#municipio-search');
  const suggestions = document.querySelector('#search-suggestions');
  let matches = [];
  let active = -1;
  function showSuggestions(value) {
    const q=value.trim().toLocaleLowerCase('pt-BR');
    suggestions.innerHTML='';
    if(!q){suggestions.hidden=true;matches=[];return;}
    matches=geojson.features.filter(f=>(f.properties._app_name||'').toLocaleLowerCase('pt-BR').includes(q))
      .sort((x,y)=>x.properties._app_name.localeCompare(y.properties._app_name,'pt-BR')).slice(0,10);
    active=-1;
    if(!matches.length){const empty=document.createElement('div');empty.className='search-empty';empty.textContent='Nenhum município encontrado.';suggestions.append(empty);}
    matches.forEach((feature,index)=>{
      const btn=document.createElement('button');btn.type='button';btn.className='search-suggestion';btn.setAttribute('role','option');
      const name=document.createElement('span');name.textContent=feature.properties._app_name;
      const code=document.createElement('small');code.textContent='Código IBGE: '+feature.properties._app_code;
      btn.append(name,code);btn.addEventListener('click',()=>{search.value=feature.properties._app_name;suggestions.hidden=true;selectFeature(feature);});
      suggestions.append(btn);
    });
    suggestions.hidden=false;
  }
  search.addEventListener('input',()=>showSuggestions(search.value));
  search.addEventListener('keydown',event=>{
    if(suggestions.hidden){if(event.key==='Enter'){const f=getFeatureByName(geojson,search.value);if(f)selectFeature(f);}return;}
    const options=[...suggestions.querySelectorAll('.search-suggestion')];
    if(event.key==='ArrowDown'){event.preventDefault();active=Math.min(active+1,options.length-1);}
    else if(event.key==='ArrowUp'){event.preventDefault();active=Math.max(active-1,0);}
    else if(event.key==='Enter'){event.preventDefault();if(matches[active]){search.value=matches[active].properties._app_name;suggestions.hidden=true;selectFeature(matches[active]);}else if(matches.length===1){search.value=matches[0].properties._app_name;suggestions.hidden=true;selectFeature(matches[0]);}}
    else if(event.key==='Escape'){suggestions.hidden=true;return;}
    options.forEach((o,i)=>o.setAttribute('aria-selected',String(i===active)));
  });
  document.addEventListener('click',event=>{if(!event.target.closest('.search-wrap'))suggestions.hidden=true;});
  
  document.querySelector('#reset-view').addEventListener('click', () => {
    if (selectedId !== null) map.setFeatureState({ source: SOURCE_ID, id: selectedId }, { selected: false });
    selectedId = null;
    selectedIds.forEach(id=>map.setFeatureState({source:SOURCE_ID,id},{selected:false}));
    selectedIds=[];

    // Reenquadra a malha completa, independentemente do município selecionado.
    const bounds = new maplibregl.LngLatBounds();
    const extendCoordinates = coords => {
      if (typeof coords[0] === 'number') bounds.extend(coords);
      else coords.forEach(extendCoordinates);
    };
    geojson.features.forEach(feature => extendCoordinates(feature.geometry.coordinates));

    if (!bounds.isEmpty()) {
      map.fitBounds(bounds, {
        padding: { top: 65, right: 65, bottom: 65, left: 65 },
        pitch: CONFIG.pitch,
        bearing: CONFIG.bearing,
        duration: 900,
        minZoom: getDeviceMinZoom(),
        maxZoom: CONFIG.maxZoom
      });
      map.setMinZoom(getDeviceMinZoom());
      map.setMaxZoom(CONFIG.maxZoom);
    }
  });
}

// Camada estadual coroplética: população quilombola absoluta (SIDRA 9578).
export async function loadStates() {
  const url = 'https://servicodados.ibge.gov.br/api/v3/malhas/paises/BR?intrarregiao=UF&qualidade=minima&formato=application/vnd.geo+json';
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Falha ao carregar malha estadual do IBGE: HTTP ${response.status}`);
  const geo = await response.json();
  if (!geo.features || !Array.isArray(geo.features)) throw new Error('Malha estadual sem feições GeoJSON.');
  return geo;
}

export function addStateLayer(map, geojson, stateData) {
  const byCode = new Map(stateData.map(item => [String(item.ibge).padStart(2,'0'), item]));
  geojson.features.forEach(feature => {
    const code = String(feature.properties.codarea || feature.properties._app_id || feature.id).padStart(2,'0');
    const item = byCode.get(code);
    feature.properties._app_code = code;
    feature.properties._app_name = item?.name || feature.properties.nome || feature.properties.name || code;
    feature.properties._app_quilombola = item?.quilombolaTotal ?? -1;
    feature.id = code;
  });
  map.addSource('estados-br', { type:'geojson', data:geojson, promoteId:'_app_code' });
  map.addLayer({
    id:'estados-fill', type:'fill', source:'estados-br',
    paint:{'fill-color':[
      'case',
      ['<',['get','_app_quilombola'],0],'#D9CFC0',
      ['step',['get','_app_quilombola'],
        '#E8D6C7', 6580.2, '#D7B5A0', 14626.2, '#B98570', 23020.2, '#965B49', 45952, '#783F32'
      ]
    ],'fill-opacity':0.96}
  });
  map.addLayer({id:'estados-lines',type:'line',source:'estados-br',paint:{'line-color':'#F3EBDD','line-width':1.15,'line-opacity':0.95}});
  map.addLayer({id:'estados-labels',type:'symbol',source:'estados-br',layout:{
    'text-field':['get','_app_name'],'text-font':['Open Sans Regular'],'text-size':['interpolate',['linear'],['zoom'],2,9,4,12],
    'text-max-width':9,'text-allow-overlap':false
  },paint:{'text-color':'#3D2500','text-halo-color':'#F3EBDD','text-halo-width':1.4}});
  const legend = document.createElement('div');
  legend.id='state-map-legend';
  legend.className='state-map-legend';
  legend.innerHTML='<strong>População quilombola</strong><span><i style="background:#E8D6C7"></i> até 6.580</span><span><i style="background:#D7B5A0"></i> 6.581–14.626</span><span><i style="background:#B98570"></i> 14.627–23.020</span><span><i style="background:#965B49"></i> 23.021–45.952</span><span><i style="background:#783F32"></i> acima de 45.952</span><small>Pessoas · Censo 2022 · SIDRA 9578</small>';
  document.querySelector('.map-stage').append(legend);
  map.on('click','estados-fill',event=>{
    const feature=event.features?.[0]; if(!feature)return;
    const p=feature.properties;
    const item=byCode.get(String(p._app_code).padStart(2,'0'));
    const fmt=value=>value===null||value===undefined||Number(value)<0?'Não divulgado':new Intl.NumberFormat('pt-BR').format(Number(value));
    const quilombola=item?.quilombolaTotal??null;
    const resident=item?.populationResident??null;
    const share=Number.isFinite(quilombola)&&Number.isFinite(resident)&&resident>0
      ? (quilombola/resident*100).toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2})+'%'
      : 'Não disponível';
    const html='<div class="state-popup"><strong>'+p._app_name+'</strong>'+
      '<span>População quilombola</span><b>'+fmt(quilombola)+'</b>'+
      '<small>População residente: '+fmt(resident)+'</small>'+
      '<small>Participação: '+share+'</small>'+
      '<small>Em territórios delimitados: '+fmt(item?.quilombolaInside)+'</small>'+
      '<small>Fora de territórios delimitados: '+fmt(item?.quilombolaOutside)+'</small>'+
      '<small>IBGE · Censo 2022 · SIDRA 9578 e 4709</small></div>';
    new maplibregl.Popup({closeButton:true,closeOnClick:true,offset:8})
      .setLngLat(event.lngLat).setHTML(html).addTo(map);
  });
  map.on('mouseenter','estados-fill',()=>map.getCanvas().style.cursor='pointer');
  map.on('mousemove','estados-fill',()=>map.getCanvas().style.cursor='pointer');
  map.on('mouseleave','estados-fill',()=>map.getCanvas().style.cursor='');
}

export function clearTerritorialSelection(map) {
  map.getContainer().querySelectorAll('.maplibregl-popup').forEach(popup => popup.remove());
  if (map.getSource(SOURCE_ID)) {
    const features = map.querySourceFeatures(SOURCE_ID);
    const ids = new Set(features.map(feature => feature.id ?? feature.properties?._app_id).filter(id => id != null));
    ids.forEach(id => map.setFeatureState({ source: SOURCE_ID, id }, { selected: false, hover: false }));
  }
}

export function showStateView(map, region) {
  const macroLegend=document.querySelector('#macroregion-map-legend');
  if(macroLegend) macroLegend.style.display='none';
  ['grandes-regioes-fill','grandes-regioes-lines','grandes-regioes-labels'].forEach(id=>{if(map.getLayer(id))map.setLayoutProperty(id,'visibility','none');});
  const stateVisibility = region === 'pernambuco' ? 'none' : 'visible';
  ['estados-fill','estados-lines','estados-labels'].forEach(id=>{if(map.getLayer(id))map.setLayoutProperty(id,'visibility',stateVisibility);});
  ['municipios-fill-3d','municipios-lines','municipios-labels'].forEach(id=>{if(map.getLayer(id))map.setLayoutProperty(id,'visibility',region==='pernambuco'?'visible':'none');});
  const search=document.querySelector('.search-wrap');
  const reset=document.querySelector('#reset-view');
  if(search) search.style.display=region==='pernambuco'?'':'none';
  if(reset) reset.style.display=region==='pernambuco'?'':'none';
  const legend=document.querySelector('#state-map-legend');
  if(legend) legend.style.display=region==='pernambuco'?'none':'grid';
  document.querySelectorAll('.map-footer .legend').forEach(item=>item.style.display=region==='pernambuco'?'flex':'none');
  const title=document.querySelector('.map-toolbar h2');
  if(title) title.textContent=region==='brasil'?'Brasil — população quilombola':region==='nordeste'?'Nordeste — população quilombola':'Municípios de Pernambuco';
  if(region==='brasil') {
    map.setFilter('estados-fill',null); map.setFilter('estados-lines',null); map.setFilter('estados-labels',null);
    map.fitBounds([[-74,-34],[-34,6]],{padding:55,duration:700});
  } else if(region==='nordeste') {
    const codes=['21','22','23','24','25','27','28','29'];
    const filter=['in',['get','_app_code'],['literal',codes]];
    ['estados-fill','estados-lines','estados-labels'].forEach(id=>map.setFilter(id,filter));
    map.fitBounds([[-48,-18],[-33,-1]],{padding:55,duration:700});
  }
}


// Malha das cinco Grandes Regiões do IBGE para o modo de exploração regional.
export async function loadMacroRegions() {
  const url='https://servicodados.ibge.gov.br/api/v3/malhas/paises/BR?intrarregiao=regiao&qualidade=minima&formato=application/vnd.geo+json';
  const response=await fetch(url);
  if(!response.ok) throw new Error(`Falha ao carregar malha das Grandes Regiões: HTTP ${response.status}`);
  const geo=await response.json();
  if(!geo.features||!Array.isArray(geo.features)) throw new Error('Malha das Grandes Regiões sem feições GeoJSON.');
  return geo;
}
export function addMacroRegionLayer(map,geojson) {
  // Códigos oficiais CD_REGIAO: 1 Norte, 2 Nordeste, 3 Sudeste, 4 Sul, 5 Centro-Oeste.
  const byCode = new Map([
    ['1', MACROREGIONS_CENSUS_2022.find(item=>item.name==='Norte')],
    ['2', MACROREGIONS_CENSUS_2022.find(item=>item.name==='Nordeste')],
    ['3', MACROREGIONS_CENSUS_2022.find(item=>item.name==='Sudeste')],
    ['4', MACROREGIONS_CENSUS_2022.find(item=>item.name==='Sul')],
    ['5', MACROREGIONS_CENSUS_2022.find(item=>item.name==='Centro-Oeste')]
  ]);
  const names={1:'Norte',2:'Nordeste',3:'Sudeste',4:'Sul',5:'Centro-Oeste'};
  geojson.features.forEach((feature,index)=>{
    const p=feature.properties||{};
    const rawCode=p.codarea??p.CD_REGIAO??p.id??feature.id??String(index+1);
    const code=String(rawCode).replace(/\D/g,'')||String(index+1);
    const item=byCode.get(code);
    feature.properties={...p,_region_code:code,_region_name:item?.name||p.nome||p.NM_REGIAO||p.name||names[code]||'Região',
      _quilombola:item?.quilombolaTotal??-1,_resident:item?.populationTotal??-1,
      _inside:item?.quilombolaInside??-1,_outside:item?.quilombolaOutside??-1,
      _share:item?item.quilombolaTotal/item.populationTotal*100:-1};
    feature.id=code;
  });
  map.addSource('grandes-regioes',{type:'geojson',data:geojson});
  map.addLayer({id:'grandes-regioes-fill',type:'fill',source:'grandes-regioes',
    paint:{'fill-color':['match',['get','_region_code'],
      '1','#B98570','2','#783F32','3','#B98570','4','#E8D6C7','5','#D7B5A0','#D9CFC0'],'fill-opacity':0.98}});
  map.addLayer({id:'grandes-regioes-lines',type:'line',source:'grandes-regioes',
    paint:{'line-color':'#F3EBDD','line-width':2.2,'line-opacity':1}});
  map.addLayer({id:'grandes-regioes-labels',type:'symbol',source:'grandes-regioes',
    layout:{'text-field':['get','_region_name'],'text-font':['Open Sans Regular'],'text-size':13,'text-allow-overlap':false},
    paint:{'text-color':'#3D2500','text-halo-color':'#F3EBDD','text-halo-width':2}});
  const legend=document.createElement('div');
  legend.id='macroregion-map-legend';legend.className='state-map-legend';
  legend.innerHTML='<strong>População quilombola</strong><span><i style="background:#E8D6C7"></i> até 40 mil</span><span><i style="background:#D7B5A0"></i> 40.001–100 mil</span><span><i style="background:#B98570"></i> 100.001–200 mil</span><span><i style="background:#965B49"></i> 200.001–500 mil</span><span><i style="background:#783F32"></i> acima de 500 mil</span><small>Pessoas · Censo 2022 · SIDRA 9578</small>';
  document.querySelector('.map-stage').append(legend);
  map.on('click','grandes-regioes-fill',event=>{
    const feature=event.features?.[0];if(!feature)return;
    const p=feature.properties;
    const fmt=value=>value<0?'Não disponível':new Intl.NumberFormat('pt-BR').format(value);
    const pct=value=>value<0?'Não disponível':value.toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2})+'%';
    const html='<div class="state-popup"><strong>'+p._region_name+'</strong><span>População quilombola</span><b>'+fmt(Number(p._quilombola))+'</b><small>População residente: '+fmt(Number(p._resident))+'</small><small>Participação: '+pct(Number(p._share))+'</small><small>Em territórios delimitados: '+fmt(Number(p._inside))+'</small><small>Fora de territórios delimitados: '+fmt(Number(p._outside))+'</small><small>IBGE · Censo 2022 · SIDRA 9578 e 4709</small></div>';
    new maplibregl.Popup({closeButton:true,offset:8}).setLngLat(event.lngLat).setHTML(html).addTo(map);
  });
  map.on('mouseenter','grandes-regioes-fill',()=>map.getCanvas().style.cursor='pointer');
  map.on('mouseleave','grandes-regioes-fill',()=>map.getCanvas().style.cursor='');
}

export function setBrazilMapMode(map,mode) {
  const regions=mode==='regioes';
  ['estados-fill','estados-lines','estados-labels'].forEach(id=>{if(map.getLayer(id))map.setLayoutProperty(id,'visibility',regions?'none':'visible');});
  ['grandes-regioes-fill','grandes-regioes-lines','grandes-regioes-labels'].forEach(id=>{if(map.getLayer(id))map.setLayoutProperty(id,'visibility',regions?'visible':'none');});
  const legend=document.querySelector('#state-map-legend');
  if(legend) legend.style.display=regions?'none':'grid';
  const macroLegend=document.querySelector('#macroregion-map-legend');
  if(macroLegend) macroLegend.style.display=regions?'grid':'none';
  const hint=document.querySelector('#map-selection-hint');
  if(hint) hint.textContent=regions?'Selecione uma região para obter dados':'Selecione um estado ou distrito para obter dados';
}
