# Base Mestra Quilombola de Pernambuco

**Identificador:** BASE-QUILOMBOLA-PE-01  
**Versão:** 0.3 — extração nominal do CSV vetorial estadual e conciliação por códigos  
**Data de início:** 27/11/2026  
**Responsável pelo projeto:** Atlas Territorial Quilombos de Pernambuco  
**Situação:** quantitativos e registros nominais do CSV estadual conferidos por códigos; validação das geometrias SHP e revisão espacial dos pontos pendentes.

## 1. Objetivo

Construir uma base de referência estadual, rastreável e atualizável, que permita identificar as comunidades quilombolas declaradas no Censo Demográfico 2022, localizar as localidades associadas e relacionar esses registros, quando houver evidência, a territórios oficialmente delimitados, certificações da Fundação Cultural Palmares e processos de regularização fundiária.

A base será a origem controlada dos quantitativos, fichas municipais e futuras camadas temáticas do Atlas. Nenhum registro será criado por inferência a partir de totais agregados.

## 2. Referência censitária inicial

A fonte principal de partida é o produto do IBGE **Censo Demográfico 2022: Localidades Quilombolas — Resultados do Universo** (2024).

A página oficial do produto disponibiliza:
- Tabela de resultado 01: territórios oficialmente delimitados, comunidades quilombolas declaradas e associadas a localidades quilombolas e localidades quilombolas por Unidade da Federação;
- Tabela de resultado 02: comunidades declaradas e localidades quilombolas por município;
- Tabela de resultado 03: localidades quilombolas segundo os territórios oficialmente delimitados;
- Apêndice 1: listagem de localidades quilombolas por município;
- Apêndice 2: listagem de localidades segundo territórios oficialmente delimitados;
- Arquivos geoespaciais vetoriais por Brasil e Unidade da Federação, em SHP, KMZ e CSV, além do dicionário de dados.

**Página oficial:** https://www.ibge.gov.br/geociencias/organizacao-do-territorio/estrutura-territorial/27385-localidades.html?edicao=40668

**Página de acesso alternativo do produto:** https://www.ibge.gov.br/estatisticas/sociais/trabalho/22827-censo-demografico-2022.html/22827-censo-demografico-2022.html?edicao=40667

**Publicação em PDF:** https://acervo.socioambiental.org/sites/default/files/documents/03d00274.pdf  
O PDF é uma cópia de acesso; a página e os arquivos de dados do IBGE permanecem como referência institucional prioritária.

### 2.1 Quantitativos estaduais de referência

A publicação e a página de resultados apresentam, para Pernambuco, os quantitativos de referência de **566 comunidades quilombolas declaradas e associadas a localidades quilombolas** e **621 localidades quilombolas**. A tabela por Unidade da Federação também discrimina os territórios oficialmente delimitados e as localidades segundo sua relação territorial.

Esses valores são resultados censitários de 2022. Não devem ser descritos como cadastro administrativo atualizado em 2026, nem como total de comunidades certificadas pela FCP.

Antes de promover os números a indicadores consolidados no Atlas, a equipe deverá conferir os valores diretamente na planilha original da Tabela 01 e reconciliá-los com a Tabela 02 e os Apêndices 01 e 02. A conferência de publicação não substitui a extração e validação dos registros nominais.

## 3. Unidades de registro: entidades separadas

A base não terá uma única linha por “localidade/comunidade/território”. Serão mantidas entidades independentes, ligadas por identificadores:

### 3.1 Comunidade
Unidade social declarada e identificada no produto censitário. A chave de identificação deverá respeitar o código nacional de comunidade informado pelo IBGE, acompanhado dos códigos de ocorrência necessários para distinguir registros.

Campos previstos:
- `id_comunidade` (chave interna estável);
- `codigo_comunidade_ibge`;
- `nome_comunidade_ibge`;
- `municipio`;
- `codigo_municipio_ibge`;
- `fonte_primaria`;
- `ano_referencia`;
- `status_conferencia`;
- `observacoes`.

### 3.2 Localidade
Unidade geográfica associada à comunidade no mapeamento do IBGE. Uma comunidade pode estar associada a uma ou mais localidades no mesmo município; portanto, não se deve exigir correspondência de um para um.

