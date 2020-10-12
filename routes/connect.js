var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'todoapp'
});

connection.connect((err) => {
  if (err) {
    console.log('error connecting: ' + err.stack);
    return;
  }
  console.log('success');
});

router.get('/', (req, res) => {
  connection.query(
    'SELECT * FROM task',
    (error, results) => {
      console.log(results);
      res.render('hello.ejs');
    }
  );
});

module.exports = router;