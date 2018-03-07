import { Component, Input } from '@angular/core';
import { Product } from '../../../store/product.model';
import { ShoppingService } from '../../shopping.service';

@Component({
	selector: 'app-productCard',
	templateUrl: './productCard.component.html',
	styleUrls: ['./productCard.component.css']
})

export class ProductCardComponent{
	@Input() product;

	constructor(private shoppingService: ShoppingService){}

	addToCart(){
		const cart = {
			id: localStorage.getItem('userId'),
			product: this.product._id,
			store: this.product.store
		};
		this.shoppingService.addToCart(cart)
		  .subscribe();
	}	
}