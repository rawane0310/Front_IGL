import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleExclamation, faXmark } from '@fortawesome/free-solid-svg-icons';
import { UserIndicatorsServiceService } from '../../services/user-indicators-service.service';

@Component({
  selector: 'app-error-indicator',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './error-indicator.component.html',
  styleUrl: './error-indicator.component.css'
})
export class ErrorIndicatorComponent {
  faCircleExclamation=faCircleExclamation
  faXmark=faXmark
  constructor(public userIndicatorService: UserIndicatorsServiceService){}

  closeError(event: Event): void{
    event.stopPropagation();
    this.userIndicatorService.errorData.set({
      ...this.userIndicatorService.errorData(),
      isError: false
    });
  }

}
