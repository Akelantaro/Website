const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Token = require('../models/token');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/db');

router.post('/reg', (req, res) => {
    let newUser = new User({
        login: req.body.login,
        password: req.body.password
    });
    User.getUserByLogin(newUser.login, (err, check) => {
        if (err) {
            console.log(err);
        }
        if (check) {
            res.json({success: false, msg: "Имя пользователя " + check.login + " занято"});
        } else {
            User.addUser(newUser, (err, user) => {
                if (err) {
                    console.log(err);
                    res.json({success: false, msg: "Пользователь не был добавлен"});
                }
                if (user) {
                    res.json({success: true});
                }
            });
        }
    });
});

router.post('/auth', (req, res) => {
    Token.getToken((err, token) => {
        if (err) console.log(err);
        if (token) res.json({success: false, msg: "Пользователь уже авторизован" + token.login});
        else {
            const login = req.body.login;
            const password = req.body.password;
            let newToken = new Token({
                login: login,
                ip: "localhost"
            })
            User.getUserByLogin(login, (err, check) => {
                if (err) console.log(err);
                if (!check) res.json({success: false, msg: "Имя пользователя не найдено"});
                else if (check.password !== password) res.json({success: false, msg: "Неверный пароль"});
                else Token.saveToken(newToken, (err, token) => {
                        if (err) console.log(err);
                        if (token) res.json({success: true});
                    })
            })
        }
    })
})

router.get('/logout', (req, res) => {
    Token.getToken((err, token) => {
        if (err) console.log(err);
        if (!token) res.json({success: false, msg: "Пользователь не авторизован"});
        else {
            Token.deleteToken((err, success) => {
                if (err) console.log(err)
                if (success) res.json({success: true});
            })
        }
    })
})

router.get('/token', (req, res) => {
    Token.getToken((err, token) => {
        if (err) console.log(err);
        if (token) res.json({success: true, msg: token.login});
        else res.json({success: false});
    })
})
/*router.post('/auth', (req, res) => {
    const login = req.body.login;
    const password = req.body.password;

    User.getUserByLogin(login, (err, user) => {
        if (err) throw err;
        if (!user)
            return res.json({success: false, msg: "Такой пользователь не был найден"});

        User.comparePass(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign(user, config.secret, {
                    expiresIn: 3600 * 24
                });

                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        login: user.login,
                        email: user.email
                    }
                });
            } else
                return res.json({success: false, msg: "Пароли не совпадают"});
        });
    });
});*/

router.get('/dashboard', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.send('страница пользователя');
});

module.exports = router;
