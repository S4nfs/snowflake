/**
* dashboardController Module
*
* Description
*/
angular.module('dashboardController', ['ComputersService'])
	.controller('dashboardCtrl', function($scope, ComputersService, $http){
		var vm = this;

		getData();

		vm.updateStatusRow = function(computer, virt) {
			if(!vm.machine) {
				vm.machine = {};	
			}
			this.computer = computer || 0;
			this.virt = virt || 0;
			if(virt != '') {
				var index = 2;
				vm.machine[this.computer] = vm.computers[this.computer].virtuals[this.virt];
			}
			else {
				vm.machine[this.computer] = {};
			}


		}

		vm.updateComputerStatus = function(index) {
			vm.compip = vm.computers[index].ip;
			vm.compstatus = vm.computers[index].status;
		}

		vm.getVirts = function(ip) {
			$http.get('http://localhost:7070/api/getvirts/'+ip);
		};

		vm.makeSnapshot = function(machine, ip) {
			if(machine) {
				console.log("Push snapshot request");
				console.log("machine Name: " + machine.name);
				console.log("IP Physical machine: " + ip);
			}
		}
		vm.clone = function(machine, ip) {
			if(machine) {
				console.log("Push clone request");
				console.log("machine Name: " + machine.name);
				console.log("IP Physical machine: " + ip);
			}
		}
		vm.startVirt = function(machine, ip) {
			if(machine) {
				console.log("Push startVirt request");
				console.log("machine Name: " + machine.name);
				console.log("IP Physical machine: " + ip);
			}
		}
		vm.stopVirt = function(machine, ip) {
			if(machine) {
				console.log("Push stopVirt request");
				console.log("machine Name: " + machine.name);
				console.log("IP Physical machine: " + ip);
			}
		}

		vm.shutdown = function(ip) {
			console.log(ip);
			$http.post('http://localhost:7070/api/shutdown/' + ip);
		}

		function getData() {
			ComputersService.all().success(function(data) {
				vm.computers = data;
				console.log(data);

				for(var i =0;i<data.length;i++) {
					vm.computers[i].virts = $http.get('http://localhost:7070/api/virtlist/'+data[i].ip);
				}
				console.log(vm.computers)
			})

		}

		vm.refreshData = function() {
			getData();
		}
	});