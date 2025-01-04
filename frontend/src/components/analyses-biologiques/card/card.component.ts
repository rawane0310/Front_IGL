import { Component, inject, input, signal } from '@angular/core';
import { AnalysePlusComponent } from '../analyse-plus/analyse-plus.component';
import { AnalyseBiologique } from '../../../models/Examen';
import { AnalysesBiologiquesService } from '../../../services/analyses-biologiques.service';
import { UserIndicatorsServiceService } from '../../../services/user-indicators-service.service';

/**
 * Component representing a card for displaying a single biological analysis.
 * The card can be expanded to show more details, allowing users to perform actions such as viewing or modifying the analysis.
 * @component
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
   * Service for managing biological analyses, used to fetch and update analysis data.
   * 
   * @type {AnalysesBiologiquesService}
   */
  analysesBiologiquesService = inject(AnalysesBiologiquesService)


  /**
   * Signal to track whether the detailed view ("plus") dialog for the analysis is open.
   * This controls the visibility of the expanded card view.
   * 
   * @signal
   * @type {Signal<boolean>}
   */
  plusOpened = signal(false)

  /**
   * Input property for the biological analysis data displayed on this card.
   * The analysis is required for this card to be properly rendered.
   * 
   * @input
   * @type {AnalyseBiologique}
   */
  analyse = input.required<AnalyseBiologique>()


  /**
   * Constructor for injecting the necessary services into the component.
   * 
   * @param {UserIndicatorsServiceService} userIndicatorsService Service for managing user feedback, loading states, and error handling.
   */
  constructor(public userIndicatorsService: UserIndicatorsServiceService){}


  /**
   * Opens the detailed view (or "plus" view) of the card to display more information about the biological analysis.
   * 
   * @public
   * @method openPlus
   * @returns {void}
   */
  openPlus(): void{
    this.plusOpened.set(true)
  }


   /**
   * Closes the detailed "plus" view of the card, hiding the expanded analysis details.
   * 
   * @public
   * @method closePlus
   * @returns {void}
   */
  closePlus(): void{
    this.plusOpened.set(false)
  }


}
