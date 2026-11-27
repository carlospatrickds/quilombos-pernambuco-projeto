import { MUNICIPAL_DATA } from './data.js?v=20261127-ibge-comunidades-v111';
import { DATA_STATUS } from './config.js';
import { MESOREGION_QUILOMBOLA_2022 } from '../data/populacao-quilombola-mesorregioes-censo-2022.js';
import { AGRESTE_COMMUNITY_TOTAL, AGRESTE_COMMUNITY_SOURCE, getAgresteMunicipalityCommunityCount, getAgresteSubregionCounts } from '../data/comunidades-agreste.js';

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
  regional.append(note);

  if (name === 'Agreste Pernambucano') {
    const section = document.createElement('section');
    section.className = 'community-research-block';
    const title = document.createElement('h3');
    title.textContent = 'Levantamento acadêmico de comunidades';
    const total = document.createElement('strong');
    total.className = 'community-research-total';
    total.textContent = String(AGRESTE_COMMUNITY_TOTAL);
    const description = document.createElement('p');
    description.textContent = 'comunidades contabilizadas no levantamento de pesquisa utilizado como referência inicial do atlas. Esse número não corresponde ao total oficial atualizado de comunidades certificadas pela Fundação Cultural Palmares.';
    section.append(title, total, description);

    getAgresteSubregionCounts().forEach(subregion => {
      const group = document.createElement('div');
      group.className = 'community-subregion-group';
      const heading = document.createElement('h4');
      heading.textContent = subregion.name;
      const summary = document.createElement('p');
      summary.textContent = subregion.communityCount + ' comunidades · ' + subregion.municipalityCount + ' municípios';
      const list = document.createElement('ul');
      subregion.municipalities.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.municipality + ': ' + item.count;
        list.append(li);
      });
      group.append(heading, summary, list);
      section.append(group);
    });

    const source = document.createElement('p');
    source.className = 'community-research-source';
    source.textContent = 'Fonte: ' + AGRESTE_COMMUNITY_SOURCE.institution + '. ' + AGRESTE_COMMUNITY_SOURCE.title + ', ' + AGRESTE_COMMUNITY_SOURCE.section + ', ' + AGRESTE_COMMUNITY_SOURCE.table + ', pp. ' + AGRESTE_COMMUNITY_SOURCE.pages + '. Pesquisa 2022/2023; elaboração: ' + AGRESTE_COMMUNITY_SOURCE.researcher + '.';
    const link = document.createElement('a');
    link.href = AGRESTE_COMMUNITY_SOURCE.url;
    link.target = '_blank';
    link.rel = 'noopener';
    link.textContent = 'Consultar documento da UFPE';
    section.append(source, link);
    regional.append(section);
  }
  regional.style.display='grid';
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

  const censusCommunities = data.quilombolaLocalities;
  const declaredNode = $('#communities-declared');
  const localitiesNode = $('#quilombola-localities');
  const listDetails = $('#community-list-details');
  const listNode = $('#community-list');
  const agresteRecord = getAgresteMunicipalityCommunityCount(name);

  declaredNode.textContent = censusCommunities
    ? formatNumber(censusCommunities.communitiesDeclared)
    : 'A verificar';
  localitiesNode.textContent = censusCommunities
    ? formatNumber(censusCommunities.localities)
    : 'A verificar';

  $('#communities-copy').textContent = censusCommunities
    ? 'O Censo Demográfico 2022 identificou, neste município, ' +
      formatNumber(censusCommunities.communitiesDeclared) +
      ' comunidades declaradas associadas a ' +
      formatNumber(censusCommunities.localities) +
      ' localidades quilombolas. A relação abaixo reproduz as denominações registradas na base estadual do IBGE.'
    : 'A Tabela de Resultado 2 do IBGE não apresenta registro para este município. Isso não permite concluir ausência de comunidades quilombolas.';

  listNode.replaceChildren();
  if (censusCommunities?.communities?.length) {
    censusCommunities.communities.forEach(item => {
      const li = document.createElement('li');
      li.className = 'community-record';

      const identity = document.createElement('div');
      identity.className = 'community-record-identity';
      const nameNode = document.createElement('strong');
      nameNode.textContent = item.name || 'Denominação não informada';
      const code = document.createElement('small');
      code.textContent = 'Código IBGE da comunidade: ' + item.id;
      identity.append(nameNode, code);

      const localities = document.createElement('strong');
      localities.className = 'community-record-localities';
      localities.textContent = formatNumber(item.localities);

      const residents = document.createElement('span');
      residents.className = 'community-record-residents';
      residents.textContent = 'ND';
      residents.title = 'População individual por comunidade não disponível na base consultada.';

      li.append(identity, localities, residents);
      if (item.territories?.length) {
        const territory = document.createElement('small');
        territory.className = 'community-record-territory';
        territory.textContent = 'Território oficialmente delimitado associado no Censo: ' + item.territories.join('; ');
        li.append(territory);
      }
      listNode.append(li);
    });
    listDetails.hidden = false;
    listDetails.querySelector('summary').textContent =
      'Ver comunidades e indicadores (' + censusCommunities.communities.length + ')';
    $('#community-tags').replaceChildren();
    const sourceTag = document.createElement('a');
    sourceTag.className = 'tag';
    sourceTag.href = data.quilombolaLocalitiesSource?.url || 'https://www.ibge.gov.br/geociencias/organizacao-do-territorio/estrutura-territorial/27385-localidades.html?edicao=40668';
    sourceTag.target = '_blank';
    sourceTag.rel = 'noopener';
    sourceTag.textContent = 'Fonte: IBGE · Censo 2022 ↗';
    $('#community-tags').append(sourceTag);
  } else {
    listDetails.hidden = true;
    $('#community-tags').replaceChildren();
    const pending = document.createElement('span');
    pending.className = 'tag pending';
    pending.textContent = 'Sem registro na Tabela 2';
    $('#community-tags').append(pending);
  }

  content.querySelectorAll('.community-academic-note').forEach(node => node.remove());
  if (agresteRecord) {
    const academicNote = document.createElement('p');
    academicNote.className = 'community-academic-note';
    academicNote.textContent = 'Fonte complementar: o levantamento acadêmico de referência contabiliza ' +
      agresteRecord.count + ' comunidades para este município (' + agresteRecord.subregion +
      '). Esse quantitativo tem origem e metodologia próprias e não deve ser somado aos números do Censo 2022.';
    $('#communities-copy').insertAdjacentElement('afterend', academicNote);
  }
  $('#history-copy').textContent = agresteRecord
    ? 'As informações históricas das comunidades vinculadas a este município ainda não estão disponíveis. Conteúdo em levantamento documental.'
    : (data.history || DATA_STATUS.history);
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
      : 'A geometria vem da Malha Municipal de Pernambuco. Os indicadores demográficos e comunitários são apresentados conforme as respectivas fontes e anos de referência.');
  $('#source-copy').textContent += ' Comunidades declaradas e localidades: IBGE, Censo Demográfico 2022, Localidades Quilombolas, Tabela de Resultado 2 e arquivo vetorial estadual de Pernambuco. A relação nominal reproduz o campo NM_CQ do arquivo; a divergência entre o cabeçalho e o dicionário está documentada na Base Mestra.';
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