const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "Hemtenta4",
});

connection.connect((err) => {
    if (err) {
      console.error("Kunde inte ansluta till databasen: " + err.stack);
      return;
    }

    console.log("Ansluten till databasen med ID " + connection.threadId);
});

app.post("/booking/finish", (req, res) => {
  const { FirstName, LastName, email, phone, date } = req.body;

  connection.query(
    "INSERT INTO personer (FirstName, LastName, email, phone, date) VALUES (?, ?, ?, ?, ?)",
    [FirstName, LastName, email, phone, date],
    (error, results, fields) => {
      if (error) {
        console.error("Fel vid fråga till databasen: " + error.stack);
        return;
      }

      res.json(results);
    }
  );
});

app.listen(port, () => {
  console.log(`Servern lyssnar på port ${port}`);
});
