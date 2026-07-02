const fs = require('fs');
const path = require('path');

const correctUrls = {
    "Sweet Tamarind": "https://commons.wikimedia.org/wiki/Special:FilePath/Tamarind_tree.jpg?width=800",
    "Jamun": "https://commons.wikimedia.org/wiki/Special:FilePath/Jamun_Tree_in_India.jpg?width=800",
    "Papaya": "https://commons.wikimedia.org/wiki/Special:FilePath/Papaya_tree.jpg?width=800"
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
    console.log("Successfully patched Tamarind, Jamun, and Papaya!");
}
