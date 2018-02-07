var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Spot = require('./spot');
var User = require('./user');

var schema = new Schema({
	content: {type: String, required: true},
	firstName: {type: String, required: true},
	lastName: {type: String, required: true},
	user: {type: Schema.Types.ObjectId, ref: 'User'},
	spot: {type: Schema.Types.ObjectId, ref: 'Spot'}
});



module.exports = mongoose.model('Comment', schema);