const { getCount } = require("../services/countService");
const client = require("../redisConfig");

async function getCountController(req, res) {
  try {
    const count = await getCount();
    if (count) {
      res.status(200).json({ count: count });
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
 async function updateCount(count) {
   client.incrBy("count", count);
 }

module.exports = { getCountController, updateCount };
