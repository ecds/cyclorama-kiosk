define('ember-composability-tools/index', ['exports', 'ember-composability-tools/mixins/child', 'ember-composability-tools/mixins/parent', 'ember-composability-tools/mixins/render-block'], function (exports, _emberComposabilityToolsMixinsChild, _emberComposabilityToolsMixinsParent, _emberComposabilityToolsMixinsRenderBlock) {
  Object.defineProperty(exports, 'ChildMixin', {
    enumerable: true,
    get: function get() {
      return _emberComposabilityToolsMixinsChild['default'];
    }
  });
  Object.defineProperty(exports, 'ParentMixin', {
    enumerable: true,
    get: function get() {
      return _emberComposabilityToolsMixinsParent['default'];
    }
  });
  Object.defineProperty(exports, 'RenderBlockMixin', {
    enumerable: true,
    get: function get() {
      return _emberComposabilityToolsMixinsRenderBlock['default'];
    }
  });
});