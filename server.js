const express = require("express");
const fs = require("fs");

const app = express();

app.get("/products", (req, res) => {
    fs.readFile("code.json", "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({
                error: "Unable to read file"
            });
        }

        const products = JSON.parse(data);
        res.json(products);
    });
});



app.listen(3000, () => {
    console.log("Server running on port");
});