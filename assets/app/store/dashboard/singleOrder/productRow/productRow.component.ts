import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-productRow',
	templateUrl: './productRow.component.html',
	styleUrls: ['./productRow.component.css']
})

export class ProductRowComponent{
	@Input() product;

}