Campos previstos:
- `id_localidade`;
- `codigo_localidade_ibge`, quando fornecido;
- `nome_localidade_ibge`;
- `id_comunidade` ou chave de relacionamento extraída da fonte;
- `municipio` e `codigo_municipio_ibge`;
- `latitude` e `longitude`, quando disponíveis;
- `tipo_geometria` e `referencia_geoespacial`;
- `situacao_em_territorio_delimitado`;
- `id_territorio`, quando a relação for documentada;
- `fonte`, `ano_referencia` e `status_conferencia`.

### 3.3 Território oficialmente delimitado
Unidade territorial distinta das comunidades e localidades. Não contar cada polígono, nome alternativo ou fase de processo como território adicional.

Campos previstos:
- `id_territorio`;
- `codigo_territorio_ibge`, se disponível;
- `nome_territorio`;
- `municipio(s)`;
- `orgao_delimitador`;
- `situacao_fundiaria`;
- `documento_e_data`;
- `geometria`;
- `fonte`, `ano_referencia` e `status_conferencia`.

### 3.4 Registros administrativos complementares
Certificação FCP, processos INCRA e ITERPE serão tabelas independentes, ligadas às comunidades/territórios somente quando a correspondência nominal e territorial estiver documentada. Ausência de correspondência não será interpretada como inexistência.

## 4. Categorias analíticas da base

Cada comunidade poderá receber várias classificações simultâneas, sem exclusividade:

1. **Censo:** declarada e associada a localidade no Censo 2022; não localizada no recorte consultado; correspondência pendente.
2. **FCP:** certificada; certidão/registro não localizado na extração; divergência ou conferência pendente.
3. **Relação territorial:** associada a localidade dentro de território oficialmente delimitado; associada a localidade fora; relação não identificada; divergente.
4. **Regularização:** etapa documental INCRA; etapa documental ITERPE; outro órgão competente; não localizado; pendente.
5. **Fonte complementar:** acadêmica; técnica; estadual/municipal; comunitária; outras.
6. **Conferência:** conferido; conferência parcial; pendente; divergente; fonte dinâmica (marcador adicional, não substitui o estado).

Uma comunidade pode ser certificada e estar fora de território delimitado; pode estar dentro de território delimitado sem que isso, isoladamente, comprove titulação; pode aparecer em fonte acadêmica sem constar do cadastro FCP. As dimensões serão preservadas separadamente.

## 5. Protocolo de extração e conciliação

1. Baixar e arquivar os arquivos originais da Tabela 01, Tabela 02, Tabela 03, Apêndice 01, Apêndice 02 e arquivos geoespaciais do IBGE.
2. Registrar URL exata de cada arquivo, data de acesso, nome original, tamanho e hash SHA-256.
3. Ler o dicionário de dados antes de interpretar campos, códigos e geometrias.
4. Extrair os quantitativos estaduais da Tabela 01 e conferir os totais municipais na Tabela 02.
5. Construir a lista nominal de localidades a partir do Apêndice 01, preservando códigos e município.
6. Construir as relações entre localidades e territórios a partir do Apêndice 02 e da Tabela 03.
7. Recuperar, quando disponibilizado, o identificador/código da comunidade e relacioná-lo às localidades, sem deduzir correspondências por semelhança de nome.
8. Cruzar a lista censitária com FCP, INCRA, ITERPE e levantamento UFPE do Agreste, em tabelas separadas.
9. Marcar homônimos, variantes, possíveis duplicidades e divergências para análise manual.
10. Validar contagens e vínculos antes de alimentar o Atlas.

## 6. Tratamento do levantamento acadêmico do Agreste

O levantamento do PPC da Licenciatura em Educação Escolar Quilombola Nego Bispo (UFPE, 2024; pesquisa referida a 2022/2023; Quadro 1, pp. 36–37) será preservado como fonte complementar.

Os registros municipais desse levantamento serão cruzados com a base censitária. Quando houver correspondência documental, os registros serão relacionados, sem somar contagens. Quando não houver correspondência, o registro acadêmico será mantido em lista de divergências/pendências, até que a identidade comunitária e a diferença de cobertura sejam esclarecidas.

O total acadêmico de 68 não será adicionado aos 566 do IBGE.

