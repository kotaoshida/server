
const mysql  = require('mysql2');

const db = mysql.createConnection({
  host     : 'localhost',
  user     : "root",
  password : '',
  database : 'socialmedia'
});
module.exports = db;

