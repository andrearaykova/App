const mongoose = require('mongoose');

 const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required';

 let productSchema = new mongoose.Schema({
  title: {type: mongoose.Schema.Types.String, required: REQUIRED_VALIDATION_MESSAGE, unique: [true, 'Product already exists.']},
  description: {type: mongoose.Schema.Types.String},
   price: {type: mongoose.Schema.Types.Number, required: REQUIRED_VALIDATION_MESSAGE},
   image: {type: mongoose.Schema.Types.String, required: REQUIRED_VALIDATION_MESSAGE},
   likes: [{type: mongoose.Schema.Types.String}],
   reviews: []
 })

 let Product = mongoose.model('Product', productSchema);

 module.exports = Product; 