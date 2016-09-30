djello.controller('BoardCtrl', 
	['$scope', 'boardService', 'boards', '$state',
	function($scope, boardService, boards, $state) {

		$scope.boards = boards;

		$scope.createBoard = function() {
			boardService.createBoard();
		}

		$scope.deleteBoard = function(id) {
			boardService.deleteBoard(id);
		}

		$scope.changeBoard = function(id) {
			$state.go('boards.show', {id: id});
		}

	}])