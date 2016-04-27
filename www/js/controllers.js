angular.module('app.controllers', ['app.services','firebase','nvd3'])
// .controller('createDefaultPageCtrl',['$scope','$firebaseObject','$ionicPopup','$state','$cordovaDatePicker', 'ionicToast',function($scope,$firebaseObject,$ionicPopup,$state,$cordovaDatePicker,ionicToast){
.controller('meDefaultPageCtrl', function($scope,$state,userService) {

  $scope.userinfo={
     name:"",
     gender:"Female",
     phonenumber:"xxxx",
     company:"test"
  };

  $scope.load = function() {
     var userIn=userService.getUser();
     console.log('see user', userIn);
     if(userIn){
       $scope.userinfo.name=userIn.userfullname;
       $scope.userinfo.gender=userIn.gender;
       $scope.userinfo.phonenumber=userIn.phonenumber;
       $scope.userinfo.company=userIn.company;
     }
  };

   $scope.gotoEditProfile=function(){
    $state.go('tabsController.editProfile');
   };

   $scope.gotoResetPassword=function(){
    $state.go('tabsController.resetPassword');
   };


   $scope.logout=function(){
     var ref = new Firebase("https://tuttut.firebaseio.com");
     var authUser=userService.getAuUser();
    if(authUser){
      ref.unauth();}

    console.log("log out");
    $state.go('login');
   };
 })



.controller('createDefaultPageCtrl',['$scope','$firebaseObject','$ionicPopup','$state','$cordovaDatePicker', '$cordovaToast', function($scope,$firebaseObject,$ionicPopup,$state,$cordovaDatePicker,$cordovaToast){

  var ref = new Firebase("https://tuttut.firebaseio.com");
  index = 0;
  $scope.names = [];
  var eventsRef = ref.child("events");
  $scope.temp = {currentParticipant : ''};
  $scope.events = {
    name: "",
    host: "",
    info: "",
    time: "",
    participants: [],
  };


  var tempParticipants={};
  $scope.timeChoose = function(){
    console.log("time choose");
     var ipObj1 = {
      callback: function (val) {  //Mandatory
        console.log('Return value from the datepicker popup is : ' + val, new Date(val));
      },
      disabledDates: [            //Optional
        new Date(2016, 2, 16),
        new Date(2015, 3, 16),
        new Date(2015, 4, 16),
        new Date(2015, 5, 16),
        new Date('Wednesday, August 12, 2015'),
        new Date("08-16-2016"),
        new Date(1439676000000)
      ],
      from: new Date(2012, 1, 1), //Optional
      to: new Date(2016, 10, 30), //Optional
      inputDate: new Date(),      //Optional
      mondayFirst: true,          //Optional
      disableWeekdays: [0],       //Optional
      closeOnSelect: false,       //Optional
      templateType: 'popup'       //Optional
    };

    $scope.openDatePicker = function(){
      // ionicDatePicker.openDatePicker(ipObj1);
    };
    var options = {
      date: new Date(),
      mode: 'date', // or 'time'
      minDate: new Date() - 10000,
      allowOldDates: true,
      allowFutureDates: false,
      doneButtonLabel: 'DONE',
      doneButtonColor: '#F2F3F4',
      cancelButtonLabel: 'CANCEL',
      cancelButtonColor: '#000000'
    };

    $cordovaDatePicker.show(options).then(function(date){
        $scope.events.time = date;
    });

  };

  $scope.cancle = function() {
    console.log("cancle called");
    var confirmPopup = $ionicPopup.confirm({
             title: 'Confirmation',
             template: 'Are you sure you want to quit?'
           });
           confirmPopup.then(function(res) {
             if(res) {
              $scope.events.name='';
              $scope.events.host='';
              $scope.events.info='';
              $scope.events.time='';

              $scope.names='';

              $state.go('tabsController.listDefaultPage');
             }else{
              }
            });
  };

  $scope.createEvent = function(events) {
    if(events.name.length === 0){
      var arlterPop = $ionicPopup.alert({
        title:"Message",
        template:"Event Name is Required!"
      });
    }else if(events.host.length === 0){
      var arlterPop = $ionicPopup.alert({
        title:"Message",
        template:"Event Host is Required!"
      });
    }

    else if(events.info.length === 0){
      var arlterPop = $ionicPopup.alert({
        title:"Message",
        template:"Event Info is Required!"
      });
    }
    else{

    eventsRef.push({
        name:events.name,
        comments: '',
        info: events.info,
        time: events.time,
        hostname: events.host,
        participants: tempParticipants,

        user:''
    }, function(error){
           if(error){
           var alertPop=$ionicPopup.alert({
             title:"Create Event",
             template:"Create Event Failed! "+error
           });
         }else{
            console.log("xxxxxxxxxxxxxxxxxxxxxxx"+tempParticipants.length);
         }
        });
              $scope.events.name='';
              $scope.events.host='';
              $scope.events.info='';
              $scope.events.time='';

              $scope.names='';
      $state.go('tabsController.listDefaultPage',{},{reload:true});
    }
  };

  $scope.addParticipants = function(){
    console.log("participants");

    if($scope.temp.currentParticipant.length == 0){
      var arlterPop = $ionicPopup.alert({
        title:"Illegal Input",
        template:"Please input the participants name, then click Add button!"
      });
    }else{
      tempParticipants[$scope.temp.currentParticipant]={"vote":0};

       $scope.names.push($scope.temp.currentParticipant);


    console.log("tempparticipants*****", tempParticipants);
    $scope.temp.currentParticipant = "";
    $cordovaToast
    .show('You added a participant!', 'long', 'center')
    .then(function(success) {
      // success
    }, function (error) {
      // error
    });
    }
  };
}])

