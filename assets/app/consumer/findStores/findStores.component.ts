import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
		// this.shoppingService.getStores()
		// 	.subscribe(
		// 			data => this.stores = data,
		// 			error => console.log(error)
		// 		);
	}

	doIt(form: NgForm){
		this.shoppingService.sendZip({zip: form.value.zip})
		  .subscribe((data) =>{
		  	this.stores = data;
		  },
		  error => console.log(error)
		  );
		  form.resetForm();
		  	
	}

}