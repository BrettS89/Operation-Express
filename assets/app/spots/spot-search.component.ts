import { Component, Input, OnInit, AfterViewChecked } from '@angular/core';
import { Spot } from './spot.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { SpotService } from './spot.service';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';

@Component({
	selector: 'app-spot-search',
	templateUrl: './spot-search.component.html',
	styleUrls: ['./spot-search.component.css']
})

export class SpotSearchComponent implements OnInit{
	spots: Spot[];
	city: {city: string};
	citySearch;

	onSubmit(form: NgForm){
		this.citySearch = form.value.city;				
		form.resetForm();
		this.router.navigate(['/', 'search', this.citySearch]);
		window.location.reload();
	}

	ngOnInit(){
		this.city = {
			city: this.route.snapshot.params['city']};

		this.route.params
			.subscribe(
				(params: Params) => {
					this.city.city = params['city'];
				}
				);	

		this.spotService.spotByCity(this.city)
			.subscribe(
				(spots: Spot[]) => {
					this.spots = spots;
				}
				);	


	}


	constructor(private route: ActivatedRoute,
				private spotService: SpotService,
				private location: Location,
				private router: Router){}


}