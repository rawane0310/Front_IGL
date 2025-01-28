import { Component,  inject, input, output, signal  } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, FormArray, Validators , FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { AjouterOrdonnanceComponent } from '../ajouter-ordonnance/ajouter-ordonnance.component';
import { MatDialog , MatDialogRef } from '@angular/material/dialog';
import { ConsultationService } from '../../services/consultation.service';
import axios from 'axios';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { UserIndicatorsServiceServiceService } from '../../services/user-indicators-service.service.service';
import { AjouterResumeComponent } from '../ajouter-resume/ajouter-resume.component';
@Component({
  selector: 'app-ajouter-consultation',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatDialogModule, AjouterResumeComponent],
  templateUrl: './ajouter-consultation.component.html',
  styleUrl: './ajouter-consultation.component.css'
})
export class AjouterConsultationComponent {

  consultationService = inject(ConsultationService)

  

 
  closeEvent = output() //to close the form
  next = signal(false)
  ajouterRes = signal(false)

consultationId !: number
consId !:number
consultationDate!:string
consDate!: string

  constructor(public userIndicatorService: UserIndicatorsServiceServiceService ,  private dialogRef: MatDialogRef<AjouterConsultationComponent>){
   
  }
  

  formGroup = new FormGroup({
    date: new FormControl ( ['', Validators.required]), // matches "date" field
      medecin: new FormControl (['', Validators.required]), // matches "medecin" field
      diagnosticStatut: new FormControl ( [false, Validators.required]), // matches "diagnosticsStatut" field
      dossier: new FormControl(1, Validators.required), // matches "dossier" field (default is 1 for example)
  })


  closeAddConsultation(){
    this.closeEvent.emit() ;
  }

  nextStep(event: Event){
    event.stopPropagation();
    this.next.set(true)
  }

  showConsultationForm: boolean = true; // Controls the consultation form visibility
  showResumeForm: boolean = false; // Controls the resume form visibility

  // Close Consultation Form
  closeConsultationForm() {
    this.showConsultationForm = false;
  }

  // Move to Resume Form (close consultation form and open resume form)
  openResumeForm() {
   

     // Set consultation form visibility to false
  this.showConsultationForm = false;
  
  // Set résumé form visibility to true
  this.showResumeForm = true;


  }

  // Close Resume Form
  closeResumeForm() {
    this.showResumeForm = false;
  }


 



  closeAjouterResume(){
    this.ajouterRes.set(false)
  }
  
  openAjouterResume(event: Event){
    event.stopPropagation();
    this.ajouterRes.set(true)
  }
 

  async onSubmit(event: Event){
    
    if(this.formGroup.valid){
      try {
        this.userIndicatorService.loadingData.set({
          isLoading: true,
          loadingMessage: 'Création en cours...'
        })

        const res = await axios.post('http://127.0.0.1:7000/consultations/consultation/create/', this.formGroup.value,{
          headers: {
            Authorization: 'Bearer '+ 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxMDM3NTgyNzA0NywiaWF0IjoxNzM1OTEzNDQ3LCJqdGkiOiIzNjYxZTUzOTNmNDY0Y2FiOTgzNDRkNTc1NmI5ZDU4MiIsInVzZXJfaWQiOjExLCJyb2xlIjoidGVjaG5pY2llbiJ9.Fx8pjxnpHagNRzE7JfJByeNExgEhe6rJ6kjYmePEEvU'
          }
        })

        console.log(res.data)
        this.consultationId = res.data.id
        this.consultationDate=res.data.date
        console.log('Consultation ID in terminal (DevTools):', this.consultationId);
        if(res.status === 201){
          this.userIndicatorService.sucessData.set({
            isSuccess: true,
            successMessage: 'Consultation créé avec succès'
          })

          const updatedData = this.consultationService.consultations()
          updatedData.push(res.data)
          this.consultationService.consultations.set(updatedData)
         
          this.nextStep(event)
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

    this.consId=this.consultationId
    this.consDate=this.consultationDate
   
  }
  

  

   
}