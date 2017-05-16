
app.controller("ItemCtrl", function($http, $q, $scope, FIREBASE_CONFIG) {
	$scope.items = [];

	let getItemList = () => {
		let items = [];
		return $q((resolve, reject) => {
			$http.get(`${FIREBASE_CONFIG.databaseURL}/items.json`)
			.then(fbItems => {
				fbItems = fbItems.data;
        Object.keys(fbItems).forEach(key => {
          fbItems[key].id=key;
          items.push(fbItems[key]);
        	resolve(items);
        });
			})
			.catch(error => {reject(error);});
		});
	};

	let getItems = () => {
		getItemList()
		.then(items => {$scope.items = items;})
		.catch(error => console.log("Error - getItems", error));
	};

	getItems();

	let postNewItem = (newItem) => {
		return $q((resolve, reject) => {
			$http.post(`${FIREBASE_CONFIG.databaseURL}/items.json`, JSON.stringify(newItem))
			.then(result => resolve(result))
			.catch(error => reject(error));
		});
	};

	$scope.addNewItem = () => {
		$scope.newTask.isCompleted = false;
		postNewItem($scope.newTask).then((response) => {
			$scope.newTask = {};
			getItems();
		}).catch(error => console.log("error in addNewItem", error));
	};
		
});