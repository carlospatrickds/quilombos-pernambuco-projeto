# Fase 2 — População quilombola municipal (Censo 2022)

## Objetivo
Obter, por código IBGE, a população quilombola dos 184 municípios de Pernambuco e sua distribuição conforme localização do domicílio.

## Fonte primária
IBGE, Censo Demográfico 2022, SIDRA, tabela 9578 — *População residente, total e quilombola, por localização do domicílio*.

A página oficial **O Brasil Quilombola**, do IBGE, também disponibiliza distribuição espacial por município e informa os totais de pessoas residentes dentro e fora de territórios quilombolas oficialmente delimitados. A tabela 9578 é a fonte principal para a extração municipal; a tabela 9723 trata da população residente em territórios quilombolas segundo os próprios territórios e é complementar, não substitui a 9578 para o total municipal.

- Tabela: https://sidra.ibge.gov.br/tabela/9578
- Metadados auxiliares (catálogo independente baseado na API do IBGE): https://quantilica.com/ibge-sidra/tabelas/9578/populacao-residente-total-quilombola-localizacao-domicilio
- Painel oficial IBGE: https://www.ibge.gov.br/brasil-quilombola/
- Página oficial do Censo 2022: https://www.ibge.gov.br/estatisticas/sociais/populacao/22827-censo-demografico-2022.html
- API: https://apisidra.ibge.gov.br/values/t/9578/n6/in%20n3/26/v/93,4728,4709,1004709/p/2022/c2661/32776,60027,60028/h/n
- Data da consulta aos metadados: 24/11/2026.
- A data efetiva da extração será gravada automaticamente pelo script.

## Variáveis da tabela

| Código | Variável | Unidade |
|---|---|---|
| 93 | População residente | Pessoas |
| 4728 | Percentual de pessoas quilombolas no total de população residente | % |
| 4709 | Pessoas quilombolas | Pessoas |
| 1004709 | Pessoas quilombolas — percentual do total geral | % |

## Classificação 2661 — Localização do domicílio

| Código | Categoria |
|---|---|
| 32776 | Total |
| 60027 | Em territórios quilombolas |
| 60028 | Fora de territórios quilombolas |

## Extração reprodutível

Foi incluído o script `scripts/extrair_populacao_quilombola.py`, que consulta a API do IBGE diretamente, exige cobertura dos 184 municípios e interrompe a gravação se houver ausência de dados essenciais. A saída esperada é `data/populacao-quilombola-censo-2022.json`.

### Como executar no Windows PowerShell

Na pasta raiz do projeto:

```powershell
py scripts/extrair_populacao_quilombola.py
```

O script usa apenas a biblioteca padrão do Python. Não depende de pacotes adicionais.

## Regras de interpretação

1. O total municipal é o valor da categoria 32776.
2. As categorias 60027 e 60028 representam, respectivamente, pessoas em e fora de territórios quilombolas oficialmente delimitados.
3. A soma dentro + fora deve ser confrontada com o total. Divergências são registradas e não corrigidas automaticamente.
4. Percentuais publicados pelo IBGE são preservados. Não se substitui valor ausente por zero.
5. Município sem valor disponível não deve ser rotulado como município sem população quilombola.
6. População quilombola, comunidade certificada pela Fundação Cultural Palmares e território quilombola reconhecido/delimitado são conceitos e registros distintos.
7. A população quilombola não deve ser inferida a partir de certificações, titulações, nomes de comunidades ou estimativas locais.

## Critérios de aceite

- 184 municípios identificados por código IBGE.
- Extração bruta e data de consulta preservadas.
- Total, dentro e fora de territórios separados.
- Soma dentro + fora conferida contra o total, com divergências explicitadas.
- Conferência do agregado estadual contra divulgação oficial do IBGE.
- Percentual quilombola municipal conferido com a variável 4728.
- Nenhum dado estimado ou preenchido artificialmente.

## Situação em 24/11/2026

**Em andamento — fonte e estrutura confirmadas; extração municipal ainda não validada.** A consulta aos metadados da tabela 9578 confirmou que ela contém os quatro indicadores descritos, a classificação 2661 com as três categorias (total, em e fora de territórios quilombolas) e abrangência municipal N6. O painel oficial do IBGE também apresenta distribuição espacial municipal. O endpoint registrado no script é uma consulta proposta e ainda precisa ser executado e confrontado com o SIDRA antes de ser considerado validado. Nenhum número municipal foi publicado no Atlas.

### Referência do total estadual

A captura do painel oficial do IBGE consultada em 24/11/2026 pelo responsável pelo projeto mostra **78.864 pessoas quilombolas em Pernambuco**. Uma publicação anterior baseada nos primeiros resultados do Censo registra 78.827. Esses valores não devem ser misturados: a diferença deve ser tratada como possível atualização/revisão da divulgação e a extração municipal deverá ser confrontada com a versão efetivamente retornada pela tabela 9578 na data da consulta. O valor de 78.864 fica registrado como referência visual do painel atual, ainda sujeito à conferência com o agregado estadual da API.

## Referências

- IBGE — SIDRA, tabela 9578: https://sidra.ibge.gov.br/tabela/9578
- IBGE — Censo Demográfico 2022: https://www.ibge.gov.br/estatisticas/sociais/populacao/22827-censo-demografico-2022.html
- Explorador de metadados SIDRA (fonte secundária para documentação dos códigos): https://quantilica.com/ibge-sidra/tabelas/9578/populacao-residente-total-quilombola-localizacao-domicilio
- IBGE — O Brasil Quilombola: https://www.ibge.gov.br/brasil-quilombola/
- Secretaria de Assistência Social de Pernambuco — Diagnóstico da População Quilombola (fev. 2025): https://www.sigas.pe.gov.br/files/02122025033617-diagnostico.populacao.quilombola.fev.25.pdf
