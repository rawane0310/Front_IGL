import { Component, inject, input, output } from '@angular/core';
import { AnalyseBiologique } from '../../../models/Examen';
import { AnalysesBiologiquesService } from '../../../services/analyses-biologiques.service';
import { UserIndicatorsServiceService } from '../../../services/user-indicators-service.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import axios from 'axios';

/**
 * Component to modify an existing biological analysis.
 * Uses a reactive form to capture updates and communicates with a backend API.
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
   */
  analysesBiologiquesService = inject(AnalysesBiologiquesService)

  /**
   * Output event emitter to notify the parent component when the dialog is closed.
   */
  closeEvent = output()

  /**
   * Input containing the current analysis to be modified.
   */
  analyse = input.required<AnalyseBiologique>()

  /**
   * Reactive form group for the analysis modification form.
   */
  formGroup !: FormGroup


  /**
   * Constructor to inject the user indicator service.
   * @param userIndicatorService Service for handling user feedback and indicators.
   */
  constructor(public userIndicatorService: UserIndicatorsServiceService){}



  /**
   * Initializes the form group with existing analysis data.
   * This lifecycle hook is called when the component is initialized.
   */
  ngOnInit(){
   this.formGroup = new FormGroup({
    date : new FormControl(this.analyse().date, [Validators.required]),
    description : new FormControl(this.analyse().description, [Validators.required]),
    dossier_patient : new FormControl(this.analysesBiologiquesService.dpiId, [Validators.required]),
   }) 
  }



  /**
   * Closes the modification dialog and emits the `closeEvent`.
   */
  closeModify():void{
    this.closeEvent.emit()
  }



  /**
   * Handles the form submission to update the analysis.
   * Sends a PUT request to the backend with the updated analysis data.
   * @param event The submit event triggered by the form.
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
