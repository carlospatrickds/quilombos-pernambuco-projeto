## 2026-11-27

### 22:07 — Cruzamento piloto de certificações FCP em Itacuruba
- Criado módulo independente com a situação FCP das três comunidades declaradas pelo IBGE em Itacuruba.
- Negros de Gilú e Poço dos Cavalos aparecem como certificadas, com processo e data da portaria. Associação Santa Clara aparece como “Não localizada na extração consultada”, sem inferir ausência de certificação.
- A ficha municipal exibe a situação FCP abaixo da denominação censitária, mantendo separados o Censo e o registro administrativo.
- Incluídos links para a fonte da Fundação Cultural Palmares e atualizada a versão de cache do painel.
- O cruzamento é piloto; não representa ainda a conciliação integral das 566 comunidades de Pernambuco.
- Nenhuma geometria, projeção, camada, coordenada, enquadramento ou interação cartográfica foi modificada.

**Arquivos alterados:** `data/certificacoes-fcp-piloto-itacuruba.js`, `js/panel.js`, `js/app.js`, `css/painel.css`, `docs/BASE_MESTRA_QUILOMBOLA_PERNAMBUCO.md`, `CHANGELOG.md`.
**Validação:** processos de Negros de Gilú e Poço dos Cavalos conferidos na relação oficial da FCP; validação visual após publicação pendente.

## 2026-11-27

### 11:53 — Compatibilidade com importação antiga do módulo de localidades
- Criado módulo de compatibilidade em `js/localidades-quilombolas-municipais-censo-2022.js`, correspondente ao caminho antigo que ainda pode ser solicitado por versões de `js/data.js` mantidas em cache.
- O módulo apenas reexporta os dados de `data/localidades-quilombolas-municipais-censo-2022.js`; não duplica, transforma ou altera a base.
- Preservados dados, geometrias, camadas, projeções, enquadramentos e interações cartográficas.
- A alteração é defensiva: a versão atual de `js/data.js` continua importando diretamente de `../data/`.

**Arquivos alterados:** `js/localidades-quilombolas-municipais-censo-2022.js`, `CHANGELOG.md`.
**Validação:** módulo de compatibilidade criado; confirmar após publicação se o pedido antigo deixa de retornar 404 e se o mapa carrega no navegador.

## 2026-11-27

### 11:47 — Correção do caminho do módulo de localidades quilombolas
- Corrigido o caminho de importação do módulo de localidades do Censo 2022: o arquivo está em `data/`, e não em `js/`.
- Atualizada a cadeia de versões dos módulos JavaScript para evitar reutilização de arquivos em cache após a correção.
- A falha de importação impedia a inicialização do módulo cartográfico e, consequentemente, o carregamento do mapa e a resposta dos seletores Brasil, Nordeste e Pernambuco.
- Corrigido somente o caminho do módulo e as referências de cache; nenhuma geometria, camada, dado, projeção ou enquadramento cartográfico foi alterado.

**Arquivos alterados:** `js/data.js`, `js/mapa.js`, `js/app.js`, `index.html`, `CHANGELOG.md`.

**Validação:** caminho relativo conferido em relação à estrutura real do repositório; validação visual no navegador ainda depende de recarregamento após a publicação.


### 11:42 — Aproximação inicial do mapa de Pernambuco no desktop
- Aumentado em 0,7 nível o zoom após o enquadramento automático dos limites estaduais, buscando escala gráfica inicial próxima de 300 km em vez de 500 km.
- Ajuste aplicado somente em telas com largura superior a 700 px.
- Enquadramento inicial móvel mantido sem alteração.
- Preservados centro calculado pelo território, limites geográficos, geometria, projeção, camadas, controles e interações.
- Atualizada a versão de cache do módulo cartográfico em `js/app.js`.

**Arquivos alterados:** `js/mapa.js`, `js/app.js`, `CHANGELOG.md`.
**Validação:** conferida a alteração no bloco de enquadramento inicial e a referência atualizada do módulo. A escala final precisa de conferência visual no navegador, pois depende das dimensões efetivas da janela e do mapa.

