import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Store } from '../store.model';
import { ShoppingService } from '../shopping.service';
import { StoreService } from '../../store/store.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Product } from '../../store/product.model';

@Component({
	selector: 'app-storeFront',
	templateUrl: './storeFront.component.html',
	styleUrls: ['./storeFront.component.css']
})

export class StoreFrontComponent implements OnInit{
	store: Store;
	products;
	id: string;
	toggle: boolean = true;

	constructor(private route: ActivatedRoute,
				private shoppingService: ShoppingService,
				private storeService: StoreService,
				private location: Location){}

	ngOnInit(){
		this.id = this.route.snapshot.params['id'];

		this.shoppingService.getStore(this.id)
			.subscribe((data: Store) => {
				console.log(data);
				this.store = data;
				this.products = data.products;
			}
					
				);
	}
	AfterViewChecked(){}

	onClick(){
		this.toggle = !this.toggle;
	}

	onSubmit(form: NgForm){
		const product = new Product(
			this.store.id,
			form.value.name,
			form.value.brand,
			form.value.price,
			form.value.quantity,
			form.value.image,
		);
		this.storeService.addProduct(product)
		  .subscribe(
		  		data => this.products.unshift(data.product),
		  		error => console.log(error)
		  	);
		form.resetForm();
		this.onClick();
	  
	}
}