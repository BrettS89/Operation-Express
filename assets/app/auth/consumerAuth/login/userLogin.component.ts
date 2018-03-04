import { Component } from '@angular/core';
import { User } from '../consumer.model';
import { ConsumerAuthService } from '../consumerAuth.service'; 
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
	selector: 'app-userLogin',
	templateUrl: './userLogin.component.html',
	styleUrls: ['./userLogin.component.css']
})

export class UserLoginComponent{

	constructor(private authService: ConsumerAuthService,
				private router: Router){}

	onSubmit(form: NgForm){
		const user = {
				email: form.value.email,
				password: form.value.password
			}
		this.authService.login(user)
		.subscribe(
					data => { console.log(data);
					localStorage.setItem('token', data.token);
					localStorage.setItem('userId', data.obj._id);
					localStorage.setItem('firstName', data.obj.firstName);
					localStorage.setItem('lastName', data.obj.lastName);
					window.location.href = '/stores/find';
				},
					error => console.log(error)
				);
	}
	
}