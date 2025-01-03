import { Routes } from '@angular/router';
import { LandingPageComponent } from '../components/landing-page/landing-page.component';
import { LoginPageComponent } from '../components/login-page/login-page.component';
import { RecherchePageComponent } from '../components/recherche-page/recherche-page.component';
import { CreatePatientComponent } from '../components/create-patient/create-patient.component';
import { MenuDpiComponent } from '../components/menu-dpi/menu-dpi.component';

import { InfosDpiComponent } from '../components/infos-dpi/infos-dpi.component';
import { ConsultationsDpiComponent } from '../components/consultations-dpi/consultations-dpi.component';
import { SoinsDpiComponent } from '../components/soins-dpi/soins-dpi.component';
import { DpiPageComponent } from '../components/dpi-page/dpi-page.component';
import { ExamensRadiologiquesComponent } from '../components/examens-radiologiques/examens-radiologiques.component';
import { AnalysesBiologiquesComponent } from '../components/analyses-biologiques/analyses-biologiques.component';

import { AuthGuard } from './../guards/auth-guard';
import { AlreadyAuthGuard } from './../guards/already-auth.guard';
import { CreatePatientGuard } from '../guards/create-patient-guard';
import { RechercheDossierGuard } from '../guards/recherche-patient-guard';
import { dpiAnalyseBiologiqueGuard } from '../guards/dpi.analyse-biologique.guard';
import { dpiExamenRadiologiqueGuard } from '../guards/dpi.examen-radiologique.guard';
import { dpiSoinInfermierGuard } from '../guards/dpi.soin-infermier.guard';
import { dpiConsultationGuard } from '../guards/dpi.consultation.guard';
import { dpiPatientGuard } from '../guards/dpi.patient.guard';

export const routes: Routes = [
  { path: '', component: LandingPageComponent, canActivate:[AlreadyAuthGuard] },
  { path: 'login', component: LoginPageComponent, canActivate: [AlreadyAuthGuard] },
  { path: 'recherche', component: RecherchePageComponent, canActivate: [AuthGuard, RechercheDossierGuard] },
  { path: 'create-patient', component: CreatePatientComponent, canActivate: [AuthGuard, CreatePatientGuard] },
  { path: 'dpi/:dpiId',
    component: DpiPageComponent,
    children: [
        { path: '', redirectTo: 'infos-dpi', pathMatch: 'full' },

        { path: 'infos-dpi', 
          component: InfosDpiComponent },

        { path: 'consultations-dpi', 
          component: ConsultationsDpiComponent,
          canActivate: [dpiConsultationGuard]
        },

        { path: 'soins-dpi', 
          component: SoinsDpiComponent,
          canActivate: [dpiSoinInfermierGuard]
        },

        { path: 'examens-radiologiques-dpi', 
          component: ExamensRadiologiquesComponent, 
          canActivate: [dpiExamenRadiologiqueGuard] 
        },

        { path: 'analyses-biologiques-dpi',
          component: AnalysesBiologiquesComponent, 
          canActivate: [dpiAnalyseBiologiqueGuard] 
        }  
    ],
    canActivate: [AuthGuard, dpiPatientGuard]
  },
];
