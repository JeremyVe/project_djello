djello.controller('BoardShowCtrl', 
	['$scope', 'board', 'listService', 'lists', '_',
	function($scope, board, listService, lists, _) {

		$scope.board = board;

		$scope.lists = lists;


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

		$scope.swipeEdit = function(id, field) {
			$scope.edit[id].edit[field] = !$scope.edit[id].edit[field];
		}

		$scope.cancelEdit = function(id, field) {
			var list = _.find($scope.lists, function(list) { return list.id === id });
			$scope.edit[id][field] = list[field];
			$scope.swipeEdit(id, field);
		}

		$scope.updateEdit = function(id, field) {
			var list = _.find($scope.lists, function(list) { return list.id === id });
			
			list[field] = $scope.edit[id][field];

			if (field === 'description') {
				list.put( {description: list[field]} );
			} else if (field === 'title') {
				list.put( {title: list[field]} );
			}

			$scope.swipeEdit(id, field);
		}

		$scope.deleteList = function(id) {

			listService.deleteList(id);			
		}
	}])








