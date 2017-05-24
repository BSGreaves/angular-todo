app.controller("ItemListCtrl", function($scope, $rootScope, ItemFactory) {
	
	$scope.items = [];

	let getItems = () => {
		ItemFactory.getItemList($rootScope.user.uid)
		.then(items => $scope.items = items)
		.catch(error => console.log("Error - getItems", error));
	};

	getItems();
	
	$scope.deleteItem = id => {
		ItemFactory.deleteItem(id)
		.then(() => getItems())
		.catch(error => console.log("error in deleteItem", error));
	};

	$scope.inputChange = item => {
		ItemFactory.editItem(item)
		.catch(error => console.log("Error in inputChange", error));
	};

});