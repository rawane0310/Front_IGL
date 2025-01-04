import { Component, inject, input, output } from '@angular/core';
import SoinInfermier from '../../../models/SoinInfermier';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserIndicatorsServiceService } from '../../../services/user-indicators-service.service';
import axios from 'axios';
import { SoinsInfermiersService } from '../../../services/soins-infermiers.service';


/**
 * A component that allows the modification of a nurse's care (soin). It includes a form where users can update details
 * like the date, time, observation, and other care-related data for a specific care instance.
 * 
 * @component
 * 
 * @property {SoinInfermier} soin - The care instance that is being modified. This is a required input.
 * @property {FormGroup} formGroup - The form group used for managing the form controls and validation.
 * @property {Signal<boolean>} modifierSoinCloseEvent - A signal to emit when the user wants to close the form. This will notify the parent component.
 * 
 * @method ngOnInit - Initializes the form with the data from the selected care instance (`soin`). This sets the form controls based on the input values.
 * @method closeSoin - Emits the `modifierSoinCloseEvent` to notify the parent component to close the form.
 * @method onSubmit - Handles the form submission. It sends an HTTP PUT request to modify the care instance and updates the local data on success.
 * @method constructor - Initializes the component and injects the required services for user indicators and soins management.
 */
@Component({
  selector: 'app-modifier-soin',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modifier-soin.component.html',
  styleUrl: './modifier-soin.component.css'
})
export class ModifierSoinComponent {

  /** 
   * The service that manages the list of soins (nurse's care).
   * @type {SoinsInfermiersService}
   */
  soinsInfermiersService = inject(SoinsInfermiersService)


  /** 
   * A signal that will emit when the modification form should be closed.
   * @type {Signal<void>}
   */
  modifierSoinCloseEvent = output()


  /**
   * The care instance being modified. This is a required input.
   * @type {SoinInfermier}
   */
  soin = input.required<SoinInfermier>()


  /** 
   * The form group used to manage the modification form.
   * @type {FormGroup}
   */
  formGroup ! :  FormGroup;


  /**
   * Constructor for the `ModifierSoinComponent`. It injects the necessary services for handling user indicators.
   * 
   * @param {UserIndicatorsServiceService} userIndicatorService - The service for managing user indicators (loading, success, error messages).
   */
  constructor(public userIndicatorService: UserIndicatorsServiceService){}


  /**
   * Initializes the form with the values from the selected care instance (`soin`).
   * Sets up the form controls with the required validators and existing values.
   */
  ngOnInit() {
    const soinValue = this.soin(); // Access the input value dynamically
    this.formGroup = new FormGroup({
      date: new FormControl(soinValue.date || '', [Validators.required]),
      heure: new FormControl(soinValue.heure || '',[Validators.required]),
      observation: new FormControl(soinValue.observation || '',[Validators.required]),
      soin_realise: new FormControl(soinValue.soin_realise || '',[Validators.required]),
      dossier: new FormControl(soinValue.dossier_id || ''),
      infirmier_id: new FormControl(soinValue.infirmier_id || ''),
    });
  }


  /**
   * Emits the `modifierSoinCloseEvent` to notify the parent component that the form should be closed.
   */
  closeSoin(){
    this.modifierSoinCloseEvent.emit()
  }


  /**
   * Handles the form submission. If the form is valid, sends an HTTP PUT request to modify the care instance.
   * 
   * @param {Event} event - The form submit event.
   */
  async onSubmit(event: Event) {
    event.preventDefault();

    if (this.formGroup.valid) {
      console.log('Form submitted:', this.formGroup.value);

      try {
        this.userIndicatorService.loadingData.set({
          isLoading: true,
          loadingMessage: 'Modification en cours...'
        })
      
        const res = await axios.put('http://localhost:8000/traitements/soin-infirmier/'+this.soin().id+'/modify/',this.formGroup.value,{
          headers:{
            Authorization: 'Bearer '+localStorage.getItem('accessToken')
          }
        })

        console.log(res.data)
        if(res.status === 200){ 
          this.userIndicatorService.sucessData.set({
            isSuccess: true,
            successMessage: 'Soin modifié avec succès'
          }) 

          const updatedData = {
            date: this.formGroup.value.date,
            heure: this.formGroup.value.heure,
            observation: this.formGroup.value.observation,
            soin_realise: this.formGroup.value.soin_realise,
            dossier_id: this.formGroup.value.dossier,
            infirmier_id: this.formGroup.value.infirmier_id,
          }

          this.soinsInfermiersService.soinsInfermiers.set(
            this.soinsInfermiersService.soinsInfermiers().map(soin =>
              soin.id === this.soin().id ? { ...soin, ...updatedData } : soin
            )
          )
          
        }
        else this.userIndicatorService.errorData.set({
          isError: true,
          errorMessage: 'Erreur lors de la modification du soin'
        })
        
      } 
      catch (error) {
        console.log(error)
        this.userIndicatorService.errorData.set({
          isError: true,
          errorMessage: 'Erreur lors de la modification du soin'
        })
      }
      finally{
        this.userIndicatorService.loadingData.set({
          isLoading: false,
          loadingMessage: 'Chargement ...'
        })
        this.closeSoin();
      }
    } 
  }
}
