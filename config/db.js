
const mysql  = require('mysql2');


const db = mysql.createPool({
  host     : 'us-cdbr-east-03.cleardb.com',
  user     : "bcbf2f50393783",
  password : 'bfba75fe',
  database : 'heroku_2e61eac4ce8e0a7'
});
module.exports = db;

