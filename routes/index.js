var express = require('express');
var router = express.Router();
var interface = require('./interface/methods');

/* GET hello msg. */
router.get('/', interface.info);

//login
router.post('/login',interface.login);

//register
router.post('/reg',interface.reg);

//get friends rank
router.post('/rank',interface.rank);

//get friends list


module.exports = router;
