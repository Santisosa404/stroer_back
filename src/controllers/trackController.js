const {addDataToFile} = require('../services/trackService');

async function addDataController(req,res){
  try {
    const data = req.body;
    await addDataToFile(data);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
}

module.exports = {addDataController};