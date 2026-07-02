const fs = require('fs');

const fruitPlants = [
  "Jamun", "Guava (Amrud)", "Litchi", "Alphonso Mango", "Dasheri Mango", 
  "Kesar Mango", "Langra Mango", "Totapuri Mango", "Neelam Mango", "Lemon", 
  "Sweet Lemon (Mosambi)", "Orange", "Malta", "Pomegranate", "Sapota (Chikoo)", 
  "Jackfruit", "Amla", "Coconut", "Avocado", "Dragon Fruit", 
  "Banana", "Papaya", "Mulberry", "Fig", "Peach", 
  "Pear", "Plum", "Custard Apple", "Star Fruit", "Sweet Tamarind"
];

const indoorPlants = [
  "Snake Plant", "ZZ Plant", "Monstera Deliciosa", "Peace Lily", "Areca Palm", 
  "Rubber Plant", "Spider Plant", "Golden Pothos", "Chinese Evergreen", "Lucky Bamboo"
];

const outdoorPlants = [
  "Rose", "Hibiscus", "Bougainvillea", "Jasmine", "Ixora", 
  "Marigold", "Plumeria (Champa)", "Ashoka", "Bottle Brush", "Gulmohar"
];

let idCounter = 1;
const products = [];

function generateRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createProduct(name, category) {
  const price = generateRandom(500, 800);
  const discountPrice = generateRandom(300, 500);
  const rating = (Math.random() * (5.0 - 4.0) + 4.0).toFixed(1);
  const reviewCount = generateRandom(20, 500);
  const stockOptions = ["In Stock", "Limited Stock"];
  const stock = stockOptions[Math.random() > 0.3 ? 0 : 1];
  
  // Make the prompt highly unique so the AI generates a different image for each one
  const adjectives = ["lush", "vibrant", "beautiful", "healthy", "thriving", "green", "fresh", "blooming", "potted", "large"];
  const randomAdjective = adjectives[idCounter % adjectives.length];
  
  const imagePrompt = `A ${randomAdjective} realistic ${name} plant in a garden, ultra detailed photography, variant ${idCounter}`;
  const image = `https://image.pollinations.ai/prompt/${encodeURIComponent(imagePrompt)}?width=800&height=800&nologo=true&seed=${idCounter * 10}`;
  
  const product = {
    id: idCounter++,
    name,
    price,
    discountPrice,
    rating: parseFloat(rating),
    reviewCount,
    stock,
    category,
    image,
    badge: Math.random() > 0.7 ? "Popular" : "",
    description: `Premium quality ${name}, perfect for your space. Easy to care for and highly rewarding.`
  };
  return product;
}

fruitPlants.forEach(name => products.push(createProduct(name, "Fruit")));
indoorPlants.forEach(name => products.push(createProduct(name, "Indoor")));
outdoorPlants.forEach(name => products.push(createProduct(name, "Outdoor")));

const fileContent = `// Completely fresh catalog, no old data remaining.\nexport const plants = ${JSON.stringify(products, null, 2)};\n`;

fs.writeFileSync('/Users/apple/Documents/Delaine/work/nursary plants website ak/src/data/plants.js', fileContent);
console.log("Successfully generated 50 unique plants.");
