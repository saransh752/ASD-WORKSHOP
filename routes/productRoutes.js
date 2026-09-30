const express = require("express");

const {
    getProducts,
    getProduct,
    postProduct,
    putProduct,
    patchProduct,
    removeProduct
} = require("../controllers/productController");

const {
    cacheMiddleware
} = require("../middleware/cache");

const router = express.Router();

router.get("/", cacheMiddleware, getProducts);
router.get("/:id", cacheMiddleware, getProduct);

router.post("/", postProduct);
router.put("/:id", putProduct);
router.patch("/:id", patchProduct);
router.delete("/:id", removeProduct);

module.exports = router;