## 2026-11-27

### 11:33 — Integração dos dados de comunidades e localidades do IBGE às fichas municipais
- Criado o módulo `data/localidades-quilombolas-municipais-censo-2022.js`, derivado dos arquivos já conferidos da Tabela de Resultado 2 e do CSV vetorial estadual.
- Integrados os quantitativos de comunidades declaradas associadas a localidades e de localidades quilombolas para os 72 municípios com registros na Tabela 2.
- Incluída a relação nominal agrupada por código nacional de comunidade, com quantidade de localidades associadas e vínculo territorial somente quando informado na fonte.
- Atualizada a ficha municipal para exibir os dois indicadores e uma lista nominal expansível.
- Incluído link direto para a página oficial do produto do IBGE na ficha municipal.
- Mantido o levantamento acadêmico do Agreste como fonte complementar independente, sem somá-lo aos resultados do Censo.
- Municípios sem linha na Tabela 2 não são classificados como municípios sem comunidades.
- Atualizados os módulos, estilos, versões de cache, roadmap e documentação da Base Mestra.

**Arquivos criados:** `data/localidades-quilombolas-municipais-censo-2022.js`.
**Arquivos alterados:** `js/data.js`, `js/panel.js`, `js/app.js`, `index.html`, `css/painel.css`, `ROADMAP.md`, `docs/BASE_MESTRA_QUILOMBOLA_PERNAMBUCO.md`, `CHANGELOG.md`.
**Conferência:** 72 municípios; 566 comunidades declaradas associadas a localidades; 621 localidades quilombolas. Relação nominal agrupada: 566 registros por município/código nacional.
**Preservação cartográfica:** nenhum GeoJSON, SHP, polígono, geometria, projeção, enquadramento, camada ou lógica de interação cartográfica foi alterado. Coordenadas não foram utilizadas para criar pontos no mapa.

## 2026-11-27

### 09:36 — Remove caractere literal entre seções da Biblioteca visual
- Removida a sequência textual `\\n` que aparecia entre o registro fotográfico e a coleção de símbolos Adinkra.
- Restaurada a separação normal entre as seções, sem alterar conteúdo, imagens, estilos ou estrutura da Biblioteca.

**Arquivo alterado:** `biblioteca.html`.
**Preservação:** nenhuma alteração em dados, mapas, GeoJSON, geometrias, projeções, camadas ou lógica cartográfica.

## 2026-11-27

### 09:45 — Correção definitiva dos arquivos Adinkra e carregamento da faixa
- Substituído o arquivo PNG corrompido de Nkyinkyim pela imagem original reenviada, com transparência preservada, recorte apenas da margem transparente e proporção integral (200 × 231 px).
- Recriada a faixa lateral com os três PNGs incorporados como dados no SVG, evitando falha de carregamento de imagens externas dentro de SVG usado como fundo CSS.
- Mantida a redução aproximada de 20% e a repetição vertical em grupos de três, com reticências entre os grupos.
- Ajustada a área de exibição de Nkyinkyim na Biblioteca visual para acomodar a proporção vertical completa.
- Atualizadas as versões de cache do Atlas e da Biblioteca visual.

**Arquivos alterados:** `assets/adinkra/nkyinkyim.png`, `assets/faixa-adinkra.svg`, `css/biblioteca.css`, `index.html`, `biblioteca.html`, `CHANGELOG.md`.
**Preservação:** nenhum dado, mapa, GeoJSON, geometria, projeção, enquadramento, camada ou lógica cartográfica foi alterado.

## 2026-11-27

