require('dotenv').config()

const express = require("express");
const app = express();
const cors = require("cors");
require("./db/db");
const router = require("./routes/routersPath");

const PORT = process.env.PORT || 3000

app.use(express.json());
app.use(cors());
app.use(router);
app.use(express.static('public'))

app.listen(PORT, () => {
  console.log(`Listening to the port no ${PORT}`);
});
