# Histórico de alterações

### 2026-11-27 — v0.2 da Base Mestra: conferência das Tabelas de Resultados 01, 02 e 03 do IBGE
- Examinadas as três planilhas XLSX oficiais do produto *Localidades Quilombolas*, Censo Demográfico 2022.
- Tabela 1: confirmados para Pernambuco (UF 26) 14 territórios oficialmente delimitados, 566 comunidades declaradas e associadas a localidades e 621 localidades quilombolas.
- Tabela 2: identificadas 72 linhas municipais de Pernambuco; a soma municipal reconcilia com 566 comunidades declaradas e 621 localidades.
- Tabela 3: confirmados 14 territórios e 56 localidades associadas.
- Explicitada a diferença entre o universo estadual de 621 localidades e o recorte de 56 localidades associadas aos territórios listados na Tabela 3.
- Registrado que a conferência dos quantitativos agregados não substitui o cruzamento nominal integral dos apêndices nem a validação geoespacial.
- Atualizada a versão e a situação da Base Mestra.

**Arquivos alterados:** `docs/BASE_MESTRA_QUILOMBOLA_PERNAMBUCO.md`, `CHANGELOG.md`.
**Escopo:** conferência e documentação de resultados oficiais; sem alteração de indicadores publicados, mapas, geometrias, arquivos GeoJSON ou lógica cartográfica.

# Histórico de alterações


### Correção da conferência do Apêndice 2 — 27/11/2026
- A leitura foi ampliada às páginas 346 (impressa 344), que contêm os territórios 95 (CONCEIÇÃO DAS CRIOULAS) e 96 (CASTAINHO), ausentes na primeira consulta parcial.
- Resultado corrigido: **14 territórios e 56 localidades** associadas em Pernambuco, em consonância com a publicação do IBGE.
- A primeira contagem parcial de 12 territórios e 50 localidades foi substituída no documento da Base Mestra; não deve ser utilizada.
- Permanecem identificados dois territórios com localidades em mais de um município: CONTENDAS (Terra Nova e Salgueiro) e ÁGUAS DO VELHO CHICO (Orocó e Cabrobó).

**Arquivo alterado:** `docs/BASE_MESTRA_QUILOMBOLA_PERNAMBUCO.md`.
**Escopo:** correção documental após ampliação da leitura do PDF; sem alteração dos indicadores publicados, mapas, geometrias ou lógica cartográfica.



### 2026-11-27 — Conferência do Apêndice 2 do IBGE
- Conferidas as páginas 365–368 do PDF (páginas impressas 363–366) e os registros da Tabela 3 relativos a Pernambuco.
- Identificados 12 territórios com localidades associadas nominalmente no Apêndice 2, totalizando 50 localidades segundo a Tabela 3.
- Identificados vínculos intermunicipais pelas chaves geográficas das localidades para os territórios CONTENDAS (Terra Nova e Salgueiro) e ÁGUAS DO VELHO CHICO (Orocó e Cabrobó).
- Registrada pendência de conciliação entre os 14 territórios informados na Tabela 1 e os 12 territórios com localidades listadas na Tabela 3/Apêndice 2.
- Documentado que a abrangência identificada deriva dos códigos municipais das localidades e ainda não constitui análise espacial das geometrias dos territórios.

**Arquivo alterado:** `docs/BASE_MESTRA_QUILOMBOLA_PERNAMBUCO.md`.
**Escopo:** análise documental; sem alteração de indicadores publicados, mapas, geometrias ou lógica cartográfica.



### 2026-11-27 — Conferência do Apêndice 1 do IBGE
- Conferidas as páginas 231–245 do PDF (páginas impressas 229–243), correspondentes ao Apêndice 1 para Pernambuco.
- Identificados 621 registros de localidades e 566 códigos únicos nacionais distintos de comunidades declaradas.
- A relação apresenta 514 comunidades com uma ocorrência, 49 com duas e 3 com três ocorrências de localidades (52 comunidades com multiplicidade).
- Registrada na Base Mestra a regra de manter comunidade e localidade em entidades separadas e preservar os códigos e a ordem de ocorrência.
- A abrangência territorial intermunicipal permanece como análise separada, dependente do Apêndice 2 e dos atos oficiais de delimitação.

**Arquivo alterado:** `docs/BASE_MESTRA_QUILOMBOLA_PERNAMBUCO.md`.
**Escopo:** conferência documental e metodológica; sem alteração de indicadores publicados, mapas, geometrias ou lógica cartográfica.


