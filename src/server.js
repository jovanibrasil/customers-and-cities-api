const http = require('http');

if(process.env.ENV !== 'production') {
    require('dotenv').config({ 
        path: `${__dirname}/../config/.env` 
    });
}

const app = require('./infra/http/express')();
require("./infra/database/mongoose")(process.env.MONGO_URL);
require("./infra/swagger")(app);

module.exports = http
    .createServer(app)
    .listen(process.env.PORT || 3000, function() {
        console.log(`Server listening port ${this.address().port}`);
    });