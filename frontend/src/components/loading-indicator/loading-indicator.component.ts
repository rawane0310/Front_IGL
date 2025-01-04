import { Component } from '@angular/core';
import { UserIndicatorsServiceService } from '../../services/user-indicators-service.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSpinner, faXmark } from '@fortawesome/free-solid-svg-icons';

/**
 * A component for displaying a loading indicator.
 * Uses FontAwesome icons for visual representation.
 */
@Component({
  selector: 'app-loading-indicator',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './loading-indicator.component.html',
  styleUrl: './loading-indicator.component.css'
})
export class LoadingIndicatorComponent {

  /**
   * FontAwesome spinner icon for indicating loading state.
   */
  faSpinner=faSpinner

  /**
   * FontAwesome close (X) icon for dismissing or stopping actions.
   */
  faXmark=faXmark


  /**
   * Constructor for injecting the UserIndicatorsServiceService.
   * @param userIndicatorService Service used to manage loading states and messages.
   */
  constructor(public userIndicatorService: UserIndicatorsServiceService){}
}
