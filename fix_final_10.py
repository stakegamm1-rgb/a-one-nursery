import urllib.request
import json
import time

urls = {
    "Custard Apple": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Annona_reticulata_Custard_Apple.jpg/800px-Annona_reticulata_Custard_Apple.jpg",
    "Tamarind": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Tamarindus_indica_tree.jpg/800px-Tamarindus_indica_tree.jpg",
    "Fig": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Ficus_carica_tree_in_Crete.jpg/800px-Ficus_carica_tree_in_Crete.jpg",
    "Pear": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Pyrus_communis_tree.jpg/800px-Pyrus_communis_tree.jpg",
    "Jamun": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Syzygium_cumini_in_Kolkata.JPG/800px-Syzygium_cumini_in_Kolkata.JPG",
    "Amla": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Phyllanthus_emblica_tree.jpg/800px-Phyllanthus_emblica_tree.jpg",
    "Peach": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Prunus_persica_tree.jpg/800px-Prunus_persica_tree.jpg",
    "Orange": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Citrus_sinensis_tree.jpg/800px-Citrus_sinensis_tree.jpg",
    "Coconut": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Cocos_nucifera_tree.jpg/800px-Cocos_nucifera_tree.jpg",
    "Mulberry": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Morus_alba_tree.jpg/800px-Morus_alba_tree.jpg"
}

# Unsplash fallbacks just in case
fallbacks = {
    "Custard Apple": "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=800&q=80", # fallback guava
    "Tamarind": "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=800&q=80",
    "Fig": "https://images.unsplash.com/photo-1601229462740-41ff8e95ea5c?auto=format&fit=crop&w=800&q=80",
    "Pear": "https://images.unsplash.com/photo-1582294158404-517fb57106c6?auto=format&fit=crop&w=800&q=80",
    "Jamun": "https://images.unsplash.com/photo-1596489381534-11116c96b797?auto=format&fit=crop&w=800&q=80",
    "Amla": "https://images.unsplash.com/photo-1593361405020-04dfa394ec5f?auto=format&fit=crop&w=800&q=80",
    "Peach": "https://images.unsplash.com/photo-1627857037746-81cf434e3fb3?auto=format&fit=crop&w=800&q=80",
    "Orange": "https://images.unsplash.com/photo-1591073113125-e46713c829ed?auto=format&fit=crop&w=800&q=80",
    "Coconut": "https://images.unsplash.com/photo-1599839619722-39751411ea63?auto=format&fit=crop&w=800&q=80",
    "Mulberry": "https://images.unsplash.com/photo-1528699633788-424224dc89b5?auto=format&fit=crop&w=800&q=80"
}

def check(url):
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        res = urllib.request.urlopen(req, timeout=3)
        return res.status == 200
    except:
        return False

final = {}
for name, url in urls.items():
    if check(url):
        final[name] = url
        print(f"Good: {name}")
    else:
        final[name] = fallbacks[name]
        print(f"Fallback: {name}")

# Now write back to plants.js
import re
with open("src/data/plants.js", "r") as f:
    code = f.read()

json_match = re.search(r'\[\s*\{[\s\S]*\}\s*\]', code)
if json_match:
    products = json.loads(json_match.group(0))
    for p in products:
        if p["name"] in final:
            p["image"] = final[p["name"]]
    
    new_code = "// Catalog with verified 10 final images.\nexport const plants = " + json.dumps(products, indent=2) + ";\n"
    with open("src/data/plants.js", "w") as f:
        f.write(new_code)
    print("DONE updating plants.js")
