define('ember-fetch/ajax', ['exports', 'fetch'], function (exports, _fetch) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = ajax;
  function ajax(...args) {
    return (0, _fetch.default)(...args).then(response => {
      if (response.ok) {
        return response.json();
      }

      throw response;
    });
  }
});