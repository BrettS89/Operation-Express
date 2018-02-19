import { Injectable } from '@angular/core';
import { StoreAdmin } from './storeadmin.model';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

@Injectable()

export class StoreAuthService{

	constructor(private http: Http){}


//Store admin login
	login(user: StoreAdmin){
		const body = JSON.stringify(user);
		const headers = new Headers({'Content-Type': 'application/json'});
		return this.http.post('http://localhost:3000/auth/storeadminlogin', body, {headers: headers})
		.map((response: Response ) => response.json())
		.catch((error: Response) => Observable.throw(error.json()));
	}


//Check if a store admin is logged in
	isLoggedIn(){
		return localStorage.getItem('storeId') !== null;
	}

}