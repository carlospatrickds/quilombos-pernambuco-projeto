# Política de fontes, validação e publicação de dados quilombolas

**Identificador:** GOV-DADOS-01  
**Versão:** 1.0  
**Aprovada para aplicação no projeto:** 27/11/2026  
**Escopo:** Atlas Territorial Quilombos de Pernambuco, suas páginas, mapas, painéis, camadas, bibliotecas e bases auxiliares.

## 1. Finalidade e caráter obrigatório

Este documento estabelece as regras permanentes para localizar, conferir, organizar, interpretar e publicar informações sobre população, comunidades, localidades e territórios quilombolas em Pernambuco.

As regras aplicam-se a toda inclusão, correção, atualização ou republicação de números, nomes, situações administrativas, mapas e registros territoriais. Em caso de dúvida, o dado permanece identificado como pendente de conferência e não deve ser apresentado como consolidado.

## 2. Hierarquia e prioridade das fontes

A pesquisa deve começar pelas fontes oficiais do poder público, priorizando a instituição responsável pelo dado ou procedimento.

### 2.1 Fontes federais

- **IBGE:** resultados censitários, população, localidades, recortes geográficos, conceitos, tabelas e metodologias do Censo.
- **Fundação Cultural Palmares (FCP):** certificação e Cadastro Geral de comunidades certificadas.
- **INCRA:** processos de regularização fundiária, RTID, portarias, decretos, títulos e demais etapas sob sua competência.
- **Ministérios e outros órgãos federais:** políticas, programas, registros e informações oficiais pertinentes às respectivas competências.

### 2.2 Fontes estaduais de Pernambuco

- **ITERPE:** informações estaduais sobre regularização fundiária, reconhecimento e titulação dentro de sua competência.
- **Órgãos estaduais responsáveis por igualdade racial, desenvolvimento agrário, meio ambiente, educação, cultura e povos e comunidades tradicionais:** cadastros, políticas, levantamentos e documentos oficiais de sua competência.
- **CONDEPE/FIDEM e demais órgãos técnicos estaduais:** bases territoriais, cartografia, regionalizações e dados geoespaciais oficiais.

### 2.3 Fontes complementares

Universidades, institutos de pesquisa, organizações da sociedade civil, associações comunitárias, publicações e levantamentos independentes podem complementar a documentação, apontar lacunas ou oferecer contexto. Não substituem automaticamente os registros oficiais nem devem ser apresentados como se fossem cadastros governamentais.

### 2.4 Regra de competência

A prioridade não significa que uma instituição seja fonte universal para todos os assuntos. Deve-se consultar primeiro o órgão que produz ou administra o dado específico. Exemplo: IBGE para resultado censitário; FCP para certificação; INCRA ou ITERPE para etapas de regularização sob sua responsabilidade.

Quando fontes oficiais divergirem, nenhuma delas será escolhida silenciosamente. A divergência será registrada, com datas, conceitos, recortes e competências, até que sua causa seja esclarecida.

## 3. Unidades que nunca devem ser confundidas

O Atlas deve distinguir explicitamente:

- **Pessoa quilombola:** indivíduo identificado segundo os critérios e perguntas do levantamento utilizado.
- **Comunidade quilombola:** grupo social com identidade coletiva, autodefinição, vínculos históricos, culturais, sociais e territoriais.
- **Localidade quilombola:** categoria geográfica/estatística definida pelo IBGE para representar lugares associados à presença quilombola. Não equivale automaticamente a uma comunidade.
- **Território quilombola:** espaço territorial tradicionalmente ocupado e/ou objeto de identificação, delimitação ou regularização, conforme o conceito e o procedimento da fonte.
- **Comunidade certificada:** comunidade com certificação registrada pela Fundação Cultural Palmares. A certificação não equivale à titulação territorial.
- **Processo de regularização:** procedimento administrativo que pode conter diferentes etapas e documentos; não deve ser contado como comunidade ou território adicional.

É proibido somar ou comparar diretamente números dessas unidades como se medissem o mesmo fenômeno.

## 4. Regras específicas por instituição

### 4.1 IBGE — Censo e estatísticas

