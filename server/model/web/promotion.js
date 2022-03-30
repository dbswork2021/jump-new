const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  qrSize: Number,
  qrX: Number,
  qrY: Number,
  fontSize: Number,
  agentX: Number,
  agentY: Number,
  dateX: Number,
  dateY: Number,
  fileName: String,
  color: String,
  delTime: Number,
});

module.exports = mongoose.model('Promotion', schema);
