import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StoreAuthService } from '../storeAuth.service';
import { Router } from '@angular/router';
import { StoreAdmin } from '../storeadmin.model';

@Component({
	selector: 'app-storeAdminLogin',
	templateUrl: './storeAdminLogin.component.html',
	styleUrls: ['./storeAdminLogin.component.css']
})

export class StoreAdminLoginComponent{

	constructor(private authService: StoreAuthService,
				private router: Router){}


	onSubmit(form: NgForm){
		const user = new StoreAdmin(
		form.value.email,
		form.value.password
		);

		this.authService.login(user)
		  .subscribe((data) => {
		  	localStorage.setItem('token', data.token);
			localStorage.setItem('userId', data.obj._id);
			localStorage.setItem('storeId', data.obj.store);
		  	this.router.navigate(['/store', 'dashboard', data.obj.store]);
		  }),
		  error => console.log(error);
	}

}