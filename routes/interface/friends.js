var Q = require('q');
var Wilddog = require('wilddog');
var ref = new Wilddog("https://recorder.wilddogio.com/");
var UserRef = ref.child("User");
var HabitRef = ref.child("Habit");

module.exports = Friends;
function Friends(obj) {
	for (var key in obj) {
    	this[key] = obj[key];
  	}
}

Friends.rank = function(data){
	var deferred = Q.defer();
	var listItem = new Friends();
	var list = [];
	//console.log("///"+data);
	UserRef.child(data.phoneNumber).child("friendList").orderByChild("score").on('value', function(snapshot){
		snapshot.forEach(function(snap){
			console.log(snap.child("score").val());
			listItem.phoneNumber = snap.child("phone").val();
			listItem.username = snap.child("username").val();
			listItem.score = snap.child("score").val();
			list.push(listItem);
			listItem = new Friends(); 
		})
		//console.log(snapshot.key() + "/////" + snapshot.val() +"meters tall");
		deferred.resolve(list);

	})
	return deferred.promise;
}

Friends.list = function(data){
	var deferred = Q.defer();
	var listItem = new Friends();
	var list = [];

	UserRef.child(data.phoneNumber).child("friendList").on('value', function(snapshot){
		snapshot.forEach(function(snap){
			console.log(snap.child("score").val());
			listItem.phoneNumber = snap.child("phone").val();
			listItem.username = snap.child("username").val();
			listItem.score = snap.child("score").val();
			list.push(listItem);
			listItem = new Friends(); 
		})
		//console.log(snapshot.key() + "/////" + snapshot.val() +"meters tall");
		deferred.resolve(list);

	})
	return deferred.promise;

}

Friends.add = function(data){
	var deferred = Q.defer();
	var username = null;
	var score = null;
	UserRef.child(data.addPhoneNumber).on('value', function(snapshot){
		username = snapshot.child("userName").val();
		score = snapshot.child("score").val();
		UserRef.child(data.phoneNumber).child("friendList").child(data.addPhoneNumber).set({
			phone: data.addPhoneNumber,
			score: score,
			username: username
		},function(err){
			deferred.resolve(err);
		})
	});
	return deferred.promise;
}

Friends.search = function(data){
	var deferred = Q.defer();
	UserRef.once('value', function (snapshot) {
        if (snapshot.child(data.phoneNumber).exists()) {
        	deferred.resolve(1);
        }else{
        	deferred.resolve(0);
        }
    })
    return deferred.promise;
}










