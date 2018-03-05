const mongoose = require('mongoose');
const Product = require('./product');
const Order = require('./order');
const StoreAdmin = require('./storeadmin');
const Employee = require('./employee');

const storeSchema = new mongoose.Schema({
	name: {type: String, required: true},
	type: {type: String, required: true},
	address: {type: String, required: true},
	city: {type: String, required: true},
	state: {type: String, required: true},
	zip: {type: String, required: true},
	image: {type: String, required: true},
	products: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
	orders: [{type: mongoose.Schema.Types.ObjectId, ref: 'Order'}],
	admin: {type: mongoose.Schema.Types.ObjectId, ref: 'StoreAdmin'},
	employees: [{type: mongoose.Schema.Types.ObjectId, ref: 'Employee'}],
	createdDate: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Store', storeSchema);