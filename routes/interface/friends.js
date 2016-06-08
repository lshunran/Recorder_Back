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
	
}