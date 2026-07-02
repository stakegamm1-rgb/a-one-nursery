const fs = require('fs');
const path = require('path');

const correctUrls = {
    "Custard Apple": "https://loremflickr.com/800/800/custard,apple,tree?lock=101",
    "Sweet Tamarind": "https://loremflickr.com/800/800/tamarind,tree?lock=102",
    "Fig": "https://loremflickr.com/800/800/fig,tree?lock=103",
    "Pear": "https://loremflickr.com/800/800/pear,tree?lock=104",
    "Jamun": "https://loremflickr.com/800/800/jamun,tree?lock=105",
    "Amla": "https://loremflickr.com/800/800/amla,tree?lock=106",
    "Peach": "https://loremflickr.com/800/800/peach,tree?lock=107",
    "Orange": "https://loremflickr.com/800/800/orange,tree?lock=108",
    "Coconut": "https://loremflickr.com/800/800/coconut,palm,tree?lock=109",
    "Mulberry": "https://loremflickr.com/800/800/mulberry,tree?lock=110"
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

    const newCode = `// Catalog with fixed flickr images for remaining plants.\nexport const plants = ${JSON.stringify(products, null, 2)};\n`;
    fs.writeFileSync(plantsFile, newCode);
    console.log("Successfully patched plants.js with working LoremFlickr static URLs!");
} else {
    console.log("Could not parse JSON");
}
