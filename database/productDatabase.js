const fs = require("fs");
const path = require("path");

const pathToFile = path.join(__dirname, "..", "code.json");

async function readProducts() {
    const data = await fs.promises.readFile(
        pathToFile,
        "utf8"
    );

    return JSON.parse(data);
}

async function writeProducts(products) {
    await fs.promises.writeFile(
        pathToFile,
        JSON.stringify(products, null, 2),
        "utf8"
    );

    return products;
}

module.exports = {
    readProducts,
    writeProducts
};