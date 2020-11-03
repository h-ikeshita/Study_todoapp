var express = require('express');
var router = express.Router();


var passport = require('passport');
LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
router.use(passport.initialize());
router.use(flash());
router.use(passport.session());

//DB接続設定
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
  if(req.session.username){
  res.render("index.ejs");
  }else{
    res.redirect("signin");
  }
});

//フォームの入力情報をDBへ追加。
router.post('/', function (req, res, next) { 
  var title = req.body.title;
  var content = req.body.content;
  knex.insert({ title, content: title, content })
    .into('task')
    .then(function (rows) {
      console.log(rows[0]);
    })
    .catch(function (error) {
      console.error(error)
    });
  res.redirect('/');
});


router.get('/todo', function(req, res, next) {
  if(req.session.username){
  knex
  .select()
  .from('task')
  .then(function(rows) {
    res.render("todo",{title: "TODOアプリ",taskList: rows})
    console.log(rows);
  })
  .catch(function(error) {
    console.error(error)
  });
}else{
  res.redirect("signin");
}
});



router.post('/todo', function (req, res, next) {
  var id = req.body.id;
  knex('task')
  .where('id',id)
  .del()
  .then(function(rows){
    console.log(rows);
    res.redirect('/todo');
  })
  .catch(function(error) {
    console.error(error)
  });
});





module.exports = router;