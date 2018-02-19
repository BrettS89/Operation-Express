import { Component, OnInit } from '@angular/core';
import { ShoppingService } from '../../shopping.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Order } from '../../../store/order.model';
import { Location } from '@angular/common';

@Component({
	selector: 'app-oneConsumerOrder',
	templateUrl: './oneConsumerOrder.component.html',
	styleUrls: ['./oneConsumerOrder.component.css']
})

export class OneConsumerOrderComponent implements OnInit{
	id: string;
	order: Order;

	constructor(private shoppingService: ShoppingService,
				private route: ActivatedRoute,
				private location: Location){}

	ngOnInit(){
		this.id = this.route.snapshot.params['id']
		this.shoppingService.getOrder(this.id)
			.subscribe((data) =>{
				console.log(data)
				this.order = data;
			}),
			error => console.log(error);
	}

	hasArrived(){
		this.shoppingService.arrived(this.id)
		  .subscribe(
		  	data => console.log(data),
		  	error => console.log(error)
		  	);
	}

}