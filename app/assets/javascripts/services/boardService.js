djello.factory('boardService', 
	['Restangular', '_', 
	function(Restangular, _) {

	var service = {};

	var _boards = [];



	service.getBoards = function() {
		return Restangular.all('boards').getList()
			.then(function(boards) {
				angular.copy(boards, _boards);
		}).then(function() {
			return _boards;	
		})
	}



	service.createBoard = function() {
		return Restangular.all('boards').post({
			board: {
				title: 'my new Board'
			}
		}).then(function(board) {
			_boards.push(board);
			return board;
		})
	}



	service.getBoard = function(id) {
		return Restangular.one('boards', id).get();
	}



	service.deleteBoard = function(id) {

		var board = _.find(_boards, function(board) { return board.id == id });

		return board.remove().then(function(response) {
			

			var index;
			for (var i = 0; i < _boards.length; i++) {
				console.log(i);
				if (_boards[i].id == id) { 
					index = i;
					break;
				}
			}

			_boards.splice(index, 1);

			return _boards;
		})
	}



	return service;

}])