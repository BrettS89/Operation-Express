import { Injectable } from '@angular/core';
import { StoreAdmin } from './storeadmin.model';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

@Injectable()

export class StoreAuthService{
	headers = new Headers({'Content-Type': 'application/json'});
	token = localStorage.getItem('token') 
				? '?token=' +localStorage.getItem('token')
				: '';

	constructor(private http: Http){}


//Store admin login
	login(user: StoreAdmin){
		const body = JSON.stringify(user);
		const headers = new Headers({'Content-Type': 'application/json'});
		return this.http.post('http://localhost:3000/auth/storeadminlogin', body, {headers: headers})
		.map((response: Response ) => response.json())
		.catch((error: Response) => Observable.throw(error.json()));
	}


//Employee login
	employeeLogin(data: {userName: string, password: string}){
		const body = JSON.stringify(data);
		return this.http.post('http://localhost:3000/auth/employee/login', body, {headers: this.headers})
		  .map((response: Response) => response.json())
		  .catch((error: Response) => Observable.throw(error.json()));
	}	


//Create Employee
	createUser(employee: {userName: string, password: string, store: string}){
		const body = JSON.stringify(employee);
		return this.http.post('http://localhost:3000/auth/employee' + this.token, body, {headers: this.headers})
		  .map((response: Response) => response.json())
		  .catch((error: Response) => Observable.throw(error.json()));
	}	


//Check if a store admin is logged in
	isAdmin(){
		return localStorage.getItem('isAdmin') !== null;
	}


//Check if store User
	isStore(){
		return localStorage.getItem('storeId') !== null;
	}	

}