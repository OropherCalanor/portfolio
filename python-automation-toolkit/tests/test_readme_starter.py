from __future__ import annotations

import tempfile
import unittest
from pathlib import Path

from automation_toolkit.readme_starter.service import generate_readme


class ReadmeStarterTests(unittest.TestCase):
    def test_generate_readme_writes_expected_sections(self) -> None:
        with tempfile.TemporaryDirectory() as temp_dir:
            output_path = Path(temp_dir) / "README.generated.md"

            generate_readme(
                project_name="Portfolio API",
                stack=["Java", "Spring Boot", "PostgreSQL"],
                output_path=output_path,
            )

            content = output_path.read_text(encoding="utf-8")
            self.assertIn("# Portfolio API", content)
            self.assertIn("## Tech Stack", content)
            self.assertIn("- Java", content)
            self.assertIn("## Future Improvements", content)


if __name__ == "__main__":
    unittest.main()