## 7. Estrutura de arquivos prevista

- `data/base-mestra/comunidades.csv` — uma linha por comunidade identificada;
- `data/base-mestra/localidades.csv` — uma linha por localidade;
- `data/base-mestra/territorios.csv` — uma linha por território;
- `data/base-mestra/relacoes-comunidades-localidades.csv` — vínculos comunidade-localidade;
- `data/base-mestra/relacoes-localidades-territorios.csv` — vínculos localidade-território;
- `data/base-mestra/certificacoes-fcp.csv` — extração datada da FCP;
- `data/base-mestra/processos-regularizacao.csv` — registros documentados de INCRA/ITERPE;
- `data/base-mestra/fontes-e-evidencias.csv` — trilha de auditoria;
- `data/base-mestra/pendencias-e-divergencias.csv` — itens que exigem análise.

Os arquivos nominais só serão criados após a extração e inspeção dos arquivos primários. Não será publicada planilha vazia como se fosse base consolidada.

## 8. Critério para publicação no Atlas

- Os números 566 e 621 podem ser apresentados como quantitativos censitários de 2022, com rótulos e conceitos exatos, após reconciliação das planilhas oficiais.
- O total de comunidades identificadas em outras fontes será apresentado separadamente, até que as correspondências sejam examinadas.
- O total geral de comunidades distintas só será calculado depois da deduplicação documentada e da resolução das divergências. Não será obtido pela soma simples de cadastros.
- Mapas de pontos ou polígonos deverão indicar a natureza da geometria. Centroide de município ou ponto representativo não será apresentado como localização precisa da comunidade.
- A atualização da base não autoriza alteração automática das geometrias municipais, projeções ou enquadramentos do Atlas.

## 9. Estado inicial e próximas entregas

**Concluído nesta versão:**
- identificação das tabelas e apêndices oficiais necessários;
- definição das entidades, chaves e relacionamentos;
- definição das categorias analíticas e estados de conferência;
- regra de preservação do levantamento acadêmico do Agreste;
- protocolo de extração, conciliação e publicação.

**Pendente para a versão 0.2:**
- baixar e arquivar os arquivos originais do IBGE;
- extrair os registros de Pernambuco do Apêndice 01;
- reconciliar as contagens das Tabelas 01 e 02;
- estruturar as relações comunidade-localidade e localidade-território;
- conferir os 14 territórios e a distribuição das localidades relacionadas;
- gerar a primeira base nominal com evidências e estados de conferência.


## 9.1 Primeira conferência da relação comunidade–localidade (Apêndice 1)

Foi realizada a extração textual das páginas 231 a 245 do PDF (páginas impressas 229 a 243), filtrando as linhas da UF PE e conferindo a estrutura dos campos do Apêndice 1.

**Resultado da conferência estrutural:**
- **621 registros de localidades** listados para Pernambuco no Apêndice 1;
- **566 códigos únicos nacionais de comunidade quilombola declarada** distintos;
- diferença aritmética: **55 registros de localidade além do primeiro vínculo por comunidade**;
- **514 comunidades** aparecem com uma ocorrência de localidade;
- **49 comunidades** aparecem com duas ocorrências;
- **3 comunidades** aparecem com três ocorrências;
- portanto, **52 comunidades** têm mais de uma ocorrência de localidade no Apêndice 1.

A soma dos vínculos adicionais é 49 × 1 + 3 × 2 = 55. Assim, nesta extração, a diferença entre 621 linhas de localidades e 566 códigos distintos de comunidade é explicada aritmeticamente por comunidades que aparecem associadas a mais de uma ocorrência de localidade.

**Atenção à terminologia:** o Apêndice 1 intitula-se “Localidades quilombolas, segundo os Municípios”. Cada linha traz o código único nacional da comunidade declarada associada e o código/nome municipal da localidade quilombola, além da ordem de ocorrência e, quando informado, número de processo de identificação e reconhecimento na Fundação Cultural Palmares. A coluna “Nome” à direita é o nome da localidade; o código único nacional é o identificador da comunidade declarada. O Apêndice não autoriza presumir que o nome da localidade seja sempre o nome próprio da comunidade.

