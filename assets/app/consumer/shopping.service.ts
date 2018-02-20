import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';
import { Store } from './store.model';
import { Order } from '../store/order.model';

@Injectable()

export class ShoppingService{
	cartNum: number = 0;

	constructor(private http: Http){}

//Get Stores
	getStores(){
		return this.http.get('http://localhost:3000/store/get')
			.map((response: Response) => {
				const res = response.json().stores;
				let stores: Store[] = [];
				for(let store of res){
					stores.push(new Store(
						store._id,
						store.name,
						store.type,
						store.address,
						store.city,
						store.state,
						store.image,
						store.products,
						store.orders,
						store.createdDate
						));
				}
				return stores; 
			})
			.catch((error: Response) => Observable.throw(error.json()));
	}


//Get Store by Id
	getStore(id: string){
		return this.http.get('http://localhost:3000/store/one/' + id)
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


//Save item to shopping cart
	addToCart(cart: {id: string, product: string, store: string}){
		const body = JSON.stringify(cart);
		const headers = new Headers({'Content-Type': 'application/json'});
		this.cartNum++;
		console.log(this.cartNum);
		const token = localStorage.getItem('token') 
				? '?token=' +localStorage.getItem('token')
				: '';
		return this.http.post('http://localhost:3000/store/auth/addtocart' + token, body, {headers: headers})
		  .map((response: Response) => response.json())
		  .catch((error: Response) => Observable.throw(error.json()));
	}	


//Get shopping cart to place order
	getCart(id: string){
		return this.http.get('http://localhost:3000/store/getcart/' + id)
		  .map((response: Response) => {
		  	const data = response.json().cart;
		  	console.log(data);
		  	return data;
		  })
		  .catch((error: Response) => Observable.throw(error.json()));
	}


//Place order
	placeOrder(order: Order){
		const body = JSON.stringify(order);
		console.log(body);
		const headers = new Headers({'Content-Type': 'application/json'});
		return this.http.post('http://localhost:3000/store/placeorder/' + order.cart, body, {headers: headers})
		  .map((response: Response) => response.json())
		  .catch((error: Response) => Observable.throw(error.json()));
	}


//Get order by Id
	getOrder(id: string){
		return this.http.get('http://localhost:3000/store/getorder/' + id)
		  .map((response: Response) => {
		  	const order = response.json().order;
		  	return order;
		  })
		  .catch((error: Response) => Observable.throw(error.json()));
	}


//Get orders by user Id
	getOrders(id: string){
		return this.http.get('http://localhost:3000/store/userorders/' + id)
		  .map((response: Response) => response.json())
		  .catch((error: Response) => Observable.throw(error.json()));
	}		


//Set order as arrived
	arrived(id: string){
		const body = JSON.stringify({id: id});
		const headers = new Headers({'Content-Type': 'application/json'});
		return this.http.post('http://localhost:3000/store/arrived', body, {headers: headers})
		  .map((response: Response) => response.json())
		  .catch((error: Response) => Observable.throw(error.json()));
	}

}