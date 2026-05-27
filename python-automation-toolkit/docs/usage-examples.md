# Usage Examples

## 1. File Organizer

Organize a folder by extension:

```bash
PYTHONPATH=src python3 -m automation_toolkit.cli file-organizer --source ./examples/sample-inputs/files-demo --mode extension
```

Preview organization by category without moving files:

```bash
PYTHONPATH=src python3 -m automation_toolkit.cli file-organizer --source ./examples/sample-inputs/files-demo --mode category --dry-run
```

## 2. README Starter

Generate a starter README:

```bash
PYTHONPATH=src python3 -m automation_toolkit.cli readme-starter --project-name "TaskFlow API" --stack "Java,Spring Boot,PostgreSQL" --output ./examples/sample-outputs/README.generated.md
```

## 3. CSV Cleaner

Clean a job application CSV file:

```bash
PYTHONPATH=src python3 -m automation_toolkit.cli csv-cleaner --input ./examples/sample-inputs/job-applications.csv --output ./examples/sample-outputs/job-applications.cleaned.csv
```

## Suggested Demo Flow

For portfolio demonstrations:

1. show the CLI command
2. show the sample input file
3. run the command
4. show the sample output

This makes the repository easy to review quickly.

