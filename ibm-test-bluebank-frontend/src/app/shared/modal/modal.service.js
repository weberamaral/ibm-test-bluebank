(function() {
  'use strict';

  angular
    .module('ibm-test-bluebank-frontend.shared')
    .service('ModalBaseService', ModalBaseService);

  ModalBaseService.$inject = ['$uibModal'];


  function ModalBaseService($uibModal) {

    return function (options, callerScope) {

      var uibModalInstance = $uibModal.open({
        templateUrl: options.template,
        controller: options.controller || 'ModalBaseController',
        controllerAs: options.controllerAs || 'modal',
        backdrop: options.backdrop || 'static',
        resolve: {
          modalCaller: function(){
            return callerScope;
          },
          errorCode: function(){
            return options.errorCode;
          }
        }
      });

      return uibModalInstance;
    };
  }
})();
