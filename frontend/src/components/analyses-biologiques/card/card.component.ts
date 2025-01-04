import { Component, inject, input, signal } from '@angular/core';
import { AnalysePlusComponent } from '../analyse-plus/analyse-plus.component';
import { AnalyseBiologique } from '../../../models/Examen';
import { AnalysesBiologiquesService } from '../../../services/analyses-biologiques.service';
import { UserIndicatorsServiceService } from '../../../services/user-indicators-service.service';

/**
 * Component representing a card for displaying a single biological analysis.
 * Allows users to expand the card to show detailed information or perform actions.
 */
@Component({
  selector: 'app-card:not(p)',
  standalone: true,
  imports: [AnalysePlusComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  /**
   * Service for managing biological analyses.
   */
  analysesBiologiquesService = inject(AnalysesBiologiquesService)

  /**
   * Signal to track whether the "plus" (detailed view) dialog is open.
   */
  plusOpened = signal(false)

  /**
   * Input for the biological analysis data displayed on this card.
   */
  analyse = input.required<AnalyseBiologique>()


  /**
   * Constructor for injecting required services.
   * @param userIndicatorsService Service for managing user feedback and loading/error states.
   */
  constructor(public userIndicatorsService: UserIndicatorsServiceService){}


  /**
   * Opens the detailed "plus" view of the card.
   */
  openPlus(): void{
    this.plusOpened.set(true)
  }


  /**
   * Closes the detailed "plus" view of the card.
   */
  closePlus(): void{
    this.plusOpened.set(false)
  }


}
