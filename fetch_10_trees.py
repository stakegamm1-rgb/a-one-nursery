import urllib.request
import urllib.parse
import json
import time

targets = {
    "Custard Apple": "Sugar-apple",
    "Sweet Tamarind": "Tamarind",
    "Fig": "Common fig",
    "Pear": "Pear",
    "Jamun": "Syzygium cumini",
    "Amla": "Phyllanthus emblica",
    "Peach": "Peach",
    "Orange": "Orange (fruit)",
    "Coconut": "Coconut",
    "Mulberry": "Morus (plant)"
}

def get_page_image_url(page_title):
    try:
        url = f"https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles={urllib.parse.quote(page_title)}&origin=*"
        req = urllib.request.Request(url, headers={'User-Agent': 'BotFixer/1.1'})
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
        print(f"Found: {name} -> {url}")
    else:
        print(f"Not found: {name}")
    time.sleep(2)

with open("tree_images_10.json", "w") as f:
    json.dump(results, f, indent=2)
