import urllib.request
import urllib.parse
import json
import time

targets = {
    "Custard Apple": "Annona reticulata tree",
    "Sweet Tamarind": "Tamarindus indica tree",
    "Fig": "Ficus carica tree with fruits",
    "Pear": "Pyrus communis tree",
    "Jamun": "Syzygium cumini tree",
    "Amla": "Phyllanthus emblica tree",
    "Peach": "Prunus persica tree",
    "Orange": "Citrus sinensis tree",
    "Coconut": "Cocos nucifera palm tree",
    "Mulberry": "Morus alba tree"
}

def search_commons(query):
    try:
        url = f"https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch={urllib.parse.quote(query + ' filetype:bitmap')}&utf8=&format=json"
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
        else:
            print(f"Failed to get URL for {title}")
    else:
        print(f"No results for {query}")
    time.sleep(1)

with open("commons_images.json", "w") as f:
    json.dump(results, f, indent=2)
