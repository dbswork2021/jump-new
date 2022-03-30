const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    urls: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Url' }],
    currentUrl: { type: Number, default: 0 },
    createTime: { type: Number },
  },
  {
    versionKey: false,
    timestamps: {
      // currentTime: () => Math.floor(Date.now() / 1000),
      currentTime: () => Date.now(),
      createdAt: 'createTime',
    },
  }
);

module.exports = mongoose.model('Agent', schema);
