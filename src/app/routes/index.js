var express = require('express')
var router = express.Router()

module.exports = app => {
    require('./city')(router);
    require('./customer')(router);

    app.use('/api', router);
}
