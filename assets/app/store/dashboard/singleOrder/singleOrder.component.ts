import { Component, OnInit } from '@angular/core';
import { ShoppingService } from '../../../consumer/shopping.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
	selector: 'app-singleOrder',
	templateUrl: './singleOrder.component.html',
	styleUrls: ['./singleOrder.component.css']
})

export class SingleOrderComponent implements OnInit{
	order;

	constructor(private route: ActivatedRoute,
				private shoppingService: ShoppingService,
				private location: Location,
				private router: Router){}

	ngOnInit(){
		this.shoppingService.getOrder(this.route.snapshot.params['id'])
		  .subscribe((data) =>{
		  	console.log(data);
		  	this.order = data;
		  },
		  error => console.log(error));
	}


	completeOrder(){
		this.shoppingService.completedPurchase(this.order._id)
		  .subscribe(
		  		data => console.log(data),
		  		error => console.log(error),
		  	);
		this.router.navigate(['store', 'dashboard', localStorage.getItem('storeId')]);
	}
	
}