import { Component, OnInit } from '@angular/core';
import { StoreService } from '../store.service';
import { ShoppingService } from '../../consumer/shopping.service';
import { Store } from '../../consumer/store.model';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit{
	store: Store;
	inRoute;
	here;

	constructor(private storeService: StoreService,
				private shoppingService: ShoppingService){}

	ngOnInit(){
		this.storeService.getStore(localStorage.getItem('storeId'))
		  .subscribe((data) => {
		  	console.log(data);
		  	this.store = data;
		  	let ir = [];
		  	let ar = [];
		  	for(let order of data.orders){
		  		if(order.completedPurchase === false){
		  			if(order.hasArrived === false){
		  				ir.push(order);
		  				this.inRoute = ir;
		  			} 
		  			if(order.hasArrived === true){
		  				ar.push(order);
		  				this.here = ar;
		  			}
		  		}
		  	}
		  }),
		  error => console.log(error);
	}


}