### 09:25 — Ajuste da faixa lateral Adinkra e exibição do Nkyinkyim
- Reduzido em aproximadamente 20% o tamanho dos três símbolos exibidos na faixa terracota.
- Criada repetição vertical em grupos de três símbolos, com separador visual de reticências entre os grupos.
- Reorganizados os intervalos para que o terceiro símbolo não encoste no limite inferior do grupo.
- Acrescentada área de respiro à exibição do Nkyinkyim na Biblioteca visual, mantendo a imagem integral em proporção.
- Atualizadas as versões de cache dos arquivos CSS nas páginas correspondentes.

**Arquivos alterados:** `assets/faixa-adinkra.svg`, `css/style.css`, `css/biblioteca.css`, `index.html`, `biblioteca.html`, `CHANGELOG.md`.
**Preservação:** nenhum dado, mapa, GeoJSON, geometria, projeção, enquadramento, camada ou lógica cartográfica foi alterado.

## 2026-11-27

### 09:06 — Correção do cabeçalho desktop e fidelidade dos símbolos Adinkra na faixa lateral
- Reorganizado o cabeçalho em telas desktop para manter marca, identificação acadêmica e menu sanduíche na mesma faixa, com espaçamentos e tipografia responsivos.
- Removido o deslocamento automático do menu que concorria com a identificação institucional.
- Substituídos os três desenhos vetoriais esquemáticos da faixa terracota por máscaras CSS que utilizam diretamente os PNGs transparentes já catalogados na Biblioteca visual: Sankofa, Nsaa e Nkyinkyim.
- Removido o arquivo SVG esquemático que alimentava a faixa; os símbolos agora são renderizados a partir dos PNGs originais, com tonalidade marrom escura, transparência, repetição vertical e proporções preservadas.
- Atualizada a versão de cache do CSS principal.

**Arquivo removido:** `assets/faixa-adinkra.svg` (vetores esquemáticos antigos).
**Arquivos alterados:** `css/style.css`, `index.html`, `CHANGELOG.md`.
**Preservação:** nenhuma alteração em dados, mapas, GeoJSON, geometrias, projeções, enquadramentos, camadas ou lógica cartográfica. As imagens PNG originais da Biblioteca visual foram reutilizadas, sem modificar seus arquivos.

## 2026-11-27

### 08:41 — Substituição dos desenhos vetoriais por imagens Adinkra em PNG transparente
- Substituídas as três representações provisórias de Sankofa, Nsaa e Nkyinkyim por imagens PNG rasterizadas fornecidas como referência para o projeto.
- Removidos os fundos brancos e preservadas as transparências e proporções dos desenhos.
- Padronizadas as imagens em 200 × 200 px, com carregamento tardio e dimensões declaradas no HTML.
- Pesos finais: Sankofa 10.887 bytes; Nsaa 1.960 bytes; Nkyinkyim 1.384 bytes.
- Mantidos os textos, significados, referências bibliográficas, organização dos cartões e demais coleções.
- Atualizada a versão de cache do CSS da Biblioteca visual.

**Arquivos criados:** assets/adinkra/sankofa.png, assets/adinkra/nsaa.png, assets/adinkra/nkyinkyim.png.
**Arquivos alterados:** biblioteca.html, css/biblioteca.css, CHANGELOG.md.
**Preservação:** nenhuma alteração nos dados, mapas, GeoJSON, geometrias, projeções, camadas ou lógica cartográfica.

### 08:33 — Inclusão da fotografia do Censo na Biblioteca visual
- Adicionado à coleção “Fotografias de comunidades” o registro da imagem de trabalho de campo do Censo Demográfico 2022 já utilizada no Atlas principal.
- Preservado o endereço original da imagem hospedada no portal gov.br e incluído o link para a publicação de referência.
- Registrados o crédito informado (IBGE), a data da publicação de referência (27/07/2023), a finalidade no Atlas e a ressalva sobre a confirmação das condições de reprodução.
- Atualizada a contagem da coleção de fotografias.

**Arquivo alterado:** biblioteca.html.
**Preservação:** nenhuma alteração na imagem do Atlas principal, nos textos do Censo, nos dados, mapas, geometrias, projeções, camadas ou lógica cartográfica.

