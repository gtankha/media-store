const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  price: {
    type: Number,
    required: true,
    min: 0.99
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  bidderId: {
    type: String,
    required:false,
    trim:true
  },
  bidderName: {
    type: String,
    required:false,
    trim:true
  },
  bidValue: {
    type: Number,
    required:false,
    trim:true
  },
  bidTimeStamp: {
    type: String,
    required:false,
    trim:true
  },
  sold: {
    type: Boolean,
    required:false,
    default: false
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
