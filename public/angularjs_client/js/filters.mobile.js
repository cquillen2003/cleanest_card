var cleanCardFilters = angular.module('cleanCardFilters', []);


cleanCardFilters.filter('item', function() {

	return function(items, selectedCategories, expandAll) {
		items = items || [];
		selectedCategories = selectedCategories || [];
		expandAll = expandAll || false;

		var filteredItems = [];

		angular.forEach(items, function (item, key) {

			if (expandAll) {
				if (item.items_count === 0) {
					//Check category is selected
					filteredItems.push(item);
					//selectedCategories.forEach(function (categoryId) {
						//if (item.linkable_id === categoryId) {
							
						//}
					//});					
				}
			}
			else {
				if (item.linkable_type === 'Category') {
					//Check category is selected
					selectedCategories.forEach(function (categoryId) {
						if (item.linkable_id === categoryId) {
							filteredItems.push(item);
						}
					});
				}				
			}

		});
		return filteredItems;
	}

});