**Regra de modelagem confirmada:** a relação deve ser armazenada em tabela própria, com uma linha por ocorrência comunidade–localidade, preservando:
- UF;
- geocódigo e nome do município;
- código único nacional da comunidade declarada;
- ordem de ocorrência;
- código municipal da localidade quilombola;
- nome da localidade;
- número(s) de processo FCP quando impresso;
- página do PDF e identificação da tabela/apêndice.

**Limite desta conferência:** a contagem de códigos distintos e ocorrências foi conferida a partir das linhas tabulares extraídas do Apêndice 1. A normalização integral de nomes com quebras de linha, a conferência visual de cada registro e o cruzamento com o Apêndice 2 permanecem como etapas de validação. A multiplicidade observada não deve ser confundida com abrangência territorial intermunicipal; esta última será apurada separadamente com o Apêndice 2 e fontes de delimitação territorial.

### Exemplos de multiplicidade identificados no Apêndice 1
- Águas Belas: código de comunidade 03867, com duas ocorrências da localidade “MARIA DE NAZARÉ”;
- Bom Conselho: códigos 00318, 00321 e 00325 aparecem em duas ocorrências cada; o código 03731 aparece em três ocorrências;
- Salgueiro: código 02004 aparece em três ocorrências de “CONCEIÇÃO DAS CRIOULAS”;
- Serra Talhada: código 01771 aparece em três ocorrências relacionadas a “CATOLÉ”;
- Tupanatinga: código 06882 aparece em duas ocorrências de “SÍTIO LOPES”.

Esses exemplos mostram por que não se deve deduplicar as localidades apenas pelo nome textual: códigos de ocorrência distintos precisam ser preservados. A interpretação substantiva de cada repetição será feita com o dicionário de dados e as informações geoespaciais do IBGE.


## 9.2 Conferência do Apêndice 2 — localidades segundo territórios oficialmente delimitados

A leitura foi ampliada para as páginas 346 e 365 a 368 do PDF (páginas impressas 344 e 363 a 366), além da conferência da Tabela de Resultado 3. Essa ampliação foi necessária porque os primeiros trechos consultados não continham o início da relação de Pernambuco.

### 9.2.1 Os 14 territórios pernambucanos

O cruzamento do Apêndice 2 com a Tabela de Resultado 3 identifica **14 territórios oficialmente delimitados com localidades quilombolas associadas em Pernambuco**, totalizando **56 localidades**:

| Código do território no IBGE | Território | Localidades associadas |
|---:|---|---:|
| 95 | CONCEIÇÃO DAS CRIOULAS | 5 |
| 96 | CASTAINHO | 1 |
| 164 | CONTENDAS | 2 |
| 165 | SANTANA III | 4 |
| 367 | TIMBO | 1 |
| 368 | JATOBÁ | 8 |
| 409 | MASSAPÃ | 1 |
| 410 | INHANHUM | 4 |
| 411 | CRUZ DOS RIACHOS | 2 |
| 412 | FAZENDA SANTANA | 1 |
| 413 | TIRIRICA DOS CRIOULOS | 2 |
| 414 | ÁGUAS DO VELHO CHICO | 14 |
| 415 | FEIJÃO E POSSE | 3 |
| 419 | SERROTE | 8 |
| **Total** | **14 territórios** | **56 localidades** |

A soma confere com o quantitativo de 56 localidades em territórios oficialmente delimitados informado para Pernambuco na publicação do IBGE.

### 9.2.2 Municípios alcançados pelas localidades associadas

O código municipal da localidade é composto pelo geocódigo IBGE do município acrescido do identificador da localidade. A leitura dos códigos do Apêndice 2 mostra os seguintes municípios:

| Território | Código(s) municipal(is) identificado(s) | Município(s) |
|---|---|---|
| CONCEIÇÃO DAS CRIOULAS | 2612208 | Salgueiro |
| CASTAINHO | 2606002 | Garanhuns |
| CONTENDAS | 2615201; 2612208 | Terra Nova; Salgueiro |
| SANTANA III | 2612208 | Salgueiro |
| TIMBO | 2606002 | Garanhuns |
| JATOBÁ | 2603009 | Cabrobó |
| MASSAPÃ | 2603926 | Carnaubeira da Penha |
| INHANHUM | 2612604 | Santa Maria da Boa Vista |
| CRUZ DOS RIACHOS | 2603009 | Cabrobó |
| FAZENDA SANTANA | 2603009 | Cabrobó |
| TIRIRICA DOS CRIOULOS | 2603926 | Carnaubeira da Penha |
| ÁGUAS DO VELHO CHICO | 2609808; 2603009 | Orocó; Cabrobó |
| FEIJÃO E POSSE | 2609303 | Mirandiba |
| SERROTE | 2612604 | Santa Maria da Boa Vista |

