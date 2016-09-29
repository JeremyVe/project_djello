djello.controller('AppCtrl', 
	['$scope', 'Auth', '$state', 'currentUser',
	function($scope, Auth, $state, currentUser) {

		$scope.currentUser = currentUser;

	}])