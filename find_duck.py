import urllib.request
import re
import time

queries = {
    "Custard Apple": "site:commons.wikimedia.org/wiki/File Annona reticulata tree",
    "Sweet Tamarind": "site:commons.wikimedia.org/wiki/File Tamarindus indica tree",
    "Fig": "site:commons.wikimedia.org/wiki/File Ficus carica tree",
    "Pear": "site:commons.wikimedia.org/wiki/File Pyrus communis tree",
    "Jamun": "site:commons.wikimedia.org/wiki/File Syzygium cumini tree",
    "Amla": "site:commons.wikimedia.org/wiki/File Phyllanthus emblica tree",
    "Peach": "site:commons.wikimedia.org/wiki/File Prunus persica tree",
    "Orange": "site:commons.wikimedia.org/wiki/File Citrus sinensis tree",
    "Coconut": "site:commons.wikimedia.org/wiki/File Cocos nucifera tree",
    "Mulberry": "site:commons.wikimedia.org/wiki/File Morus alba tree"
}

def search(query):
    try:
        url = "https://html.duckduckgo.com/html/?q=" + urllib.parse.quote(query)
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=10) as response:
            html = response.read().decode()
            links = re.findall(r'href="([^"]+commons\.wikimedia\.org/wiki/File:[^"]+)"', html)
            if links:
                # Need to convert wikimedia page link to raw image link.
                # Actually, if we have the File name, we can use the Wikipedia API to get the original source without searching!
                return links[0]
    except Exception as e:
        print(f"Error {query}: {e}")
    return None

for name, q in queries.items():
    link = search(q)
    print(f"{name}: {link}")
    time.sleep(1)

