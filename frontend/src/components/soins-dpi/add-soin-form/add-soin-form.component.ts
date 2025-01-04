import { Component, inject, input, output, signal } from '@angular/core';
import { MedicamentsComponent } from "../medicaments/medicaments.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { AjouterMedicamentComponent } from "../ajouter-medicament/ajouter-medicament.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import SoinInfermier from '../../../models/SoinInfermier';
import { SoinsInfermiersService } from '../../../services/soins-infermiers.service';
import { UserIndicatorsServiceService } from '../../../services/user-indicators-service.service';
import axios from 'axios';
import { UserRoleService } from '../../../services/user-role.service';

/**
 * Component to handle the creation of a new "soin infermier" (nursing care) record.
 * Provides a form for adding nursing care details and includes options to manage medications.
 * 
 * @component
 */
@Component({
  selector: 'app-add-soin-form',
  standalone: true,
  imports: [MedicamentsComponent, FontAwesomeModule, AjouterMedicamentComponent, ReactiveFormsModule],
  templateUrl: './add-soin-form.component.html',
  styleUrl: './add-soin-form.component.css'
})
export class AddSoinFormComponent {

  /**
   * The service for managing soins infermiers data.
   * @type {SoinsInfermiersService}
   */
  soinsInfermiersService = inject(SoinsInfermiersService)


  /**
   * FontAwesome icon for the "plus circle" icon.
   * @type {IconDefinition}
   */
  faPlusCircle=faPlusCircle


  /**
   * Event emitter for closing the form.
   * @type {EventEmitter<void>}
   */
  closeEvent = output()


  /**
   * Signal for managing navigation to the next step.
   * @type {Signal<boolean>}
   */
  next = signal(false)


  /**
   * Signal for showing the "ajouter medicament" modal.
   * @type {Signal<boolean>}
   */
  ajouterMed = signal(false)


  /**
   * ID of the created soin (nursing care) record.
   * @type {number}
   */
  soinId !: number

  /**
     * Constructor for initializing the component and injecting services.
     * 
     * @param {UserIndicatorsServiceService} userIndicatorService - Service for managing user indicators (loading, success, error states).
     * @param {UserRoleService} userRoleService - Service for managing user roles and permissions.
     */
  constructor(
    public userIndicatorService: UserIndicatorsServiceService,
    public userRoleService: UserRoleService
  ) {}

  /**
   * Reactive form group to manage form controls and validation for the nursing care record.
   * @type {FormGroup}
   */
  formGroup = new FormGroup({
    date: new FormControl('',[Validators.required]),
    heure: new FormControl('',[Validators.required]),
    soin_realise: new FormControl('',[Validators.required]),
    observation: new FormControl('',[Validators.required]),
    dossier: new FormControl(this.soinsInfermiersService.dpiId,[Validators.required]),
    infirmier: new FormControl(localStorage.getItem('technicianID'),[Validators.required]),
  })


  /**
   * Emits an event to close the form when triggered.
   * 
   * @returns {void}
   */
  closeAddSoin(){
    this.closeEvent.emit() ;
  }


  /**
   * Advances to the next step in the form process.
   * 
   * @param {Event} event - The event that triggered the method.
   * @returns {void}
   */
  nextStep(event: Event){
    event.stopPropagation();
    this.next.set(true)
  }



  /**
   * Opens the "ajouter medicament" modal to add medications to the nursing care record.
   * 
   * @param {Event} event - The event that triggered the method.
   * @returns {void}
   */
  openAjouterMedicament(event: Event){
    event.stopPropagation();
    this.ajouterMed.set(true)
  }



  /**
   * Closes the "ajouter medicament" modal.
   * 
   * @returns {void}
   */
  closeAjouterMedicament(){
    this.ajouterMed.set(false)
  }


  /**
   * Submits the form to create a new "soin infermier" record.
   * It includes validation, API request, and success/error handling.
   * 
   * @param {Event} event - The event that triggered the form submission.
   * @returns {void}
   */
  async onSubmit(event: Event){
    
    if(this.formGroup.valid){
      try {
        this.userIndicatorService.loadingData.set({
          isLoading: true,
          loadingMessage: 'Création en cours...'
        })

        const res = await axios.post('http://localhost:8000/traitements/soin-infermier/create/', this.formGroup.value,{
          headers: {
            Authorization: 'Bearer '+localStorage.getItem('accessToken')
          }
        })

        console.log(res.data)
        if(res.status === 201){
          this.userIndicatorService.sucessData.set({
            isSuccess: true,
            successMessage: 'Soin créé avec succès'
          })

          const updatedData = this.soinsInfermiersService.soinsInfermiers()
          updatedData.push(res.data)
          this.soinsInfermiersService.soinsInfermiers.set(updatedData)
          this.soinId = res.data.id

          this.nextStep(event)
        }
        else{
          this.userIndicatorService.errorData.set({
            isError: true,
            errorMessage: 'Erreur lors de la création du soin'
          })
        }
      } 
      catch (error) {
        console.log(error)
        this.userIndicatorService.errorData.set({
          isError: true,
          errorMessage: 'Erreur lors de la création du soin'
        })
      }
      finally{
        this.userIndicatorService.loadingData.set({
          isLoading: false,
          loadingMessage: 'Chargement...'
        })
      }
    }

  }

}
