import { Component, inject, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserIndicatorsServiceService } from '../../../services/user-indicators-service.service';
import { MedicamentsService } from '../../../services/medicaments.service';
import axios from 'axios';
import SoinInfermier from '../../../models/SoinInfermier';
import Medicament from '../../../models/Medicament';

/**
 * This component handles the creation and modification of medication for a specific "soin" (nursing treatment).
 * It allows the user to input medication details and submit them to the server.
 * 
 * @component
 */
@Component({
  selector: 'app-ajouter-medicament',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './ajouter-medicament.component.html',
  styleUrl: './ajouter-medicament.component.css'
})
export class AjouterMedicamentComponent {

  /**
   * The service that handles the medicaments-related data.
   * @type {MedicamentsService}
   */
  medicamentsService = inject(MedicamentsService)

  /**
   * Output event for closing the modal.
   */
  ajouterMedCloseEvent = output()


   /**
   * The ID of the current soin (nursing treatment).
   * @type {number}
   */
  soinId = input.required()

  /**
   * The medicament to modify or create.
   * @type {Medicament}
   */
  medicament = input<Medicament>()


  /**
   * The form group containing the medication details.
   * @type {FormGroup}
   */
  formGroup !: FormGroup

  /**
   * Creates an instance of the `AjouterMedicamentComponent`.
   * 
   * @param {UserIndicatorsServiceService} userIndicatorService - The service responsible for managing user indicators (loading, success, and error states).
   */
  constructor(public userIndicatorService: UserIndicatorsServiceService) { }


  /**
   * Closes the "add medication" modal.
   * @returns {void}
   */
  closeAjouterMed(): void{
    this.ajouterMedCloseEvent.emit()
  }


   /**
   * Initializes the form with values from the existing medication if present.
   * @returns {void}
   */
  ngOnInit(): void{
    this.formGroup = new FormGroup({
      nom: new FormControl(this.medicament()?.nom || '',[Validators.required]),
      dose: new FormControl(this.medicament()?.dose || '',[Validators.required]) ,
      frequence: new FormControl(this.medicament()?.frequence || '',[Validators.required]),
      duree: new FormControl(this.medicament()?.duree || '',[Validators.required]),
      
      soin_id: new FormControl(this.soinId(),[Validators.required])
    })
  }

  /**
   * Modifies an existing medication.
   * Sends a PUT request to update the medicament on the server.
   * @returns {Promise<void>}
   */
  async modifierMedicamente(): Promise<void>{
    try {
      this.userIndicatorService.loadingData.set({
        isLoading: true,
        loadingMessage: 'Modification en cours...'
      })
      
      const res = await axios.put('http://localhost:8000/traitements/medicament/'+this.medicament()?.id+'/modify/',{
        nom : this.formGroup.value.nom,
        dose : this.formGroup.value.dose,
        frequence : this.formGroup.value.frequence,
        duree : this.formGroup.value.duree,
        ordonnance : null,
        soin: this.soinId(),
      },{
        headers:{
          Authorization: 'Bearer '+localStorage.getItem('accessToken')
        }
      })

      console.log(res.data)
      if(res.status === 200){
        this.userIndicatorService.sucessData.set({
          isSuccess: true,
          successMessage: 'Médicament modifier avec succès'
        })

        const updatedMedicaments = this.medicamentsService.medicaments().filter(med => med.id !== this.medicament()?.id);  // Filter out the medicament

        updatedMedicaments.push(res.data);  // Add the new medicament

        this.medicamentsService.medicaments.set(updatedMedicaments);  // Set the updated array

      }
      else this.userIndicatorService.errorData.set({
        isError: true,
        errorMessage: 'Erreur lors de la modification du médicament'
      })
    } 
    catch (error) {
      console.log(error)
      this.userIndicatorService.errorData.set({
        isError: true,
        errorMessage: 'Erreur lors de la modification du médicament'
      })
    }
    finally {
      this.userIndicatorService.loadingData.set({
        isLoading: false,
        loadingMessage: 'Chargement... '
      })
      this.closeAjouterMed()
    }
  }


   /**
   * Adds a new medication.
   * Sends a POST request to create the medicament on the server.
   * @returns {Promise<void>}
   */
  async ajouterMedicament(): Promise<void>{
    try {
      this.userIndicatorService.loadingData.set({
        isLoading: true,
        loadingMessage: 'Création en cours...'
      })
      
      const res = await axios.post('http://localhost:8000/traitements/medicament/create/',{
        
        nom : this.formGroup.value.nom,
        dose : this.formGroup.value.dose,
        frequence : this.formGroup.value.frequence,
        duree : this.formGroup.value.duree,
        ordonnance : null,
        soin: this.soinId(),
      },{
        headers:{
          Authorization: 'Bearer '+localStorage.getItem('accessToken')
        }
      })

      console.log(res.data)
      if(res.status === 201){
        this.userIndicatorService.sucessData.set({
          isSuccess: true,
          successMessage: 'Médicament créé avec succès'
        })

        this.medicamentsService.medicaments.set([ ...this.medicamentsService.medicaments(), res.data ])
      }
      else this.userIndicatorService.errorData.set({
        isError: true,
        errorMessage: 'Erreur lors de la création du médicament'
      })
    } 
    catch (error) {
      console.log(error)
      this.userIndicatorService.errorData.set({
        isError: true,
        errorMessage: 'Erreur lors de la création du médicament'
      })
    }
    finally {
      this.userIndicatorService.loadingData.set({
        isLoading: false,
        loadingMessage: 'Chargement... '
      })
      this.closeAjouterMed()
    }
  }

  /**
   * Handles the form submission to either add or modify a medication.
   * Based on the medicament state, it either calls the modifierMedicamente or ajouterMedicament method.
   * @returns {Promise<void>}
   */
  async onSubmit(): Promise<void> {
    console.log("Form submited medicament/create/",this.formGroup.value)
    if(this.formGroup.valid){
      if(this.medicament()) await this.modifierMedicamente()
      else await this.ajouterMedicament()
    }
    
  }

}
