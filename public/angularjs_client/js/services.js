var cleanCardServices = angular.module('cleanCardServices', ['ngResource', 'goangular']);

 
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

	var items = $goKey('items').$sync();

	return {
		all: function() {
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
		}
	}


});





//Initial attempt, but had questions about keeping the items array up to date
//Led me to look into GoInstant's GoAngular that I learned about in the Google video
//that I found after searching for AngularJS models
cleanCardServices.factory('ItemService', function($resource) {

	var items = [];

	var Item = $resource('/items/:id', {id: '@id'}, {update: {method: 'PUT'}});

	items = Item.query(function(response) {
		console.log("query success");
	});

	return {

		//Array of all items (probably limited to items in view or soon to be)
		//all: [],

		all: function() {
			console.log("all method was called!");
			//Call to server to get all items (items and tasks in seperate arrays?)
			return items;
		},

		find: function(itemId) {
			//Searches array for item by id, if not found get from server
			//Add to array if server call made
		},

		create: function(item) {
			//Add item to array
			//Add to server
			//If server call fails, do something (TBD)
		},

		update: function(attr) {
			//Find object in array, update it with passed in attributes
			//Update on server
			//If server call fails, do something (TBD)
		},

		deleteItem: function(item) {
			//Remove from items array
			//Remove from server
			//If server call fails, do something (TBD)
		}

	}
});