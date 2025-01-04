import { Component, inject, input, output, signal } from '@angular/core';
import { MedicamentsComponent } from "../medicaments/medicaments.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { AjouterMedicamentComponent } from "../ajouter-medicament/ajouter-medicament.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import SoinInfermier from '../../../models/SoinInfermier';
import { SoinsInfermiersService } from '../../../services/soins-infermiers.service';
import { UserIndicatorsServiceService } from '../../../services/user-indicators-service.service';
import axios from 'axios';
import { UserRoleService } from '../../../services/user-role.service';

@Component({
  selector: 'app-add-soin-form',
  standalone: true,
  imports: [MedicamentsComponent, FontAwesomeModule, AjouterMedicamentComponent, ReactiveFormsModule],
  templateUrl: './add-soin-form.component.html',
  styleUrl: './add-soin-form.component.css'
})
export class AddSoinFormComponent {
  soinsInfermiersService = inject(SoinsInfermiersService)

  faPlusCircle=faPlusCircle
  closeEvent = output()
  next = signal(false)
  ajouterMed = signal(false)

  soinId !: number

  constructor(public userIndicatorService: UserIndicatorsServiceService, public userRoleService: UserRoleService){}

  formGroup = new FormGroup({
    date: new FormControl('',[Validators.required]),
    heure: new FormControl('',[Validators.required]),
    soin_realise: new FormControl('',[Validators.required]),
    observation: new FormControl('',[Validators.required]),
    dossier: new FormControl(this.soinsInfermiersService.dpiId,[Validators.required]),
    infirmier: new FormControl(localStorage.getItem('technicianID'),[Validators.required]),
  })


  closeAddSoin(){
    this.closeEvent.emit() ;
  }

  nextStep(event: Event){
    event.stopPropagation();
    this.next.set(true)
  }

  openAjouterMedicament(event: Event){
    event.stopPropagation();
    this.ajouterMed.set(true)
  }

  closeAjouterMedicament(){
    this.ajouterMed.set(false)
  }

  async onSubmit(event: Event){
    
    if(this.formGroup.valid){
      try {
        this.userIndicatorService.loadingData.set({
          isLoading: true,
          loadingMessage: 'Création en cours...'
        })

        const res = await axios.post('http://localhost:8000/traitements/soin-infermier/create/', this.formGroup.value,{
          headers: {
            Authorization: 'Bearer '+localStorage.getItem('accessToken')
          }
        })

        console.log(res.data)
        if(res.status === 201){
          this.userIndicatorService.sucessData.set({
            isSuccess: true,
            successMessage: 'Soin créé avec succès'
          })

          const updatedData = this.soinsInfermiersService.soinsInfermiers()
          updatedData.push(res.data)
          this.soinsInfermiersService.soinsInfermiers.set(updatedData)
          this.soinId = res.data.id

          this.nextStep(event)
        }
        else{
          this.userIndicatorService.errorData.set({
            isError: true,
            errorMessage: 'Erreur lors de la création du soin'
          })
        }
      } 
      catch (error) {
        console.log(error)
        this.userIndicatorService.errorData.set({
          isError: true,
          errorMessage: 'Erreur lors de la création du soin'
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
