const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    nick: { type: String, trim: true },
    url: { type: String, trim: true },
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

module.exports = mongoose.model('Url', schema);
