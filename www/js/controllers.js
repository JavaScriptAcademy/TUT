angular.module('app.controllers', ['firebase'])
  
.controller('createDefaultPageCtrl', ['$scope','$firebaseObject','$log',function($scope,$firebaseObject){
                var ref = new Firebase("https://tuttut.firebaseio.com");
var usersRef = ref.child("Fiona");
usersRef.set({
  alanisawesome: {
    date_of_birth: "June 23, 1912",
    full_name: "Alan Turing"
  },
  gracehop: {
    date_of_birth: "December 9, 1906",
    full_name: "Grace Hopper"
  }
});
                $scope.vote = $firebaseObject(ref);
                $scope.voteOptionOne = function(){
                  $scope.vote.option1 += 1;
                  $scope.vote.$save('option1');
                };
                $scope.voteOptionTwo = function(){
                  $scope.vote.option2 += 1;
                  $scope.vote.$save('option2');
                };
           }])
   
.controller('listDefaultPageCtrl', ['$scope','$firebaseObject',function($scope,$firebaseObject){
        var ref = new Firebase("https://tuttut.firebaseio.com");           
        ref.child('events').on('value', function(data) {
          console.log('render data');
          $scope.eventsList = data.val();
        });

}])
   
.controller('meDefaultPageCtrl', function($scope) {

})
         
.controller('signupCtrl', function($scope) {

})
   
.controller('loginCtrl', function($scope) {

})
   
.controller('liveCtrl', function($scope) {

})
 