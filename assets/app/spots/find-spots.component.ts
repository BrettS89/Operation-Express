import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { SpotService } from '../spots/spot.service';
import { Spot } from '../spots/spot.model';
import { Router } from '@angular/router';

@Component({
	selector: 'app-find-spots',
	templateUrl: './find-spots.component.html',
	styleUrls: ['./find-spots.component.css']
})

export class FindSpotsComponent implements OnInit{
	spots: Spot[];
	city;

	constructor(private spotService: SpotService, private router: Router){}

	onSubmit(form: NgForm){
		this.city = form.value.city.toLowerCase().split(' ').join('');				
		form.resetForm();
		this.router.navigate(['/', 'search', this.city]);
	}

	ngOnInit(){
		this.spotService.getSpots()
			.subscribe(
				(spots: Spot[]) => {
					this.spots = spots;
				}
				);
	}

}
