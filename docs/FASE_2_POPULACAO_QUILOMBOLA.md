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

## Extração e integração

A base foi obtida do CSV exportado pelo responsável pelo projeto diretamente da tabela 9578 do SIDRA e integrada em `data/populacao-quilombola-censo-2022.js`. A estrutura contém os 184 municípios pernambucanos, vinculados pelo código IBGE, com total, dentro e fora de territórios. O script `scripts/extrair_populacao_quilombola.py` permanece como alternativa para extração automatizada futura via API, mas não foi a origem do arquivo atualmente integrado.

### Como executar no Windows PowerShell

Na pasta raiz do projeto:

```powershell
py scripts/extrair_populacao_quilombola.py
```

O script usa apenas a biblioteca padrão do Python. Não depende de pacotes adicionais.

## Regras de interpretação

1. O total municipal é o valor da categoria 32776.
2. As categorias 60027 e 60028 representam, respectivamente, pessoas em e fora de territórios quilombolas oficialmente delimitados.
3. A soma dentro + fora deve ser confrontada com o total. Quando o IBGE inibir um ou ambos os recortes com `X`, manter o total municipal e exibir “Não divulgado” no recorte protegido.
4. Traço (`-`) na variável de contagem foi tratado como zero de ocorrência; `X` foi tratado como dado inibido, nunca como zero.
5. Município com recorte inibido não deve ser rotulado como município sem população quilombola.
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

**Base municipal integrada ao painel.** O CSV exportado da tabela 9578 foi lido e estruturado para os 184 municípios de Pernambuco. O agregado estadual confere exatamente com a linha UF da própria tabela: total de **78.864**, sendo **6.769** residentes em territórios quilombolas e **72.095** fora de territórios.

Os municípios Correntes (código 2604700) e Terra Nova (código 2615201) apresentam população quilombola total (2 e 51, respectivamente), mas a tabela informa `X` para os dois recortes de localização. O `X` é preservado como dado inibido e aparece no painel como “Não divulgado”; não é convertido em zero. Traços (`-`) na tabela foram tratados como ausência de ocorrência na contagem e representados como zero no conjunto municipal.

A soma dos valores municipais não inibidos dos recortes dentro/fora não reproduz os totais estaduais porque os valores de Correntes e Terra Nova estão protegidos: a diferença agregada é 20 pessoas no recorte “dentro” e 33 no recorte “fora”, totalizando as 53 pessoas desses dois municípios.

A soma dos totais quilombolas dos 184 municípios confere com 78.864. A auditoria dos percentuais municipais e a conferência visual da interface permanecem como etapas seguintes.

## Referências

- IBGE — SIDRA, tabela 9578: https://sidra.ibge.gov.br/tabela/9578
- IBGE — Censo Demográfico 2022: https://www.ibge.gov.br/estatisticas/sociais/populacao/22827-censo-demografico-2022.html
- Explorador de metadados SIDRA (fonte secundária para documentação dos códigos): https://quantilica.com/ibge-sidra/tabelas/9578/populacao-residente-total-quilombola-localizacao-domicilio
- IBGE — O Brasil Quilombola: https://www.ibge.gov.br/brasil-quilombola/
- Secretaria de Assistência Social de Pernambuco — Diagnóstico da População Quilombola (fev. 2025): https://www.sigas.pe.gov.br/files/02122025033617-diagnostico.populacao.quilombola.fev.25.pdf
