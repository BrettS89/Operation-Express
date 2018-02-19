import { Component, OnInit } from '@angular/core';
import { ShoppingService } from '../../shopping.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
	selector: 'app-orderConfirmation',
	templateUrl: './orderConfirmation.component.html',
	styleUrls: ['./orderConfirmation.component.css']
})

export class OrderConfirmationComponent implements OnInit{
	id: string;

	constructor(private route: ActivatedRoute,
				private shoppingService: ShoppingService,
				private location: Location){}

	ngOnInit(){
		this.id = this.route.snapshot.params['id'];

		this.shoppingService.getOrder(this.id)
		  .subscribe((data) => {
		  	this.id = data._id;
		  },
		  error => console.log(error));
	}
	
}