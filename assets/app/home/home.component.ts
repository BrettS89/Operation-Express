import { Component, OnInit } from '@angular/core';
import { SpotService } from '../spots/spot.service';
import { Spot } from '../spots/spot.model';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit{
	spots: Spot[]

	constructor(private spotService: SpotService){}


	ngOnInit(){
		this.spotService.getSpots()
			.subscribe(
				(spots: Spot[]) => {
					this.spots = spots;
				}
				);
	}

}