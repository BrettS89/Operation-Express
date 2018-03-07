const express = require('express');
const router = express.Router();
const Store = require('../models/store');
const Product = require('../models/product');
const User = require('../models/user');
const Cart = require('../models/cart');
const Order = require('../models/order');
const StoreAdmin = require('../models/storeadmin');
const CartItem = require('../models/cartItem');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const request = require('superagent');
const keys = require('../classified/keys');


//Get stores near searched zipcode
router.post('/zip', function(req, res, next){

        request.get('https://www.zipcodeapi.com/rest/' + keys.zipKey + '/radius.json/' + req.body.zip + '/7/miles?minimal')
            .end(function(err, response) {
            	const obj = JSON.parse(response.text)
            	console.log(obj);
            	Store.find({zip: obj.zip_codes}, (err, stores) =>{
            		if(err){
            			return res.status(500).json({
            				error: err
            			});
            		}
            		res.status(200).json({stores: stores});
            	});
          });    
});


//Get all stores
router.get('/get', async (req, res) => {
	const stores = await Store.find({});
	res.status(200).json({stores: stores});
});


//Get store by id
router.get('/one/:id', async (req, res) => {
	const store = await Store.findById(req.params.id) 
						.populate('products', ['name', 'brand', 'price', 'quantity', 'image', '_id', 'store'])
						.exec();
	res.status(200).json({store: store});					
});


//Create a new store and store admin
router.post('/new', async (req, res) => {
	const store = new Store({
		name: req.body.name,
		type: req.body.type,
		address: req.body.address,
		city: req.body.city,
		state: req.body.state,
		zip: req.body.zip,
		image: req.body.image
	});
	const newStore = await store.save()
	const storeAdmin = new StoreAdmin({
			store: newStore._id,
			email: (newStore.name + "." + newStore.city + "@express.com").toLowerCase().split(' ').join(''),
			password: bcrypt.hashSync((newStore.name + "." + newStore.city + "@password").toLowerCase().split(' ').join(''), 10)
		});
	const admin = await storeAdmin.save()
	const updatedStore = await newStore.update({admin: admin._id})
	return res.status(201).json({obj: updatedStore});
});


//Get order by order id
router.get('/getorder/:id', async (req, res) => {
	const order =  await Order.findById(req.params.id)
				   .populate([{path: 'user', select: ['._id', 'firstName', 'lastName']}, {path: 'products', select: ['_id', 'name', 'brand', 'quantity', 'price', 'image']}])
				   .exec();
	res.status(200).json({order: order});
});


//Get orders by user id
router.get('/userorders/:id', async (req, res) => {
	const orders = await Order.find({user: req.params.id})
						 .populate('store', ['name', 'city'])
						 .exec();
	res.status(200).json({orders: orders});
});


//Change hasArrived field to true
router.post('/arrived', async (req, res) => {
	const order = await Order.update({_id: req.body.id}, {hasArrived: true});
	res.status(200).json({order: order});
});


//Get zip code by coordinates
router.get('/getzip/:lat/:long', async (req, res) => {
	request.get('http://www.mapquestapi.com/geocoding/v1/reverse?key=' + keys.mapQuestKey + '&location=' + req.params.lat + ',' + req.params.long + '&includeRoadMetadata=true&includeNearestIntersection=true')
	.end((err, response) => {
		const obj = JSON.parse(response.text);
		res.status(200).json(obj);
	});
});


//=====================================================================
//Protected Routes
//=====================================================================


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


//Create cart and or add item to cart
router.post('/auth/addtocart', async (req, res) => {
	const cartItem = new CartItem({product: req.body.product});
	const item = await cartItem.save();
	const cart = await Cart.findOne({user: req.body.id});
	if(!cart){
		const newCart = new Cart({
				user: req.body.id,
				store: req.body.store,
				items: cartItem._id
			});
		const createdCart = await newCart.save();
		cartItem.update({cart: createdCart._id});
		return res.status(201).json({cart: createdCart});
	}
	else{
		const prod = await Product.findById(req.body.product);
		if(prod.store.toString() !== cart.store.toString()){
			return res.status(401).json({message: 'Connot combine stores in one shopping cart'});
		}
		else{
		cart.items.push(cartItem._id);
		const updatedCart = await cart.save();
		cartItem.update({cart: cart._id});
		res.status(200).json({
	        Title: 'Item added to cart',
			cart: updatedCart
			});
		  }
		}
});


//Add new product
router.post('/auth/product/new', async (req, res) => {
	const decoded = jwt.decode(req.query.token);
	const store = await Store.findById(req.body.store);
	if(store.admin != decoded.user._id){
			return res.status(401).json({
        	    title: 'Not Authenticated',
       		    error: {message: 'Users do not match'}
    		});
		}
	const product = new Product({
			store: req.body.store,
			name: req.body.name,
			brand: req.body.brand,
			price: req.body.price,
			quantity: req.body.quantity,
			image: req.body.image
		});
	const savedProduct = await product.save();
	store.products.push(savedProduct._id);
	store.save();
	res.status(200).json({product: savedProduct});
});


