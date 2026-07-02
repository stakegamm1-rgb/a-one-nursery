import urllib.request
import re
import json
import time

targets = {
    "ZZ Plant": "Zamioculcas",
    "Snake Plant": "Dracaena_trifasciata",
    "Rubber Plant": "Ficus_elastica",
    "Spider Plant": "Chlorophytum_comosum",
    "Lucky Bamboo": "Dracaena_sanderiana",
    "Peace Lily": "Spathiphyllum",
    "Golden Pothos": "Epipremnum_aureum",
    
    "Ashoka Tree": "Polyalthia_longifolia",
    "Bougainvillea": "Bougainvillea",
    "Plumeria": "Plumeria",
    "Bottle Brush Tree": "Callistemon",
    "Jasmine Plant": "Jasmine"
}

results = {}
for name, title in targets.items():
    try:
        url = f"https://en.wikipedia.org/wiki/{title}"
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=10) as response:
            html = response.read().decode()
            # find all thumb urls
            matches = re.findall(r'src="//upload\.wikimedia\.org/wikipedia/commons/thumb/[^"]+\.jpg/(\d+)px-([^"]+\.jpg)"', html)
            if matches:
                filename = urllib.parse.unquote(matches[0][1])
                img_url = f"https://commons.wikimedia.org/wiki/Special:FilePath/{urllib.parse.quote(filename)}?width=800"
                results[name] = img_url
                print(f"{name}: {img_url}")
    except Exception as e:
        print(f"Error for {name}: {e}")
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
