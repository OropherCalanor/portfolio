"""README starter generation logic."""

from __future__ import annotations

from pathlib import Path


def generate_readme(project_name: str, stack: list[str], output_path: Path) -> Path:
    content = _build_content(project_name=project_name, stack=stack)
    output_path.write_text(content, encoding="utf-8")
    return output_path


def _build_content(project_name: str, stack: list[str]) -> str:
    stack_lines = "\n".join(f"- {item}" for item in stack) if stack else "- Add stack items here"

    return f"""# {project_name}

## Overview

Add a short summary of the project here.

## Tech Stack

{stack_lines}

## Features

- Add key feature
- Add key feature
- Add key feature

## Installation

```bash
# Add installation steps here
```

## Environment Variables

- Add required variables here

## What I Learned

- Add learning points here

## Future Improvements

- Add next steps here
"""
