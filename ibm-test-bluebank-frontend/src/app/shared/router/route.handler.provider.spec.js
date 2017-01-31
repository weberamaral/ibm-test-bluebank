/* global describe, beforeEach, afterEach, it */
'use strict';

describe('RouteHandlerConfig', function () {

  var RouteHandlerConfig;

  beforeEach(function () {
    module('ibm-test-bluebank-frontend');
    inject(function (_RouteHandlerConfig_) {
      RouteHandlerConfig = _RouteHandlerConfig_;
    })
  });

  it('Should exist', function () {
    expect(RouteHandlerConfig).toBeDefined();
  });

  describe('#config', function () {
    it('Should exist', function () {
      expect(RouteHandlerConfig.config).toBeDefined();
    });
    it('Should exist property docTitle', function () {
      expect(RouteHandlerConfig.config.docTitle).toBeDefined();
    });
    it('Should exist property $routeProvider', function () {
      expect(RouteHandlerConfig.config.$routeProvider).toBeDefined();
    });
  });

});
