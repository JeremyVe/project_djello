djello.controller('NavbarCtrl',
	['$scope', 'Auth',
	function($scope, Auth) {

		$scope.$on('devise:login', function(event, user) {
			$scope.currentUser = user;
		})

	}])