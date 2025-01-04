import { Component, computed, inject, input, output, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrashCan, faPenToSquare, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';
import { ExamenRadiologique } from '../../../models/Examen';
import { ExamensRadiologiquesService } from '../../../services/examens-radiologiques.service';
import { ModifierExamenComponent } from '../modifier-examen/modifier-examen.component';
import { CompteRenduComponent } from '../compte-rendu/compte-rendu.component';
import { AjouterCompteRenduComponent } from "../ajouter-compte-rendu/ajouter-compte-rendu.component";
import { UserRoleService } from '../../../services/user-role.service';

/**
 * Component for managing detailed operations on a radiological exam.
 */
@Component({
  selector: 'app-examen-plus',
  standalone: true,
  imports: [FontAwesomeModule, DeleteDialogComponent, ModifierExamenComponent, CompteRenduComponent, AjouterCompteRenduComponent],
  templateUrl: './examen-plus.component.html',
  styleUrl: './examen-plus.component.css'
})

export class ExamenPlusComponent {

  /**
   * Service for managing radiological exams.
   */
  examensRadiologiquesSevice= inject(ExamensRadiologiquesService)


  /**
   * FontAwesome icon for delete action.
   */
  faTrashCan=faTrashCan

  /**
   * FontAwesome icon for edit action.
   */
  faPenToSquare=faPenToSquare

  /**
   * FontAwesome icon for add action.
   */
  faPlusCircle=faPlusCircle


  /**
   * Input property representing the current exam being managed.
   * Must conform to the `ExamenRadiologique` model.
   */
  examen = input.required<ExamenRadiologique>()


  /**
   * Computed property that determines if the exam result is ready.
   * Returns true if a radiologist has reviewed the exam.
   */
  resultatPret = computed(()=>{
    return this.examen().radiologue !== null
  })


  /**
   * Computed property for the API endpoint to delete the current exam.
   */
  deleteEndpoint= computed(()=>{
    return "http://localhost:8000/examens/examen_radiologique/"+this.examen().id+"/"
  })


  /**
   * Signal to manage the visibility of the "Add Report" dialog.
   */
  addCompteRendu = signal(false)


  /**
   * Output event to notify the parent component about exam closure.
   */
  closeEvent = output()


  /**
   * Signal to manage the currently active tab.
   */
  active = signal(0)


  /**
   * Signal to manage the visibility of the delete dialog.
   */
  deleteDialog = signal(false)


  /**
   * Signal to manage the visibility of the modify dialog.
   */
  modifyDialog = signal(false)


  /**
   * Constructor for injecting required services.
   * @param userRoleService Service for managing user roles and permissions.
   */
  constructor(public userRoleService: UserRoleService) {}


  /**
   * Closes the current exam and emits a close event.
   */
  closeExamen(): void{
    this.closeEvent.emit();
  }



  /**
   * Sets the active tab in the UI.
   * Prevents event propagation.
   * @param event The DOM event to stop propagation.
   * @param tabIndex The index of the tab to activate.
   */
  setActive(event: Event,tabIndex: number): void {
    event.stopPropagation();
    this.active.set(tabIndex)
  }


  /**
   * Opens the delete dialog for confirming exam deletion.
   * Prevents event propagation.
   * @param event The DOM event to stop propagation.
   */
  opendeleteDialog(event: Event): void {
    event.stopPropagation();
    this.deleteDialog.set(true)
  }

  /**
   * Closes the delete dialog and removes the deleted exam from the list.
   * @param id The ID of the exam to delete.
   */
  closeDeleteDialog(id: number): void {
    this.examensRadiologiquesSevice.examensRadiologiques.set(
      this.examensRadiologiquesSevice.examensRadiologiques().filter(e=>e.id!==id)
    )
    this.deleteDialog.set(false);
  }


  /**
   * Opens the modify dialog for editing exam details.
   * Prevents event propagation.
   * @param event The DOM event to stop propagation.
   */
  openModifyDialog(event: Event){
   event.stopPropagation() 
   this.modifyDialog.set(true)  
  }


  /**
   * Closes the modify dialog.
   */
  closeModifyDialog(){
    this.modifyDialog.set(false)  
  }


  /**
   * Opens the dialog for adding a new report to the exam.
   * Prevents event propagation.
   * @param event The DOM event to stop propagation.
   */
  openAddCompteRendu(event: Event){
    event.stopPropagation()
    this.addCompteRendu.set(true)
  }


  /**
   * Closes the "Add Report" dialog.
   */
  closeAddCompteRendu(){
    this.addCompteRendu.set(false)
  }
  
}
