var express = require('express');
var router = express.Router();
var knex = require('knex');

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

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;