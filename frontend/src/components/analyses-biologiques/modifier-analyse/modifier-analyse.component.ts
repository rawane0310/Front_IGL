import { Component, inject, input, output } from '@angular/core';
import { AnalyseBiologique } from '../../../models/Examen';
import { AnalysesBiologiquesService } from '../../../services/analyses-biologiques.service';
import { UserIndicatorsServiceService } from '../../../services/user-indicators-service.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-modifier-analyse',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modifier-analyse.component.html',
  styleUrl: './modifier-analyse.component.css'
})
export class ModifierAnalyseComponent {
  analysesBiologiquesService = inject(AnalysesBiologiquesService)

  closeEvent = output()

  analyse = input.required<AnalyseBiologique>()
  formGroup !: FormGroup

  constructor(public userIndicatorService: UserIndicatorsServiceService){}

  ngOnInit(){
   this.formGroup = new FormGroup({
    date : new FormControl(this.analyse().date, [Validators.required]),
    description : new FormControl(this.analyse().description, [Validators.required]),
    dossier_patient : new FormControl(this.analysesBiologiquesService.dpiId, [Validators.required]),
   }) 
  }

  closeModify():void{
    this.closeEvent.emit()
  }

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
