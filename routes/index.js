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
router.post('/list',interface.list);

//add friends
router.post('/add',interface.add);

//search friends
router.post('/search',interface.search);

module.exports = router;
