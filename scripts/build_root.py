"""Publish the editable homepage at the repository root with relative assets."""

from pathlib import Path
import posixpath
import re
from urllib.parse import urlsplit, urlunsplit


ROOT = Path(__file__).resolve().parents[1]


def root_url(value):
    parts = urlsplit(value)
    if parts.scheme or parts.netloc or not parts.path or parts.path.startswith("/"):
        return value
    path = posixpath.normpath(posixpath.join("preview", parts.path))
    return urlunsplit(("", "", path, parts.query, parts.fragment))


def rewrite_attribute(match):
    attribute, quote, value = match.groups()
    if attribute == "srcset":
        sources = []
        for source in value.split(","):
            url, *descriptor = source.strip().split()
            sources.append(" ".join([root_url(url), *descriptor]))
        value = ", ".join(sources)
    else:
        value = root_url(value)
    return f"{attribute}={quote}{value}{quote}"


def build():
    source = (ROOT / "preview" / "index.html").read_text()
    output = re.sub(r'\b(src|href|srcset)=([\"\'])(.*?)\2', rewrite_attribute, source)
    (ROOT / "index.html").write_text(output)
    print("Built the homepage at index.html; no redirect to /preview/.")


if __name__ == "__main__":
    build()
