import { Component, inject, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExamensRadiologiquesService } from '../../../services/examens-radiologiques.service';
import { ExamenRadiologique } from '../../../models/Examen';
import { UserIndicatorsServiceService } from '../../../services/user-indicators-service.service';
import axios from 'axios';

@Component({
  selector: 'app-modifier-compte-rendu',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modifier-compte-rendu.component.html',
  styleUrl: './modifier-compte-rendu.component.css'
})
export class ModifierCompteRenduComponent {
  examensRadiologiquesService = inject(ExamensRadiologiquesService)
  
  closeEvent = output()
  examen = input.required<ExamenRadiologique>()
  constructor(public userIndicatorService: UserIndicatorsServiceService){}
  
  formGroup !: FormGroup

  ngOnInit(){
  this.formGroup = new FormGroup({
    compte_rendu: new FormControl(this.examen().compte_rendu,[Validators.required]),
    examen_radiologique: new FormControl(this.examen().id, [Validators.required]),
    dossier_patient: new FormControl( this.examen().dossier_patient, [Validators.required]),
    date: new FormControl(this.examen().date, [Validators.required]),
    radiologue: new FormControl(localStorage.getItem('technicianID'),[Validators.required]),
  })
  }

  closeModify(): void{
    this.closeEvent.emit()
  }

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
