var trak = angular.module('trak', ['ngRoute']);

trak.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl : 'pages/home.html',
			controller : 'mainController'
		})

		.when('/about', {
			templateUrl : 'pages/about.html',
			controller : 'aboutController'
		})

		.when('/contact', {
			templateUrl : 'pages/contact.html',
			controller : 'contactController'
		})

		.when('/work', {
			templateUrl : 'pages/work.html',
			controller : 'workController'
		});
});

trak.controller('mainController', function($scope) {

	$scope.message = "everyone come and see this";
});

trak.controller('aboutController', function($scope) {

	$scope.message = "This is the about page getting displayed!";
});

trak.controller('contactController', function($scope) {

	$scope.message = "Look how you can't contact me.";
});

trak.controller('workController', function($scope) {
	$scope.message = "This is all the work!"
});