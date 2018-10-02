var quads = require('./controllers/quads');
var pois = require('./controllers/pois');
var images = require('./controllers/images');

module.exports = function(router) {
  router.get('/quads', quads.quadDetail);
  router.post('/pois', pois.poiCreate);
  router.put('/quads/:id', quads.quadUpdate);
  router.put('/pois/:id', pois.poiUpdate);
  router.delete('/pois/:id', pois.poiDelete);
  router.post('/images', images.imageCreate);
  router.put('/images/:id', images.imageUpdate);
  router.delete('/images/:id', images.imageDelete);
};