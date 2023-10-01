const mongoose = require('mongoose');

const ProgramSchema = mongoose.Schema({
    login: {type: String}
});

const Program = module.exports = mongoose.model('Program2'/*имя таблицы в бд*/, ProgramSchema);

module.exports.getLogin = function (login, callback) {
    Program.findOne({login: login}).then((foundToken) => {
        callback(null, foundToken);
    });
}

module.exports.saveLogin = function (newLogin, callback) {
    newLogin.save().then(function (result) {
        callback(null, result);
    }).catch(function (err) {
        callback(err, null);
    });
}

module.exports.getNumbers = function (callback) {
    Program.countDocuments({}).then(function (result) {
        callback(null, result);
    }).catch(function (err) {
        callback(err, null);
    });
}

module.exports.removeLogin = function (login, callback) {
    Program.findOneAndRemove({login: login}).then(function (result) {
        callback(null, result);
    }).catch(function (err) {
        callback(err, null);
    });
}