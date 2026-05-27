"""Command-line entry point for the automation toolkit."""

from __future__ import annotations

import argparse
from pathlib import Path

from automation_toolkit.csv_cleaner.service import clean_job_application_csv
from automation_toolkit.file_organizer.service import organize_files
from automation_toolkit.readme_starter.service import generate_readme


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        prog="automation-toolkit",
        description="Practical Python automation utilities for portfolio proof work.",
    )
    subparsers = parser.add_subparsers(dest="command", required=True)

    organizer_parser = subparsers.add_parser(
        "file-organizer",
        help="Organize files in a directory by extension or category.",
    )
    organizer_parser.add_argument("--source", required=True, help="Directory to organize.")
    organizer_parser.add_argument(
        "--mode",
        choices=("extension", "category"),
        default="extension",
        help="Organization strategy.",
    )
    organizer_parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Preview changes without moving files.",
    )

    readme_parser = subparsers.add_parser(
        "readme-starter",
        help="Generate a README starter template.",
    )
    readme_parser.add_argument("--project-name", required=True, help="Project name for the README.")
    readme_parser.add_argument(
        "--stack",
        default="",
        help="Comma-separated stack items to include.",
    )
    readme_parser.add_argument(
        "--output",
        default="README.generated.md",
        help="Output file path for the generated README.",
    )

    csv_parser = subparsers.add_parser(
        "csv-cleaner",
        help="Clean and normalize a job-application CSV file.",
    )
    csv_parser.add_argument("--input", required=True, help="Input CSV file path.")
    csv_parser.add_argument("--output", required=True, help="Output CSV file path.")

    return parser


def main(argv: list[str] | None = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)

    if args.command == "file-organizer":
        result = organize_files(
            source=Path(args.source),
            mode=args.mode,
            dry_run=args.dry_run,
        )
        print(
            f"Mode={result.mode} moved={result.moved_count} skipped={result.skipped_count} dry_run={result.dry_run}"
        )
        return 0

    if args.command == "readme-starter":
        stack_items = [item.strip() for item in args.stack.split(",") if item.strip()]
        output_path = Path(args.output)
        generate_readme(
            project_name=args.project_name,
            stack=stack_items,
            output_path=output_path,
        )
        print(f"Generated README template at {output_path}")
        return 0

    if args.command == "csv-cleaner":
        result = clean_job_application_csv(
            input_path=Path(args.input),
            output_path=Path(args.output),
        )
        print(
            f"Cleaned CSV rows_in={result.rows_in} rows_out={result.rows_out} output={result.output_path}"
        )
        return 0

    parser.error("Unknown command.")
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
