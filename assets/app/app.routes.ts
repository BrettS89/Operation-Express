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
import { StoreAppComponent } from './store/storeApp.component';
import { DashboardComponent } from './store/dashboard/dashboard.component';
import { CreateStoreComponent } from './admin/createStore/createStore.component';
import { StoreAdminLoginComponent } from './auth/storeAuth/login/storeAdminLogin.component';
import { ConsumerOrdersComponent } from './consumer/orders/consumerOrders.component';
import { OneConsumerOrderComponent } from './consumer/orders/oneOrder/oneConsumerOrder.component';
import { SingleOrderComponent } from './store/dashboard/singleOrder/singleOrder.component';
import { AddProductComponent } from './store/addProduct/addProduct.component';


const APP_ROUTES: Routes = [
	{path: '', component: LandingComponent},
	{path: 'cart', component: ShoppingCartComponent},
	{path: 'myorders', component: ConsumerOrdersComponent},
	{path: 'myorders/:id', component: OneConsumerOrderComponent},
	{path: 'order/:id', component: PlaceOrderComponent},
	{path: 'confirmed/:id', component: OrderConfirmationComponent},
	{path: 'stores', component: ConsumerAppComponent, children: [
		{path: 'find', component: FindStoresComponent},
		{path: ':id', component: StoreFrontComponent}
	]},
	{path: 'user/signup', component: UserSignupComponent},
	{path: 'user/login', component: UserLoginComponent},
	{path: 'store', component: StoreAppComponent, children: [
		{path: 'dashboard/:id', component: DashboardComponent},
		{path: 'dashboard/order/:id', component: SingleOrderComponent},
		{path: 'login', component: StoreAdminLoginComponent},
		{path: 'addproduct', component: AddProductComponent}
	]},
	{path: 'create', component: CreateStoreComponent}
];

export const routing = RouterModule.forRoot(APP_ROUTES);