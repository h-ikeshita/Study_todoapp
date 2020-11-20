var express = require('express');
var router = express.Router();
var { authenticate } = require("./login");

var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'profileapp'
  },
  useNullAsDefault: true
});

/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.session.username) {
    res.render('index', { user_name: req.session.user_name });
  } else {
    res.redirect("login");
  }
});

//フォームの入力内容をポスト
router.post('/', function (req, res, next) {
  var title = req.body.title;
  var content = req.body.content;
  knex.insert({ title, content: title, content })
    .into('task')
    .then(function (rows) {
    })
    .catch(function (error) {
      console.error(error)
    });
  res.redirect('/');
});

//タスク一覧を取得
router.get('/todo', function (req, res, next) {
  if (req.session.username) {
    knex
      .select()
      .from('task')
      .then(function (rows) {
        res.render("todo", { title: "TODOアプリ", taskList: rows })
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
router.post('/todo', function (req, res, next) {
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

//ログイン
router.get("/login", (req, res, next) => {
  res.render("login", { message: req.flash("message"), user_name: req.session.user_name });
});

router.post("/login", authenticate());

//ログアウト
router.get("/logout", function (req, res, next) {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("login");
    }
  });
});

module.exports = router;