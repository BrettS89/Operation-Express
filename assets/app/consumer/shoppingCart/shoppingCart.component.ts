import { Component, OnInit, NgZone} from '@angular/core';
import { ShoppingService } from '../shopping.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-shoppingCart',
	templateUrl: './shoppingCart.component.html',
	styleUrls: ['./shoppingCart.component.css']
})

export class ShoppingCartComponent implements OnInit{
	id: string;
	products;
	subTotal: number = 0;
	tax: number;
	total: number;

	constructor(private shoppingService: ShoppingService,
				private router: Router,
				private ngZone: NgZone){}

	ngOnInit(){
		this.shoppingService.getCart(localStorage.getItem('userId'))
		  .subscribe((data) => {
		  		console.log(data);
		  		// this.products = [];
		  		this.products = data.items;
		  		this.id = data._id;
		  		for(let product of data.items){
		  			this.subTotal = +product.product.price + this.subTotal;
		  		}
		  		this.tax = Math.round(100 * (this.subTotal * .07))/100;
		  		this.total = this.subTotal + this.tax;
		  		this.total = Math.round(100 * (this.subTotal + this.tax))/100;
		  	},
		  	error => console.log(error));
	}

	proceedToCheckout(){
		this.router.navigate(['order', this.id]);
	}

	onItemRemoved(product: any){
		// this.products.splice(this.products.indexOf(product), 1);
		// this.subTotal = 0;
		// this.tax = 0;
		// this.total = 0;
		
		// this.ngOnInit();
	}

}



