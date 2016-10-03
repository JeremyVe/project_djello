djello.factory('cardService', 
	['Restangular', function(Restangular) {

		var service = {};

		var _card;

		service.createCard = function(boardId, listId) {
			return Restangular.one('boards', boardId).one('lists', listId).all('cards').post({
				card: {
					title: 'new Card',
					description: 'write a content'
				},
				list_id: listId,
				board_id: boardId
			})
		}

		service.getCard = function(boardId, listId, cardId) {
			return Restangular.one('boards', boardId).one('lists', listId).one('cards', cardId).get()
				.then(function(card) {
					_card = card;
				}).then(function() {
					return _card;
				})
		}

		service.updateCard = function(card, boardId, listId, field, key) {

			card[field] = key;

			return card.put();

		}

		return service;

	}])