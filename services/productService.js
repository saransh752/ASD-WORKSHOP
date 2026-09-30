const { readProducts } = require("../database/productDatabase");

async function getAllProducts() {
    return readProducts();
}

async function getProductById(id) {
    const products = await readProducts();
    const numericId = Number(id);
    return products.find((item) => item.id === numericId);
}

module.exports = { getAllProducts, getProductById };
