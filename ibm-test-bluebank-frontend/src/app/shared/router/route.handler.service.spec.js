/* global describe, beforeEach, afterEach, it */
'use strict';

describe('RouteHandler', function () {

  var RouteHandler,
      RouteHandlerConfig,
      $routeProvider;

  beforeEach(function () {
    module('ibm-test-bluebank-frontend');
    inject(function (_RouteHandler_, _RouteHandlerConfig_, _$route_) {
      RouteHandler = _RouteHandler_;
      RouteHandlerConfig = _RouteHandlerConfig_;
      $routeProvider = _$route_;
      RouteHandlerConfig.config.$routeProvider = $routeProvider;
    })
  });

  it('Should exist', function () {
    expect(RouteHandler).toBeDefined();
  });

  describe('#configure', function () {
    it('Should exist', function () {
      expect(RouteHandler.configure).toBeDefined();
    });
  });

});
