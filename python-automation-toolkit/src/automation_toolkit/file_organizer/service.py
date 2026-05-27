"""File organization logic."""

from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
import shutil

from automation_toolkit.common.validators import ensure_directory

EXTENSION_FALLBACK = "no-extension"

CATEGORY_MAP = {
    "images": {".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg"},
    "documents": {".pdf", ".doc", ".docx", ".txt", ".md"},
    "spreadsheets": {".csv", ".xlsx", ".xls"},
    "archives": {".zip", ".rar", ".tar", ".gz"},
    "code": {".py", ".java", ".ts", ".tsx", ".js", ".json", ".sql"},
}


@dataclass
class OrganizeResult:
    mode: str
    moved_count: int
    skipped_count: int
    dry_run: bool


def organize_files(source: Path, mode: str = "extension", dry_run: bool = False) -> OrganizeResult:
    ensure_directory(source)

    moved_count = 0
    skipped_count = 0

    for item in source.iterdir():
        if item.name.startswith("."):
            skipped_count += 1
            continue

        if item.is_dir():
            skipped_count += 1
            continue

        destination_folder_name = _resolve_destination_name(item, mode)
        destination_dir = source / destination_folder_name
        destination_path = destination_dir / item.name

        if destination_path == item:
            skipped_count += 1
            continue

        moved_count += 1

        if dry_run:
            continue

        destination_dir.mkdir(exist_ok=True)
        shutil.move(str(item), str(destination_path))

    return OrganizeResult(
        mode=mode,
        moved_count=moved_count,
        skipped_count=skipped_count,
        dry_run=dry_run,
    )


def _resolve_destination_name(item: Path, mode: str) -> str:
    suffix = item.suffix.lower()

    if mode == "extension":
        return suffix[1:] if suffix else EXTENSION_FALLBACK

    for category, extensions in CATEGORY_MAP.items():
        if suffix in extensions:
            return category

    return "other"

