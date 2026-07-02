import urllib.request
import urllib.parse
import json
import time

targets = {
    "Custard Apple": "Annona squamosa tree",
    "Sweet Tamarind": "Tamarindus indica tree",
    "Fig": "Ficus carica tree",
    "Pear": "Pyrus communis tree",
    "Jamun": "Syzygium cumini tree",
    "Amla": "Phyllanthus emblica tree",
    "Peach": "Prunus persica tree",
    "Orange": "Citrus sinensis tree",
    "Coconut": "Cocos nucifera tree",
    "Mulberry": "Morus alba tree"
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
                if title.lower().endswith(('.jpg', '.jpeg', '.png')):
                    return title
    except Exception as e:
        print(f"Error searching {query}: {e}")
    return None

def get_image_url(file_title):
    try:
        url = f"https://commons.wikimedia.org/w/api.php?action=query&prop=imageinfo&iiprop=url&titles={urllib.parse.quote(file_title)}&format=json"
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=10) as response:
            data = json.loads(response.read().decode())
            pages = data['query']['pages']
            page_id = list(pages.keys())[0]
            if 'imageinfo' in pages[page_id]:
                return pages[page_id]['imageinfo'][0]['url']
    except Exception as e:
        print(f"Error getting url for {file_title}: {e}")
    return None

results = {}
for name, query in targets.items():
    title = search_commons(query)
    if title:
        url = get_image_url(title)
        if url:
            results[name] = url
            print(f"Found: {name} -> {url}")
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
