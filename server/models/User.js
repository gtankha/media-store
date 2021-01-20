const mongoose = require('mongoose');
const { Schema } = mongoose;
const Order = require('./Order');

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  orders: [Order.schema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;