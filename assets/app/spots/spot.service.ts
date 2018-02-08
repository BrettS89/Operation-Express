import { Injectable } from '@angular/core';
import { Spot } from './spot.model';
import { Spot2 } from './spot.model2';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';
import { Comment } from '../comments/comment.model';

@Injectable()

export class SpotService {
	private spots: Spot[] = [];
	private spot: Spot[] = [];
	private citySpots: Spot[] = [];
	private comments: Comment[] = [];

	constructor(private http: Http){}


//Add a spot
	addSpot(spot: Spot2){
		// this.spots.push(spot);
		const body = JSON.stringify(spot);
		const headers = new Headers({'Content-Type': 'application/json'});
		const token = localStorage.getItem('token') 
				? '?token=' +localStorage.getItem('token')
				: '';
		return this.http.post('http://localhost:3000/spot/auth/post' + token, body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((error: Response) => Observable.throw(error.json()));
	}


//Get all spots
	getSpots() {
		return this.http.get('http://localhost:3000/spot')
		.map((response: Response) =>{
			const spots = response.json().obj;
			let transformedSpots: Spot[] = [];
			for (let spot of spots){
				transformedSpots.push(new Spot(
					spot._id,
					spot.name,
					spot.type,
					spot.address,
					spot.city,
					spot.searchCity,
					spot.state,
					spot.rating,
					spot.image,
					spot.description,
					spot.wifiRating,
					spot.wifiDescription,
					spot.vibeRating,
					spot.vibeDescription,
					spot.comfortRating,
					spot.comfortDescription,
					spot.foodAndBeverageRating,
					spot.foodAndBeverageDescription,
					spot.powerRating,
					spot.powerDescription,
					spot.user
					));
			};
			this.spots = transformedSpots;
			return transformedSpots;
		})
			.catch((error: Response) => Observable.throw(error.json()));;
	}


//Get one spot by Id
	getOneSpot(id: {_id: string}) {
		const body = JSON.stringify(id);
		console.log(body)
		const headers = new Headers({'Content-Type': 'application/json'});
		return this.http.post('http://localhost:3000/spot/one', body, {headers: headers})
		.map((response: Response) =>{
			const spot = response.json().spot;
			let transformedSpot: Spot[] = [];
				var thisSpot =
					{_id: spot._id,
					name: spot.name,
					type: spot.type,
					address: spot.address,
					city: spot.city,
					searchCity: spot.searchedCity,
					state: spot.state,
					rating: spot.rating,
					image: spot.image,
					description: spot.description,
					wifiRating: spot.wifiRating,
					wifiDescription: spot.wifiDescription,
					vibeRating: spot.vibeRating,
					vibeDescription: spot.vibeDescription,
					comfortRating: spot.comfortRating,
					comfortDescription: spot.comfortDescription,
					foodAndBeverageRating: spot.foodAndBeverageRating,
					foodAndBeverageDescription: spot.foodAndBeverageDescription,
					powerRating: spot.powerRating,
				    powerDescription: spot.powerDescription,
				    user: spot.user
			}
				console.log(thisSpot);
				transformedSpot.push(thisSpot);
				console.log(transformedSpot);
			this.spot = transformedSpot;
			return transformedSpot;
		})
			.catch((error: Response) => Observable.throw(error.json()));;

	}

//Get a spot by city	
	spotByCity(city: {city: string}) {
		const body = JSON.stringify(city);
		const headers = new Headers({'Content-Type': 'application/json'});
		return this.http.post('http://localhost:3000/spot/search', body, {headers: headers})
		.map((response: Response) =>{
			const spots = response.json().city;
			let transformedSpots: Spot[] = [];
			for (let spot of spots){
				transformedSpots.push(new Spot(
					spot._id,
					spot.name,
					spot.type,
					spot.address,
					spot.city,
					spot.searchCity,
					spot.state,
					spot.rating,
					spot.image,
					spot.description,
					spot.wifiRating,
					spot.wifiDescription,
					spot.vibeRating,
					spot.vibeDescription,
					spot.comfortRating,
					spot.comfortDescription,
					spot.foodAndBeverageRating,
					spot.foodAndBeverageDescription,
					spot.powerRating,
					spot.powerDescription,
					spot.user
					));
			};
			this.citySpots = transformedSpots;
			return transformedSpots;
		})
			.catch((error: Response) => Observable.throw(error.json()));;
	}


//Delete a spot
	deleteSpot(id: {_id: string}){
		const body = JSON.stringify(id);
		console.log(id);
		const token = localStorage.getItem('token') 
				? '?token=' +localStorage.getItem('token')
				: '';
		return this.http.delete('http://localhost:3000/spot/auth/delete/' + id._id + token) 
			.map((response: Response ) => response.json())
			.catch((error: Response) => Observable.throw(error.json()));
	}	


//Get lattitude and longitude of address from Google API 
	getCords(location: {address: string, city: string, state: string}){
		return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + location.address + location.city + location.state'&key=AIzaSyBEo1uy5x6d9koa5HlpElidXxADlWXxLl8')
		.map((response: Response ) => {
			const location = response.json();
			const cords = {
				cord: location.results[0];
			}
			console.log(cords)
			return cords;
			})
		.catch((error: Response) => Observable.throw(error.json()));
	}


//Post a comment
	postComment(comment: {content: string, 
						  firstName: string, 
						  lastName: string,
						  user: string,
						  spot: string}){
		const body = JSON.stringify(comment);
		console.log(body);
		const headers = new Headers({'Content-Type': 'application/json'});
		const token = localStorage.getItem('token') 
				? '?token=' +localStorage.getItem('token')
				: '';
		return this.http.post('http://localhost:3000/spot/auth/comment' + token, body, {headers: headers})
		.map((response: Response) => response.json())
		.catch((error: Response) => Observable.throw(error.json()));
	}


//Get comments
	getComments(id: string){
		return this.http.get('http://localhost:3000/spot/comments/' + id)
			.map((response: Response) => {
				const comments = response.json().comments;
				const transformedComments: Comment[] = [];
				for(let comment of comments){
					transformedComments.push(new Comment(
					comment.content,
					comment.firstName,
					comment.lastName,
					comment.user,
					comment.spot
					));
				};
				this.comments = transformedComments;
				return transformedComments;
			})
			.catch((error: Response) => Observable.throw(error.json()));
		}		
	}

}