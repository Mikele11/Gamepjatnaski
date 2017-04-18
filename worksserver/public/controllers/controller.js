var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("I am in controller");
    $scope.filteredTodos = []
   ,$scope.currentPage = 1
   ,$scope.numPerPage = 2
   ,$scope.maxSize = 5;
   Window.sizegame=5;
   Window.changes=0;
   
var refresh = function() {
  $http.get('/gamebook').success(function(response) {
    console.log("Geter");
    $scope.gamebook = response;
	console.log($scope.gamebook);
	$scope.len=$scope.gamebook.length;
	$scope.page=Math.ceil($scope.len/$scope.numPerPage);
	console.log($scope.page);
    $scope.contact = "";
  });
};
refresh();
//панинация
  $scope.numPages = function () {
	$http.get('/gamebook').success(function(response) {
    $scope.gamebook = response;
    $scope.numPages= Math.ceil($scope.gamebook.length / $scope.numPerPage);
	console.log($scope.gamebook.length+'+++++++');
  });  
  };
  
  $scope.$watch('currentPage + numPerPage', function() {
	$http.get('/gamebook').success(function(response) {
	var begin = (($scope.currentPage - 1) * $scope.numPerPage);
    var end = begin + $scope.numPerPage; 
    $scope.filteredTodos = $scope.gamebook.slice(begin, end);
	}); 
  });  
//конец пагинации
$scope.addContact = function() {
  console.log($scope.contact);
  //---------------
    d0 = new Date($scope.contact.dataB);
	d1 = new Date();
	dt = (d1.getTime() - d0.getTime()) / (1000*60*60*24);
	dtRound = Math.round(dt);
	$scope.contact.registr=d1;
	//--
  $http.post('/gamebook', $scope.contact).success(function(response) {
    console.log(response);
    refresh();
  });
};

$scope.remove = function(id) {
  console.log(id);
  $http.delete('/gamebook/' + id).success(function(response) {
    refresh();
  });
};

$scope.edit = function(id) {
  console.log(id);
  $http.get('/gamebook/' + id).success(function(response) {
    $scope.contact = response;
  });
};  

$scope.update = function() {
  console.log($scope.contact._id);
  $http.put('/gamebook/' + $scope.contact._id, $scope.contact).success(function(response) {
    refresh();
  })
};

$scope.deselect = function() {
  $scope.contact = "";
}

}]);﻿