//Get shopping cart by id
router.get('/auth/getcart/:id', async (req, res) => {
	var decoded = jwt.decode(req.query.token);
	const cart = await Cart.findOne({user: req.params.id})
					   .populate({path: 'items', populate: [{path: 'product', select: ['name', 'brand', 'price', 'quantity', 'image']}]})
	   				   .exec();
	if(cart.user != decoded.user._id){
      		return res.status(401).json({
     		   title: 'Not Authenticated',
      		   error: {message: 'Users do not match'}
    		});
  		  }
  	res.status(200).json({cart: cart});	  
});


//Get cart item count
router.get('/auth/itemcount/:id', async (req, res) => {
	var decoded = jwt.decode(req.query.token);
	const itemCount = await Cart.findOne({user: req.params.id})
	if(itemCount.user != decoded.user._id){
      		return res.status(401).json({
     		   title: 'Not Authenticated',
      		   error: {message: 'Users do not match'}
    		});
  		  }
  	res.status(200).json({itemCount: itemCount.items.length});	  
});


//Place an order
router.post('/auth/placeorder/:id', async (req, res) => {
	var decoded = jwt.decode(req.query.token);
	const cart = await Cart.findById(req.params.id);
	if(cart.user != decoded.user._id){
      		return res.status(401).json({
     		   title: 'Not Authenticated',
      		   error: {message: 'Users do not match'}
    		});
  		  }
  	const store = await Store.findById(req.body.store);
  	const user = await User.findById(req.body.user);
  	const newOrder = new Order({
			user: req.body.user,
			store: req.body.store,
			products: req.body.products,
			subTotal: req.body.subTotal,
			tax: req.body.tax,
			total: req.body.total
		});
	const order = await newOrder.save();
	store.orders.push(order);
			store.save();
			user.orders.push(order);
			user.save();
			cart.remove();
			res.status(201).json({
				title: 'Order placed',
				order: order
			});	  
});


//Get store for dashboard
router.get('/auth/adminone/:id', async (req, res) => {
	var decoded = jwt.decode(req.query.token);
	const store = await Store.findById(req.params.id) 
						.populate({path: 'orders', populate: [{path: 'user', select: ['._id', 'firstName', 'lastName']}, {path: 'products', model: Product}]})
						.exec();
	if(store.admin != decoded.user._id && store.employees.indexOf(decoded.user._id) < 0){
			return res.status(401).json({
     		   title: 'Not Authenticated',
      		   error: {message: 'Users do not match'}
    		});
		}
	res.status(200).json({store: store});						
});


//Get orders for new orders dashboard
router.get('/auth/neworders/:id', async (req, res) => {
	var decoded = jwt.decode(req.query.token);
	const orders = await Order.find({store: req.params.id, accepted: false})
						 .populate([{path: 'user', select: ['._id', 'firstName', 'lastName']}, {path: 'products', model: Product}, {path: 'store', select: ['name', 'city']}])
						 .exec();
	const store = await Store.findById(req.params.id);					 
	res.status(200).json({orders: orders, storeName: store.name, storeCity: store.city});					 
});


//Change completedPurchase to true
router.post('/auth/completed', async (req, res) => {
	const completedOrder = await Order.update({_id: req.body.id}, {completedPurchase: true});
	res.status(200).json({order: completedOrder});
});


//Remove a product from shopping cart
router.post('/auth/removefromcart', async (req, res) => {
	var decoded = jwt.decode(req.query.token);
	const cart = await Cart.findOne({user: req.body.user});
	if(cart.user != decoded.user._id){
			return res.status(401).json({
     		   title: 'Not Authenticated',
      		   error: {message: 'Users do not match'}
    		});
		}
	const item = await CartItem.findById(req.body.item);
	cart.items.pull(item);
	const updatedCart = await cart.save();
	if(updatedCart.items.length === 0){
		updatedCart.remove();
		return res.status(200).json({message: 'Cart is empty'});
	}
	res.status(200).json({cart: updatedCart});	
});


//Employee accept order
router.post('/auth/accept', async (req, res) => {
	var decoded = jwt.decode(req.query.token);
	if(req.body.employee != decoded.user._id){
		return res.status(401).json({
     		   title: 'Not Authenticated',
      		   error: {message: 'Users do not match'}
    		});
	}
	const order = await Order.findById(req.body.order);
	const updatedOrder = await order.update({employee: req.body.employee, accepted: true});
	res.status(200).json(updatedOrder);
});


//Get an employee's orders
router.get('/auth/employeeorders/:id', async (req, res) => {
	var decoded = jwt.decode(req.query.token);
	const orders = await Order.find({employee: req.params.id, completedPurchase: false})
						 .populate([{path: 'user', select: ['._id', 'firstName', 'lastName']}, {path: 'products', model: Product}])
						 .exec();
	const store = await Store.findOne({employees: req.params.id});
	console.log(store.name);
	res.status(200).json({orders: orders, storeName: store.name, storeCity: store.city});
});


module.exports = router;