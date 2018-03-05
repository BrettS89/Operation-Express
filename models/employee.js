const mongoose = require('mongoose');
const Store = require('./store');

const employeeSchema = new mongoose.Schema({
	store: {type: mongoose.Schema.Types.ObjectId, ref: 'Store'},
	userName: {type: String, required: true, unique: true},
	password: {type: String, required: true},
});

module.exports = mongoose.model('Employee', employeeSchema);