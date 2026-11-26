# Versionamento — Atlas Territorial Quilombos de Pernambuco

## Política
- MAJOR: mudanças estruturais incompatíveis ou reformulação ampla.
- MINOR: novas funcionalidades compatíveis.
- PATCH: correções e refinamentos sem mudança de escopo funcional.
- Versões candidatas usam sufixos `-rc.N` e só viram estáveis após teste e aprovação do responsável pelo projeto.

## v1.0.0 — referência estável inicial
- Data de referência: 26/11/2026.
- Estado preservado na branch GitHub `release/v1.0.0`.
- Inclui identidade visual editorial, indicadores territoriais, mapas Brasil/Nordeste/Pernambuco, visualização municipal/sub-regional e camada opcional de comunidades com destaque municipal e bolhas proporcionais.
- Cobertura da camada comunitária ainda parcial: quantitativos documentados do Agreste.

## v1.1.0-rc.1 — candidata em teste
- Data: 26/11/2026.
- Etiquetas informativas ao passar o cursor no computador.
- No celular, primeiro toque mostra etiqueta com botão para abrir painel; segundo toque no mesmo território (até 2,8 segundos) abre o painel.
- Clique no computador abre o painel diretamente.
- Controle para ligar/desligar etiquetas automáticas.
- Clique/toque em bolha proporcional abre a ficha do município correspondente.
- Situação: aguardando teste funcional e aprovação; não é versão estável.

## Regra de publicação
Uma candidata só será promovida a versão estável após teste em celular e computador. A última versão estável permanece preservada em branch própria. Cada atualização deve registrar versão, data, arquivos, alterações, testes, pendências e commit no `CHANGELOG.md`.
