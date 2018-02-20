import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-orderCard',
	templateUrl: './orderCard.component.html',
	styleUrls: ['./orderCard.component.css']
})

export class OrderCardComponent{
	@Input() order;
	
}