var Q = require('q');

exports.info = function(req, res, next){
	res.json({
		message: "Hello Recorder."
	})
}