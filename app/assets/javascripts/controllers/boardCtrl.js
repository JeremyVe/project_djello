djello.controller('BoardCtrl', 
	['$scope', 'boardService', '$state', '_',
	function($scope, boardService, $state, _) {


		$scope.loading = true;


		boardService.getBoards().then(function(boards) {
			$scope.boards = boards;
			$scope.loading = false;
			_init();
		})



		function _init() {

			var board_id;
			var index = false;

			if ('id' in $state.params) {
				var board = _.find($scope.boards, function(board) {return board.id == $state.params.id});
			}
			if (board) {
				board_id = $state.params.id;
			} else if ($scope.boards.length > 0) {
				board_id = $scope.boards.length-1;
				index = true;
			} else {
				board_id = undefined;
			}

			_reassignCurrentBoard(board_id, index);	

			if (board_id) {
				$state.go('boards.show', {id: $scope.current.id});
			} 
		}





		var _reassignCurrentBoard = function(id, index) {

			if (id === undefined) {

				$scope.current = {
					board: undefined,
					id: undefined,
					editTitle: undefined
				}
			} else if (index) {

				var lastBoard = $scope.boards[id];

				$scope.current = {
					board: lastBoard,
					id: lastBoard.id,
					editTitle: lastBoard.title
				}
			} else {
				var board = _.find($scope.boards, function(board) { return board.id == id});

				$scope.current = {
					board: board,
					id: id,
					editTitle: board.title
				}

			}

		}



		$scope.changeBoard = function(id, index) {

			_reassignCurrentBoard(id, index);

			if ($scope.boards.length > 0) {
				$state.go('boards.show', {id: $scope.current.id});
			} else {
				$state.go('boards');
			}
		}




		$scope.createBoard = function() {
			boardService.createBoard().then(function(board) {
				var lastIndex = $scope.boards.length-1;

				$scope.changeBoard(lastIndex, true);
			})
		}




		$scope.deleteBoard = function(id) {
			boardService.deleteBoard(id).then(function(boards) {

				var lastIndex = $scope.boards.length-1;
				var index = lastIndex >= 0 ? true : false;
				$scope.changeBoard(lastIndex, index);
			})
		}




		$scope.updateBoard = function() {
			var title = $scope.current.editTitle;
			$scope.current.board.put({title: title})
				.then(function(board) {

					$scope.current.board.title = board.title;

					$scope.current.edit = !$scope.current.edit;
				})
		}




		$scope.cancelEdit = function() {
			$scope.current.editTitle = $scope.current.board.title;
			$scope.current.edit = !$scope.current.edit;
		}



	}])