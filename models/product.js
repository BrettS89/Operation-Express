const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	createdDate: {type: Date, default: Date.now},
	store: String,
	brand: String,
	name: String,
	price: Number
});

module.exports = mongoose.model('Product', productSchema);