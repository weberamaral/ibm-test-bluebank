(function () {
  'use strict';

  angular
    .module('ibm-test-bluebank-frontend.supplements')
    .factory('AccountListService', AccountListService);

  AccountListService.$inject = ['$http', 'APP_CONSTANTS'];

  function AccountListService ($http, APP_CONSTANTS) {
    var service = {
      list: list
    };

    function list () {
      return $http.get(APP_CONSTANTS.API_URL + '/accounts')
        .then(onListSuccess).catch(onListError);
    }

    function onListSuccess(res) {
      return res.data;
    }

    function onListError(err) {
      throw {
        status: err.status,
        data: err.data
      }
    }

    return service;
  }
})();
