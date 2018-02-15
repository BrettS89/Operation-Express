import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../consumer.model';

@Component({
	selector: 'app-userSignup',
	templateUrl: './userSignup.component.html',
	styleUrls: ['./userSignup.component.css']
})

export class UserSignupComponent{
	
	onSubmit(form: NgForm){
		const user = new User(
				form.value.firstName,
				form.value.lastName,
				form.value.email,
				form.value.password
			);
	}
}