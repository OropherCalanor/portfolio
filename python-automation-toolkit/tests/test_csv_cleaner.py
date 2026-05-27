from __future__ import annotations

import csv
import tempfile
import unittest
from pathlib import Path

from automation_toolkit.csv_cleaner.service import clean_job_application_csv


class CsvCleanerTests(unittest.TestCase):
    def test_cleaner_normalizes_headers_and_skips_empty_rows(self) -> None:
        with tempfile.TemporaryDirectory() as temp_dir:
            input_path = Path(temp_dir) / "applications.csv"
            output_path = Path(temp_dir) / "cleaned.csv"

            with input_path.open("w", encoding="utf-8", newline="") as csv_file:
                writer = csv.writer(csv_file)
                writer.writerow(["Company Name", "Position Title", "Application Status", "Date Applied", "Notes"])
                writer.writerow([" OpenAI ", " Backend Engineer ", " Applied ", " 2026-05-27 ", " strong fit "])
                writer.writerow(["", "", "", "", ""])

            result = clean_job_application_csv(input_path, output_path)

            self.assertEqual(result.rows_in, 2)
            self.assertEqual(result.rows_out, 1)

            with output_path.open("r", encoding="utf-8", newline="") as csv_file:
                reader = csv.DictReader(csv_file)
                rows = list(reader)

            self.assertEqual(reader.fieldnames, ["company", "position", "status", "applied_date", "notes", "location"])
            self.assertEqual(rows[0]["company"], "OpenAI")
            self.assertEqual(rows[0]["position"], "Backend Engineer")
            self.assertEqual(rows[0]["status"], "Applied")
            self.assertEqual(rows[0]["applied_date"], "2026-05-27")
            self.assertEqual(rows[0]["notes"], "strong fit")


if __name__ == "__main__":
    unittest.main()
