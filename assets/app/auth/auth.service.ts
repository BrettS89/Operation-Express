import { Injectable } from '@angular/core';
import { Http, Headers, Response, Jsonp } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';
import { User } from './user.model';

@Injectable()
export class AuthService{


//Sign up function		
	signUp(user: User){
		const body = JSON.stringify(user);
		const headers = new Headers({'Content-Type': 'application/json'})
		console.log(body)
		return this.http.post('http://localhost:3000/user', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((error: Response) => Observable.throw(error.json()));
	}


//Sign in function
	signIn(user: User){
		const body = JSON.stringify(user);
		const headers = new Headers({'Content-Type': 'application/json'})
		return this.http.post('http://localhost:3000/user/signin', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((error: Response) => Observable.throw(error.json()));
	}


//Log out funciton
	logOut(){
		localStorage.clear();
	}


//Logic for checking if user is logged in
	isLoggedIn(){
		return localStorage.getItem('token') !== null;
	}


//Get user by Id
	getUser(id: string){
		return this.http.get('http://localhost:3000/user/getuser/' + id)
		.map(
			(response: Response) => {
				const data = response.json().theUser;
				const newData = {
					firstName: data.firstName,
					lastName: data.lastName,
					spots: data.spots,
				};
				return newData;
			}
			);
	}


//Send new user data to back end to send to Mailchimp list
	mailChimp(subscriber: {firstName: string, lastName: string, email: string, status: string}){
		const body = JSON.stringify(subscriber);
		const headers = new Headers({'Content-Type': 'application/json'});
		return this.http.post('http://localhost:3000/user/mailchimp', body, {headers: headers})
		.map((response: Response) => response.json())
		.catch((error: Response) => Observable.throw(error.json()));
	}



	constructor(private http: Http){}
}