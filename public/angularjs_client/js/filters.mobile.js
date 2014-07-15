var cleanCardFilters = angular.module('cleanCardFilters', []);


cleanCardFilters.filter('category', function() {

	return function(items, selectedCategories) {
		items = items || [];
		selectedCategories = selectedCategories || [];

		var filteredItems = [];

		angular.forEach(items, function (item, key) {
			selectedCategories.forEach(function (categoryId) {
				if (item.linkable_id === categoryId) {
					filteredItems.push(item);
				}
			});
		});
		return filteredItems;
	}

});