# Histórico de alterações

### 2026-11-27 — Base municipal estruturada a partir da Tabela de Resultado 2
- Criado `data/base-mestra/indicadores-municipais-localidades-quilombolas-PE-2022.csv`, com os 72 municípios pernambucanos presentes na Tabela de Resultado 2 do IBGE.
- Preservados códigos IBGE, nomes municipais, quantitativos de comunidades declaradas associadas a localidades e localidades quilombolas, ano de referência e identificação da fonte.
- Conferida a soma dos registros: 566 comunidades declaradas e 621 localidades, em reconciliação com as Tabelas 1 e 2.
- Registrado que o arquivo é agregado por município e não contém identificação nominal individual nem coordenadas.

**Arquivo criado:** `data/base-mestra/indicadores-municipais-localidades-quilombolas-PE-2022.csv`.
**Arquivos alterados:** `docs/BASE_MESTRA_QUILOMBOLA_PERNAMBUCO.md`, `CHANGELOG.md`.
**Escopo:** estruturação de dados censitários agregados; sem alteração dos indicadores publicados, mapas, geometrias ou lógica cartográfica.

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


### 2026-11-27 — v0.3 da Base Mestra: CSV estadual e conciliação por códigos
- Extraído o arquivo oficial `PE_LQs_CD2022_100724.csv` e consultado o dicionário `Dicionario_LQs.xlsx`.
- Conferidos 621 registros e códigos CD_LQ distintos, 566 códigos IDCQ0001 distintos, 72 municípios e 621 pares de coordenadas preenchidos.
- Os 621 códigos CD_LQ foram conciliados com o Apêndice 1; município, ocorrência, código nacional de comunidade e processo FCP informado também coincidiram em todos os registros.
- Os 56 registros com CD_TQ foram conciliados com os vínculos dos Apêndices 1 e 2, incluindo os 14 códigos territoriais.
- Documentada a divergência de cabeçalho NM_CQ no CSV e NM_LQ no dicionário, sem alterar o campo de origem.
- Criados três arquivos CSV na pasta `data/base-mestra/`: localidades (621), comunidades (566) e relações localidade–território (56).
- A inspeção dos SHP e a validação espacial das coordenadas continuam pendentes; nenhum ponto foi publicado no mapa.

**Escopo:** extração e conciliação tabular. Sem alteração dos mapas, geometrias existentes ou lógica cartográfica.


## 2026-11-27

### 12:33 — Reorganização visual da ficha municipal: destaque para comunidades quilombolas
- Compactados os cartões dos indicadores demográficos iniciais para reduzir sua altura e liberar espaço visual.
- Reforçada a seção “Comunidades quilombolas”, com fundo verde-palha, indicadores em verde-oliva e texto introdutório.
- Reorganizada a relação nominal em três colunas: comunidade declarada, quantidade de localidades associadas e população de moradores.
- Mantida a quantidade de localidades por comunidade conforme a base nominal do IBGE.
- A coluna de moradores exibe traço e explicação explícita: a base atualmente integrada não apresenta população individualizada por comunidade; nenhum valor foi estimado ou distribuído a partir do total municipal.
- Preservados os dados municipais, a relação nominal, os vínculos territoriais e as fontes existentes.

**Arquivos alterados:** `index.html`, `js/app.js`, `js/panel.js`, `css/painel.css`, `CHANGELOG.md`.
**Preservação:** nenhuma alteração em dados-fonte, GeoJSON, geometrias, projeções, enquadramentos, camadas ou lógica cartográfica.


## 2026-11-27

### 12:43 — Ajuste de hierarquia da ficha municipal e clareza sobre população comunitária
- Compactado o cartão de participação quilombola, reorganizando rótulo, percentual e legenda em uma faixa horizontal.
- Reforçado o destaque da seção “Comunidades quilombolas” com borda lateral verde-oliva, título ampliado e indicadores mais evidentes.
- Substituído o traço na coluna de população por “ND” (não disponível), com explicação direta de que a base consultada não individualiza moradores por comunidade.
- Renomeado o cabeçalho da coluna para “População”, evitando sugerir que o dado está apenas aguardando carregamento.
- Preservada a distinção entre população quilombola municipal e população por comunidade; nenhum valor foi estimado ou rateado.

