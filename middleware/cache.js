const cache = new Map();

function cacheMiddleware(req, res, next) {
    const key = req.originalUrl;

    if (cache.has(key)) {
        console.log("Cache hit");

        res.set("X-Cache", "HIT");

        return res.json(cache.get(key));
    }

    console.log("Cache miss");

    res.set("X-Cache", "MISS");

    const originalJson = res.json.bind(res);

    res.json = (data) => {
        cache.set(key, data);

        return originalJson(data);
    };

    next();
}

function clearCache() {
    cache.clear();
    console.log("Cache invalidated");
}

module.exports = {
    cacheMiddleware,
    clearCache
};