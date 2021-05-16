const mongoose = require('mongoose');
const Genre = require('../../domain/enums/Genre')
const { v4: uuidv4 } = require('uuid');

const schema = mongoose.Schema({
    customer_id: { 
        type: String, 
        default: uuidv4 
    },
    name: {
        type: String,
        maxlength: 80,   
        required: true
    },
    genre: {
        type: String,
        enum: [Genre.FEMININE, Genre.MASCULINE],
        required: true
    },
    birth_date: {
        type: Date,
        required: true
    },
    age: {
        type: Number
    },
    city_id: {
        type: String,
        required: true
    },          
});

schema.pre('save', function(next) {
    const today = new Date();
    this.age = today.getFullYear() - this.birth_date.getFullYear();
    next();
});

module.exports = mongoose.model('Customer', schema);
