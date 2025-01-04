import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { UserIndicatorsServiceService } from '../../services/user-indicators-service.service';


/**
 * Component for displaying a success indicator with a success or error message.
 * 
 * The success indicator displays an icon and a message when an operation succeeds.
 * The user can close the indicator by clicking on the close button.
 */
@Component({
  selector: 'app-succes-indicator',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './succes-indicator.component.html',
  styleUrl: './succes-indicator.component.css'
})
export class SuccesIndicatorComponent {

  /** 
   * FontAwesome icon representing a check mark, used to indicate success.
   */
  faCheck=faCheck

  /** 
   * FontAwesome icon representing a cross mark, used to indicate failure or close action.
   */
  faXmark=faXmark


  /**
   * Constructor to inject the UserIndicatorsServiceService to manage loading and success indicators.
   * 
   * @param {UserIndicatorsServiceService} userIndicatorService - The service responsible for handling loading states,
   * success messages, and error indicators throughout the application.
   */
  constructor(public userIndicatorService: UserIndicatorsServiceService){}
  

  /**
   * Closes the success indicator when the user clicks on the close button.
   * 
   * This function stops event propagation and sets the `isSuccess` property to `false`,
   * hiding the success indicator.
   * 
   * @param event - The click event that triggered the action.
   */
  closeSuccess(event: Event): void{
    event.stopPropagation();
    this.userIndicatorService.sucessData.set({
      ...this.userIndicatorService.sucessData(),
      isSuccess: false
    });
  }
}
