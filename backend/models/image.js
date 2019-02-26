var mongoose = require('mongoose');  
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var ImageSchema = new Schema({
    poi: { type: ObjectId, ref: 'Poi' },
    name: String,
    url: String,
    caption: String,
    position: Number
});

module.exports = mongoose.model('Image', ImageSchema);