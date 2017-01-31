(function () {
  'use strict';

  angular
    .module('ibm-test-bluebank-frontend.supplements')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['HomeService'];

  function HomeController (HomeService) {
    var vm = this;
    vm.title = 'Bluebank Frontend';
    vm.now = HomeService.getDateAsISOString();

    init();

    function init () {

    }
  }
})();
