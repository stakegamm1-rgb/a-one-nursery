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

const beautifulPlants = [
  "https://images.unsplash.com/photo-1416879598555-2518fffd6625?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1463320726281-696a485928c7?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1453904300235-0f2f60b15b5d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1497250681554-187518597ef0?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1545241047-6083a36cb15f?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1499597232252-7a009c95d8da?auto=format&fit=crop&w=800&q=80"
];

let idCounter = 1;
const products = [];

function createProduct(name, category) {
  const price = Math.floor(Math.random() * (800 - 500 + 1)) + 500;
  const discountPrice = Math.floor(Math.random() * (500 - 300 + 1)) + 300;
  const rating = (Math.random() * (5.0 - 4.0) + 4.0).toFixed(1);
  const reviewCount = Math.floor(Math.random() * (500 - 20 + 1)) + 20;
  const stock = Math.random() > 0.3 ? "In Stock" : "Limited Stock";
  
  // Assign a static Unsplash image from our curated array to completely avoid rate-limited error images.
  const image = beautifulPlants[idCounter % beautifulPlants.length];
  
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
    description: `Premium quality ${name}, perfect for your space. Authentic photograph.`
  };
}

fruitPlants.forEach(name => products.push(createProduct(name, "Fruit")));
indoorPlants.forEach(name => products.push(createProduct(name, "Indoor")));
outdoorPlants.forEach(name => products.push(createProduct(name, "Outdoor")));

const fileContent = `// Completely fresh catalog, no old data remaining.\nexport const plants = ${JSON.stringify(products, null, 2)};\n`;

fs.writeFileSync('/Users/apple/Documents/Delaine/work/nursary plants website ak/src/data/plants.js', fileContent);
console.log("Successfully generated 50 plants with curated Unsplash images.");
