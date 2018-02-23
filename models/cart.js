const mongoose = require('mongoose');
const User = require('./user');
const Product = require('./product');
const Store = require('./store');
const CartItem = require('./cartItem');

const cartSchema = new mongoose.Schema({
	user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	store: {type: mongoose.Schema.Types.ObjectId, ref: 'Store'},
	items: [{type: mongoose.Schema.Types.ObjectId, ref: 'CartItem'}],
	createdDate: {type: Date, default: Date.now},
	subTotal: Number,
	tax: Number,
	total: Number
});

module.exports = mongoose.model('Cart', cartSchema);