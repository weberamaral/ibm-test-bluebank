(function () {
  'use strict';

  angular
    .module('ibm-test-bluebank-frontend', [
      'ngRoute',
      'ibm-test-bluebank-frontend.shared',
      'ibm-test-bluebank-frontend.supplements'
    ])
    .run(run);

  run.$inject = ['RouteHandler'];

  function run (RouteHandler) {
    RouteHandler.configure();
  }

})();
