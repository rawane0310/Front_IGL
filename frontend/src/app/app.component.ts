import { LandingPageComponent } from '../components/landing-page/landing-page.component';
import { LoginPageComponent } from '../components/login-page/login-page.component';
import { Component } from '@angular/core';
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
export class AppComponent {
  title = 'frontend';

  constructor(public userIndicatorService: UserIndicatorsServiceService) {} 
}