**Dois territórios apresentam localidades associadas em mais de um município:**
- CONTENDAS: Terra Nova e Salgueiro;
- ÁGUAS DO VELHO CHICO: Orocó e Cabrobó.

Isso comprova que a relação territorial não deve ser modelada como pertencimento exclusivo a um município. O vínculo deve ser território–localidade–município.

### 9.2.3 Reconciliação dos quantitativos

A conferência ampliada corrige a leitura preliminar anterior, que havia identificado somente 12 territórios e 50 localidades por não incluir as páginas iniciais do Apêndice 2.

Com a inclusão dos territórios 95 (CONCEIÇÃO DAS CRIOULAS, 5 localidades) e 96 (CASTAINHO, 1 localidade), o resultado passa a ser **14 territórios e 56 localidades**, em consonância com o quantitativo estadual apresentado pelo IBGE.

A relação do Apêndice 2 também informa o nome da comunidade quilombola declarada associada à localidade. Esse campo deve ser preservado como dado de origem, sem confundi-lo com o nome da localidade e sem presumir equivalência nominal.

### 9.2.4 Implicações para a Base Mestra e o Atlas

A base deverá manter relações independentes:
- território oficialmente delimitado;
- comunidade quilombola declarada;
- localidade quilombola associada;
- município correspondente ao código geográfico da localidade.

O código do território no Apêndice 2 não deve ser confundido com código municipal, código da comunidade ou número de processo administrativo.

Para o painel municipal, a presença de localidade vinculada a território intermunicipal deverá ser exibida como relação territorial, sem atribuir o território inteiro ao município nem contar o mesmo território como novo em cada município.

**Limite da conferência:** os quantitativos, nomes dos territórios e códigos municipais foram transcritos das tabelas e páginas citadas. A conciliação nominal dos 56 registros da Tabela 3 com o Apêndice 1 e o CSV vetorial estadual foi executada por código municipal da localidade. A análise espacial das geometrias territoriais continua pendente; a abrangência intermunicipal identificada decorre dos geocódigos das localidades, não de análise espacial dos polígonos.

## 10. Fontes oficiais e complementares

- IBGE — Localidades Quilombolas, Censo 2022: https://www.ibge.gov.br/geociencias/organizacao-do-territorio/estrutura-territorial/27385-localidades.html?edicao=40668
- IBGE — página alternativa de resultados e arquivos: https://www.ibge.gov.br/estatisticas/sociais/trabalho/22827-censo-demografico-2022.html/22827-censo-demografico-2022.html?edicao=40667
- IBGE — publicação em PDF, cópia de acesso: https://acervo.socioambiental.org/sites/default/files/documents/03d00274.pdf
- FCP — certificação quilombola: https://www.gov.br/palmares/pt-br/departamentos/protecao-preservacao-e-articulacao/certificacao-quilombola
- INCRA — quilombolas: https://www.gov.br/incra/pt-br/assuntos/governanca-fundiaria/quilombolas/
- ITERPE — território quilombola: https://www.lai.pe.gov.br/iterpe/territorio-quilombola/
- UFPE — PPC da Licenciatura em Educação Escolar Quilombola Nego Bispo: https://www.ufpe.br/documents/3310313/5819053/PPC_LICENCIATURA%2BEEQ.%2BVERSA~O%2B28.02.2025.1.pdf/2ecab147-23ff-4e59-9678-b8272cc2e1ee


## 9.3 Conferência das Tabelas de Resultados 01, 02 e 03 do IBGE

**Arquivos examinados nesta etapa (planilhas XLSX originais fornecidas para análise):**
- `Tabela_de_resultado_1_Localidades_quilombolas_GR_UF.xlsx`;
- `Tabela_de_resultado_2_Localidades_quilombolas_Municipios.xlsx`;
- `Tabela_de_resultado_3_Localidades_quilombolas_TQ.xlsx`.

