import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleExclamation, faXmark } from '@fortawesome/free-solid-svg-icons';
import { UserIndicatorsServiceService } from '../../services/user-indicators-service.service';

/**
 * The ErrorIndicatorComponent displays an error icon and a close button.
 * It listens for error data changes and provides functionality to close the error message.
 */
@Component({
  selector: 'app-error-indicator',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './error-indicator.component.html',
  styleUrl: './error-indicator.component.css'
})
export class ErrorIndicatorComponent {

  /**
   * Font Awesome icon for a circle with an exclamation mark.
   */
  faCircleExclamation=faCircleExclamation


  /**
   * Font Awesome icon for an x mark.
   */
  faXmark=faXmark


  /**
   * Constructor for the ErrorIndicatorComponent.
   * Injects the `UserIndicatorsServiceService` to access error data.
   * 
   * @param userIndicatorService - The UserIndicatorsServiceService used to access error data.
   */
  constructor(public userIndicatorService: UserIndicatorsServiceService){}


  /**
   * Close the error indicator and reset the error state.
   * 
   * @param event - The click event triggered when the close button is clicked.
   */
  closeError(event: Event): void{
    event.stopPropagation(); // Prevents the event from bubbling up
    this.userIndicatorService.errorData.set({
      ...this.userIndicatorService.errorData(), // Spread current error data
      isError: false // Set isError to false to hide the error indicator
    });
  }

}