## 2026-11-27

### v1.4.5 — Estruturação da Base Mestra Quilombola de Pernambuco
- Criado o documento `docs/BASE_MESTRA_QUILOMBOLA_PERNAMBUCO.md`, definindo entidades independentes para comunidades, localidades e territórios, chaves, relacionamentos, categorias analíticas, protocolo de extração e critérios de publicação.
- Identificada como fonte censitária principal a publicação do IBGE *Censo Demográfico 2022: Localidades Quilombolas — Resultados do Universo* (2024), com suas Tabelas 01, 02 e 03, Apêndices 01 e 02, arquivos geoespaciais e dicionário.
- Registrada no inventário documental a fonte E04 e a pendência de extração e conferência dos arquivos originais.
- Preservado o levantamento acadêmico do Agreste como fonte complementar, sem somá-lo automaticamente aos quantitativos censitários.

**Arquivos criados:** `docs/BASE_MESTRA_QUILOMBOLA_PERNAMBUCO.md`.
**Arquivos alterados:** `docs/INVENTARIO_DOCUMENTAL.md`, `CHANGELOG.md`.

**Escopo:** etapa documental e de governança. Nenhum dado estatístico publicado, camada, geometria, GeoJSON ou lógica cartográfica foi alterado. A base nominal ainda não foi extraída nem publicada.


Registro cronológico das mudanças implementadas no projeto. Os horários seguem o fuso de Brasília (UTC−03:00).

## 2026-11-27

### v1.4.1 — Ajuste da capa em telas verticais
- Reduzida a altura da capa do guia em celulares para evitar que a fotografia ocupe quase toda a primeira tela.
- Reposicionado o foco da imagem e substituído o sombreado lateral por gradiente inferior, melhorando o contraste do título.
- Redimensionados título, subtítulo e espaçamentos para a leitura em largura estreita.
- Mantida a composição editorial da versão desktop.

**Arquivos alterados:** `css/guia.css`, `CHANGELOG.md`.



### v1.4.0 — Guia “Como ler o Atlas” e registro fotográfico do Quilombo Lambedor
- Criada a página independente “Como ler o Atlas”, com guia de navegação, leitura dos indicadores, distinção entre comunidades, população e territórios, interpretação crítica e fontes/metodologia.
- Adicionada ao menu sanduíche do Atlas e das bibliotecas a entrada “Como ler o Atlas”.
- Utilizada como capa a fotografia aérea da Comunidade Quilombola Lambedor, Lagoa Grande (PE), de Tiago Lubiana (17/08/2024).
- Incluído o mesmo registro na Biblioteca Visual, em coleção própria de fotografias, com autoria, data, origem e licença CC BY-SA 4.0.
- A imagem é exibida a partir do arquivo original no Wikimedia Commons, sem alteração, com crédito e link para a licença.

**Arquivos criados:** `como-ler-o-atlas.html`, `css/guia.css`.
**Arquivos alterados:** `index.html`, `biblioteca.html`, `biblioteca-documental.html`, `css/biblioteca.css`, `CHANGELOG.md`.

**Preservação:** não foram alterados dados, mapas, GeoJSON, geometrias, projeções, enquadramentos, camadas ou lógica cartográfica. As bibliotecas visual e documental permanecem independentes.

## 2026-11-27

### 00:19 — v1.3.2 — Contextualização editorial do primeiro Censo Quilombola
- Removido do cabeçalho o link externo “Entenda os reconhecimentos”; o acesso permanece no menu sanduíche.
- Reordenada a abertura: o bloco “O primeiro Censo Quilombola” passa a anteceder o painel de indicadores Brasil, Nordeste e Pernambuco.
- O controle de expansão mantém o conteúdo na própria página e agora apresenta fotografia documental de trabalho de campo do Censo 2022, texto de contextualização, legenda e crédito.
- Incluída explicação sobre a identificação por autodeclaração e as duas perguntas utilizadas pelo Censo.
- Aplicado tratamento responsivo à fotografia, preservando a identidade visual editorial do Atlas.

**Arquivos alterados:** `index.html`, `css/style.css`, `CHANGELOG.md`.

**Preservação:** nenhuma alteração em JavaScript cartográfico, GeoJSON, geometrias, projeções, enquadramentos, camadas, dados territoriais ou lógica dos mapas. As bibliotecas visual e documental permanecem independentes.

