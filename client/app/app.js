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

.controller('mainController', function($scope) {

})