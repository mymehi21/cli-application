const mysql = require("mysql2");
const fs = require("fs");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  
  // read the file
  const seedSQL = fs.readFileSync("seeds.sql", "utf-8");

  // split the quries
  const queries = seedSQL.split(";");

  // map through all the queries
  queries.forEach((query) => {

    // executing the query
    connection.query(query, (e, r) => {
      if (e) {
        console.error("Error occured:", e);
        return;
      }
    });
  });
});

module.exports = connection;