.controller('listDefaultPageCtrl', ['$scope','$state','$firebaseObject',function($scope,$state,$firebaseObject){
        document.querySelectorAll('ion-spinner')[0].style.display = 'block';
        $scope.searchInput = {type:''};
        var ref = new Firebase("https://tuttut.firebaseio.com/events");
        ref.on('value', function(data) {
          $scope.eventsList = [];
          data.forEach(function(sth) {
            var key = sth.key();
            sth = sth.val();
            sth.key = key;
            // console.log(' i am logging name',sth);
            $scope.eventsList.push(sth);
          });
          document.querySelectorAll('ion-spinner')[0].style.display = 'none';
          $state.go($state.current, {}, {reload: true});
        });
        var options = {
              keys: ['name']
            };
        $scope.fuzzySearch = function() {
          $scope.result = '';
          f = new Fuse($scope.eventsList, options);
          if(f.search($scope.searchInput.type))
            $scope.result = f.search($scope.searchInput.type);
          // console.log($scope.searchInput.type);
        };
        $scope.onFoucs = function() {
          document.querySelectorAll('#eventsListDisplay')[0].style.display = 'none';
          document.querySelectorAll('#searchResultsDisplay')[0].style.display = 'block';
          console.log('show list');
        };
        $scope.hideEventDisplay = function() {
          document.querySelectorAll('#eventsListDisplay')[0].style.display = 'block';
          document.querySelectorAll('#searchResultsDisplay')[0].style.display = 'none';
          console.log('hide list');
        };
}])

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

         var alertPop = $ionicPopup.alert({
          title:"signUp Successfully!",
          template:"Successfully created user account! "
        });
         alertPop.then(function(res) {
          $state.go('login');
         });
          console.log("Successfully created user account with uid:", userData.uid);

        }
      });


  };

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
  };


})

.controller('editProfileCtrl', function($scope,$state,userService,$ionicPopup) {

   $scope.userinfo={
    gender:"",
    phonenumber:"",
    company:""
  };

  var authUser;
 $scope.load = function(){
   authUser=userService.getAuUser();

   var userIn=userService.getUser();
   console.log(userIn);
   if(userIn){

     $scope.userinfo.gender=userIn.gender;
     $scope.userinfo.phonenumber=userIn.phonenumber;
     $scope.userinfo.company=userIn.company;
   }


 }

   $scope.EditProfile=function(){

       var currentUser = new Firebase("https://tuttut.firebaseio.com/users/"+authUser.uid);
       var arrayref=currentUser.child('array1');
       var temparray=userService.convertArray(arrayref);
       var len=temparray.length;

       for(var i=0;i< len;i++){
         aaaRef=arrayref.child(temparray[i]).child("final");
         console.log('i:'+i+'len:'+temparray.length);
          aaaRef.push({
            fitest:"finalTest"
          });

       }

       console.log(temparray);

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
           var alertPop = $ionicPopup.alert({
             title:"Update Successfully!",
             template:"Update Successfully!"
           });
          alertPop.then(function(res) {
           $state.go('tabsController.meDefaultPage',{},{reload:true});


         });
         }
        });
   };
})


