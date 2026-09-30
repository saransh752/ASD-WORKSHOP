const {
    readProducts,
    writeProducts
} = require("../database/productDatabase");

async function getAllProducts() {
    return await readProducts();
}

async function getProductById(id) {
    const products = await readProducts();

    return products.find(
        (item) => item.id === id
    );
}

async function createProduct(product) {
    const products = await readProducts();

    products.push(product);

    await writeProducts(products);

    return product;
}

async function updateProduct(id, updatedData) {
    const products = await readProducts();

    const index = products.findIndex(
        (item) => item.id === id
    );

    if (index === -1) {
        return null;
    }

    products[index] = {
        ...products[index],
        ...updatedData,
        id
    };

    await writeProducts(products);

    return products[index];
}

async function deleteProduct(id) {
    const products = await readProducts();

    const index = products.findIndex(
        (item) => item.id === id
    );

    if (index === -1) {
        return null;
    }

    const deletedProduct = products[index];

    products.splice(index, 1);

    await writeProducts(products);

    return deletedProduct;
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};