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

import { AppComponent } from "./app.component";
import { HeaderComponent } from './header/header.component';
import { LandingComponent } from './landing/landing.component';
import { ShoppingCartComponent } from './consumer/shoppingCart/shoppingCart.component';
import { CartItemComponent } from './consumer/shoppingCart/cartItem/cartItem.component';
import { PlaceOrderComponent } from './consumer/placeOrder/placeOrder.component';
import { OrderConfirmationComponent } from './consumer/placeOrder/orderConfirmation/orderConfirmation.component';
import { UserSignupComponent } from './auth/consumerAuth/singup/userSignup.component';
import { UserLoginComponent } from './auth/consumerAuth/login/userLogin.component';

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
    UserLoginComponent 
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
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {

}