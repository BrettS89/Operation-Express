const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const router = express.Router();
const jwt = require('jsonwebtoken');
const StoreAdmin = require('../models/storeadmin');


//New user signup
router.post('/signup', function(req, res){
	const newUser = new User({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password, 10)
	});
	newUser.save(function(err, user){
		if(err){
			return res.status(500).json({
				title: 'An error occured',
				error: err
			});
		}
		var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
		res.status(201).json({
			title: 'User created',
			obj: user,
			token: token
		});
	});
});


//User login
router.post('/login', function(req, res){
	User.findOne({email: req.body.email}, function(err, user){
		if(err){
			return res.status(500).json({
				title: 'An error occured',
				error: err
			});
		}
		if(!user){
			return res.status(401).json({
				message: 'Invalid login credentials'
			});
		}
		if (!bcrypt.compareSync(req.body.password, user.password)){
                    return res.status(401).json({
                    title: 'Login failed',
                    error: {message: 'Invalid login credentials'}
                }); 
            }
		const token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
		res.status(200).json({
			title: 'User found',
			obj: user,
			token: token
		});
	});
});


//Store admin login
router.post('/storeadminlogin', function(req, res, next){
	StoreAdmin.findOne({email: req.body.email})
	.populate('store', ['_id', 'name', 'city'])
	.exec(function(err, user){
		if(err){
			return res.status(500).json({
				title: 'An error occured',
				error: err
			});
		}
		if(!user){
			return res.status(500).json({
				message: 'Invalid login credentials'
			});
		}
		if (!bcrypt.compareSync(req.body.password, user.password)){
                    return res.status(401).json({
                    title: 'Login failed',
                    error: {message: 'Invalid login credentials'}
                }); 
            }
		const token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
		res.status(200).json({
			title: 'User found',
			obj: user,
			token: token
		});
	});
});

module.exports = router;