import { Component, OnInit, OnDestroy } from '@angular/core';
import { StoreService } from '../store.service';
import { ShoppingService } from '../../consumer/shopping.service';
import { Store } from '../../consumer/store.model';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit{
	inRoute;
	here;

	status: string = 'notHere';

	isInRoute: boolean = true;
	isHere: boolean;

	constructor(private storeService: StoreService,
				private shoppingService: ShoppingService){}

	displayInRoute(status: string){
		this.status = 'notHere';
		this.isInRoute = true;
		this.isHere = false;
	}

	displayArrived(status: string){
		this.status = 'here';
		this.isInRoute = false;
		this.isHere = true;
	}

	ngOnInit(){
		// setInterval(() =>{
		//   this.storeService.getStore(localStorage.getItem('storeId'))
		//     .subscribe((data) => {
		// 	  	this.store = data;
		// 	  	let ir = [];
		// 	  	let ar = [];
		// 	  	this.inRoute = [];
		// 	  	this.here = [];
		// 	  	for(let order of data.orders){
		// 	  		if(order.completedPurchase == false){
		// 	  			if(order.hasArrived == false){
		// 	  				ir.push(order);
		// 	  				this.inRoute = ir;
		// 	  			} 
		// 	  			if(order.hasArrived == true){
		// 	  				ar.push(order);
		// 	  				this.here = ar;
		// 	  			}
		// 	  		}
		// 	  	}
		// 	  }),
		//   error => console.log(error);
		// }, 1000);

		setInterval(() => {
			this.storeService.employeeOrders(localStorage.getItem('userId'))
			  .subscribe(data => {
			  	let ir = [];
			  	let ar = [];
			  	this.inRoute = [];
			  	this.here = [];
			  	for(let order of data){
			  		if(order.hasArrived == false){
			  			this.inRoute.push(order);
			  		}
			  		if(order.hasArrived == true){
			  			this.here.push(order);
			  		}
			  	}
			  	console.log(this.inRoute);
			  });
		}, 1000)

	}

}