1. Identificar a publicação, tabela, variável, categoria, filtro, nível territorial e ano de referência.
2. Registrar a definição oficial da unidade apresentada: pessoas, localidades, territórios ou outra.
3. Não transformar quantitativo de localidades em quantitativo de comunidades.
4. Não inferir número de comunidades a partir da população, número de domicílios, setores censitários ou territórios.
5. Para dados do Censo 2022, preservar a referência temporal e os recortes territoriais utilizados pelo IBGE.
6. Guardar a extração original (CSV, XLSX, API ou arquivo), os filtros e a data da consulta.
7. Quando houver supressão, ausência, não divulgação ou incompatibilidade territorial, registrar a limitação. Ausência de dado não significa ausência de comunidade.

### 4.2 FCP — certificação

1. Utilizar o Cadastro Geral e as certidões disponibilizadas pela FCP.
2. Registrar data de extração, aba, filtros e versão do arquivo.
3. Tratar o cadastro como fonte dinâmica, sujeita a atualização.
4. Identificar o resultado como “comunidades certificadas pela FCP”, nunca simplesmente como total de comunidades quilombolas existentes em Pernambuco.
5. Não interpretar ausência de certificação como ausência de identidade ou existência comunitária.

### 4.3 INCRA e ITERPE — regularização territorial

1. Registrar órgão responsável, comunidade/território referido, número do processo quando público, documento, etapa e data de referência.
2. Diferenciar processo aberto, estudos, RTID, portaria de reconhecimento, decreto, desapropriação, titulação e outras situações efetivamente descritas pela fonte.
3. Não tratar etapas administrativas como categorias equivalentes.
4. Não contar documentos ou fases sucessivas do mesmo processo como territórios distintos.
5. Distinguir titulação federal, estadual e outras modalidades, conforme a fonte oficial.

## 5. Base nominal de comunidades: regra de inclusão

A base nominal do Atlas deverá ser abrangente e não restrita às comunidades certificadas.

Uma comunidade pode ser incluída quando houver fonte identificável que sustente sua existência ou identificação, observadas as seguintes categorias de origem:

- identificada em fonte oficial federal;
- identificada em fonte oficial estadual ou municipal;
- registrada em levantamento acadêmico ou técnico;
- indicada por fonte comunitária ou organização representativa, aguardando validação documental.

A inclusão não deve ser confundida com certificação, reconhecimento administrativo, delimitação ou titulação. O status de cada dimensão será registrado separadamente.

### 5.1 Campos mínimos da base

Cada registro deverá conter, quando disponíveis:

- identificador interno estável;
- nome da comunidade e variantes documentadas;
- município e código IBGE;
- região ou sub-região, quando aplicável;
- fonte de identificação e trecho/documento de suporte;
- instituição responsável e natureza da fonte;
- situação de certificação FCP e data de referência;
- relação com território(s) identificado(s), se comprovada;
- situação de regularização territorial, órgão e etapa;
- data de consulta/extração;
- nível de conferência;
- observações sobre homônimos, mudanças de nome, sobreposição ou divergência.

Não preencher campos desconhecidos por inferência. Usar “não localizado”, “não informado” ou “a verificar”, conforme o caso.

### 5.2 Duplicidades e correspondências

Nomes semelhantes não bastam para fundir registros. A correspondência deve considerar município, variantes documentadas, localização, fonte, vínculos comunitários e, quando disponível, identificadores oficiais.

Se não for possível decidir se dois registros representam a mesma comunidade, mantê-los separados e marcar a possível duplicidade para análise.

## 6. Protocolo obrigatório de validação

Antes de publicar qualquer número ou registro:

1. **Localizar a fonte primária:** acessar o órgão responsável e o documento, tabela, cadastro ou base original.
2. **Identificar a unidade:** confirmar exatamente o que está sendo contado.
3. **Fixar o recorte:** Pernambuco, município, região, data e período de referência.
4. **Conferir o método:** variáveis, filtros, categorias, critérios e eventuais exclusões.
5. **Registrar a extração:** salvar arquivo original ou cópia datada, URL, data de acesso e parâmetros.
6. **Comparar fontes pertinentes:** procurar convergências e divergências sem misturar conceitos.
7. **Verificar duplicidades:** sobretudo em listas nominais e processos administrativos.
8. **Documentar limitações:** cobertura, atualização, supressão, lacunas e incompatibilidades.
9. **Revisar a redação:** usar o nome exato da unidade e evitar títulos genéricos que induzam a erro.
10. **Atualizar o Atlas e o inventário:** somente depois da validação documental.

## 7. Estados de conferência

Adotar os seguintes estados:

