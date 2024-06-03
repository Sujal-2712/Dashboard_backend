require('dotenv').config();
const mysql2 = require('mysql2');

const con = mysql2.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

// Your further code...

function queryDatabase(query,values) {
    return new Promise((resolve, reject) => {
      con.connect(function (err) {
          if(err) reject(err);  
          con.query(query,values,(err,result)=>{
              if(err) reject(err);
  
              resolve(result);
          })
      })
    })
  }

module.exports = {queryDatabase};
