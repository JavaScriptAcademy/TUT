angular.module('app.controllers', ['firebase', 'nvd3'])
  
.controller('createDefaultPageCtrl', ['$scope','$firebaseObject','$log',function($scope,$firebaseObject){

           }])
   
.controller('listDefaultPageCtrl', ['$scope','$state','$firebaseObject',function($scope,$state,$firebaseObject){
        
        var ref = new Firebase("https://tuttut.firebaseio.com/events");           
        ref.once('value', function(data) {
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
 