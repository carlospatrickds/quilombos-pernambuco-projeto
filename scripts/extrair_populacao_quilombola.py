#!/usr/bin/env python3
"""Extrai população quilombola municipal de Pernambuco diretamente da API SIDRA.

Uso (na raiz do projeto):
    py scripts/extrair_populacao_quilombola.py

A saída é gravada em data/populacao-quilombola-censo-2022.json.
Requer apenas Python 3.9+ (biblioteca padrão).
"""
from __future__ import annotations

import json
import re
import urllib.error
import urllib.request
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "data" / "populacao-quilombola-censo-2022.json"
URL = (
    "https://apisidra.ibge.gov.br/values/t/9578/"
    "n6/in%20n3/26/v/93,4728,4709,1004709/p/2022/"
    "c2661/32776,60027,60028/h/n"
)

VARIABLES = {
    "93": "populationTotal",
    "4728": "populationQuilombolaPercentOfResidents",
    "4709": "populationQuilombola",
    "1004709": "populationQuilombolaPercentOfBrazilTotal",
}
LOCATIONS = {
    "32776": "total",
    "60027": "withinOfficialTerritories",
    "60028": "outsideOfficialTerritories",
}

def numeric(value):
    value = str(value or "").strip()
    if not value or value in {"-", "...", "X"}:
        return None
    value = value.replace(",", ".")
    try:
        number = float(value)
    except ValueError:
        return None
    return int(number) if number.is_integer() else number

def main():
    request = urllib.request.Request(
        URL,
        headers={"User-Agent": "AtlasQuilombosPernambuco/1.0 (public-data research)"}
    )
    try:
        with urllib.request.urlopen(request, timeout=120) as response:
            rows = json.loads(response.read().decode("utf-8-sig"))
    except (urllib.error.URLError, TimeoutError) as exc:
        raise SystemExit(
            "Não foi possível consultar a API SIDRA. Verifique a conexão e tente novamente. "
            f"Detalhe: {exc}"
        )

    if not isinstance(rows, list) or len(rows) < 2:
        raise SystemExit("Resposta SIDRA vazia ou em formato inesperado.")

    # /h/n usa identificadores dimensionais estáveis (D1C, D1N, D2C, D4C, V).
    header = rows[0]
    required = {"D1C", "D1N", "D2C", "D4C", "V"}
    if not required.issubset(header):
        raise SystemExit(
            "Cabeçalho SIDRA diferente do esperado. Nenhum dado foi gravado. "
            f"Campos recebidos: {list(header.keys())}"
        )

    municipalities = {}
    for row in rows[1:]:
        code = str(row.get("D1C", "")).strip()
        if not re.fullmatch(r"26\\d{5}", code):
            continue
        variable = str(row.get("D2C", "")).strip()
        location = str(row.get("D4C", "")).strip()
        if variable not in VARIABLES or location not in LOCATIONS:
            continue
        item = municipalities.setdefault(code, {
            "name": row.get("D1N", "").strip(),
            "total": {},
            "withinOfficialTerritories": {},
            "outsideOfficialTerritories": {},
        })
        item[LOCATIONS[location]][VARIABLES[variable]] = numeric(row.get("V"))

    # Não publica uma base parcial ou com cobertura territorial inesperada.
    if len(municipalities) != 184:
        raise SystemExit(
            f"Esperados 184 municípios; a API retornou {len(municipalities)}. "
            "Nenhum arquivo foi gravado. Verifique o filtro territorial."
        )

    missing = []
    for code, item in municipalities.items():
        if not item["name"]:
            missing.append(f"{code}: nome ausente")
        for location in LOCATIONS.values():
            if "populationQuilombola" not in item[location]:
                missing.append(f"{code}: população quilombola ausente em {location}")
    if missing:
        raise SystemExit(
            "Há valores ausentes na extração; nenhum arquivo foi gravado:\n"
            + "\n".join(missing[:30])
        )

    # Consistência: total quilombola deve ser igual à soma dentro + fora.
    discrepancies = []
    for code, item in municipalities.items():
        total = item["total"]["populationQuilombola"]
        inside = item["withinOfficialTerritories"]["populationQuilombola"]
        outside = item["outsideOfficialTerritories"]["populationQuilombola"]
        if inside is not None and outside is not None and total != inside + outside:
            discrepancies.append({
                "code": code, "name": item["name"],
                "total": total, "inside": inside, "outside": outside,
            })

    result = {
        "metadata": {
            "source": "IBGE — Censo Demográfico 2022, SIDRA tabela 9578",
            "api": URL,
            "referenceYear": 2022,
            "consultedAt": date.today().isoformat(),
            "territorialScope": "184 municípios de Pernambuco",
            "variables": VARIABLES,
            "classification": {
                "name": "Localização do domicílio (2661)",
                "categories": LOCATIONS,
            },
            "validation": {
                "municipalitiesReturned": len(municipalities),
                "missingPopulationValues": 0,
                "insideOutsideDiscrepancies": discrepancies,
                "insideOutsideCheck": "total = em territórios + fora de territórios",
            },
            "notes": [
                "População quilombola é baseada na autodeclaração do Censo 2022.",
                "Residência em território oficialmente delimitado não equivale a certificação de comunidade.",
                "Não confundir pessoas quilombolas com número de comunidades ou territórios.",
                "Percentuais são preservados conforme publicados pelo IBGE; não recalculados nesta extração.",
            ],
        },
        "municipalities": municipalities,
    }

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(
        json.dumps(result, ensure_ascii=False, indent=2) + "\\n",
        encoding="utf-8"
    )
    print(f"Extração concluída: {len(municipalities)} municípios.")
    print(f"Arquivo: {OUTPUT}")
    print(f"Data da consulta: {result['metadata']['consultedAt']}")
    print(f"Inconsistências total x dentro/fora: {len(discrepancies)}")
    if discrepancies:
        print("ATENÇÃO: consulte o campo validation.insideOutsideDiscrepancies.")

if __name__ == "__main__":
    main()