## 2026-11-27

### 00:35 — v1.3.1 — Separação das bibliotecas visual e documental
- Separadas as coleções em duas páginas independentes: Biblioteca visual (biblioteca.html) e Biblioteca documental (biblioteca-documental.html).
- Mantida a coleção Adinkra e os registros visuais na biblioteca visual.
- Transferidos os 13 registros escritos para a biblioteca documental, preservando categorias, metadados, links e estados de conferência.
- Atualizado o menu principal do Atlas e das duas páginas para permitir acesso direto a ambas as bibliotecas.
- Incluídos links cruzados entre os dois acervos, sem misturar seus conteúdos.

**Arquivos criados:** biblioteca-documental.html.
**Arquivos alterados:** biblioteca.html, index.html, CHANGELOG.md.

**Preservação:** nenhuma alteração em CSS cartográfico, JavaScript cartográfico, GeoJSON, geometrias, projeções, enquadramentos, camadas ou dados territoriais.

## 2026-11-27

## 2026-11-27

### 00:10 — v1.3.0 — Biblioteca documental integrada
- Criado o inventário documental com classificação de fontes acadêmicas, bases estatísticas, registros institucionais, legislação e referências visuais.
- Catalogados 13 registros escritos, com autoria/responsabilidade, instituição, ano ou período, tipo, resumo, finalidade no Atlas, páginas/tabelas, endereço de acesso e situação de conferência.
- Recuperado e registrado o endereço oficial do PPC da Licenciatura em Educação Escolar Quilombola Nego Bispo (UFPE); mantida a conferência parcial do Quadro 1, pp. 36–37.
- Registrados os arquivos de trabalho da dissertação de Joana D’Arc Alves Cardoso, com nota sobre a variação interna de referência ao PNLD 2023–2027/2024–2027.
- Integradas à Biblioteca as fontes do IBGE/SIDRA, FCP, INCRA e marcos normativos educacionais e territoriais.
- Ampliada a página Biblioteca com a seção “Fontes e documentos”, mantendo a coleção visual Adinkra em seção própria e integrada por navegação interna.
- Mantidos estados explícitos de conferência parcial e fonte dinâmica; não foram inventados endereços públicos para arquivos acadêmicos internos nem páginas ainda não indexadas.
- Corrigido o fechamento de tags da seção visual ao validar a estrutura HTML da página.

**Arquivos criados:** `docs/INVENTARIO_DOCUMENTAL.md`.
**Arquivos alterados:** `biblioteca.html`, `css/biblioteca.css`, `CHANGELOG.md`.

**Preservação:** nenhuma alteração em index.html, JavaScript cartográfico, GeoJSON, geometrias, projeções, enquadramentos, camadas ou lógica dos mapas. Menu principal e item “Entenda os reconhecimentos” mantidos sem duplicação.


### 23:58 — v1.2.1 — Referência bibliográfica Adinkra
- Atualizada a Biblioteca visual com a referência completa da obra `Adinkra: sabedoria em símbolos africanos`, 2ª edição, 2022.
- Identificados Elisa Larkin Nascimento e Luiz Carlos Gá como organizadores; editoras Cobogó e Ipeafro; ISBN 978-65-5691-076-5; classificação catalográfica A183.
- Registrados os créditos editoriais visíveis na ficha fotografada: revisão final de Eduardo Carneiro e projeto gráfico de Thiago Lacaz.
- Associada a referência completa aos três registros e mantidas as páginas consultadas: Sankofa (28), Nsaa (82) e Nkyinkyim (108).

**Arquivos alterados:** `biblioteca.html`, `css/biblioteca.css`, `CHANGELOG.md`.
**Preservação:** nenhuma alteração na cartografia, nos dados territoriais ou nos painéis das comunidades.


### v1.2.0 — Biblioteca visual inicial
- Criada a página `biblioteca.html`, acessível pelo menu de navegação do Atlas.
- Criada a coleção inicial de três registros Adinkra: Sankofa (p. 28), Nsaa (p. 82) e Nkyinkyim (p. 108), com significados e níveis de validação explicitados conforme as fotografias e referências fornecidas pelo responsável pelo projeto.
- Incluídas representações vetoriais esquemáticas para organização visual. Elas não são apresentadas como reproduções fiéis das imagens do livro.
- Registrada a pendência dos dados editoriais completos do livro (título, autoria, edição, editora e ano), necessários para completar as referências bibliográficas.
- Preparada a estrutura editorial para futura inclusão de fotografias, documentos, mapas e imagens vinculáveis aos painéis municipais/comunitários.
- Adicionado menu de navegação com acesso ao Atlas, à página de reconhecimentos e à Biblioteca visual.

