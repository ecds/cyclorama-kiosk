var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ErrorSchema = new Schema({
  when: { type: Date, default: Date.now },
  message: String,
  fileName: String,
  lineNumber: Number,
  location: String
});

module.exports = mongoose.model('Error', ErrorSchema);