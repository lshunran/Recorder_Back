var Q = require('q');
var User = require('./user');
var Friends = require('./friends');


exports.info = function(req, res, next){
	res.json({
		message: "Hello Recorder."
	})
}

exports.login = function(req, res, next){
	var data = req.body;
	User.login(data).done(function(data){
		res.json(data);
	});

	
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

exports.rank = function(req, res, next){
	var data = req.body;
	Friends.rank(data).done(function(data){
		if(data){
		res.json({
			errCode: 0,
			FriendList: data
		})
	}else{
		res.json({
			errCode: 1
		})
	}

	});
}

exports.list = function(req, res, next){
	var data = req.body;
	Friends.list(data).done(function(data){
		if(data){
		res.json({
			errCode: 0,
			FriendList: data
		})
	}else{
		res.json({
			errCode: 1
		})
	}

	});
}

exports.add = function(req, res, next){
	var data = req.body;
	Friends.add(data).done(function(data){
		if(!data){
		res.json({
			errCode: 0,
			//FriendList: data
		})
	}else{
		res.json({
			errCode: 1
		})
	}

	});
}

exports.search = function(req, res, next){
	var data = req.body;
	Friends.search(data).done(function(data){
		if(data){
		res.json({
			errCode: 0,
			isExist: data
			//FriendList: data
		})
	}else{
		res.json({
			errCode: 0,
			isExist: data
		})
	}

	});
}