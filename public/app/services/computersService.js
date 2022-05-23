/**
* ComputersService Module
*
* Description
*/
angular.module('ComputersService', []).factory('ComputersService', function($http){

	var service = {};

	service.all = function() {
		return $http.get('http://localhost:7070/api/computers');
	}
	return service;
})