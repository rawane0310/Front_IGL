import { Component, inject, input, signal, ViewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { AjouterOrdonnanceComponent } from '../ajouter-ordonnance/ajouter-ordonnance.component';
import { UserIndicatorsServiceServiceService } from '../../services/user-indicators-service.service.service';
import { OrdonnanceService } from '../../services/ordonnance.service';
import axios from 'axios';
import { Medicament } from '../../services/ordonnance.service';

@Component({
  selector: 'app-medicaments',
  standalone: true,
  imports: [FontAwesomeModule, AjouterOrdonnanceComponent],
  templateUrl: './medicaments.component.html',
  styleUrl: './medicaments.component.css'
})
export class MedicamentsComponent {
  consultationId = input.required()
  medicamentsService = inject(OrdonnanceService)

  faTrashCan=faTrashCan
  faPenToSquare=faPenToSquare

  medForm = signal(false)
  deleteDialog = signal(false)



  deleteEndpoint !: string
  itemId !: number
  medicament : Medicament | undefined 

  constructor(public userIndicatorService: UserIndicatorsServiceServiceService) {
    
  }
  openMedForm(event: Event, medicament: Medicament){
    event.stopPropagation()
    this.medicament = medicament
    this.medForm.set(true)
  }

  closeMedForm(){
    this.medForm.set(false)
    this.medicament = undefined
  }

  opendeleteDialog(event: Event, id: number){
    this.deleteEndpoint = "http://localhost:8000/traitements/medicament/"+id+"/delete/"
    this.itemId = id
    event.stopPropagation()
    this.deleteDialog.set(true)
  }

  closeDeleteDialog(id: number){

    this.medicamentsService.medicaments.set(this.medicamentsService.medicaments().filter(med => med.id !== id))
    this.deleteDialog.set(false)
  }

  async ngOnInit() : Promise<void>{
    
    try {
      this.userIndicatorService.loadingData.set({
        ...this.userIndicatorService.loadingData(),
        isLoading: true
      })

      const res = await axios.get("http://localhost:8000/traitements/medicament/search/?soin="+this.consultationId(),{
        headers: {
          'Authorization': 'Bearer '+localStorage.getItem('accessToken')
        }
      })

      console.log(res.data)
      if(res.status === 200) this.medicamentsService.medicaments.set(res.data)
      else this.userIndicatorService.errorData.set({
        isError: true,
        errorMessage: 'Erreur lors de la récupération des médicaments'
      })
    } 
    catch (error) {
      console.log(error)
      this.userIndicatorService.errorData.set({
        isError: true,
        errorMessage: 'Erreur lors de la récupération des médicaments'
      })
    }
    finally{
      this.userIndicatorService.loadingData.set({
        ...this.userIndicatorService.loadingData(),
        isLoading: false
      })
    }

  }
}
