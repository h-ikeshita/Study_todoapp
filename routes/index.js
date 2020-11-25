var express = require('express');
var router = express.Router();
var { authenticate } = require("./login");

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

/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.session.user_name) {
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