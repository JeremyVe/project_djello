djello.controller('CardCtrl', 
	['$scope', 'cardService', '$rootScope', 'boardId', 'listId', 'cardId', 'card', 'board', 'close', 'userService',
	function($scope, cardService, $rootScope, boardId, listId, cardId, card, board, close, userService) {


		cardService.getCard(boardId, listId, cardId).then(function(card) {
			$scope.card = card;

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
			cardService.updateCard($scope.card, boardId, listId, field, $scope.edit[field])
				.then(function(card) {
					$rootScope.$broadcast('card.update', card, listId);
					$scope.card[field] = $scope.edit[field];
					$scope.edit.editing[field] = !$scope.edit.editing[field];
				})
		}

		$scope.markCompleted = function() {
			$scope.card.put({completed: true}).then(function() {
				$rootScope.$broadcast('card.completed', card.id, listId);
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
			userService.addMember(user, $scope.card, board);
		}


		$scope.close = function() {
			close();
		}

	}])