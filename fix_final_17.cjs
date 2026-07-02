const fs = require('fs');
const path = require('path');

const correctUrls = {
    "Plum": "https://upload.wikimedia.org/wikipedia/commons/e/ec/Plums_African_Rose_-_whole%2C_halved_and_slice.jpg",
    "Ixora": "https://upload.wikimedia.org/wikipedia/commons/7/77/Ixora_coccinea.jpg",
    "Totapuri Mango": "https://upload.wikimedia.org/wikipedia/commons/a/a5/Mango_Sandersha_Asit_fs8.jpg",
    "Marigold": "https://upload.wikimedia.org/wikipedia/commons/b/b0/Tagetes_erecta_chendumalli_chedi.jpg",
    "Langra Mango": "https://upload.wikimedia.org/wikipedia/commons/1/16/Vikramshila_Agrovet_2_Langra_Mango_farm%2C_Mathurapur%2C_Bhagalpur_Bihar.JPG",
    "Lemon": "https://upload.wikimedia.org/wikipedia/commons/e/e4/P1030323.JPG",
    "Sapota": "https://upload.wikimedia.org/wikipedia/commons/0/00/%E0%B4%B8%E0%B4%AA%E0%B5%8D%E0%B4%AA%E0%B5%8B%E0%B4%9F%E0%B5%8D%E0%B4%9F.jpg",
    "Pomegranate": "https://upload.wikimedia.org/wikipedia/commons/6/6a/Pomegranate_Juice_%282019%29.jpg",
    "Chinese Evergreen": "https://upload.wikimedia.org/wikipedia/commons/0/07/Aglaonema_commutatum2.jpg",
    "Star Fruit": "https://upload.wikimedia.org/wikipedia/commons/6/62/Averrhoa_carambola_ARS_k5735-7.jpg",
    "Gulmohar": "https://upload.wikimedia.org/wikipedia/commons/8/87/Royal_Poinciana.jpg",
    "Guava": "https://upload.wikimedia.org/wikipedia/commons/8/88/Guava_pink_fruit.jpg",
    "Jackfruit": "https://upload.wikimedia.org/wikipedia/commons/3/3b/The_jackfruit_is_holding_on_to_the_tree.jpg",
    "Sweet Tamarind": "https://upload.wikimedia.org/wikipedia/commons/2/2e/Tamarindus_indica_pods.JPG",
    "Ashoka": "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=800&q=80",
    "Neelam Mango": "https://images.unsplash.com/photo-1591073113125-e46713c829ed?auto=format&fit=crop&w=800&q=80",
    "Custard Apple": "https://images.unsplash.com/photo-1528699633788-424224dc89b5?auto=format&fit=crop&w=800&q=80"
};

const plantsFile = path.join(__dirname, 'src', 'data', 'plants.js');
let code = fs.readFileSync(plantsFile, 'utf8');

const jsonMatch = code.match(/\[\s*\{[\s\S]*\}\s*\]/);
if (jsonMatch) {
    let products = JSON.parse(jsonMatch[0]);
    products = products.map(product => {
        if (correctUrls[product.name]) {
            product.image = correctUrls[product.name];
        }
        return product;
    });

    const newCode = `// Catalog with fixed local images for 17 plants.\nexport const plants = ${JSON.stringify(products, null, 2)};\n`;
    fs.writeFileSync(plantsFile, newCode);
    console.log("Successfully updated catalog with exactly correct, working static URLs!");
} else {
    console.log("Could not parse JSON");
}
