(function() {
  'use strict';

  angular
    .module('ibm-test-bluebank-frontend.shared')
    .controller('ModalBaseController', ModalBaseController);

  ModalBaseController.$inject = ['$uibModalInstance', '$location', '$routeParams', 'modalCaller', 'errorCode'];


  function ModalBaseController($uibModalInstance, $location, $routeParams, modalCaller) {
    /*jshint validthis: true */
    var modal = this;
    modal.title = 'ModalBaseController';
    modal.caller = modalCaller;

    modal.actionClose = actionClose;
    modal.actionGoTo = actionGoTo;

    function actionClose() {
      $uibModalInstance.dismiss('cancel');
    }

    function actionGoTo(route) {
      $location.path(parseRoute(route));
      modal.actionClose('dismiss');
    }

    function parseRoute(route){

      var rx = /(\D:)(\w+)(\/?)/gi;

      var components, prop;

      while((components=rx.exec(route))){
        prop = components[2];
        route = route.replace(new RegExp(':' + prop, 'gi'), $routeParams[prop]);
      }

      return route;
    }

  }
})();
