const redis = require("redis");
const testPassword = "5iIcSMtpJ95dC4d1Y48bDjvGRQfRMc4r";
const testSocket = {
  host: "redis-14565.c281.us-east-1-2.ec2.redns.redis-cloud.com",
  port: 14565,
};
const client = redis.createClient({
  password: testPassword,
  socket: testSocket,
});

(async () => {
  await client.connect();
})();

client.on("ready", () => {
  console.log("Connected to redis");
});
client.on("error", (error) => {
  console.log(error, "error on redis");
});

module.exports = client;