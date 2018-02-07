import { Component, Input, OnInit, AfterViewChecked } from '@angular/core';
import { Spot } from './spot.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { SpotService } from './spot.service';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Comment } from '../comments/comment.model'; 


@Component({
	selector: 'app-show-spot2',
	templateUrl: './2show-spot.component.html',
	styleUrls: ['./2show-spot.component.css']
})

export class ShowSpot2Component implements OnInit{
	@Input() spt: Spot;
	id: {_id: string};
	address: string;
	city: string;
	state: string;
	location: {address: string, city: string, state: string};
	formattedAddress: string;
	lattitude: number;
	longitude: number;
	comments: Comment[] = [];

	constructor(private spotService: SpotService,
				private router: Router,
				private route: ActivatedRoute){}

	fiveStars;
	fourStars;
	threeStars;
	twoStars;
	oneStar;

	rating;
	wifiRating;
	vibeRating;
	comfortRating;
	foodAndBeverageRating;
	powerRating;

	starsFive = '<i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i>';
	starsFour = '<i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star-o" aria-hidden="true"></i>';
	starsThree = '<i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star-o" aria-hidden="true"></i><i class="fa fa-star-o" aria-hidden="true"></i>';
	starsTwo = '<i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star-o" aria-hidden="true"></i><i class="fa fa-star-o" aria-hidden="true"></i><i class="fa fa-star-o" aria-hidden="true"></i>';
	starsOne = '<i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star-o" aria-hidden="true"></i><i class="fa fa-star-o" aria-hidden="true"></i><i class="fa fa-star-o" aria-hidden="true"></i><i class="fa fa-star-o" aria-hidden="true"></i>';

		ngOnInit(){
			this.fiveStars = '5 stars';
			this.fourStars = '4 stars';
			this.threeStars = '3 stars';
			this.twoStars = '2 stars';
			this.oneStar = '1 star';

			this.rating = this.spt.rating;
			this.wifiRating = this.spt.wifiRating;
			this.vibeRating = this.spt.vibeRating;
			this.comfortRating = this.spt.comfortRating;
			this.foodAndBeverageRating = this.spt.foodAndBeverageRating;
			this.powerRating = this.spt.powerRating;

			this.id = {
			_id: this.spt._id};

			this.address = this.spt.address.split(' ').join('+');
			this.city = this.spt.city.split(' ').join('+');
			this.state = this.spt.state;

			this.location = {address: this.address, city: this.city, state: this.state};

			this.spotService.getCords(this.location)
			.subscribe(
				(cord) => {
					this.formattedAddress = cord.cord.formatted_address;
					this.lattitude = cord.cord.geometry.location.lat;
					this.longitude = cord.cord.geometry.location.lng;
					console.log(cord);
				}
				);
			this.spotService.getComments(this.spt._id)
			.subscribe(
				(comments: Comment[]) => {
					this.comments = comments;
					this.comments.reverse();
				}

				);

		}
		belongsToUser(){
		return localStorage.getItem('userId') == this.spt.user;
	}

		onDelete(){
			this.spotService.deleteSpot(this.id)
			.subscribe(
				result => console.log(result)
				);
			this.router.navigate(['/']);
		}

		onSubmit(form: NgForm){
			const comment = new Comment(
					form.value.content,
					localStorage.getItem('firstName'),
					localStorage.getItem('lastName'),
					localStorage.getItem('userId'),
					this.spt._id
				);
			this.spotService.postComment(comment)
			.subscribe(
				result => console.log(result)
				);
			this.comments.unshift(comment);
		}

	}

