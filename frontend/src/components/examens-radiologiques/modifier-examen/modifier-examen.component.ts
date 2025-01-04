import { Component, inject, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExamensRadiologiquesService } from '../../../services/examens-radiologiques.service';
import { UserIndicatorsServiceService } from '../../../services/user-indicators-service.service';
import { ExamenRadiologique } from '../../../models/Examen';
import axios from 'axios';

/**
 * Component for modifying a radiological exam.
 */
@Component({
  selector: 'app-modifier-examen',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modifier-examen.component.html',
  styleUrl: './modifier-examen.component.css'
})
export class ModifierExamenComponent {


  /**
   * Service for managing radiological exams.
   */
  examensRadiologiquesService = inject(ExamensRadiologiquesService)



  /**
   * Constructor for injecting the UserIndicatorsServiceService.
   * @param userIndicatorService Service for managing loading, success, and error indicators.
   */
  constructor(public userIndicatorService: UserIndicatorsServiceService){}


  /**
   * Event emitter to notify parent components when the modification dialog is closed.
   */
  closeEvent = output()


  /**
   * Input representing the radiological exam to be modified.
   * Must follow the `ExamenRadiologique` model.
   */
  examen = input.required<ExamenRadiologique>()


  /**
   * Reactive form group for managing form controls and validation.
   */
  formGroup! : FormGroup


  /**
   * Closes the modification dialog and emits a close event.
   */
  closeModify():void{
    this.closeEvent.emit()
  }


  /**
   * Lifecycle hook for initializing the component.
   * Configures the reactive form with default values and validation rules.
   */
  ngOnInit(){
   this.formGroup = new FormGroup({

    /**
     * Form control for the exam date.
     * Validation: Required.
     */
    date : new FormControl(this.examen().date, [Validators.required]),

    /**
     * Form control for the exam description.
     * Validation: Required.
     */
    description : new FormControl(this.examen().description, [Validators.required]),

    /**
     * Form control for the patient dossier ID.
     * Uses the current `dpiId` from the service.
     * Validation: Required.
     */
    dossier_patient : new FormControl(this.examensRadiologiquesService.dpiId, [Validators.required]),
   }) 
  }


  /**
   * Handles form submission to update the radiological exam.
   * Sends a PUT request to the API with the updated form values.
   * @param event The DOM event triggered by the form submission.
   */
  async onSubmit(event: Event){
    // Ensure the form is valid before proceeding
    if(this.formGroup.valid){
      console.log(this.formGroup.value)

      try {
        // Display a loading indicator
        this.userIndicatorService.loadingData.set({
          isLoading: true,
          loadingMessage: 'Modification en cours...'
        })

        // Send a PUT request to update the exam
        const res = await axios.put('http://localhost:8000/examens/examen_radiologique/'+this.examen().id+'/',this.formGroup.value,{
          headers:{
            Authorization: 'Bearer '+localStorage.getItem('accessToken')
          }
        })
        console.log(res.data)
        if(res.status === 200){ 
          // Display a success message
          this.userIndicatorService.sucessData.set({
            isSuccess: true,
            successMessage: 'Examen radiologique modifié avec succès'
          }) 
          
          // Prepare updated data for the exam
          const updatedData = {
            date: this.formGroup.value.date,
            description: this.formGroup.value.description,
          }

          // Update the exam list in the service with the modified exam
          this.examensRadiologiquesService.examensRadiologiques.set(
            this.examensRadiologiquesService.examensRadiologiques().map(e =>
              e.id === this.examen().id ? { ...e, ...updatedData } : e
            )
          )
          
        } 
        // Handle cases where the response status is not 200
        else this.userIndicatorService.errorData.set({
          isError: true,
          errorMessage: 'Erreur lors de la modification de l\'examen '
        })
        
      }
      catch (error) {
        // Log errors and display an error message
        console.log(error)
        this.userIndicatorService.errorData.set({
          isError: true,
          errorMessage: 'Erreur lors de la modification de l\'examen'
        })
      }
      finally{
        // Reset loading indicator and close the modification dialog
        this.userIndicatorService.loadingData.set({
          isLoading: false,
          loadingMessage: 'Chargement... '
        })
        this.closeModify()
      }
    }
  }



}
