import { Component, Input, OnInit, AfterViewChecked } from '@angular/core';
import { Spot } from './spot.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { SpotService } from './spot.service';
import { Location } from '@angular/common';


@Component({
	selector: 'app-spot',
	templateUrl: './spot.component.html',
	styleUrls: ['./spot.component.css']
})

export class SpotComponent implements OnInit{
	spots: Spot[];
	id: {_id: string};


	ngOnInit(){
		this.id = {
			_id: this.route.snapshot.params['_id']};

		this.spotService.getOneSpot(this.id)
			.subscribe(
				(spot: Spot[]) => {
					this.spots = spot;
				}
				);

			console.log(this.spots)
			window.scrollTo(0, 0)
	}

		constructor(private route: ActivatedRoute,
					private spotService: SpotService,
					private location: Location){}


}