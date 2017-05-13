app.run((FIREBASE_CONFIG) => {
	firebase.initializeApp(FIREBASE_CONFIG);
});

app.controller("NavCtrl", ($scope) => {
	$scope.cat = "Meow";
		$scope.navItems = [{
				name: "Logout"
		}, {
				name: "All Items"
		}, {
				name: "New Item"
		}];
});

app.controller("ItemCtrl", ($http, $q, $scope, FIREBASE_CONFIG) => {
		$scope.dog = "Woof!";
		$scope.showListView = true;
		$scope.items = [];

		$scope.newItem = () => {
				$scope.showListView = false;
		};

		$scope.allItems = () => {
				$scope.showListView = true;
		};

		let getItemList = () => {
			let items = [];
			return $q((resolve, reject) => {
				$http.get(`${FIREBASE_CONFIG.databaseURL}/items.json`)
				.then(fbItems => {
					fbItems = fbItems.data;
          Object.keys(fbItems).forEach((key) => {
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
			.then(items => {$scope.items = items})
			.catch(error => console.log("Error - getItems", error));
		};

		getItems();
});