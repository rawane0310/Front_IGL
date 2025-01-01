import { Component, inject, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExamensRadiologiquesService } from '../../../services/examens-radiologiques.service';
import { UserIndicatorsServiceService } from '../../../services/user-indicators-service.service';
import { ExamenRadiologique } from '../../../models/Examen';
import axios from 'axios';

@Component({
  selector: 'app-modifier-examen',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modifier-examen.component.html',
  styleUrl: './modifier-examen.component.css'
})
export class ModifierExamenComponent {
  examensRadiologiquesService = inject(ExamensRadiologiquesService)

  constructor(public userIndicatorService: UserIndicatorsServiceService){}
  closeEvent = output()
  examen = input.required<ExamenRadiologique>()
  formGroup! : FormGroup
  closeModify():void{
    this.closeEvent.emit()
  }

  ngOnInit(){
   this.formGroup = new FormGroup({
    date : new FormControl(this.examen().date, [Validators.required]),
    description : new FormControl(this.examen().description, [Validators.required]),
    dossier_patient : new FormControl(this.examensRadiologiquesService.dpiId, [Validators.required]),
   }) 
  }

  async onSubmit(event: Event){
    if(this.formGroup.valid){
      console.log(this.formGroup.value)

      try {
        this.userIndicatorService.loadingData.set({
          isLoading: true,
          loadingMessage: 'Modification en cours...'
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
            successMessage: 'Examen radiologique modifié avec succès'
          }) 

          const updatedData = {
            date: this.formGroup.value.date,
            description: this.formGroup.value.description,
          }

          this.examensRadiologiquesService.examensRadiologiques.set(
            this.examensRadiologiquesService.examensRadiologiques().map(e =>
              e.id === this.examen().id ? { ...e, ...updatedData } : e
            )
          )
          
        }
        else this.userIndicatorService.errorData.set({
          isError: true,
          errorMessage: 'Erreur lors de la modification de l\'examen '
        })
        
      }
      catch (error) {
        console.log(error)
        this.userIndicatorService.errorData.set({
          isError: true,
          errorMessage: 'Erreur lors de la modification de l\'examen'
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
