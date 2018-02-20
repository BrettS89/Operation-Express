import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-orderCard2',
	templateUrl: './orderCard2.component.html',
	styleUrls: ['./orderCard2.component.css']
})

export class OrderCard2Component{
	@Input() order;

	constructor(private router: Router){}

	singleOrder(){
		this.router.navigate(['store', 'dashboard', 'order', this.order._id]);
	}

}