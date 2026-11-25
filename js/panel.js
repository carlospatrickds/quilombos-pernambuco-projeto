import { MUNICIPAL_DATA } from './data.js';
import { DATA_STATUS } from './config.js';
import { MESOREGION_QUILOMBOLA_2022 } from '../data/populacao-quilombola-mesorregioes-censo-2022.js';

const $ = (selector) => document.querySelector(selector);
const panel = $('#municipio-panel');
const backdrop = $('#panel-backdrop');


const SVG_NS = 'http://www.w3.org/2000/svg';

function renderMunicipalityVignette(feature, options = {}) {
  const host = $('#municipality-vignette');
  if (!host) return;
  host.replaceChildren();
  const geometry = feature?.geometry;
  if (!geometry || !['Polygon', 'MultiPolygon'].includes(geometry.type)) return;

  let polygons = geometry.type === 'Polygon' ? [geometry.coordinates] : geometry.coordinates;
  // Mantém todos os polígonos da seleção, inclusive municípios periféricos da região.

  // Calcula os limites em passagem única. Evita Math.min(...array) com
  // milhares de vértices, que pode estourar o limite de argumentos do navegador.
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  let pointCount = 0;
  polygons.forEach(polygon => polygon.forEach(ring => ring.forEach(point => {
    const x = Number(point?.[0]), y = Number(point?.[1]);
    if (!Number.isFinite(x) || !Number.isFinite(y)) return;
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
    pointCount++;
  })));
  if (!pointCount) return;
  const width = Math.max(maxX - minX, 1e-9), height = Math.max(maxY - minY, 1e-9);
  const pad = options.zoomFactor ? 0 : 9, viewWidth = 220, viewHeight = 130;
  const fitScale = Math.min((viewWidth - pad * 2) / width, (viewHeight - pad * 2) / height);
  const scale = fitScale * (options.zoomFactor || 1);
  const centerX = (minX + maxX) / 2, centerY = (minY + maxY) / 2;
  const project = point => ({
    x: viewWidth / 2 + (point[0] - centerX) * scale,
    y: viewHeight / 2 - (point[1] - centerY) * scale
  });

  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('viewBox', `0 0 ${viewWidth} ${viewHeight}`);
  svg.setAttribute('width', '140');
  svg.setAttribute('height', '82');
  svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', `Recorte cartográfico de ${feature.properties?._app_name || 'selecionado'}`);
  svg.classList.add('municipality-vignette-svg');

  // Desenha os polígonos da geometria no SVG do cabeçalho.
  // A mesma rotina atende municípios e a união das geometrias municipais de cada mesorregião.
  polygons.forEach(polygon => {
    const commands = [];
    polygon.forEach(ring => {
      if (!ring.length) return;
      const first = project(ring[0]);
      commands.push(`M ${first.x.toFixed(2)} ${first.y.toFixed(2)}`);
      for (let i = 1; i < ring.length; i++) {
        const point = project(ring[i]);
        commands.push(`L ${point.x.toFixed(2)} ${point.y.toFixed(2)}`);
      }
      commands.push('Z');
    });
    if (!commands.length) return;
    const path = document.createElementNS(SVG_NS, 'path');
    path.setAttribute('d', commands.join(' '));
    path.setAttribute('fill-rule', 'evenodd');
    path.classList.add('municipality-vignette-shape');
    svg.append(path);
  });

  host.append(svg);
}

function formatNumber(value) {
  if (value === null) return 'Não divulgado';
  if (value === undefined || value === '') return 'A verificar';
  return new Intl.NumberFormat('pt-BR').format(value);
}

export function openMesoregion(name, municipalityCount = null, municipalityFeatures = []) {
  const stats=MESOREGION_QUILOMBOLA_2022[name]; if(!stats)return;
  const content=$('.panel-content');
  content.querySelectorAll('.data-grid,.panel-section,.source-note').forEach(el=>el.style.display='none');
  let regional=content.querySelector('#mesoregion-panel-content');
  if(!regional){regional=document.createElement('section');regional.id='mesoregion-panel-content';regional.className='mesoregion-panel-content';$('#panel-code').insertAdjacentElement('afterend',regional);}
  const polygons = [];
  municipalityFeatures.forEach(feature => {
    const geometry = feature.geometry;
    if (!geometry) return;
    if (geometry.type === 'Polygon') polygons.push(geometry.coordinates);
    else if (geometry.type === 'MultiPolygon') polygons.push(...geometry.coordinates);
  });
  if (polygons.length) {
    renderMunicipalityVignette({
      type: 'Feature',
      properties: { _app_name: name },
      geometry: { type: 'MultiPolygon', coordinates: polygons }
    });
  } else {
    $('#municipality-vignette').replaceChildren();
  }
  $('#panel-region').textContent='PERNAMBUCO · MESORREGIÃO';
  $('#panel-title').textContent=name;
  $('#panel-code').textContent='Regionalização histórica do IBGE (1989)';
  const fmt=v=>new Intl.NumberFormat('pt-BR').format(v);
  const pct=(stats.total/78864*100).toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2})+'% do total estadual';
  regional.replaceChildren();
  [['População quilombola',fmt(stats.total)],['Participação no total estadual',pct],['Municípios integrantes',String(municipalityCount??'—')]].forEach(([label,value])=>{
    const card=document.createElement('article');card.className='data-card';
    const span=document.createElement('span');span.textContent=label;
    const strong=document.createElement('strong');strong.textContent=value;
    card.append(span,strong);regional.append(card);
  });
  const note=document.createElement('p');note.className='regional-panel-note';
  note.textContent='Agregação dos totais municipais de população quilombola do Censo Demográfico 2022, SIDRA 9578.';
  regional.append(note);regional.style.display='grid';
  backdrop.hidden=false;requestAnimationFrame(()=>panel.classList.add('open'));panel.setAttribute('aria-hidden','false');
}

