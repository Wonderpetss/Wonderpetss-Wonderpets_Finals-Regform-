const express = require("express");
const app = express();
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());

app.use(cors());

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "9889",
    database: "db_regform",
  });
  
connection.connect((err) =>{
    if(err) throw err;
    console.log('Mysql Connected...');
  });

  app.post('/data', (req, res) => {
    const { fname, lname, email, cpnum, address, choice, reason } = req.body;

  // insert to database
  connection.query(
    "INSERT INTO tbl_studinfo1 (f_name, l_name, email, phn_number, address, old_std, reason) VALUES (?,?,?,?, ?, ?, ?)",
    [fname, lname, email, cpnum, address, choice, reason ],
    (err, results) => {
      try {
        if (results.affectedRows > 0) {
          res.json({ message: "Data has been added!" });
        } else {
          res.json({ message: "Something went wrong!" });
        }
      } catch (err) {
        res.json({ message: err });
      }
    }
  );
  });

  app.get('/data',(req, res) => {
    connection.query(
      "SELECT * FROM tbl_studinfo1 WHERE email = ?", [req.query.email],
      (err, results) => {
        try {
          if (results.length > 0) {
            res.json('Exists');
          } else {
            res.json('does not exist');
          }
        } catch (err) {
          res.json({ message: err });
        }
      }
    );
  });
   
  app.listen(5000, () => {
    console.log("Server running successfully on 5000");
  });
   