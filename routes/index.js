var express = require('express');
var router = express.Router();

//DB接続クライアントを作成
var client = require('knex')({
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
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//html入力フォームからのデータをDBにPOSTする_登録ボタンのイベント
router.post('/', function(req, res, next) { 
  var title = req.body.title;
  var content = req.body.content;
  client.insert({ title, content: title, content }).into('task')
    .then(function (rows) {console.log(rows[0]);
    })
    .catch(function (error) { console.error(error)
    });
    res.redirect('/'); //リクエスト元にリダイレクトする
});

//DBからGETしたデータをres.renderに渡す_todoページのタスク一覧取得
router.get('/todo', function(req, res, next) {
  knex.select().from('task').then(function(rows) {
    res.render("todo",{title: "todo_app",taskList: rows})
    console.log(rows);
  })
  .catch(function(error) {
    console.error(error)
  });
});

//todoをidで指定してDELETEする_todoページの削除ボタンのイベント
router.post('/todo', function (req, res, next) {
  var id = req.body.id;
  knex('task').where('id',id).del().then(function(rows){
    console.log(rows);
    res.redirect('/todo'); //リクエスト元にリダイレクトする
  })
  .catch(function(error) {
    console.error(error)
  });
});

module.exports = router;
