"""CSV cleanup logic for job application tracking files."""

from __future__ import annotations

import csv
from dataclasses import dataclass
from pathlib import Path


HEADER_ALIASES = {
    "company name": "company",
    "company": "company",
    "position title": "position",
    "position": "position",
    "job title": "position",
    "application status": "status",
    "status": "status",
    "date applied": "applied_date",
    "applied date": "applied_date",
    "applied": "applied_date",
    "location": "location",
    "notes": "notes",
}


@dataclass
class CsvCleanResult:
    rows_in: int
    rows_out: int
    output_path: Path


def clean_job_application_csv(input_path: Path, output_path: Path) -> CsvCleanResult:
    with input_path.open("r", encoding="utf-8", newline="") as input_file:
        reader = csv.DictReader(input_file)
        normalized_headers = [_normalize_header(name or "") for name in (reader.fieldnames or [])]
        fieldnames = _build_output_headers(normalized_headers)
        cleaned_rows = []

        rows_in = 0
        for row in reader:
            rows_in += 1
            cleaned_row = {header: "" for header in fieldnames}

            for original_header, value in row.items():
                normalized_header = _normalize_header(original_header or "")
                mapped_header = _map_header(normalized_header)
                cleaned_value = " ".join((value or "").split())
                cleaned_row[mapped_header] = cleaned_value

            if any(value for value in cleaned_row.values()):
                cleaned_rows.append(cleaned_row)

    with output_path.open("w", encoding="utf-8", newline="") as output_file:
        writer = csv.DictWriter(output_file, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(cleaned_rows)

    return CsvCleanResult(
        rows_in=rows_in,
        rows_out=len(cleaned_rows),
        output_path=output_path,
    )


def _normalize_header(header: str) -> str:
    return " ".join(header.strip().lower().replace("_", " ").split())


def _map_header(header: str) -> str:
    return HEADER_ALIASES.get(header, header.replace(" ", "_"))


def _build_output_headers(headers: list[str]) -> list[str]:
    mapped = []
    for header in headers:
        candidate = _map_header(header)
        if candidate and candidate not in mapped:
            mapped.append(candidate)

    for required in ["company", "position", "status", "applied_date", "location", "notes"]:
        if required not in mapped:
            mapped.append(required)

    return mapped

