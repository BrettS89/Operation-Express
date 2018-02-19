const mongoose = require('mongoose');
const Store = require('./store');

const productSchema = new mongoose.Schema({
	store: {type: mongoose.Schema.Types.ObjectId, ref: 'Store'},
	name: {type: String, required: true},
	brand: {type: String, required: true},
	price: {type: String, required: true},
	quantity: {type: String, required: true},
	image: {type: String, required: true},
	createdDate: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Product', productSchema);