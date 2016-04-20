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


.controller('indexCtrl', function($scope,$state) {

})

.controller('listDefaultPageCtrl', function($scope) {

})
.controller('meDefaultPageCtrl', function($scope,$state,userService) {

  $scope.userinfo={
     name:"",
     gender:"Female",
     phonenumber:"xxxx",
     company:"test"
  }


   var userIn=userService.getUser();
   console.log('see user', userIn);
   if(userIn){
     $scope.userinfo.name=userIn.userfullname;
     $scope.userinfo.gender=userIn.gender;
     $scope.userinfo.phonenumber=userIn.phonenumber;
     $scope.userinfo.company=userIn.company;
   }




   $scope.gotoEditProfile=function(){
    $state.go('tabsController.editProfile');
   }

   $scope.gotoResetPassword=function(){
    $state.go('tabsController.resetPassword');
   }

   $scope.logout=function(){
     var ref = new Firebase("https://tuttut.firebaseio.com");
     var authUser=userService.getAuUser();
    if(authUser){
      ref.unauth();}

    console.log("log out")
    $state.go('login');
   }

})







.controller('signupCtrl', function($scope,$state,$ionicPopup) {

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
          var alertPop=$ionicPopup.alert({
        title:"signUp Failed!",
        template:"signUp Failed! "+error
      });
          console.log("Error creating user:", error);
        } else {
           var userRef = ref.child("users");

        // we can also chain the two calls together
          userRef.child(userData.uid).set({
          userfullname: $scope.userau.name,
          gender:"Female",
          phonenumber:"xxxx",
          company:"test"
        }, function(error){
          if(error){
           var alertPop=$ionicPopup.alert({
             title:"signUp Failed!",
             template:"signUp Failed! "+error
           });
         }
       });


         var alertPop=$ionicPopup.alert({
          title:"signUp Successfully!",
          template:"Successfully created user account! "
        });
         alertPop.then(function(res) {
          $state.go('login');
         });
          console.log("Successfully created user account with uid:", userData.uid);

        }
      });


  }

})







.controller('loginCtrl', function($scope,$state,$ionicPopup,userService) {

  $scope.logininfo={
    email:"",
    password:""
  };

  var ref = new Firebase("https://tuttut.firebaseio.com");
  var authUser=ref.getAuth();
  if(authUser){
     $state.go('tabsController.listDefaultPage');
      console.log("Authenticated successfully with payload:");
  }

  $scope.login=function(){

    ref.authWithPassword({
    email    : $scope.logininfo.email,
    password : $scope.logininfo.password
  }, function(error, authData) {
    if (error) {
      var alertPop=$ionicPopup.alert({
        title:"Login Failed!",
        template:"Login Failed! "+error
      });
      console.log("Login Failed!", error);
    } else {
      userService.loadUser();
      $state.go('tabsController.listDefaultPage');
      console.log("Authenticated successfully with payload:", authData);
    }
  },
      {
      remember: "sessionOnly"
    });
  }


})

.controller('liveCtrl', function($scope) {

})


.controller('editProfileCtrl', function($scope,$state,userService,$ionicPopup) {

   $scope.userinfo={
    gender:"",
    phonenumber:"",
    company:""
  };

   var authUser=userService.getAuUser();
   var userIn=userService.getUser();
   if(userIn){

     $scope.userinfo.gender=userIn.gender;
     $scope.userinfo.phonenumber=userIn.phonenumber;
     $scope.userinfo.company=userIn.company;
   }

   $scope.EditProfile=function(){


     // var userDb=userService.getUserDb();
     // var currentUser=userDb.child(authUser.uid);
       var currentUser = new Firebase("https://tuttut.firebaseio.com/users/"+authUser.uid);
      currentUser.update({
          "gender":$scope.userinfo.gender,
          "phonenumber":$scope.userinfo.phonenumber,
          "company":$scope.userinfo.company
        }, function(error){
           if(error){
           var alertPop=$ionicPopup.alert({
             title:"Update Failed!",
             template:"Update Failed! "+error
           });
         }else{
           userService.loadUser();
           var alertPop=$ionicPopup.alert({
             title:"Update Successfully!",
             template:"Update Successfully!"
           });
          alertPop.then(function(res) {
           $state.go('tabsController.meDefaultPage');
         });

         }
        });
   }
})

.controller('resetPasswordCtrl', function($scope,userService,$ionicPopup) {
  $scope.userinfo={
    curpassword:"",
    newpassword:"",
    newpassworda:""
  };


  $scope.resetPassword=function(){

    var authUser=userService.getAuUser();
    var ref = new Firebase("https://tuttut.firebaseio.com");

    if($scope.userinfo.newpassword!==$scope.userinfo.newpassworda){
      var alertPop=$ionicPopup.alert({
             title:"Password Reset",
             template:"Password is not match! "
           });
      return;
    }

    ref.changePassword({
      email       : authUser.password.email,
      oldPassword : scope.userinfo.curpassword,
      newPassword : scope.userinfo.newpassword
    }, function(error) {
      if (error === null) {

           var alertPop=$ionicPopup.alert({
             title:"Password Reset",
             template:"Password changed successfully! "
           });

        console.log("Password changed successfully");
      } else {
         var alertPop=$ionicPopup.alert({
             title:"Password Reset",
             template:"Password changed Failed! "+error
           });

        console.log("Error changing password:", error);
      }
    });
  }

})