import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StoreService } from '../store.service';
import { Product } from '../product.model';

@Component({
	selector: 'app-addProduct',
	templateUrl: './addProduct.component.html',
	styleUrls: ['./addProduct.component.css']
})

export class AddProductComponent{

	constructor(private storeService: StoreService){}

	onSubmit(form: NgForm){
		const product = new Product(
			localStorage.getItem('storeId'),
			form.value.name,
			form.value.brand,
			form.value.price,
			form.value.quantity,
			form.value.image,
		);
		this.storeService.addProduct(product)
		  .subscribe(
		  		data => console.log(data),
		  		error => console.log(error)
		  	);
		form.resetForm();
  
	}

}