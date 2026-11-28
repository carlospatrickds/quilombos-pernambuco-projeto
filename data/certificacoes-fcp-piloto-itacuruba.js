// Cruzamento piloto IBGE × Fundação Cultural Palmares — Itacuruba/PE.
// Registros administrativos independentes dos dados censitários.
// "Não localizado" nunca significa "não certificado".
export const FCP_CROSSWALK_SOURCE = {
  institution: 'Fundação Cultural Palmares',
  title: 'Relação de comunidades certificadas — arquivo oficial disponibilizado em 03/06/2024',
  accessedAt: '2026-11-27',
  url: 'https://www.gov.br/palmares/pt-br/midias/arquivos-menu-departamentos/dpa/comunidades-certificadas/crqs-certificadas-03-06-2024.csv/view',
  certificationPage: 'https://www.gov.br/palmares/pt-br/departamentos/protecao-preservacao-e-articulacao/certificacao-quilombola',
  scope: 'Cruzamento-piloto nominal e por número de processo para as comunidades do município de Itacuruba/PE presentes na relação do IBGE.'
};

export const FCP_BY_IBGE_COMMUNITY = {
  '2607406:446': {
    status: 'nao_localizada_na_extracao',
    label: 'Não localizada na extração consultada',
    processFcp: null,
    certificationDate: null,
    evidence: 'A correspondência não foi localizada na extração consultada da relação FCP. Isso não permite afirmar ausência de certificação.',
    sourceUrl: FCP_CROSSWALK_SOURCE.url,
    checkedAt: '2026-11-27'
  },
  '2607406:4349': {
    status: 'certificada',
    label: 'Certificada',
    fcpName: 'NEGROS DE GILÚ',
    processFcp: '01420.000285/2002-71',
    certificationDate: '19/04/2005',
    fcpRecord: 'Livro 2, registro 137, folha 42; Portaria 7/2005',
    incraProcess: '54141.000746/2003-99; 54141.001004/2007-12',
    sourceUrl: FCP_CROSSWALK_SOURCE.url,
    checkedAt: '2026-11-27'
  },
  '2607406:5041': {
    status: 'certificada',
    label: 'Certificada',
    fcpName: 'POÇO DOS CAVALOS',
    processFcp: '01420.000170/2006-18',
    certificationDate: '12/05/2006',
    fcpRecord: 'Livro 6, registro 519, folha 28; Portaria 08/2006',
    incraProcess: '54141.000209/2015-82',
    sourceUrl: FCP_CROSSWALK_SOURCE.url,
    checkedAt: '2026-11-27'
  }
};
