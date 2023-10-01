const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Token = require('../models/token');
const Trainer = require('../models/Trainers');

router.post('/registration', (req, res) => {
    let newUser = new User({
        login: req.body.login,
        password: req.body.password
    });
    User.getUserByLogin(newUser.login, (err, check) => {
        if (err) console.log(err);
        if (check) res.json({success: false, msg: "Имя пользователя " + check.login + " занято"});
        else User.addUser(newUser, (err, user) => {
            if (err) {
                console.log(err);
                res.json({success: false, msg: "Пользователь " + newUser.login + " не был добавлен"});
            }
            if (user) res.json({success: true, msg: "Пользователь " + newUser.login + " успешно зарегистрирован"});
        });
    });
});

router.post('/authentication', (req, res) => {
    Token.getToken(req.cookies.sessionId, (err, token) => {
        if (err) console.log(err);
        if (token) res.json({success: false, msg: "Пользователь " + token.login + " уже авторизован"});
        else {
            const login = req.body.login;
            const password = req.body.password;
            User.getUserByLogin(login, (err, check) => {
                if (err) console.log(err);
                if (!check) res.json({success: false, msg: "Имя пользователя " + login + " не найдено"});
                else if (check.password !== password) res.json({success: false, msg: "Неверный пароль"});
                else {
                    let newToken = new Token({
                        login: login
                    })
                    Token.saveToken(newToken, (err, token) => {
                        if (err) console.log(err);
                        res.cookie("sessionId", token._id.toString());
                        if (token) res.json({success: true, msg: "Пользователь " + login + " успешно авторизирован"});
                    })
                }
            })
        }
    })
})

router.get('/logout', (req, res) => {
    Token.getToken(req.cookies.sessionId, (err, token) => {
        if (err) console.log(err);
        if (!token) res.json({success: false, msg: "Пользователь не авторизован"});
        else Token.deleteToken(req.cookies.sessionId, (err, success) => {
            if (err) console.log(err)
            if (success) res.json({success: true, msg: "Вы вышли из учетной записи"});
        })
    })
})

router.get('/token', (req, res) => {
    if (!req.cookies.sessionId) res.json({success: false});
    else Token.getToken(req.cookies.sessionId, (err, token) => {
        if (err) console.log(err);
        if (token) res.json({success: true, msg: token.login});
        else res.json({success: false});
    })
})


module.exports = router;
