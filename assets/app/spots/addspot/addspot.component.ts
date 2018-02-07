import { Component } from '@angular/core';
import { SpotService } from '../spot.service';
import { Spot2 } from '../spot.model2';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'app-addspot',
	templateUrl: './addspot.component.html',
	styleUrls: ['./addspot.component.css']
})

export class AddspotComponent{
	spot: Spot2;

	constructor(private spotService: SpotService){}	

	onSubmit(form: NgForm){
		const spot = new Spot2(
			form.value.name,
			form.value.type,
			form.value.address,
			form.value.city,
			form.value.state,
			form.value.rating,
			form.value.image,
			form.value.description,
			form.value.wifiRating,
			form.value.wifiDescription,
			form.value.vibeRating,
			form.value.vibeDescription,
			form.value.comfortRating,
			form.value.comfortDescription,
			form.value.foodAndBeverageRating,
			form.value.foodAndBeverageDescription,
			form.value.powerRating,
			form.value.powerDescription
			);
		this.spotService.addSpot(spot)
			.subscribe(
					data => console.log(data),
					error => console.error(error),
				);
		form.resetForm();
	}

}