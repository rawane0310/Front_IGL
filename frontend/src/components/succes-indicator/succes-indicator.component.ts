import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { UserIndicatorsServiceService } from '../../services/user-indicators-service.service';


@Component({
  selector: 'app-succes-indicator',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './succes-indicator.component.html',
  styleUrl: './succes-indicator.component.css'
})
export class SuccesIndicatorComponent {
  faCheck=faCheck
  faXmark=faXmark
  constructor(public userIndicatorService: UserIndicatorsServiceService){}
  
  closeSuccess(event: Event): void{
    event.stopPropagation();
    this.userIndicatorService.sucessData.set({
      ...this.userIndicatorService.sucessData(),
      isSuccess: false
    });
  }
}
