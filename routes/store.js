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

function handleError(){
	if(err){
		return res.status(500).json({
			title: 'An error occured',
			error: err
		});
	}
}

//Get stores
router.get('/get', function(req, res, next){
	Store.find({}, function(err, stores){
		if(err){
			return res.status(500).json({
				title: 'An error occured',
				error: err
			});
		}
		if(!stores){
			return res.status(500).json({
				title: 'Query failed',
				message: 'Could not find any stores'
			});
		}
		res.status(200).json({
			title: 'Stores retrieved',
			stores: stores
		});
	});
});


//Get store by Id
router.get('/one/:id', function(req, res, next){
	Store.findById(req.params.id) 
	.populate('products', ['name', 'brand', 'price', 'quantity', 'image', '_id', 'store'])
	.exec(function(err, store){
		if(err){
			return res.status(500).json({
				title: 'An error occured',
				error: err
			});
		}
		if(!store){
			return res.status(500).json({
				title: 'Query failed',
				message: 'Could not find store'
			});
		}
		console.log(store);
		res.status(200).json({
			title: 'Store found',
			store: store
		});
	});
});


//Create a new store
router.post('/new', function(req, res, next){
	const newStore = new Store({
		name: req.body.name,
		type: req.body.type,
		address: req.body.address,
		city: req.body.city,
		state: req.body.state,
		image: req.body.image
	});
	newStore.save(function(err, newStore){
		if(err){
			return res.status(500).json({
				title: 'An error occured',
				error: err
			});
		}
		const storeAdmin = new StoreAdmin({
			store: newStore._id,
			email: (newStore.name + "." + newStore.city + "@express.com").toLowerCase().split(' ').join(''),
			password: bcrypt.hashSync((newStore.name + "." + newStore.city + "@password").toLowerCase().split(' ').join(''), 10)
		});
		storeAdmin.save(function(err, admin){
			if(err){
				return res.status(500).json({
					title: 'An error occured',
					error: err
				});
			}
			newStore.update({admin: admin._id}, function(err, store){
				if(err){
					return res.status(500).json({
						title: 'An error occured',
						error: err
					});
				}
				res.status(201).json({
				title: 'Store created',
				obj: store
			});
			});
		});
		
	});
});


