import { Component } from '@angular/core';
import { ConsumerAuthService } from '../auth/consumerAuth/consumerAuth.service';
import { StoreAuthService } from '../auth/storeAuth/storeAuth.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})

export class HeaderComponent{

	constructor(private consumerAuth: ConsumerAuthService,
				private storeAuth: StoreAuthService,
				private router: Router){}
	
	loggedIn(){
		return this.consumerAuth.isLoggedIn();
	}

	logout(){
		this.consumerAuth.logout();
		this.router.navigate(['/']);
	}

	isStoreAdmin(){
		return this.storeAuth.isLoggedIn();
	}

//Navigate to my orders page
	myOrders(){
		this.router.navigate(['/myorders']);
	}	
}