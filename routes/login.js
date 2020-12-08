var passport = require("passport");
var express = require('express');
var router = express.Router();
const bcrypt = require("bcrypt");
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

router.get("/", (req, res) => {
    res.render("signin", { message: req.flash("message"), user_name: req.session.username });
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
                .where({ user_name: user_name })
                .then(async function (rows) {
                    const comparedPassword = await bcrypt.compare(password, rows[0].password);
                    if (!comparedPassword) {
                        done(
                            null,
                            false,
                            req.flash(
                                "message",
                                "ユーザー名 または パスワード が間違っています。"
                            )
                        );
                    } else {
                        req.session.user_name = user_name;
                        req.session.user_id = rows[0].id;
                        done(null, user_name);

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

router.post("/", authenticate());



module.exports = {
    initialize,
    authenticate,
    authorize,
    router
};