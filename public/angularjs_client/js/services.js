var cleanCardServices = angular.module('cleanCardServices', ['ngResource']);


cleanCardServices.factory('ItemService', function($resource) {

  var Item = $resource("http://localhost:3000/items/:id.json", {id: 1}, {update: {method: "PUT"}});

  return {
    get: function(itemId) {
      return Item.get(itemId);
    }
  }

});