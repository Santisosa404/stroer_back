const {updateCount} = require("../controllers/countController");
const fs = require("fs");

function readFile(dataFilePath) {
  try {
    const existingData = JSON.parse(fs.readFileSync(dataFilePath));
    return existingData;
  } catch (error) {
    throw error;
  }
}

async function addDataToFile(data, dataFilePath) {
  try {
    const readedFile = readFile(dataFilePath);
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

module.exports = { addDataToFile };
