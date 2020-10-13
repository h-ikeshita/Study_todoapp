var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'todoapp'
});

connection.query(
  'DELETE FROM task WHERE id = ?', [1], (err, result) => {
    if (err) throw err;
 
    console.log(`Deleted ${result.affectedRows} row(s)`);
  }
);

var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'todoapp'
}); 

module.exports = router;