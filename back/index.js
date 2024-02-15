const express = require("express");
const app = express();
const mysql = require("mysql");

const PORT = process.env.port || 8000;

const cors = require("cors");

app.use(cors());

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "ssunny0203",
  database: "bbs",
});

app.get("/", (req, res) => {
  res.json({ message: "pong" });
});

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
