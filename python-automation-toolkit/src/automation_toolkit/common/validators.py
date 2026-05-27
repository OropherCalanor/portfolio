"""Validation helpers used by toolkit commands."""

from __future__ import annotations

from pathlib import Path


def ensure_directory(path: Path) -> None:
    if not path.exists():
        raise FileNotFoundError(f"Directory does not exist: {path}")
    if not path.is_dir():
        raise NotADirectoryError(f"Path is not a directory: {path}")

