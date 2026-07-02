import urllib.request
import urllib.parse
import json
import time

targets = {
    "Peach": "Peach tree",
    "Orange": "Orange tree",
    "Coconut": "Coconut palm",
    "Fig": "Ficus carica tree",
    "Pear": "Pyrus communis tree",
    "Mulberry": "Morus alba tree",
    "Custard Apple": "Annona squamosa tree",
    "Sweet Tamarind": "Tamarind tree",
    "Jamun": "Syzygium cumini tree",
    "Amla": "Phyllanthus emblica tree"
}

def search_commons(query):
    try:
        url = f"https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch={urllib.parse.quote(query)}&utf8=&format=json"
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=10) as response:
            data = json.loads(response.read().decode())
            search_results = data['query']['search']
            for res in search_results:
                title = res['title']
                if title.lower().endswith(('.jpg', '.jpeg')) and 'illustration' not in title.lower():
                    return title.replace('File:', '')
    except Exception as e:
        print(f"Error searching {query}: {e}")
    return None

results = {}
for name, query in targets.items():
    title = search_commons(query)
    if title:
        url = f"https://commons.wikimedia.org/wiki/Special:FilePath/{urllib.parse.quote(title)}?width=800"
        results[name] = url
        print(f"{name}: {url}")
    time.sleep(1)

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
