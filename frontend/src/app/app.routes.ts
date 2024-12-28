import { Routes } from '@angular/router';
import { LandingPageComponent } from '../components/landing-page/landing-page.component';
import { LoginPageComponent } from '../components/login-page/login-page.component';
import { RecherchePageComponent } from '../components/recherche-page/recherche-page.component';
import { CreatePatientComponent } from '../components/create-patient/create-patient.component';

import { MenuDpiComponent } from  '../components/menu-dpi/menu-dpi.component';
import { InfosDpiComponent } from '../components/infos-dpi/infos-dpi.component';
import { ConsultationsDpiComponent } from '../components/consultations-dpi/consultations-dpi.component';
import { SoinsDpiComponent } from '../components/soins-dpi/soins-dpi.component';
import { ExamensDpiComponent } from '../components/examens-dpi/examens-dpi.component';
import { DpiPageComponent } from '../components/dpi-page/dpi-page.component';



export const routes: Routes = [
    { path: '', component: LandingPageComponent },
    { path: 'login', component: LoginPageComponent },
    {path: 'recherche', component: RecherchePageComponent},
    {path: 'create-patient', component: CreatePatientComponent},
    { path: 'dpi/:dpiId',
      component: DpiPageComponent,
      children: [
          { path: '', redirectTo: 'infos-dpi', pathMatch: 'full' },
          { path: 'infos-dpi', component: InfosDpiComponent },
          { path: 'consultations-dpi', component: ConsultationsDpiComponent },
          { path: 'soins-dpi', component: SoinsDpiComponent },
          { path: 'examens-dpi', component: ExamensDpiComponent},  
      ],
    },
];