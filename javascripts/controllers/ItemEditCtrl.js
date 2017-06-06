app.controller("ItemEditCtrl", function($location, $routeParams, $scope, ItemFactory) {
	$scope.newTask = {};

	ItemFactory.getSingleItem($routeParams.id)
	.then(result => {
		result.dueDate = new Date(result.dueDate);
		$scope.newTask = result;
	})
	.catch(error => console.log("error in getSingleItem", error));

	$scope.addNewItem = () => {
		ItemFactory.editItem($scope.newTask).then(() => {
			$scope.newTask = {};
			$location.url("/items/list");
		}).catch(error => console.log("error in addNewItem in EditCtrl", error));
	};

});