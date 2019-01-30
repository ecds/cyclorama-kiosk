var mongoose = require('mongoose');  
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var KioskSchema = new Schema({
    title: String,
    panels: [{ type: ObjectId, ref: 'Panel' }]
});

module.exports = mongoose.model('Kiosk', KioskSchema);