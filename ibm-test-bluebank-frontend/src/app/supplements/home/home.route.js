(function () {
  'use strict';

  angular
    .module('ibm-test-bluebank-frontend.supplements')
    .config(routeConfig);

    routeConfig.$inject = ['$routeProvider'];

    function routeConfig ($routeProvider) {
      $routeProvider.when('/', {
        templateUrl: 'app/supplements/home/home.html',
        controller: 'HomeController',
        controllerAs: 'vm',
        config: {
          title: 'Página inicial'
        }
      })
    }
})();
