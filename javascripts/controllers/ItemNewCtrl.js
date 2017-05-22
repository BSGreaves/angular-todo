app.controller("ItemNewCtrl", function($http, $location, $q, $scope, FIREBASE_CONFIG, ItemFactory) {

	$scope.addNewItem = () => {
		$scope.newTask.isCompleted = false;
		ItemFactory.postNewItem($scope.newTask).then((response) => {
			$scope.newTask = {};
			$location.url("/items/list");
		}).catch(error => console.log("error in addNewItem", error));
	};

});