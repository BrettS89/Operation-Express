import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './auth/signup.component';
import { LoginComponent } from './auth/login.component';
import { AddspotComponent } from './spots/addspot/addspot.component';
import { FindSpotsComponent } from './spots/find-spots.component';
import { ShowSpot2Component } from './spots/2show-spot.component';
import { SpotComponent } from './spots/spot.component';
import { SpotSearchComponent } from './spots/spot-search.component';
import { UserProfileComponent } from './user/user-profile.component';


const APP_ROUTES: Routes = [

	{path: '', component: HomeComponent},
	{path: 'signup', component: SignupComponent},
	{path: 'login', component: LoginComponent},
	{path: 'addspot', component: AddspotComponent},
	{path: 'spot/:_id', component: SpotComponent},
	{path: 'search/:city', component: SpotSearchComponent},
	{path: 'findspots', component: FindSpotsComponent},
	{path: 'user/:id', component: UserProfileComponent} 

];

export const routing = RouterModule.forRoot(APP_ROUTES);