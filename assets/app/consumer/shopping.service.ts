import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { Store } from './store.model';
import { Order } from '../store/order.model';

@Injectable()

export class ShoppingService{
	headers = new Headers({'Content-Type': 'application/json'});
	token = localStorage.getItem('token') 
				? '?token=' +localStorage.getItem('token')
				: '';
	private subject = new Subject<any>();

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
						store.zip,
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
						data.zip,
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
	addToCart(cart: any){
		const body = JSON.stringify(cart);
		return this.http.post('http://localhost:3000/store/auth/addtocart' + this.token, body, {headers: this.headers})
		  .map((response: Response) => {
		  	const res = response.json();
		  	this.subject.next(res);
		  })
		  .catch((error: Response) => Observable.throw(error.json()));
	}


//Get shopping cart to place order
	getCart(id: string){
		return this.http.get('http://localhost:3000/store/auth/getcart/' + id + this.token)
		  .map((response: Response) => {
		  	const data = response.json().cart;
		  	return data;
		  })
		  .catch((error: Response) => Observable.throw(error.json()));
	}


//Get number of items in cart
	getCartItemCount(id: string){
		return this.http.get('http://localhost:3000/store/auth/itemcount/' + id + this.token)
		  .map((response: Response) => response.json())
		  .catch((error: Response) => Observable.throw(error.json()));
	}	


//Get count in header
	getCount(): Observable<any> {
        return this.subject.asObservable();
    }


//Place order
	placeOrder(order: Order){
		const body = JSON.stringify(order);
		return this.http.post('http://localhost:3000/store/auth/placeorder/' + order.cart + this.token, body, {headers: this.headers})
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
		return this.http.post('http://localhost:3000/store/arrived', body, {headers: this.headers})
		  .map((response: Response) => response.json())
		  .catch((error: Response) => Observable.throw(error.json()));
	}


//Set completedPurchase as true
	completedPurchase(id: string){
		const body = JSON.stringify({id: id});
		return this.http.post('http://localhost:3000/store/auth/completed' + this.token, body, {headers: this.headers})
		  .map((response: Response) => response.json())
		  .catch((error: Response) => Observable.throw(error.json()));
	}	


//Remove one item from shopping cart
	removeCartItem(data: {user: string, item: string}){
		const body = JSON.stringify(data);
		return this.http.post('http://localhost:3000/store/auth/removefromcart' + this.token, body, {headers: this.headers})
		  .map((response: Response) => response.json())
		  .catch((error: Response) => Observable.throw(error.json()));
	}	


//
	sendZip(data: {zip: string}){
		const body = JSON.stringify(data);
		return this.http.post('http://localhost:3000/store/zip', body, {headers: this.headers})
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
						store.zip,
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

}