const mongoose = require('mongoose');
const User = require('./user');
const Product = require('./product');
const Store = require('./store');
const Employee = require('./employee')

const orderSchema = new mongoose.Schema({
	
	createdDate: {type: Date, default: Date.now},
	user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	store: {type: mongoose.Schema.Types.ObjectId, ref: 'Store'},
	products: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
	subTotal: {type: Number, required: true},
	tax: {type: Number, required: true},
	total: {type: Number, required: true},
	accepted: {type: Boolean, default: false},
	completedPurchase: {type: Boolean, default: false},
	hasArrived: {type: Boolean, default: false},
	employee: {type: mongoose.Schema.Types.ObjectId, ref: 'Employee'}
});

module.exports = mongoose.model('Order', orderSchema);