**Arquivos criados:** `biblioteca.html`, `css/biblioteca.css`.
**Arquivos alterados:** `index.html`, `CHANGELOG.md`.

**Preservação:** nenhuma geometria, camada, dado ou lógica cartográfica foi alterada. Nenhuma imagem do livro foi reproduzida; os desenhos são esquemáticos e devem ser conferidos com a fonte original.


## 2026-11-27

### 00:02 — v1.1.0-rc.6 — Faixa fixa, repetição compacta e etiqueta móvel
- Movida a faixa decorativa para um pseudo-elemento fixo do documento, independente da altura/rolagem do contêiner principal, para evitar trechos em que a faixa desaparece.
- Reduzido o intervalo vertical da estampa Adinkra de 210 px para 170 px, mantendo os três símbolos e a paleta aprovada, para diminuir o vazio entre os grupos.
- Reorganizado o espaço interno da etiqueta do mapa: o título agora respeita uma área reservada ao botão de fechar, quebra nomes longos sem sobreposição e mantém o botão de abertura do painel em largura adequada ao celular.
- Mantido o painel lateral iniciando exatamente após a faixa terracota, conforme aprovado.
- Atualizadas as referências de cache dos dois arquivos CSS.

**Arquivos alterados:** `css/style.css`, `css/mapa.css`, `index.html`.

**Preservação:** não foram alterados HTML estrutural, JavaScript, mapas, geometrias, camadas, dados, enquadramento ou lógica cartográfica.


## 2026-11-26

### 23:37 — v1.1.0-rc.5 — Substituição da trama da faixa por referências Adinkra
- Substituído o padrão de losangos da faixa editorial por uma composição vertical inspirada nos símbolos Sankofa, Nsaa e Nkyinkyim, com base nas referências visuais fornecidas pelo usuário.
- Mantidos a largura, o posicionamento fixo, a cor terracota de base e a função decorativa da faixa.
- Criado o vetor `assets/faixa-adinkra.svg`, com traços em marrom escuro e repetição vertical.
- Atualizada a referência de cache de `css/style.css`.

**Arquivos alterados:** `assets/faixa-adinkra.svg`, `css/style.css`, `index.html`.

**Preservação:** painel lateral, conteúdo, tipografia, mapas, dados, geometrias e controles não foram alterados. Os motivos são uma interpretação vetorial decorativa das referências, não uma reprodução fac-similar do livro.


## 2026-11-26

### 23:18 — v1.1.0-rc.4 — Painel lateral alinhado ao início da faixa editorial
- O painel lateral passa a ocupar somente a área à direita da faixa vertical terracota, começando exatamente após o limite da faixa.
- O fundo de escurecimento também respeita a faixa, que permanece visível e fora da área coberta.
- Em telas móveis, a largura do painel considera automaticamente a largura da faixa; em telas amplas, mantém o limite máximo de 470 px.
- Atualizada a referência de cache de `css/painel.css`.

**Arquivos alterados:** `css/painel.css`, `index.html`.

**Preservação:** conteúdo, cartões, dados, animação, mapas e cartografia não foram alterados.


## 2026-11-26

### 23:12 — v1.1.0-rc.3 — Painel lateral acima da faixa editorial
- Corrigida a hierarquia de camadas do painel lateral: o fundo escurecido e o painel passam a ficar acima da faixa vertical terracota fixa.
- Ao abrir um município ou mesorregião em telas móveis, a faixa decorativa deixa de encobrir a margem esquerda e o conteúdo do painel.
- Mantidos largura, animação, conteúdo, rolagem e botão de fechamento do painel.
- Atualizada a referência de cache de `css/painel.css`.

**Arquivos alterados:** `css/painel.css`, `index.html`.

**Preservação:** nenhuma alteração no conteúdo dos cartões, dados, mapas, geometrias ou controles territoriais. Correção restrita à ordem de sobreposição visual.


## 2026-11-26

