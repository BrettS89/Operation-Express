import { Component, Input } from '@angular/core';
import { Store } from '../store.model';
import { Router } from '@angular/router';

@Component({
	selector: 'app-store-card',
	templateUrl: './store-card.component.html',
	styleUrls: ['./store-card.component.css']
})

export class StoreCardComponent{
	@Input() store: Store;

	constructor(private router: Router){}

	onClick(){
		this.router.navigate(['/', 'stores', this.store.id]);
	}

}