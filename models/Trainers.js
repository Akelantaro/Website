const mongoose = require('mongoose');

const TrainerSchema = mongoose.Schema({
        name: {type: String},
        user: {type: String}
    }
);

const Trainer = module.exports = mongoose.model('Trainers'/*имя таблицы в бд*/, TrainerSchema);

module.exports.getUser = function (trainer, callback) {
    Trainer.findOne({name: trainer}).then((foundToken) => {
        callback(null, foundToken);
    });
}

module.exports.saveTrainer = function (newTrainer, callback) {
    newTrainer.save().then(function (result) {
        callback(null, result);
    }).catch(function (err) {
        callback(err, null);
    });
}

module.exports.addUser = function (trainer, newUser, callback) {
    Trainer.findOneAndUpdate({name: trainer}, {user: newUser}).then(function (result) {
        callback(null, result);
    }).catch(function (err) {
        callback(err, null);
    });
}

module.exports.getTrainer = function (user, callback) {
    Trainer.findOne({user: user}).then((foundToken) => {
        callback(null, foundToken);
    });
}


