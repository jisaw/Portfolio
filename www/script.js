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
		})
		.when('/login', {
			templateUrl : 'pages/login.html',
			controller : 'loginController'
		});
});

trak.controller('mainController', function($scope) {

	$scope.message = "Thanks for stopping by";
});

trak.controller('aboutController', function($scope) {

});

trak.controller('contactController', function($scope, $http, $location, toastr) {

	$scope.message = "";
	$scope.submitContact = function(isValid) {
		if (isValid) {
			$scope.formData = $.param({
				"Name" :  $scope.contact.name,
				"Title" :  $scope.contact.title,
				"Company" :  $scope.contact.company,
				"Email" :  $scope.contact.email,
				"Phone" :  $scope.contact.phone,
				"Message" :  $scope.contact.msg,
	});

		$http({
			method : 'POST',
			url : 'http://localhost:8000/contacts',
			data : $scope.formData,
			headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).success(function(data) {
			console.log(data);
		});

		$scope.contact = null;

		toastr.success('Your information has been sent to Jacob!', "Success!");
		} else {
			toastr.error("There seems to be an error with the form. Give it another shot!", "Whoops")
		}
	}
});

trak.controller('workController', function($scope, $http, $sce) {
	$scope.message = "For business and pleasure"
	$scope.toTrustedHtml = function(html) {
		return $sce.trustAsHtml(html);
	};
	$http.get("http://localhost:8000/articles").success(function(response) {$scope.articles = response.records;});
});

trak.controller('loginController', function($scope, $http) {
	$scope.message = "This is a login page test";
	$scope.submitLogin = function() {
			$scope.formData = $.param({
				"Username" : $scope.login.username,
				"Password" : $scope.login.password,
			});

			$http({
				method : "POST",
				url : 'http://localhost:8000/login',
				data : $scope.formData,
				headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
			}),success(function(data) {
				//IF STATUS 200 LET PASS ELSE REJECT
			});
	};
})
