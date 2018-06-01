export default Ember.HTMLBars.template({"id":"bZLNl4VM","block":"{\"symbols\":[\"features\",\"hotSpot\",\"hotSpot\"],\"statements\":[[4,\"if\",[[20,[\"bounds\"]]],null,{\"statements\":[[6,\"div\"],[9,\"class\",\"uk-offcanvas-content\"],[7],[0,\"\\n  \"],[6,\"div\"],[9,\"id\",\"panel\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"uk-offcanvas-bar uk-flex uk-flex-column\"],[7],[0,\"\\n      \"],[6,\"button\"],[9,\"class\",\"uk-offcanvas-close\"],[9,\"type\",\"button\"],[9,\"uk-close\",\"\"],[10,\"onclick\",[25,\"action\",[[19,0,[]],\"reCenter\"],null],null],[7],[8],[0,\"\\n      \"],[6,\"h2\"],[7],[1,[20,[\"activeHotSpot\",\"title\"]],false],[8],[0,\"\\n      \"],[1,[20,[\"activeHotSpot\",\"description\"]],true],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[10,\"class\",[25,\"if\",[[20,[\"showThumbNav\"]],\"with-nav\"],null],null],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"fullscreen\"],[7],[0,\"\\n\"],[4,\"leaflet-map\",null,[[\"onLoad\",\"onResize\",\"bounds\",\"maxBounds\",\"bounceAtZoomLimits\",\"onClick\"],[[25,\"action\",[[19,0,[]],\"initMap\"],null],[25,\"action\",[[19,0,[]],\"reSize\"],null],[20,[\"bounds\"]],[20,[\"bounds\"]],false,[25,\"action\",[[19,0,[]],\"reCenter\"],null]]],{\"statements\":[[0,\"\\n\"],[0,\"\\n        \"],[1,[25,\"component\",[[19,1,[\"tile\"]]],[[\"url\"],[\"https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png\"]]],false],[0,\"\\n\\n\"],[4,\"each\",[[20,[\"hotSpots\"]]],null,{\"statements\":[[4,\"component\",[[19,1,[\"polygon\"]]],[[\"locations\",\"color\",\"fillOpacity\",\"opacity\",\"interactive\",\"smoothFactor\"],[[25,\"doughnut\",[[19,3,[\"polygon\"]]],null],[19,3,[\"fillColor\"]],[19,3,[\"fillOpacity\"]],0,false,10]],{\"statements\":[],\"parameters\":[]},null]],\"parameters\":[3]},null],[4,\"each\",[[20,[\"hotSpots\"]]],null,{\"statements\":[[4,\"component\",[[19,1,[\"polygon\"]]],[[\"locations\",\"opacity\",\"fillOpacity\",\"onClick\"],[[19,2,[\"polygon\"]],0,0,[25,\"action\",[[19,0,[]],\"highlight\",[19,2,[]]],null]]],{\"statements\":[],\"parameters\":[]},null]],\"parameters\":[2]},null]],\"parameters\":[1]},null],[0,\"    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"uk-inline\"],[7],[0,\"\\n            \"],[6,\"img\"],[9,\"src\",\"../docs/images/photo.jpg\"],[9,\"alt\",\"\"],[7],[8],[0,\"\\n            \"],[6,\"div\"],[9,\"class\",\"uk-overlay uk-overlay-primary uk-position-bottom\"],[7],[0,\"\\n                \"],[6,\"p\"],[7],[0,\"Default Lorem ipsum dolor sit amet, consectetur adipiscing elit.\"],[8],[0,\"\\n            \"],[8],[0,\"\\n        \"],[8],[0,\"\\n\\n\"],[0,\"  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}","meta":{"moduleName":"cyclorama-kiosk/templates/components/cyclorama-painting.hbs"}});