**Arquivos alterados:** `index.html`, `js/app.js`, `js/panel.js`, `css/painel.css`, `CHANGELOG.md`.
**Preservação:** nenhuma alteração nos dados-fonte, GeoJSON, geometrias, projeções, enquadramentos, camadas ou lógica cartográfica.


## 2026-11-27

### 12:58 — Prioridade dos dados do IBGE nas etiquetas municipais
- Atualizada a fonte prioritária dos quantitativos exibidos nas etiquetas do mapa e nos pontos temáticos municipais.
- Quando houver registro na base nominal do IBGE, a etiqueta passa a exibir a quantidade de comunidades declaradas associadas a localidades, identificada como “IBGE · Censo 2022”.
- Quando não houver registro correspondente na Tabela de Resultado 2, permanece disponível o quantitativo do levantamento acadêmico da UFPE, identificado explicitamente como fonte complementar.
- Municípios sem registro em nenhuma das duas bases permanecem sem quantitativo; ausência de registro não é interpretada como zero.
- Preservada a base acadêmica original e a base censitária, sem soma ou combinação dos quantitativos.
- Nenhuma alteração em geometrias, coordenadas, projeções, enquadramentos ou desenho das camadas.

**Arquivos alterados:** `js/mapa.js`, `js/app.js`, `CHANGELOG.md`.


## 2026-11-27

### 13:42 — Alinhamento dos controles e busca por comunidades quilombolas
- Padronizada a altura e a distribuição dos controles do mapa no desktop, com reorganização responsiva para tablet e celular.
- Substituído o botão único de etiquetas por seletor segmentado “Ligadas / Desligadas”, no mesmo padrão visual dos controles territoriais.
- Ampliada a busca para municípios e comunidades nominais disponíveis na base do IBGE.
- A busca normaliza acentos e permite localizar nomes por fragmentos; por exemplo, “onz” retorna “ONZE NEGRAS”.
- Ao selecionar uma comunidade, o Atlas muda para a visualização municipal, ativa o município correspondente e abre sua ficha.
- A busca comunitária utiliza os registros nominais da Tabela de Resultado 2 já integrada. Não acrescenta nomes do levantamento UFPE quando a base acadêmica não possui relação nominal estruturada.
- Preservadas as fontes, os quantitativos e as estruturas cartográficas existentes.

**Arquivos alterados:** `index.html`, `js/mapa.js`, `js/app.js`, `css/style.css`, `CHANGELOG.md`.
**Preservação:** nenhuma alteração em GeoJSON, geometrias, coordenadas, projeções, enquadramentos ou camadas cartográficas.


### 15:18 — Reordenação dos controles e correção de cache da busca comunitária
- Reordenados os controles de Pernambuco: comunidades quilombolas, municípios/sub-regiões, etiquetas informativas, busca e reinício.
- Substituído o botão alternável de comunidades por duas opções explícitas: Mostrar (verde-oliva) e Ocultar (terracota), com indicação visual do estado ativo.
- Corrigida a normalização Unicode dos termos de busca para remover sinais diacríticos de forma consistente.
- Incrementada a versão de cache do módulo cartográfico e do aplicativo para impedir reutilização de módulo anterior pelo navegador.
- Mantida a busca nominal baseada na relação estruturada do Censo 2022 e o vínculo com o município correspondente.
- Nenhuma geometria, coordenada, projeção, enquadramento ou camada cartográfica foi modificada.

**Arquivos alterados:** `index.html`, `js/app.js`, `js/mapa.js`, `css/style.css`, `CHANGELOG.md`.


