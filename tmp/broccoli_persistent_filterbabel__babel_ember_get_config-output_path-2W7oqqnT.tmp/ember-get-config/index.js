define('ember-get-config/index', ['exports', 'cyclorama-kiosk/config/environment'], function (exports, _cycloramaKioskConfigEnvironment) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _cycloramaKioskConfigEnvironment['default'];
    }
  });
});