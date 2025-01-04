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
import { TrackRouteService } from '../services/track-route.service';

/**
 * Root component of the application that manages user indicators and route tracking.
 * 
 * The component includes loading, success, and error indicators and listens to changes in
 * route navigation through the `TrackRouteService`.
 * 
 * @component
 * @selector app-root
 * @imports CommonModule, RouterOutlet, LoadingIndicatorComponent, SuccesIndicatorComponent, ErrorIndicatorComponent
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet, LoadingIndicatorComponent, SuccesIndicatorComponent, ErrorIndicatorComponent ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent   {


  /**
   * The title of the application.
   * 
   * @public
   * @type {string}
   * @default 'frontend'
   */
  title = 'frontend';


  /**
   * Creates an instance of the `AppComponent`.
   * 
   * @constructor
   * @param {UserIndicatorsServiceService} userIndicatorService Service for managing user indicators (loading, success, error).
   * @param {TrackRouteService} trackRouteService Service for tracking the last valid route.
   */
  constructor(
    public userIndicatorService: UserIndicatorsServiceService, 
    public trackRouteService: TrackRouteService
  ) {} 

  
}

