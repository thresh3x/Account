const mongoose = require('mongoose')
//mongoose@6.9.2

let UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

let UserModel = mongoose.model('users', UserSchema)

module.exports = UserModel;