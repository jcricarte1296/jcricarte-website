"""Build the homepage and Services pages with shared navigation and relative assets."""

from pathlib import Path
from html import escape
import json
import posixpath
import re
from urllib.parse import quote, urlsplit, urlunsplit


ROOT = Path(__file__).resolve().parents[1]


def root_url(value):
    parts = urlsplit(value)
    if parts.scheme or parts.netloc or not parts.path or parts.path.startswith("/"):
        return value
    path = posixpath.normpath(posixpath.join("preview", parts.path))
    if parts.path.endswith("/"):
        path += "/"
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


def page_url(value, route):
    parts = urlsplit(root_url(value))
    if parts.scheme or parts.netloc or not parts.path or parts.path.startswith("/"):
        return value
    path = posixpath.relpath(parts.path, route)
    if parts.path.endswith("/"):
        path += "/"
    return urlunsplit(("", "", path, parts.query, parts.fragment))


def rewrite_page_attribute(match, route):
    attribute, delimiter, value = match.groups()
    if attribute == "srcset":
        sources = []
        for source in value.split(","):
            url, *descriptor = source.strip().split()
            sources.append(" ".join([page_url(url, route), *descriptor]))
        value = ", ".join(sources)
    else:
        value = page_url(value, route)
    return f"{attribute}={delimiter}{value}{delimiter}"


def shared_component(source, tag, class_name, route):
    component = re.search(rf'<{tag} class="{class_name}".*?</{tag}>', source, re.S).group()
    for anchor in ("main", "about", "work", "contact", "resources", "privacy"):
        destination = "../" if anchor == "main" else "../#" + anchor
        component = component.replace(f'href="#{anchor}"', f'href="{destination}"')
    component = component.replace(f'href="../{route}/"', f'href="../{route}/" aria-current="page"')
    return component


def capabilities(service):
    return "".join(f"<li>{escape(item)}</li>" for item in service["capabilities"])


def service_card(service):
    return f'''<article class="jc-services-service-card" aria-labelledby="jc-service-{escape(service['slug'])}">
<div class="jc-services-service-summary"><div class="jc-services-service-name"><img src="{escape(service['icon'])}" width="64" height="64" alt="" loading="lazy" decoding="async"><span>{escape(service['name'])}</span></div><h3 id="jc-service-{escape(service['slug'])}">{escape(service['headline'])}</h3><p>{escape(service['description'])}</p></div>
<div class="jc-services-service-details"><ul class="jc-services-capabilities">{capabilities(service)}</ul><a class="jc-text-link" href="../{escape(service['slug'])}/">{escape(service['cta'])} <span aria-hidden="true">→</span></a></div></article>'''


def render_page(source, route, title, description, content, label):
    header = shared_component(source, "header", "jc-header", route)
    footer = shared_component(source, "footer", "jc-footer", route)
    website = "https://jcricarte1296.github.io/jcricarte-website/"
    breadcrumbs = [{"@type": "ListItem", "position": 1, "name": "Home", "item": website}]
    breadcrumbs.append({"@type": "ListItem", "position": 2, "name": "Services", "item": website + "services/"})
    if route != "services":
        breadcrumbs.append({"@type": "ListItem", "position": 3, "name": label, "item": website + route + "/"})
    schema = json.dumps({"@context": "https://schema.org", "@graph": [
        {"@type": "WebPage", "@id": website + route + "/#webpage", "url": website + route + "/", "name": title, "description": description},
        {"@type": "BreadcrumbList", "@id": website + route + "/#breadcrumb", "itemListElement": breadcrumbs}
    ]}, ensure_ascii=False).replace("</", "<\\/")
    document = f'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{escape(title)}</title><meta name="description" content="{escape(description, quote=True)}">
<link rel="stylesheet" href="navbar.css?v=services-nav-2"><link rel="stylesheet" href="footer.css?v=contact-offset-2"><link rel="stylesheet" href="home.css?v=hero-reference-5"><link rel="stylesheet" href="blueprint.css?v=visibility-2"><link rel="stylesheet" href="services.css?v=hub-1"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"><script src="navbar.js" defer></script><script type="application/ld+json">{schema}</script></head>
<body><a class="jc-skip" href="#main">Skip to content</a>{header}<main id="main" class="jc-home jc-services-page">{content}</main>{footer}</body></html>
'''
    document = re.sub(r'\b(src|href|srcset)=([\"\'])(.*?)\2', lambda match: rewrite_page_attribute(match, route), document)
    assert "{{" not in document, f"Unresolved template in {route}"
    output = ROOT / route / "index.html"
    output.parent.mkdir(exist_ok=True)
    output.write_text(document)


def build_services(source):
    data = json.loads((ROOT / "preview" / "data" / "services.json").read_text())
    services = data["services"]
    lookup = {service["slug"]: service for service in services}
    hub = (ROOT / "preview" / "pages" / "services.html").read_text()
    hub = hub.replace("{{service_cards}}", "\n".join(service_card(service) for service in services))
    render_page(source, "services", data["hub"]["title"], data["hub"]["description"], hub, "Services")
    template = (ROOT / "preview" / "pages" / "service.html").read_text()
    for service in services:
        related = "".join(f'''<article><h3>{escape(lookup[slug]['name'])}</h3><p>{escape(lookup[slug]['fit'])}</p><a class="jc-text-link" href="../{escape(slug)}/">{escape(lookup[slug]['cta'])} <span aria-hidden="true">→</span></a></article>''' for slug in service["related"])
        values = {key: escape(service[key]) for key in ("name", "hero_title", "headline", "description", "fit", "connection", "icon")}
        values.update({"capabilities": capabilities(service), "related_cards": related, "inquiry_subject": quote("Project inquiry - " + service["name"])})
        content = template
        for key, value in values.items():
            content = content.replace("{{" + key + "}}", value)
        render_page(source, service["slug"], service["name"] + " Services | JC Ricarte", service["meta_description"], content, service["name"])
    print("Built /services/ and five starter service pages with shared header and footer.")


def build():
    source = (ROOT / "preview" / "index.html").read_text()
    output = re.sub(r'\b(src|href|srcset)=([\"\'])(.*?)\2', rewrite_attribute, source)
    (ROOT / "index.html").write_text(output)
    print("Built the homepage at index.html; no redirect to /preview/.")
    build_services(source)


if __name__ == "__main__":
    build()
