# Roadmap — Atlas Territorial Quilombos de Pernambuco

**Versão:** 1.0  
**Atualizado em:** 24/11/2026  
**Status geral:** protótipo cartográfico funcional; integração de dados e conteúdo ainda pendente.

## Visão geral

O trabalho será executado em fases, com validação de fontes antes de cada publicação. A prioridade imediata é concluir a base demográfica municipal do Censo 2022. Não considerar nenhuma etapa de dados concluída apenas porque o espaço já existe na interface.

## Quadro de andamento

| Fase | Entrega | Situação |
|---|---|---|
| 0 | Estrutura modular, mapa 2D padrão, painel municipal, busca/autocomplete e GitHub Pages | Concluída funcionalmente — zoom aceito em celular; observação de cache/escala no desktop fica para revisão posterior |
| 1 | População total municipal — Censo 2022 | Concluída — base integrada e conferida |
| 2 | População quilombola municipal — Censo 2022 | Integrada ao painel — auditoria e percentuais em continuidade |
| 3 | Percentual quilombola por município e validação estatística | Pendente |
| 4 | Cadastro de comunidades quilombolas por município | Pendente |
| 5 | Situação de certificação e regularização territorial | Pendente |
| 6 | Camada cartográfica de territórios quilombolas oficialmente delimitados | Pendente |
| 7 | História, memória e referências documentais por comunidade/município | Pendente |
| 8 | Fotografias, documentos e registros com crédito e autorização | Pendente |
| 9 | Recursos didáticos e experiências de exploração para professores | Pendente |
| 10 | Acessibilidade, responsividade, desempenho, auditoria e publicação estável | Pendente — inclui revisão posterior da escala/cache no desktop |

---

## Fase 0 — Protótipo cartográfico e interface

**Status: concluída funcionalmente.**

- [x] Estrutura HTML, CSS e JavaScript separados.
- [x] Mapa municipal em MapLibre GL JS, com visualização plana (2D) por padrão.
- [x] Geometria municipal em GeoJSON.
- [x] Associação de nomes por código IBGE.
- [x] Seleção com destaque e elevação do município.
- [x] Painel lateral de informações.
- [x] Busca com autocomplete por trecho do nome.
- [x] Identidade visual editorial alinhada ao e-book.
- [x] Publicação pelo GitHub Pages.
- [x] Limites de navegação configurados para aproximadamente 20 km de aproximação e 100 km de afastamento; comportamento considerado aceitável no celular.
- [ ] Revisar posteriormente a discrepância de escala/cache observada no computador.
- [x] Campos sem informação apresentados como pendentes.

**Critério de aceite:** mapa e painel funcionam no endereço publicado; seleção, busca e retorno ao enquadramento geral são testados no navegador. A navegação foi aceita pelo responsável no celular. A diferença observada no desktop (escala/possível cache) fica registrada para revisão na fase de qualidade, sem bloquear o avanço.

## Fase 1 — População total municipal (Censo 2022)

**Status: concluída — integração inicial em 24/11/2026.**

Tarefas:
- [x] Obter a série municipal do Observatório de Pernambuco, cuja fonte original é o IBGE Censo 2022 / SIDRA 4709.
- [x] Registrar URL, tabela, variável, ano, data de consulta e última carga da fonte.
- [x] Integrar 184 municípios e manter Fernando de Noronha (distrito estadual) separado.
- [x] Validar 184 códigos IBGE distintos de sete dígitos.
- [x] Conferir soma municipal + Fernando de Noronha com o total estadual divulgado pelo IBGE.
- [x] Registrar recorte territorial e nota sobre a inclusão de Fernando de Noronha na série de 185 localidades.
- [x] Gerar módulo JavaScript `data/populacao-municipal-censo-2022.js`.
- [x] Integrar a população total ao painel lateral municipal.
- [x] Registrar fonte, tabela, variável, ano de referência e data de consulta no conjunto de dados e no painel.

**Critério de aceite:** atendido na integração inicial. Foram integrados 184 municípios (9.055.764 habitantes). Fernando de Noronha (3.167) foi separado. A soma (9.058.931) confere com o total estadual IBGE 2022. Arquivo: `data/populacao-municipal-censo-2022.js`. Recomenda-se manter futura conferência direta linha a linha com a API SIDRA antes de congelar a versão de produção.

Fontes:
- IBGE SIDRA tabela 4709: https://sidra.ibge.gov.br/tabela/4709
- Observatório de Pernambuco/CONDEPE-FIDEM: https://www.cf.pe.gov.br/observatorio/fontes/sidra_censo_2022

## Fase 2 — População quilombola municipal (Censo 2022)

