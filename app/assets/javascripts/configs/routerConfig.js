djello.config(
		['$urlRouterProvider', '$stateProvider',
		function($urlRouterProvider, $stateProvider) {

			$urlRouterProvider.otherwise('/boards');

			$stateProvider

				.state('boards', {
					url: '/boards',
					templateUrl: '/templates/boards/index.html',
					resolve: {
						boards: ['boardService', function(boardService) {
							return boardService.getBoards();
						}],
						currentUser: ['Auth', '$state', function(Auth, $state) {
							return Auth.currentUser();
						}]
					},
					controller: 'BoardCtrl'
				})

				.state('boards.show', {
					url: '/:id',
					templateUrl: '/templates/boards/show.html',
					resolve: {
						board: ['boardService', '$stateParams', 
						function(boardService, $stateParams) {

							return boardService.getBoard($stateParams.id);
						}],
						lists: ['listService', '$stateParams', 
						function(listService, $stateParams) {
							return listService.getLists($stateParams.id);
						}]
					},
					controller: 'BoardShowCtrl'
				})

		}])

	// Abstract with views
	
				// .state('boards', {
				// 	url: '/boards',
				// 	abstract: true
				// })
				// .state('board.show', {
				// 	url: '/:id',
				// 	resolve: {
				// 		boards: ['boardService', function(boardService) {
				// 			return boardService.getBoards();
				// 		}],
				// 		currentUser: ['Auth', '$state', function(Auth, $state) {
				// 			return Auth.currentUser();
				// 		}]
				// 	},
				// 	views: {
				// 		'index': {
				// 			templateUrl: '/templates/boards/index.html',
				// 			controller: 'BoardCtrl'
				// 		},
				// 		'show': {

				// 		}
				// 	}
				// })