import { Component, Input } from '@angular/core';
import { Order } from '../../../store/order.model';
import { Router } from '@angular/router';
import { ShoppingService } from '../../shopping.service';


@Component({
	selector: 'app-consumerOrdersTable',
	templateUrl: './consumerOrdersTable.component.html',
	styleUrls: ['./consumerOrdersTable.component.css']
})

export class ConsumerOrdersTableComponent{
	@Input() order;

	constructor(private shoppingService: ShoppingService,
				private router: Router){}

	oneOrder(){
		this.router.navigate(['/myorders', this.order._id])
	}
}