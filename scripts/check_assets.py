"""Check local HTML/CSS references before publishing."""
from html.parser import HTMLParser
from pathlib import Path
import re
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parent.parent


class References(HTMLParser):
    def __init__(self):
        super().__init__()
        self.urls = []
        self.ids = set()

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if "id" in attrs:
            self.ids.add(attrs["id"])
        for attr in ("src", "href"):
            if attrs.get(attr):
                self.urls.append(attrs[attr])


def check(root=ROOT):
    page = References()
    page.feed((root / "index.html").read_text(encoding="utf-8"))
    css_urls = re.findall(r"url\(['\"]?([^)'\"]+)", (root / "style.css").read_text())
    for url in page.urls + css_urls:
        parts = urlsplit(url)
        if parts.scheme or parts.netloc:
            continue
        if parts.path:
            target = (root / unquote(parts.path)).resolve()
            if not target.is_relative_to(root.resolve()) or not target.is_file():
                raise SystemExit(f"Missing or unsafe local asset: {url}")
        elif parts.fragment and unquote(parts.fragment) not in page.ids:
            raise SystemExit(f"Missing section: {url}")
    print(f"Assets OK: {len(page.urls) + len(css_urls)} references checked")


if __name__ == "__main__":
    check()
