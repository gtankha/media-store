const mongoose = require('mongoose');

const { Schema } = mongoose;
//const bcrypt = require('bcrypt');
const Bid = new Schema({
    _id: {
    type: String,
    required: false,
    trim: true
  },
  name: {
    type: String,
    required: false,
    trim: true
  },
  value: {
    type: Number,
    required: false,
  }
});





module.exports = Bid;