const fs = require('fs');

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getWikiImage(query) {
    const headers = {
        'User-Agent': 'Bot-Antigravity/1.0 (Educational purpose; rate-limited)'
    };
    try {
        const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&utf8=&format=json&origin=*`;
        const searchRes = await fetch(searchUrl, { headers });
        const searchData = await searchRes.json();
        
        if (searchData && searchData.query && searchData.query.search.length > 0) {
            const bestTitle = searchData.query.search[0].title;
            await sleep(500); // polite delay
            
            const res2 = await fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=${encodeURIComponent(bestTitle)}&origin=*`, { headers });
            const data2 = await res2.json();
            
            if (data2 && data2.query && data2.query.pages) {
                const pages2 = data2.query.pages;
                const pageId2 = Object.keys(pages2)[0];
                if (pageId2 !== "-1" && pages2[pageId2].original) {
                    return pages2[pageId2].original.source;
                }
            }
        }
    } catch(e) {
        console.error(`Error for ${query}:`, e.message);
    }
    return null;
}

const fruitPlants = [
  "Jamun", "Guava", "Litchi", "Alphonso Mango", "Dasheri Mango", 
  "Kesar Mango", "Langra Mango", "Totapuri Mango", "Neelam Mango", "Lemon", 
  "Sweet Lemon", "Orange", "Malta fruit", "Pomegranate", "Sapota", 
  "Jackfruit", "Amla", "Coconut", "Avocado", "Dragon Fruit", 
  "Banana", "Papaya", "Mulberry", "Fig", "Peach", 
  "Pear", "Plum", "Custard Apple", "Star Fruit", "Tamarind"
];

const indoorPlants = [
  "Snake Plant", "Zanzibar Gem", "Monstera deliciosa", "Peace Lily", "Dypsis lutescens", 
  "Ficus elastica", "Chlorophytum comosum", "Epipremnum aureum", "Aglaonema", "Lucky Bamboo"
];

const outdoorPlants = [
  "Rose", "Hibiscus", "Bougainvillea", "Jasmine", "Ixora", 
  "Tagetes", "Plumeria", "Saraca asoca", "Callistemon", "Delonix regia"
];

const defaultImage = "https://images.unsplash.com/photo-1416879598555-2518fffd6625?auto=format&fit=crop&w=800&q=80";
const products = [];
let idCounter = 1;

async function generate() {
    console.log("Starting Wikipedia image scraping with rate limiting...");
    
    async function processCategory(names, category) {
        for (let i = 0; i < names.length; i++) {
            const name = names[i];
            const searchName = (category === 'Fruit' && !name.includes('fruit') && !name.includes('Mango') && name !== 'Coconut' && name !== 'Tamarind') ? name + ' fruit' : name;
            
            let img = await getWikiImage(searchName);
            if (!img) {
                await sleep(500);
                img = await getWikiImage(name + ' plant');
            }
            if (!img) img = defaultImage;
            
            const price = Math.floor(Math.random() * (800 - 500 + 1)) + 500;
            const discountPrice = Math.floor(Math.random() * (500 - 300 + 1)) + 300;
            
            products.push({
                id: idCounter++,
                name: name.replace(/fruit|plant/gi, '').trim(),
                price,
                discountPrice,
                rating: parseFloat((Math.random() * (5.0 - 4.0) + 4.0).toFixed(1)),
                reviewCount: Math.floor(Math.random() * 480) + 20,
                stock: Math.random() > 0.3 ? "In Stock" : "Limited Stock",
                category,
                image: img,
                badge: Math.random() > 0.7 ? "Popular" : "",
                description: `Premium quality ${name}, perfect for your space. Authentic Wikipedia photograph.`
            });
            console.log(`[${category}] ${name} -> ${img}`);
            await sleep(1000); // 1s delay between plants
        }
    }
    
    await processCategory(fruitPlants, "Fruit");
    await processCategory(indoorPlants, "Indoor");
    await processCategory(outdoorPlants, "Outdoor");
    
    const fileContent = `// Catalog with authentic Wikipedia images.\nexport const plants = ${JSON.stringify(products, null, 2)};\n`;
    fs.writeFileSync('/Users/apple/Documents/Delaine/work/nursary plants website ak/src/data/plants.js', fileContent);
    console.log("Successfully generated all 50 plants!");
}

generate();
