import urllib.request
import urllib.parse
import json
import time

targets = {
    "Custard Apple": "Annona reticulata",
    "Sweet Tamarind": "Tamarind",
    "Fig": "Ficus carica",
    "Pear": "Pyrus",
    "Jamun": "Syzygium cumini",
    "Amla": "Phyllanthus emblica",
    "Peach": "Peach",
    "Orange": "Orange (fruit)",
    "Coconut": "Coconut tree",
    "Mulberry": "Morus alba"
}

def get_page_image_url(page_title):
    try:
        url = f"https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles={urllib.parse.quote(page_title)}&origin=*"
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
        with urllib.request.urlopen(req, timeout=10) as response:
            data = json.loads(response.read().decode())
            pages = data['query']['pages']
            page_id = list(pages.keys())[0]
            if page_id != "-1" and 'original' in pages[page_id]:
                return pages[page_id]['original']['source']
    except Exception as e:
        pass
    return None

results = {}
for name, title in targets.items():
    url = get_page_image_url(title)
    if url:
        results[name] = url
        print(f"Found: {name} -> {url}")
    time.sleep(2)

import re
with open("src/data/plants.js", "r") as f:
    code = f.read()

json_match = re.search(r'\[\s*\{[\s\S]*\}\s*\]', code)
if json_match:
    products = json.loads(json_match.group(0))
    for p in products:
        if p["name"] in results:
            p["image"] = results[p["name"]]
    
    new_code = "// Catalog with absolute final images\nexport const plants = " + json.dumps(products, indent=2) + ";\n"
    with open("src/data/plants.js", "w") as f:
        f.write(new_code)
    print("DONE updating plants.js")
