djello.controller('CardCtrl', 
	['$scope', 'cardService', '$rootScope', 'boardId', 'listId', 'cardId', 'card', 'close',
	function($scope, cardService, $rootScope, boardId, listId, cardId, card, close) {


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


		$scope.close = function() {
			close();
		}

	}])