app.controller("ItemListCtrl", function($scope, ItemFactory) {
	
	$scope.items = [];

	ItemFactory.getItemList()
	.then(items => {$scope.items = items;})
	.catch(error => console.log("Error - getItems", error));


});