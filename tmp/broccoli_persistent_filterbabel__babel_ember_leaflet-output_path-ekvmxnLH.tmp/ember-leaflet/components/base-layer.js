define('ember-leaflet/components/base-layer', ['exports', 'ember-composability-tools', 'ember-invoke-action'], function (exports, _emberComposabilityTools, _emberInvokeAction) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const leaf = typeof L === 'undefined' ? {} : L;

  exports.default = Ember.Component.extend(_emberComposabilityTools.ChildMixin, _emberInvokeAction.InvokeActionMixin, {
    tagName: '',
    L: leaf,

    fastboot: Ember.computed(function () {
      let owner = Ember.getOwner(this);
      return owner.lookup('service:fastboot');
    }),
    isFastBoot: Ember.computed('fastboot', function () {
      return this.get('fastboot') && this.get('fastboot.isFastBoot');
    }),

    concatenatedProperties: ['leafletOptions', 'leafletRequiredOptions', 'leafletEvents', 'leafletProperties'],

    createLayer() {
      (true && !(false) && Ember.assert('BaseLayer\'s `createLayer` should be overriden.'));
    },

    didCreateLayer() {},
    willDestroyLayer() {},

    /*
     * Method called by parent when the layer needs to setup
     */
    didInsertParent() {
      // Check for fastBoot
      if (this.get('isFastBoot')) {
        return;
      }

      this._layer = this.createLayer();
      this._addObservers();
      this._addEventListeners();
      if (this.get('parentComponent')) {
        this.addToContainer();
      }
      this.didCreateLayer();
    },

    /*
     * Default logic for adding the layer to the container
     */
    addToContainer() {
      this.get('parentComponent')._layer.addLayer(this._layer);
    },

    /*
     * Method called by parent when the layer needs to teardown
     */
    willDestroyParent() {
      // Check for fastBoot
      if (this.get('isFastBoot')) {
        return;
      }

      this.willDestroyLayer();
      this._removeEventListeners();
      this._removeObservers();
      if (this.get('parentComponent') && this._layer) {
        this.removeFromContainer();
      }
      delete this._layer;
    },

    /*
     * Default logic for removing the layer from the container
     */
    removeFromContainer() {
      this.get('parentComponent')._layer.removeLayer(this._layer);
    },

    leafletOptions: [],
    options: Ember.computed(function () {
      let leafletOptions = this.get('leafletOptions');
      let options = {};
      leafletOptions.forEach(optionName => {
        if (this.get(optionName) !== undefined) {
          options[optionName] = this.get(optionName);
        }
      });
      return options;
    }),

    leafletRequiredOptions: [],
    requiredOptions: Ember.computed(function () {
      let leafletRequiredOptions = this.get('leafletRequiredOptions');
      let options = [];
      leafletRequiredOptions.forEach(optionName => {
        (true && !(this.get(optionName)) && Ember.assert(`\`${optionName}\` is a required option but its value was \`${this.get(optionName)}\``, this.get(optionName)));

        options.push(this.get(optionName));
      });
      return options;
    }),

    leafletEvents: Ember.A(),
    usedLeafletEvents: Ember.computed('leafletEvents', function () {
      return this.get('leafletEvents').filter(eventName => {
        let methodName = `_${eventName}`;
        let actionName = `on${Ember.String.classify(eventName)}`;
        return this.get(methodName) !== undefined || this.get(actionName) !== undefined;
      });
    }),

    _addEventListeners() {
      this._eventHandlers = {};
      this.get('usedLeafletEvents').forEach(eventName => {

        let actionName = `on${Ember.String.classify(eventName)}`;
        let methodName = `_${eventName}`;
        // create an event handler that runs the function inside an event loop.
        this._eventHandlers[eventName] = function (e) {
          Ember.run(() => {
            // try to invoke/send an action for this event
            this.invokeAction(actionName, e);
            // allow classes to add custom logic on events as well
            if (typeof this[methodName] === 'function') {
              Ember.run(this, this[methodName], e);
            }
          });
        };

        this._layer.addEventListener(eventName, this._eventHandlers[eventName], this);
      });
    },

    _removeEventListeners() {
      if (this._eventHandlers) {
        this.get('usedLeafletEvents').forEach(eventName => {
          this._layer.removeEventListener(eventName, this._eventHandlers[eventName], this);
          delete this._eventHandlers[eventName];
        });
      }
    },

    leafletProperties: [],

    _addObservers() {
      this._observers = {};
      this.get('leafletProperties').forEach(propExp => {

        let [property, leafletProperty, ...params] = propExp.split(':');
        if (!leafletProperty) {
          leafletProperty = `set${Ember.String.classify(property)}`;
        }
        let objectProperty = property.replace(/\.\[]/, ''); // allow usage of .[] to observe array changes

        this._observers[property] = function () {
          let value = this.get(objectProperty);
          (true && !(!!this._layer[leafletProperty]) && Ember.assert(`${this.constructor} must have a ${leafletProperty} function.`, !!this._layer[leafletProperty]));

          let propertyParams = params.map(p => this.get(p));
          this._layer[leafletProperty].call(this._layer, value, ...propertyParams);
        };

        this.addObserver(property, this, this._observers[property]);
      });
    },

    _removeObservers() {
      if (this._observers) {
        this.get('leafletProperties').forEach(propExp => {

          let [property] = propExp.split(':');

          this.removeObserver(property, this, this._observers[property]);
          delete this._observers[property];
        });
      }
    }

  });
});