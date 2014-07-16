var cleanCardServices = angular.module('cleanCardServices', ['ngResource', 'goangular', 'restangular']);

 
cleanCardServices.factory('Item', function($resource) {
  //Added .json to fix 406 error.  Found solution in comments of Rails Cast #405
  //Belay my last, I now set json as the default in routes.rb per:
  //http://www.dillonbuchanan.com/programming/ruby-on-rails-angularjs-resources/
  return $resource('/items/:id', {id: '@id'}, {update: {method: 'PUT'}});
});

cleanCardServices.factory('Task', function($resource) {

	return $resource('/items/:itemId/items/:id', {itemId: '@itemId', id: '@id'}, {update: {method: 'PUT'}});

});

cleanCardServices.factory('Category', function($resource) {

	return $resource('/categories/:id', {id: '@id'}, {update: {method: 'PUT'}});

});

cleanCardServices.factory('rtCategories', function($goKey, $goQuery) {

	//var categories = $goKey('categories').$sync();

	var queryResults = $goQuery('categories', { user_ids: 1 }, { limit: 10 }).$sync();
 
	return {
		all: function() {
			return categories;
		},
		query: function() {
			return queryResults;
		}
	}

});


cleanCardServices.factory('rtItems', function($goKey) {

	console.log('goKey items called');
	var items = $goKey('items').$sync();

	return {
		all: function() {
			console.log("rtItems.all() called");
			return items;
		},
		create: function(item) {
			return items.$add(item);
		},
		update: function(id, attr) {
			var item = items.$key(id);
			angular.forEach(attr, function(value, key) {
				item.$key(key).$set(value);
			});
		},
		get: function(id) {
			console.log("rtItems.get() called");
			return $goKey(id).$sync();
		},
		deleteItem: function(id) {
			items.$key(id).$remove();
		},

		//Non RESTFUL actions
		nextStatus: function(id, status) {
			var item = items.$key(id);
		  	var attr;

		  	if (status === 'backlog') {
		  		attr = {status: 'planned'};
		  	}
		  	else if (status === 'planned') {
		  		attr = {status: 'started'};
		  	}
		  	else if (status === 'started') {
		  		attr = {status: 'done'};
		  	}
		  	else {
		  		attr = {};
		  	}

			//TODO: Refactor: This part is same as update() method above, but not sure how to call it from here
			angular.forEach(attr, function(value, key) {
				item.$key(key).$set(value);
			});		  	
		}
	}
});

//Item service using Restangular
//Borrowed ideas from the following:
//https://gist.github.com/auser/6776068
//http://www.ng-newsletter.com/posts/restangular.html
cleanCardServices.factory('ItemService', function($rootScope, Restangular) {

	var baseItems = Restangular.all('items');

	return {
		getItems: function() {
			return baseItems.getList();
		},
		getItem: function(id) {
			return Restangular.one('items', id).get();
		},
		addItem: function(item) {
			return baseItems.post(item).then(function(item) {
				console.log('add item success called from service');
				$rootScope.$broadcast('items:added');
			});
		},
		updateItem: function(item, attr) {
			angular.forEach(attr, function(value, key) {
				item[key] = value;
			});
			return item.put().then(function(item) {
				$rootScope.$broadcast('items:updated');
			});
		},
		removeItem: function(item) {
			return item.remove().then(function(item) {
				console.log('then method called in service');
				$rootScope.$broadcast('items:deleted');
			});
		},

		//Non RESTFUL actions

		//Plan an item with tasks (aka project)
		planProject: function(item) {
			var tasks = [];
			item.getList('items').then(function(items) {
				tasks = items;

				angular.forEach(tasks, function(task, key) {
					task.status = 'planned';
					task.put().then(function(task) {
						//Broadcast 'items.updated' event only after last task updated
						if (key === (tasks.length - 1)) {
							$rootScope.$broadcast('items:updated');
						}
					});
				});
			});	
		},

		calculateNextStatus: function(currentStatus) {
		  	if (currentStatus === 'backlog') {
		  		return 'planned';
		  	}
		  	else if (currentStatus === 'planned') {
		  		return 'started';
		  	}
		  	else if (currentStatus === 'started') {
		  		return 'done';
		  	}
		  	else {
		  		return currentStatus;
		  	}
		}
	}

});


cleanCardServices.factory('CategoryService', function(Restangular) {

	var baseCategories = Restangular.all('categories');

	return {
		getCategories: function() {
			return baseCategories.getList();
		}
	}

});





