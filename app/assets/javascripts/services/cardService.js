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
			console.log('board id: '+ boardId, 'list id :' + listId, 'card id: ' + cardId);
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

		service.updateActivity = function(card, field, content) {

			var description = _updateDescriptionForActivity(card, field, content);

			return Restangular.all('card_activities').post({
				card_id: card.id,
				description: description
			})
		}

		var _updateDescriptionForActivity = function(card, field, content) {

			var description;

			if (field == 'description') {
				description = 'The description has been updated to ' + content;
			} else if (field == 'user') {
				description =  'Users List has been update with ' + content.username;
			} else if(field == 'title') {
				description = 'The title has been updated to ' + content;
			}
			return description;
		}



		return service;

	}])





