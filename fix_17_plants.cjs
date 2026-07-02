const fs = require('fs');
const path = require('path');
const https = require('https');

const targets = [
  "Plum", "Ixora", "Totapuri Mango", "Marigold", "Langra Mango", "Lemon",
  "Sapota", "Ashoka", "Neelam Mango", "Pomegranate", "Star Fruit", "Gulmohar",
  "Guava", "Custard Apple", "Jackfruit", "Sweet Tamarind", "Chinese Evergreen"
];

const publicImagesDir = path.join(__dirname, 'public', 'images', 'fixed');
if (!fs.existsSync(publicImagesDir)) {
    fs.mkdirSync(publicImagesDir, { recursive: true });
}

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
  console.log("Downloading 17 perfect tree images...");
  
  const results = {};
  
  for (const name of targets) {
      let prompt = `A highly realistic, wide shot photograph of a full ${name} tree planted in a beautiful sunny garden, showing the entire plant with green leaves, highly detailed 8k nature photography.`;
      if (name === "Chinese Evergreen" || name === "Marigold" || name === "Ixora") {
          prompt = `A beautiful, realistic photograph of a full ${name} potted plant with leaves and flowers, high quality garden photography.`;
      }
      
      const seed = Math.floor(Math.random() * 1000000);
      const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?nologo=true&seed=${seed}&width=800&height=800`;
      const filename = `${name.replace(/\s+/g, '_')}.jpg`;
      const dest = path.join(publicImagesDir, filename);
      
      try {
          await downloadImage(url, dest);
          console.log(`Downloaded image for ${name}`);
          results[name] = `/images/fixed/${filename}`;
      } catch(e) {
          console.log(`Failed to download for ${name}:`, e.message);
      }
  }

  const plantsFile = path.join(__dirname, 'src', 'data', 'plants.js');
  let code = fs.readFileSync(plantsFile, 'utf8');
  const jsonMatch = code.match(/\[\s*\{[\s\S]*\}\s*\]/);
  if (jsonMatch) {
      let products = JSON.parse(jsonMatch[0]);
      products = products.map(product => {
          if (results[product.name]) {
              product.image = results[product.name];
          }
          return product;
      });

      const newCode = `// Catalog with fixed local images for 17 plants.\nexport const plants = ${JSON.stringify(products, null, 2)};\n`;
      fs.writeFileSync(plantsFile, newCode);
      console.log("Successfully updated catalog with 17 new local images!");
  } else {
      console.log("Could not parse JSON");
  }
}

run();
