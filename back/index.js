const express = require("express");
const app = express();
const mysql = require("mysql");

const PORT = process.env.port || 8000;

const cors = require("cors");
const nodemailer = require("nodemailer");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ssunny0203",
  database: "bbs",
});

app.get("/", (req, res) => {
  res.json({ message: "pong" });
});

app.post("/checkDuplicate", (req, res) => {
  const email = req.body.email;
  const username = req.body.username;
  db.query(
    "SELECT * FROM user WHERE email = ? OR username = ?",
    [email, username],
    (error, results) => {
      if (error) {
        console.error(error);
        res
          .status(500)
          .json({ error: "An error occurred while checking for duplicates." });
      } else {
        if (results.length > 0) {
          for (let i = 0; i < results.length; i++) {
            if (results[i].email === email) {
              res.json({ duplicate: "emailDuplicate" });
              return;
            }
            if (results[i].username === username) {
              res.json({ duplicate: "usernameDuplicate" });
              return;
            }
          }
        } else {
          res.json({ duplicate: "noneDuplicate" });
        }
      }
    }
  );
});

app.post("/sendVerificationEmail", async (req, res) => {
  const { email } = req.body;

  const verifyCode = Math.floor(100000 + Math.random() * 900000);
  res.send({ verifyCode });
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "no.reply.ssunnyauth@gmail.com",
      pass: "pokhbrrrugttrptf",
    },
  });

  let mailOptions = {
    from: "no.reply.ssunnyauth@gmail.com",
    to: email,
    subject: "Email Verification",
    text:
      "Your verification code is " +
      verifyCode +
      "\n" +
      "Please enter this code to verify your email address." +
      "\n" +
      "DO NOT reply to this email.",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error while sending email");
    } else {
      console.log("Email sent: " + info.response);
      res.send("Email sent");
    }
  });
});

app.post("/register", (req, res) => {
  const password = req.body.password;
  const username = req.body.username;
  const email = req.body.email;
  const emailVerified = true;

  db.query(
    "INSERT INTO user ( password, username, email,emailVerified) VALUES (?, ?, ?, ?)",
    [password, username, email, emailVerified],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while registering." });
      } else {
        res.status(200).json({ message: "success" });
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
