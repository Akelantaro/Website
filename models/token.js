const mongoose = require('mongoose');

const TokenSchema = mongoose.Schema({
        login: {type: String},
        createdAt: {type: Date, expires: '2h', default: Date.now}
    }
);

const Token = module.exports = mongoose.model('Token'/*имя таблицы в бд*/, TokenSchema);

module.exports.getToken = function (id, callback) {
    Token.findOne({_id: id}).then((foundToken) => {
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

module.exports.deleteToken = function (id, callback) {
    Token.deleteOne({_id: id}).then(function (result) {
        callback(null, result);
    }).catch(function (err) {
        callback(err, null);
    });
}