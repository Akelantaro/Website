const express = require('express');
const router = express.Router();
const Trainer = require('../models/Trainers');

router.post('/addTrainers', (req, res) => {
    let message = ""
    let i = 0
    const trainers = req.body.trainers
    const length = trainers.length - 1;

    function add(i) {
        if (i <= length) {
            const newTrainer = new Trainer(
                {
                    name: trainers[i],
                    user: ""
                });
            Trainer.saveTrainer(newTrainer, (err, success) => {
                if (err) console.log(err)
                if (success) {
                    message += trainers[i] + " добавлен \n";
                    i++
                    add(i)
                }
            })
        } else res.json({msg: message});
    }

    Trainer.getUser(req.body.trainers[0], (err, success) => {
        if (err) console.log(err)
        if (success) res.json({msg: "Тренеры уже добавлены"})
        else add(i)
    })
})

router.post('/RecordTrainer', (req, res) => {
    Trainer.addUser(req.body.trainer, req.body.user, (err, find) => {
        if (err) console.log(err)
        if (find) res.json({msg: "Вы записались к тренеру"})
    })
})

router.post('/getTrainers', (req, res) => {
    let number = [false, false, false, false];
    let i = 0;
    const length = req.body.trainers.length - 1;
    const trainers = req.body.trainers

    function get(i) {
        if (i <= length) {
            Trainer.getUser(trainers[i], (err, find) => {
                if (err) console.log(err)
                if (find.user) number[i] = true
                i++
                get(i)
            })
        } else res.json({msg: number})
    }

    get(i)
})

router.post('/trainerRecordCheck', (req, res) => {
    Trainer.getTrainer(req.body.user, (err, find) => {
        if (err) console.log(err)
        if (find) res.json({success: true, msg: find.name})
        else res.json({success: false})
    })
})

router.post('/removeTrainer', (req, res) => {
    const msg = "Вы отменили запись";
    Trainer.addUser(req.body.trainer, "", (err, success) => {
        if (err) console.log(err)
        if (success) res.json({msg: msg})
    })
})

module.exports = router;
