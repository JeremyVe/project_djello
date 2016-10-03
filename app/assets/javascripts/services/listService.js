djello.factory('listService', 
	['Restangular', '_', function(Restangular, _) {

	var service = {};

	var _lists = [];


	service.getLists = function(boardId) {
		return Restangular.one('boards', boardId).all('lists').getList().then(function(lists) {
			angular.copy(lists, _lists);
		}).then(function() {
			return _lists;
		})
	}

	service.createList = function(boardId) {
		return Restangular.one('boards', boardId).all('lists').post({
			list: {
				title: 'new list',
				description: 'new description'
			}
		}).then(function(list) {
			_lists.push(list);
			return list;
		})
	}

	service.deleteList = function(id) {

		var list = _.find(_lists, function(list) { return list.id === id });

		list.remove().then(function() {	

			var listId = _.findIndex(_lists, function(listed) { return listed.id === id });
			
			_lists.splice(listId, 1);

			})

	}

	return service;

}])