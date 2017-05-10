var app = angular.module("TodoApp", []);

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

app.controller("ItemCtrl", ($scope) => {
    $scope.dog = "Woof!";
    $scope.showListView = true;
    $scope.items = [{
        id: 0,
        task: "mow the lawn",
        isCompleted: true,
        assignedTo: "Callan"
    }, {
        id: 1,
        task: "grade quizzes",
        isCompleted: false,
        assignedTo: "Lauren"
    }, {
        id: 2,
        task: "take a nap",
        isCompleted: false,
        assignedTo: "Zoe"
    }];

    $scope.newItem = () => {
        $scope.showListView = false;
    };

    $scope.allItems = () => {
        $scope.showListView = true;
    };
});