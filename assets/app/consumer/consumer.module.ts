import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from '../app.routes';

import { ConsumerAppComponent } from './consumer.app.component';
import { FindStoresComponent } from './findStores/findStores.component';
import { StoreCardComponent } from './storeCard/store-card.component';
import { StoreFrontComponent } from './storeFront/storeFront.component';
import { ProductCardComponent } from './storeFront/productCard/productCard.component';
import { ConsumerOrdersComponent } from './orders/consumerOrders.component';
import { ConsumerOrdersTableComponent } from './orders/orderTable/consumerOrdersTable.component';
import { OneConsumerOrderComponent } from './orders/oneOrder/oneConsumerOrder.component';


@NgModule({
	declarations: [
		ConsumerAppComponent,
		FindStoresComponent,
		StoreCardComponent,
		StoreFrontComponent,
		ProductCardComponent,
		ConsumerOrdersComponent,
		ConsumerOrdersTableComponent,
		OneConsumerOrderComponent
	],
	imports: [
		CommonModule, routing, FormsModule
	]
})

export class ConsumerModule{

}