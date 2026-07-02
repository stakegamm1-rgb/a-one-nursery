import requests
import json
import re
import urllib.parse
import sys

def get_image(query):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
    }
    # Step 1: get vqd token
    res = requests.get(f"https://duckduckgo.com/?q={urllib.parse.quote(query)}", headers=headers)
    match = re.search(r'vqd=([\d-]+)', res.text)
    if not match:
        print("No vqd found")
        return None
    vqd = match.group(1)
    
    # Step 2: search images
    params = {
        'l': 'us-en',
        'o': 'json',
        'q': query,
        'vqd': vqd,
        'f': ',,,',
        'p': '1'
    }
    img_res = requests.get("https://duckduckgo.com/i.js", params=params, headers=headers)
    try:
        data = img_res.json()
        if 'results' in data and len(data['results']) > 0:
            return data['results'][0]['image']
    except Exception as e:
        print("Error:", e)
    return None

print(get_image("Jamun plant fruit"))
