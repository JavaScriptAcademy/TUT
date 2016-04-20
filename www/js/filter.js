angular.module('myFilter', []).filter('getName', function() {
  return function(input) {
	var x = JSON.stringify(input);
	x = x.split('');
	var index =  x.indexOf(':');
	var result = x.splice(2,index-3);
	return result.join('');
};
});