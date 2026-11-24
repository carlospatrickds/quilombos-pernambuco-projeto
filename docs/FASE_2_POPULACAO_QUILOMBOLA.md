# Fase 2 — População quilombola municipal (Censo 2022)

## Objetivo
Obter, por código IBGE, a população quilombola dos 184 municípios de Pernambuco e sua distribuição conforme localização do domicílio.

## Fonte primária
IBGE, Censo Demográfico 2022, SIDRA, tabela 9578 — *População residente, total e quilombola, por localização do domicílio*.

- Tabela: https://sidra.ibge.gov.br/tabela/9578
- Metadados consultados: https://quantilica.com/ibge-sidra/tabelas/9578/populacao-residente-total-quilombola-localizacao-domicilio
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

**Em andamento.** Metadados, variáveis, classificação e script de extração documentados. Os números municipais ainda não foram publicados no atlas: dependem da execução da consulta à API e da validação do arquivo resultante.

## Referências

- IBGE — SIDRA, tabela 9578: https://sidra.ibge.gov.br/tabela/9578
- IBGE — Censo Demográfico 2022: https://www.ibge.gov.br/estatisticas/sociais/populacao/22827-censo-demografico-2022.html
- Explorador de metadados SIDRA (fonte secundária para documentação dos códigos): https://quantilica.com/ibge-sidra/tabelas/9578/populacao-residente-total-quilombola-localizacao-domicilio
- Secretaria de Assistência Social de Pernambuco — Diagnóstico da População Quilombola (fev. 2025): https://www.sigas.pe.gov.br/files/02122025033617-diagnostico.populacao.quilombola.fev.25.pdf