### 08:20 — Ajuste da etiqueta no modo Sub-regiões (teste mobile)
- No modo Sub-regiões, a etiqueta informativa passa a responder somente às bolhas proporcionais de municípios.
- Toques em áreas vazias ou diretamente no polígono da mesorregião deixam de abrir etiquetas municipais.
- A seleção de mesorregião pelo mapa permanece disponível; no modo Municípios, a interação com os polígonos continua funcionando.
- O ajuste atende ao teste em celular relatado pelo responsável pelo projeto.

**Arquivo alterado:** `js/mapa.js`.

**Preservação:** nenhuma alteração em geometrias, GeoJSON, projeção, cores, enquadramento ou dados.


## 2026-11-26

### 08:05 — v1.1.0-rc.1 — Etiquetas informativas e abertura deliberada do painel
- No computador, a etiqueta informativa aparece ao passar o cursor sobre municípios, mesorregiões e bolhas, desde que o controle de etiquetas esteja ligado.
- No celular, o primeiro toque apresenta uma etiqueta compacta com o botão “Abrir painel lateral”; um segundo toque no mesmo território, em até 2,8 segundos, também abre o painel.
- No computador, o clique no território mantém a abertura direta do painel lateral.
- O controle “Etiquetas: ligadas/desligadas” permite ativar ou desativar a apresentação automática; desligado, o toque/clique abre diretamente o painel.
- Bolhas proporcionais são associadas ao município correspondente e abrem sua ficha municipal, inclusive quando a visualização está em Sub-regiões.
- A etiqueta apresenta quantitativo e identificação do levantamento UFPE somente quando a camada de comunidades está ativa e existe registro validado.
- A versão está em avaliação; não substitui a referência estável v1.0.0.

**Arquivos alterados:** `js/mapa.js`, `js/app.js`, `index.html`, `css/style.css`.

**Preservação:** nenhuma alteração em GeoJSON, geometria, projeção, enquadramento, dados, cores cartográficas ou conteúdo dos painéis. A seleção territorial existente foi mantida, com tratamento específico para o clique nas bolhas.


## 2026-11-26

### 07:46 — Correção de persistência do controle de comunidades em Sub-regiões
- Reforçada a exibição do controle temático dentro da função que ativa os modos cartográficos de Pernambuco.
- O controle “Comunidades quilombolas” passa a ser explicitamente exibido tanto em Municípios quanto em Sub-regiões, evitando depender somente do evento do seletor.
- Atualizadas as referências de cache dos módulos JavaScript.

**Arquivos alterados:** `js/mapa.js`, `js/app.js`, `index.html`.

**Preservação:** nenhuma alteração em geometrias, camadas municipais originais, projeções, enquadramento, dados ou comportamento de seleção.

## 2026-11-26

### 07:35 — Bolhas proporcionais por município na visualização de sub-regiões
- Implementada a Opção A: na visualização por sub-regiões, círculos proporcionais indicam os municípios com quantitativos documentados de comunidades quilombolas.
- Os círculos são posicionados em pontos representativos calculados a partir das geometrias municipais já carregadas; não representam coordenadas exatas de comunidades.
- O controle da camada passou a permanecer disponível tanto na visualização Municípios quanto em Sub-regiões.
- Em Municípios, a camada mantém o destaque terracota dos municípios com registros; em Sub-regiões, apresenta os círculos proporcionais.
- A camada continua desligada por padrão e os municípios sem quantitativo validado permanecem sem bolhas.
- Atualizada a nota metodológica para esclarecer a natureza aproximada dos pontos.

**Arquivos alterados:** `js/mapa.js`, `js/app.js`, `index.html`.

**Preservação:** nenhum GeoJSON foi editado; geometrias, limites, projeções, enquadramento, dados IBGE e interações de seleção/clique permanecem sem alteração intencional. O comportamento de abertura do painel lateral não foi modificado nesta etapa.

## 2026-11-25

### 17:10 — Camada opcional de municípios com quantitativos de comunidades quilombolas
- Criado controle independente para mostrar/ocultar a camada temática no mapa de Pernambuco, disponível somente na visualização municipal.
- O controle inicia desativado e é ocultado nas escalas Brasil/Nordeste e na visualização por sub-regiões.
- Municípios com quantitativos documentados no levantamento acadêmico do Agreste recebem destaque terracota; ao passar o cursor, o tooltip informa a quantidade e identifica o levantamento da UFPE.
- A seleção municipal continua usando a interação original e o painel existente apresenta o quantitativo acadêmico quando há registro.
- Municípios sem registro nessa base permanecem sem classificação; a interface informa que ausência de dado validado não significa ausência de comunidades.
- Fonte exibida: UFPE, PPC da Licenciatura em Educação Escolar Quilombola Nego Bispo, Quadro 1, pp. 36–37; pesquisa 2022/2023, publicação 2024.
- Atualizadas as referências de cache dos módulos e do CSS.

