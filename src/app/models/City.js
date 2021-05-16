const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const schema = mongoose.Schema({
    city_id: { 
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

module.exports = mongoose.model('City', schema);
