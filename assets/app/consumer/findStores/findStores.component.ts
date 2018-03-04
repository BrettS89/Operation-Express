import { Component, OnInit } from '@angular/core';
import { ShoppingService } from '../shopping.service';
import { Store } from '../store.model';

@Component({
	selector: 'app-findStores',
	templateUrl: './findStores.component.html',
	styleUrls: ['./findStores.component.css']
})

export class FindStoresComponent implements OnInit{
	stores: Store[];
	
	constructor(private shoppingService: ShoppingService){}

	ngOnInit(){
		this.shoppingService.getStores()
			.subscribe(
					data => this.stores = data,
					error => console.log(error)
				);
	}

	doIt(){
		this.shoppingService.sendZip({zip: '08540'})
		  .subscribe(
		  	data => console.log(data),
		  	error => console.log(error)
		  	);
	}

}