### 15:22 — Sincronização do estado dos controles ao sair de Pernambuco
- Ajustado o estado visual dos botões Mostrar/Ocultar quando o usuário muda para Brasil ou Nordeste, evitando que a interface preserve uma seleção incompatível com a camada desativada.
- Corrigida a expressão de normalização Unicode da busca para remover acentos com a faixa de caracteres combinantes.
- Atualizadas novamente as versões de cache do aplicativo e do módulo cartográfico.


## 2026-11-27

### 15:18 — Alinhamento interno dos controles do mapa
- Padronizada a altura dos grupos de seleção e a área reservada aos rótulos.
- Alinhadas as linhas dos botões Mostrar/Ocultar, Municípios/Sub-regiões e Ligadas/Desligadas.
- Ajustados altura, alinhamento vertical e centralização dos campos de busca e reinício em relação aos grupos.
- Mantida a ordem dos controles e a codificação cromática aprovada: verde para Mostrar e terracota para Ocultar.
- Alteração restrita à apresentação CSS; sem mudanças em funcionalidades, dados ou estrutura cartográfica.

**Arquivos alterados:** `css/style.css`, `index.html`, `CHANGELOG.md`.


## 2026-11-27

### 15:32 — Correção da disposição dos seletores territoriais
- Restaurada a disposição horizontal dos botões Regiões/Estados e Municípios/Sub-regiões.
- Removido o espaço superior artificial aplicado aos seletores territoriais na versão anterior.
- Mantidas as proporções dos botões, com divisão horizontal equilibrada e centralização vertical.
- Preservadas as dimensões externas dos grupos e os demais controles.

**Arquivos alterados:** `css/style.css`, `index.html`, `CHANGELOG.md`.
**Escopo:** ajuste visual de CSS; nenhuma alteração funcional ou cartográfica.


## 2026-11-27

### 15:46 — Correção de controles duplicados entre escalas
- Corrigida a precedência CSS que fazia os seletores de Brasil e Pernambuco ignorarem o atributo HTML `hidden`.
- Agora, em Pernambuco, aparece somente “Municípios / Sub-regiões”; em Brasil, somente “Regiões / Estados”.
- Mantida a disposição horizontal e as proporções dos botões.
- Nenhuma alteração na lógica territorial, dados ou cartografia.

**Arquivos alterados:** `css/style.css`, `index.html`, `CHANGELOG.md`.


## 2026-11-27

### 16:05 — Exibição exclusiva dos seletores por escala territorial
- Corrigida a sincronização dos controles Regiões/Estados e Municípios/Sub-regiões.
- Regiões/Estados é exibido exclusivamente na escala Brasil.
- Municípios/Sub-regiões é exibido exclusivamente na escala Pernambuco.
- Na escala Nordeste, ambos os seletores ficam ocultos.
- A visibilidade agora é atualizada imediatamente quando a escala é solicitada, antes do carregamento assíncrono do mapa, evitando que controles da escala anterior permaneçam visíveis durante a transição.
- Mantida a regra CSS que respeita o atributo `hidden`.

**Arquivos alterados:** `js/app.js`, `index.html`, `CHANGELOG.md`.
**Escopo:** correção de interface e estado; nenhuma alteração em dados, geometrias ou camadas cartográficas.


## 2026-11-27

### 15:50 — Refatoração visual da barra superior de filtros
- Padronizados altura, padding, borda e raio de 8 px dos cards de filtros.
- Uniformizados os controles segmentados, com opções de larguras iguais, alturas consistentes e cantos de 6 px.
- Incluído rótulo reservado “Visualização territorial” acima de Municípios/Sub-regiões e Regiões/Estados, alinhando os botões com os demais grupos.
- Arredondados o campo de busca e o botão de reinício.
- Aplicada à barra a paleta solicitada: creme `#F7F4EB`, bege `#EDE6D6`, verde-oliva `#5C6944` e terracota `#6B3629`.
- Preservada a regra de exibição exclusiva dos seletores por escala territorial.

