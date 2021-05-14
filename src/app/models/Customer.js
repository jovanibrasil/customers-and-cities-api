const mongoose = require('mongoose');
const Genre = require('../../domain/enums/Genre')
const { v4: uuidv4 } = require('uuid');

module.exports = () => {
    const schema = mongoose.Schema({
        _id: { 
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
            type: Number,
            required: true
        },
        city_id: {
            type: String,
            required: true
        }           
    });
    return mongoose.model('Customer', schema);
}