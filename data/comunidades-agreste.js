// Levantamento acadêmico preliminar do Agreste Pernambucano.
// Não representa total oficial atualizado de certificações da Fundação Cultural Palmares.
// Fonte: UFPE, Projeto Pedagógico da Licenciatura em Educação Escolar Quilombola Nego Bispo,
// Recife/Caruaru/Garanhuns/Petrolina, 2024, seção 4.1, Quadro 1, pp. 36-37 (PDF).
// O PPC informa que as tabelas do capítulo foram produzidas por Cassius Marcelus Cruz,
// no âmbito de pesquisa realizada em 2022/2023. O Quadro 2 resume Agreste = 68.
// A tabela discrimina quantidades por município, mas NÃO informa os nomes individuais
// das comunidades. Por isso, nenhum nome comunitário foi inferido ou criado.
export const AGRESTE_COMMUNITY_SOURCE = {
  title: 'Projeto Pedagógico da Licenciatura em Educação Escolar Quilombola Nego Bispo',
  institution: 'Universidade Federal de Pernambuco (UFPE)',
  section: '4.1 Quilombos e Políticas de Educação Escolar Quilombola em Pernambuco',
  table: 'Quadro 1 — Distribuição de Comunidades Quilombolas',
  pages: '36–37',
  researchPeriod: '2022/2023',
  publicationYear: 2024,
  researcher: 'Prof. Dr. Cassius Marcelus Cruz',
  url: 'https://www.ufpe.br/documents/3310313/5819053/PPC_LICENCIATURA%2BEEQ.%2BVERSA~O%2B28.02.2025.1.pdf/2ecab147-23ff-4e59-9678-b8272cc2e1ee',
  accessed: '2026-11-25',
  note: 'Quantitativo de pesquisa acadêmica preliminar. Não equivale ao total oficial atualizado de comunidades certificadas pela Fundação Cultural Palmares.'
};

export const AGRESTE_COMMUNITY_COUNTS = [
  { subregion: 'Agreste Meridional', municipality: 'Águas Belas', count: 4 },
  { subregion: 'Agreste Meridional', municipality: 'Angelim', count: 2 },
  { subregion: 'Agreste Meridional', municipality: 'Bom Conselho', count: 11 },
  { subregion: 'Agreste Meridional', municipality: 'Brejão', count: 2 },
  { subregion: 'Agreste Meridional', municipality: 'Buíque', count: 2 },
  { subregion: 'Agreste Meridional', municipality: 'Caetés', count: 1 },
  { subregion: 'Agreste Meridional', municipality: 'Capoeiras', count: 3 },
  { subregion: 'Agreste Meridional', municipality: 'Garanhuns', count: 6 },
  { subregion: 'Agreste Meridional', municipality: 'Iati', count: 1 },
  { subregion: 'Agreste Meridional', municipality: 'Itaíba', count: 6 },
  { subregion: 'Agreste Meridional', municipality: 'Saloá', count: 1 },
  { subregion: 'Agreste Meridional', municipality: 'Tupanatinga', count: 4 },
  { subregion: 'Agreste Central', municipality: 'Agrestina', count: 2 },
  { subregion: 'Agreste Central', municipality: 'Alagoinha', count: 3 },
  { subregion: 'Agreste Central', municipality: 'Altinho', count: 1 },
  { subregion: 'Agreste Central', municipality: 'Belo Jardim', count: 1 },
  { subregion: 'Agreste Central', municipality: 'Bezerros', count: 1 },
  { subregion: 'Agreste Central', municipality: 'Caruaru', count: 1 },
  { subregion: 'Agreste Central', municipality: 'Cupira', count: 1 },
  { subregion: 'Agreste Central', municipality: 'Lagoa dos Gatos', count: 2 },
  { subregion: 'Agreste Central', municipality: 'Panelas', count: 2 },
  { subregion: 'Agreste Central', municipality: 'Pesqueira', count: 1 },
  { subregion: 'Agreste Central', municipality: 'São Bento do Una', count: 6 },
  { subregion: 'Agreste Central', municipality: 'São Caetano', count: 1 },
  { subregion: 'Agreste Setentrional', municipality: 'João Alfredo', count: 1 },
  { subregion: 'Agreste Setentrional', municipality: 'Passira', count: 2 }
];

export const AGRESTE_COMMUNITY_TOTAL = AGRESTE_COMMUNITY_COUNTS.reduce((sum, item) => sum + item.count, 0);

export function normalizeMunicipalityName(name = '') {
  return String(name).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR').trim();
}

export function getAgresteMunicipalityCommunityCount(name) {
  const normalized = normalizeMunicipalityName(name);
  return AGRESTE_COMMUNITY_COUNTS.find(item => normalizeMunicipalityName(item.municipality) === normalized) || null;
}

export function getAgresteSubregionCounts() {
  return ['Agreste Meridional', 'Agreste Central', 'Agreste Setentrional'].map(name => {
    const municipalities = AGRESTE_COMMUNITY_COUNTS.filter(item => item.subregion === name);
    return { name, municipalityCount: municipalities.length, communityCount: municipalities.reduce((sum, item) => sum + item.count, 0), municipalities };
  });
}
