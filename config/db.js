
const mysql  = require('mysql2');

const db = mysql.createConnection({
  host     : 'db',
  user     : "root",
  password : '',
  database : 'socialmedia'
});
module.exports = db;

