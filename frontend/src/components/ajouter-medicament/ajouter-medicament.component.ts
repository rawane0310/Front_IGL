import { Component, inject, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserIndicatorsServiceService } from '../../services/user-indicators-service.service';
import { MedicamentsService } from '../../services/medicaments.service';
import axios from 'axios';
import SoinInfermier from '../../models/SoinInfermier';
import Medicament from '../../models/Medicament';

@Component({
  selector: 'app-ajouter-medicament',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './ajouter-medicament.component.html',
  styleUrl: './ajouter-medicament.component.css'
})
export class AjouterMedicamentComponent {
  medicamentsService = inject(MedicamentsService)
  ajouterMedCloseEvent = output()

  soinId = input.required()
  medicament = input<Medicament>()
  formGroup !: FormGroup

  constructor(public userIndicatorService: UserIndicatorsServiceService) { }
  closeAjouterMed(): void{
    this.ajouterMedCloseEvent.emit()
  }

  ngOnInit(): void{
    this.formGroup = new FormGroup({
      nom: new FormControl(this.medicament()?.nom || '',[Validators.required]),
      dose: new FormControl(this.medicament()?.dose || '',[Validators.required]) ,
      frequence: new FormControl(this.medicament()?.frequence || '',[Validators.required]),
      duree: new FormControl(this.medicament()?.duree || '',[Validators.required]),
      ordonnance_id: new FormControl(null,[Validators.required]),
      soin_id: new FormControl(this.soinId(),[Validators.required])
    })
  }

  async modifierMedicamente(): Promise<void>{
    try {
      this.userIndicatorService.loadingData.set({
        isLoading: true,
        loadingMessage: 'Modification en cours...'
      })
      
      const res = await axios.put('http://localhost:8000/traitements/medicament/'+this.medicament()?.id+'/modify/',{
        nom : this.formGroup.value.nom,
        dose : this.formGroup.value.dose,
        frequence : this.formGroup.value.frequence,
        duree : this.formGroup.value.duree,
        ordonnance : null,
        soin: this.soinId(),
      },{
        headers:{
          Authorization: 'Bearer '+localStorage.getItem('accessToken')
        }
      })

      console.log(res.data)
      if(res.status === 200){
        this.userIndicatorService.sucessData.set({
          isSuccess: true,
          successMessage: 'Médicament modifier avec succès'
        })

        const updatedMedicaments = this.medicamentsService.medicaments().filter(med => med.id !== this.medicament()?.id);  // Filter out the medicament

        updatedMedicaments.push(res.data);  // Add the new medicament

        this.medicamentsService.medicaments.set(updatedMedicaments);  // Set the updated array

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

  async ajouterMedicament(): Promise<void>{
    try {
      this.userIndicatorService.loadingData.set({
        isLoading: true,
        loadingMessage: 'Création en cours...'
      })
      
      const res = await axios.post('http://localhost:8000/traitements/medicament/create/',{
        
        nom : this.formGroup.value.nom,
        dose : this.formGroup.value.dose,
        frequence : this.formGroup.value.frequence,
        duree : this.formGroup.value.duree,
        ordonnance : null,
        soin: this.soinId(),
      },{
        headers:{
          Authorization: 'Bearer '+localStorage.getItem('accessToken')
        }
      })

      console.log(res.data)
      if(res.status === 201){
        this.userIndicatorService.sucessData.set({
          isSuccess: true,
          successMessage: 'Médicament créé avec succès'
        })

        this.medicamentsService.medicaments.set([ ...this.medicamentsService.medicaments(), res.data ])
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

  async onSubmit(): Promise<void> {
    console.log("Form submited medicament/create/",this.formGroup.value)
    if(this.medicament()) await this.modifierMedicamente()
    else await this.ajouterMedicament()
  }

}
