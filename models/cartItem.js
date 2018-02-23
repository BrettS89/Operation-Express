const mongoose = require('mongoose');
const Product = require('./product');
const Cart = require('./cart');

const cartItemSchema = new mongoose.Schema({
	product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
	cart: {type: mongoose.Schema.Types.ObjectId, ref: 'Cart'}
});

module.exports = mongoose.model('CartItem', cartItemSchema);
