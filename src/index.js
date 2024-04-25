const express = require("express");
const bodyParser = require("body-parser");

const trackRoutes = require("./routes/trackRoutes");
const countRoutes = require("./routes/countRoutes");

const app = express();

const PORT = 3000;

app.use(bodyParser.json());
app.use("/track", trackRoutes);
app.use("/count", countRoutes);
app.listen(PORT, () => {
  console.log(`Ströer technical test running on port: ${PORT}`);
});
