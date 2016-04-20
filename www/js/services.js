angular.module('app.services', [])

// .factory('TaskService', function ($http){

//   var TaskService=
//   {
//     "GetDefectComment": function(successCB, errorCB) {
//       // var taskCommentsUrl = ConfigService.GetTaskCommentsUrl+"?"+"taskID="+StoreService.GetVal("taskID") + "&pageID="+StoreService.GetVal("pageID");
//       var defectCommentUrl = "http://139.196.108.49/project/rest"+"?"+"defectId=&orgId=";

//       $http.get(defectCommentUrl)
//       .then(function successCallback(response) {
//         if (successCB) {

//           successCB(response);
//         };
//       }, function errorCallback(response) {
//         var tempData = {};
//         // console.log("page: " + StoreService.GetVal("pageID") % 2);

//         tempData = {"data":{"data":[
//              {"commentID": "1002","content":"this is comment 1",
//              "userName": "Jack", "avatarUrl":"http://7xn1dt.com1.z0.glb.clouddn.com/a.jpeg" , "attachment":"http://urltoattachment"},
//              {"commentID": "1002","content":"this is comment 2",
//              "userName": "Jack", "avatarUrl":"http://7xn1dt.com1.z0.glb.clouddn.com/a.jpeg" , "attachment":"http://urltoattachment"},
//              {"commentID": "1002","content":"this is comment 3",
//              "userName": "Jack", "avatarUrl":"http://7xn1dt.com1.z0.glb.clouddn.com/a.jpeg" , "attachment":"http://urltoattachment"},
//              {"commentID": "1002","content":"this is comment 4",
//              "userName": "Jack", "avatarUrl":"http://7xn1dt.com1.z0.glb.clouddn.com/a.jpeg" , "attachment":"http://urltoattachment"},
//              {"commentID": "1002","content":"this is comment 5",
//              "userName": "Jack", "avatarUrl":"http://7xn1dt.com1.z0.glb.clouddn.com/a.jpeg" , "attachment":"http://urltoattachment"},
//            ]}};
//         response = tempData;

//         console.log("GetDefectComments: error" + JSON.stringify(response));


//         if (errorCB) {

//           errorCB(response);
//         };
//       });
//       // var response = {"errorCode":"0","message":"Get Task List OK","data":[{"taskName":"test defect 2","dueDate":"2015-09-29 00:00:00.0"},{"taskName":"test defect 1","dueDate":"2015-08-14 00:00:00.0"},{"taskName":"task 1","dueDate":"2015-09-05 00:00:00.0"}]};
//       // return response.data;
//     }

//     // add defect comment:
//     // http://localhost/project/rest/user/addDefectComment?defectId=16413&orgId=1492&comment=skdjfsklf&userLoginName=chris.shu



//     // "SubmitDefectComment": function(defectId, orgId, defectComment, successCB, errorCB) {
//     //   var submitDefectCommentUrl = ConfigService.SubmitDefectCommnetUrl+"?"+"defectId="+defectId+"&orgId="+orgId+"&comment="+defectComment+"&userLoginName="+StoreService.GetVal("userName");

//     //   $http.get(submitDefectCommentUrl)
//     //   .then(function successCallback(response) {

//     //     if (successCB) {
//     //       successCB(response);
//     //     };
//     //   }, function errorCallback(response) {
//     //     if (errorCB) {
//     //       errorCB(response);
//     //     };
//     //   });
//     //   // var response = {"errorCode":"0","message":"Get Task List OK","data":[{"taskName":"test defect 2","dueDate":"2015-09-29 00:00:00.0"},{"taskName":"test defect 1","dueDate":"2015-08-14 00:00:00.0"},{"taskName":"task 1","dueDate":"2015-09-05 00:00:00.0"}]};
//     //   // return response.data;
//     // }
//   };

//   return TaskService;
// })

.factory('BlankFactory', function($http){
 return {
    GetUser: function() {
      var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22"
      +"shenzhen"
      +"%2C%20"
      +"cn"
      +"%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys"

        return $http.get(url).then(function(response) {
          //Process Stuff Here
          console.log(response);
          return response;
        });
    },
    GetDefectComment: function(){

    }

  };
})

.service('BlankService', [function(){

}]);

