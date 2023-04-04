const mongoose = require('mongoose')
//mongoose@6.9.2

let AccountSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    time: Date,

    type: {
        type: Number,
        default: -1
    },
    account: {
        type: Number,
        required: true
    },
    remark: {
        type: String
    }
})

let AccountModel = mongoose.model('accounts', AccountSchema)

module.exports = AccountModel;