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