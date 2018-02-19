import { Component, OnInit } from '@angular/core';
import { ShoppingService } from '../shopping.service';
import { Order } from '../../store/order.model';


@Component({
	selector: 'app-consumerOrders',
	templateUrl: './consumerOrders.component.html',
	styleUrls: ['./consumerOrders.component.css']
})

export class ConsumerOrdersComponent implements OnInit{
	orders: Order[] = [];

	constructor(private shoppingService: ShoppingService){}

	ngOnInit(){
		this.shoppingService.getOrders(localStorage.getItem('userId'))
		  .subscribe((data) => {
		  	console.log(data.orders)
		  	this.orders = data.orders;
		  }),
		  error => console.log(error);
	}


}