const fs = require('fs');
const path = require('path');

const correctUrls = {
    "Jamun": "https://nurserylive.com/cdn/shop/products/nurserylive-jamun-plant.jpg?v=1634222564",
    "Sweet Tamarind": "https://nurserylive.com/cdn/shop/products/nurserylive-tamarind-imli-tamarindus-indica-plant.jpg?v=1634202553"
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
    console.log("Successfully patched Jamun and Sweet Tamarind with nurserylive images!");
}
