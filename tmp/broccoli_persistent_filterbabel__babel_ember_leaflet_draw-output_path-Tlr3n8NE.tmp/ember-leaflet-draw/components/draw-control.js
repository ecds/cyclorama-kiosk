define('ember-leaflet-draw/components/draw-control', ['exports', 'ember', 'ember-leaflet/components/base-layer'], function (exports, _ember, _emberLeafletComponentsBaseLayer) {
  exports['default'] = _emberLeafletComponentsBaseLayer['default'].extend({
    enableDeleting: true, // Default value
    enableEditing: true, // Default value
    showDrawingLayer: true, // Default value

    leafletEvents: [L.Draw.Event.CREATED, L.Draw.Event.EDITED, L.Draw.Event.EDITMOVE, L.Draw.Event.EDITRESIZE, L.Draw.Event.EDITSTART, L.Draw.Event.EDITSTOP, L.Draw.Event.EDITVERTEX, L.Draw.Event.DELETED, L.Draw.Event.DELETESTART, L.Draw.Event.DELETESTOP, L.Draw.Event.DRAWSTART, L.Draw.Event.DRAWSTOP, L.Draw.Event.DRAWVERTEX],

    leafletOptions: ['draw', 'edit', 'enableEditing', 'position', 'showDrawingLayer'],

    usedLeafletEvents: _ember['default'].computed('leafletEvents', function () {
      var _this = this;

      return this.get('leafletEvents').filter(function (eventName) {
        eventName = _ember['default'].String.camelize(eventName.replace(':', ' '));
        var methodName = '_' + eventName;
        var actionName = 'on' + _ember['default'].String.classify(eventName);
        return _this.get(methodName) !== undefined || _this.get(actionName) !== undefined;
      });
    }),

    addToContainer: function addToContainer() {
      if (this._layer) {
        this.get('parentComponent')._layer.addLayer(this._layer);
      }
    },

    createLayer: function createLayer() {
      var drawingLayerGroup = undefined;
      if (this.get('showDrawingLayer')) {
        drawingLayerGroup = new this.L.FeatureGroup();
        var map = this.get('parentComponent._layer');
        drawingLayerGroup.addTo(map);
      }
      return drawingLayerGroup;
    },

    didCreateLayer: function didCreateLayer() {
      var _this2 = this;

      var map = this.get('parentComponent._layer');
      if (map) {
        var options = this.getProperties('position', 'draw', 'edit');
        if (!options.position) {
          options.position = 'topleft';
        }

        // options.edit = Ember.$.extend(true, {featureGroup: this._layer}, options.edit);
        if (this._layer) {
          options.edit = _ember['default'].$.extend(true, { featureGroup: this._layer }, options.edit);
          if (!this.get('enableEditing') && !options.edit.edit) {
            options.edit.edit = false;
          }

          if (!this.get('enableDeleting') && !options.edit.remove) {
            options.edit.remove = false;
          }

          // Extend the default draw object with options overrides
          options.draw = _ember['default'].$.extend({}, this.L.drawLocal.draw, options.draw);
          // Add the draw control to the map
          map.addControl(new this.L.Control.Draw(options));

          // If showDrawingLayer, add new layer to the layerGroup
          if (this.get('showDrawingLayer')) {
            map.on(this.L.Draw.Event.CREATED, function (e) {
              var layer = e.layer;
              _this2._layer.addLayer(layer);
            });
          }
        }
      }
    },

    _addEventListeners: function _addEventListeners() {
      var _this3 = this;

      this._eventHandlers = {};
      this.get('usedLeafletEvents').forEach(function (eventName) {
        var originalEventName = eventName;
        var map = _this3.get('parentComponent._layer');
        // Cleanup the Leaflet Draw event names that have colons, ex:'draw:created'
        eventName = _ember['default'].String.camelize(eventName.replace(':', ' '));
        var actionName = 'on' + _ember['default'].String.classify(eventName);
        var methodName = '_' + eventName;
        // Create an event handler that runs the function inside an event loop.
        _this3._eventHandlers[originalEventName] = function (e) {
          var _this4 = this;

          _ember['default'].run(function () {
            // Try to invoke/send an action for this event
            _this4.invokeAction(actionName, e, _this4._layer, map);
            // Allow classes to add custom logic on events as well
            if (typeof _this4[methodName] === 'function') {
              _ember['default'].run(_this4, _this4[methodName], e, _this4._layer, map);
            }
          });
        };

        // The events for Leaflet Draw are on the map object, not the layer
        map.addEventListener(originalEventName, _this3._eventHandlers[originalEventName], _this3);
      });
    },

    _removeEventListeners: function _removeEventListeners() {
      var _this5 = this;

      if (this._eventHandlers) {
        this.get('usedLeafletEvents').forEach(function (eventName) {
          var map = _this5.get('parentComponent._layer');
          // The events for Leaflet Draw are on the map object, not the layer
          map.removeEventListener(eventName, _this5._eventHandlers[eventName], _this5);
          delete _this5._eventHandlers[eventName];
        });
      }
    }

  });
});