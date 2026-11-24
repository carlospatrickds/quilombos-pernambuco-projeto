# Auditoria da população municipal — Censo 2022

**Data da consulta:** 24/11/2026  
**Período de referência:** Censo Demográfico 2022  
**Fonte original:** IBGE — SIDRA, tabela 4709, variável 93 (População residente).  
**Organização estadual consultada:** Observatório de Pernambuco — CONDEPE/FIDEM, série `sidra_censo_2022`.  
**Página da série:** https://www.cf.pe.gov.br/observatorio/serie?ano=2022&fonte=sidra_censo_2022&indicador=IBGE+-+População+residente

## Resultado da integração

- Registros municipais integrados: **184**.
- Códigos IBGE distintos: **184**.
- Soma da população dos 184 municípios: **9.055.764 pessoas**.
- Fernando de Noronha (distrito estadual, não município): **3.167 pessoas**.
- Soma dos 184 municípios + Fernando de Noronha: **9.058.931 pessoas**.
- Total estadual informado pelo IBGE para Pernambuco no Censo 2022: **9.058.931 pessoas**.

A conferência fecha aritmeticamente com o total estadual. A página da CONDEPE/FIDEM informa que a tabela contém 185 localidades, mas que o mapa apresenta os 184 municípios e que a tabela inclui Fernando de Noronha, distrito estadual, fora da malha municipal.

## Regras aplicadas

1. Fernando de Noronha não foi inserido entre os municípios.
2. Os dados foram indexados pelo código IBGE de sete dígitos.
3. A população foi armazenada como número inteiro de pessoas.
4. A população quilombola permanece pendente; não foi inferida a partir da população total.
5. A proporção quilombola não é calculada nesta fase.
6. O painel apresenta a população municipal e mantém os demais campos sem dado como “A verificar”.

## Arquivo integrado

`data/populacao-municipal-censo-2022.js`

A fonte registra última carga em 21/11/2026. A data de consulta desta extração é 24/11/2026. O dado tem referência censitária de 2022; essas três datas não devem ser confundidas.

## Limite da validação

A conferência do total agregado confirma cobertura e consistência aritmética, mas não substitui uma auditoria individual dos 184 valores contra uma extração direta independente da API SIDRA. Essa checagem linha a linha permanece recomendada antes de uma versão definitiva de produção.

## Referências

- CONDEPE/FIDEM — série municipal do Censo 2022: https://www.cf.pe.gov.br/observatorio/fontes/sidra_censo_2022
- CONDEPE/FIDEM — dados por localidade: https://www.cf.pe.gov.br/observatorio/serie?ano=2022&fonte=sidra_censo_2022&indicador=IBGE+-+População+residente
- IBGE — Cidades e Estados, Pernambuco: https://www.ibge.gov.br/cidades-e-estados/pe.html
- IBGE — SIDRA tabela 4709: https://sidra.ibge.gov.br/tabela/4709
- IBGE — Primeiros Resultados de População do Censo 2022: https://ftp.ibge.gov.br/Censos/Censo_Demografico_2022/Populacao_e_domicilios_Primeiros_resultados/Resultados_da_2a_apuracao_20231027/POP2022_Municipios_Primeiros_Resultados_20231222.pdf
