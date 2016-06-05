var express = require('express');
var router = express.Router();
var interface = require('./interface/methods');

/* GET home page. */
router.get('/', interface.info);

module.exports = router;
