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
  // router.route('/quads')
  //   .post(
  //     function(req, res) {
  //       console.log(req.body);
  //     quads.addQuads(req,res);
  //   })
  //   .get(function(req,res) { quads.getAllQuads(req,res) });
  // router.route('*').get(function(req, res) {
  //     res.sendfile('./public/index.html'); // load our public/index.html file
  // });

};