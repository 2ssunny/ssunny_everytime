const express = require("express");
const app = express();
const mysql = require("mysql");
const multer = require("multer");
const path = require("path");
const morgan = require("morgan");

const PORT = process.env.port || 8000;

const cors = require("cors");
const nodemailer = require("nodemailer");
const fs = require("fs").promises;

require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
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
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  let mailOptions = {
    from: process.env.EMAIL_USER,
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
      res.status(500).send("Error while sending email");
    } else {
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
    "SELECT BOARD_ID, BOARD_TITLE, REGISTER_ID, DATE_FORMAT(REGISTER_DATE, '%Y-%m-%d') AS REGISTER_DATE FROM board;";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const originalNameWithoutExtension = path.parse(file.originalname).name;
    const extension = path.parse(file.originalname).ext;
    cb(null, originalNameWithoutExtension + "-" + uniqueSuffix + extension);
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
app.get("/board/:id", (req, res) => {
  const boardId = req.params.id;
  db.query(
    "SELECT BOARD_TITLE, BOARD_CONTENT, REGISTER_ID, REGISTER_DATE, DATE_FORMAT(REGISTER_DATE, '%Y-%m-%d %T') AS REGISTER_DATE, FILES FROM board WHERE BOARD_ID = ?",
    [boardId],
    (error, results) => {
      if (error) {
        console.error("Error executing query: ", error);
        res
          .status(500)
          .json({ error: "An error occurred while fetching data" });
      } else {
        if (results.length === 0) {
          res.status(404).json({ error: "No board found" });
        } else {
          const result = results[0];
          const files = JSON.parse(result.FILES);
          const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp"];
          const imageIndexes = [];

          files.forEach((file, index) => {
            const extension = file.split(".").pop().toLowerCase();
            if (imageExtensions.includes(extension)) {
              imageIndexes.push(index);
            }
          });

          result.imageIndexes = imageIndexes;
          res.status(200).json(result);
        }
      }
    }
  );
});

app.get("/download/:filename", function (req, res) {
  const filename = req.params.filename;
  const fileDirectory = path.resolve(__dirname, "uploads");
  const filePath = path.join(fileDirectory, filename);

  res.download(filePath, filename, function (err) {
    if (err) {
      res.status(500).send("File download failed.");
    } else {
    }
  });
});

app.delete("/boardDelete/:id", async (req, res) => {
  const id = req.params.id;

  db.query(
    "SELECT FILES FROM board WHERE BOARD_ID = ?",
    [id],
    (error, results) => {
      if (error) {
        console.error(error);
        res
          .status(500)
          .json({ error: "An error occurred while retrieving file names" });
      } else {
        const files = JSON.parse(results[0].FILES);
        Promise.all(
          files.map((file) => fs.unlink(path.join(__dirname, "uploads", file)))
        )
          .then(() => {
            db.query(
              "DELETE FROM board WHERE BOARD_ID = ?",
              [id],
              (error, results) => {
                if (error) {
                  console.error(error);
                  res
                    .status(500)
                    .json({ error: "An error occurred while deleting post" });
                } else {
                  res.status(200).json({ message: "success" });
                }
              }
            );
          })
          .catch((err) => {
            console.error(err);
            res
              .status(500)
              .json({ error: "An error occurred while deleting files" });
          });
      }
    }
  );
});