Tarefas:
- [x] Identificar a tabela 9578 do SIDRA como fonte principal para população total e quilombola por município.
- [x] Confirmar metadados das quatro variáveis, classificação 2661 e abrangência municipal N6.
- [x] Extrair os dados do CSV oficial SIDRA 9578 enviado pelo responsável pelo projeto.
- [x] Integrar 184 municípios por código IBGE.
- [x] Preservar população quilombola total e recortes dentro/fora.
- [x] Tratar X como dado inibido, exibindo “Não divulgado”, nunca zero.
- [x] Conferir total estadual de 78.864; dentro 6.769; fora 72.095.
- [x] Conectar os campos à ficha municipal e registrar fonte, ano e consulta.
- [ ] Auditar percentuais municipais e a correspondência linha a linha com o arquivo bruto.

**Situação em 24/11/2026:** base municipal extraída do CSV exportado da tabela 9578 e integrada ao painel. O agregado estadual confere: total 78.864; em territórios 6.769; fora de territórios 72.095. Correntes (2 pessoas) e Terra Nova (51 pessoas) têm total publicado, mas os recortes dentro/fora aparecem como X (dado inibido). A auditoria dos percentuais e a validação final da interface permanecem em andamento.

**Critério de aceite:** valor municipal reproduzível a partir da tabela oficial, com recorte e método explicitados.

Fontes:
- IBGE SIDRA tabela 9578: https://sidra.ibge.gov.br/tabela/9578
- IBGE — O Brasil Quilombola: https://www.ibge.gov.br/brasil-quilombola/
- IBGE — Censo 2022: https://www.ibge.gov.br/estatisticas/sociais/populacao/22827-censo-demografico-2022.html

## Fase 3 — Percentual e auditoria demográfica

Tarefas:
- [ ] Calcular população quilombola / população municipal × 100.
- [ ] Usar o mesmo ano de referência e o mesmo município nos dois campos.
- [ ] Tratar ausência, dado suprimido e zero como situações diferentes.
- [ ] Exibir percentual com duas casas decimais.
- [ ] Criar tabela de auditoria com numerador, denominador, resultado e fontes.
- [ ] Conferir coerência dos totais estaduais sem ocultar diferenças metodológicas.

**Critério de aceite:** percentuais recalculáveis e rastreáveis; valores ausentes nunca convertidos automaticamente em zero.

## Fase 4 — Cadastro de comunidades quilombolas

Tarefas:
- [ ] Obter a relação atualizada de comunidades certificadas pela Fundação Cultural Palmares.
- [ ] Registrar data de posição/extração da planilha, não apenas a data de consulta.
- [ ] Padronizar nomes sem apagar variantes e denominações históricas.
- [ ] Associar município(s), registrando comunidades intermunicipais.
- [ ] Distinguir comunidade, associação, território e localidade censitária.
- [ ] Criar identificador interno estável para cada registro.
- [ ] Validar informações com fontes documentais, pesquisa acadêmica e, quando possível, representantes comunitários.
- [ ] Sinalizar registros em validação e conflitos de nomenclatura.

**Critério de aceite:** cada registro tem nome, fonte, situação documental, localização e data de consulta; não há associação municipal feita apenas por suposição.

Fonte institucional:
- Fundação Cultural Palmares — certificação: https://www.gov.br/palmares/pt-br/departamentos/protecao-preservacao-e-articulacao/certificacao-quilombola
- Dados abertos da FCP: https://www.gov.br/palmares/pt-br/acesso-a-informacao/dados-abertos

## Fase 5 — Situação de reconhecimento e regularização territorial

Tarefas:
- [ ] Consultar processos e quadros do INCRA.
- [ ] Registrar etapa administrativa: processo aberto, RTID, portaria, decreto, titulação ou outra situação documentada.
- [ ] Registrar órgão responsável e data da informação.
- [ ] Diferenciar titulação federal, estadual e outras situações quando documentadas.
- [ ] Não inferir que certificação FCP equivale a titulação.
- [ ] Associar processo ao território/comunidade com identificadores e evidências.

**Critério de aceite:** situação apresentada com nomenclatura oficial, data e documento de suporte.

Fontes:
- INCRA — Quilombolas: https://www.gov.br/incra/pt-br/assuntos/governanca-fundiaria/quilombolas
- INCRA — andamento dos processos: https://www.gov.br/incra/pt-br/assuntos/governanca-fundiaria/quilombolas/andamento-processos

## Fase 6 — Cartografia de territórios quilombolas

