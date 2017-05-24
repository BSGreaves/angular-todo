app.controller("AuthCtrl", function($location, $rootScope, $scope, AuthFactory, UserFactory) {

	$scope.alerts = [];

	$scope.auth = {
		email: "a@a.com",
		password: "aaaaaa"
	};

	if($location.path() === "/logout") {
		AuthFactory.logout();
		$rootScope.user = {};
		$location.url("/auth");
	}

	let logMeIn = () => {
		AuthFactory.authenticate($scope.auth)
		.then(userCreds => {
			console.log("UserCreds", userCreds);
			return UserFactory.getUser(userCreds.uid);
		}, (error) => {
			$scope.alerts[0] = {msg: error.message};
		})
		.then(user => {
			$rootScope.user = user;
			$location.url("/items/list");
			console.log("user", user);
		})
		.catch(error => console.log("Error in logMeIn/GetUser", error));
	};

	$scope.registerUser = () => {
		AuthFactory.registerWithEmail($scope.auth)
		.then((didRegister) => {
		$scope.auth.uid = didRegister.uid;
			return UserFactory.addUser($scope.auth);
		}, (error) => {
			console.log("Error in registerUser", error);
		}).then((registerComplete) => {
			logMeIn();
		}).catch((error) => {
			console.log("Error in addUser", error);
		});
	};

	$scope.loginUser = () => {
		logMeIn();
	};

});