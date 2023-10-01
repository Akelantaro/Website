const express = require('express');
const router = express.Router();
const Group1 = require('../models/groupprograms1');
const Group2 = require('../models/groupprograms2');
const Group3 = require('../models/groupprograms3');
const Group = [Group1, Group2, Group3];
const GroupLength = Group.length - 1;

router.post('/recordProgram', (req, res) => {
    const number = req.body.number;
    const msg = "Вы записались на тренировку";
    const newLogin = new Group[number]({
        login: req.body.login
    })
    Group[number].saveLogin(newLogin, (err, saved) => {
        if (err) console.log(err)
        if (saved) res.json({success: true, msg: msg})
    })
})

router.post('/programRecordCheck', (req, res) => {
    login = req.body.login;
    let number = [false, false, false];
    let i = 0;

    function Check(i) {
        if (i <= GroupLength) Group[i].getLogin(login, (err, findLogin) => {
            if (err) console.log(err)
            if (findLogin) number[i] = true;
            i++;
            Check(i);
        })
        else res.json({msg: number})
    }

    Check(i);
})

router.get('/programNumbers', (req, res) => {
    let number = [0, 0, 0];
    let i = 0;

    function Check(i) {
        if (i <= GroupLength) {
            Group[i].getNumbers((err, found) => {
                if (err) console.log(err)
                if (found) number[i] = found
                i++;
                Check(i);
            })
        } else res.json({msg: number})
    }

    Check(i);
})

router.post('/removeProgram', (req, res) => {
    const msg = "Вы отменили запись";
    Group[req.body.number].removeLogin(req.body.user, (err, result) => {
        if (err) console.log(err);
        if (result) res.json({msg: msg});
    })
})

module.exports = router;