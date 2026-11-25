// Agregação municipal por mesorregião — IBGE Censo 2022, SIDRA 9578.
// Soma dos totais municipais disponíveis; os recortes dentro/fora preservam os X como não disponíveis.
// As cinco somas reproduzem o total estadual publicado (78.864).
export const MESOREGION_QUILOMBOLA_2022 = {
  "Agreste Pernambucano": { total:38718, color:"#783F32", rank:1 },
  "Sertão Pernambucano": { total:20793, color:"#965B49", rank:2 },
  "São Francisco Pernambucano": { total:11074, color:"#B98570", rank:3 },
  "Mata Pernambucana": { total:6261, color:"#D7B5A0", rank:4 },
  "Metropolitana de Recife": { total:2018, color:"#E8D6C7", rank:5 }
};
export const MESOREGION_QUILOMBOLA_SOURCE_2022 = {
  source:"IBGE, Censo Demográfico 2022, SIDRA tabela 9578, variável Pessoas quilombolas",
  aggregation:"Soma dos totais municipais por mesorregião histórica do IBGE (1989), com associação municipal CONDEPE/FIDEM",
  stateTotal:78864,
  checkedAt:"2026-11-25"
};
