var Q = require('q');
var Wilddog = require('wilddog');
var ref = new Wilddog("https://recorder.wilddogio.com/");
var UserRef = ref.child("User");

module.exports = User;
function User(obj) {
	for (var key in obj) {
    	this[key] = obj[key];
  	}
}

User.reg = function(data){
	var deferred = Q.defer();
	UserRef.once('value',function(snapshot){
		snapshot.forEach(function(snap){
			if(snap.child("userName").val() == data.username){
				deferred.resolve("该用户已存在.");
			}else{		
				UserRef.push({
					userName: data.username,
					password: data.password,
					phone: data.phoneNumber,
					//friendLst: null
				},function(err){
					deferred.resolve(err);
				})
			}
		})
	})

	return deferred.promise;

}