const mongoose = require('mongoose');

module.exports = uri => {
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    });
    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log('Closed connection with mongo database!');
            process.exit(0);
        });
    })
}