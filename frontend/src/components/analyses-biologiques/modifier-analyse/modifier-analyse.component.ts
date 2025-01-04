import { Component, inject, input, output } from '@angular/core';
import { AnalyseBiologique } from '../../../models/Examen';
import { AnalysesBiologiquesService } from '../../../services/analyses-biologiques.service';
import { UserIndicatorsServiceService } from '../../../services/user-indicators-service.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import axios from 'axios';

/**
 * Component to modify an existing biological analysis.
 * Uses a reactive form to capture updates and communicates with a backend API.
 * @component
 */
@Component({
  selector: 'app-modifier-analyse',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modifier-analyse.component.html',
  styleUrl: './modifier-analyse.component.css'
})
export class ModifierAnalyseComponent {

  /**
   * Injected service for managing biological analyses.
   * This service allows interacting with the biological analyses data.
   * 
   * @type {AnalysesBiologiquesService}
   */
  analysesBiologiquesService = inject(AnalysesBiologiquesService)

  /**
   * Output event emitter to notify the parent component when the modification dialog is closed.
   * This event is triggered when the modification process is completed or cancelled.
   * 
   * @output
   * @type {EventEmitter<void>}
   */
  closeEvent = output()

  /**
   * Input containing the current biological analysis to be modified.
   * This input is required to initialize the form with the existing data of the analysis.
   * 
   * @input
   * @type {AnalyseBiologique}
   */
  analyse = input.required<AnalyseBiologique>()

  /**
   * Reactive form group for the analysis modification form.
   * It contains the fields for modifying the analysis data, such as date and description.
   * 
   * @type {FormGroup}
   */
  formGroup !: FormGroup


  /**
   * Constructor to inject the user indicator service for loading and error messages.
   * 
   * @param {UserIndicatorsServiceService} userIndicatorService Service for handling user feedback, including success, error, and loading states.
   */
  constructor(public userIndicatorService: UserIndicatorsServiceService){}



  /**
   * Initializes the form group with the existing analysis data when the component is loaded.
   * This lifecycle hook is invoked upon component initialization to pre-populate the form.
   * 
   * @returns {void}
   */
  ngOnInit(){
   this.formGroup = new FormGroup({
    date : new FormControl(this.analyse().date, [Validators.required]),
    description : new FormControl(this.analyse().description, [Validators.required]),
    dossier_patient : new FormControl(this.analysesBiologiquesService.dpiId, [Validators.required]),
   }) 
  }



  /**
   * Closes the modification dialog and emits the `closeEvent` to inform the parent component.
   * This method is used when the user cancels or finishes modifying the analysis.
   * 
   * @returns {void}
   */
  closeModify():void{
    this.closeEvent.emit()
  }



   /**
   * Handles the form submission to update the biological analysis.
   * Validates the form and sends a PUT request to the backend API with the updated analysis data.
   * Displays appropriate user feedback messages based on the request result.
   * 
   * @param {Event} event The submit event triggered when the user submits the form.
   * 
   * @returns {Promise<void>} A promise indicating the result of the submission operation.
   */
  async onSubmit(event: Event){
    if(this.formGroup.valid){
      console.log(this.formGroup.value)

      try {
        this.userIndicatorService.loadingData.set({
          isLoading: true,
          loadingMessage: 'Modification en cours...'
        })

        const res = await axios.put('http://localhost:8000/examens/examen_biologique/'+this.analyse().id+'/',this.formGroup.value,{
          headers:{
            Authorization: 'Bearer '+localStorage.getItem('accessToken')
          }
        })
        console.log(res.data)
        if(res.status === 200){ 
          this.userIndicatorService.sucessData.set({
            isSuccess: true,
            successMessage: 'Analyse biologique modifié avec succès'
          }) 

          const updatedData = {
            date: this.formGroup.value.date,
            description: this.formGroup.value.description,
          }

          this.analysesBiologiquesService.AnalysesBiologiques.set(
            this.analysesBiologiquesService.AnalysesBiologiques().map(analyse =>
              analyse.id === this.analyse().id ? { ...analyse, ...updatedData } : analyse
            )
          )
          
        }
        else this.userIndicatorService.errorData.set({
          isError: true,
          errorMessage: 'Erreur lors de la modification de l\'analyse biologique'
        })
        
      }
      catch (error) {
        console.log(error)
        this.userIndicatorService.errorData.set({
          isError: true,
          errorMessage: 'Erreur lors de la modification de l\'analyse biologique'
        })
      }
      finally{
        this.userIndicatorService.loadingData.set({
          isLoading: false,
          loadingMessage: 'Chargement... '
        })
        this.closeModify()
      }
    }
  }

}
