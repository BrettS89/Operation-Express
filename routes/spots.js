var express = require('express');
var router = express.Router();
var Spot = require('../models/spot');
var User = require('../models/user');
var Comment = require('../models/comment');
var jwt = require('jsonwebtoken');


//Get Spots
router.get('/', function(req, res, next){
    Spot.find()
      .exec(function(err, spots){
        if(err){
          return res.status(500).json({
          title: 'An error occured',
          error: err
        });
        }
        res.status(200).json({
          message: 'Success',
          obj: spots
        });
      });
});


//Get One Spot
router.post('/one', function(req, res, next){

    Spot.findById(req.body._id, function(err, spot){
      if(err){
            return res.status(500).json({
                title: 'An error occured' ,
                error: err
            });
        }
            if(!spot){
                return res.status(401).json({
                    title: 'Query failed',
                    error: {message: 'could not find spot' }
                });
            }
           
            res.status(200).json({
                message: 'Found your spot!',
                spot: spot
            });
    });
});


//Get Spot by City
router.post('/search', function(req, res, next){
    var theCity = req.body.city;
    Spot.find({city: req.body.city}, function(err, foundCity){
      if(err){
            return res.status(500).json({
                title: 'An error occured' ,
                error: err
            });
        }
            if(!foundCity){
                return res.status(401).json({
                    title: 'Query failed',
                    error: {message: 'No results for ' + theCity}
                });
            }
           
            res.status(200).json({
                message: 'Found your spot!',
                city: foundCity,
                seachedCity: theCity
            });
   });
});


//Get comments by spot id
router.get('/comments/:id', function(req, res, next){
  Comment.find({spot: req.params.id}, function(err, comments){
    if(err){
      return res.status(500).json({
        title: 'An error occured',
        error: err
      });
    }
    if(!comments){
      return res.status(500).json({
        title: 'Query failed',
        error: 'No comments were found'
      });
    }
    res.status(200).json({
      title: 'Comments found',
      comments: comments
    });
  });
});


//===========================
//Protected Routes
//===========================


//Check for valid token
router.use('/auth', function(req, res, next){
  jwt.verify(req.query.token, 'secret', function(err, decoded){
    if(err){
      return res.status(401).json({
        title: 'Not authenticated',
        error: err
      });
    }
    next();
  });
});


//Post a new spot
router.post('/auth/post', function(req, res, next) {
    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function(err, user){
      if(err){
        return res.status(500).json({
          title: 'An error occured',
          error: err
        });
      }
      if(!user){
        return res.status(500).json({
          title: 'No user found',
          error: {message: 'Could not find a user with matching id'}
        });
      }
      var spot = new Spot({
      name: req.body.name, 
      type: req.body.type, 
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      rating: req.body.rating,
      image: req.body.image,
      description: req.body.description, 
      wifiRating: req.body.wifiRating, 
      wifiDescription: req.body.wifiDescription,
      vibeRating: req.body.vibeRating,
      vibeDescription: req.body.vibeDescription, 
      comfortRating: req.body.comfortRating, 
      comfortDescription: req.body.comfortDescription,
      foodAndBeverageRating: req.body.foodAndBeverageRating,
      foodAndBeverageDescription: req.body.foodAndBeverageDescription,
      powerRating: req.body.powerRating,
      powerDescription: req.body.powerDescription,
      user: user._id
      });

      spot.save(function(err, result){
      if(err){
        return res.status(500).json({
          title: 'An error occured',
          error: err
        });
      }
      user.spots.push(result._id);
      user.save();
        res.status(200).json({
        message: 'Spot saved!',
        obj: result
        });
    });

  });
});


//Delete spot
router.delete('/auth/delete/:id', function(req, res, next){
  var decoded = jwt.decode(req.query.token);
  Spot.findById(req.params.id, function(err, spot){
    if(err){
      return res.status(500).json({
        title: 'An error occured',
        error: err
      });
    }
    if(!spot){
      return res.status(500).json({
      title: 'No spot found',
      error: {message: 'Could not find spot'}
    });
    }
    if(spot.user != decoded.user._id){
      return res.status(401).json({
        title: 'Not Authenticated',
        error: {message: 'Users do not match'}
      });
    }
    spot.remove(function(err, removed){
     if(err){
      return res.status(500).json({
        title: 'An error occured',
        error: err
      });
    }
      res.status(200).json({
        title: 'Spot removed',
        message: removed
      }); 
    });
  });
});


//Post a comment
router.post('/auth/comment', function(req, res, next){
  var decoded = jwt.decode(req.query.token);
  Spot.findById(req.body.spot, function(err, spot){
    if(err){
      return res.status(500).json({
        title: 'An error occured',
        error: err
      });
    }
    if(!spot){
      return res.status(500).json({
        title: 'Query failed',
        message: 'Could not find spot'
      });
    }
    if(spot.user != decoded.user._id){
      return res.status(401).json({
        title: 'Not Authenticated',
        error: {message: 'Users do not match'}
      });
    }
    var newComment = new Comment({
      content: req.body.content,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      user: req.body.user,
      spot: req.body.spot
    });
    newComment.save(function(err, comment){
      if(err){
        return res.status(500).json({
          title: 'An error occured',
          error: err
        });
      }
        spot.comments.push(comment._id);
        spot.save();
        res.status(200).json({
          title: 'Comment saved!',
          message: comment
      });  
    });
  });
});

module.exports = router;