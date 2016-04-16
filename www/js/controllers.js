
angular.module('app.controllers', ['app.services','firebase'])

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

>>>>>>> df9bf8fffe28d28d432818d371e4bcef5e7943f6
.controller('listDefaultPageCtrl', function($scope) {

})

.controller('meDefaultPageCtrl', function($scope) {

})

.controller('signupCtrl', function($scope) {

})

.controller('loginCtrl', function($scope) {

})

.controller('liveCtrl', function($scope, $cordovaCamera, BlankFactory) {
  // $scope.settingavatar = {};
   // document.addEventListener("deviceready", function openCamera () {
  // $scope.openCamera = function() {
  //   var options = {
  //         quality: 50,
  //         destinationType: Camera.DestinationType.DATA_URL,
  //         sourceType: Camera.PictureSourceType.CAMERA,
  //         allowEdit: true,
  //         encodingType: Camera.EncodingType.JPEG,
  //         targetWidth: 100,
  //         targetHeight: 100,
  //         popoverOptions: CameraPopoverOptions,
  //         saveToPhotoAlbum: false,
  //        correctOrientation:true
  //       };

  //       $cordovaCamera.getPicture(options).then(function(imageData) {
  //         // var image = document.getElementById('myImage');
  //         $scope.imgURI = "data:image/jpeg;base64," + imageData;
  //       }, function(err) {
  //         // error
  //       });
  // }

  // $scope.task = {};
  // $scope.defect = {};
  $scope.allComments = {};

  // $scope.avatar =  StoreService.GetVal("avatar");
  // console.log("avatar: " + $scope.avatar);

  // console.log("orgId and defectId:"+$stateParams.ttt);
  //234234&35415

  // var arr = $stateParams.ttt.split('&');
  // var orgId = arr[0];
  // var defectId = arr[1];
  // StoreService.SetVal("pageID", 0);

  // $ionicLoading.show({template:"Loading...",hideOnStateChange:true});

    console.log("***********GetDefectDetai%%%%%%%%%%%%%%%%%l");


  BlankFactory.GetUser();

    // $scope.addComment = function(){

    //     $scope.editable = !$scope.editable;
    // }

    // $scope.submitComment = function(){
    //   var defectComment = document.getElementById("defectComment").value;
    //   TaskService.SubmitDefectComment(Comment, function(response){

    //   clearDefaultText(defectComment);


    //   function clearDefaultText (message)
    //   {
    //     var obj = document.getElementById("defectComment");

    //     if(obj.value == message)
    //     {
    //       obj.value = "";
    //     }

    //     obj.onblur = function()
    //     {
    //       if(obj.value == "")
    //       {
    //          obj.value = message;
    //       }
    //     }
    //   }

    //   TaskService.GetDefectComment(function(response){
    //     // $ionicLoading.hide();
    //     console.log("size: " + response.data.data.length);
    //     if(response.data.data.length > 0){
    //       console.log("true");
    //       $scope.haveComments = true;
    //       $scope.allComments = response.data.data;
    //       $scope.commentList = $scope.allComments.slice(0, 5);
    //       if(response.data.data.length > 5){
    //         $scope.haveMoreComments = true;
    //       }else{
    //         $scope.haveMoreComments = false;
    //       }
    //     }else{
    //       $scope.haveComments = false;
    //     }
    //   });
    //   });
    //   $scope.editable = false;
    // }
})

// .controller('liveCtrl', function($scope, $cordovaCamera, $cordovaFile) {
//   $scope.settingavatar = {};
//   $scope.openCamera = function() {
//   console.log("add image");
//   // console.log("cordova.file.dataDirectory:"+cordova.file.dataDirectory);
//   // 2
//   var options = {
//   destinationType : Camera.DestinationType.FILE_URI,
//   sourceType : Camera.PictureSourceType.CAMERA, // Camera.PictureSourceType.PHOTOLIBRARY
//   allowEdit : true,
//   encodingType: Camera.EncodingType.JPEG,
//   popoverOptions: CameraPopoverOptions,
//   };
//   //               quality: 50,
//   //               destinationType: Camera.DestinationType.DATA_URL,
//   //               targetWidth: 100,
//   //               targetHeight: 100,
//   //               saveToPhotoAlbum: false
//   // 3
//   $cordovaCamera.getPicture(options).then(function(imageData) {
//   // 4
//   onImageSuccess(imageData);

//   function onImageSuccess(fileURI) {
//     createFileEntry(fileURI);
//   }

//   function createFileEntry(fileURI) {
//     window.resolveLocalFileSystemURL(fileURI, copyFile, fail);
//   }
//   //5
//   function copyFile(fileEntry) {
//     var name = fileEntry.fullPath.substr(fileEntry.fullPath.lastIndexOf('/') + 1);
//     var newName = makeid() + name;

//     window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(fileSystem2) {
//       fileEntry.copyTo(
//       fileSystem2,
//       newName,
//       onCopySuccess,
//       fail
//       );
//     },
//     fail);
//   }
//   // 6
//   function onCopySuccess(entry) {
//   //   $scope.$apply(function () {
//   //   // $scope.images.set(entry.nativeURL);
//   //   $scope.images.push(entry.nativeURL);
//   //   $scope.settingavatar.image=entry.nativeURL;
//   //   $scope.images.cleanup();

//   // });
//   //add by Fiona 11_16
//   // navigator.camera.cleanup( cameraSuccess, cameraError );

//   // $scope.settingavatar.image=entry.nativeURL;
//   }

//   function fail(error) {
//     console.log("fail: " + error.code);
//   }

//   function makeid() {
//     var text = "";
//     var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

//     for (var i=0; i < 5; i++) {
//       text += possible.charAt(Math.floor(Math.random() * possible.length));
//     }

//     return text;
//     }
//     }, function(err) {
//     console.log(err);
//     });
//   }

//   $scope.urlForImage = function(imageName) {
//     console.log("get correct path for image");
//     var name = imageName.substr(imageName.lastIndexOf('/') + 1);
//     var trueOrigin = cordova.file.dataDirectory + name;
//     return trueOrigin;
//   };

// });