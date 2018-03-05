import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing } from './app.routes';
import { HttpModule, Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { ConsumerModule } from './consumer/consumer.module';
import { StoreModule} from './store/store.module';

import { ConsumerAuthService } from './auth/consumerAuth/consumerAuth.service';
import { StoreService } from './store/store.service';
import { ShoppingService } from './consumer/shopping.service';
import { StoreAuthService } from './auth/storeAuth/storeAuth.service';

import { AppComponent } from "./app.component";
import { HeaderComponent } from './header/header.component';
import { LandingComponent } from './landing/landing.component';
import { ShoppingCartComponent } from './consumer/shoppingCart/shoppingCart.component';
import { CartItemComponent } from './consumer/shoppingCart/cartItem/cartItem.component';
import { PlaceOrderComponent } from './consumer/placeOrder/placeOrder.component';
import { OrderConfirmationComponent } from './consumer/placeOrder/orderConfirmation/orderConfirmation.component';
import { UserSignupComponent } from './auth/consumerAuth/singup/userSignup.component';
import { UserLoginComponent } from './auth/consumerAuth/login/userLogin.component';
import { CreateStoreComponent } from './admin/createStore/createStore.component';
import { StoreAdminLoginComponent } from './auth/storeAuth/login/storeAdminLogin.component';
import { CreateEmployeeComponent } from './auth/storeAuth/createEmployee/createEmployee.component';

@NgModule({
    declarations: [
    AppComponent,
    HeaderComponent,
    LandingComponent,
    ShoppingCartComponent,
    CartItemComponent,
    PlaceOrderComponent,
    OrderConfirmationComponent,
    UserSignupComponent,
    UserLoginComponent,
    CreateStoreComponent,
    StoreAdminLoginComponent,
    CreateEmployeeComponent
    ],
    imports: [
	    BrowserModule, 
	    HttpModule, 
	    FormsModule, 
	    ReactiveFormsModule, 
	    ConsumerModule,
	    StoreModule,
        routing
    ],
    providers: [ConsumerAuthService, StoreService, ShoppingService, StoreAuthService],
    bootstrap: [AppComponent]
})
export class AppModule {

}