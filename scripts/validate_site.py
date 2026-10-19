"""Check page structure, project-relative links, assets, and optional served files."""

import argparse
from collections import Counter
from concurrent.futures import ThreadPoolExecutor
from html.parser import HTMLParser
import json
from pathlib import Path
import re
from urllib.parse import unquote, urljoin, urlsplit
from urllib.request import urlopen


ROOT = Path(__file__).resolve().parents[1]
DATA = json.loads((ROOT / "preview/data/services.json").read_text())
PAGES = [ROOT / "index.html"] + [
    ROOT / service["slug"] / "index.html" for service in DATA["services"]
]


class Page(HTMLParser):
    def __init__(self, path):
        super().__init__()
        self.path = path
        self.ids = []
        self.references = []
        self.h1 = 0
        self.descriptions = 0
        self.titles = 0
        self.feed(path.read_text())

    def handle_starttag(self, tag, pairs):
        attrs = dict(pairs)
        self.h1 += tag == "h1"
        self.titles += tag == "title"
        self.descriptions += tag == "meta" and attrs.get("name") == "description"
        if "id" in attrs:
            self.ids.append(attrs["id"])
        if tag == "img":
            assert "alt" in attrs, f"Missing image alt: {self.path}"
            assert attrs.get("width") and attrs.get("height"), f"Missing image dimensions: {self.path}"
        for name in ("href", "src"):
            if attrs.get(name):
                self.references.append(attrs[name])
        for image in attrs.get("srcset", "").split(","):
            if image.strip():
                self.references.append(image.strip().split()[0])


def target(origin, value):
    parts = urlsplit(value)
    if parts.scheme or parts.netloc:
        return None, ""
    assert not parts.path.startswith("/"), f"Root-relative URL breaks project hosting: {value}"
    path = (origin.parent / unquote(parts.path)).resolve() if parts.path else origin
    if path.is_dir():
        path /= "index.html"
    path.relative_to(ROOT)
    assert path.is_file(), f"Missing destination: {origin.relative_to(ROOT)} -> {value}"
    return path, unquote(parts.fragment)


def validate(base=None):
    cache = {path: Page(path) for path in PAGES}
    assets = set(PAGES)
    for path, page in list(cache.items()):
        assert page.h1 == page.titles == page.descriptions == 1, f"Heading or metadata issue: {path}"
        assert all(count == 1 for count in Counter(page.ids).values()), f"Duplicate IDs: {path}"
        for raw in re.findall(r'<script type="application/ld\+json">(.*?)</script>', path.read_text(), re.S):
            json.loads(raw)
        for reference in page.references:
            destination, fragment = target(path, reference)
            if not destination:
                continue
            assets.add(destination)
            if fragment and destination.suffix == ".html":
                if destination not in cache:
                    cache[destination] = Page(destination)
                assert fragment in cache[destination].ids, f"Missing anchor: {reference} in {path}"
    for stylesheet in list(assets):
        if stylesheet.suffix != ".css":
            continue
        for value in re.findall(r'url\(([^)]+)\)', stylesheet.read_text()):
            destination, _ = target(stylesheet, value.strip().strip('\"\''))
            if destination:
                assets.add(destination)
    if base:
        def request(path):
            relative = path.relative_to(ROOT).as_posix()
            if relative.endswith("index.html"):
                relative = relative[:-len("index.html")]
            with urlopen(urljoin(base.rstrip("/") + "/", relative), timeout=30) as response:
                assert response.status == 200 and response.read() == path.read_bytes(), f"Served file differs: {relative}"
        with ThreadPoolExecutor(max_workers=4) as pool:
            list(pool.map(request, assets))
    print(f"Validated {len(PAGES)} pages: one H1, metadata, JSON-LD, unique IDs, internal links, image dimensions, and {len(assets)} local files.")
    if base:
        print(f"All {len(assets)} HTTP responses match local files at {base}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--base", help="Optional local or published site URL")
    validate(parser.parse_args().base)
