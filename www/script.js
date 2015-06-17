var trak = angular.module('trak', ['ngRoute', 'ngAnimate', 'toastr', 'ui.mask']);

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

	$scope.message = "Thanks for stopping by";
});

trak.controller('aboutController', function($scope) {

	$scope.message = "This is the about page getting displayed!";
});

trak.controller('contactController', function($scope, $location, toastr) {

	$scope.message = "";
	$scope.submitContact = function(isValid) {
		if (isValid) {
		console.log("Name: " + $scope.contact.name)
		console.log("Title: " + $scope.contact.title)
		console.log("Comapny: " + $scope.contact.company)
		console.log("E-mail: " + $scope.contact.email)
		console.log("Phone: " + $scope.contact.phone)
		console.log("Message: " + $scope.contact.msg)

		$scope.contact = null;

		toastr.success('Your information has been sent to Jacob!', "Success!");
		} else {
			toastr.error("There seems to be an error with the form. Give it another shot!", "Whoops")
		}
	}
});

trak.controller('workController', function($scope, $location) {
	$scope.message = "This is what I do"
});