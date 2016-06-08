var express = require('express');
var router = express.Router();
var interface = require('./interface/methods');

/* GET hello msg. */
router.get('/', interface.info);

//login
router.post('/login',interface.login);

//register
router.post('/reg',interface.reg)

module.exports = router;
