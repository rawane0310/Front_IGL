import { MatDialogActions } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog , MatDialogRef } from '@angular/material/dialog';
import { Component, inject, input, output  , signal , Input} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators , FormsModule } from '@angular/forms';
import { UserIndicatorsServiceServiceService } from '../../services/user-indicators-service.service.service';
import { ResumeServiceService 
} from '../../services/resume-service.service';
import { MedicamentsComponent } from '../medicaments/medicaments.component';
import { AjouterOrdonnanceComponent } from '../ajouter-ordonnance/ajouter-ordonnance.component';
import axios from 'axios';
import { Resume } from '../../services/resume-service.service';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-ajouter-resume',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogActions, CommonModule, MatDialogModule, FormsModule, AjouterOrdonnanceComponent, MedicamentsComponent],
  templateUrl: './ajouter-resume.component.html',
  styleUrl: './ajouter-resume.component.css'
})


export class AjouterResumeComponent {
   

  next = signal(false)
  faPlusCircle=faPlusCircle
  closeEvent = output()
  ajouterRes = signal(false)
  
  
 
  resumeService = inject(ResumeServiceService)
  ajouterResCloseEvent = output()
  @Input() consId!: number; // Accepts consultationId from parent
  @Input() consDate!: string; // Accepts consultationId from parent
  resume = input<Resume>()
  formGroup !: FormGroup

  constructor(public userIndicatorService: UserIndicatorsServiceServiceService,  private dialogRef: MatDialogRef<AjouterResumeComponent>) { }
  closeAjouterRes(): void{
    this.ajouterResCloseEvent.emit()
  }
   
  ngOnInit(): void{
    console.log("consultation date"+this.consDate)
    console.log(' bouchra Consultation ID in terminal (DevTools):', this.consId);
    this.formGroup = new FormGroup({
      diagnostic: new FormControl(this.resume()?.diagnostic || '',[Validators.required]),
      symptomes: new FormControl(this.resume()?.symptomes || '',[Validators.required]) ,
      mesures_prises: new FormControl(this.resume()?.mesures_prises || '',[Validators.required]),
      date_prochaine_consultation: new FormControl(this.resume()?.date_prochaine_consultation || '',[Validators.required]),
     
    })
  }

  ajouterMed = signal(false)
  
  closeAddConsultation(){
    this.closeEvent.emit() ;
  }

  nextStep(event: Event){
    event.stopPropagation();
    this.next.set(true)
  }

  openAjouterResumer(event: Event){
    event.stopPropagation();
    this.ajouterRes.set(true)
  }

  closeAjouterResume(){
    this.dialogRef.close('closed');
  }

  closeAjouterMedicament(){
    this.ajouterMed.set(false)
  }

  openAjouterMedicament(event: Event){
    event.stopPropagation();
    this.ajouterMed.set(true)
  }

 
    

  
  async ajouterResume(event: Event): Promise<void>{
    try {
      this.userIndicatorService.loadingData.set({
        isLoading: true,
        loadingMessage: 'Création en cours...'
      })
      
      const res = await axios.post('http://127.0.0.1:7000/consultations/resume/create/',{
       
        diagnostic : this.formGroup.value.diagnostic,
        symptomes : this.formGroup.value.symptomes,
        mesures_prises : this.formGroup.value.mesures_prises,
        date_prochaine_consultation : this.formGroup.value.date_prochaine_consultation,
        
      },{
        headers:{
          Authorization: 'Bearer '+ 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxMDM3NTgyNzA0NywiaWF0IjoxNzM1OTEzNDQ3LCJqdGkiOiIzNjYxZTUzOTNmNDY0Y2FiOTgzNDRkNTc1NmI5ZDU4MiIsInVzZXJfaWQiOjExLCJyb2xlIjoidGVjaG5pY2llbiJ9.Fx8pjxnpHagNRzE7JfJByeNExgEhe6rJ6kjYmePEEvU'
        }
      })

      console.log(res.data)
      const resId=res.data.id
      if(res.status === 201){
      try {
        this.userIndicatorService.loadingData.set({
          isLoading: true,
          loadingMessage: 'Modification en cours...'
        })
        
        const res = await axios.put('http://127.0.0.1:7000/consultations/consultation/'+this.consId+'/modify/',{
         resume: resId
        },{
          headers:{
            Authorization: 'Bearer '+ 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxMDM3NTgyNzA0NywiaWF0IjoxNzM1OTEzNDQ3LCJqdGkiOiIzNjYxZTUzOTNmNDY0Y2FiOTgzNDRkNTc1NmI5ZDU4MiIsInVzZXJfaWQiOjExLCJyb2xlIjoidGVjaG5pY2llbiJ9.Fx8pjxnpHagNRzE7JfJByeNExgEhe6rJ6kjYmePEEvU'
          }
        })
  
        console.log(res.data)
       
  
          
  
        
        
      } 
      catch (error) {
        console.log(error)
        this.userIndicatorService.errorData.set({
          isError: true,
          errorMessage: 'Erreur lors de creation du resumer'
        })
      }
      finally {
        this.userIndicatorService.loadingData.set({
          isLoading: false,
          loadingMessage: 'Chargement... '
        })
      
      }
     
        this.userIndicatorService.sucessData.set({
          isSuccess: true,
          successMessage: 'resume créé avec succès'
        })

        this.resumeService.resumes.set([ ...this.resumeService.resumes(), res.data ])
        
        
         
        this.nextStep(event)
      }
      else this.userIndicatorService.errorData.set({
        isError: true,
        errorMessage: 'Erreur lors de la création du médicament'
      })
    } 
    catch (error) {
      console.log(error)
      this.userIndicatorService.errorData.set({
        isError: true,
        errorMessage: 'Erreur lors de la création du médicament'
      })
    }
    finally {
      this.userIndicatorService.loadingData.set({
        isLoading: false,
        loadingMessage: 'Chargement... '
      })
      this.closeAjouterRes()
    }
  }

  async onSubmit(event: Event): Promise<void> {
    console.log("Form submited medicament/create/",this.formGroup.value)
    /*if(this.medicament()) await this.modifierMedicamente()*/
    await this.ajouterResume(event)
   
  }


}
