const mongoose = require('mongoose');

const TokenSchema = mongoose.Schema({
    login: {type: String},
    ip: {type: String}
});

const Token = module.exports = mongoose.model('Token'/*имя таблицы в бд*/, TokenSchema);

module.exports.getToken = function (callback) {
    Token.findOne({ip: "localhost"}).then((foundToken) => {
        callback(null, foundToken);
    });
}

module.exports.saveToken = function (newToken, callback) {
    newToken.save().then(function (result) {
        callback(null, result);
    }).catch(function (err) {
        callback(err, null);
    });
}

module.exports.deleteToken = function (callback) {
    Token.deleteOne({ip: 'localhost'}).then(function (result) {
        callback(null, result);
    }).catch(function (err) {
        callback(err, null);
    });
}