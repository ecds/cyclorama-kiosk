var mongoose = require('mongoose');  
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var TourSchema = new Schema({
    name: String,
    coverImage: String,
    intro: String,
    pois: [{ type: ObjectId, ref: 'Poi' }]
});

module.exports = mongoose.model('Tour', TourSchema);