$ErrorActionPreference = "Stop"
$Url = "https://servicodados.ibge.gov.br/api/v3/malhas/estados/26?formato=application/vnd.geo+json&qualidade=minima&intrarregiao=municipio"
$OutDir = Join-Path $PSScriptRoot "..\data"
$OutFile = Join-Path $OutDir "municipios-pe.geojson"
New-Item -ItemType Directory -Force -Path $OutDir | Out-Null
Write-Host "Baixando malha municipal de Pernambuco da API oficial do IBGE..."
Invoke-WebRequest -Uri $Url -OutFile $OutFile
$Json = Get-Content $OutFile -Raw | ConvertFrom-Json
if ($Json.type -ne "FeatureCollection" -or -not $Json.features) {
  throw "O arquivo recebido não parece ser um GeoJSON FeatureCollection válido."
}
Write-Host "Concluído: $($Json.features.Count) feições salvas em $OutFile"
