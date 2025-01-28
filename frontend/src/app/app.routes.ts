import { Routes } from '@angular/router';
import { LandingPageComponent } from '../components/landing-page/landing-page.component';
import { LoginPageComponent } from '../components/login-page/login-page.component';
import { RecherchePageComponent } from '../components/recherche-page/recherche-page.component';
import { MenuDpiComponent } from  '../components/Dpi/menu-dpi/menu-dpi.component';
import { InfosDpiComponent } from '../components/Dpi/infos-dpi/infos-dpi.component';
import { ConsultationsDpiComponent } from '../components/Dpi/consultations-dpi/consultations-dpi.component';
import { SoinsDpiComponent } from '../components/Dpi/soins-dpi/soins-dpi.component';
import { ExamensDpiComponent } from '../components/Dpi/examens-dpi/examens-dpi.component';
export const routes: Routes = [
    { path: '', component: InfosDpiComponent },
        { path: 'infos-dpi', component: InfosDpiComponent },
        { path: 'consultations-dpi', component: ConsultationsDpiComponent },
        { path: 'soins-dpi', component: SoinsDpiComponent },
        { path: 'examens-dpi', component: ExamensDpiComponent},
       
    
  
   
];