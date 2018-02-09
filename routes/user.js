var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var request = require('superagent');


//Sign up
router.post('/', function (req, res, next) {
    var user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email
    });
    user.save(function(err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(201).json({
            message: 'User created',
            obj: result
        });
    });
});


//Sign in
router.post('/signin', function(req, res, next){
    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            return res.status(500).json({
                title: 'An error occured',
                error: err
            });
        }
            if(!user){
                return res.status(401).json({
                    title: 'Login failed',
                    error: {message: 'Invalid login credentials'}
                });
            }
            if (!bcrypt.compareSync(req.body.password, user.password)){
                    return res.status(401).json({
                    title: 'Login failed',
                    error: {message: 'Invalid login credentials'}
                }); 
            }
            var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
            res.status(200).json({
                message: 'Successfully logged in',
                token: token,
                userId: user._id,
                firstName: user.firstName,
                lastName: user.lastName
            });
    });
});


//Get user by ID
router.get('/getuser/:id', function(req, res, next){
    User.findById(req.params.id, function(err, user){
        if(err){
            return res.status(500).json({
                title: 'An error occured',
                error: err
            });
        }
        if(!user){
            return res.status(500).json({
                title: 'Query failed',
                error: 'Could not find user'
            });
        }
        res.status(200).json({
            title: 'User found!',
            theUser: user
        });
    });
});


//Crazy ass Mailchimp integration
router.post('/mailchimp', function(req, res, next){
    var mailchimpInstance   = 'us17',
        listUniqueId        = 'b11b1bd3e7',
        mailchimpApiKey     = '42ced9eab56da17702989d3ee7248749-us17';

    request
        .post('https://' + mailchimpInstance + '.api.mailchimp.com/3.0/lists/' + listUniqueId + '/members/')
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Basic ' + new Buffer('any:' + mailchimpApiKey ).toString('base64'))
        .send({
          'email_address': req.body.email,
          'status': 'subscribed',
          'merge_fields': {
            'FNAME': req.body.firstName,
            'LNAME': req.body.lastName
          }
        })
            .end(function(err, response) {
              if (response.status < 300 || (response.status === 400 && response.body.title === "Member Exists")) {
                res.send('Signed Up!');
              } else {
                res.send('Sign Up Failed :(');
              }
          });    
});

module.exports = router;