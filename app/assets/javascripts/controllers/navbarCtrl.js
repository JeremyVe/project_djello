djello.controller('NavbarCtrl',
	['$scope', 'Auth', '$state',
	function($scope, Auth, $state) {

		$scope.$on('devise:login', function(event, user) {
			$scope.currentUser = user;
		})

	}])