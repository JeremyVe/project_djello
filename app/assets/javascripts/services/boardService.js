djello.factory('boardService', 
	['Restangular', '_', 
	function(Restangular, _) {

	var service = {};

	var _boards = [];

	service.getBoards = function() {
		Restangular.all('boards').getList()
			.then(function(boards) {
				angular.copy(boards, _boards);
		})
		return _boards;
	}

	service.createBoard = function() {
		return Restangular.all('boards').post({
			board: {
				title: 'new Board'
			}
		}).then(function(board) {
			_boards.push(board);
		})
	}

	service.getBoard = function(id) {
		return Restangular.one('boards', id).get();
	}


	service.deleteBoard = function(id) {

		var board = _.find(_boards, function(board) { return board['id'] == id });

		return board.remove().then(function(response) {
			
			var index;
			for (var i = 0; i < _boards.length; i++) {
				if (_boards[i].id === id) { return index = i }
			}
			_boards.splice(index, 1);
			return true;
		})
	}

	return service;

}])