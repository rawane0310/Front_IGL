import { Routes } from '@angular/router';
import { LandingPageComponent } from '../components/landing-page/landing-page.component';
import { LoginPageComponent } from '../components/login-page/login-page.component';
import { RecherchePageComponent } from '../components/recherche-page/recherche-page.component';
import { CreatePatientComponent } from '../components/create-patient/create-patient.component';

export const routes: Routes = [
    { path: '', component: LandingPageComponent },
    { path: 'login', component: LoginPageComponent },
    {path: 'recherche', component: RecherchePageComponent},
    {path: 'create-patient', component: CreatePatientComponent}
];