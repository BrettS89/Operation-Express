import { Component } from '@angular/core';
import { StoreAuthService } from '../storeAuth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
	selector: 'app-createEmployee',
	templateUrl: './createEmployee.component.html',
	styleUrls: ['./createEmployee.component.css']
})

export class CreateEmployeeComponent{

	constructor(private storeAuth: StoreAuthService,
				private router: Router){}

	create(form: NgForm){
		const employee = {
			userName: form.value.userName,
			password: form.value.password,
			store: localStorage.getItem('storeId')
		}
		this.storeAuth.createUser(employee)
		  .subscribe(
		  		data => console.log(data),
		  		error => console.log(error)
		  	);
		this.router.navigate(['store', 'dashboard', + localStorage.getItem('storeId')])  
	}

}