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
const bcrypt = require("bcrypt");



router.get('/', function (req, res, next) {
    res.render('signup', {
        title: '新規会員登録',
        user_name: req.session.user_name
    });
});

router.post('/', async function (req, res, next) {
    var user_name = req.body.username;
    var password = req.body.password;
    var confirm = req.body.confirm;

    //バリデート処理
    if (password !== confirm) {
        res.render('signup', {
            title: "新規会員登録",
            pass: 'パスワードが一致しません'
        });
        return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    knex.insert({ user_name: user_name, password: hashedPassword }).into('users').then(function (rows) {
        //メインページにリダイレクト
        res.redirect('/');
        console.log(rows[0]);
    })

        .catch(function (error) {

            console.error(error)
        });

});



module.exports = router;