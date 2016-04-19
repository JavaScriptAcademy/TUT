
angular.module('app.controllers', ['app.services','firebase'])

.controller('createDefaultPageCtrl',['$scope','$firebaseObject','$ionicPopup','$state','$cordovaDatePicker', function($scope,$firebaseObject,$ionicPopup,$state,$cordovaDatePicker){
  var ref = new Firebase("https://fionatutprac.firebaseio.com/");
  // https://tuttut.firebaseio.com
  ref.on('value', function(data) {
    $scope.index = data.val().length;
  })

  var eventsRef = ref.child("events");

  $scope.events = {
    name: "",
    host: "",
    info: "",
    time: "",
    candidates: [],
  };

  var tempCandidates=[];

  var index = Math.floor(Math.random()*200);

  $scope.timeChoose = function(){
    console.log("time choose");
    //  var ipObj1 = {
    //   callback: function (val) {  //Mandatory
    //     console.log('Return value from the datepicker popup is : ' + val, new Date(val));
    //   },
    //   disabledDates: [            //Optional
    //     new Date(2016, 2, 16),
    //     new Date(2015, 3, 16),
    //     new Date(2015, 4, 16),
    //     new Date(2015, 5, 16),
    //     new Date('Wednesday, August 12, 2015'),
    //     new Date("08-16-2016"),
    //     new Date(1439676000000)
    //   ],
    //   from: new Date(2012, 1, 1), //Optional
    //   to: new Date(2016, 10, 30), //Optional
    //   inputDate: new Date(),      //Optional
    //   mondayFirst: true,          //Optional
    //   disableWeekdays: [0],       //Optional
    //   closeOnSelect: false,       //Optional
    //   templateType: 'popup'       //Optional
    // };

    // $scope.openDatePicker = function(){
    //   // ionicDatePicker.openDatePicker(ipObj1);
    // };
    // var options = {
    //   date: new Date(),
    //   mode: 'date', // or 'time'
    //   minDate: new Date() - 10000,
    //   allowOldDates: true,
    //   allowFutureDates: false,
    //   doneButtonLabel: 'DONE',
    //   doneButtonColor: '#F2F3F4',
    //   cancelButtonLabel: 'CANCEL',
    //   cancelButtonColor: '#000000'
    // };

    // $cordovaDatePicker.show(options).then(function(date){
    //     alert(date);
    //     $scope.events.time = date;
    // });

  }

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

              $state.go('tabsController.listDefaultPage');


             }else{
              }
            });

  };

  $scope.createEvent = function(events) {

    if(events.name.length== 0){
      var arlterPop = $ionicPopup.alert({
        title:"Message",
        template:"Event Name is Required!"
      });

    }else if(events.host.length== 0){
      var arlterPop = $ionicPopup.alert({
        title:"Message",
        template:"Event Host is Required!"
      });
    }
    // else if(events.time.length== 0){
    //   var arlterPop = $ionicPopup.alert({
    //     title:"Message",
    //     template:"Event Time is Required!"
    //   });
    // }
    else if(events.info.length== 0){
      var arlterPop = $ionicPopup.alert({
        title:"Message",
        template:"Event Info is Required!"
      });

    }
    else{

      console.log("%%^&^^%$####", tempCandidates);

    eventsRef.child(index++).set({
     name: events.name,
        comments: '',
        info: events.info,
        time: events.time,
        hostname: events.host,
        candidates: tempCandidates,
    });

      $scope.events.name='';
      $scope.events.host='';
      $scope.events.info='';
      $scope.events.time='';



      $state.go('tabsController.listDefaultPage');
    }


  };

  $scope.addCandidates = function(){
    console.log("candidates");

    var k;

    k = $scope.events.candidates;
    console.log("KKKKKKKKKKK ",k);

    tempCandidates.push(k);
    console.log("tempCandidates*****", tempCandidates);




  }
}])



.controller('listDefaultPageCtrl', ['$firebaseObject',function($scope,$firebaseObject) {
  // var ref = new Firebase("https://fionatutprac.firebaseio.com/");
  // https://tuttut.firebaseio.com

  //this is a example to set a value which will over write the

  // var eventsRef = ref.child("events");


  // $scope.vote = $firebaseObject(ref/events);

}])

.controller('meDefaultPageCtrl', function($scope) {
  $scope.try1 = function(){
    console.log("try1 called");
  }

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