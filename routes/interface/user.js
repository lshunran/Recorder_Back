var Q = require('q');
var Wilddog = require('wilddog');
var ref = new Wilddog("https://recorder.wilddogio.com/");
var UserRef = ref.child("User");
var HabitRef = ref.child("Habit");

module.exports = User;
function User(obj) {
	for (var key in obj) {
    	this[key] = obj[key];
  	}
}
//
User.getUserByPhone = function(phone){
    var deferred = Q.defer();
    //var targetEmail = formatEmail(email);
    UserRef.once('value', function (snapshot) {
        if (snapshot.child(phone).exists()) {
            deferred.resolve("user exist.");
        } else {
            deferred.reject("user not exist.");
        }
    });
    return deferred.promise;
};

//注册逻辑实现
User.reg = function(data){
	var deferred = Q.defer();
	User.getUserByPhone(data.phoneNumber).then(function(data){
		deferred.resolve("user exist.");
	}, function(err){
		UserRef.child(data.phoneNumber).set({
					userName: data.username,
					password: data.password,
					phone: data.phoneNumber,
					score: 0
					//friendLst: null
				},function(err){
					deferred.resolve("reg success.");
				})
	});
	return deferred.promise;
}

//登录逻辑实现
User.login = function(data){
	var deferred = Q.defer();
	var userId = null;
	var listItem = new User();
	var list = [];
	var resultItem = new User();
	var resultList = [];
	UserRef.once('value', function(snapshot){
		snapshot.forEach(function(snap){
			if(snap.child("phone").val() == data.phoneNumber){
				if(snap.child("password").val() == data.password){
					userId = snap.key();
					resultItem.errCode = 0;
					resultItem.username = snap.child("userName").val();
					resultItem.score = snap.child("score").val();
					resultItem.token = null;
					HabitRef.once('value', function(snapshot){
						snapshot.forEach(function(snap){
							console.log(userId);
							 if(snap.child("id").val() == userId){
							 	//console.log(snap.child("catalog").val());
							 	listItem.habitId = snap.key();
							 	listItem.catalog = snap.child("catalog").val();
							 	//console.log(listItem.catalog);
							 	listItem.date = snap.child("date").val();
							 	listItem.feature = snap.child("feature").val();
							 	listItem.name = snap.child("name").val();
							 	listItem.score = snap.child("score").val();
							 	list.push(listItem);
			    				listItem = new User();
							 }
						})
						resultItem.HabitList = list;
						resultList.push(resultItem);
						deferred.resolve(resultList);
					})
					return deferred.promise;
				}else{
					deferred.resolve("wrong password.");
				}
			}
		// 	else{
		// 		deferred.resolve("user not exist.");
		// }
	})
})
	return deferred.promise;
}

User.addhabit = function(data){
	var deferred = Q.defer();
	var listItem = new User();
	var list = [];
	var habitId = HabitRef.push({
		catalog: data.catalog,
		id: data.phoneNumber,
		feature: data.feature,
		name: data.name,
		score: 0,
		date: 'null'
	},function(err){
		//console.log(habitId);
		deferred.resolve(habitId.key());
	})
	
	return deferred.promise;
}

User.updatehabit = function(data){
	var deferred = Q.defer();
	//var listItem = new User();
	var list = [];
	
	HabitRef.once('value', function(snapshot){
		snapshot.forEach(function(snap){
			if(snap.key() == data.id && snap.child("id").val() == data.phoneNumber){
				
				if (snap.child("date").val() == "null") {
					list.push(data.date);
					snap.ref().update({score: parseInt(data.score)});
					snap.ref().update({date: list},function(err){
						deferred.resolve(err);
					});
				}else{
					list = snap.child("date").val();
					list.push(data.date);
					snap.ref().update({score: parseInt(data.score)});
					snap.ref().update({date: list},function(err){
						deferred.resolve(err);
					})
				}

			}
		})
	})
	return deferred.promise;
}








