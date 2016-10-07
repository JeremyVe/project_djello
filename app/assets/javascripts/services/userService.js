djello.factory('userService', 
	['Restangular', function(Restangular) {

		var service = {};



		service.findUsers = function(params) {
			return Restangular.all('users').getList({search: params});
		}



		service.addMember = function(user, card, board) {
			return card.customPUT(card, 'update_card_users', {new_user_id: user.id, board_id: board.id});
		}



		return service;


	}])