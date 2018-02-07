import { Injectable } from '@angular/core';
import { Http, Headers, Response, Jsonp } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';
import { User } from './user.model';

@Injectable()
export class AuthService{
	
	
	signUp(user: User){
		const body = JSON.stringify(user);
		const headers = new Headers({'Content-Type': 'application/json'})
		console.log(body)
		return this.http.post('http://localhost:3000/user', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((error: Response) => Observable.throw(error.json()));
	}

	signIn(user: User){
		const body = JSON.stringify(user);
		const headers = new Headers({'Content-Type': 'application/json'})
		return this.http.post('http://localhost:3000/user/signin', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((error: Response) => Observable.throw(error.json()));
	}

	logOut(){
		localStorage.clear();
	}

	isLoggedIn(){
		return localStorage.getItem('token') !== null;
	}


	mailChimp(subscriber: {firstName: string, lastName: string, email: string, status: string}){
		const body = JSON.stringify(subscriber);
		const headers = new Headers({'Content-Type': 'application/json'});
		return this.http.post('http://localhost:3000/user/mailchimp', body, {headers: headers})
		.map((response: Response) => response.json())
		.catch((error: Response) => Observable.throw(error.json()));
	}



	constructor(private http: Http){}
}