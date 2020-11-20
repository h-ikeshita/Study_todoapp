var passport = require("passport");
var express = require('express');
var router = express.Router();
var LocalStrategy = require("passport-local").Strategy;
var initialize, authenticate, authorize;
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

//シリアライズ
passport.serializeUser((user_name, done) => {
    done(null, user_name);
});

//デシリアライズ
passport.deserializeUser((user_name, done) => {
    done(null, user_name);
});

//認証処理の実体
passport.use(
    "local-strategy",
    new LocalStrategy(
        {
            usernameField: "username",
            passwordField: "password",
            passReqToCallback: true,
        },
        (req, user_name, password, done) => {
            knex("users")
                .where({ user_name, password: user_name, password })
                .then(function (rows) {
                    //成功
                    if (rows.length !== 0) {
                        req.session.user_name = user_name;
                        req.session.user_id = rows[0].id;
                        done(null, user_name);
                    } else {
                        done(
                            null,
                            false,
                            req.flash(
                                "message",
                                "ユーザー名 または パスワード が間違っています。"
                            )
                        );
                    }
                });
        }
    )
);

initialize = function () {
    return [
        passport.initialize(),
        passport.session()
    ];
};


authenticate = function () {
    return passport.authenticate(
        "local-strategy", {
        successRedirect: "/",
        failureRedirect: "/login"
    }
    );
};




module.exports = {
    initialize,
    authenticate,
    authorize,
    router
};