.controller('forgetPasswordCtrl', function($scope,$state,userService,$ionicPopup) {
  $scope.logininfo = {
    email:""
  };

  $scope.sendNewPassword = function(){
    var ref = new Firebase("https://tuttut.firebaseio.com");
    ref.resetPassword({
      email : $scope.logininfo.email
    }, function(error) {
      if (error === null) {
        var alertPop=$ionicPopup.alert({
             title:"Reset Password",
             template:"A new password is sent to email: "+$scope.logininfo.email+"."
        });
        alertPop.then(function(){
           $state.go('login');
        });
        console.log("Password reset email sent successfully");
      } else {
        var alertPop = $ionicPopup.alert({
             title:"Reset Password",
             template:"Error sending password reset email: "+error
        });
        console.log("Error sending password reset email:", error);
      }
    });
  };
})

.controller('resetPasswordCtrl', function($scope,userService,$ionicPopup,$state) {

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
      oldPassword : $scope.userinfo.curpassword,
      newPassword : $scope.userinfo.newpassword
    }, function(error) {
      if (error === null) {

           var alertPop=$ionicPopup.alert({
             title:"Password Reset",
             template:"Password changed successfully! "
           });
           alertPop.then(function() {
            $state.go('tabsController.meDefaultPage');
           });

        console.log("Password changed successfully");
      } else {
         var alertPop = $ionicPopup.alert({
             title:"Password Reset",
             template:"Password changed Failed! "+error
           });

        console.log("Error changing password:", error);
      }
    });
  };

})


.controller('liveCtrl', function($scope,$state, $ionicPopup,$stateParams,$firebaseArray,$firebaseObject,userService) {

    $scope.config = {
        visible: true, // default: true
        extended: false, // default: false
        disabled: false, // default: false
        refreshDataOnly: true, // default: true
        deepWatchOptions: true, // default: true
        deepWatchData: true, // default: true
        deepWatchDataDepth: 2, // default: 2
        debounce: 10 // default: 10
    };
   $scope.options = {
    chart: {
        type: 'discreteBarChart',
        height: 450,
        margin : {
            top: 20,
            right: 20,
            bottom: 60,
            left: 55
        },
        x: function(d){ return d.label; },
        y: function(d){ return d.value; },
        showValues: true,
        valueFormat: function(d){
            return d3.format(',.4f')(d);
        },
        transitionDuration: 500,
        xAxis: {
            axisLabel: 'Brand'
        },
        yAxis: {
            axisLabel: 'Y Axis',
            axisLabelDistance: 30
        }
     }
  };
    $scope.state = $state.current;
    $scope.params = $stateParams;
    $scope.eventName = $stateParams.foo;


    var ref = new Firebase("https://tuttut.firebaseio.com/events");
    var y = new Firebase("https://tuttut.firebaseio.com/events/"+$scope.eventName+"/comments");

    $scope.addcomment = function() {
      var data = $firebaseArray(y);
      var toadd = document.querySelectorAll('#fuck')[0].value;
      console.log('added comment',toadd);
      data.$add(toadd);
      document.querySelectorAll('#fuck')[0].value = '';
    };

    ref.on('value', function(data) {


      $scope.comments = data.val()[$scope.eventName]['comments'];
      $scope.userList=data.val()[$scope.eventName]['user'];
      console.log('usersssssss: ',$scope.userList);
    });


    $scope.things=[];
    var z = new Firebase("https://tuttut.firebaseio.com/events/"+$scope.eventName+"/participants");
    z.on('value', function(data) {
       $scope.data = [{
            key: "Cumulative Return",
            values: []
            }];
      $scope.things =  [];
      data.forEach(function(da){

       $scope.things.push(da.key());
       var name, vote;
       name =da.key();
       vote = da.val().vote;
       console.log("label" , name,"value" , vote);
       $scope.data[0].values.push({ "label" : name , "value" : vote });
     });
     // $scope.things = data.val();

      $scope.indent =150/$scope.things.length;
      $scope.vote = function(name) {

         var userId=userService.getAuUser().uid;

         if(checkUserVoteRight(userId)){
          // var key = Object.keys(data.val()[num])
         var value = data.val()[name].vote+1;
         console.log("this",name);
        // var tobe = {[key]:value+1}
      //   z.child(name).child("vote/").update(value);
           z.child(name).update({
            vote:value
           });

           ref.child($scope.eventName).child("user").push({
            userid:userId});
         }else{
           var alertPop=$ionicPopup.alert({
             title:"Vote",
             template:"Soooorry~cannot vote twice! "
           });


         }
      };
    });

  function checkUserVoteRight(userId){
    var right=true;

        if($scope.userList!==""){
            var userKeys=Object.keys($scope.userList);
            console.log("checkUserVoteRight userIDDDDD:",userKeys);

           for(var i=0;i<userKeys.length;i++){
             if($scope.userList[userKeys[i]].userid==userId){
              right=false;
            }
          }

        }
    return right;
  }

});
