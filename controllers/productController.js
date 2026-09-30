const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require("../services/productService");

const { clearCache } = require("../middleware/cache");

async function getProducts(req, res) {
    try {
        const products = await getAllProducts();

        res.json(products);
    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

async function getProduct(req, res) {
    try {
        const id = Number(req.params.id);

        const product = await getProductById(id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json(product);
    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

async function postProduct(req, res) {
    try {
        const product = await createProduct(req.body)
        clearCache();

        res.status(201).json(product);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

async function putProduct(req, res) {
    try {
        const id = Number(req.params.id);

        const product = await updateProduct(
            id,
            req.body
        );

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }
        clearCache();
        res.json(product);

    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

async function patchProduct(req, res) {
    try {
        const id = Number(req.params.id);
        const product = await updateProduct(
            id,
            req.body
        );

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }
        clearCache();

        res.json(product);
    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

async function removeProduct(req, res) {
    try {
        const id = Number(req.params.id);

        const product = await deleteProduct(id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        clearCache();

        res.json(product);
    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

module.exports = {
    getProducts,
    getProduct,
    postProduct,
    putProduct,
    patchProduct,
    removeProduct
};