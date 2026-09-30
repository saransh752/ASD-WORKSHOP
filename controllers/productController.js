const {
    getAllProducts,
    getProductById,
} = require("../services/productService");

async function getProducts(req, res) {
    try {
        const products = await getAllProducts();
        console.log(products);
        res.json(products);
    } catch (err) {
        console.log(err);
    }
}

async function getProductByIdHandler(req, res) {
    try {
        const product = await getProductById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        console.log(product);
        res.json(product);
    } catch (err) {
        console.log(err);
    }
}

module.exports = { getProducts, getProductById: getProductByIdHandler };
