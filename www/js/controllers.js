angular.module('app.controllers', ['ionic'])
  
.controller('createDefaultPageCtrl', function($scope, $ionicActionSheet, $timeout) {
 // Triggered on a button click, or some other target
 $scope.meeting = {
 	name:"",
 	host:"",
 	time:"",
 	description:"",
 },
 $scope.clear = function() {
	 this.meeting = {
	 	name:"",
	 	host:"",
	 	time:"",
	 	description:"",
	 }
 }
 $scope.show = function() {
 	console.log('111');

   // Show the action sheet
   var hideSheet = $ionicActionSheet.show({
     buttons: [
       { text: '<b>Share</b> This' },
       { text: 'Move' }
     ],
     destructiveText: 'Delete',
     titleText: 'Modify your album',
     cancelText: 'Cancel',
     cancel: function() {
          // add cancel code..
        },
     destructiveButtonClicked: function(){
     	console.log('delted');
     },
     buttonClicked: function(index) {
       console.log(index);
     }
   });

   // For example's sake, hide the sheet after two seconds
// hideSheet()

 };
})
   
.controller('listDefaultPageCtrl', function($scope) {

})
   
.controller('meDefaultPageCtrl', function($scope) {

})
         
.controller('signupCtrl', function($scope) {

})
   
.controller('loginCtrl', function($scope) {

})
   
.controller('liveCtrl', function($scope) {

})
 