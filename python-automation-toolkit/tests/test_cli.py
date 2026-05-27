from __future__ import annotations

import contextlib
import io
import tempfile
import unittest
from pathlib import Path

from automation_toolkit.cli import main


class CliTests(unittest.TestCase):
    def test_file_organizer_command_outputs_summary(self) -> None:
        with tempfile.TemporaryDirectory() as temp_dir:
            root = Path(temp_dir)
            (root / "report.pdf").write_text("demo", encoding="utf-8")

            buffer = io.StringIO()
            with contextlib.redirect_stdout(buffer):
                exit_code = main(
                    [
                        "file-organizer",
                        "--source",
                        str(root),
                        "--mode",
                        "extension",
                    ]
                )

            output = buffer.getvalue()
            self.assertEqual(exit_code, 0)
            self.assertIn("Mode=extension", output)
            self.assertTrue((root / "pdf" / "report.pdf").exists())

    def test_readme_starter_command_generates_file(self) -> None:
        with tempfile.TemporaryDirectory() as temp_dir:
            root = Path(temp_dir)
            output_path = root / "README.generated.md"

            buffer = io.StringIO()
            with contextlib.redirect_stdout(buffer):
                exit_code = main(
                    [
                        "readme-starter",
                        "--project-name",
                        "TaskFlow",
                        "--stack",
                        "Java,Spring Boot,PostgreSQL",
                        "--output",
                        str(output_path),
                    ]
                )

            output = buffer.getvalue()
            self.assertEqual(exit_code, 0)
            self.assertIn("Generated README template", output)
            self.assertTrue(output_path.exists())
            self.assertIn("# TaskFlow", output_path.read_text(encoding="utf-8"))

    def test_csv_cleaner_command_generates_output(self) -> None:
        with tempfile.TemporaryDirectory() as temp_dir:
            root = Path(temp_dir)
            input_path = root / "applications.csv"
            output_path = root / "applications-clean.csv"
            input_path.write_text(
                "Company Name,Position Title,Application Status\nOpenAI,Backend Engineer,Applied\n",
                encoding="utf-8",
            )

            buffer = io.StringIO()
            with contextlib.redirect_stdout(buffer):
                exit_code = main(
                    [
                        "csv-cleaner",
                        "--input",
                        str(input_path),
                        "--output",
                        str(output_path),
                    ]
                )

            output = buffer.getvalue()
            self.assertEqual(exit_code, 0)
            self.assertIn("Cleaned CSV", output)
            self.assertTrue(output_path.exists())


if __name__ == "__main__":
    unittest.main()
