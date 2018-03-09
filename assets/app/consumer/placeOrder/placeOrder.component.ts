import { Component, OnInit } from '@angular/core';
import { ShoppingService } from '../shopping.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Order } from '../../store/order.model';

@Component({
	selector: 'app-placeOrder',
	templateUrl: './placeOrder.component.html',
	styleUrls: ['./placeOrder.component.css']
})

export class PlaceOrderComponent implements OnInit{

	store: string;
	cartId: string;
	products: any;
	subTotal: number = 0;
	tax: number = 0;
	total: number = 0;
	orderId: string;
	stripeTotal;

	constructor(private route: ActivatedRoute,
				private shoppingService: ShoppingService,
				private location: Location,
				private router: Router){}

		ngOnInit(){
		this.cartId = this.route.snapshot.params['id'];
		this.shoppingService.getCart(localStorage.getItem('userId'))
		  .subscribe((data) => {
		  	this.products = [];
		  	for(let product of data.items){
		  		this.products.push(product.product);
		  	}
		  	this.store = data.store;
		  		for(let product of data.items){
		  			this.subTotal = +product.product.price + this.subTotal;
		  		}
		  		this.tax = Math.round(100 * (this.subTotal * .07))/100;
		  		this.total = this.subTotal + this.tax;
		  		this.total = Math.round(100 * (this.subTotal + this.tax))/100;
		  		this.stripeTotal = this.total.toFixed(2).split('.').join("");
		  	});
		}

	placeOrder(){
		const order = new Order(
			localStorage.getItem('userId'),
			this.store,
			this.products,
			this.subTotal,
			this.tax,
			this.total,
			this.cartId
		);
		this.shoppingService.placeOrder(order)
		  .subscribe((data) => {
		  	this.orderId = data.order._id;
		  	this.router.navigate(['/confirmed', data.order._id]);
		  });
	}

	openCheckout() {
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_dE23DJ0t5zN16bfMsiyQiWGy',
      locale: 'auto',
      token: (token: any) => {
      	this.shoppingService.sendToken({tok: token, total: Number(this.stripeTotal)})
      	  .subscribe(data => {
      	  	this.placeOrder();
      	  }, error => console.log(error));
             }
    });

    handler.open({
      name: 'Shoproute',
      description: 'Your order',
      amount: Number(this.stripeTotal)
    });

	}

}