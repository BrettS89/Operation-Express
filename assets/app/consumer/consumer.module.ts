import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from '../app.routes';

import { ConsumerAppComponent } from './consumer.app.component';
import { FindStoresComponent } from './findStores/findStores.component';
import { StoreCardComponent } from './storeCard/store-card.component';
import { StoreFrontComponent } from './storeFront/storeFront.component';
import { ProductCardComponent } from './storeFront/productCard/productCard.component';


@NgModule({
	declarations: [
		ConsumerAppComponent,
		FindStoresComponent,
		StoreCardComponent,
		StoreFrontComponent,
		ProductCardComponent,
	],
	imports: [
		CommonModule, routing
	]
})

export class ConsumerModule{

}