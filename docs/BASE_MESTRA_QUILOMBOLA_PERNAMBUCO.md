# Base Mestra Quilombola de Pernambuco

**Identificador:** BASE-QUILOMBOLA-PE-01  
**Versão:** 0.1 — estrutura e protocolo de consolidação  
**Data de início:** 27/11/2026  
**Responsável pelo projeto:** Atlas Territorial Quilombos de Pernambuco  
**Situação:** estrutura definida; extração nominal e geoespacial do IBGE pendente.

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

## 10. Fontes oficiais e complementares

- IBGE — Localidades Quilombolas, Censo 2022: https://www.ibge.gov.br/geociencias/organizacao-do-territorio/estrutura-territorial/27385-localidades.html?edicao=40668
- IBGE — página alternativa de resultados e arquivos: https://www.ibge.gov.br/estatisticas/sociais/trabalho/22827-censo-demografico-2022.html/22827-censo-demografico-2022.html?edicao=40667
- IBGE — publicação em PDF, cópia de acesso: https://acervo.socioambiental.org/sites/default/files/documents/03d00274.pdf
- FCP — certificação quilombola: https://www.gov.br/palmares/pt-br/departamentos/protecao-preservacao-e-articulacao/certificacao-quilombola
- INCRA — quilombolas: https://www.gov.br/incra/pt-br/assuntos/governanca-fundiaria/quilombolas/
- ITERPE — território quilombola: https://www.lai.pe.gov.br/iterpe/territorio-quilombola/
- UFPE — PPC da Licenciatura em Educação Escolar Quilombola Nego Bispo: https://www.ufpe.br/documents/3310313/5819053/PPC_LICENCIATURA%2BEEQ.%2BVERSA~O%2B28.02.2025.1.pdf/2ecab147-23ff-4e59-9678-b8272cc2e1ee
