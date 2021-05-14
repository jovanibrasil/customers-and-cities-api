const mongoose = require('mongoose');
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
        state: {
            type: String,
            maxlength: 80,
            required: true
        }
    });
    return mongoose.model('City', schema);
}