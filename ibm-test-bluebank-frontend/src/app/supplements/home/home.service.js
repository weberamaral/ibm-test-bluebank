(function () {
  'use strict';

  angular
    .module('ibm-test-bluebank-frontend.supplements')
    .factory('HomeService', HomeService);

  HomeService.$inject = [];

  function HomeService () {
    var service = {
      getDateAsISOString: getDateAsISOString
    };

    function getDateAsISOString () {
      return new Date().toISOString();
    }

    return service;
  }
})();
