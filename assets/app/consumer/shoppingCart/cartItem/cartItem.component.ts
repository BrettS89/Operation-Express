import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-cartItem',
	templateUrl: './cartItem.component.html',
	styleUrls: ['./cartItem.component.css']
})

export class CartItemComponent{
	@Input() product;
}