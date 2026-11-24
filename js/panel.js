import { MUNICIPAL_DATA } from './data.js';
import { DATA_STATUS } from './config.js';

const $ = (selector) => document.querySelector(selector);
const panel = $('#municipio-panel');
const backdrop = $('#panel-backdrop');

function formatNumber(value) {
  if (value === null || value === undefined || value === '') return 'A verificar';
  return new Intl.NumberFormat('pt-BR').format(value);
}

export function openMunicipality(feature) {
  const p = feature.properties || {};
  const id = String(p._app_id || feature.id || '');
  const name = p._app_name || 'Município';
  const data = MUNICIPAL_DATA[id] || {};

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
      ? `População municipal: IBGE, Censo Demográfico 2022, SIDRA tabela 4709, variável 93. Dados organizados pela CONDEPE/FIDEM. Consulta: 24/11/2026. População quilombola total e recortes de residentes dentro e fora de territórios oficialmente delimitados serão apresentados após validação municipal. Geometria: malha municipal, edição 2025.`
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