**Arquivos alterados:** `css/style.css`, `index.html`, `CHANGELOG.md`.
**Escopo:** apresentação da barra de filtros; nenhuma alteração em lógica de busca, dados, geometrias, camadas ou interações do mapa.


## 2026-11-27

### 16:12 — Correção do controle de visualização territorial
- Corrigida a composição do card Municípios/Sub-regiões e Regiões/Estados.
- O título “Visualização territorial” ocupa uma linha reservada própria.
- As duas opções passam a ocupar colunas iguais na mesma linha, sem empilhamento ou extravasamento vertical.
- Mantidas altura externa, paleta, bordas e dimensões gerais dos demais cards.
- Correção restrita ao CSS da barra superior.

**Arquivos alterados:** `css/style.css`, `index.html`, `CHANGELOG.md`.


## 2026-11-27

### 16:36 — Ampliação do enquadramento inicial de Pernambuco no desktop
- Ajustado o enquadramento automático da malha municipal na abertura do Atlas para apresentar Pernambuco em escala maior no desktop.
- O limite de zoom do mapa passou de 7,5 para 8,3; o enquadramento inicial de Pernambuco no desktop passa a admitir zoom até 8,2, com margem interna reduzida para 42 px.
- No celular, o enquadramento inicial permanece com zoom máximo 7,5 e margem de 65 px.
- A mudança afeta somente o enquadramento inicial e o limite técnico de aproximação; não altera geometrias, dados, camadas, controles ou identidade visual.

**Arquivos alterados:** `js/app.js`, `js/config.js`, `js/mapa.js`, `index.html`, `CHANGELOG.md`.


### 16:45 — Ampliação do enquadramento inicial de Pernambuco para zoom 9
- Elevado de 8,2 para 9,0 o limite de zoom do enquadramento inicial de Pernambuco no desktop.
- Elevado para 9,0 o limite técnico geral de aproximação do mapa.
- Mantido o enquadramento inicial móvel em 7,5.
- Nenhuma alteração em geometrias, dados, camadas, controles ou interações.

**Arquivos alterados:** `js/app.js`, `js/config.js`, `js/mapa.js`, `index.html`, `CHANGELOG.md`.


## 2026-11-27

### 16:54 — Reposicionamento vertical do mapa inicial de Pernambuco
- Ajustado o enquadramento desktop da escala Pernambuco com preenchimento assimétrico: 42 px no topo e laterais e 344 px na base.
- O preenchimento inferior desloca o centro visual do território para a faixa superior do quadro do mapa, correspondente à área indicada pelo usuário.
- Mantidos zoom máximo 9,0, duração da transição, enquadramento móvel e todos os controles.
- Alteração restrita ao enquadramento visual; sem mudanças em geometrias, dados, projeções, camadas ou interações.

**Arquivos alterados:** `js/app.js`, `index.html`, `CHANGELOG.md`.


### 20:51 — Centralização do enquadramento inicial de Pernambuco
- Removido o preenchimento inferior assimétrico de 344 px que deslocava a malha para fora do campo de visão.
- Restaurado o enquadramento centralizado, com preenchimento uniforme de 55 px, seguindo o mesmo critério utilizado na visualização do Nordeste.
- Mantido o zoom máximo inicial de 9,0 no desktop e 7,5 no celular.
- Sem alterações em geometrias, dados, controles, camadas ou interações.

**Arquivos alterados:** `js/app.js`, `index.html`, `CHANGELOG.md`.


### 20:51 — Deslocamento vertical de Pernambuco em 30%
- Ajustado o enquadramento inicial no desktop para deslocar visualmente a malha de Pernambuco 30% da altura do quadro para cima.
- O deslocamento é calculado dinamicamente a partir da altura real do mapa, por meio de preenchimento inferior assimétrico.
- Mantidos zoom máximo 9,0 no desktop, zoom 7,5 no celular e preenchimento móvel centralizado.
- Nenhuma alteração em geometrias, dados, camadas, controles ou interações.

