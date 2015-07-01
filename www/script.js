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
		.when('/work/:article_id', {
			templateUrl : 'pages/article.html',
			controller : 'articleController'
		})
		.when('/login', {
			templateUrl : 'pages/login.html',
			controller : 'loginController'
		})
		.when('/admin', {
			templateUrl : 'pages/admin.html',
			controller : 'adminController'
		})
		.when('/newArticle', {
			templateUrl : 'pages/newArticle.html',
			controller : 'newArticleController'
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

trak.controller('articleController', function($scope, $routeParams, $http, $sce) {
	$scope.article_id = $routeParams.article_id;
	$scope.toTrustedHtml = function(html) {
		return $sce.trustAsHtml(html);
	};
	$http.get("http://localhost:8000/articles/" + $scope.article_id).success(function(response) {$scope.article = response;});
})

trak.controller('loginController', function($scope, $http, $window, toastr) {
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
			}).success(function(data) {
				if (data.result === "success") {
					$window.location.href = '#admin';
				}
			})
			.error(function() {
				toastr.error('Incorrect Username or Password', 'Whoops');
			});
	};
})

trak.controller('adminController', function($scope, $http, $window, toastr) {
	$scope.message = "well that worked pretty cleanly";
	$scope.toTrustedHtml = function(html) {
		return $sce.trustAsHtml(html);
	};
	$http.get("http://localhost:8000/articles").success(function(response) {$scope.articles = response.records;});
	$scope.deleteArticle = function(article_id) {
		var result = confirm("Sure you want to delete?");
		if (result){
		$http.delete("http://localhost:8000/articles/" + article_id);
		toastr.error("Deletion complete", "Deleted");
	}
	};
})

trak.controller('newArticleController', function($scope, $http, $window, toastr) {
	$scope.message = "Great Success"

	$scope.submitArticle = function() {
		$scope.formData = $.param({
			"Title" : $scope.article.title,
			"Content" : $scope.article.content,
		});

		$http({
			method : "POST",
			url : 'http://localhost:8000/articles',
			data : $scope.formData,
			headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).success(function(data) {
			if (data.result === "Success") {
				toastr.success("Article submitted successfuly!", "Success!")
				$window.location.reload();
			} else {
				toastr.error("There seems to be an error with the form. Give it another shot!", "Whoops")
			}
		}).error(function(data) {
			toastr.error("There seems to be an error with the form. Give it another shot!", "Whoops")
		})
	};
})
