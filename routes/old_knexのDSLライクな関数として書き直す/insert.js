var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'todoapp'
});

var newTodo = {title: 'todotitle', content: 'todocontent' };
connection.query('INSERT INTO task SET ?', newTodo, (err, res) => {
  if(err) throw err;
 
  console.log('Last insert ID:', res.insertId);
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