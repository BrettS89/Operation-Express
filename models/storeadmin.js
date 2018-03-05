const mongoose = require('mongoose');
const Store = require('./store');

const storeAdminSchema = new mongoose.Schema({
	store: {type: mongoose.Schema.Types.ObjectId, ref: 'Store'},
	email: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	isAdmin: {type: String, default: 'True'}
});

module.exports = mongoose.model('StoreAdmin', storeAdminSchema);