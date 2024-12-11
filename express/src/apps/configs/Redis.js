const SetupRedis = require("ioredis");
const r = new SetupRedis();

class Redis {
	async GetCache(key) {
		const data = await r.get(key);
		return data ? JSON.parse(data) : null;
	}

	async SetCache(key, data, expiration = 3600) {
		await r.setex(key, expiration, JSON.stringify(data));
	}
}

module.exports = Redis;
