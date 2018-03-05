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

//Admin login
	onSubmit(form: NgForm){
		const user = new StoreAdmin(
		form.value.email,
		form.value.password
		);

		this.authService.login(user)
		  .subscribe(data => {
		  	console.log(data);
		  	localStorage.setItem('token', data.token);
			localStorage.setItem('userId', data.obj._id);
			localStorage.setItem('storeId', data.obj.store._id);
			localStorage.setItem('storeName', data.obj.store.name);
			localStorage.setItem('storeCity', data.obj.store.city);
			localStorage.setItem('isAdmin', data.obj.isAdmin);
		  	window.location.href = '/store/dashboard/' + data.obj.store._id;
		  }),
		  error => console.log(error);
	}


//Employee login
	employeeLogin(form: NgForm){
		const employee = {
			userName: form.value.userName,
			password: form.value.password2
		}
		this.authService.employeeLogin(employee)
		  .subscribe(data =>{
		  	localStorage.setItem('token', data.token);
			localStorage.setItem('userId', data.obj._id);
			localStorage.setItem('userName', data.obj.userName);
			localStorage.setItem('storeId', data.obj.store);
			window.location.href = '/store/dashboard/' + data.obj.store;
		  },
		  error => console.log(error)
		  );
	}	

}