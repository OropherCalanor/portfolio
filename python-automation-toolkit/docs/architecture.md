# Architecture

The first version of this repository uses a simple structure:

- `cli.py` handles command parsing
- `common/` contains shared validation helpers
- `file_organizer/` contains file sorting logic
- `readme_starter/` contains README template generation logic
- `csv_cleaner/` contains CSV normalization logic

The design goal is clarity over cleverness.

Each utility should remain easy to review independently.
