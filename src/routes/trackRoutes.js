const express = require("express");
const {addDataController} = require("../controllers/trackController");

const router = express.Router();

router.post("/", addDataController);

module.exports = router;