const fs = require("fs");
const path = require("path");

const pathToFile = path.join(__dirname, "..", "code.json");

let cache = null;

function readProducts() {
    return new Promise((resolve, reject) => {
        if (cache !== null) {
            console.log("Cache hit");
            return resolve(cache);
        }

        console.log("Cache miss");

        setTimeout(async () => {
            try {
                const data = await fs.promises.readFile(pathToFile, "utf8");
                cache = JSON.parse(data);
                resolve(cache);
            } catch (err) {
                reject(err);
            }
        }, 1500);
    });
}

module.exports = { readProducts };
