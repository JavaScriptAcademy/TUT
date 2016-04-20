

angular.module('app.controllers', ['app.services','firebase','nvd3'])

.controller('createDefaultPageCtrl',['$scope','$firebaseObject','$ionicPopup','$state','$cordovaDatePicker', 'ionicToast',function($scope,$firebaseObject,$ionicPopup,$state,$cordovaDatePicker,ionicToast){
  var ref = new Firebase("https://tuttut.firebaseio.com");
  // https://tuttut.firebaseio.com https://fionatutprac.firebaseio.com/
  // ref.on('value', function(data) {
  //   $scope.index = data.val().length;

  // })
 // 'ionicToast', ,ionicToast

  index = 0;

  var eventsRef = ref.child("events");
  $scope.temp = {currentParticipant : ''};
  $scope.events = {
    name: "",
    host: "",
    info: "",
    time: "",
    participants: [],
  };

  var tempParticipants=[];

  // var index = Math.floor(Math.random()*200);

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

      console.log("%%^&^^%$####", tempParticipants);

    eventsRef.child(index++).set({
     name: events.name,
        comments: '',
        info: events.info,
        time: events.time,
        hostname: events.host,
        participants: tempParticipants,
    });

      $scope.events.name='';
      $scope.events.host='';
      $scope.events.info='';
      $scope.events.time='';
      tempParticipants = [];
      $scope.temp.currentParticipant = '';


      $state.go('tabsController.listDefaultPage',{},{reload:true});
    }


  };

  $scope.addParticipants = function(){
    console.log("participants");

    var  k = {};
    k[$scope.temp.currentParticipant] = 0;
    console.log("KKKKKKKKKKK ", k);

    tempParticipants.push(k);
    console.log("tempparticipants*****", tempParticipants);

    $scope.temp.currentParticipant = "";


    ionicToast.show('Added success.', 'middle', true, 2500);

    // $cordovaToast
    // .show('Here is a message', 'long', 'center')
    // .then(function(success) {
    //   // success
    // }, function (error) {
    //   // error
    // });

    $scope.events.listParticipants = tempParticipants;


  };
}])




.controller('listDefaultPageCtrl', ['$scope','$state','$firebaseObject',function($scope,$state,$firebaseObject){


        var ref = new Firebase("https://tuttut.firebaseio.com/events");
        ref.on('value', function(data) {
          $scope.eventsList = data.val();
          $state.go($state.current, {}, {reload: true});
        });

}])


.controller('meDefaultPageCtrl', function($scope) {


})

.controller('signupCtrl', function($scope) {

})

.controller('loginCtrl', function($scope) {

})

.controller('liveCtrl', function($scope,$state, $stateParams,$firebaseArray,$firebaseObject) {


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
    $scope.routingIndex = $stateParams.foo;


    var ref = new Firebase("https://tuttut.firebaseio.com/events");
    var y = new Firebase("https://tuttut.firebaseio.com/events/"+$scope.routingIndex+"/comments");

    $scope.addcomment = function() {
      var data = $firebaseArray(y)
      var toadd = document.querySelectorAll('#fuck')[0].value;
      console.log('added comment',toadd);
      data.$add(toadd);
      document.querySelectorAll('#fuck')[0].value = ''
    }

    ref.on('value', function(data) {
      angular.element(document.querySelectorAll('.barss')).addClass('happy');
      console.log('done!!');
      $scope.comments = data.val()[$scope.routingIndex]['comments'];
      $scope.participants = data.val()[$scope.routingIndex]['participants'];
      $scope.data = [{
            key: "Cumulative Return",
            values: []
            }];
      $scope.participants.forEach(function(key, value) {
        var name, vote;
        name = Object.keys(key);
        vote = key[name];
        console.log('name: ',name,'vote : ',vote);
        $scope.data[0].values.push({ "label" : name , "value" : vote });
      });
      // $state.go($state.current, {}, {reload: true});

    });

    var z = new Firebase("https://tuttut.firebaseio.com/events/"+$scope.routingIndex+"/participants");
    z.on('value', function(data) {
      $scope.things = data.val();
      $scope.vote = function(num) {
        var key = Object.keys(data.val()[num])
        var value = data.val()[num][key];
        var tobe = {[key]:value+1}
        z.child(num+'/').update(tobe)

      }
    })

});