**Arquivos alterados:** `js/mapa.js`, `js/app.js`, `index.html`, `css/style.css`.

**Preservação:** não foram alterados arquivos GeoJSON, geometrias, projeções, enquadramento, limites municipais, cores originais da malha, dados do IBGE ou a lógica de seleção territorial. A camada usa exclusivamente os 26 quantitativos municipais já documentados no Agreste; não atribui zero aos demais municípios nem os classifica como sem comunidades.

## 2026-11-25

### 17:00 — Refinamento do destaque estadual e da área do mapa
- Alterado o número de destaque da abertura para terracota, aumentando o contraste com o fundo marfim.
- Escurecido o texto auxiliar do destaque para melhorar a leitura.
- Reduzida a altura-base da área de exibição do mapa de 66vh/650px para 54vh/540px em telas amplas, diminuindo o espaço vertical excedente ao redor do território.
- Preservadas as regras específicas de altura para dispositivos móveis.
- Atualizadas as referências de cache dos dois arquivos CSS.

**Arquivos alterados:** `css/style.css`, `css/mapa.css`, `index.html`.

**Preservação:** nenhuma alteração em geometrias, projeção, zoom definido pelo mapa, camadas, cores cartográficas, dados territoriais ou lógica JavaScript.

## 2026-11-25

### 16:07 — Teste de fundo editorial com luz e sombras
- Criado o arquivo `assets/fundo-luz-sombras.svg`, com base marfim, granulação discreta e sombras orgânicas difusas inspiradas na referência do fundo do e-book.
- Aplicado o fundo à área principal do site, sem alterar cartões, painéis, mapa, controles ou tipografia.
- Mantida a faixa lateral terracota já existente.
- Atualizada a referência de cache de `css/style.css`.

**Arquivos alterados:** `assets/fundo-luz-sombras.svg`, `css/style.css`, `index.html`.

**Natureza da alteração:** teste visual reversível, sujeito à avaliação em desktop e celular.

### 15:38 — Reversão do teste de fundo verde-claro
- Removido o fundo verde-sálvia aplicado experimentalmente à área principal do site.
- Restaurado o fundo original da composição.
- Mantidas as demais aplicações da paleta ampliada: verde nos estados de seleção e indicadores secundários, areia nas superfícies e terracota nos destaques principais.
- Atualizada a referência de cache de `css/style.css`.

**Arquivos alterados:** `css/style.css`, `index.html`.

**Preservação:** nenhuma outra regra cromática, tipografia, estrutura, dado ou elemento cartográfico foi alterado.

### 15:35 — Correção do escopo do teste de fundo verde-claro
- Desfeito o teste anterior que aplicava verde-claro somente ao painel “A população quilombola em números”.
- Aplicado o verde-sálvia claro `#E8EBDD` à área principal do site, abrangendo abertura, indicadores, acordeão, mapa, nota editorial e rodapé, conforme a área delimitada na captura enviada.
- Cabeçalho superior preservado em palha `#F3EBDD`.
- O painel de indicadores voltou ao fundo original.
- Atualizada a referência de cache de `css/style.css`.

**Arquivos alterados:** `css/style.css`, `index.html`.

**Natureza da alteração:** teste visual reversível para avaliação da distribuição cromática.

### 15:31 — Teste de fundo verde-claro no painel principal
- Aplicado o tom verde-claro `#E8EBDD` exclusivamente ao fundo do painel “A população quilombola em números”.
- Cartões internos, indicadores, tipografia, seletores, fontes e demais seções permanecem inalterados.
- Atualizada a referência de cache do CSS para permitir a visualização do teste.

**Arquivos alterados:** `css/style.css`, `index.html`.

**Natureza da alteração:** teste visual reversível, sujeito à avaliação do usuário.

### 15:26 — Reforço da cor verde nos números dos painéis territoriais
- As capturas mostraram que os números do painel de mesorregião continuavam em terracota, apesar da regra geral já registrada.
- Reforçado o seletor CSS com escopo explícito para cartões municipais, mesorregionais e total do levantamento acadêmico.
- Aplicada a cor verde `#68734D` aos valores numéricos desses cartões.
- Renovada a versão de cache de `css/painel.css` para forçar o navegador a buscar a regra corrigida.

