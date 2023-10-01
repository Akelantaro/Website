const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    login: {
        type: String
    },
    password: {
        type: String
    }
});

const User = module.exports = mongoose.model('Users'/*имя таблицы в бд*/, UserSchema);

module.exports.getUserByLogin = function (login, callback) {
    const query = {login: login};
    User.findOne(query).then((foundUser) => {
        callback(null, foundUser);
    });
};

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
};

module.exports.addUser = function (newUser, callback) {
    newUser.save().then(function (result) {
        callback(null, result);
    }).catch(function (err) {
        callback(err, null);
    });
};
