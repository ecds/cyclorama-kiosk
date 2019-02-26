var Image = require('../models/image');
var async = require('async');

module.exports.imageUpdate = function(req, res) {
    // return res.send(req.body)
    Image.findByIdAndUpdate(
        req.params.id,
        req.body.image,
        {new: true},
        (err, image) => {
          if (err) return res.status(500).send(err);
          return res.send({ image: image });
        }
    )
};

module.exports.imageCreate = function(req, res) {
    Image.create(req.body.image, function (err, image) {
        if (err) return res.status(500).send(err);
        return res.send({ image: image });
      });
};

module.exports.imageDelete = function(req, res) {
    Image.findByIdAndRemove(
        req.params.id,
        (error, image) => {
            if (error) return res.status(500).send(error);
            return res.status(200).send({});
        }
    );
};
