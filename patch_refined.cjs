const fs = require('fs');
const path = require('path');

const correctUrls = {
    "Peach": "https://commons.wikimedia.org/wiki/Special:FilePath/Peach_tree.jpg?width=800",
    "Orange": "https://commons.wikimedia.org/wiki/Special:FilePath/Orange_Tree.jpg?width=800",
    "Coconut": "https://commons.wikimedia.org/wiki/Special:FilePath/Coconut_Tree.jpg?width=800",
    "Fig": "https://commons.wikimedia.org/wiki/Special:FilePath/Fig_tree.jpg?width=800"
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
    console.log("Successfully refined the last 4 problematic images!");
}
