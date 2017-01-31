(function () {
  'use strict';

  angular
    .module('ibm-test-bluebank-frontend.supplements')
    .config(routeConfig);

  routeConfig.$inject = ['$routeProvider'];

  function routeConfig ($routeProvider) {
    $routeProvider.when('/contas/:id', {
      templateUrl: 'app/supplements/transfer/transfer.html',
      controller: 'TransferController',
      controllerAs: 'vm',
      config: {
        title: 'Transferencia'
      }
    })
  }
})();
