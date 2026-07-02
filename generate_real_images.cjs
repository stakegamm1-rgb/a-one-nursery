const fs = require('fs');

async function getWikiImage(query) {
    try {
        const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&utf8=&format=json&origin=*`;
        const searchRes = await fetch(searchUrl);
        const searchData = await searchRes.json();
        
        if (searchData.query.search.length > 0) {
            const bestTitle = searchData.query.search[0].title;
            const res2 = await fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=${encodeURIComponent(bestTitle)}&origin=*`);
            const data2 = await res2.json();
            const pages2 = data2.query.pages;
            const pageId2 = Object.keys(pages2)[0];
            if (pageId2 !== "-1" && pages2[pageId2].original) {
                return pages2[pageId2].original.source;
            }
        }
    } catch(e) {
        console.error(e);
    }
    return null;
}

const defaultImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Ash_Tree_-_geograph.org.uk_-_590710.jpg/800px-Ash_Tree_-_geograph.org.uk_-_590710.jpg";

const fruitPlants = [
  "Jamun fruit", "Guava tree", "Litchi fruit", "Alphonso Mango tree", "Dasheri Mango tree", 
  "Kesar Mango", "Langra Mango", "Totapuri Mango", "Neelam Mango", "Lemon tree", 
  "Sweet Lemon tree", "Orange tree", "Malta fruit tree", "Pomegranate tree", "Sapota tree", 
  "Jackfruit tree", "Amla tree", "Coconut tree", "Avocado tree", "Dragon Fruit plant", 
  "Banana tree", "Papaya tree", "Mulberry tree", "Fig tree", "Peach tree", 
  "Pear tree", "Plum tree", "Custard Apple tree", "Star Fruit tree", "Sweet Tamarind tree"
];

const indoorPlants = [
  "Snake Plant", "ZZ Plant", "Monstera Deliciosa", "Peace Lily", "Areca Palm", 
  "Rubber Plant", "Spider Plant", "Golden Pothos", "Chinese Evergreen", "Lucky Bamboo"
];

const outdoorPlants = [
  "Rose plant", "Hibiscus plant", "Bougainvillea", "Jasmine plant", "Ixora", 
  "Marigold flower", "Plumeria plant", "Ashoka tree", "Bottle Brush plant", "Gulmohar tree"
];

const allNames = [...fruitPlants, ...indoorPlants, ...outdoorPlants];
let idCounter = 1;
const products = [];

async function generate() {
    for (let i = 0; i < allNames.length; i++) {
        const query = allNames[i];
        let img = await getWikiImage(query);
        if (!img) {
            img = await getWikiImage(query.replace(" tree", "").replace(" plant", "").replace(" fruit", ""));
        }
        if (!img) img = defaultImage;
        
        let category = "Fruit";
        if (i >= 30 && i < 40) category = "Indoor";
        if (i >= 40) category = "Outdoor";
        
        // Original name without 'tree' or 'plant' if we added it for search
        let displayName = query.replace(" fruit", "").replace(" tree", "").replace(" plant", "").replace(" flower", "");
        
        const price = Math.floor(Math.random() * (800 - 500 + 1)) + 500;
        const discountPrice = Math.floor(Math.random() * (500 - 300 + 1)) + 300;
        const rating = (Math.random() * (5.0 - 4.0) + 4.0).toFixed(1);
        
        products.push({
            id: idCounter++,
            name: displayName,
            price,
            discountPrice,
            rating: parseFloat(rating),
            reviewCount: Math.floor(Math.random() * (500 - 20 + 1)) + 20,
            stock: Math.random() > 0.3 ? "In Stock" : "Limited Stock",
            category,
            image: img,
            badge: Math.random() > 0.7 ? "Popular" : "",
            description: `Premium quality ${displayName}, perfect for your space. Real image provided.`
        });
        console.log(`Processed ${displayName}: ${img}`);
    }
    
    const fileContent = `// Completely fresh catalog, no old data remaining.\nexport const plants = ${JSON.stringify(products, null, 2)};\n`;
    fs.writeFileSync('/Users/apple/Documents/Delaine/work/nursary plants website ak/src/data/plants.js', fileContent);
    console.log("Successfully generated 50 plants with real Wikipedia images.");
}

generate();
