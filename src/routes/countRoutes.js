const express = require("express");
const  {getCountController} = require('../controllers/countController');

const router = express.Router();

router.get("/", getCountController);

module.exports = router;