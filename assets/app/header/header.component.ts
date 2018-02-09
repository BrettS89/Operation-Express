import { Component, OnInit, OnChanges } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
 
@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnChanges{
	firstName: string;
	id: string;

	constructor(private authService: AuthService, private router: Router){}

	ngOnInit(){
		this.firstName = localStorage.getItem('firstName');
		this.id = localStorage.getItem('userId');
	}

	ngOnChanges(){
		this.ngOnInit();
	}

	onClick(){
		this.authService.logOut();
		this.router.navigate(['/']);
	}

	isLoggedIn(){
		return this.authService.isLoggedIn();
	}

	goToProfile(){
		this.router.navigate(['/', 'user', localStorage.getItem('userId')]);
	}

}