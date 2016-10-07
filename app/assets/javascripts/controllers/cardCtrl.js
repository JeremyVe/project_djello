djello.controller('CardCtrl', 
	['$scope', 'cardService', 'userService', '$rootScope', 'board', 'listId', 'cardId', 'close', 
	function($scope, cardService, userService, $rootScope, board, listId, cardId, close) {



		$scope.loading = true;



		cardService.getCard(board.id, listId, cardId).then(function(card) {
			$scope.card = card;

			$scope.loading = false;

			$scope.edit = {
				title: card.title,
				description: card.description,
				editing: {
					title: false,
					description: false
				}
			}
		})


		$scope.users = [];




		$scope.cancelEdit = function(field) {
			$scope.edit[field] = $scope.card[field];
			$scope.edit.editing[field] = !$scope.edit.editing[field];
		}



		$scope.updateCard = function(field) {

			cardService.updateCard($scope.card, board.id, $scope.card.list_id, field, $scope.edit[field])
				.then(function(card) {
					$rootScope.$broadcast('card.update', card, card.list_id);
					$scope.card[field] = $scope.edit[field];
					$scope.edit.editing[field] = !$scope.edit.editing[field];

				})
		}



		$scope.markCompleted = function() {
			$scope.card.put({completed: true}).then(function() {
				$rootScope.$broadcast('card.completed', $scope.card.id, $scope.card.list_id);
				$scope.close();
			})
		}



		$scope.findUsers = function() {
			userService.findUsers($scope.searchParams)
				.then(function(users) {
					angular.copy(users, $scope.users);
				})
		}



		$scope.addMember = function(user) {
			userService.addMember(user, $scope.card, board).then(function(user) {

				$scope.card.users.push(user);
				$scope.searchMember = false;
			})

		}



		$scope.close = function() {
			close();
		}

	}])