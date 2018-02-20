import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-orderCard',
	templateUrl: './orderCard.component.html',
	styleUrls: ['./orderCard.component.css']
})

export class OrderCardComponent{
	@Input() order;
	
	constructor(private router: Router){}

	singleOrder(){
		this.router.navigate(['store', 'dashboard', 'order', this.order._id]);
	}

}