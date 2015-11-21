angular.module('thekeywordthis', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/main');
  $stateProvider
    .state('main', {
      url: '/main',
      controller: 'mainController',
      templateUrl: '../assets/main.html'
    })
})

.controller('mainController', function($scope, $http) {
  $scope.code = {}

  $scope.submitCode = function(code) {
    console.log(JSON.stringify(code));
    return $http({
      method: 'POST',
      url: '/usercode',
      headers: {
        "Content-Type": "application/JSON"
      },
      data: {code: code}
    }).then(function(res) {
      console.log(res.data);
      $scope.code = res.data;
    })
  }
})