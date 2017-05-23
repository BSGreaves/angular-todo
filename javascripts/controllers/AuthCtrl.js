app.controller("AuthCtrl", function($scope, AuthFactory, UserFactory) {
	
	$scope.auth = {};

	$scope.registerUser = () => {
		AuthFactory.registerWithEmail($scope.auth)
		.then((didRegister) => {
		$scope.auth.uid = didRegister.uid;
			return UserFactory.addUser($scope.auth);
		}, (error) => {
			console.log("Error in registerUser", error);
		}).then((registerComplete) => {
			console.log("registerComplete", registerComplete);
		}).catch((error) => {
			console.log("Error in addUser", error);
		});
	};

	$scope.loginUser = () => {

	};

});