**Referência institucional:** IBGE, Censo Demográfico 2022, produto *Localidades Quilombolas*, Resultados do Universo. Página oficial: https://www.ibge.gov.br/geociencias/organizacao-do-territorio/estrutura-territorial/27385-localidades.html?edicao=40668

### 9.3.1 Tabela de Resultado 1 — Grandes Regiões e Unidades da Federação

A linha de Pernambuco (código da UF 26) apresenta:
- **14** territórios quilombolas oficialmente delimitados;
- **566** comunidades declaradas e associadas a localidades quilombolas;
- **621** localidades quilombolas.

Os valores foram lidos diretamente da linha de Pernambuco na planilha XLSX.

### 9.3.2 Tabela de Resultado 2 — Municípios

A planilha contém **72 linhas municipais para Pernambuco**. A soma das colunas de comunidades declaradas e localidades quilombolas nessas 72 linhas resulta, respectivamente, em:
- **566** comunidades declaradas e associadas a localidades;
- **621** localidades quilombolas.

Portanto, os totais municipais reconciliam aritmeticamente com a linha estadual da Tabela 1. A Tabela 2 apresenta quantitativos por município; não substitui a relação nominal do Apêndice 1.

### 9.3.3 Tabela de Resultado 3 — Territórios Quilombolas

A filtragem da sigla PE na Tabela 3 retorna **14 territórios** e a soma da coluna de localidades quilombolas é **56**:

| Código do território | Território (grafia da tabela) | Localidades |
|---:|---|---:|
| 95 | CONCEIÇÃO DAS CRIOULAS | 5 |
| 96 | CASTAINHO | 1 |
| 164 | CONTENDAS | 2 |
| 165 | SANTANA III | 4 |
| 367 | TIMBO | 1 |
| 368 | JATOBÁ | 8 |
| 409 | MASSAPÃ | 1 |
| 410 | INHANHUM | 4 |
| 411 | CRUZ DOS RIACHOS | 2 |
| 412 | FAZENDA SANTANA | 1 |
| 413 | TIRIRICA DOS CRIOULOS | 2 |
| 414 | ÁGUAS DO VELHO CHICO | 14 |
| 415 | FEIJÃO E POSSE | 3 |
| 419 | SERROTE | 8 |
| **Total** | **14 territórios** | **56** |

A grafia “TIMBO” foi preservada como consta na planilha; eventual normalização editorial deverá manter a forma original em campo de origem.

### 9.3.4 Reconciliação e interpretação correta dos universos

As três tabelas apresentam resultados consistentes entre si:
- Tabela 1: 566 comunidades declaradas, 621 localidades e 14 territórios em Pernambuco;
- Tabela 2: soma dos 72 municípios igual a 566 comunidades declaradas e 621 localidades;
- Tabela 3: 14 territórios com 56 localidades associadas.

**As 56 localidades da Tabela 3 são um recorte específico:** correspondem às localidades associadas aos territórios oficialmente delimitados relacionados na tabela. Não representam o total estadual de localidades quilombolas. O total estadual informado nas Tabelas 1 e 2 é 621.

Da mesma forma, os 566 registros são comunidades quilombolas declaradas e associadas a localidades no contexto do Censo 2022. Não equivalem ao número de comunidades certificadas pela Fundação Cultural Palmares nem a um cadastro administrativo atualizado.

A reconciliação das tabelas confirma os quantitativos agregados, mas não substitui:
- a conferência linha a linha do Apêndice 1;
- o cruzamento nominal entre Apêndices 1 e 2 pela chave de código municipal da localidade;
- a inspeção do dicionário de dados e dos arquivos vetoriais;
- a validação das relações com certificações FCP e processos INCRA/ITERPE.

### 9.3.5 Estado da conferência

| Item | Resultado | Estado |
|---|---|---|
| Total estadual da Tabela 1 | 14 / 566 / 621 | Conferido |
| Soma municipal da Tabela 2 | 72 municípios; 566 / 621 | Conferido |
| Tabela 3 | 14 territórios / 56 localidades | Conferido |
| Correspondência nominal Apêndice 1 ↔ Apêndice 2 e CSV estadual | 56/56 vínculos territoriais por código | Conferido |
| Coordenadas do CSV estadual | 621/621 preenchidas; geometria SHP ainda não inspecionada | Conferência tabular concluída; validação espacial pendente |
| Certificação FCP e regularização fundiária | Não conciliadas nesta etapa | Pendente |

