import urllib.request
import urllib.parse
import re
import json

targets = [
    "ZZ Plant", "Areca Palm", "Snake Plant", "Rubber Plant", "Spider Plant",
    "Lucky Bamboo", "Peace Lily", "Golden Pothos",
    "Ashoka Tree", "Bougainvillea", "Plumeria", "Bottle Brush Tree", "Jasmine Plant"
]

def get_nursery_image(url_slug):
    url = f"https://nurserylive.com/products/{url_slug}"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        html = urllib.request.urlopen(req, timeout=5).read().decode()
        match = re.search(r'<meta property="og:image" content="([^"]+)"', html)
        if match:
            img = match.group(1)
            if img.startswith('//'):
                return 'https:' + img
            return img
    except Exception as e:
        pass
    return None

def get_wiki_image(filename):
    return f"https://commons.wikimedia.org/wiki/Special:FilePath/{urllib.parse.quote(filename)}?width=800"

plant_urls = {
    "ZZ Plant": get_nursery_image("zz-plant-zamioculcas-zamiifolia-plant") or get_wiki_image("Zamioculcas_zamiifolia_-_01.jpg"),
    "Areca Palm": get_nursery_image("areca-palm-plant") or get_wiki_image("Chrysalidocarpus_lutescens_1.jpg"),
    "Snake Plant": get_nursery_image("sansevieria-trifasciata-snake-plant-plant") or get_wiki_image("Sansevieria_trifasciata_1.jpg"),
    "Rubber Plant": get_nursery_image("rubber-plant-ficus-elastica-plant") or get_wiki_image("Ficus_elastica_plant.jpg"),
    "Spider Plant": get_nursery_image("spider-plant-chlorophytum-comosum-plant") or get_wiki_image("Chlorophytum_comosum_2.jpg"),
    "Lucky Bamboo": get_nursery_image("lucky-bamboo-plant") or get_wiki_image("Lucky_bamboo.jpg"),
    "Peace Lily": get_nursery_image("peace-lily-spathiphyllum-plant") or get_wiki_image("Spathiphyllum_wallisii_1.jpg"),
    "Golden Pothos": get_nursery_image("money-plant-golden-epipremnum-aureum-plant") or get_wiki_image("Epipremnum_aureum_3.jpg"),
    
    "Ashoka Tree": get_nursery_image("ashoka-tree-polyalthia-longifolia-plant") or get_wiki_image("Polyalthia_longifolia_1.jpg"),
    "Bougainvillea": get_nursery_image("bougainvillea-plant") or get_wiki_image("Bougainvillea_glabra_1.jpg"),
    "Plumeria": get_nursery_image("plumeria-plant") or get_wiki_image("Plumeria_rubra_1.jpg"),
    "Bottle Brush Tree": get_nursery_image("bottle-brush-callistemon-plant") or get_wiki_image("Callistemon_viminalis_1.jpg"),
    "Jasmine Plant": get_nursery_image("jasmine-plant") or get_wiki_image("Jasminum_sambac_1.jpg")
}

for name, url in plant_urls.items():
    print(f"{name}: {url}")

import re
with open("src/data/plants.js", "r") as f:
    code = f.read()

json_match = re.search(r'\[\s*\{[\s\S]*\}\s*\]', code)
if json_match:
    products = json.loads(json_match.group(0))
    for p in products:
        if p["name"] in plant_urls:
            p["image"] = plant_urls[p["name"]]
    
    new_code = "// Catalog with absolute final images\nexport const plants = " + json.dumps(products, indent=2) + ";\n"
    with open("src/data/plants.js", "w") as f:
        f.write(new_code)
    print("DONE updating plants.js")
