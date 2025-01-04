import { Component, inject, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExamensRadiologiquesService } from '../../../services/examens-radiologiques.service';
import { ExamenRadiologique } from '../../../models/Examen';
import { UserIndicatorsServiceService } from '../../../services/user-indicators-service.service';
import axios from 'axios';


/**
 * Component for modifying a radiological exam report.
 */
@Component({
  selector: 'app-modifier-compte-rendu',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modifier-compte-rendu.component.html',
  styleUrl: './modifier-compte-rendu.component.css'
})
export class ModifierCompteRenduComponent {

  /**
   * Service for managing radiological exams.
   */
  examensRadiologiquesService = inject(ExamensRadiologiquesService)
  

  /**
   * Event emitter for notifying parent components when the modification dialog is closed.
   */
  closeEvent = output()


  /**
   * Input representing the radiological exam being modified.
   * Must adhere to the `ExamenRadiologique` model.
   */
  examen = input.required<ExamenRadiologique>()


  /**
   * Reactive form group for managing form controls and validation.
   */
  formGroup !: FormGroup



  /**
   * Constructor for injecting the UserIndicatorsServiceService.
   * @param userIndicatorService Service for displaying loading, success, or error indicators.
   */
  constructor(
    public userIndicatorService: UserIndicatorsServiceService
  ){}


  /**
   * Lifecycle hook for initializing the component.
   * Configures the form group with default values and validators.
   */
  ngOnInit(){
  this.formGroup = new FormGroup({
    /**
     * Form control for the report content (compte rendu).
     * Initialized with the current exam's report value.
     * Validation: Required.
     */
    compte_rendu: new FormControl(this.examen().compte_rendu,[Validators.required]),

    /**
     * Form control for the exam ID.
     * Initialized with the current exam's ID.
     * Validation: Required.
     */
    examen_radiologique: new FormControl(this.examen().id, [Validators.required]),

    /**
     * Form control for the patient file associated with the exam.
     * Validation: Required.
     */
    dossier_patient: new FormControl( this.examen().dossier_patient, [Validators.required]),

    /**
     * Form control for the exam date.
     * Validation: Required.
     */
    date: new FormControl(this.examen().date, [Validators.required]),

    /**
     * Form control for the radiologist performing the modification.
     * Initialized with the technician ID from local storage.
     * Validation: Required.
     */
    radiologue: new FormControl(localStorage.getItem('technicianID'),[Validators.required]),
  })
  }


  /**
   * Closes the modification dialog by emitting a close event.
   */
  closeModify(): void{
    this.closeEvent.emit()
  }



  /**
   * Submits the form to update the report.
   * Sends a PUT request to the API with the updated report data.
   * @param event The DOM event triggered by the form submission.
   */
  async onSubmit(event: Event){
    if(this.formGroup.valid){
      console.log(this.formGroup.value)

      try {
        this.userIndicatorService.loadingData.set({
          isLoading: true,
          loadingMessage: 'Modification du compte rendu en cours...'
        })

        const res = await axios.put('http://localhost:8000/examens/examen_radiologique/'+this.examen().id+'/',this.formGroup.value,{
          headers:{
            Authorization: 'Bearer '+localStorage.getItem('accessToken')
          }
        })
        console.log(res.data)
        if(res.status === 200){ 
          this.userIndicatorService.sucessData.set({
            isSuccess: true,
            successMessage: 'Compte rendu modifié avec succès'
          }) 

          const updatedData = res.data

          this.examensRadiologiquesService.examensRadiologiques.set(
            this.examensRadiologiquesService.examensRadiologiques().map(e =>
              e.id === this.examen().id ? { ...e, ...updatedData } : e
            )
          )
          
        }
        else this.userIndicatorService.errorData.set({
          isError: true,
          errorMessage: 'Erreur lors de la modification du compte rendu'
        })
        
      }
      catch (error) {
        console.log(error)
        this.userIndicatorService.errorData.set({
          isError: true,
          errorMessage: 'Erreur lors de la modification du compte rendu'
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
