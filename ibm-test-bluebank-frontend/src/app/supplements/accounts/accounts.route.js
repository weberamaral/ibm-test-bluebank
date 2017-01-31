(function () {
  'use strict';

  angular
    .module('ibm-test-bluebank-frontend.supplements')
    .config(routeConfig);

  routeConfig.$inject = ['$routeProvider'];

  function routeConfig ($routeProvider) {
    $routeProvider.when('/contas', {
      templateUrl: 'app/supplements/accounts/accounts.html',
      controller: 'AccountListController',
      controllerAs: 'vm',
      config: {
        title: 'Contas'
      }
    })
  }
})();
