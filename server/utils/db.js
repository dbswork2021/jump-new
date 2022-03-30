const mongoose = require('mongoose');

const { db } = require('../config');

dbConnect =
  'mongodb://' +
  db.user +
  ':' +
  db.password +
  '@' +
  db.host +
  ':' +
  db.port +
  '/' +
  db.name;

module.exports = () => {
  mongoose.connect(dbConnect, {});
};
