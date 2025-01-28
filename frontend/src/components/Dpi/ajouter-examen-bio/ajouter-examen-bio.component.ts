

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule  } from '@angular/material/dialog';
import { MatDialogContent } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDialogActions } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { ConsultationService } from '../../services/consultation.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrdonnanceService } from '../../services/ordonnance.service';
import { Medicament } from '../../services/ordonnance.service';
import axios from 'axios';
import { Component, inject, input, output  , signal , Input} from '@angular/core';
import { UserIndicatorsServiceServiceService } from '../../services/user-indicators-service.service.service';


@Component({
  selector: 'app-ajouter-examen-bio',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './ajouter-examen-bio.component.html',
  styleUrl: './ajouter-examen-bio.component.css'
})
export class AjouterExamenBioComponent {
  formGroup = new FormGroup({
    date: new FormControl ( '', Validators.required), // matches "date" field
      technicien: new FormControl (1, Validators.required), 
      description: new FormControl ( 'descriptionn', Validators.required), 
      dossier_patient: new FormControl(1, Validators.required), // matches "dossier" field (default is 1 for example)
  })

  constructor(public userIndicatorService: UserIndicatorsServiceServiceService ,  private dialogRef: MatDialogRef<AjouterExamenBioComponent>){
   
  }
  async onSubmit(event: Event){
    
    if(this.formGroup.valid){
      try {
        this.userIndicatorService.loadingData.set({
          isLoading: true,
          loadingMessage: 'Création en cours...'
        })

        const res = await axios.post('http://127.0.0.1:7000/examens/examens_biologiques/',{
            
          date : this.formGroup.value.date,
          technicien : this.formGroup.value.technicien,
          description : this.formGroup.value.description,
          dossier_patient : this.formGroup.value.dossier_patient,
        
        },{
          headers:{
            Authorization: 'Bearer '+ 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxMDM3NTgyNzA0NywiaWF0IjoxNzM1OTEzNDQ3LCJqdGkiOiIzNjYxZTUzOTNmNDY0Y2FiOTgzNDRkNTc1NmI5ZDU4MiIsInVzZXJfaWQiOjExLCJyb2xlIjoidGVjaG5pY2llbiJ9.Fx8pjxnpHagNRzE7JfJByeNExgEhe6rJ6kjYmePEEvU'
          }
        })
  

        console.log(res.data)
      
        
        if(res.status === 201){
          this.userIndicatorService.sucessData.set({
            isSuccess: true,
            successMessage: 'Consultation créé avec succès'
          })

        
        }
        else{
          this.userIndicatorService.errorData.set({
            isError: true,
            errorMessage: 'Erreur lors de la création de la consultation'
          })
        }
      } 
      catch (error) {
        console.log(error);    
        this.userIndicatorService.errorData.set({
          isError: true,
          errorMessage: 'Erreur lors de la création de la consultation'
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
