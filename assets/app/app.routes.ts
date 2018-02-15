import { Routes, RouterModule } from '@angular/router';
import { ConsumerAppComponent } from './consumer/consumer.app.component';
import { LandingComponent } from './landing/landing.component';
import { FindStoresComponent } from './consumer/findStores/findStores.component';
import { StoreCardComponent } from './consumer/storeCard/store-card.component';
import { StoreFrontComponent } from './consumer/storeFront/storeFront.component';
import { ShoppingCartComponent } from './consumer/shoppingCart/shoppingCart.component';
import { PlaceOrderComponent } from './consumer/placeOrder/placeOrder.component';
import { OrderConfirmationComponent } from './consumer/placeOrder/orderConfirmation/orderConfirmation.component';
import { UserSignupComponent } from './auth/consumerAuth/singup/userSignup.component';
import { UserLoginComponent } from './auth/consumerAuth/login/userLogin.component';

const APP_ROUTES: Routes = [
	{path: '', component: LandingComponent},
	{path: 'cart', component: ShoppingCartComponent},
	{path: 'order', component: PlaceOrderComponent},
	{path: 'confirmed', component: OrderConfirmationComponent},
	{path: 'stores', component: ConsumerAppComponent, children: [
		{path: 'find', component: FindStoresComponent},
		{path: ':id', component: StoreFrontComponent}
	]},
	{path: 'user/signup', component: UserSignupComponent},
	{path: 'user/login', component: UserLoginComponent}
];

export const routing = RouterModule.forRoot(APP_ROUTES);