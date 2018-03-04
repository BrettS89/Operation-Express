import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { ShoppingService } from '../../shopping.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-cartItem',
	templateUrl: './cartItem.component.html',
	styleUrls: ['./cartItem.component.css']
})

export class CartItemComponent implements OnInit{
	@Input() product;
	@Output() removed = new EventEmitter<string>()

	constructor(private shoppingService: ShoppingService,
				private router: Router){}

	ngOnInit(){}

	onRemove(){
		const toRemove = {
			user: localStorage.getItem('userId'),
			item: this.product._id 
		}
		const item = this.product;

		this.shoppingService.removeCartItem(toRemove)
		  .subscribe(
		  		data => console.log(data),
		  		error => console.log(error)
		  	);
		this.removed.emit(item);  
		location.reload();

	}
}