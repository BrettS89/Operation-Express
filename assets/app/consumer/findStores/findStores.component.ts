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
	position;
	
	constructor(private shoppingService: ShoppingService){}

	ngOnInit(){
		navigator.geolocation.getCurrentPosition(position => {
			this.shoppingService.sendCoords({lat: position.coords.latitude.toString(), 
											 long: position.coords.longitude.toString()})
			  .subscribe(data => {
			  	const zip = data.results[0].locations[0].postalCode.split('-')[0];
			  	console.log(zip);
			  	this.shoppingService.sendZip({zip: zip})
			  	  .subscribe(data => {
			  	  	this.stores = data;
			  	  }, error => console.log(error));
			  }, error => console.log(error));
		});
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