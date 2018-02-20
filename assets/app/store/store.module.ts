import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from '../app.routes';
import { StoreAppComponent } from './storeApp.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrderCardComponent } from './dashboard/orderCard/orderCard.component';
import { OrderCard2Component } from './dashboard/orderCard2/orderCard2.component';

@NgModule({
	declarations: [
		StoreAppComponent,
		DashboardComponent,
		OrderCardComponent,
		OrderCard2Component
	],
	imports: [
		CommonModule, routing
	]
})

export class StoreModule{

}