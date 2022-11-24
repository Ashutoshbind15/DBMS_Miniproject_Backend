import express from "express";
import dotenv from "dotenv";
import mysql from "mysql2";
dotenv.config();

import fs from "fs";

// const seeders = fs.readFileSync("db/seeder.sql", { encoding: "utf-8" });

export const conn = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  port: process.env.MYSQL_PORT,
  multipleStatements: true,
});

conn.connect((err) => {
  if (err) console.log(err);
  else {
    console.log(`Database Connected`);
    // conn.query(seeders, (err, res) => {
    //   if (err) console.log(`Error running the query`, err);
    //   else console.log("Result", res);
    // });
  }
});

const app = express();

app.post("/exam", async (req, res) => {
  const { paper_name, date, taught_by, duration } = req.body;

  const q = `INSERT INTO Exam(paper_name,date,taught_by,duration) values
  (${paper_name},${date},${taught_by},${duration})`;
});

app.get("/exam", async (req, res) => {
  // const { paper_name, date, taught_by, duration } = req.body;

  const q = `SELECT * FROM Exam`;
  conn.query(q, (err, data) => {
    if (err) res.json({ msg: "Error", error: err });
    else res.json(data);
  });
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening to ${PORT} PORT`);
});
