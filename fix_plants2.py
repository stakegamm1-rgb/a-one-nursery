import urllib.request
import json

replacements = {
    "Plum": [
        "https://upload.wikimedia.org/wikipedia/commons/3/30/Prunus_domestica_tree.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/e/e4/Plum_tree_in_fruit.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Plum_tree_with_fruit.JPG/800px-Plum_tree_with_fruit.JPG"
    ],
    "Ixora": [
        "https://upload.wikimedia.org/wikipedia/commons/9/91/Ixora_coccinea_Jungle_Geranium_fl_W_IMG_2357.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Ixora_coccinea_1.jpg/800px-Ixora_coccinea_1.jpg"
    ],
    "Totapuri Mango": [
        "https://upload.wikimedia.org/wikipedia/commons/a/a5/Mango_Sandersha_Asit_fs8.jpg"
    ],
    "Marigold": [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Tagetes_erecta_plant.jpg/800px-Tagetes_erecta_plant.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Marigold_plant_in_bloom.jpg/800px-Marigold_plant_in_bloom.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Tagetes_erecta_in_a_garden.jpg/800px-Tagetes_erecta_in_a_garden.jpg"
    ],
    "Langra Mango": [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Vikramshila_Agrovet_2_Langra_Mango_farm%2C_Mathurapur%2C_Bhagalpur_Bihar.JPG/800px-Vikramshila_Agrovet_2_Langra_Mango_farm%2C_Mathurapur%2C_Bhagalpur_Bihar.JPG"
    ],
    "Lemon": [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Lemon_Tree_in_Fruit.jpg/800px-Lemon_Tree_in_Fruit.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Citrus_limon_tree.jpg/800px-Citrus_limon_tree.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Lemon_tree_with_fruits.JPG/800px-Lemon_tree_with_fruits.JPG"
    ],
    "Sapota": [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Sapodilla_tree.jpg/800px-Sapodilla_tree.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Manilkara_zapota_tree.jpg/800px-Manilkara_zapota_tree.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Sapodilla_fruit_on_tree.jpg/800px-Sapodilla_fruit_on_tree.jpg"
    ],
    "Ashoka": [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Polyalthia_longifolia_tree.jpg/800px-Polyalthia_longifolia_tree.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Saraca_asoca_%28Ashoka_tree%29_in_Kolkata_W_IMG_9771.jpg/800px-Saraca_asoca_%28Ashoka_tree%29_in_Kolkata_W_IMG_9771.jpg"
    ],
    "Neelam Mango": [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Mango_tree_with_fruits.jpg/800px-Mango_tree_with_fruits.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Mangoes_in_Bangalore_%282025%29_19.jpg/800px-Mangoes_in_Bangalore_%282025%29_19.jpg"
    ],
    "Pomegranate": [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Pomegranate_tree.jpg/800px-Pomegranate_tree.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Pomegranate_tree_with_fruits.jpg/800px-Pomegranate_tree_with_fruits.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Punica_granatum_tree.jpg/800px-Punica_granatum_tree.jpg"
    ],
    "Star Fruit": [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Carambola_tree.jpg/800px-Carambola_tree.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Averrhoa_carambola_tree.jpg/800px-Averrhoa_carambola_tree.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Starfruit_tree_with_fruits.JPG/800px-Starfruit_tree_with_fruits.JPG"
    ],
    "Gulmohar": [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Delonix_regia_tree.jpg/800px-Delonix_regia_tree.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Delonix_regia_3.jpg/800px-Delonix_regia_3.jpg"
    ],
    "Guava": [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Guava_tree.jpg/800px-Guava_tree.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Guava_tree_with_fruits.jpg/800px-Guava_tree_with_fruits.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Psidium_guajava_tree.jpg/800px-Psidium_guajava_tree.jpg"
    ],
    "Custard Apple": [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Custard_apple_tree.jpg/800px-Custard_apple_tree.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Annona_reticulata_tree.jpg/800px-Annona_reticulata_tree.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Custard_apple_plant.jpg/800px-Custard_apple_plant.jpg"
    ],
    "Jackfruit": [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Jackfruit_tree_in_Kerala.jpg/800px-Jackfruit_tree_in_Kerala.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Artocarpus_heterophyllus_tree.jpg/800px-Artocarpus_heterophyllus_tree.jpg"
    ],
    "Sweet Tamarind": [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Tamarindus_indica_tree.jpg/800px-Tamarindus_indica_tree.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Tamarind_tree_with_fruits.jpg/800px-Tamarind_tree_with_fruits.jpg"
    ],
    "Chinese Evergreen": [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Aglaonema_commutatum.jpg/800px-Aglaonema_commutatum.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Aglaonema_commutatum_plant.jpg/800px-Aglaonema_commutatum_plant.jpg"
    ]
}

def test_url(url):
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        res = urllib.request.urlopen(req, timeout=5)
        return res.status == 200
    except:
        return False

final_urls = {}

for plant, urls in replacements.items():
    found = False
    for url in urls:
        if test_url(url):
            final_urls[plant] = url
            print(f"Found working image for {plant}: {url}")
            found = True
            break
    if not found:
        print(f"FAILED to find working image for {plant}!")

with open("working_images.json", "w") as f:
    json.dump(final_urls, f, indent=2)
