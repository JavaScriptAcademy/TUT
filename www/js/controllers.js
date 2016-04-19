angular.module('app.controllers', ['firebase'])

.controller('createDefaultPageCtrl', ['$scope','$firebaseObject','$log',function($scope,$firebaseObject){
                var ref = new Firebase("https://tuttut.firebaseio.com");

//this is a example to set a value which will over write the

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
				// $scope.vote.$loaded()
				//   .then(function() {
				//     $scope.vote.option1 = $scope.vote.option1;
				//     $scope.vote.option2 = $scope.vote.option2;
				//   })
				//   .catch(function(err) {
				//     console.error(err);
				//   });


                // $scope.vote.option1 = $scope.vote.option1;
                // $scope.vote.option2 = $scope.vote.option2;
                $scope.voteOptionOne = function(){
                  $scope.vote.option1 += 1;
                  // console.log($scope.vote.option1);
                  $scope.vote.$save('option1');
                };
                $scope.voteOptionTwo = function(){
                  $scope.vote.option2 += 1;
                  $scope.vote.$save('option2');
                };
                // $scope.vote.$on('change',function(){
                //   // $('#panel').animate({backgroundColor: "#F9D56E"}).animate({backgroundColor: "#FAFAFA"});
                // });
           }])

.controller('listDefaultPageCtrl', function($scope) {

})

.controller('meDefaultPageCtrl', function($scope) {

})

.controller('signupCtrl', function($scope) {

  // var email=document.getElementById('useremail').value;
  // var password=document.getElementById('password').value;

  $scope.userau={
    email:"",
    password:"",
    name:""
  };
  var ref = new Firebase("https://tuttut.firebaseio.com");
    $scope.signUp=function(){

      ref.createUser({
        email: $scope.userau.email,
        password: $scope.userau.password
      }, function(error, userData) {
        if (error) {
          console.log("Error creating user:", error);
        } else {
          console.log("Successfully created user account with uid:", userData.uid);
        }
      });

      var userRef = ref.child("users");

    // we can also chain the two calls together
      userRef.push({
      userfullname: $scope.userau.name
    });
  }

})

.controller('loginCtrl', function($scope) {

  $scope.logininfo={
    email:"",
    password:""
  };

})

.controller('liveCtrl', function($scope) {

})
