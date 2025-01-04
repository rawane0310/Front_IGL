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
 * Component for managing a detailed view of a single biological analysis, 
 * including deletion, modification, and adding results.
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
   */
  analysesBiologiquesService = inject(AnalysesBiologiquesService)

  /**
   * Icons for UI actions.
   */
  faTrashCan=faTrashCan
  faPenToSquare=faPenToSquare
  faPlusCircle=faPlusCircle
  faWandMagicSparkles=faWandMagicSparkles

  /**
   * Event emitted when the analysis dialog is closed.
   */
  closeEvent = output()

  /**
   * Signal to track the active tab index in the component.
   */
  active = signal(0)

  /**
   * Signal to track the visibility of the delete confirmation dialog.
   */
  deleteDialog = signal(false)

  /**
   * Signal to track the visibility of the modify analysis dialog.
   */
  modifyDialog = signal(false)


  /**
   * Signal to track the visibility of the add result dialog.
   */
  ajouterResultat= signal(false)


  /**
   * The current biological analysis being managed.
   */
  analyse = input.required<AnalyseBiologique>()


  /**
   * Computed property to generate the delete endpoint for the analysis.
   */
  deleteEndpoint= computed(()=>{
    return "http://localhost:8000/examens/examen_biologique/"+this.analyse().id+"/"
  }) 


  /**
   * Computed property to check if the result is ready (laborantin is assigned).
   */
  resultatPret = computed(()=>{
    return this.analyse().laborantin !== null
  })


  /**
   * Constructor to inject required services.
   * @param userRoleService Service for managing user roles and permissions.
   */
  constructor(public userRoleService: UserRoleService) { }

 
  /**
   * Closes the detailed view of the analysis.
   */
  closeAnalyse(): void{
    this.closeEvent.emit();
  }


  /**
   * Sets the active tab index.
   * @param event The event object for the tab click.
   * @param tabIndex The index of the tab to activate.
   */
  setActive(event: Event,tabIndex: number): void {
    event.stopPropagation();
    this.active.set(tabIndex)
  }

  /**
   * Opens the delete confirmation dialog.
   * @param event The event object for the delete action.
   */
  openDeleteDialog(event: Event): void {
    event.stopPropagation();
    this.deleteDialog.set(true)
  }


  /**
   * Closes the delete confirmation dialog and removes the analysis from the service.
   * @param id The ID of the analysis to be deleted.
   */
  closeDeleteDialog(id: number): void {
    this.analysesBiologiquesService.AnalysesBiologiques.set(this.analysesBiologiquesService.AnalysesBiologiques().filter(analyse => analyse.id !== id))
    this.deleteDialog.set(false);
  }


  /**
   * Opens the modify analysis dialog.
   * @param event The event object for the modify action.
   */
  openModifyDialog(event: Event): void {
    event.stopPropagation();
    this.modifyDialog.set(true)
  }


  /**
   * Closes the modify analysis dialog.
   */
  closeModifyDialog(){
    this.modifyDialog.set(false)
  }

  /**
   * Opens the add result dialog.
   * @param event The event object for the add result action.
   */
  openAjouterResultat(event: Event): void {
    event.stopPropagation();
    this.ajouterResultat.set(true)
  }


  /**
   * Closes the add result dialog.
   */
  closeAjouterResultat(): void {
    this.ajouterResultat.set(false)
  }

}
