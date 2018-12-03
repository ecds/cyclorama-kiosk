var Tour = require('../models/tour');
var async = require('async');

module.exports.toursList = function(req, res) {
  Tour.find()
  .populate({
    path: 'pois',
    populate: {
      path: 'images',
      model: 'Image'
    }
  })
    .exec(function(err, tours) {
        if (err) return res.status(500).send(err);    
        return res.json({tours: tours});  
      });
};

exports.tourDetail = function(req, res, next) {
  if (req.query.name) {
    Tour.findOne({ 'name': req.query.name })
    .populate({
      path: 'pois',
      populate: {
        path: 'images',
        model: 'Image'
      }
    })
    .exec(function (err, tour) {
      if (err) return res.json({ err });
      res.json({"tour": tour});
    });  
  } else {
    Tour.find(function(err, tours) {
      if (err) {
          res.send(err);
      }
      res.json({tours: tours});
    });
  }
};

module.exports.addTours = function(req,res) {  
    var tour = new Tour(req.body.tour);
    tour.save(function(err) {
        if (err) {
            res.send(err);
        }
        res.json({tour: tour});
    });
};

module.exports.tourCreate = function(req, res) {
  Tour.create(req.body.tour, function (err, tour) {
    if (err) return res.status(500).send(err);
    return res.send({ tour: tour });
  });
};

module.exports.tourUpdate = function(req, res) {
  Tour.findByIdAndUpdate(
    req.params.id,
    req.body.tour
  )
  .populate({
    path: 'pois',
    populate: {
      path: 'images',
      model: 'Image'
    }
  })
  .exec(function (err, tour) {
    if (err) return res.status(500).send(err);
    return res.json({"tour": tour});
  });
};