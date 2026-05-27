# PROJECT BLUEPRINT: PYTHON AUTOMATION TOOLKIT

## Project Name

`python-automation-toolkit`

## Purpose

This project is planned as a practical Python proof repository inside the portfolio ecosystem.

Its goal is not to compete with the main Java and Spring Boot backend track.

Its goal is to show that I can also use Python effectively for:

- automation
- CLI tooling
- file processing
- developer workflow helpers
- small productivity scripts

This makes Python a complementary engineering skill in the portfolio rather than a random side direction.

## What This Project Should Prove

- Python fundamentals in a professional repository
- script and utility design
- command-line interface structure
- clean folder organization
- documentation quality
- practical problem solving
- reusable tooling mindset

## Position In The Portfolio

This project belongs to the `Proof Projects` layer.

It should signal:

- cross-stack adaptability
- automation mindset
- comfort with lightweight tooling
- ability to build useful internal tools, not only web apps

## Recommended Scope For V1

V1 should stay small, clear, and useful.

The first version should include `3` real utilities:

1. `readme-starter`
   - generates a clean README template from structured input

2. `file-organizer`
   - organizes files in a target folder by extension or category

3. `job-application-csv-cleaner`
   - cleans and normalizes application tracking CSV data

These three scripts together show:

- text/file automation
- batch processing
- practical CLI use
- productivity-oriented engineering

## Suggested Tech Stack

- Python 3.12+
- `argparse` for CLI in V1
- `pathlib`
- `csv`
- `json`
- `logging`
- `pytest`
- optional later:
  - `typer`
  - `pydantic`
  - `rich`

## Repository Structure

```text
python-automation-toolkit
│
├── README.md
├── .gitignore
├── pyproject.toml
├── .env.example
├── requirements.txt
├── requirements-dev.txt
├── docs
│   ├── architecture.md
│   ├── usage-examples.md
│   └── case-study.md
├── examples
│   ├── sample-inputs
│   └── sample-outputs
├── screenshots
├── src
│   └── automation_toolkit
│       ├── __init__.py
│       ├── cli.py
│       ├── common
│       │   ├── __init__.py
│       │   ├── io_utils.py
│       │   ├── validators.py
│       │   └── logger.py
│       ├── readme_starter
│       │   ├── __init__.py
│       │   └── service.py
│       ├── file_organizer
│       │   ├── __init__.py
│       │   └── service.py
│       └── csv_cleaner
│           ├── __init__.py
│           └── service.py
└── tests
    ├── test_cli.py
    ├── test_file_organizer.py
    ├── test_readme_starter.py
    └── test_csv_cleaner.py
```

## Architecture Direction

Even though this is a Python utility repo, it should still feel intentional and professional.

Recommended structure:

- `cli.py`
  - command routing
- `common/`
  - shared helpers and validation
- feature folders
  - each automation utility has its own logic
- `tests/`
  - direct unit coverage for each utility

This keeps the repository easy to scan and easy to extend.

## Command Design

Suggested commands:

```bash
python -m automation_toolkit.cli readme-starter --project-name "My API"
python -m automation_toolkit.cli file-organizer --source ./downloads --mode extension
python -m automation_toolkit.cli csv-cleaner --input ./applications.csv --output ./cleaned.csv
```

## V1 Feature Breakdown

### 1. README Starter

Purpose:
- create a standard README skeleton from CLI input

Should support:
- project name
- overview
- stack
- features
- installation section
- future improvements section

### 2. File Organizer

Purpose:
- reorganize a folder into categorized subfolders

Should support:
- organize by extension
- dry-run mode
- summary output
- skip hidden files

### 3. Job Application CSV Cleaner

Purpose:
- normalize inconsistent application tracking CSV files

Should support:
- trim whitespace
- normalize headers
- standardize dates if possible
- remove empty rows
- report row counts

## Testing Expectations

V1 should include:

- unit tests for each utility
- at least one CLI test
- sample input/output data for reproducible demos

## README Expectations

The repository README should include:

- Overview
- Why Python fits in the portfolio
- Features
- CLI commands
- Example usage
- Example outputs
- Project structure
- Installation
- Testing
- What I Learned
- Future Improvements

## Case Study Angle

This project should be presented on the portfolio website as:

`Python proof project for automation and developer tooling`

The case study should emphasize:

- Python was added intentionally
- the repo solves real workflow problems
- it complements the main Java/React ecosystem
- it proves adaptability without diluting the main brand

## Recommended Development Order

1. Scaffold project structure
2. Add `pyproject.toml` and environment setup
3. Implement `file-organizer`
4. Implement `readme-starter`
5. Implement `job-application-csv-cleaner`
6. Add tests
7. Add examples and screenshots
8. Polish README and case study

## V2 Ideas

- migrate CLI to `typer`
- add colored terminal output with `rich`
- add config-file driven automation
- add batch processing pipelines
- add a small release workflow

## Final Recommendation

This should be the first Python repository in the portfolio because it is:

- practical
- easy to explain
- easy to demo
- recruiter-friendly
- useful in real life

It is a better first Python project than a random Flask clone or an unfocused script dump.
