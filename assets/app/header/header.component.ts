import { Component } from '@angular/core';
import { ConsumerAuthService } from '../auth/consumerAuth/consumerAuth.service';
import { StoreAuthService } from '../auth/storeAuth/storeAuth.service';
import { Router } from '@angular/router';
import { ShoppingService } from '../consumer/shopping.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})

export class HeaderComponent{
	storeId: string = localStorage.getItem('storeId');
	storeName: string = localStorage.getItem('storeName');
	storeCity: string = localStorage.getItem('storeCity');
	firstName: string = localStorage.getItem('firstName');
	userId: string = localStorage.getItem('userId');
	userName: string = localStorage.getItem('userName');

	constructor(private consumerAuth: ConsumerAuthService,
				private storeAuth: StoreAuthService,
				private router: Router,
				private shoppingService: ShoppingService){}
	
	loggedIn(){
		return this.consumerAuth.isLoggedIn();
	}

	logout(){
		this.consumerAuth.logout();
		window.location.href = '/';
	}

	isStoreAdmin(){
		return this.storeAuth.isAdmin();
	}

	isStore(){
		return this.storeAuth.isStore();
	}

//Navigate to my orders page
	myOrders(){
		this.router.navigate(['/myorders']);
	}	



}