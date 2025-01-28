import { LandingPageComponent } from '../components/landing-page/landing-page.component';
import { LoginPageComponent } from '../components/login-page/login-page.component';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MenuDpiComponent } from '../components/Dpi/menu-dpi/menu-dpi.component';
import { HeaderComponent } from '../components/header/header.component';
import { InfosDpiComponent } from '../components/Dpi/infos-dpi/infos-dpi.component';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button'; // For styling buttons
import { InfoPatientService } from '../components/services/info-patient.service';
import { AjouterConsultationComponent } from '../components/Dpi/ajouter-consultation/ajouter-consultation.component';
import { AjouterOrdonnanceComponent } from '../components/Dpi/ajouter-ordonnance/ajouter-ordonnance.component';
import { AjouterExamenComponent } from '../components/Dpi/ajouter-examen/ajouter-examen.component';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, LoginPageComponent, LandingPageComponent,RouterOutlet,HeaderComponent, MenuDpiComponent , InfosDpiComponent,   MatButtonModule , MatDialogModule, HttpClientModule  , AjouterOrdonnanceComponent , ReactiveFormsModule, AjouterExamenComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [InfoPatientService],
})
export class AppComponent {
  title = 'frontend';

  
}

