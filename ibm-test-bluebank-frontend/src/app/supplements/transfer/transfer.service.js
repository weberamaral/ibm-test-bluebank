(function () {
  'use strict';

  angular
    .module('ibm-test-bluebank-frontend.supplements')
    .factory('TransferService', TransferService);

  TransferService.$inject = ['$http', 'APP_CONSTANTS'];

  function TransferService ($http, APP_CONSTANTS) {
    var service = {
      get: get,
      post: post,
      commit: commit
    };

    function get (id) {
      return $http.get(APP_CONSTANTS.API_URL + '/accounts/' + id)
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

    function post (data) {
      return $http.post(APP_CONSTANTS.API_URL + '/transactions', data)
        .then(onPostSuccess).catch(onPostError);
    }

    function onPostSuccess (res) {
      return res.data;
    }

    function onPostError (err) {
      throw {
        status: err.status,
        data: err.data
      }
    }

    function commit (id) {
      return $http.put(APP_CONSTANTS.API_URL + '/transactions/' + id)
        .then(onCommitSuccess).catch(onCommitError);
    }

    function onCommitSuccess (res) {
      return res.data;
    }

    function onCommitError (err) {
      throw {
        status: err.status,
        data: err.data
      }
    }

    return service;
  }
})();
