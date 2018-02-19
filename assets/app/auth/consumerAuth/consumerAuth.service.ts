import { Injectable } from '@angular/core';
import { User } from './consumer.model';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

@Injectable()

export class ConsumerAuthService{

	constructor(private http: Http){}

//New user signup
	signUp(user: User){
		const body = JSON.stringify(user);
		const headers = new Headers({'Content-Type': 'application/json'})
		  return this.http.post('http://localhost:3000/auth/signup', body, {headers: headers})
		  .map((response: Response) => response.json())
		  .catch((error: Response) => Observable.throw(error.json())); 
	}


//User Login
	login(user: {email: string, password: string}){
		const body = JSON.stringify(user);
		const headers = new Headers({'Content-Type': 'application/json'});
		return this.http.post('http://localhost:3000/auth/login', body, {headers: headers})
		.map((response: Response ) => response.json())
		.catch((error: Response) => Observable.throw(error.json()));
	}


//Check if the user is logged in
	isLoggedIn(){
		return localStorage.getItem('token') !== null;
	}


//Log the user out
	logout(){
		localStorage.clear();
	}	

}