**Arquivos alterados:** `css/painel.css`, `index.html`.

**Preservação:** não foram alterados textos, dados, estrutura dos painéis, tipografia, mapas ou geometrias.

### 15:16 — Harmonização dos números nos painéis territoriais
- Os valores numéricos dos cartões de informação municipal e mesorregional passaram a usar o verde `#68734D`.
- O total do bloco de levantamento de comunidades do Agreste também recebeu o verde.
- Os títulos, textos, fundos e destaques terracota foram preservados.
- Atualizada a referência de cache de `css/painel.css`.

**Arquivos alterados:** `css/painel.css`, `index.html`.

**Preservação:** alteração restrita à cor dos números dos cartões de detalhe; dados, estrutura, cartografia e tipografia não foram modificados.

### 15:16 — Aplicação da paleta ampliada à interface editorial
- Mantido o terracota como cor principal de identidade e introduzido o verde `#68734D` como cor secundária de seleção, navegação e detalhes.
- Introduzida a areia `#D6BD91` em superfícies suaves dos indicadores e conteúdos informativos.
- Preservada a palha `#EDE6D8` como base clara e o grafite `#292B28` para contraste e leitura.
- Indicadores secundários receberam acentos verdes; o primeiro indicador mantém destaque terracota.
- Seletor territorial, controles de navegação, acordeão do Censo, destaques internos e elementos auxiliares receberam ajustes cromáticos.
- Atualizada a referência de cache de `css/style.css`.

**Arquivos alterados:** `css/style.css`, `index.html`.

**Preservação:** Fraunces e DM Sans mantidas. Não foram alterados `css/mapa.css`, arquivos GeoJSON, geometrias, cores temáticas dos mapas, camadas, enquadramento ou dados cartográficos.

### 11:28 — Etiqueta flutuante restrita ao mapa de Pernambuco
- A caixinha com o nome do município ou da mesorregião agora é exibida somente quando a escala ativa é Pernambuco.
- Nas escalas Brasil e Nordeste, a etiqueta não aparece.
- Aumentado o afastamento vertical do texto em relação ao ponto do cursor, para que a caixa fique acima do alfinete personalizado.
- Atualizados os identificadores de cache dos módulos JavaScript.

**Arquivos alterados:** `js/mapa.js`, `js/app.js`, `index.html`.

**Preservação:** alteração limitada ao tooltip de identificação. Não foram modificados mapas, geometrias, camadas, cores, zoom, dados ou tipografia.

### 11:24 — Restauração da combinação tipográfica editorial
- Restabelecida a Fraunces nos títulos principais, títulos de seções, números de destaque e elementos serifados da interface.
- Mantida a DM Sans nos textos corridos, controles, legendas e demais elementos funcionais.
- Confirmada a importação das duas famílias pelo Google Fonts; não foi introduzida a DM Serif.
- Atualizada a referência de cache de `css/style.css` para carregar as regras tipográficas novas.

**Arquivos alterados:** `css/style.css`, `index.html`.

**Preservação:** paleta de cores, estrutura dos painéis, indicadores, conteúdo e cartografia não foram alterados.

### 11:22 — Correção do carregamento do território após a compactação dos KPIs
- Identificado que o HTML mantinha a versão de cache anterior do módulo principal `js/app.js`, apesar da atualização de seu import para o módulo de indicadores.
- A versão antiga do módulo de indicadores ainda tentava atualizar o elemento `#regional-resident`, removido na nova estrutura de quatro KPIs. Esse erro interrompia a inicialização antes do registro do evento de carregamento do mapa, deixando a mensagem “Preparando o território” presa na tela.
- Atualizada a versão de cache de `js/app.js` em `index.html`, forçando o navegador a carregar o módulo principal e o módulo de indicadores compatíveis.

**Arquivos alterados:** `index.html`.

**Preservação:** nenhuma alteração nas fontes tipográficas, no CSS cartográfico, no JavaScript do mapa, nas geometrias ou nos dados territoriais.

