import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';
import { Product } from './product.model';
import { Store } from '../consumer/store.model';

@Injectable()

export class StoreService{

	constructor(private http: Http){}


//Add a new store
	addStore(store: {name: string, type: string, address: string, city: string, state: string, image: string}){
		const body = JSON.stringify(store);
		const headers = new Headers({'Content-Type': 'application/json'});
		return this.http.post('http://localhost:3000/store/new', body, {headers: headers})
		  .map((response: Response) => response.json())
		  .catch((error: Response) => Observable.throw(error.json()));
	}


//Save a new product
	addProduct(product: Product){
		const body = JSON.stringify(product);
		const headers = new Headers({'Content-Type': 'application/json'});
		return this.http.post('http://localhost:3000/store/product/new', body, {headers: headers})
		  .map((response: Response) => response.json())
		  .catch((error: Response) => Observable.throw(error.json()));
	}


//Get store by Id
	getStore(id: string){
		return this.http.get('http://localhost:3000/store/adminone/' + id)
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