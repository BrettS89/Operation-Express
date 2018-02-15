const mongoose = require('mongoose');
const User = require('./user');

const orderSchema = new mongoose.Schema({
	createdDate: {type: Date, default: Date.now},
	store: String,
	user: {type: Schema.Types.ObjectId, ref: 'User'},
	products: Array,
	subTotal: String,
	salesTax: String,
	total: String,
	completedPurchase: {type:Boolean, default: false},
	hasArrived: {type: Boolean, default: false}
});

module.exports = mongoose.model('Order', orderSchema);