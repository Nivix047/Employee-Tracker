const mysql = require("mysql2");
require("dotenv").config();

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: process.env.DB_PW,
    database: "employee_tracker",
  },
  console.log("Connect employee_tracker database.")
);

module.exports = db;
