var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user');
var Comment = require('./comment');

var schema = new Schema({
    name: {type: String, required: true},
    type: {type: String, required: true},
    address: {type: String, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true},
    rating: {type: String, required: true},
    image: {type: String, required: true},
    description: {type: String, required: true},
    wifiRating: {type: String, required: true},
    wifiDescription: {type: String, required: true},
    vibeRating: {type: String, required: true},
    vibeDescription: {type: String, required: true},
    comfortRating: {type: String, required: true},
    comfortDescription: {type: String, required: true},
    foodAndBeverageRating: {type: String, required: true},
    foodAndBeverageDescription: {type: String, required: true},
    powerRating: {type: String, required: true},
    powerDescription: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
});

schema.post('remove', function(spot) {
    User.findById(spot.user, function (err, user) {
        user.spots.pull(spot);
        user.save();
    });
});

module.exports = mongoose.model('Spot', schema);