**Arquivos alterados:** `js/app.js`, `index.html`, `CHANGELOG.md`.


### 20:57 — Refinamento da experiência mobile do Atlas
- Reorganizados os três grupos de filtros em cartões compactos de largura integral, com títulos e controles segmentados em linhas próprias.
- Uniformizadas as alturas dos cartões e dos botões no celular; preservadas as cores, os estados e as funções.
- Busca e botão de reinício colocados na mesma linha, com proporções adequadas à tela estreita.
- Reduzido o espaço vertical entre título, filtros e mapa para antecipar a área cartográfica na rolagem.
- Ajustada a altura do mapa móvel para 56vh (mínimo 370 px) e aplicado deslocamento vertical moderado do enquadramento para aproximar o território do topo da área cartográfica.
- Mantida integralmente a apresentação desktop e preservados os controles, dados, geometrias, camadas e interações.

**Arquivos alterados:** `css/style.css`, `css/mapa.css`, `js/app.js`, `index.html`, `CHANGELOG.md`.


### 21:36 — Correção dos controles segmentados no celular
- Corrigida a largura intrínseca dos botões Mostrar/Ocultar e Ligadas/Desligadas, que ultrapassava os limites dos cartões em telas estreitas.
- Forçada a composição em duas colunas de largura mínima zero, com os botões contidos no espaço disponível.
- Aplicado o mesmo limite de largura ao seletor Municípios/Sub-regiões.
- Alteração restrita ao CSS responsivo; sem mudanças na apresentação desktop, no mapa, nos dados ou nas interações.

**Arquivos alterados:** `css/style.css`, `index.html`, `CHANGELOG.md`.


## 2026-11-27

### 22:41 — Restauração do tamanho e da centralização do mapa de Pernambuco
- Removido o deslocamento vertical produzido pelo preenchimento inferior assimétrico no enquadramento da escala Pernambuco.
- Restaurada a margem uniforme de 55 px no desktop, mantendo o limite de zoom 9,0; no celular, mantidas as margens de 28 px no topo/base e 35 px nas laterais, com limite 7,5.
- Removido o acréscimo automático de 0,7 nível de zoom no enquadramento inicial desktop.
- Alteração restrita ao tamanho e à centralização visual do mapa de Pernambuco. Preservados GeoJSON, geometrias, coordenadas, projeções, dados, camadas, controles e interações.

**Arquivos alterados:** `js/app.js`, `js/mapa.js`, `index.html`, `CHANGELOG.md`.


## 2026-11-27

### 22:45 — Aproximação e reposicionamento vertical de Pernambuco
- Ampliado o enquadramento desktop da escala Pernambuco em 2,5 níveis de zoom, limitado ao máximo técnico de 9,0, para aproximar a escala gráfica da referência solicitada de 500 km.
- Aplicado preenchimento superior adicional equivalente a 25% da altura do mapa, mantendo a margem inferior e laterais, para posicionar Pernambuco um pouco mais abaixo no quadro e aproximar sua altura visual da escala Brasil.
- Mantido o enquadramento móvel sem alterações.
- Alteração restrita à escala e ao posicionamento visual da malha de Pernambuco; preservados GeoJSON, geometrias, coordenadas, projeções, dados, camadas, controles e interações.

**Arquivos alterados:** `js/app.js`, `index.html`, `CHANGELOG.md`.

### 22:50 — Elevação do enquadramento de Pernambuco em 40%
- Reposicionado o enquadramento desktop para elevar visualmente a malha de Pernambuco em aproximadamente 40% da altura do quadro, usando preenchimento inferior assimétrico calculado pela altura real do mapa.
- Mantidos o zoom, os limites de aproximação, as margens laterais e o enquadramento móvel.
- Alteração restrita ao posicionamento visual; preservados GeoJSON, geometrias, coordenadas, projeções, dados, camadas, controles e interações.

**Arquivos alterados:** js/app.js, index.html, CHANGELOG.md.
