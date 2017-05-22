app.controller("ItemViewCtrl", function($routeParams, $scope, ItemFactory) {
	$scope.selectedItem = {};

	ItemFactory.getSingleItem($routeParams.id)
	.then(result => {console.log(result); $scope.selectedItem = result;})
	.catch(error => console.log("error in getSingleItem", error));
});