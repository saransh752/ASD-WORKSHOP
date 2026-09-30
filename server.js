const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

const pathToFile = path.join(__dirname, "code.json");

function readFile() {
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            try {
                const data = await fs.promises.readFile(pathToFile, "utf8");
                resolve(data);
            } catch (err) {
                reject(err);
            }
        }, 1500);
    });
}

app.get("/products", async (req, res) => {
    try {
        const data = await readFile();

        const products = JSON.parse(data);

        console.log(products);
        res.json(products);

    } catch (err) {
        console.log(err);
       
    }
});

app.get("/products/:id", async (req, res) => {
    try {
        const data = await readFile();

        const products = JSON.parse(data);

        const id = Number(req.params.id);

        const product = products.find(
            (item) => item.id === id
        );

        console.log(product);
        res.json(product);

    } catch (err) {
        console.log(err);
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});


