djello.controller('ListCtrl', 
	['$scope', 'board', 'listService', 'lists', '_', 'cardService', 'ModalService',
	function($scope, board, listService, lists, _, cardService, ModalService) {

		$scope.board = board;
		$scope.lists = lists;



		$scope.$on('card.update', function(event, card, listId) {
			var list = _findList(listId);
			for (var i = 0; i < list.cards.length; i++) {
				if ( list.cards[i].id === card.id ) {
					list.cards[i] = card;
					break;
				}
			}
		})




		$scope.$on('card.completed', function(event, cardId, listId) {
			var list = _findList(listId);
			var index = _.indexOf(list.cards, function(card) { return card.id == cardId })
			list.cards.splice(index, 1);
		})


// Create Edit list to permit in place editing



		$scope.edit = {};

		for (var i = 0; i < $scope.lists.length; i++) {

			var list = $scope.lists[i];
			$scope.edit[list.id] = {
				title: list.title,
				description: list.description,
				edit: {
					title: false,
					description: false
				}
			}
		}



// create / swipe / cancel / update actions link to editing a list



		$scope.createList = function() {
			console.log(board);
			listService.createList(board.id).then(function(list) {
				$scope.edit[list.id] = {
					title: list.title,
					description: list.description,
					edit: {
						title: false,
						description: false
					}
				}
			})
		}



		$scope.deleteList = function(id) {

			listService.deleteList(id);			
		}




		$scope.createCard = function(listId) {
			cardService.createCard(board.id, listId).then(function(card) {
				var list = _findList(listId);

				if (!list.cards) { list.cards = [] }

				list.cards.push(card);
			})
		}




		$scope.switchEditMode = function(id, field) {
			$scope.edit[id].edit[field] = !$scope.edit[id].edit[field];
		}



		$scope.cancelEdit = function(id, field) {
			var list = _findList(id);
			$scope.edit[id][field] = list[field];
			$scope.switchEditMode(id, field);
		}



		$scope.updateEdit = function(id, field) {
			var list = _findList(id);
			
			list[field] = $scope.edit[id][field];

			if (field === 'description') {
				list.put( {description: list[field]} );
			} else if (field === 'title') {
				list.put( {title: list[field]} );
			}

			$scope.switchEditMode(id, field);
		}

		


		$scope.showCard = function(listId, cardId) {

			var list = _findList(listId);
			var card = _.find(list.cards, function(card) {return card.id == cardId});

			ModalService.showModal({
				templateUrl: '/templates/cards/show.html',
				controller: 'CardCtrl',
				inputs: {
					board: $scope.board,
					listId: listId,
					cardId: cardId
				}
			}).then(function(modal) {
				
				modal.close.then(function(response) {
					console.log('modal closed!');
				})
			})
		}



		function _findList(id) {
			return _.find($scope.lists, function(list) { return list.id === id });
		}
	}])








