"use strict"
define("cyclorama-kiosk/app",["exports","cyclorama-kiosk/resolver","ember-load-initializers","cyclorama-kiosk/config/environment"],function(e,t,n,o){Object.defineProperty(e,"__esModule",{value:!0})
var i=Ember.Application.extend({modulePrefix:o.default.modulePrefix,podModulePrefix:o.default.podModulePrefix,Resolver:t.default});(0,n.default)(i,o.default.modulePrefix),e.default=i}),define("cyclorama-kiosk/components/array-path-layer",["exports","ember-leaflet/components/array-path-layer"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("cyclorama-kiosk/components/base-layer",["exports","ember-leaflet/components/base-layer"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("cyclorama-kiosk/components/circle-layer",["exports","ember-leaflet/components/circle-layer"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("cyclorama-kiosk/components/circle-marker-layer",["exports","ember-leaflet/components/circle-marker-layer"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("cyclorama-kiosk/components/container-layer",["exports","ember-leaflet/components/container-layer"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("cyclorama-kiosk/components/cyclorama-painting",["exports","fetch","uikit"],function(e,t,n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.Component.extend({bounds:null,L:null,_map:null,activeHotSpot:null,panel:null,showThumbNav:!0,miniMap:null,data:null,crs:L.CRS.Simple,activeButton:"people",people:{},landmarks:{},alterations:{},didInsertElement:function(){var e=this
Ember.set(this,"bounds",new L.latLngBounds([new L.LatLng(0,240),new L.LatLng(-80,0)])),(0,t.default)("/cyclorama-kiosk/q1/people.json").then(function(t){t.json().then(function(t){e.setProperties({people:t,activePois:t})})}),(0,t.default)("/cyclorama-kiosk/q1/landmarks.json").then(function(t){t.json().then(function(t){e.setProperties({landmarks:t})})}),(0,t.default)("/cyclorama-kiosk/buttons.json").then(function(t){t.json().then(function(t){e.setProperties({buttons:t})})})},didRender:function(){var e=n.default.offcanvas(document.getElementById("panel"),{mode:"push",bgClose:!1})
if(Ember.set(this,"panel",e),Ember.get(this,"_map")&&null===Ember.get(this,"miniMap")){var t=new L.tileLayer("https://s3.amazonaws.com/battleofatlanta/tiles/q1/{z}/{x}/{y}.png",{crs:Ember.get(this,"crs"),minZoom:0,maxZoom:0,bounds:Ember.get(this,"bounds")}),o=new L.Control.MiniMap(t,{zoomLevelFixed:!0,width:document.getElementsByTagName("body")[0].clientHeight/10*2,height:document.getElementsByTagName("body")[0].clientHeight/10,aimingRectOptions:{stroke:"#688EAB"}})
this.setProperties({miniMap:o}),o.addTo(Ember.get(this,"_map"))
var i=o.getContainer()
document.getElementById("minimap").appendChild(i)}n.default.util.on(document.getElementById("panel"),"show",function(){document.getElementsByClassName("leaflet-container")[0].style.width="67vw"})},actions:{initMap:function(e){var t=e.target
t.zoomControl.setPosition("topright"),t.fitBounds(Ember.get(this,"bounds")),Ember.set(this,"_map",t),t.on("click",function(e){console.log("Lat, Lon : "+e.latlng.lat+", "+e.latlng.lng)})},paintingLoaded:function(){},whatBounds:function(){console.log(Ember.get(this,"_map"))},switchPoi:function(e){this.send("reCenter"),this.buttons.forEach(function(e){Ember.set(e,"active",!1)}),Ember.set(e,"active",!0),this.setProperties({activeButton:e.label,activePois:Ember.get(this,e.label)})},highlightHotspot:function(e,t,n){this.activePois.forEach(function(e){Ember.set(e,"active",!1)}),Ember.set(e,"active",!0),Ember.set(this,"activeHotspot",e)},flyToHotspot:function(e){Ember.get(this,"_map").flyToBounds(e.bounds),Ember.get(this,"panel").show()},next:function(e){var t=e+1
this.send("highlight",Ember.get(this,"hotSpots")[t],t)},previous:function(e){var t=e-1
this.send("highlight",Ember.get(this,"hotSpots")[t],t)},reCenter:function(){Ember.get(this,"_map")&&Ember.get(this,"panel").isToggled()&&(this.panel.hide(),Ember.set(this,"activeHotspot",null),this._map.getContainer().style.width="100%",this.activePois.forEach(function(e){Ember.setProperties(e,{active:!1})}),this._map.flyToBounds(this.bounds,{padding:[0,0]}))},reSize:function(){}}})}),define("cyclorama-kiosk/components/div-overlay-layer",["exports","ember-leaflet/components/div-overlay-layer"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("cyclorama-kiosk/components/draw-control",["exports","ember-leaflet-draw/components/draw-control"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("cyclorama-kiosk/components/ember-wormhole",["exports","ember-wormhole/components/ember-wormhole"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("cyclorama-kiosk/components/geojson-layer",["exports","ember-leaflet/components/geojson-layer"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("cyclorama-kiosk/components/image-layer",["exports","ember-leaflet/components/image-layer"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("cyclorama-kiosk/components/leaflet-map",["exports","ember-leaflet/components/leaflet-map"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("cyclorama-kiosk/components/marker-layer",["exports","ember-leaflet/components/marker-layer"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("cyclorama-kiosk/components/painting-pois",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.Component.extend({tagName:"",setDot:function(e,t){return L.marker(t,{icon:L.divIcon({html:'<div class="jesse-dot"><div class="dot"></div><div class="pulsate-ring"></div></div>'})})},setStyle:function(){return{color:"#263238",fillOpacity:.6,fillColor:"#263238"}},actions:{clickSpot:function(e){Ember.get(this,"highlight")(e)},flyToPoi:function(e){Ember.get(this,"flyToPoi")(e)}}})}),define("cyclorama-kiosk/components/path-layer",["exports","ember-leaflet/components/path-layer"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("cyclorama-kiosk/components/point-path-layer",["exports","ember-leaflet/components/point-path-layer"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("cyclorama-kiosk/components/polygon-layer",["exports","ember-leaflet/components/polygon-layer"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("cyclorama-kiosk/components/polyline-layer",["exports","ember-leaflet/components/polyline-layer"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("cyclorama-kiosk/components/popup-layer",["exports","ember-leaflet/components/popup-layer"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("cyclorama-kiosk/components/tile-layer",["exports","ember-leaflet/components/tile-layer"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("cyclorama-kiosk/components/tooltip-layer",["exports","ember-leaflet/components/tooltip-layer"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("cyclorama-kiosk/components/uk-badge",["exports","ember-uikit/components/uk-badge"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("cyclorama-kiosk/components/uk-button",["exports","ember-uikit/components/uk-button"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("cyclorama-kiosk/components/uk-card",["exports","ember-uikit/components/uk-card"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("cyclorama-kiosk/components/uk-card/body",["exports","ember-uikit/components/uk-card/body"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("cyclorama-kiosk/components/uk-card/footer",["exports","ember-uikit/components/uk-card/footer"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("cyclorama-kiosk/components/uk-card/header",["exports","ember-uikit/components/uk-card/header"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("cyclorama-kiosk/components/uk-card/title",["exports","ember-uikit/components/uk-card/title"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("cyclorama-kiosk/components/uk-flex",["exports","ember-uikit/components/uk-flex"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})})
define("cyclorama-kiosk/components/uk-icon",["exports","ember-uikit/components/uk-icon"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("cyclorama-kiosk/components/uk-label",["exports","ember-uikit/components/uk-label"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("cyclorama-kiosk/components/uk-list",["exports","ember-uikit/components/uk-list"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("cyclorama-kiosk/components/uk-list/item",["exports","ember-uikit/components/uk-list/item"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("cyclorama-kiosk/components/uk-sortable",["exports","ember-uikit/components/uk-sortable"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("cyclorama-kiosk/components/uk-spinner",["exports","ember-uikit/components/uk-spinner"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("cyclorama-kiosk/components/uk-subnav",["exports","ember-uikit/components/uk-subnav"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("cyclorama-kiosk/components/uk-subnav/item",["exports","ember-uikit/components/uk-subnav/item"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("cyclorama-kiosk/components/uk-subnav/link-item",["exports","ember-uikit/components/uk-subnav/link-item"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("cyclorama-kiosk/components/uk-switcher",["exports","ember-uikit/components/uk-switcher"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("cyclorama-kiosk/components/uk-switcher/content",["exports","ember-uikit/components/uk-switcher/content"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("cyclorama-kiosk/components/uk-switcher/content/item",["exports","ember-uikit/components/uk-switcher/content/item"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("cyclorama-kiosk/components/uk-switcher/nav",["exports","ember-uikit/components/uk-switcher/nav"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("cyclorama-kiosk/components/uk-tab",["exports","ember-uikit/components/uk-tab"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("cyclorama-kiosk/components/uk-tab/item",["exports","ember-uikit/components/uk-tab/item"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("cyclorama-kiosk/components/uk-tab/link-item",["exports","ember-uikit/components/uk-tab/link-item"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("cyclorama-kiosk/components/uk-width",["exports","ember-uikit/components/uk-width"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("cyclorama-kiosk/components/wms-tile-layer",["exports","ember-leaflet/components/wms-tile-layer"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("cyclorama-kiosk/controllers/application",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.Controller.extend({})}),define("cyclorama-kiosk/helpers/app-version",["exports","cyclorama-kiosk/config/environment","ember-cli-app-version/utils/regexp"],function(e,t,n){Object.defineProperty(e,"__esModule",{value:!0}),e.appVersion=i
var o=t.default.APP.version
function i(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}
return t.hideSha?o.match(n.versionRegExp)[0]:t.hideVersion?o.match(n.shaRegExp)[0]:o}e.default=Ember.Helper.helper(i)}),define("cyclorama-kiosk/helpers/div-icon",["exports","ember-leaflet/helpers/div-icon"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}}),Object.defineProperty(e,"divIcon",{enumerable:!0,get:function(){return t.divIcon}})}),define("cyclorama-kiosk/helpers/doughnut",["exports"],function(e){function t(e){return[[[-55,170],[-55,-170],[55,-170],[55,170]],e]}Object.defineProperty(e,"__esModule",{value:!0}),e.doughnut=t,e.default=Ember.Helper.helper(t)}),define("cyclorama-kiosk/helpers/icon",["exports","ember-leaflet/helpers/icon"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}}),Object.defineProperty(e,"icon",{enumerable:!0,get:function(){return t.icon}})}),define("cyclorama-kiosk/helpers/lat-lng-bounds",["exports","ember-leaflet/helpers/lat-lng-bounds"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}}),Object.defineProperty(e,"latLngBounds",{enumerable:!0,get:function(){return t.latLngBounds}})}),define("cyclorama-kiosk/helpers/pluralize",["exports","ember-inflector/lib/helpers/pluralize"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=t.default}),define("cyclorama-kiosk/helpers/point",["exports","ember-leaflet/helpers/point"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}}),Object.defineProperty(e,"point",{enumerable:!0,get:function(){return t.point}})}),define("cyclorama-kiosk/helpers/singularize",["exports","ember-inflector/lib/helpers/singularize"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=t.default}),define("cyclorama-kiosk/hotspots",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0})
e.default={type:"FeatureCollection",features:[{type:"Feature",properties:{title:"Troup Hurt"},geometry:{type:"Polygon",coordinates:[[[-142.251492,-33.943502],[-144.173927,-34.341877],[-148.794193,-33.165936],[-149.998312,-34.130137],[-158.440704,-33.394831],[-158.304749,-20.073104],[-153.40991,-18.506715],[-153.45849,-17.565975],[-150.540333,-15.801916],[-150.331678,-14.054411],[-148.577471,-13.902659],[-148.516445,-14.86433],[-142.134075,-11.67737],[-134.92198,-14.769654],[-134.941206,-14.069148],[-133.181505,-13.989625],[-133.111725,-15.176938],[-128.138437,-17.457274],[-128.640203,-17.894624],[-128.836756,-31.488773],[-142.251492,-33.943502]]]}},{type:"Feature",properties:{},geometry:{type:"Polygon",coordinates:[[[-41.066723,-6.680439],[-15.22469,-7.029683],[-18.684397,-6.459324],[-26.392035,-4.433659],[-28.808041,-5.402785],[-30.137944,-5.005703],[-31.94262,-4.95829],[-33.468904,-5.345189],[-35.436015,-5.82928],[-36.319342,-6.018251],[-37.653451,-6.516377],[-38.733652,-6.591095],[-41.066723,-6.680439]]]}}]}}),define("cyclorama-kiosk/initializers/app-version",["exports","ember-cli-app-version/initializer-factory","cyclorama-kiosk/config/environment"],function(e,t,n){Object.defineProperty(e,"__esModule",{value:!0})
var o=void 0,i=void 0
n.default.APP&&(o=n.default.APP.name,i=n.default.APP.version),e.default={name:"App Version",initialize:(0,t.default)(o,i)}}),define("cyclorama-kiosk/initializers/container-debug-adapter",["exports","ember-resolver/resolvers/classic/container-debug-adapter"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"container-debug-adapter",initialize:function(){var e=arguments[1]||arguments[0]
e.register("container-debug-adapter:main",t.default),e.inject("container-debug-adapter:main","namespace","application:main")}}})
define("cyclorama-kiosk/initializers/ember-data",["exports","ember-data/setup-container","ember-data"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"ember-data",initialize:t.default}}),define("cyclorama-kiosk/initializers/export-application-global",["exports","cyclorama-kiosk/config/environment"],function(e,t){function n(){var e=arguments[1]||arguments[0]
if(!1!==t.default.exportApplicationGlobal){var n
if("undefined"!=typeof window)n=window
else if("undefined"!=typeof global)n=global
else{if("undefined"==typeof self)return
n=self}var o,i=t.default.exportApplicationGlobal
o="string"==typeof i?i:Ember.String.classify(t.default.modulePrefix),n[o]||(n[o]=e,e.reopen({willDestroy:function(){this._super.apply(this,arguments),delete n[o]}}))}}Object.defineProperty(e,"__esModule",{value:!0}),e.initialize=n,e.default={name:"export-application-global",initialize:n}}),define("cyclorama-kiosk/initializers/leaflet-assets",["exports","ember-get-config"],function(e,t){function n(){if("undefined"==typeof FastBoot){var e=""
Ember.isNone(t.default.rootURL)?Ember.isNone(t.default.baseURL)||(e=t.default.baseURL):e=t.default.rootURL,L.Icon.Default.imagePath=e+"assets/images/"}}Object.defineProperty(e,"__esModule",{value:!0}),e.initialize=n,e.default={name:"leaflet-assets",initialize:n}}),define("cyclorama-kiosk/instance-initializers/ember-data",["exports","ember-data/initialize-store-service"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"ember-data",initialize:t.default}}),define("cyclorama-kiosk/resolver",["exports","ember-resolver"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=t.default}),define("cyclorama-kiosk/router",["exports","cyclorama-kiosk/config/environment"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0})
var n=Ember.Router.extend({location:t.default.locationType,rootURL:t.default.rootURL})
n.map(function(){}),e.default=n}),define("cyclorama-kiosk/services/ajax",["exports","ember-ajax/services/ajax"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("cyclorama-kiosk/templates/application",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.HTMLBars.template({id:"MVplX8NK",block:'{"symbols":[],"statements":[[0,"\\n"],[1,[18,"cyclorama-painting"],false],[0,"\\n"],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"cyclorama-kiosk/templates/application.hbs"}})}),define("cyclorama-kiosk/templates/components/cyclorama-painting",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.HTMLBars.template({id:"dFh2Nmxw",block:'{"symbols":["button","features"],"statements":[[4,"if",[[20,["bounds"]]],null,{"statements":[[0,"    "],[6,"div"],[9,"uk-grid",""],[9,"class","uk-grid-collapse"],[7],[0,"\\n  "],[6,"div"],[9,"class","uk-offcanvas-content"],[7],[0,"\\n    "],[6,"div"],[9,"id","panel"],[7],[0,"\\n      "],[6,"div"],[9,"class","uk-offcanvas-bar uk-flex uk-flex-column"],[7],[0,"\\n        "],[6,"button"],[9,"class","uk-offcanvas-close"],[9,"type","button"],[9,"uk-close",""],[10,"onclick",[25,"action",[[19,0,[]],"reCenter"],null],null],[7],[8],[0,"\\n        "],[6,"h2"],[7],[1,[20,["activeHotspot","name"]],false],[8],[0,"\\n        "],[6,"section"],[7],[0,"\\n          "],[1,[20,["activeHotSpot","description"]],true],[0,"\\n        "],[8],[0,"\\n        "],[6,"section"],[9,"uk-grid",""],[7],[0,"\\n          "],[4,"uk-button",null,[["class","on-click"],["uk-width-1-2",[25,"action",[[19,0,[]],"previous",[20,["activeHotSpot","index"]]],null]]],{"statements":[[0,"previous"]],"parameters":[]},null],[0,"\\n          "],[4,"uk-button",null,[["class","on-click"],["uk-width-1-2",[25,"action",[[19,0,[]],"next",[20,["activeHotSpot","index"]]],null]]],{"statements":[[0,"Next"]],"parameters":[]},null],[0,"\\n        "],[8],[0,"\\n      "],[8],[0,"\\n    "],[8],[0,"\\n\\n      "],[6,"div"],[9,"class","painting-container uk-width-1-1"],[7],[0,"\\n"],[4,"leaflet-map",null,[["onLoad","onResize","bounds","zoomSnap","maxBounds","bounceAtZoomLimits","maxBoundsViscosity","minZoom","maxZoom","crs","bounceAtZoomLimits","onClick","onZoomend"],[[25,"action",[[19,0,[]],"initMap"],null],[25,"action",[[19,0,[]],"reSize"],null],[20,["bounds"]],0,[20,["bounds"]],false,1,3,10,[20,["crs"]],false,[25,"action",[[19,0,[]],"reCenter"],null],[25,"action",[[19,0,[]],"whatBounds"],null]]],{"statements":[[0,"\\n"],[0,"\\n          "],[1,[25,"component",[[19,2,["tile"]]],[["url","onLoad"],["https://s3.amazonaws.com/battleofatlanta/tiles/q1/{z}/{x}/{y}.png",[25,"action",[[19,0,[]],"paintingLoaded"],null]]]],false],[0,"\\n\\n          "],[1,[25,"painting-pois",null,[["pois","highlight","flyToPoi"],[[20,["activePois"]],[25,"action",[[19,0,[]],"highlightHotspot"],null],[25,"action",[[19,0,[]],"flyToHotspot"],null]]]],false],[0,"\\n\\n"],[0,"\\n"]],"parameters":[2]},null],[0,"\\n      "],[8],[0,"\\n"],[8],[0,"\\n      "],[6,"div"],[9,"class","uk-width-1-1 bottom-nav uk-container"],[7],[0,"\\n        "],[6,"div"],[9,"uk-grid",""],[7],[0,"\\n          "],[6,"div"],[9,"class","uk-width-1-4 ahc-logo uk-inline"],[7],[0,"\\n            "],[6,"img"],[9,"class","uk-position-center"],[9,"src","http://www.atlantahistorycenter.com/assets/images/AHC_Brand_Asset_Lockup_White.png"],[7],[8],[0,"\\n          "],[8],[0,"\\n          \\n          "],[6,"div"],[9,"class","uk-width-1-2"],[7],[0,"\\n            "],[6,"div"],[9,"class","poi-nav"],[9,"uk-grid",""],[7],[0,"\\n              \\n"],[4,"each",[[20,["buttons"]]],null,{"statements":[[0,"              "],[6,"div"],[10,"class",[26,["uk-width-1-4 poi-nav-button uk-inline ",[25,"if",[[19,1,["active"]],"active-poi"],null]]]],[9,"role","button"],[10,"onclick",[25,"action",[[19,0,[]],"switchPoi",[19,1,[]]],null],null],[7],[0,"\\n                "],[6,"div"],[9,"class","uk-text-center uk-grid-collapse uk-position-center"],[9,"uk-grid",""],[7],[0,"\\n                  "],[6,"img"],[9,"class","uk-width-1-1 uk-border-circle"],[10,"src",[19,1,["icon"]],null],[10,"alt",[25,"concat",["Button to highlight ",[19,1,["lable"]]," in the painting."],null],null],[7],[8],[0,"\\n                  "],[6,"p"],[9,"class","uk-width-1-1 uk-margin-small-top"],[7],[1,[19,1,["label"]],false],[8],[0,"\\n                "],[8],[0,"\\n              "],[8],[0,"\\n"]],"parameters":[1]},null],[0,"              \\n              "],[6,"div"],[9,"class","uk-width-1-4 poi-nav-button uk-inline"],[9,"style","border-left: solid white; line-height: 20px;"],[7],[0,"\\n                "],[6,"div"],[9,"class","uk-text-center uk-grid-collapse uk-position-center active-poi"],[9,"uk-grid",""],[7],[0,"\\n                  "],[6,"img"],[9,"class","uk-width-1-1 uk-border-circle"],[9,"src","/cyclorama-kiosk/images/tours-744a6a6526d371cf2f89e6371a6fbe44.png"],[9,"alt","Border circle"],[7],[8],[0,"\\n                  "],[6,"p"],[9,"class","uk-width-1-1 uk-margin-small-top"],[7],[0,"TOURS"],[8],[0,"\\n                "],[8],[0,"\\n              "],[8],[0,"\\n            "],[8],[0,"\\n          "],[8],[0,"\\n          \\n          "],[6,"div"],[9,"class","uk-width-1-4 uk-margin-small"],[7],[0,"\\n            "],[6,"div"],[9,"class","uk-grid-collapse active-poi"],[9,"uk-grid",""],[7],[0,"\\n              "],[6,"div"],[9,"class","uk-width-1-2"],[7],[0,"\\n                "],[6,"img"],[9,"src","/cyclorama-kiosk/images/view-0ba737a60e21986d860f68d24ce0fbfc.png"],[9,"style","height: 90px"],[7],[8],[0,"\\n              "],[8],[0,"\\n              "],[6,"div"],[9,"class","uk-width-1-2"],[9,"id","minimap"],[7],[8],[0,"\\n            "],[8],[0,"\\n          "],[8],[0,"\\n        "],[8],[0,"\\n      "],[8],[0,"\\n    "],[8],[0,"\\n\\n\\n"]],"parameters":[]},null]],"hasEval":false}',meta:{moduleName:"cyclorama-kiosk/templates/components/cyclorama-painting.hbs"}})}),define("cyclorama-kiosk/templates/components/painting-pois",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.HTMLBars.template({id:"MpNfuX+9",block:'{"symbols":["hotspot"],"statements":[[4,"each",[[20,["pois"]]],null,{"statements":[[0,"  "],[1,[25,"geojson-layer",null,[["geoJSON","pointToLayer","onClick"],[[19,1,["hotspot"]],[20,["setDot"]],[25,"action",[[19,0,[]],"clickSpot",[19,1,[]]],null]]]],false],[0,"\\n\\n"],[4,"if",[[19,1,["active"]]],null,{"statements":[[0,"    "],[1,[25,"geojson-layer",null,[["geoJSON","style","onAdd"],[[19,1,["polygon"]],[20,["setStyle"]],[25,"action",[[19,0,[]],"flyToPoi",[19,1,[]]],null]]]],false],[0,"\\n"]],"parameters":[]},null]],"parameters":[1]},null]],"hasEval":false}',meta:{moduleName:"cyclorama-kiosk/templates/components/painting-pois.hbs"}})}),define("cyclorama-kiosk/config/environment",[],function(){try{var e="cyclorama-kiosk/config/environment",t=document.querySelector('meta[name="'+e+'"]').getAttribute("content"),n={default:JSON.parse(unescape(t))}
return Object.defineProperty(n,"__esModule",{value:!0}),n}catch(t){throw new Error('Could not read config from meta tag with name "'+e+'".')}}),runningTests||require("cyclorama-kiosk/app").default.create({name:"cyclorama-kiosk",version:"0.0.0+8761e484"})
