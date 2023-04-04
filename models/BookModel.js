const mongoose = require('mongoose')
//mongoose@6.9.2

let BookSchema = new mongoose.Schema({
    name:String,
    author:String,
    price: Number
})

let BookModel = mongoose.model('books', BookSchema)

module.exports = BookModel;
