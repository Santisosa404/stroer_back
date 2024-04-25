const redisClient = require("../redisConfig");

async function getCount() {
  try {
    const count = await redisClient.get("count");
    return count;
  } catch (error) {
    throw error;
  }
}

module.exports = { getCount };