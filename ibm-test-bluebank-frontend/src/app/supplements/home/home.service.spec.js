/* global describe, beforeEach, afterEach, it */
'use strict';

describe('HomeService', function () {

  beforeEach(module('ibm-test-bluebank-frontend'));

  it('Should exist', function () {
    angular.mock.inject(function (HomeService) {
      expect(HomeService).toBeDefined();
    });
  });

  describe('#getDateAsISOString', function () {
    it('Should exist', function () {
      angular.mock.inject(function (HomeService) {
        expect(HomeService.getDateAsISOString).toBeDefined();
      });
    });
    it('Shoud return an date string valid', function () {
      angular.mock.inject(function (HomeService) {
        var dtString = HomeService.getDateAsISOString();
        expect(dtString).toEqual(jasmine.any(String));
      });
    })
  });

});
