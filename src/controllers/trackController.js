const {addDataToFile} = require('../services/trackService');
const dataFilePath = "data/data.json";
async function addDataController(req,res){
  try {
    const data = req.body;
    await addDataToFile(data, dataFilePath);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
}

module.exports = {addDataController};