**Conclusão:** os quantitativos agregados das três planilhas oficiais estão reconciliados. A base nominal e a validação geoespacial continuam em desenvolvimento. Nenhum indicador, mapa ou camada do Atlas deve ser atualizado automaticamente apenas com esta conferência documental.


## 9.4 Arquivo municipal estruturado — Tabela de Resultado 2

Foi estruturado o arquivo `data/base-mestra/indicadores-municipais-localidades-quilombolas-PE-2022.csv`, derivado da Tabela de Resultado 2 original do IBGE.

**Conteúdo:** 72 registros municipais de Pernambuco, com os campos:
- código da UF e nome da UF;
- código IBGE do município e nome do município;
- quantidade de comunidades declaradas e associadas a localidades;
- quantidade de localidades quilombolas;
- ano de referência;
- identificação da fonte.

**Conferência:** 72 linhas de municípios; soma de 566 comunidades declaradas e associadas a localidades e 621 localidades quilombolas. Os totais reconciliam com as Tabelas de Resultado 1 e 2.

**Formato:** CSV UTF-8 com BOM e separador ponto e vírgula, para facilitar abertura em planilhas configuradas para o padrão regional brasileiro.

**Limite de uso:** o arquivo contém quantitativos agregados por município. Não contém nomes individuais de comunidades nem coordenadas; não deve ser utilizado isoladamente para gerar pontos, polígonos ou cadastro nominal. Os dados são do Censo 2022 e não representam atualização administrativa posterior.


## 9.5 Extração do CSV vetorial estadual e conciliação nominal por códigos

**Arquivo original examinado:** `PE_LQs_CD2022_100724.csv`, disponibilizado no diretório oficial do IBGE em *Localidades Quilombolas 2022 → Arquivos_vetoriais → csv → UF*.

**Dicionário examinado:** `Dicionario_LQs.xlsx`, aba `Localidades_Quilombolas_CD2022`.

### 9.5.1 Estrutura e integridade do arquivo estadual

A leitura do CSV de Pernambuco identificou:
- **621 linhas** de localidades;
- **621 códigos CD_LQ distintos**, sem duplicidade;
- **566 códigos IDCQ0001 distintos**, correspondentes às comunidades declaradas;
- **72 municípios**;
- **621 registros com latitude e longitude preenchidas**;
- **56 registros com CD_TQ preenchido**, distribuídos em **14 códigos de território**;
- **565 registros sem CD_TQ preenchido**.

As coordenadas estão descritas no dicionário como latitude e longitude em graus decimais. A presença de coordenadas no CSV não equivale, por si só, à validação da posição em relação às geometrias SHP ou à confirmação de precisão de campo.

### 9.5.2 Conciliação integral com o Apêndice 1

O código `CD_LQ` do CSV estadual foi cruzado com o campo `codigo_municipal_localidade_ibge` da extração do Apêndice 1.

**Resultado:**
- 621/621 códigos do Apêndice 1 encontrados no CSV estadual;
- 621/621 códigos do CSV estadual encontrados no Apêndice 1;
- 621/621 correspondências de código municipal do município;
- 621/621 correspondências da ordem de ocorrência;
- 621/621 correspondências do identificador nacional da comunidade, após preservar zeros à esquerda na representação textual;
- 621/621 correspondências dos números de processo FCP informados.

A chave de conciliação foi o código municipal da localidade, não o nome textual. Isso evita que variações de grafia, abreviações ou nomes repetidos produzam vínculos indevidos.

**Observação sobre nomes:** o arquivo CSV recebido contém o cabeçalho `NM_CQ`, enquanto o dicionário apresenta `NM_LQ` para a descrição do nome da comunidade declarada associada à localidade. A divergência de cabeçalho foi registrada e o conteúdo original foi preservado no arquivo derivado, sem renomear semanticamente o campo como se a diferença estivesse resolvida. A extração tabular do Apêndice 1 também contém células vazias na coluna textual de nome; por isso, os nomes não foram utilizados como chave de validação.

