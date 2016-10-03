djello.controller('BoardCtrl', 
	['$scope', 'boardService', 'boards', '$state', '_',
	function($scope, boardService, boards, $state, _) {

		$scope.boards = boards;

		$scope.currentBoard = {
			board: $scope.boards[$scope.boards.length-1] // .title
		};

		$scope.createBoard = function() {
			boardService.createBoard();
		}

		$scope.deleteBoard = function(id) {
			boardService.deleteBoard(id);
		}

		$scope.changeBoard = function(id) {
			$state.go('boards.show', {id: id});

			var board = _.findWhere($scope.boards, function(board) {board.id === id});

			console.log(board);

			$scope.currentBoard.board = board.title;
		}

	}])