- **Conferido:** fonte primária acessada; conceito, unidade, recorte e valor confirmados; evidência arquivada.
- **Conferência parcial:** fonte identificada, mas falta validar algum elemento relevante, como tabela, página, filtro, período ou correspondência nominal.
- **Pendente:** informação ainda sem evidência suficiente para publicação factual.
- **Divergente:** fontes apresentam valores ou classificações diferentes ainda não reconciliados.
- **Fonte dinâmica:** cadastro sujeito a atualização. Este marcador deve vir acompanhado do estado de conferência e da data de extração; não substitui os demais estados.

Somente dados “Conferidos” podem ser apresentados como números consolidados. Dados parciais ou divergentes só podem aparecer com ressalva explícita e finalidade contextual, nunca como total definitivo.

## 8. Padrão de citação e transparência

Toda informação publicada deverá permitir que outra pessoa refaça a consulta. Registrar:

- instituição e unidade responsável;
- título da publicação, tabela, cadastro ou processo;
- URL oficial;
- ano/período de referência;
- data de acesso/extração;
- tabela, variável, categoria, filtro ou página;
- arquivo original ou cópia de referência, quando permitido;
- observações metodológicas e estado de conferência.

Para cadastros dinâmicos, preservar uma cópia datada ou evidência da extração, respeitando as condições de uso e proteção de dados.

## 9. Regras de apresentação no Atlas

1. Todo indicador deve informar sua unidade, fonte e ano/período de referência.
2. Não apresentar “número de comunidades” quando a fonte contar localidades, pessoas, territórios ou certidões.
3. Não usar “comunidades existentes” como sinônimo de “comunidades certificadas”.
4. Não usar “territórios titulados” como sinônimo de processos em andamento ou territórios delimitados.
5. Em comparações, assegurar que unidade, conceito, período e recorte sejam compatíveis.
6. Quando não houver dado confiável, exibir “A verificar”, “Não disponível na fonte consultada” ou explicação equivalente, nunca estimativa sem método explícito.
7. Toda alteração de número deve atualizar a ficha de fonte, a data de referência e o histórico de alterações.
8. A camada de comunidades deve deixar claro que sua cobertura depende das fontes efetivamente consultadas e não constitui prova de inexistência nos municípios sem registros.

## 10. Aplicação inicial: consolidação dos dados de Pernambuco

A primeira aplicação desta política será a construção de uma base nominal de comunidades quilombolas de Pernambuco, cruzando, sem fundir conceitos:

- Censo e publicações do IBGE;
- Cadastro Geral de comunidades certificadas da FCP;
- registros e processos do INCRA;
- informações de competência do ITERPE e demais órgãos estaduais;
- fontes acadêmicas e comunitárias complementares, identificadas como tais.

A base deverá produzir listas separadas e reconciliáveis: comunidades identificadas; comunidades certificadas; localidades quilombolas do IBGE; territórios e processos de regularização. A relação entre esses conjuntos só será estabelecida quando houver evidência documental.

Nenhum total estadual será publicado como definitivo antes da conferência da fonte primária, do conceito e da data de referência.

## 11. Preservação do histórico e governança

- Não apagar valores antigos sem preservar sua fonte, data e motivo da substituição.
- Registrar mudanças de metodologia, correções e divergências no inventário documental e no changelog.
- Manter dados, geometrias e evidências separados da apresentação visual.
- Não modificar mapas, geometrias, projeções, camadas ou lógica cartográfica durante uma atualização exclusivamente documental, salvo solicitação expressa.
- Esta política prevalece sobre anotações informais ou decisões pontuais anteriores sobre inclusão e contagem de dados.

## 12. Fontes oficiais de partida

- IBGE — Brasil Quilombola: https://www.ibge.gov.br/brasil-quilombola/
- IBGE — SIDRA, tabela 9578: https://sidra.ibge.gov.br/tabela/9578
- FCP — Certificação Quilombola: https://www.gov.br/palmares/pt-br/departamentos/protecao-preservacao-e-articulacao/certificacao-quilombola
- INCRA — Quilombolas: https://www.gov.br/incra/pt-br/assuntos/governanca-fundiaria/quilombolas/
- ITERPE — informações sobre território quilombola: https://www.lai.pe.gov.br/iterpe/territorio-quilombola/
- CONDEPE/FIDEM — dados territoriais: https://www.cf.pe.gov.br/dados

**Nota:** a lista acima é um ponto de partida institucional, não uma declaração de que todas as bases já foram extraídas ou validadas. Cada dado deverá ter sua própria ficha de conferência.