Tarefas:
- [ ] Localizar geometrias oficiais de territórios quilombolas.
- [ ] Registrar órgão produtor, escala, sistema de referência, data e situação fundiária.
- [ ] Distinguir território oficialmente delimitado de área titulada e de comunidade certificada.
- [ ] Criar camada independente da malha municipal.
- [ ] Permitir visualização de sobreposição entre município e território.
- [ ] Tratar territórios que cruzam limites municipais sem duplicar áreas ou população.
- [ ] Não desenhar polígonos a partir de pontos aproximados ou nomes de localidades.

**Critério de aceite:** toda geometria tem fonte oficial e metadados; a legenda explica o estágio territorial representado.

## Fase 7 — História, memória e documentação

Tarefas:
- [ ] Definir ficha editorial para cada comunidade/território.
- [ ] Pesquisar formação histórica, memória, organização social, práticas culturais e relações territoriais.
- [ ] Priorizar fontes primárias, acervos públicos, pesquisa acadêmica e fontes comunitárias.
- [ ] Contextualizar cada narrativa no tempo e no território.
- [ ] Revisar texto com pesquisadora/professora responsável e, quando possível, interlocutores comunitários.
- [ ] Inserir referências completas e links.
- [ ] Distinguir fato documentado, memória oral, interpretação historiográfica e informação ainda em apuração.

**Critério de aceite:** texto revisado, contextualizado, referenciado e aprovado editorialmente.

## Fase 8 — Fotografias, documentos e registros visuais

Tarefas:
- [ ] Identificar imagens pertinentes e suas fontes originais.
- [ ] Verificar autoria, titularidade, licença e autorização de uso.
- [ ] Registrar legenda, data, local, autoria, acervo e contexto.
- [ ] Solicitar autorização quando necessária.
- [ ] Evitar imagens genéricas apresentadas como se retratassem uma comunidade específica.
- [ ] Criar galeria com créditos visíveis e texto alternativo.

**Critério de aceite:** nenhuma imagem publicada sem procedência, contexto, crédito e condição de uso verificados.

## Fase 9 — Recursos didáticos

Tarefas:
- [ ] Criar linha do tempo histórica.
- [ ] Criar glossário de conceitos.
- [ ] Criar mapas temáticos e infográficos.
- [ ] Incluir questões para observação e investigação em sala de aula.
- [ ] Relacionar conteúdos à educação básica e às diretrizes curriculares aplicáveis.
- [ ] Incluir orientações ao professor e referências para aprofundamento.
- [ ] Validar linguagem, adequação etária e precisão histórica com a professora responsável.

**Critério de aceite:** recursos didáticos revisados e alinhados ao propósito do produto educacional.

## Fase 10 — Qualidade, acessibilidade e lançamento

Tarefas:
- [ ] Testar em desktop, tablet e celular.
- [ ] Testar navegação por teclado, foco visível e leitores de tela.
- [ ] Verificar contraste cromático e legibilidade.
- [ ] Otimizar carregamento do GeoJSON e imagens.
- [ ] Tratar indisponibilidade de APIs externas com fallback documentado.
- [ ] Testar busca, seleção, painel, camadas e links.
- [ ] Revisar créditos, referências e política de atualização.
- [ ] Fazer auditoria de dados e revisão editorial final.
- [ ] Publicar versão estável e registrar versão/data.

**Critério de aceite:** testes documentados, fontes rastreáveis, funcionamento em dispositivos comuns e conteúdo revisado.

---

## Regras de atualização do roadmap

- Marcar tarefa como concluída somente após execução e verificação.
- Cada fase de dados deve gerar: fonte original, arquivo tratado, método, relatório de validação e commit.
- Atualizar a data de consulta sempre que uma base for extraída novamente.
- Se uma fonte mudar, preservar a versão anterior e registrar a diferença.
- Priorizar correção e rastreabilidade antes de ampliar funcionalidades visuais.

## Fontes de referência consultadas para este roadmap

Consulta: **24/11/2026**.

1. IBGE, Censo 2022 — população quilombola e localização do domicílio: https://sidra.ibge.gov.br/tabela/9578
2. IBGE, SIDRA — população residente, tabela 4709: https://sidra.ibge.gov.br/tabela/4709
3. IBGE — O Brasil Quilombola: https://www.ibge.gov.br/brasil-quilombola/
4. CONDEPE/FIDEM — população residente, Censo 2022: https://www.cf.pe.gov.br/observatorio/fontes/sidra_censo_2022
5. Fundação Cultural Palmares — certificação quilombola: https://www.gov.br/palmares/pt-br/departamentos/protecao-preservacao-e-articulacao/certificacao-quilombola
6. INCRA — política de regularização de territórios quilombolas: https://www.gov.br/incra/pt-br/assuntos/governanca-fundiaria/quilombolas

**Nota:** os links e páginas institucionais foram consultados em 24/11/2026. Bases dinâmicas devem ter a data de extração registrada separadamente da data de consulta da página.
