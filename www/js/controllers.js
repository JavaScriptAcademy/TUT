angular.module('app.controllers', ['firebase', 'nvd3'])
  
.controller('createDefaultPageCtrl', ['$scope','$firebaseObject','$log',function($scope,$firebaseObject){

           }])
   
.controller('listDefaultPageCtrl', ['$scope','$firebaseObject',function($scope,$firebaseObject){
        
        var ref = new Firebase("https://tuttut.firebaseio.com");           
        ref.child('events').once('value', function(data) {
          $scope.eventsList = data.val();
        });

}])
   
.controller('meDefaultPageCtrl', function($scope) {

})
         
.controller('signupCtrl', function($scope) {

})
   
.controller('loginCtrl', function($scope) {

})
   
.controller('liveCtrl', function($scope,$state, $stateParams) {
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
            axisLabel: 'X Axis'
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

        var ref = new Firebase("https://tuttut.firebaseio.com");           
        ref.child('events').once('value', function(data) {
          $scope.thisObject = data.val()[$scope.routingIndex];
          $scope.data = [{
            key: "Cumulative Return",
            values: [
                { "label" : "A" , "value" : -29.765957771107 },
                { "label" : "B" , "value" : 0 },
                { "label" : "C" , "value" : 32.807804682612 },
                { "label" : "D" , "value" : 196.45946739256 },
                { "label" : "E" , "value" : 0.19434030906893 },
                { "label" : "F" , "value" : -98.079782601442 },
                { "label" : "G" , "value" : -13.925743130903 },
                { "label" : "H" , "value" : -5.1387322875705 }
                ]
            }];
            //[{key: "Cumulative Return", values : {$scope.thisObject['participants']}];

        });

})
 