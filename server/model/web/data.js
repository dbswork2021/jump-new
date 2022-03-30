const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    agent: { type: mongoose.Types.ObjectId, ref: 'Agent' },
    city: { type: String },
    system: { type: String },
    broser: { type: String },
    createTime: { type: Number },
  },
  {
    versionKey: false,
    timestamps: {
      createdAt: 'createTime',
    },
  }
);

module.exports = mongoose.model('Data', schema);
