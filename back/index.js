const express = require("express");
const app = express();
const mysql = require("mysql");
const multer = require("multer");
const path = require("path");

const PORT = process.env.port || 8000;

const cors = require("cors");
const nodemailer = require("nodemailer");

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});

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

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query("SELECT * FROM user WHERE email = ?", [email], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred while logging in." });
    } else {
      if (results.length > 0) {
        const user = results[0];
        if (user.password === password) {
          res.status(200).json({ message: "success", username: user.username });
        } else {
          res
            .status(200)
            .json({ message: "failure", reason: "Invalid password" });
        }
      } else {
        res.status(200).json({ message: "failure", reason: "Invalid email" });
      }
    }
  });
});

app.get("/boardList", (req, res) => {
  const sqlQuery =
    "SELECT BOARD_ID, BOARD_TITLE, REGISTER_ID, DATE_FORMAT(REGISTER_DATE, '%Y-%m-%d') AS REGISTER_DATE FROM BOARD;";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

app.post("/boardUpload", upload.array("files", 5), (req, res) => {
  const title = req.body.title;
  const body = req.body.body;
  const username = req.body.username;

  const fileNames = req.files.map((file) => file.filename);

  db.query(
    "INSERT INTO board (BOARD_TITLE, BOARD_CONTENT, REGISTER_ID, FILES) VALUES (?, ?, ?, ?)",
    [title, body, username, JSON.stringify(fileNames)],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while uploading" });
      } else {
        res.status(200).json({ message: "success" });
      }
    }
  );
});
