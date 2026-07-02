const fs = require('fs');

const fruitPlants = [
  "Jamun", "Guava", "Litchi", "Alphonso Mango", "Dasheri Mango", 
  "Kesar Mango", "Langra Mango", "Totapuri Mango", "Neelam Mango", "Lemon", 
  "Sweet Lemon", "Orange", "Malta", "Pomegranate", "Sapota", 
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
  "Marigold", "Plumeria", "Ashoka", "Bottle Brush", "Gulmohar"
];

let idCounter = 1;
const products = [];

function createProduct(name, category) {
  const price = Math.floor(Math.random() * (800 - 500 + 1)) + 500;
  const discountPrice = Math.floor(Math.random() * (500 - 300 + 1)) + 300;
  const rating = (Math.random() * (5.0 - 4.0) + 4.0).toFixed(1);
  const reviewCount = Math.floor(Math.random() * (500 - 20 + 1)) + 20;
  const stock = Math.random() > 0.3 ? "In Stock" : "Limited Stock";
  
  let prompt = '';
  if (category === 'Fruit') {
      prompt = `A highly realistic photograph of ${name} fruit hanging on a branch, natural lighting, high resolution, macro photography.`;
  } else if (category === 'Indoor') {
      prompt = `A beautiful, realistic photograph of a ${name} potted plant inside a modern bright room, high quality, real plant photography.`;
  } else {
      prompt = `A vibrant, highly realistic photograph of a ${name} plant blooming outdoors in a garden, beautiful natural sunlight.`;
  }
  
  const image = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?nologo=true&seed=${idCounter * 1234}&width=800&height=800`;
  
  return {
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
    description: `Premium quality ${name}, perfect for your space. High quality image.`
  };
}

fruitPlants.forEach(name => products.push(createProduct(name, "Fruit")));
indoorPlants.forEach(name => products.push(createProduct(name, "Indoor")));
outdoorPlants.forEach(name => products.push(createProduct(name, "Outdoor")));

const fileContent = `// Catalog with custom generated AI images based on exact names.\nexport const plants = ${JSON.stringify(products, null, 2)};\n`;

fs.writeFileSync('/Users/apple/Documents/Delaine/work/nursary plants website ak/src/data/plants.js', fileContent);
console.log("Successfully generated 50 plants with precise AI image URLs.");