export function openMunicipality(feature) {
  const content=$('.panel-content');
  content.querySelectorAll('.data-grid,.panel-section,.source-note').forEach(el=>el.style.display='');
  const regional=content.querySelector('#mesoregion-panel-content');if(regional)regional.style.display='none';
  const p = feature.properties || {};
  const id = String(p._app_id || feature.id || '');
  const name = p._app_name || 'Município';
  const data = MUNICIPAL_DATA[id] || {};

  renderMunicipalityVignette(feature);
  $('#panel-title').textContent = name;
  $('#panel-code').textContent = `Código IBGE: ${p._app_code || 'A confirmar'}`;
  $('#population-total').textContent = formatNumber(data.populationTotal);
  $('#population-quilombola').textContent = formatNumber(data.populationQuilombola);
  $('#population-quilombola-inside').textContent = formatNumber(data.populationQuilombolaInside);
  $('#population-quilombola-outside').textContent = formatNumber(data.populationQuilombolaOutside);

  const share = (Number.isFinite(data.populationTotal) && data.populationTotal > 0 &&
    Number.isFinite(data.populationQuilombola))
    ? `${(data.populationQuilombola / data.populationTotal * 100).toLocaleString('pt-BR',{maximumFractionDigits:2})}%`
    : 'A verificar';
  $('#population-share').textContent = share;

  $('#communities-copy').textContent = data.communities?.length
    ? 'Comunidades registradas para este município:'
    : DATA_STATUS.communities;
  $('#community-tags').innerHTML = '';
  if (data.communities?.length) {
    data.communities.forEach(item => {
      const tag = document.createElement('span');
      tag.className = 'tag';
      tag.textContent = typeof item === 'string' ? item : item.name;
      $('#community-tags').append(tag);
    });
  } else {
    const tag = document.createElement('span');
    tag.className = 'tag pending';
    tag.textContent = 'Informações em levantamento';
    $('#community-tags').append(tag);
  }

  $('#history-copy').textContent = data.history || DATA_STATUS.history;
  $('#gallery').innerHTML = '';
  if (data.photos?.length) {
    data.photos.forEach(photo => {
      const figure = document.createElement('figure');
      const img = document.createElement('img');
      img.src = photo.url;
      img.alt = photo.caption || `Registro de ${name}`;
      const caption = document.createElement('figcaption');
      caption.textContent = photo.caption || '';
      figure.append(img, caption);
      $('#gallery').append(figure);
    });
  } else {
    $('#gallery').innerHTML = '<div class="gallery-empty"><span>▧</span><p>Fotografias, documentos e registros serão adicionados após seleção e autorização das fontes.</p></div>';
  }

  const populationSource = data.populationTotalSource;
  $('#source-copy').textContent = data.sourceNote ||
    (populationSource
      ? `População municipal: IBGE, Censo Demográfico 2022, SIDRA tabela 4709, variável 93. População quilombola: IBGE, Censo Demográfico 2022, SIDRA tabela 9578, variável Pessoas quilombolas, localização do domicílio. Consulta: 24/11/2026. Nos recortes dentro/fora, “Não divulgado” identifica dado inibido pelo IBGE (X), não zero. Geometria: malha municipal, edição 2025.`
      : 'A geometria vem da Malha Municipal de Pernambuco. Indicadores demográficos e informações comunitárias ainda não foram conectados.');
  backdrop.hidden = false;
  requestAnimationFrame(() => panel.classList.add('open'));
  panel.setAttribute('aria-hidden', 'false');
}

export function closePanel() {
  panel.classList.remove('open');
  panel.setAttribute('aria-hidden', 'true');
  window.setTimeout(() => { backdrop.hidden = true; }, 420);
}

export function initPanel(onClose) {
  $('#panel-close').addEventListener('click', onClose);
  backdrop.addEventListener('click', onClose);
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') onClose();
  });
}