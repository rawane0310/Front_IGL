import { Component, computed, inject, input, output, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrashCan, faPenToSquare, faPlusCircle, faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons';
import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';
import { AnalyseBiologique } from '../../../models/Examen';
import { ModifierAnalyseComponent } from '../modifier-analyse/modifier-analyse.component';
import { ResultatComponent } from '../resultat/resultat.component';
import { AjouterResultatComponent } from '../ajouter-resultat/ajouter-resultat.component';
import { AnalysesBiologiquesService } from '../../../services/analyses-biologiques.service';
import { UserRoleService } from '../../../services/user-role.service';

/**
 * Component for managing the detailed view of a single biological analysis.
 * Includes functionality for viewing, modifying, deleting, and adding results to an analysis.
 * It manages UI visibility for different actions such as deleting and modifying the analysis.
 * @component
 */
@Component({
  selector: 'app-analyse-plus',
  standalone: true,
  imports: [FontAwesomeModule, DeleteDialogComponent, ModifierAnalyseComponent, ResultatComponent, AjouterResultatComponent],
  templateUrl: './analyse-plus.component.html',
  styleUrl: './analyse-plus.component.css'
})
export class AnalysePlusComponent {

  /**
   * Service for managing biological analyses.
   * 
   * @type {AnalysesBiologiquesService}
   */
  analysesBiologiquesService = inject(AnalysesBiologiquesService)

  /**
   * Icons for UI actions such as delete, modify, and add.
   * 
   * @type {IconDefinition}
   */
  faTrashCan=faTrashCan
  faPenToSquare=faPenToSquare
  faPlusCircle=faPlusCircle
  faWandMagicSparkles=faWandMagicSparkles

  /**
   * Event emitted when the analysis dialog is closed.
   * 
   * @output
   */
  closeEvent = output()

  /**
   * Signal to track the active tab index within the component.
   * 
   * @signal
   * @type {Signal<number>}
   */
  active = signal(0)

  /**
   * Signal to control the visibility of the delete confirmation dialog.
   * 
   * @signal
   * @type {Signal<boolean>}
   */
  deleteDialog = signal(false)

  /**
   * Signal to control the visibility of the modify analysis dialog.
   * 
   * @signal
   * @type {Signal<boolean>}
   */
  modifyDialog = signal(false)


  /**
   * Signal to control the visibility of the add result dialog.
   * 
   * @signal
   * @type {Signal<boolean>}
   */
  ajouterResultat= signal(false)


  /**
   * The current biological analysis being managed.
   * 
   * @input
   * @type {AnalyseBiologique}
   */
  analyse = input.required<AnalyseBiologique>()


   /**
   * Computed property to generate the delete endpoint URL for the current analysis.
   * 
   * @computed
   * @returns {string} The endpoint URL for the analysis deletion.
   */
  deleteEndpoint= computed(()=>{
    return "http://localhost:8000/examens/examen_biologique/"+this.analyse().id+"/"
  }) 


  /**
   * Computed property to check if the result is ready (i.e., the laborantin is assigned).
   * 
   * @computed
   * @returns {boolean} True if the result is ready, otherwise false.
   */
  resultatPret = computed(()=>{
    return this.analyse().laborantin !== null
  })


  /**
   * Constructor to inject the necessary services for managing user roles and biological analyses.
   * 
   * @param {UserRoleService} userRoleService Service for managing user roles and permissions.
   */
  constructor(public userRoleService: UserRoleService) { }

 
  /**
   * Emits the closeEvent to close the analysis dialog and return to the previous view.
   * 
   * @public
   * @method closeAnalyse
   * @returns {void}
   */
  closeAnalyse(): void{
    this.closeEvent.emit();
  }


  /**
   * Sets the active tab index when a tab is clicked.
   * 
   * @public
   * @method setActive
   * @param {Event} event The event object for the tab click.
   * @param {number} tabIndex The index of the tab to activate.
   * @returns {void}
   */
  setActive(event: Event,tabIndex: number): void {
    event.stopPropagation();
    this.active.set(tabIndex)
  }

  /**
   * Opens the delete confirmation dialog when the delete action is triggered.
   * 
   * @public
   * @method openDeleteDialog
   * @param {Event} event The event object for the delete action.
   * @returns {void}
   */
  openDeleteDialog(event: Event): void {
    event.stopPropagation();
    this.deleteDialog.set(true)
  }


  /**
   * Closes the delete confirmation dialog and deletes the analysis from the list.
   * 
   * @public
   * @method closeDeleteDialog
   * @param {number} id The ID of the analysis to be deleted.
   * @returns {void}
   */
  closeDeleteDialog(id: number): void {
    this.analysesBiologiquesService.AnalysesBiologiques.set(this.analysesBiologiquesService.AnalysesBiologiques().filter(analyse => analyse.id !== id))
    this.deleteDialog.set(false);
  }


  /**
   * Opens the modify analysis dialog when the modify action is triggered.
   * 
   * @public
   * @method openModifyDialog
   * @param {Event} event The event object for the modify action.
   * @returns {void}
   */
  openModifyDialog(event: Event): void {
    event.stopPropagation();
    this.modifyDialog.set(true)
  }


  /**
   * Closes the modify analysis dialog when the modification is finished.
   * 
   * @public
   * @method closeModifyDialog
   * @returns {void}
   */
  closeModifyDialog(){
    this.modifyDialog.set(false)
  }

  /**
   * Opens the add result dialog when the add result action is triggered.
   * 
   * @public
   * @method openAjouterResultat
   * @param {Event} event The event object for the add result action.
   * @returns {void}
   */
  openAjouterResultat(event: Event): void {
    event.stopPropagation();
    this.ajouterResultat.set(true)
  }


  /**
   * Closes the add result dialog when the action is finished.
   * 
   * @public
   * @method closeAjouterResultat
   * @returns {void}
   */
  closeAjouterResultat(): void {
    this.ajouterResultat.set(false)
  }

}
