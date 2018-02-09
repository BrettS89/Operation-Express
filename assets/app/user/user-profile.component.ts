import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { Response } from '@angular/http';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
	selector: 'app-user-profile',
	templateUrl: './user-profile.component.html',
	styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit{
	user;
	id: string;

		ngOnInit(){
		this.id = this.route.snapshot.params['id'];
		this.authService.getUser(this.id)
		.subscribe(
				(data) => this.user = data,
				(error) => console.log(error)
		);
	}

	constructor(private route: ActivatedRoute, private authService: AuthService){}

}