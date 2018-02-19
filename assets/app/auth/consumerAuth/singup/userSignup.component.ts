import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../consumer.model';
import { ConsumerAuthService } from '../consumerAuth.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-userSignup',
	templateUrl: './userSignup.component.html',
	styleUrls: ['./userSignup.component.css']
})

export class UserSignupComponent{

	constructor(private authService: ConsumerAuthService,
				private router: Router){}

//Submit signup form and login	
	onSubmit(form: NgForm){
		const user = new User(
				form.value.firstName,
				form.value.lastName,
				form.value.email,
				form.value.password
			);
		this.authService.signUp(user)
		.subscribe(
					data => { console.log(data);
					localStorage.setItem('token', data.token);
					localStorage.setItem('userId', data.obj._id);
					localStorage.setItem('firstName', data.obj.firstName);
					localStorage.setItem('lastName', data.obj.lastName);
					this.router.navigate(['/stores/find']);
				},
					error => console.log(error)
				);
	}
}