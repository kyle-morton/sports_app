var sportsNewsApp = angular.module('sportsNewsApp', ['ngAnimate', 'app.routes', 'authService', 
							'mainCtrl', 'userCtrl', 'userService']);

// application configuration to integrate token into requests
sportsNewsApp.config(function($httpProvider) {

	// attach our auth interceptor to ALL http requests
	$httpProvider.interceptors.push('AuthInterceptor');

});

//userApp is the overall application, adding dependencies including controllers and services as
//needed!