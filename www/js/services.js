angular.module('app.services', [])


.service('userService', [function($ionicPopup){

  var userIn;
  var authUser;
  var userRef;
  return{

   loadUser: function(){
     var ref = new Firebase("https://tuttut.firebaseio.com");

     authUser=ref.getAuth();
     var str="users/"+authUser.uid;
     userRef = ref.child(str);

     userRef.on("value", function(snapshot) {
      userIn=snapshot.val();
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
   },
   getUser:function(){
    return userIn;
   },
   getAuUser:function(){
    if(!authUser){
      var ref = new Firebase("https://tuttut.firebaseio.com");
      authUser=ref.getAuth();
    }

    return authUser;
   },
   getUserDb:function(){
    if(!userRef){
      var ref = new Firebase("https://tuttut.firebaseio.com");
      authUser=ref.getAuth();
      var str="users/"+authUser.uid;
      userRef = ref.child(str);
    }
    return userRef;
   },
   convertArray:function(ref){
     var tempArray = [];
     ref.on("value", function(snapshot) {
          snapshot.forEach(function(data) {
             tempArray.push(data.key());
             });
          });
     return tempArray;
   }
 }
}]);