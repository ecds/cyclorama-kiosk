var Kiosk = require('../models/kiosk');
var async = require('async');

module.exports.getAllKiosks = function(req, res) {
  
};

exports.kioskDetail = function(req, res, next) {
  if (req.params.id) {
    Kiosk.findOne({ 'title': req.params.id })
    .populate({
      path: 'panels',
      populate: {
        path: 'pois',
        model: 'Poi',
        populate: {
          path: 'images',
          model: 'Image'
        }
      }
    })
    .exec(function (err, kiosk) {
      if (err) return res.json({ err });
      console.log(req.params);
      res.json({"kiosk": kiosk});
    });
  } else {
    Kiosk.find(function(err, kiosks) {
      if (err) {
          res.send(err);
      }
      res.json({kiosks: req.toLocaleString()});
    });
  }
};

module.exports.addKiosks = function(req,res) {  
    var kiosk = new Kiosk(req.body.kiosk);
    kiosk.save(function(err) {
        if (err) {
            res.send(err);
        }
        res.json({kiosk: kiosk});
    });
};

module.exports.kioskUpdate = function(req, res) {
  Kiosk.findByIdAndUpdate(
    req.params.id,
    req.body.kiosk
  )
  .populate({
    path: 'panels',
    populate: {
      path: 'pois',
      model: 'Poi'
    }
  })
  .exec(function (err, kiosk) {
    if (err) return res.status(500).send(err);
    return res.json({"kiosk": kiosk});
  });
}