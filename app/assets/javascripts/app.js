var djello = angular.module('Djello', ['ui.router', 'restangular', 'Devise'])

	.config(
		['$urlRouterProvider', '$stateProvider',
		function($urlRouterProvider, $stateProvider) {

			$urlRouterProvider.otherwise('/app');

			$stateProvider

				.state('app', {
					url: '/app',
					templateUrl: '/templates/boards.html',
					resolve: {
						currentUser: ['Auth', function(Auth) {
							return Auth.currentUser();
						}]
					},
					controller: 'AppCtrl'
				})

		}])