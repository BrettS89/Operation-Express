import { Component, Input } from '@angular/core';


@Component({
	selector: 'app-orderCard2',
	templateUrl: './orderCard2.component.html',
	styleUrls: ['./orderCard2.component.css']
})

export class OrderCard2Component{
	@Input() order;

}