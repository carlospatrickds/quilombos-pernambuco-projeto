const REGIONAL_DATA = {
  brasil: {
    label: 'Brasil',
    quilombola: 1330186,
    resident: 203080756,
    inside: 167769,
    outside: 1162417
  },
  nordeste: {
    label: 'Nordeste',
    quilombola: 906337,
    resident: 54658515,
    inside: 89521,
    outside: 816816
  },
  pernambuco: {
    label: 'Pernambuco',
    quilombola: 78864,
    resident: 9058931,
    inside: 6769,
    outside: 72095
  }
};

const number = value => new Intl.NumberFormat('pt-BR').format(value);
const percent = value => `${value.toLocaleString('pt-BR', {minimumFractionDigits:2, maximumFractionDigits:2})}%`;

export function initRegionalDashboard() {
  const tabs = [...document.querySelectorAll('.regional-tab')];
  const panel = document.querySelector('#regional-panel');
  if (!tabs.length || !panel) return;

  function selectRegion(key) {
    const data = REGIONAL_DATA[key];
    if (!data) return;
    tabs.forEach(tab => {
      const active = tab.dataset.region === key;
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
    });
    panel.setAttribute('aria-labelledby', `tab-${key}`);
    document.querySelector('#regional-quilombola').textContent = number(data.quilombola);
    document.querySelector('#regional-resident').textContent = number(data.resident);
    document.querySelector('#regional-inside').textContent = number(data.inside);
    document.querySelector('#regional-outside').textContent = number(data.outside);
    document.querySelector('#regional-share').textContent = percent(data.quilombola / data.resident * 100);
    document.querySelector('#regional-inside-share').textContent = `${percent(data.inside / data.quilombola * 100)} da população quilombola`;
    document.querySelector('#regional-outside-share').textContent = `${percent(data.outside / data.quilombola * 100)} da população quilombola`;
    document.querySelector('#regional-share-note').textContent = `Percentual calculado sobre a população residente de ${data.label}`;
    document.querySelector('#regional-method').textContent =
      'A classificação “fora de territórios” indica residência fora dos territórios quilombolas oficialmente delimitados pelo IBGE; não significa ausência de identidade ou pertencimento quilombola.';
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectRegion(tab.dataset.region));
    tab.addEventListener('keydown', event => {
      if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0 :
        event.key === 'End' ? tabs.length - 1 :
        (index + (event.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length;
      tabs[next].focus();
      selectRegion(tabs[next].dataset.region);
    });
  });
  selectRegion('brasil');
}
