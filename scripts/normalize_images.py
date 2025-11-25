#!/usr/bin/env python3
"""Normalize image filenames (to kebab-case) and update references in templates and README.

Usage:
    python scripts/normalize_images.py

This script will:
 - Scan `static/images/` for files
 - Compute normalized filenames (lowercase, spaces -> -, remove special chars)
 - Rename files (safely, avoiding collisions)
 - Update all occurrences of the old filenames inside `templates/` and `README.md`
 - Write a JSON mapping to `scripts/image_rename_map.json`

Be careful: this will modify files in-place. A mapping file is written so you can revert manually.
"""

from pathlib import Path
import re
import unicodedata
import json


def slugify(name: str) -> str:
    # Remove accents
    name = unicodedata.normalize('NFKD', name).encode('ascii', 'ignore').decode('ascii')
    name = name.lower()
    # replace spaces and underscores with hyphens
    name = re.sub(r'[\s_]+', '-', name)
    # remove any character that is not alphanumeric or hyphen or dot
    name = re.sub(r'[^a-z0-9\-\.]', '', name)
    # collapse multiple hyphens
    name = re.sub(r'-{2,}', '-', name)
    # remove leading/trailing hyphens
    name = name.strip('-')
    return name


def normalize_images(images_dir: Path, templates_dir: Path, readme_file: Path):
    mapping = {}
    seen = set()

    images = [p for p in images_dir.iterdir() if p.is_file()]

    for img in images:
        orig_name = img.name
        stem = img.stem
        suffix = img.suffix.lower()  # keep extension in lower-case
        new_stem = slugify(stem)
        if not new_stem:
            new_stem = 'image'

        candidate = f"{new_stem}{suffix}"
        i = 1
        while candidate in seen or (images_dir / candidate).exists() and (images_dir / candidate).name != orig_name:
            candidate = f"{new_stem}-{i}{suffix}"
            i += 1

        # perform rename
        new_path = images_dir / candidate
        if orig_name != candidate:
            print(f"Renaming: {orig_name} -> {candidate}")
            img.rename(new_path)
        else:
            print(f"Keeping: {orig_name}")

        mapping[orig_name] = candidate
        seen.add(candidate)

    # Update templates
    html_files = list(templates_dir.rglob('*.html'))
    for hf in html_files:
        text = hf.read_text(encoding='utf-8')
        new_text = text
        for old, new in mapping.items():
            if old in new_text:
                new_text = new_text.replace(old, new)
        if new_text != text:
            print(f"Updating references in {hf.relative_to(templates_dir.parent)}")
            hf.write_text(new_text, encoding='utf-8')

    # Update README
    if readme_file.exists():
        text = readme_file.read_text(encoding='utf-8')
        new_text = text
        for old, new in mapping.items():
            if old in new_text:
                new_text = new_text.replace(old, new)
        if new_text != text:
            print(f"Updating references in {readme_file}")
            readme_file.write_text(new_text, encoding='utf-8')

    # Save mapping
    map_file = Path(__file__).parent / 'image_rename_map.json'
    map_file.write_text(json.dumps(mapping, indent=2, ensure_ascii=False), encoding='utf-8')
    print(f"Wrote mapping to {map_file}")


if __name__ == '__main__':
    repo_root = Path(__file__).resolve().parents[1]
    images_dir = repo_root / 'static' / 'images'
    templates_dir = repo_root / 'templates'
    readme = repo_root / 'README.md'

    if not images_dir.exists():
        print(f"Images directory not found: {images_dir}")
        raise SystemExit(1)

    normalize_images(images_dir, templates_dir, readme)
