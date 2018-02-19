const mongoose = require('mongoose');
const Order = require('./order');

const userSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	email: String,
	password: String,
	orders: [{type: mongoose.Schema.Types.ObjectId, ref: 'Order'}],
	createdDate: {type: Date, default: Date.now}
});

module.exports = mongoose.model('User', userSchema);