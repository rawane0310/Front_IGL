import { Component, inject, input, output, signal } from '@angular/core';
import { MedicamentsComponent } from "../medicaments/medicaments.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrashCan, faPenToSquare, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { AjouterMedicamentComponent } from '../ajouter-medicament/ajouter-medicament.component';
import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';
import { ModifierSoinComponent } from "../modifier-soin/modifier-soin.component";
import SoinInfermier from '../../../models/SoinInfermier';
import { SoinsInfermiersService } from '../../../services/soins-infermiers.service';
import { UserRoleService } from '../../../services/user-role.service';


/**
 * The `SoinsPlusComponent` is a feature component responsible for handling additional functionalities related to
 * nurse's care (soins). This includes managing the modification and deletion of care, as well as interacting with
 * medication-related features.
 * 
 * @component
 * 
 * @property {Signal<boolean>} activeMedicament - A signal that determines if the medicament section is active.
 * @property {Signal<boolean>} ajouterMed - A signal that controls the visibility of the "Ajouter Medicament" form.
 * @property {Signal<boolean>} soinForm - A signal that controls the visibility of the "Modifier Soin" form.
 * @property {Signal<boolean>} deleteDialog - A signal that controls the visibility of the delete confirmation dialog.
 * @property {SoinInfermier} soin - The nurse's care (soin) instance being managed. This is a required input.
 * @property {string} deleteEndpoint - The API endpoint for deleting a nurse's care.
 * 
 * @method openSoinForm - Opens the form to modify a nurse's care instance (`soin`).
 * @method closeSoinForm - Closes the form to modify a nurse's care instance (`soin`).
 * @method opendeleteDialog - Opens the delete confirmation dialog.
 * @method closeDeleteDialog - Closes the delete confirmation dialog and updates the list of soins after deletion.
 * @method closeSoin - Emits an event to close the current soins form.
 * @method setActive - Activates the medicament section.
 * @method unSetActive - Deactivates the medicament section.
 * @method openAjouterMedicament - Opens the form to add a new medicament.
 * @method closeAjouterMedicament - Closes the form to add a new medicament.
 * @method ngOnInit - Initializes the component and sets the delete endpoint for the current care instance (`soin`).
 */
@Component({
  selector: 'app-soins-plus',
  standalone: true,
  imports: [MedicamentsComponent, FontAwesomeModule, DeleteDialogComponent, ModifierSoinComponent, AjouterMedicamentComponent],
  templateUrl: './soins-plus.component.html',
  styleUrl: './soins-plus.component.css'
})
export class SoinsPlusComponent {

  /** 
   * The service responsible for managing the list of nurse's care (soins).
   * @type {SoinsInfermiersService}
   */
  soinsInfermiersService = inject(SoinsInfermiersService)


   /** 
   * FontAwesome icon for trash can.
   * @type {IconDefinition}
   */
  faTrashCan=faTrashCan


   /** 
   * FontAwesome icon for editing.
   * @type {IconDefinition}
   */
  faPenToSquare=faPenToSquare


  /** 
   * FontAwesome icon for adding.
   * @type {IconDefinition}
   */
  faPlusCircle=faPlusCircle


  /** 
   * The event emitter to notify the parent component when the soins form is closed.
   * @type {Signal<void>}
   */
  closeEvent = output()


  /** 
   * A signal to track the active state of the medicament section.
   * @type {Signal<boolean>}
   */
  activeMedicament = signal(false);


  /** 
   * A signal to control the visibility of the "Ajouter Medicament" form.
   * @type {Signal<boolean>}
   */
  ajouterMed = signal(false)


  /** 
   * The nurse's care instance being managed. This is a required input.
   * @type {SoinInfermier}
   */
  soin= input.required<SoinInfermier>()


  /** 
   * The endpoint for deleting a nurse's care instance.
   * @type {string}
   */
  deleteEndpoint !: string ;


  /** 
   * A signal that controls the visibility of the "Modifier Soin" form.
   * @type {Signal<boolean>}
   */
  soinForm = signal(false)


  /** 
   * A signal that controls the visibility of the delete confirmation dialog.
   * @type {Signal<boolean>}
   */
  deleteDialog = signal(false)



  /**
   * The constructor for the `SoinsPlusComponent`. It injects the `UserRoleService` for user role management.
   * 
   * @param {UserRoleService} userRoleService - The service responsible for managing user roles and permissions.
   */
  constructor(public userRoleService: UserRoleService){}
  


  /**
   * Opens the "Modifier Soin" form.
   * 
   * @param {Event} event - The event triggered by the user interaction.
   */
  openSoinForm(event: Event){
    event.stopPropagation()
    this.soinForm.set(true)
  }



  /**
   * Closes the "Modifier Soin" form.
   */
  closeSoinForm(){
    this.soinForm.set(false)
  }


  /**
   * Opens the delete confirmation dialog.
   * 
   * @param {Event} event - The event triggered by the user interaction.
   */
  opendeleteDialog(event: Event){
    event.stopPropagation()
    this.deleteDialog.set(true)
  }


  /**
   * Closes the delete confirmation dialog and updates the list of soins after successful deletion.
   * 
   * @param {number} id - The ID of the care instance to be deleted.
   */
  closeDeleteDialog(id: number){
    console.log("close delete dialog",id)
    this.soinsInfermiersService.soinsInfermiers.set(this.soinsInfermiersService.soinsInfermiers().filter(soin => soin.id !== id))
    this.deleteDialog.set(false)
  }


  /**
   * Emits the close event to notify the parent component that the soins form should be closed.
   */
  closeSoin(){
    this.closeEvent.emit() ;
  }


  /**
   * Activates the medicament section.
   * 
   * @param {Event} event - The event triggered by the user interaction.
   */
  setActive(event: Event){
    event.stopPropagation();
    this.activeMedicament.set(true)
  }


  /**
   * Deactivates the medicament section.
   * 
   * @param {Event} event - The event triggered by the user interaction.
   */
  unSetActive(event: Event){
    event.stopPropagation();
    this.activeMedicament.set(false)
  }


  /**
   * Opens the "Ajouter Medicament" form.
   * 
   * @param {Event} event - The event triggered by the user interaction.
   */
  openAjouterMedicament(event: Event){
    event.stopPropagation();
    this.ajouterMed.set(true)
  }

  /**
   * Closes the "Ajouter Medicament" form.
   */
  closeAjouterMedicament(){
    this.ajouterMed.set(false)
  }

  /**
   * Initializes the component and sets the delete endpoint for the current care instance.
   */
  ngOnInit():void{
    this.deleteEndpoint = 'http://localhost:8000/traitements/soin-infermier/'+this.soin().id+'/delete/'
  }

}
