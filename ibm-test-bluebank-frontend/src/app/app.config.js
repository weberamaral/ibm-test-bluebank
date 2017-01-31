(function () {
  'use strict';

  angular
    .module('ibm-test-bluebank-frontend')
    .config(config);

  config.$inject = ['$locationProvider', '$routeProvider', '$httpProvider', 'RouteHandlerConfigProvider'];

  function config ($locationProvider, $routeProvider, $httpProvider, RouteHandlerConfigProvider) {
    $locationProvider.html5Mode(true);
    RouteHandlerConfigProvider.config.$routeProvider = $routeProvider;
    configureInterceptors($httpProvider);
  }

  /*eslint-disable no-unused-vars*/
  function configureInterceptors (httpProvider) {
    // Configure interceptors here
  }

})();
