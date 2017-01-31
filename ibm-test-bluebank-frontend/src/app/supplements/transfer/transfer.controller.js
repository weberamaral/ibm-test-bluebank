(function () {
  'use strict';

  angular
    .module('ibm-test-bluebank-frontend.supplements')
    .controller('TransferController', TransferController);

  TransferController.$inject = ['$routeParams', 'TransferService', 'ModalBaseService'];

  function TransferController ($routeParams, TransferService, ModalBaseService) {
    var vm = this;
    vm.title = 'Transferencia';
    vm.transfer = transfer;

    vm.toAccountData = {
      toAccountAgency: '',
      toAccountNumber: '',
      value: 0
    };

    init();

    function init () {
      TransferService.get($routeParams.id).then(function (res) {
        vm.fromAccount = res;
      }).catch(function (err) {
        var options = { template: 'app/supplements/transfer/transfer.modal.html' };
        var scope = {
          message: err.data.message,
          title: 'Falha ao recuperar informações'
        };
        ModalBaseService(options, scope);
      })
    }

    function transfer () {
      var data = vm.toAccountData;
      data.fromAccountAgency = vm.fromAccount.agency;
      data.fromAccountNumber = vm.fromAccount.number;
      TransferService.post(data).then(function (res) {
        TransferService.commit(res.id).then(function (res) {
          vm.fromAccount.balance = res.balance;
          var options = { template: 'app/supplements/transfer/transfer.modal.html' };
          var scope = {
            message: 'Transferencia efetuada com sucesso',
            title: 'Transferencia efetuada com sucesso'
          };
          ModalBaseService(options, scope);
        }).catch(function (err) {
          var options = { template: 'app/supplements/transfer/transfer.modal.html' };
          var scope = {
            message: err.data.message,
            title: 'Transferencia pendente'
          };
          ModalBaseService(options, scope);
        })
      }).catch(function (err) {
        var options = { template: 'app/supplements/transfer/transfer.modal.html' };
        var scope = {
          message: err.data.message,
          title: 'Falha na transferencia'
        };
        ModalBaseService(options, scope);
      })
    }
  }
})();
