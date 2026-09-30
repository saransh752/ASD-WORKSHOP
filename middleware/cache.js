const cache = new Map();

const TTL = 60 * 1000; 

function cacheMiddleware(req, res, next) {
    const key = req.originalUrl;

    const cachedData = cache.get(key);

    if (cachedData) {
        const age = Date.now() - cachedData.createdAt;
        if (age < TTL) {
            console.log("Cache hit");

            res.set("X-Cache", "HIT");

            return res.json(cachedData.data);
        }

        console.log("Cache expired");

        cache.delete(key);
    }

    console.log("Cache miss");

    res.set("X-Cache", "MISS");

    const originalJson = res.json.bind(res);

    res.json = (data) => {
        cache.set(key, {
            data: data,
            createdAt: Date.now()
        });

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