### 9.5.3 Conciliação dos territórios

Os 56 registros do CSV com `CD_TQ` foram comparados com os 56 vínculos do cruzamento Apêndice 1–Apêndice 2.

**Resultado: 56/56 correspondências exatas** entre:
- `CD_LQ` e o código municipal da localidade;
- `CD_TQ` e o código do território no Apêndice 2;
- nome e código municipal associados ao registro territorial.

Os 56 registros estão distribuídos nos mesmos 14 territórios já relacionados na seção 9.2. Os 565 registros sem `CD_TQ` não devem ser interpretados como comunidades inexistentes, não reconhecidas ou não certificadas; indicam apenas ausência de vínculo com território oficialmente delimitado nesse campo do produto.

### 9.5.4 Arquivos estruturados derivados

Foram criados três arquivos em `data/base-mestra/`:

1. `localidades-quilombolas-PE-Censo2022.csv` — 621 localidades, códigos, município, coordenadas, atributos territoriais e campos originais preservados;
2. `comunidades-quilombolas-PE-Censo2022.csv` — 566 códigos nacionais distintos, com nome no campo de origem, município, quantidade de localidades associadas e processos FCP informados;
3. `relacoes-localidades-territorios-PE-Censo2022.csv` — 56 vínculos entre localidades e territórios, incluindo os códigos de comunidade, município e coordenadas.

Os arquivos estão em CSV UTF-8 com BOM e separador ponto e vírgula. Os nomes dos campos derivados foram explicitados para facilitar leitura; os valores e códigos de origem foram preservados.

### 9.5.5 Limites e próxima validação

Concluída a conciliação tabular, permanecem pendentes:
- inspeção do conjunto SHP de Pernambuco e seus arquivos auxiliares;
- leitura do sistema de referência de coordenadas e conferência de geometrias;
- verificação espacial dos 621 pontos em relação aos limites municipais e, quando aplicável, aos territórios;
- avaliação da natureza e precisão dos pontos, sem presumir que sejam coordenadas de residência ou limites comunitários;
- integração futura com FCP, INCRA e ITERPE em bases independentes.

**Regra de publicação:** os CSVs derivados passam a compor a Base Mestra documental, mas não autorizam automaticamente a inclusão de 621 pontos no mapa público. A camada cartográfica dependerá da validação espacial, do tipo de geometria e de uma decisão editorial específica.


## 9.6 Integração dos dados censitários às fichas municipais do Atlas

Em 27/11/2026, os quantitativos municipais da Tabela de Resultado 2 e a relação nominal derivada do CSV vetorial estadual passaram a alimentar a ficha municipal do Atlas.

**Indicadores exibidos:**
- comunidades declaradas associadas a localidades;
- localidades quilombolas.

**Relação nominal:** os registros são agrupados por código IBGE do município e código nacional da comunidade declarada. Para cada denominação, a ficha apresenta o código nacional, a quantidade de localidades associadas e, quando o campo está preenchido na fonte, o nome do território oficialmente delimitado relacionado.

**Conferência da camada editorial:** 72 municípios com registros; 566 comunidades declaradas associadas a localidades; 621 localidades. A soma dos registros nominais agrupados por município corresponde a 566, e a soma das localidades corresponde a 621.

**Cuidado de interpretação:** a relação nominal utiliza o campo `NM_CQ` do arquivo estadual. A divergência entre esse cabeçalho e a descrição `NM_LQ` do dicionário permanece documentada. Por isso, a interface identifica os itens como denominações declaradas reproduzidas da base do IBGE, sem reinterpretar o campo como nome oficial de localidade. Os quantitativos são do Censo 2022 e não representam cadastro administrativo atualizado.

Municípios sem linha na Tabela de Resultado 2 são identificados como sem registro nessa tabela; a interface não os classifica como municípios sem comunidades quilombolas.

**Limite cartográfico:** esta integração é exclusivamente tabular/editorial. Não foram utilizados os campos de latitude e longitude para criar pontos no mapa. A validação dos arquivos SHP, do sistema de referência e da posição dos pontos permanece pendente. Nenhuma geometria, projeção, enquadramento, camada ou interação cartográfica foi modificada.
