const fs = require('fs');
const path = require('path');
const https = require('https');

const publicImagesDir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(publicImagesDir)) {
    fs.mkdirSync(publicImagesDir, { recursive: true });
}

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
const tasks = [];

function createProductTask(name, category) {
  const price = Math.floor(Math.random() * (800 - 500 + 1)) + 500;
  const discountPrice = Math.floor(Math.random() * (500 - 300 + 1)) + 300;
  const rating = (Math.random() * (5.0 - 4.0) + 4.0).toFixed(1);
  const reviewCount = Math.floor(Math.random() * (500 - 20 + 1)) + 20;
  
  let prompt = '';
  if (category === 'Fruit') {
      prompt = `A highly realistic macro photograph of ${name} fruit growing on a tree branch, bright natural sunlight, highly detailed 8k.`;
  } else if (category === 'Indoor') {
      prompt = `A beautiful realistic photograph of a ${name} potted plant inside a modern aesthetic bright room, interior design, 8k.`;
  } else {
      prompt = `A vibrant highly realistic photograph of a ${name} plant blooming outdoors in a garden, beautiful natural sunlight, 8k.`;
  }
  
  const currentId = idCounter++;
  const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?nologo=true&seed=${currentId * 777}&width=500&height=500`;
  const localImagePath = `/images/${currentId}.jpg`;
  
  products.push({
    id: currentId,
    name,
    price,
    discountPrice,
    rating: parseFloat(rating),
    reviewCount,
    stock: "In Stock",
    category,
    image: localImagePath,
    badge: Math.random() > 0.7 ? "Popular" : "",
    description: `Premium quality ${name}, perfect for your space.`
  });
  
  tasks.push({ id: currentId, url: imageUrl, name });
}

fruitPlants.forEach(name => createProductTask(name, "Fruit"));
indoorPlants.forEach(name => createProductTask(name, "Indoor"));
outdoorPlants.forEach(name => createProductTask(name, "Outdoor"));

function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
          https.get(response.headers.location, (res) => {
              res.pipe(file);
              file.on('finish', () => { file.close(resolve); });
          }).on('error', (err) => { fs.unlink(dest, () => reject(err)); });
      } else {
          response.pipe(file);
          file.on('finish', () => { file.close(resolve); });
      }
    }).on('error', (err) => { fs.unlink(dest, () => reject(err)); });
  });
}

async function run() {
  console.log(`Downloading ${tasks.length} images concurrently (batch of 5)...`);
  
  // Process in batches of 5
  for (let i = 0; i < tasks.length; i += 5) {
      const batch = tasks.slice(i, i + 5);
      await Promise.all(batch.map(async (task) => {
          const dest = path.join(publicImagesDir, `${task.id}.jpg`);
          try {
              await downloadImage(task.url, dest);
              console.log(`Downloaded image for ${task.name}`);
          } catch(e) {
              console.log(`Failed to download for ${task.name}`);
          }
      }));
  }

  const fileContent = `// Local images generated via AI\nexport const plants = ${JSON.stringify(products, null, 2)};\n`;
  fs.writeFileSync(path.join(__dirname, 'src', 'data', 'plants.js'), fileContent);
  console.log("Successfully generated all local images and updated catalog.");
}

run();
