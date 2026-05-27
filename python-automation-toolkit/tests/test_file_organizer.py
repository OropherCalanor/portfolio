from __future__ import annotations

import tempfile
import unittest
from pathlib import Path

from automation_toolkit.file_organizer.service import organize_files


class FileOrganizerTests(unittest.TestCase):
    def test_organizes_files_by_extension(self) -> None:
        with tempfile.TemporaryDirectory() as temp_dir:
            root = Path(temp_dir)
            (root / "resume.pdf").write_text("demo", encoding="utf-8")
            (root / "notes.txt").write_text("demo", encoding="utf-8")

            result = organize_files(root, mode="extension")

            self.assertEqual(result.moved_count, 2)
            self.assertTrue((root / "pdf" / "resume.pdf").exists())
            self.assertTrue((root / "txt" / "notes.txt").exists())

    def test_organizes_files_by_category(self) -> None:
        with tempfile.TemporaryDirectory() as temp_dir:
            root = Path(temp_dir)
            (root / "avatar.png").write_text("demo", encoding="utf-8")
            (root / "dataset.csv").write_text("demo", encoding="utf-8")

            result = organize_files(root, mode="category")

            self.assertEqual(result.moved_count, 2)
            self.assertTrue((root / "images" / "avatar.png").exists())
            self.assertTrue((root / "spreadsheets" / "dataset.csv").exists())

    def test_dry_run_does_not_move_files(self) -> None:
        with tempfile.TemporaryDirectory() as temp_dir:
            root = Path(temp_dir)
            original_file = root / "script.py"
            original_file.write_text("print('hello')", encoding="utf-8")

            result = organize_files(root, mode="category", dry_run=True)

            self.assertEqual(result.moved_count, 1)
            self.assertTrue(original_file.exists())
            self.assertFalse((root / "code" / "script.py").exists())


if __name__ == "__main__":
    unittest.main()

