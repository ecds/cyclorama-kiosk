define('ember-composability-tools/mixins/child', ['exports', 'ember', 'ember-composability-tools/mixins/parent'], function (exports, _ember, _emberComposabilityToolsMixinsParent) {
  var Mixin = _ember['default'].Mixin;
  var computed = _ember['default'].computed;
  var assert = _ember['default'].assert;
  var tryInvoke = _ember['default'].tryInvoke;
  exports['default'] = Mixin.create({

    // This is intended as an escape hatch, but ideally you would
    // `{{yield` a child contextual component with `parentComponent=this`
    parentComponent: computed(function () {
      return this.nearestOfType(_emberComposabilityToolsMixinsParent['default']);
    }),

    init: function init() {
      this._super.apply(this, arguments);
      tryInvoke(this, 'initParent');
      tryInvoke(this, 'initChild');
    },

    initChild: function initChild() {
      this.registerWithParent();
    },

    willDestroyElement: function willDestroyElement() {
      this._super.apply(this, arguments);
      if (!this._isComposableDestroying) {
        this._isComposableDestroying = true;
        tryInvoke(this, 'willDestroyElementParent');
        tryInvoke(this, 'willDestroyElementChild');
      }
    },

    willDestroyElementChild: function willDestroyElementChild() {
      this._super.apply(this, arguments);
      this.unregisterWithParent();
    },

    shouldRegister: true,

    shouldRegisterToParent: function shouldRegisterToParent() /*parentComponent*/{
      return this.get('shouldRegister');
    },

    destroySelfAndChildren: function destroySelfAndChildren() {
      // We may be a child-parent. Destroy children if we can.
      tryInvoke(this, 'destroyChildren');
      tryInvoke(this, 'willDestroyParent');
      this._didInsert = false;
    },

    registerWithParent: function registerWithParent() {
      var parentComponent = this.get('parentComponent');
      if (this.shouldRegisterToParent(parentComponent)) {
        assert('Tried to use ' + this + ' outside the context of a parent component.', parentComponent);
        parentComponent.registerChild(this);
      }
    },

    unregisterWithParent: function unregisterWithParent() {
      var parentComponent = this.get('parentComponent');
      if (parentComponent) {
        parentComponent.unregisterChild(this);
      }
    }

  });
});