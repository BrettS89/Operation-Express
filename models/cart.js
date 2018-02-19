const mongoose = require('mongoose');
const User = require('./user');
const Product = require('./product');
const Store = require('./store');

const cartSchema = new mongoose.Schema({
	user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	store: {type: mongoose.Schema.Types.ObjectId, ref: 'Store'},
	products: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
	createdDate: {type: Date, default: Date.now},
	subTotal: Number,
	tax: Number,
	total: Number
});

module.exports = mongoose.model('Cart', cartSchema);