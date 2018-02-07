var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Spot = require('./spot');

var schema = new Schema({
	firstName: {type: String, required: true},
	lastName: {type: String, required: true},
	password: {type: String, required: true},
	email: {type: String, required: true, unique: true},
	spots: [{type: Schema.Types.ObjectId, ref: 'Spot'}]
});



module.exports = mongoose.model('User', schema);