(function () {
  'use strict';

  angular
    .module('ibm-test-bluebank-frontend')
    .factory('RouteHandler', RouteHandler);

  RouteHandler.$inject = ['$rootScope', '$location', 'RouteHandlerConfig'];

  function RouteHandler($rootScope, $location, RouteHandlerConfig) {
    var handlingRouteChangeError = false;
    var routeCounts = {
      change: 0,
      error: 0
    };
    var $routeProvider = RouteHandlerConfig.config.$routeProvider;
    var service = {
      configure: configure
    };

    function configure() {
      handleRouteStart();
      handleRouteSuccess();
      handleRouteError();
      routeConfig();
    }

    function handleRouteStart() {
      /*eslint-disable no-unused-vars*/
      var event = $rootScope.$on('$routeChangeStart', function (event, next, current) {
      });
    }

    function handleRouteSuccess() {
      /*eslint-disable no-unused-vars*/
      var event = $rootScope.$on('$routeChangeSuccess', function (event, current) {
        routeCounts.change++;
        handlingRouteChangeError = false;
        if (current.config) {
          $rootScope.docTitle = RouteHandlerConfig.config.docTitle + ' ' + (current.config.title || '');
        }
      });
    }

    function handleRouteError() {
      /*eslint-disable no-unused-vars*/
      var event = $rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {
        if (handlingRouteChangeError) {
          return;
        }
        handlingRouteChangeError = true;
        routeCounts.error++;
        var destination = (current && (current.config.title || current.name || current.loadedTemplateUrl)) || 'unknown target';
        if (rejection.redir && rejection.redir !== '') {
          $location.url(rejection.redir);
        }
      });
    }

    function routeConfig() {
      $routeProvider.otherwise({
        redirectTo: '/404'
      });
    }

    return service;
  }
})();
