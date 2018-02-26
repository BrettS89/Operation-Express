import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';
import { Product } from './product.model';
import { Store } from '../consumer/store.model';

@Injectable()

export class StoreService{
	headers = new Headers({'Content-Type': 'application/json'});
	token = localStorage.getItem('token') 
				? '?token=' +localStorage.getItem('token')
				: '';

	constructor(private http: Http){}


//Add a new store
	addStore(store: {name: string, type: string, address: string, city: string, state: string, image: string}){
		const body = JSON.stringify(store);
		return this.http.post('http://localhost:3000/store/new', body, {headers: this.headers})
		  .map((response: Response) => response.json())
		  .catch((error: Response) => Observable.throw(error.json()));
	}


//Add a new product
	addProduct(product: Product){
		const body = JSON.stringify(product);
		return this.http.post('http://localhost:3000/store/auth/product/new' + this.token, body, {headers: this.headers})
		  .map((response: Response) => response.json())
		  .catch((error: Response) => Observable.throw(error.json()));
	}


//Get store by Id
	getStore(id: string){
		return this.http.get('http://localhost:3000/store/auth/adminone/' + id + this.token)
			.map((response: Response) => {
				const data = response.json().store;
				const store = new Store(
						data._id,
						data.name,
						data.type,
						data.address,
						data.city,
						data.state,
						data.image,
						data.products,
						data.orders,
						data.createdDate
					);
				return store;
			})
			.catch((error: Response) => Observable.throw(error.json()));
	}
	
}