define('ember-wormhole/components/ember-wormhole', ['exports', 'ember-wormhole/templates/components/ember-wormhole', 'ember-wormhole/utils/dom'], function (exports, _emberWormhole, _dom) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    layout: _emberWormhole.default,

    /*
     * Attrs
     */
    to: Ember.computed.alias('destinationElementId'),
    destinationElementId: null,
    destinationElement: Ember.computed('destinationElementId', 'renderInPlace', function () {
      let renderInPlace = this.get('renderInPlace');
      if (renderInPlace) {
        return this._element;
      }
      let id = this.get('destinationElementId');
      if (!id) {
        return null;
      }
      return (0, _dom.findElementById)(this._dom, id);
    }),
    renderInPlace: false,

    /*
     * Lifecycle
     */
    init() {
      this._super(...arguments);

      this._dom = (0, _dom.getDOM)(this);

      // Create text nodes used for the head, tail
      this._wormholeHeadNode = this._dom.createTextNode('');
      this._wormholeTailNode = this._dom.createTextNode('');

      /*
       * didInsertElement does not fire in Fastboot, so we schedule this in
       * init to be run after render. Importantly, we want to run
       * appendToDestination after the child nodes have rendered.
       */
      Ember.run.schedule('afterRender', () => {
        if (this.isDestroyed) {
          return;
        }
        this._element = this._wormholeHeadNode.parentNode;
        if (!this._element) {
          throw new Error('The head node of a wormhole must be attached to the DOM');
        }
        this._appendToDestination();
      });
    },

    willDestroyElement: function () {
      // not called in fastboot
      this._super(...arguments);
      let { _wormholeHeadNode, _wormholeTailNode } = this;
      Ember.run.schedule('render', () => {
        this._removeRange(_wormholeHeadNode, _wormholeTailNode);
      });
    },

    _destinationDidChange: Ember.observer('destinationElement', function () {
      var destinationElement = this._getDestinationElement();
      if (destinationElement !== this._wormholeHeadNode.parentNode) {
        Ember.run.schedule('render', this, '_appendToDestination');
      }
    }),

    _appendToDestination() {
      var destinationElement = this._getDestinationElement();
      if (!destinationElement) {
        var destinationElementId = this.get('destinationElementId');
        if (destinationElementId) {
          throw new Error(`ember-wormhole failed to render into '#${destinationElementId}' because the element is not in the DOM`);
        }
        throw new Error('ember-wormhole failed to render content because the destinationElementId was set to an undefined or falsy value.');
      }

      let startingActiveElement = (0, _dom.getActiveElement)();
      this._appendRange(destinationElement, this._wormholeHeadNode, this._wormholeTailNode);
      let resultingActiveElement = (0, _dom.getActiveElement)();
      if (startingActiveElement && resultingActiveElement !== startingActiveElement) {
        startingActiveElement.focus();
      }
    },

    _appendRange(destinationElement, firstNode, lastNode) {
      while (firstNode) {
        destinationElement.insertBefore(firstNode, null);
        firstNode = firstNode !== lastNode ? lastNode.parentNode.firstChild : null;
      }
    },

    _removeRange(firstNode, lastNode) {
      var node = lastNode;
      do {
        var next = node.previousSibling;
        if (node.parentNode) {
          node.parentNode.removeChild(node);
          if (node === firstNode) {
            break;
          }
        }
        node = next;
      } while (node);
    },

    _getDestinationElement() {
      let renderInPlace = this.get('renderInPlace');
      if (renderInPlace) {
        return this._element;
      }
      return this.get('destinationElement');
    }
  });
});