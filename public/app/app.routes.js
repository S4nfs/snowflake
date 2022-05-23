/**
* Routes Module
*
* main application routes
* NOT USED
*/
angular.module('appRoutes', ['ngRoute'])
	.config(function($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'app/views/pages/dashboard.html',
				controller: 'dashboardController',
				controllerAs: 'dashboard'
			})
			.otherwise({
				redirectTo: '/'
			});

			$locationProvider.html5mode(true);
	});