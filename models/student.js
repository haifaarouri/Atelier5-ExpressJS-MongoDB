const mongoose = require('mongoose')
const Schema = mongoose.Schema

var Student = new Schema({
    name: String,
    age: Number,
    note: Number
})

module.exports = mongoose.model('student', Student)