//Add new product
router.post('/product/new', function(req, res, next){
	Store.findById(req.body.store, function(err, store){
		if(err){
			return res.status(500).json({
				title: 'An error occured',
				error: err
			});
		}
		if(!store){
			return res.status(500).json({
				title: 'Query failed',
				message: 'Could not find store'
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
		product.save(function(err, savedProduct){
			if(err){
				return res.status(500).json({
					title: 'An error occured',
					error: err
				});
			}
			store.products.push(savedProduct._id);
			store.save();
			res.status(201).json({
				title: 'Product saved!',
				product: savedProduct
			});
		});
	});
});





//Get shopping cart by Id
router.get('/getcart/:id', function(req, res, next){
	Cart.findOne({user: req.params.id}, function(err, cart){
		if(err){
			return res.status(500).json({
				title: 'An error occured',
				error: err
			});
		}
		if(!cart){
			return res.status(500).json({
				title: 'Query failed',
				message: 'No cart was found'
			});
		}
		Cart.findById(cart._id)
		// .populate('products', ['name', 'brand', 'price', 'quantity', 'image']) 
		.populate({path: 'items', populate: [{path: 'product', select: ['name', 'brand', 'price', 'quantity', 'image']}]})
	    .exec(function(err, foundCart){
		if(err){
			return res.status(500).json({
				title: 'An error occured',
				error: err
			});
		}
		if(!cart){
			return res.status(500).json({
				title: 'Query failed',
				message: 'Could not find cart'
			});
		}
		res.status(200).json({
			title: 'Cart retrieved',
			cart: foundCart
		});
	});
  });
});


//Place order
router.post('/placeorder/:id', function(req, res, next){
	Cart.findById(req.params.id, function(err, cart){
		if(err){
			return res.status(500).json({
				title: 'An error occured',
				error: err
			});
		}
		if(!cart){
			return res.status(500).json({
				title: 'Query failed',
				message: 'Could not find cart'
			});
		}
		Store.findById(req.body.store, function(err, store){
			if(err){
			return res.status(500).json({
				title: 'An error occured',
				error: err
			});
		}
		if(!store){
			return res.status(500).json({
				title: 'Query failed',
				message: 'Could not find store'
			});
		}
		User.findById(req.body.user, function(err, user){
			if(err){
			return res.status(500).json({
				title: 'An error occured',
				error: err
			});
		}
			if(!user){
			return res.status(500).json({
				title: 'Query failed',
				message: 'Could not find user'
			});
		}
		const newOrder = new Order({
			user: req.body.user,
			store: req.body.store,
			products: req.body.products,
			subTotal: req.body.subTotal,
			tax: req.body.tax,
			total: req.body.total
		});
		newOrder.save(function(err, order){
			if(err){
				return res.status(500).json({
					title: 'An error occured',
					error: err
				});
			}
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
		});
		});
	});
});


//Get order by Id
router.get('/getorder/:id', function(req, res, next){
	Order.findById(req.params.id)
	// .populate('products', ['_id', 'name', 'brand', 'quantity', 'price', 'image']) 

	.populate([{path: 'user', select: ['._id', 'firstName', 'lastName']}, {path: 'products', select: ['_id', 'name', 'brand', 'quantity', 'price', 'image']}])

	.exec(function(err, order){
		if(err){
			return res.status(500).json({
				title: 'An error occured',
				error: err
			});
		}
		if(!order){
			return res.status(500).json({
				title: 'Query failed',
				message: 'Could not find order'
			});
		}
		res.status(200).json({
			title: 'Order found',
			order: order
		});
	});
});	


//Get store for dashboard
router.get('/adminone/:id', function(req, res, next){
	Store.findById(req.params.id) 
	.populate({path: 'orders', populate: [{path: 'user', select: ['._id', 'firstName', 'lastName']}, {path: 'products', model: Product}]})
	.exec(function(err, store){
		if(err){
			return res.status(500).json({
				title: 'An error occured',
				error: err
			});
		}
		if(!store){
			return res.status(500).json({
				title: 'Query failed',
				message: 'Could not find store'
			});
		}
		console.log(store);
		res.status(200).json({
			title: 'Store found',
			store: store
		});
	});
});


//Get orders by user id
router.get('/userorders/:id', function(req, res, next){
	Order.find({user: req.params.id})
	.populate('store', ['name', 'city'])
	.exec(function(err, orders){
		if(err){
			return res.status(500).json({
				title: 'An error occured',
				error: err
			});
		}
		if(!orders){
			return res.status(500).json({
				title: 'Query failed',
				message: 'No orders were found'
			});
		}
		res.status(200).json({
			title: 'Orders found',
			orders: orders
		});
	});
});


//Change hasArrived field to true
router.post('/arrived', function(req, res, next){
	Order.update({_id: req.body.id}, {hasArrived: true}, function(err, updatedOrder){
		if(err){
			return res.status(500).json({
				title: 'An error occured',
				error: err
			});
		}
		res.status(200).json({
			title: 'Store has been notified of car arrival',
			order: updatedOrder
		});
	});
});


//Change completedPurchase to true
router.post('/completed', function(req, res, next){
	Order.update({_id: req.body.id}, {completedPurchase: true}, function(err, completedOrder){
		if(err){
			return res.status(500).json({
				title: 'An error occured',
				error: err
			});
		}
		res.status(200).json({
			title: 'Order has been completed',
			order: completedOrder
		});
	});
});


//Remove a product from shopping cart
router.post('/removefromcart', function(req, res, next){
	Cart.findOne({user: req.body.user}, function(err, cart){
		if(err){
			return res.status(500).json({
				title: 'An error occured',
				error: err
			});
		}
		if(!cart){
			return res.status(404).json({
				title: 'Query failed',
				message: 'No cart was found'
			});
		}
		console.log(cart);
		CartItem.findById(req.body.item, function(err, item){
			if(err){
				return res.status(500).json({
					title: 'An error occured',
					error: err
				});
			}
			if(!item){
			return res.status(404).json({
				title: 'Query failed',
				message: 'No item was found'
			});
		}
		cart.items.pull(item);
		cart.save(function(err, updatedCart){
			if(err){
				return res.status(500).json({
					title: 'An error occured',
					error: err
				});
			}
			console.log(updatedCart);
			res.status(200).json({
				title: 'Product was removed from cart',
				cart: updatedCart
			});
		});
		});
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


//Add a shopping cart or add items to exisiting shopping cart
// router.post('/auth/addtocart', function(req, res, next){
// 	Cart.findOne({user: req.body.id}, function(err, cart){
// 		if(err){
// 			return res.status(500).json({
// 				title: 'An error occured',
// 				error: err
// 			});
// 		}
// 		if(!cart){
// 			const newCart = new Cart({
// 				user: req.body.id,
// 				store: req.body.store,
// 				products: req.body.product
// 			});
// 			newCart.save(function(err, createdCart){
// 				if(err){
// 					return res.status(500).json({
// 						title: 'An error occured',
// 						error: 'err'
// 					});
// 				}
// 				return res.status(201).json({
// 					title: 'Shopping cart created',
// 					cart: createdCart
// 				});
// 			});
// 		}
// 		else{
// 			cart.products.push(req.body.product);
// 			cart.save();
// 			res.status(200).json({
// 				title: 'Added product to cart',
// 				cart: cart
// 			});
// 		}
// 	});
// });


router.post('/auth/addtocart', function(req, res, next){
	const cartItem = new CartItem({product: req.body.product});
	cartItem.save(function(err, cartItem){
			if(err){
				return res.status(500).json({
					title: 'An error occured',
					error: err
				});
			}
			Cart.findOne({user: req.body.id}, function(err, cart){
				if(err){
				return res.status(500).json({
				title: 'An error occured',
				error: err
				});
			}
				if(!cart){
					const newCart = new Cart({
					user: req.body.id,
					store: req.body.store,
					items: cartItem._id
				  });
					newCart.save(function(err, createdCart){
						if(err){
							return res.status(500).json({
							title: 'An error occured',
							error: err
						});
					}
						cartItem.update({cart: createdCart._id});
						return res.status(201).json({
							title: 'Cart created',
							cart: createdCart
						});
					});
				}
				else{
				cart.items.push(cartItem._id);
				cart.save();
				cartItem.update({cart: cart._id});
				res.status(200).json({
					 Title: 'Item added to cart',
					 cart: cart
				});
			}
		});
	});
});


module.exports = router;