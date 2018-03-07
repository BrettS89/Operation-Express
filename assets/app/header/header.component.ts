import { Component, OnInit } from '@angular/core';
import { ConsumerAuthService } from '../auth/consumerAuth/consumerAuth.service';
import { StoreAuthService } from '../auth/storeAuth/storeAuth.service';
import { Router } from '@angular/router';
import { ShoppingService } from '../consumer/shopping.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit{
	storeId: string = localStorage.getItem('storeId');
	storeName: string = localStorage.getItem('storeName');
	storeCity: string = localStorage.getItem('storeCity');
	firstName: string = localStorage.getItem('firstName');
	userId: string = localStorage.getItem('userId');
	userName: string = localStorage.getItem('userName');
	itemCount: number = 0;
	subscription: Subscription;

	constructor(private consumerAuth: ConsumerAuthService,
				private storeAuth: StoreAuthService,
				private router: Router,
				private shoppingService: ShoppingService){
		this.subscription = this.shoppingService.getCount()
		  .subscribe(cart => {
		  	console.log(cart);
		  	this.itemCount = cart.cart.items.length;
		  });
	}

ngOnInit(){
	this.shoppingService.getCartItemCount(localStorage.getItem('userId'))
		  .subscribe(data => this.itemCount = data.itemCount);

}
	
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