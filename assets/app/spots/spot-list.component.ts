import { Component, Input, OnInit } from '@angular/core';
import { Spot } from './spot.model';
import { SpotService } from './spot.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-spot-list',
	templateUrl: './spot-list.component.html',
	styleUrls: ['./spot-list.component.css']
})

export class SpotListComponent implements OnInit{
	@Input() spot: Spot;
	rating = '';
	type: string;

	constructor(private spotService: SpotService,
				private router: Router){}
	
ngOnInit(){

		if(this.spot.rating === '5 stars'){
			this.rating = '<i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i>'
		}
		if(this.spot.rating === '4 stars'){
			this.rating = '<i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star-o" aria-hidden="true"></i>'
		}
		if(this.spot.rating === '3 stars'){
			this.rating = '<i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star-o" aria-hidden="true"></i><i class="fa fa-star-o" aria-hidden="true"></i>'
		}
		if(this.spot.rating === '2 stars'){
			this.rating = '<i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star-o" aria-hidden="true"></i><i class="fa fa-star-o" aria-hidden="true"></i><i class="fa fa-star-o" aria-hidden="true"></i>'
		}
		if(this.spot.rating === '1 star'){
			this.rating = '<i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star-o" aria-hidden="true"></i><i class="fa fa-star-o" aria-hidden="true"></i><i class="fa fa-star-o" aria-hidden="true"></i><i class="fa fa-star-o" aria-hidden="true"></i>'
		}

		this.type = this.spot.type.toUpperCase();

	}

onSelect2(){
	this.router.navigate(['/', 'spot', this.spot._id])
	} 

}