# Python Automation Toolkit

## Overview

`python-automation-toolkit` is a recruiter-friendly proof project that shows how I use Python for practical automation, CLI tooling, and workflow support.

The goal of this repository is not to replace my main Java and Spring Boot track.

The goal is to show that I can also build small, useful tools with clean structure, readable commands, and clear documentation.

## Why This Project Exists

Python fits into my portfolio as a complementary engineering skill for:

- automation
- file processing
- developer tooling
- productivity workflows
- lightweight backend experimentation

This makes the overall portfolio stronger without diluting the main fullstack story.

## Current Scope

V1 currently includes three real utilities:

- `file-organizer`
- `readme-starter`
- `job-application-csv-cleaner`

These commands help with file organization, portfolio-ready documentation setup, and lightweight data cleanup for job tracking workflows.

## Tech Stack

- Python 3.9+
- `argparse`
- `pathlib`
- `shutil`
- `logging`
- `unittest`

## Features

- CLI entry point with subcommands
- file organization by extension
- file organization by category
- README template generation
- CSV cleanup and header normalization
- dry-run support
- hidden file skipping
- summary output for moved and skipped files

## Example Commands

```bash
python3 -m automation_toolkit.cli file-organizer --source ./downloads --mode extension
python3 -m automation_toolkit.cli file-organizer --source ./downloads --mode category --dry-run
python3 -m automation_toolkit.cli readme-starter --project-name "TaskFlow API" --stack "Java,Spring Boot,PostgreSQL"
python3 -m automation_toolkit.cli csv-cleaner --input ./applications.csv --output ./applications-clean.csv
```

## Project Structure

```text
python-automation-toolkit
│
├── README.md
├── pyproject.toml
├── docs
├── examples
├── src
│   └── automation_toolkit
│       ├── cli.py
│       ├── common
│       ├── csv_cleaner
│       ├── file_organizer
│       └── readme_starter
└── tests
```

## Testing

```bash
python3 -m unittest discover -s tests
```

## Demo Assets

- sample inputs live in `examples/sample-inputs`
- sample outputs live in `examples/sample-outputs`
- command walkthroughs live in `docs/usage-examples.md`

## What I Learned

- Keeping small utility projects structured makes them much more convincing in a portfolio
- Python is a strong complement for workflow automation around larger fullstack systems
- Even simple scripts benefit from clear CLI boundaries and test coverage

## Next Steps

- improve CLI output formatting
- add more examples and screenshots
- add packaged install and nicer terminal output

## Author

Bulent Ruhat Karatas
