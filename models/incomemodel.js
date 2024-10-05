const mongoose = require('mongoose');


const IncomeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 1000,
    },
    amount: {
        type: Number,
        required: true,
        maxLength: 1000,
        trim: true
    },
    type: {
        type: String,
        default:"income"
    },
    date: {
        type: Date,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        maxLength: 1000,
        trim: true
    },
}, {timestamps: true})

module.exports = mongoose.model('income', IncomeSchema)