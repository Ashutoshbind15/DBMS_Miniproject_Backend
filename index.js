import express from "express";
import dotenv from "dotenv";
import mysql from "mysql2";
dotenv.config();
import cors from "cors";

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
    // conn.query("DROP ", (err, res) => {
    //   if (err) console.log(`Error running the query`, err);
    //   else console.log("Result", res);
    // });
  }
});

const app = express();

app.use(cors());
app.use(express.json());

app.get("/exam", async (req, res) => {
  const q = `SELECT A.id, A.department_id, A.duration, A.date, A.instructions, A.requirements,
  T.name as settername, D.name as dept_name, A.subject_id, A.start, A.end,
  B.title FROM Exam A 
  INNER JOIN Subject B ON A.subject_id = B.course_id
  INNER JOIN Teacher T ON A.setter_id = T.id
  INNER JOIN Department D ON A.department_id = D.id
  `;

  conn.query(q, (err, data) => {
    if (err) {
      console.log(err);
      res.status(400).json({ msg: "Something went wrong" });
    } else {
      res.status(200).json(data);
    }
  });
});

app.post("/teacher", async (req, res) => {
  const { id, name, contact, email, department_id } = req.body;

  console.log(req.body);

  const q = `INSERT INTO Teacher(id,name,contact,email,department_id) values
  (${id},'${name}',${+contact},'${email}',${+department_id});`;

  console.log(q);
  conn.query(q, (err, data) => {
    if (err) console.log(err);
    console.log(data);
    res.status(201).json(data);
  });
});

app.get("/exam", async (req, res) => {
  const q = `SELECT * FROM Exam`;
  conn.query(q, (err, data) => {
    if (err) res.json({ msg: "Error", error: err });
    else res.json(data);
  });
});

app.post("/exam", async (req, res) => {
  const { currSubid, currTeacherId, deptId, ins, reqd, start, end, duration } =
    req.body;
  console.log(req.body);

  const q = `INSERT INTO Exam(subject_id,setter_id,department_id) 
  VALUES (${currSubid},${currTeacherId},${deptId});`;

  conn.query(q, (err, data) => {
    if (err) res.json({ msg: "Error", error: err });
    else res.json(data);
  });
});

app.get("/department", async (req, res) => {
  const q = `SELECT * FROM Department`;
  conn.query(q, (err, data) => {
    if (err) res.json({ msg: "Error", error: err });
    else res.json(data);
  });
});

app.get("/subject", async (req, res) => {
  const q = `SELECT * from Subject`;
  conn.query(q, (err, data) => {
    if (err) res.json({ msg: "Error", error: err });
    else res.json(data);
  });
});

app.get("/teacher", async (req, res) => {
  const q = `SELECT * from Teacher`;
  conn.query(q, (err, data) => {
    if (err) res.json({ msg: "Error", error: err });
    else res.json(data);
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening to ${PORT} PORT`);
});
