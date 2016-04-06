var express = require('express');
var router = express.Router();
module.exports = function() { /*falta db*/

    router.get('/', function(req, res, next) {
        res.render('mobile',{"layout":"mobilelayout"});
    });

    return router;
};
