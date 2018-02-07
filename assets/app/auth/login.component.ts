import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { User } from './user.model';
import { Router } from '@angular/router'

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{
	myForm: FormGroup;

	constructor(private authService: AuthService, private router: Router){}

	onSubmit(){
		const user = new User(this.myForm.value.email, this.myForm.value.password);
		this.authService.signIn(user)
			.subscribe(
				data => {
					localStorage.setItem('token', data.token);
					localStorage.setItem('userId', data.userId);
					localStorage.setItem('firstName', data.firstName);
					localStorage.setItem('lastName', data.lastName);
					this.router.navigateByUrl('/');
				},
				error => console.error(error)
				);
		this.myForm.reset();
	}

	ngOnInit(){
		this.myForm = new FormGroup({
			email: new FormControl(null, Validators.required),
			password: new FormControl(null, Validators.required)
		});
	}
	
}