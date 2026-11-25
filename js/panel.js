import { MUNICIPAL_DATA } from './data.js';
import { DATA_STATUS } from './config.js';
import { MESOREGION_QUILOMBOLA_2022 } from '../data/populacao-quilombola-mesorregioes-censo-2022.js';

const $ = (selector) => document.querySelector(selector);
const panel = $('#municipio-panel');
const backdrop = $('#panel-backdrop');


const SVG_NS = 'http://www.w3.org/2000/svg';

function renderMunicipalityVignette(feature) {
  const host = $('#municipality-vignette');
  host.replaceChildren();
  const geometry = feature?.geometry;
  if (!geometry || !['Polygon', 'MultiPolygon'].includes(geometry.type)) return;

  const polygons = geometry.type === 'Polygon' ? [geometry.coordinates] : geometry.coordinates;
  const positions = [];
  const collect = value => {
    if (Array.isArray(value) && typeof value[0] === 'number' && typeof value[1] === 'number') positions.push(value);
    else if (Array.isArray(value)) value.forEach(collect);
  };
  collect(geometry.coordinates);
  if (!positions.length) return;

  const xs = positions.map(point => point[0]);
  const ys = positions.map(point => point[1]);
  const minX = Math.min(...xs), maxX = Math.max(...xs);
  const minY = Math.min(...ys), maxY = Math.max(...ys);
  const width = Math.max(maxX - minX, 1e-9);
  const height = Math.max(maxY - minY, 1e-9);
  const pad = 9, viewWidth = 220, viewHeight = 130;
  const scale = Math.min((viewWidth - pad * 2) / width, (viewHeight - pad * 2) / height);
  const drawnWidth = width * scale, drawnHeight = height * scale;
  const offsetX = (viewWidth - drawnWidth) / 2;
  const offsetY = (viewHeight - drawnHeight) / 2;

  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('viewBox', `0 0 ${viewWidth} ${viewHeight}`);
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', `Contorno cartográfico do município de ${feature.properties?._app_name || 'selecionado'}`);
  svg.classList.add('municipality-vignette-svg');

  polygons.forEach(polygon => {
    polygon.forEach(ring => {
      const commands = ring.map((point, index) => {
        const x = offsetX + (point[0] - minX) * scale;
        const y = viewHeight - (offsetY + (point[1] - minY) * scale);
        return `${index === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
      });
      if (commands.length) {
        commands.push('Z');
        const path = document.createElementNS(SVG_NS, 'path');
        path.setAttribute('d', commands.join(' '));
        path.setAttribute('class', 'municipality-vignette-shape');
        svg.append(path);
      }
    });
  });
  host.append(svg);
}

function formatNumber(value) {
  if (value === null) return 'Não divulgado';
  if (value === undefined || value === '') return 'A verificar';
  return new Intl.NumberFormat('pt-BR').format(value);
}

export function openMesoregion(name, municipalityCount = null) {
  const stats=MESOREGION_QUILOMBOLA_2022[name]; if(!stats)return;
  const content=$('.panel-content');
  content.querySelectorAll('.data-grid,.panel-section,.source-note').forEach(el=>el.style.display='none');
  let regional=content.querySelector('#mesoregion-panel-content');
  if(!regional){regional=document.createElement('section');regional.id='mesoregion-panel-content';regional.className='mesoregion-panel-content';$('#panel-code').insertAdjacentElement('afterend',regional);}
  $('#municipality-vignette').replaceChildren();
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