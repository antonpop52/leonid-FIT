"""Copy only public website files into the deployment artifact."""
from pathlib import Path
import shutil
from check_assets import check

ROOT = Path(__file__).resolve().parent.parent
DIST = ROOT / "dist"
if DIST.exists():
    shutil.rmtree(DIST)
DIST.mkdir()
for name in ("index.html", "style.css", "script.js"):
    shutil.copy2(ROOT / name, DIST / name)
(DIST / "images").mkdir()
for image in (ROOT / "images").iterdir():
    if image.suffix.lower() in {".jpg", ".jpeg", ".png", ".webp", ".svg"}:
        shutil.copy2(image, DIST / "images" / image.name)
(DIST / ".nojekyll").touch()
check(DIST)
print("Build OK: public files prepared in dist/")
