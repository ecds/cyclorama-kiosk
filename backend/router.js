var kiosks = require('./controllers/kiosks');
var panels = require('./controllers/panels');
var pois = require('./controllers/pois');
var images = require('./controllers/images');
var tours = require('./controllers/tours');
var quads = require('./controllers/quads');
var s3 = require('./controllers/s3');
var errors = require('./controllers/errors');

module.exports = function(router) {
  router.get('/kiosks/:id', kiosks.kioskDetail);
  router.get('/pois', pois.poiList);
  router.post('/pois', pois.poiCreate);
  router.get('/panels/:id', panels.panelDetail);
  router.put('/panels/:id', panels.panelUpdate);
  router.get('/pois/:id', pois.poiDetail);
  router.put('/pois/:id', pois.poiUpdate);
  router.delete('/pois/:id', pois.poiDelete);
  router.post('/images', images.imageCreate);
  router.put('/images/:id', images.imageUpdate);
  router.delete('/images/:id', images.imageDelete);
  router.get('/tours', tours.toursList);
  router.post('/tours', tours.tourCreate);
  router.put('/tours/:id', tours.tourUpdate);
  router.put('/quads/:id', quads.quadUpdate);
  router.get('/quads/:id', quads.quadDetail);
  router.get('/sign-s3', s3.getSigned);
  router.post('/errors', errors.addError);
};