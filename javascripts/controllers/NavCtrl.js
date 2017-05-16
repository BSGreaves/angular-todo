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