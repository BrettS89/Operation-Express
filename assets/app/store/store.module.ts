import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from '../app.routes';
import { StoreAppComponent } from './storeApp.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrderCardComponent } from './dashboard/orderCard/orderCard.component';
import { OrderCard2Component } from './dashboard/orderCard2/orderCard2.component';
import { SingleOrderComponent } from './dashboard/singleOrder/singleOrder.component';

@NgModule({
	declarations: [
		StoreAppComponent,
		DashboardComponent,
		OrderCardComponent,
		OrderCard2Component,
		SingleOrderComponent
	],
	imports: [
		CommonModule, routing
	]
})

export class StoreModule{

}