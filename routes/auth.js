const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();


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
		res.status(201).json({
			title: 'User created',
			obj: user
		});
	});
});


//User login
router.post('/login', function(req, res){
	findOne({email: req.body.email}, function(err, user){
		if(err){
			return res.status(500).json({
				title: 'An error occured',
				error: err
			});
		}
		if(!user){
			return res.status(500).json({
				message: 'No user found'
			});
		}
		const token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
		res.status(200).json({
			title: 'User found',
			token: token,
			userId: user._id,
			firstName: user.firstName,
			lastName: user.lastName
		});
	});
});

module.exports = router;