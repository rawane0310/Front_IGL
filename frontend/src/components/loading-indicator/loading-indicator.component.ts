import { Component } from '@angular/core';
import { UserIndicatorsServiceService } from '../../services/user-indicators-service.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSpinner, faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-loading-indicator',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './loading-indicator.component.html',
  styleUrl: './loading-indicator.component.css'
})
export class LoadingIndicatorComponent {
  faSpinner=faSpinner
  faXmark=faXmark
  constructor(public userIndicatorService: UserIndicatorsServiceService){}
}
