const http = require("http");

require("dotenv").config({ path: `${__dirname}/../.env` });

const app = require("./config/express")();

module.exports = http
    .createServer(app)
    .listen(process.env.PORT || 3000, function() {
        console.log(`Server listening port ${this.address().port}`);
        })