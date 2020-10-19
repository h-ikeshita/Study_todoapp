var express = require('express');
var router = express.Router();

//DB�ڑ��N���C�A���g���쐬
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

//html���̓t�H�[������̃f�[�^��DB��POST����
router.post('/', function(req, res, next) { 
  var title = req.body.title;
  var content = req.body.content;
  client.insert({ title, content: title, content }).into('task')
    .then(function (rows) {console.log(rows[0]);
    })
    .catch(function (error) { console.error(error)
    });
    res.redirect('/'); //���N�G�X�g���Ƀ��_�C���N�g����
  });
});

//DB����GET�����f�[�^��res.render�ɓn��
router.get('/todo', function(req, res, next) {
  knex.select().from('task').then(function(rows) {
    res.render("todo",{title: "todoapp",taskList: rows})
    console.log(rows);
  })
  .catch(function(error) {
    console.error(error)
  });
});

//todo��id�Ŏw�肵��DELETE����
router.post('/todo', function (req, res, next) {
  var id = req.body.id;
  knex('task').where('id',id).del().then(function(rows){
    console.log(rows);
    res.redirect('/todo'); //���N�G�X�g���Ƀ��_�C���N�g����
  })
  .catch(function(error) {
    console.error(error)
  });
});

module.exports = router;
