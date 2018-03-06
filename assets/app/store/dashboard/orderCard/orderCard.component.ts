import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from '../../store.service';

@Component({
	selector: 'app-orderCard',
	templateUrl: './orderCard.component.html',
	styleUrls: ['./orderCard.component.css']
})

export class OrderCardComponent{
	@Input() order;
	
	constructor(private router: Router,
				private storeService: StoreService){}

	singleOrder(){
		this.router.navigate(['store', 'dashboard', 'order', this.order._id]);
	}

	claimOrder(){
		this.storeService.claimOrder({order: this.order._id, employee: localStorage.getItem('userId')})
		  .subscribe(
		  		data => console.log(data),
		  		error => console.log(error)
		  	);
	}

}