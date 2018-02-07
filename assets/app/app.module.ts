import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing } from './app.routes';
import { HttpModule, Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from "./app.component";
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { SpotListComponent } from './spots/spot-list.component';
import { SignupComponent } from './auth/signup.component';
import { LoginComponent } from './auth/login.component';
import { AddspotComponent } from './spots/addspot/addspot.component';
import { FindSpotsComponent } from './spots/find-spots.component';
import { LogoutComponent } from './auth/logout.component';
import { ShowSpot2Component } from './spots/2show-spot.component';
import { SpotComponent } from './spots/spot.component';
import { SpotSearchComponent } from './spots/spot-search.component';
import { GoogleMapComponent } from './spots/googleMaps/googlemap.component';
import { CommentComponent } from './comments/comment.component';
import { SpotService } from './spots/spot.service';
import { AuthService } from './auth/auth.service';


@NgModule({
    declarations: [
    AppComponent, 
    HomeComponent, 
    HeaderComponent,
    SpotListComponent,
    SignupComponent,
    LoginComponent,
    AddspotComponent,
    FindSpotsComponent,
    LogoutComponent,
    ShowSpot2Component,
    SpotComponent,
    SpotSearchComponent,
    GoogleMapComponent,
    CommentComponent],
    imports: [BrowserModule, routing, HttpModule, FormsModule, ReactiveFormsModule, AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC1ogXtwbPYhPXi7XPeKoOlxhq4P_b2El4'
    })],
    providers: [SpotService, AuthService],
    bootstrap: [AppComponent]
})
export class AppModule {

}