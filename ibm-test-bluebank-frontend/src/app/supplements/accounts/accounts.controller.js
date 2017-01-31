(function () {
  'use strict';

  angular
    .module('ibm-test-bluebank-frontend.supplements')
    .controller('AccountListController', AccountListController);

  AccountListController.$inject = ['AccountListService'];

  function AccountListController (AccountListService) {
    var vm = this;
    vm.title = 'Contas';

    init();

    function init () {
      AccountListService.list().then(function (res) {
        vm.accounts = res;
      }).catch(function (err) {
        vm.json = err;
      })
    }
  }
})();
