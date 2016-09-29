djello.controller('SessionCtrl', 
	['$scope', 'Auth', '$state', function($scope, Auth, $state) {

		$scope.errors = [];

		$scope.signin = function(valid) {
			if (valid) {

				config = {
					headers: {
						'X-HTTP-Method-Override': 'POST'
					}
				}

				Auth.login($scope.user, config).then(
					function(user) {
						$state.go('app');
					}, function(response) {
						$scope.errors.push("This user doesn't exist");
						console.log("user doesn't exist");
					})
			}
		}

	}])