define('ember-uikit/components/uk-flex', ['exports', 'ember-uikit/templates/components/uk-flex', 'ember-uikit/mixins/flex'], function (exports, _ukFlex, _flex) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend(_flex.default, {
    layout: _ukFlex.default,

    flex: true,

    inline: Ember.computed.alias('flexInline'),
    vertical: Ember.computed.alias('flexVertical'),
    horizontal: Ember.computed.alias('flexHorizontal'),
    direction: Ember.computed.alias('flexDirection'),
    wrap: Ember.computed.alias('flexWrap'),
    wrapAlignment: Ember.computed.alias('flexWrapAlignment')
  });
});