define('ember-composability-tools/mixins/render-block', ['exports', 'ember', 'ember-composability-tools/templates/render-block'], function (exports, _ember, _emberComposabilityToolsTemplatesRenderBlock) {
  var Mixin = _ember['default'].Mixin;
  var computed = _ember['default'].computed;
  var getOwner = _ember['default'].getOwner;
  exports['default'] = Mixin.create({
    layout: _emberComposabilityToolsTemplatesRenderBlock['default'],

    fastboot: computed(function () {
      var owner = getOwner(this);
      return owner.lookup('service:fastboot');
    }),
    isFastBoot: computed('fastboot', function () {
      return this.get('fastboot') && this.get('fastboot.isFastBoot');
    }),

    destinationElementTag: 'div',

    // creates a document fragment that will hold the DOM
    destinationElement: computed(function () {
      if (!this.get('isFastBoot')) {
        return document.createElement(this.get('destinationElementTag'));
      }
    })
  });
});