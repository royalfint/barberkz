var mongoose              = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");

var MasterSchema = new mongoose.Schema({
    username: String,
    password: String,
    name: String,
    status: Number,
    schedule: [
        {
            date: Date,
            started: Date,
            ended: Date
        }
    ]
});

var options = {
    errorMessages: {
        MissingPasswordError: 'Введите ваш пароль!',
        AttemptTooSoonError: 'Account is currently locked. Try again later',
        TooManyAttemptsError: 'Account locked due to too many failed login attempts',
        NoSaltValueStoredError: 'Authentication not possible. No salt value stored',
        IncorrectPasswordError: 'Неверный пароль!',
        IncorrectUsernameError: 'Неверный логин!',
        MissingUsernameError: 'Введите вашу почту!',
        UserExistsError: 'Пользователь с такой почтой уже зарегистрирован!'
    }
};

MasterSchema.plugin(passportLocalMongoose, options);

module.exports = mongoose.model("Master", MasterSchema);