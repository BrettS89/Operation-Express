import { Component, OnInit } from '@angular/core';
import { StoreService } from '../store.service';
import { Store } from '../../consumer/store.model';

@Component({
	selector: 'app-newOrders',
	templateUrl: './newOrders.component.html',
	styleUrls: ['./newOrders.component.css']
})

export class NewOrdersComponent implements OnInit{
	orders;

	constructor(private storeService: StoreService){}

	ngOnInit(){
		setInterval(() => {
			this.storeService.newOrders(localStorage.getItem('storeId'))
			  .subscribe(data => {
			  	this.orders = [];
			  	this.orders = data;
			  	console.log(this.orders);
			  },
			  error => console.log(error)
			  )
		}, 1000);
	}

}