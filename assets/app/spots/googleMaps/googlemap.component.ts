import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Spot } from '../../spots/spot.model';
import { SpotService } from '../../spots/spot.service';

@Component({
	selector: 'app-googlemap',
	templateUrl: './googlemap.component.html',
	styleUrls: ['./googlemap.component.css']
})

export class GoogleMapComponent implements OnInit{

	@Input() lat: number;
	@Input() lng: number;
	@Input() spot: Spot;
	title: string = 'My first AGM project';

	address;
	city;
	state;
	location;

	constructor(private spotService: SpotService){}

  ngOnInit(){

  }
}