import { LandingPageComponent } from '../components/landing-page/landing-page.component';
import { LoginPageComponent } from '../components/login-page/login-page.component';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MenuDpiComponent } from '../components/menu-dpi/menu-dpi.component';
import { HeaderComponent } from '../components/header/header.component';
import { InfosDpiComponent } from '../components/infos-dpi/infos-dpi.component';
import { UserIndicatorsServiceService } from '../services/user-indicators-service.service';
import { LoadingIndicatorComponent } from '../components/loading-indicator/loading-indicator.component';
import { SuccesIndicatorComponent } from '../components/succes-indicator/succes-indicator.component';
import { ErrorIndicatorComponent } from '../components/error-indicator/error-indicator.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet, LoadingIndicatorComponent, SuccesIndicatorComponent, ErrorIndicatorComponent ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent   {
  title = 'frontend';

  constructor(public userIndicatorService: UserIndicatorsServiceService) {} 

  ngOnInit(){
    localStorage.setItem('accessToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxMDM3NTEyOTkxNCwiaWF0IjoxNzM1MjE2MzE0LCJqdGkiOiI5ZDM1Y2E3N2VlNDU0NTgyOTc5ZTY1MTlmMmEyNGM4MSIsInVzZXJfaWQiOjE4LCJyb2xlIjoidGVjaG5pY2llbiJ9.aWOwpVXLhWRkcQ33WAGdBPFiYd0g8QtDE4-zGiuEMnQ');
    localStorage.setItem('userRole', 'technicien');
    localStorage.setItem('technicianRole', 'infermier');
    localStorage.setItem('userID', '3');
    localStorage.setItem('technicianID', '3');
    localStorage.setItem('dpiID', '1');
  }
}

