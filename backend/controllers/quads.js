var Quad = require('../models/quad');
var async = require('async');

module.exports.getAllQuads = function(req, res) {
};

exports.quadDetail = function(req, res, next) {
  if (req.query.title) {
    Quad.findOne({ 'title': req.query.title })
    .populate({
      path: 'pois',
      populate: {
        path: 'images',
        model: 'Image'
      }
    })
    .exec(function (err, quad) {
      if (err) return res.json({ err });
      res.json({"quad": quad});
    });  
  } else {
    Quad.find(function(err, quads) {
      if (err) {
          res.send(err);
      }
      res.json({quads: quads});
    });
  }
};

module.exports.addQuads = function(req,res) {  
    var quad = new Quad(req.body.quad);
    quad.save(function(err) {
        if (err) {
            res.send(err);
        }
        res.json({quad: quad});
    });
};

module.exports.quadUpdate = function(req, res) {
  Quad.findByIdAndUpdate(
    req.params.id,
    req.body.quad
  )
  .populate({
    path: 'pois',
    populate: {
      path: 'images',
      model: 'Image'
    }
  })
  .exec(function (err, quad) {
    if (err) return res.status(500).send(err);
    return res.json({"quad": quad});
  });
}