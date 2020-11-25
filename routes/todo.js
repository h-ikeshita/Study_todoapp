var express = require('express');
var router = express.Router();

var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'todoapp'
  },
  useNullAsDefault: true
});

//タスク一覧を取得
router.get('/', function (req, res, next) {
  if (req.session.user_name) {
    knex
      .select()
      .from('task')
      .then(function (rows) {
        res.render("todo", { title: "TODOアプリ", taskList: rows ,user_name: req.session.user_name})
        console.log(rows);
      })
      .catch(function (error) {
        console.error(error)
      });
  } else {
    res.redirect("login");
  }
});

//タスクを削除
router.post('/', function (req, res, next) {
  var id = req.body.id;
  knex('task')
    .where('id', id)
    .del()//rowごと削除
    .then(function (rows) {
      console.log(rows);
      res.redirect('/todo');
    })
    .catch(function (error) {
      console.error(error)
    });
});

module.exports = router;