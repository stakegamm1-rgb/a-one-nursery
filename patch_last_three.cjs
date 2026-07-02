const fs = require('fs');
const path = require('path');

const correctUrls = {
    "Jasmine": "https://commons.wikimedia.org/wiki/Special:FilePath/Common_Jasmine.jpg?width=800",
    "Ashoka": "https://commons.wikimedia.org/wiki/Special:FilePath/Polyalthia_longifolia.jpg?width=800",
    "Bottle Brush": "https://commons.wikimedia.org/wiki/Special:FilePath/Red_bottle_brush.jpg?width=800"
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

    const newCode = `// Catalog with absolute final images\nexport const plants = ${JSON.stringify(products, null, 2)};\n`;
    fs.writeFileSync(plantsFile, newCode);
    console.log("Successfully patched Jasmine, Ashoka, and Bottle Brush!");
}
