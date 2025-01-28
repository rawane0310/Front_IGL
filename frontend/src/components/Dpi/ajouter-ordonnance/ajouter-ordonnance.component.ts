
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
import { AjouterExamenComponent } from '../ajouter-examen/ajouter-examen.component';
@Component({
  selector: 'app-ajouter-ordonnance',
  templateUrl: './ajouter-ordonnance.component.html',
  standalone: true,
  styleUrls: ['./ajouter-ordonnance.component.css'],
  imports : [MatDialogModule, MatDialogContent, ReactiveFormsModule , CommonModule , MatDialogActions]

})
export class AjouterOrdonnanceComponent {


  private currentDialogRef?: MatDialogRef<any>;
  ordonnancesService = inject(OrdonnanceService)
  ajouterMedCloseEvent = output()

  next = signal(false)
  @Input() consId!: number;
  @Input() consDate!: string;
  medicament = input<Medicament>()
  formGroup !: FormGroup
  ordonnanceid !:number

  constructor(public userIndicatorService: UserIndicatorsServiceServiceService, private dialog: MatDialog, private dialogRef: MatDialogRef<AjouterOrdonnanceComponent>) {
   
   }
  closeAjouterMed(): void{
    this.ajouterMedCloseEvent.emit()
  }

  ngOnInit(): void{
    console.log('Consultation ID bouchra sarah:', this.consId);
    

    this.formGroup = new FormGroup({
    
      nom: new FormControl(this.medicament()?.nom || '',[Validators.required]),
      dose: new FormControl(this.medicament()?.dose || '',[Validators.required]) ,
      frequence: new FormControl(this.medicament()?.frequence || '',[Validators.required]),
      duree: new FormControl(this.medicament()?.duree || '',[Validators.required]),
      
    })
    
  }

  openAjouterResumeDialog(): void {
    this.dialogRef.close('closed')
  }

  async creerOrdonnance(): Promise<void>{
    try {
      this.userIndicatorService.loadingData.set({
        isLoading: true,
        loadingMessage: 'Modification en cours...'
      })
      
      const res = await axios.post('http://127.0.0.1:7000/consultations/ordonnance/create/',{
        date : this.consDate ,
        
      },{
        headers:{
          Authorization: 'Bearer '+ 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxMDM3NTgyNzA0NywiaWF0IjoxNzM1OTEzNDQ3LCJqdGkiOiIzNjYxZTUzOTNmNDY0Y2FiOTgzNDRkNTc1NmI5ZDU4MiIsInVzZXJfaWQiOjExLCJyb2xlIjoidGVjaG5pY2llbiJ9.Fx8pjxnpHagNRzE7JfJByeNExgEhe6rJ6kjYmePEEvU'
        }
      })

      console.log(res.data)
      const ordoId=res.data.id
      console.log('orodnnance ID bouchra sarah:', ordoId);
      if(res.status === 201){
        try {
          this.userIndicatorService.loadingData.set({
            isLoading: true,
            loadingMessage: 'Modification en cours...'
          })
          console.log('the id of the consultation in ordo is :'+this.consId)
          const res = await axios.put('http://127.0.0.1:7000/consultations/consultation/'+this.consId+'/modify/',{
           ordonnance: ordoId
          },{
            headers:{
              Authorization: 'Bearer '+ 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxMDM3NTgyNzA0NywiaWF0IjoxNzM1OTEzNDQ3LCJqdGkiOiIzNjYxZTUzOTNmNDY0Y2FiOTgzNDRkNTc1NmI5ZDU4MiIsInVzZXJfaWQiOjExLCJyb2xlIjoidGVjaG5pY2llbiJ9.Fx8pjxnpHagNRzE7JfJByeNExgEhe6rJ6kjYmePEEvU'
            }
          })
    
          console.log("roufaidA"+res.data)
          
         
    
            
    
          
          
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

        try {
          this.userIndicatorService.loadingData.set({
            isLoading: true,
            loadingMessage: 'Création en cours...'
          })
          
          const res = await axios.post('http://127.0.0.1:7000/traitements/medicament/create/',{
            
            nom : this.formGroup.value.nom,
            dose : this.formGroup.value.dose,
            frequence : this.formGroup.value.frequence,
            duree : this.formGroup.value.duree,
            ordonnance : ordoId,
          
          },{
            headers:{
              Authorization: 'Bearer '+ 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxMDM3NTgyNzA0NywiaWF0IjoxNzM1OTEzNDQ3LCJqdGkiOiIzNjYxZTUzOTNmNDY0Y2FiOTgzNDRkNTc1NmI5ZDU4MiIsInVzZXJfaWQiOjExLCJyb2xlIjoidGVjaG5pY2llbiJ9.Fx8pjxnpHagNRzE7JfJByeNExgEhe6rJ6kjYmePEEvU'
            }
          })
    
          console.log(res.data)
          if(res.status === 201){
            this.userIndicatorService.sucessData.set({
              isSuccess: true,
              successMessage: 'Médicament créé avec succès'
            })
    
            this.ordonnancesService.medicaments.set([ ...this.ordonnancesService.medicaments(), res.data ])
    
           
             
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
          this.closeAjouterMed()
        }
       

       

      }
      else this.userIndicatorService.errorData.set({
        isError: true,
        errorMessage: 'Erreur lors de la modification du médicament'
      })
    } 
    catch (error) {
      console.log(error)
      this.userIndicatorService.errorData.set({
        isError: true,
        errorMessage: 'Erreur lors de la modification du médicament'
      })
    }
    finally {
      this.userIndicatorService.loadingData.set({
        isLoading: false,
        loadingMessage: 'Chargement... '
      })
      this.closeAjouterMed()
    }
  } 

 

  async onSubmit(): Promise<void> {
    console.log("Form submited medicament/create/",this.formGroup.value)
    //if(this.medicament()) await this.modifierMedicamente()
    await this.creerOrdonnance()
   
  }

  
}
