const http = require('http');

require('dotenv').config({ path: `${__dirname}/../config/.env` });

const app = require('./infra/http/express')();
require("./infra/database/mongoose")("mongodb://localhost/customers-cities");
require("./infra/swagger")(app);

module.exports = http
    .createServer(app)
    .listen(process.env.PORT || 3000, function() {
        console.log(`Server listening port ${this.address().port}`);
    });