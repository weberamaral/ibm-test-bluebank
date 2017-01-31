(function () {
  'use strict';

  angular
    .module('ibm-test-bluebank-frontend')
    .provider('RouteHandlerConfig', RouteHandlerConfig);

  RouteHandlerConfig.$inject = [];

  function RouteHandlerConfig() {
    this.config = {
      $routeProvider: null,
      docTitle: ''
    };
    this.$get = function () {
      return {
        config: this.config
      };
    }
  }
})();
