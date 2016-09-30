djello.config(
		['RestangularProvider', function(RestangularProvider) {
			RestangularProvider.setBaseUrl('/api/v1');
			RestangularProvider.setRequestSuffix('.json');
		}])