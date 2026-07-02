import urllib.request
import urllib.parse
import json
import time

targets = {
    "Plum": "Plum",
    "Ixora": "Ixora coccinea",
    "Totapuri Mango": "Totapuri",
    "Marigold": "Tagetes",
    "Langra Mango": "Langra",
    "Lemon": "Lemon",
    "Sapota": "Manilkara zapota",
    "Ashoka": "Polyalthia longifolia",
    "Neelam Mango": "Neelam (mango)",
    "Pomegranate": "Pomegranate",
    "Star Fruit": "Carambola",
    "Gulmohar": "Delonix regia",
    "Guava": "Guava",
    "Custard Apple": "Sugar-apple",
    "Jackfruit": "Jackfruit",
    "Sweet Tamarind": "Tamarind",
    "Chinese Evergreen": "Aglaonema"
}

def get_page_image_url(page_title):
    try:
        url = f"https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles={urllib.parse.quote(page_title)}&origin=*"
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'})
        with urllib.request.urlopen(req, timeout=10) as response:
            data = json.loads(response.read().decode())
            pages = data['query']['pages']
            page_id = list(pages.keys())[0]
            if page_id != "-1" and 'original' in pages[page_id]:
                return pages[page_id]['original']['source']
    except Exception as e:
        print(f"Error fetching {page_title}: {e}")
    return None

results = {}
for name, title in targets.items():
    url = get_page_image_url(title)
    if url:
        results[name] = url
        print(f"Success: {name} -> {url}")
    else:
        print(f"Failed: {name}")
    time.sleep(1)

with open("exact_images.json", "w") as f:
    json.dump(results, f, indent=2)
