var Poi = require('../models/poi');
var async = require('async');

module.exports.poiUpdate = function(req, res) {
    // return res.send(req.body)
    Poi.findByIdAndUpdate(
        // the id of the item to find
        req.params.id,
        
        // the change to be made. Mongoose will smartly combine your existing 
        // document with this change, which allows for partial updates too
        req.body.poi,
        
        // an option that asks mongoose to return the updated version 
        // of the document instead of the pre-updated one.
        {new: true}
    ).populate('images')
    .exec(function (err, poi) {
      if (err) return res.status(500).send(err);
      return res.json({poi: poi});
    });
};

module.exports.poiCreate = function(req, res) {
    Poi.create(req.body.poi, function (err, poi) {
        if (err) return res.status(500).send(err);
        return res.send({ poi: poi });
      });
};

module.exports.poiDelete = function(req, res) {
    Poi.findByIdAndRemove(
        req.params.id,
        (error, poi) => {
            if (error) return res.status(500).send(error);
            return res.status(200).send({});
        }
    );
};
