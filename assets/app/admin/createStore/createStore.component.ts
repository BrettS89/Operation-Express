import { Component } from '@angular/core';
import { StoreService } from '../../store/store.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
	selector: 'app-createStore',
	templateUrl: './createStore.component.html',
	styleUrls: ['./createStore.component.css']
})

export class CreateStoreComponent{
	
	constructor(private storeService: StoreService,
				private router: Router){}

	addStore(form: NgForm){
		const newStore = {
			name: form.value.name,
			type: form.value.type,
			address: form.value.address,
			city: form.value.city,
			state: form.value.state,
			image: form.value.image
		}
		this.storeService.addStore(newStore)
			.subscribe(
					data => console.log(data),
					error => console.log(error)
				);
		this.router.navigate(['/stores/find']);	
	}

}