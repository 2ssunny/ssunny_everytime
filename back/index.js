const express = require("express");
const app = express();
const mysql = require("mysql");

const PORT = process.env.port || 8000;

const cors = require("cors");

app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ssunny0203",
  database: "bbs",
});

app.get("/", (req, res) => {
  res.json({ message: "pong" });
});

app.post("/register", (req, res) => {
  const { password, username, email, emailVerified } = req.query;
  const sqlInsert = `INSERT INTO user ('password', 'username', 'email, 'emailVerified') VALUES ('${password}', '${username}', '${email}', '${emailVerified}')`;
  db.query(sqlInsert, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