### 11:17 — Reorganização compacta do painel “A população quilombola em números”
- Reduzida a altura vertical do bloco, com cabeçalho e seletor Brasil/Nordeste/Pernambuco na mesma linha em telas amplas.
- Reorganizados os indicadores em quatro cards horizontais: população quilombola, participação, residentes em territórios delimitados e residentes fora deles.
- Incorporada a população residente total ao subtítulo do KPI de participação, mantendo a atualização dinâmica conforme o recorte selecionado.
- Unificadas a nota explicativa e as fontes em uma faixa de rodapé.
- Reduzidos os espaçamentos entre o painel, o acordeão “O primeiro Censo Quilombola” e o mapa.
- Em telas menores, os quatro indicadores passam a uma grade compacta de duas colunas para preservar legibilidade.
- Atualizados os identificadores de cache do CSS e do módulo de dados.

**Arquivos alterados:** `index.html`, `css/style.css`, `js/dados-gerais.js`, `js/app.js`.

**Preservação:** paleta terrosa/bege, tipografia editorial, textos metodológicos e links de fonte mantidos. Nenhuma alteração nas geometrias, camadas ou lógica cartográfica.

### 11:09 — Posicionamento geográfico dos cartões de seleção
- Corrigido conflito entre a animação CSS de entrada e a propriedade `transform` usada pelo MapLibre para posicionar o cartão.
- A animação agora altera somente a opacidade; o posicionamento permanece vinculado às coordenadas exatas do clique.
- Mantido o comportamento de posicionamento automático do MapLibre para evitar que o cartão ultrapasse os limites visíveis do mapa.
- Atualizada a referência de cache do CSS.

**Arquivos alterados:** `css/mapa.css`, `index.html`.

**Preservação:** não foi necessário alterar `js/mapa.js`; os eventos já vinculavam os cartões a `event.lngLat`. Geometrias, camadas e dados cartográficos permanecem intactos.

### 11:06 — Correção definitiva da sobreposição da etiqueta da camada
- Identificado que o ajuste anterior só reposicionava a etiqueta em larguras de até 720 px; a captura enviada tinha largura superior a esse limite.
- Adicionada regra responsiva geral para ocultar a etiqueta de identificação da malha enquanto um cartão de seleção estiver aberto.
- Mantido o tooltip de passagem do cursor, que não aciona a ocultação.
- Atualizada a referência de cache do CSS no HTML.

**Arquivos alterados:** `css/mapa.css`, `index.html`.

**Preservação:** nenhuma alteração em JavaScript, camadas, geometrias, cores ou dados do mapa.

### 11:01 — Redução do cursor territorial
- Reduzido em 30% o tamanho visual do cursor personalizado (de 48 × 72 para 34 × 50 unidades SVG).
- Reposicionado o ponto ativo do cursor para acompanhar a nova dimensão e preservar a precisão do clique.
- Atualizada a referência de cache de `css/mapa.css` em `index.html`.

**Arquivos alterados:** `assets/cursor-lanca.svg`, `css/mapa.css`, `index.html`.

**Preservação:** nenhuma alteração na geometria do mapa, nas camadas cartográficas ou nos dados territoriais.

### 08:55 — Ajustes responsivos dos cartões do mapa
- Reposicionada, em telas móveis, a identificação da camada cartográfica para evitar sobreposição com o cartão de informações.
- Ajustada a largura máxima dos cartões de dados conforme a largura disponível no celular.
- Limitada a altura do cartão em dispositivos móveis, com rolagem interna quando o conteúdo exceder o espaço disponível.
- Refinada a hierarquia tipográfica do cartão: título, indicador principal, dados complementares e fonte.
- Ajustado o botão de fechamento do cartão para uso em telas pequenas.
- Atualizada a referência de cache de `css/mapa.css` em `index.html`.

**Arquivos alterados:** `css/mapa.css`, `index.html`.

**Preservação:** nenhuma alteração em `js/mapa.js`, nos arquivos GeoJSON, nas geometrias, nas cores ou no enquadramento cartográfico.

### Horário não registrado — Cursor e transições do mapa
- Adicionado cursor vetorial personalizado inspirado na imagem de referência fornecida.
- Definida animação de entrada de 1 segundo para os cartões flutuantes do mapa.
- Ajustada para 2 segundos a transição do painel de informações de Pernambuco.
- Atualizadas as referências de cache dos arquivos CSS em `index.html`.

**Arquivos alterados:** `assets/cursor-lanca.svg`, `css/mapa.css`, `css/painel.css`, `index.html`.

**Observação:** o horário exato dessa implementação anterior não foi registrado; por isso, não foi estimado.
