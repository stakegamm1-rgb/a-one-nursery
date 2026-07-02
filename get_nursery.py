import urllib.request
import re

def get_og_image(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        html = urllib.request.urlopen(req, timeout=10).read().decode()
        match = re.search(r'<meta property="og:image" content="([^"]+)"', html)
        if match:
            # Nurserylive images sometimes start with //
            img = match.group(1)
            if img.startswith('//'):
                return 'https:' + img
            return img
    except Exception as e:
        print(f"Error {url}: {e}")
    return None

print("Jamun:", get_og_image("https://nurserylive.com/products/jamun-tree-syzygium-cumini-plant"))
print("Tamarind:", get_og_image("https://nurserylive.com/products/tamarind-plant"))
