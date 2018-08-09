define("cyclorama-kiosk/templates/components/painting-pois", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "MpNfuX+9", "block": "{\"symbols\":[\"hotspot\"],\"statements\":[[4,\"each\",[[20,[\"pois\"]]],null,{\"statements\":[[0,\"  \"],[1,[25,\"geojson-layer\",null,[[\"geoJSON\",\"pointToLayer\",\"onClick\"],[[19,1,[\"hotspot\"]],[20,[\"setDot\"]],[25,\"action\",[[19,0,[]],\"clickSpot\",[19,1,[]]],null]]]],false],[0,\"\\n\\n\"],[4,\"if\",[[19,1,[\"active\"]]],null,{\"statements\":[[0,\"    \"],[1,[25,\"geojson-layer\",null,[[\"geoJSON\",\"style\",\"onAdd\"],[[19,1,[\"polygon\"]],[20,[\"setStyle\"]],[25,\"action\",[[19,0,[]],\"flyToPoi\",[19,1,[]]],null]]]],false],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[1]},null]],\"hasEval\":false}", "meta": { "moduleName": "cyclorama-kiosk/templates/components/painting-pois.hbs" } });
});