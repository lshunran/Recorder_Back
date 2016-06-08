var Q = require('q');
var User = require('./User');




exports.info = function(req, res, next){
	res.json({
		message: "Hello Recorder."
	})
}

exports.login = function(req, res, next){

	
}

exports.reg = function(req, res, next){
	var data = req.body;
	User.reg(data).done(function(data){
		if(!data){
		res.json({
			errCode: 0
		})
	}else{
		res.json({
			errCode: data
		})
	}

	});
	
}