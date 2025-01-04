import { Component, inject, input, signal, ViewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { AjouterMedicamentComponent } from "../ajouter-medicament/ajouter-medicament.component";
import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';
import { UserIndicatorsServiceService } from '../../../services/user-indicators-service.service';
import { MedicamentsService } from '../../../services/medicaments.service';
import axios from 'axios';
import Medicament from '../../../models/Medicament';
import { UserRoleService } from '../../../services/user-role.service';


/**
 * A component that handles the management of medications (medicaments) in a medical treatment process.
 * It allows displaying, editing, and deleting medications associated with a specific patient and care.
 * 
 * @component
 * 
 * @property {boolean} medForm - A flag to control the visibility of the medication form. Default is false (hidden).
 * @property {boolean} deleteDialog - A flag to control the visibility of the delete confirmation dialog. Default is false (hidden).
 * @property {string} deleteEndpoint - The API endpoint for deleting a medication.
 * @property {number} itemId - The ID of the medication to be deleted.
 * @property {Medicament | undefined} medicament - The current medication object being edited. It is undefined when no medication is selected for editing.
 * @property {number} soinId - The ID of the care process to which the medications are related. This is a required input.
 * @property {number} infermierId - The ID of the nurse assigned to the care process. This is a required input.
 * 
 * @method openMedForm - Opens the medication form for editing the selected medication. Sets the current medication in the form.
 * @method closeMedForm - Closes the medication form and resets the current medication.
 * @method opendeleteDialog - Opens the delete confirmation dialog for the selected medication and sets the delete endpoint.
 * @method closeDeleteDialog - Closes the delete confirmation dialog and removes the deleted medication from the service.
 * @method ngOnInit - Fetches the list of medications associated with the specified `soinId` from the API. Sets the medications in the service.
 * @method constructor - Initializes the `MedicamentsComponent` and injects the necessary services for user indicators and user role management.
 */
@Component({
  selector: 'app-medicaments',
  standalone: true,
  imports: [FontAwesomeModule, AjouterMedicamentComponent, DeleteDialogComponent],
  templateUrl: './medicaments.component.html',
  styleUrl: './medicaments.component.css'
})
export class MedicamentsComponent {

  /** 
   * The medication service that provides methods for managing medications.
   * @type {MedicamentsService}
   */
  medicamentsService = inject(MedicamentsService)


  /**
   * FontAwesome icon for trash can, used to represent the delete action for medications.
   * @type {IconDefinition}
   */
  faTrashCan=faTrashCan


  /**
   * FontAwesome icon for pen, used to represent the edit action for medications.
   * @type {IconDefinition}
   */
  faPenToSquare=faPenToSquare


  /**
   * A signal that indicates whether the medication form is open (true) or closed (false).
   * @type {Signal<boolean>}
   */
  medForm = signal(false)

  /**
   * A signal that indicates whether the delete confirmation dialog is open (true) or closed (false).
   * @type {Signal<boolean>}
   */
  deleteDialog = signal(false)


  /**
   * The ID of the care process (soin) associated with the medications.
   * @type {number}
   */
  soinId = input.required()

  /**
   * The ID of the nurse (infermier) assigned to the care process.
   * @type {number}
   */
  infermierId = input.required<number>()


  /**
   * The API endpoint URL used to delete a medication.
   * @type {string}
   */
  deleteEndpoint !: string


  /**
   * The ID of the selected medication for deletion.
   * @type {number}
   */
  itemId !: number


  /**
   * The medication object that is currently being edited.
   * @type {Medicament | undefined}
   */
  medicament : Medicament | undefined 


  
  /**
   * Constructor for the `MedicamentsComponent`.
   * Initializes the component and injects the required services for user indicators and user role management.
   * 
   * @param {UserIndicatorsServiceService} userIndicatorService - The service for managing user indicators (loading, success, error messages).
   * @param {UserRoleService} userRoleService - The service for handling user roles (e.g., determining access rights).
   */
  constructor(public userIndicatorService: UserIndicatorsServiceService, public userRoleService: UserRoleService){}
  
  
  /**
   * Opens the medication form and sets the current medication to be edited.
   * 
   * @param {Event} event - The event that triggered the opening of the form.
   * @param {Medicament} medicament - The medication object to be edited.
   */
  openMedForm(event: Event, medicament: Medicament){
    event.stopPropagation()
    this.medicament = medicament
    this.medForm.set(true)
  }


  /**
   * Closes the medication form and resets the current medication object.
   */
  closeMedForm(){
    this.medForm.set(false)
    this.medicament = undefined
  }


  /**
   * Opens the delete confirmation dialog for the selected medication.
   * Sets the appropriate API endpoint for the deletion request.
   * 
   * @param {Event} event - The event that triggered the opening of the delete dialog.
   * @param {number} id - The ID of the medication to be deleted.
   */
  opendeleteDialog(event: Event, id: number){
    this.deleteEndpoint = "http://localhost:8000/traitements/medicament/"+id+"/delete/"
    this.itemId = id
    event.stopPropagation()
    this.deleteDialog.set(true)
  }


  /**
   * Closes the delete confirmation dialog and removes the deleted medication from the list.
   * 
   * @param {number} id - The ID of the medication that was deleted.
   */
  closeDeleteDialog(id: number){

    this.medicamentsService.medicaments.set(this.medicamentsService.medicaments().filter(med => med.id !== id))
    this.deleteDialog.set(false)
  }


  /**
   * Fetches the list of medications associated with the specified care process (soin) ID.
   * Updates the medication list in the service.
   * 
   * @returns {Promise<void>} - A promise that resolves once the medications are fetched and the state is updated.
   */
  async ngOnInit() : Promise<void>{
    
    try {
      this.userIndicatorService.loadingData.set({
        ...this.userIndicatorService.loadingData(),
        isLoading: true
      })

      const res = await axios.get("http://localhost:8000/traitements/medicament/search/?soin="+this.soinId(),{
        headers: {
          'Authorization': 'Bearer '+localStorage.getItem('accessToken')
        }
      })

      console.log(res.data)
      if(res.status === 200) this.medicamentsService.medicaments.set(res.data)
      else this.userIndicatorService.errorData.set({
        isError: true,
        errorMessage: 'Erreur lors de la récupération des médicaments'
      })
    } 
    catch (error) {
      console.log(error)
      this.userIndicatorService.errorData.set({
        isError: true,
        errorMessage: 'Erreur lors de la récupération des médicaments'
      })
    }
    finally{
      this.userIndicatorService.loadingData.set({
        ...this.userIndicatorService.loadingData(),
        isLoading: false
      })
    }

  }
}

