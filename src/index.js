const express = require("express");
const redis = require("redis");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();

// In order to make it quicker I have declare this variables here. It would be nicer by having it on a .env file
const PORT = 3000;
const dataFilePath = "data/data.json";
const testPassword = "5iIcSMtpJ95dC4d1Y48bDjvGRQfRMc4r";
const testSocket = {
    host: "redis-14565.c281.us-east-1-2.ec2.redns.redis-cloud.com",
    port: 14565,
  }
const client = redis.createClient({
  password: testPassword,
  socket: testSocket,
});

(async () => {
  await client.connect();
})();

app.use(bodyParser.json());
app.listen(PORT, () => {
  console.log(`Ströer technical test running on port: ${PORT}`);
});

client.on("ready", () => {
  console.log("Connected to redis");
});
client.on("error", (error) => {
  console.log(error, "error on redis");
});

app.post("/track", async (req, res) => {
  try {
    const data = req.body;
    await addDataToFile(data);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

app.get("/count", async (req, res) => {
  try {
    const count = await client.get("count");
    console.log(count);
    if (count) {
      res.status(200).json({ count: count });
    }
  } catch (error) {
    res.sendStatus(400);
    console.log(error, "Error");
  }
});

function readFile() {
  try {
    const existingData = JSON.parse(fs.readFileSync(dataFilePath));
    return existingData;
  } catch (error) {
    throw error;
  }
}

async function addDataToFile(data) {
  try {
    const readedFile = readFile();
    if (data.count) {
      await updateCount(data.count);
    }
    let newData = {
      oldTracks: readedFile.oldTracks
        ? [...readedFile.oldTracks, readedFile.newTrack]
        : [],
      newTrack: data,
    };
    fs.writeFileSync(dataFilePath, JSON.stringify(newData));
  } catch (error) {
    throw error;
  }
}

async function updateCount(count) {
  client.incrBy("count", count);
}
